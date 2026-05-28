# Portfolio Deployment Guide — S3 + CloudFront

This documents every step taken to deploy the Next.js static portfolio to AWS S3 + CloudFront, with the S3 bucket kept **fully private** (only CloudFront can read it).

---

## Prerequisites

### 1. Install AWS CLI
```bash
brew install awscli
```
Installs the AWS command-line tool via Homebrew.

### 2. Create an IAM User
- Go to **AWS Console → IAM → Users → Create user**
- Attach policies: `AmazonS3FullAccess`, `CloudFrontFullAccess`
- Under **Security credentials**, create an **Access Key** (choose CLI use case)
- Copy the **Access Key ID** and **Secret Access Key** — you only see the secret once

### 3. Configure AWS CLI
```bash
aws configure
```
Prompts for:
- `AWS Access Key ID` — from the IAM user
- `AWS Secret Access Key` — from the IAM user
- `Default region` — `ap-south-1` (Mumbai, where our bucket lives)
- `Default output format` — `json`

Saves credentials to `~/.aws/credentials` so all `aws` commands use them automatically.

---

## S3 Bucket

**Bucket name:** `portXXXX`  
**Region:** `ap-south-1`

### Check bucket region
```bash
aws s3api get-bucket-location --bucket portXXXX
```
Returns the region the bucket was created in. Needed to construct correct endpoint URLs.

### Build the Next.js app
```bash
npm run build
```
Generates a fully static site in the `out/` folder (`output: export` in `next.config.ts`).

### Upload files to S3
```bash
aws s3 sync out/ s3://portXXXX --delete
```
- `sync` — uploads new/changed files, skips unchanged ones
- `--delete` — removes files from S3 that no longer exist in `out/`, keeping the bucket in sync with your latest build

> Run this command every time you make changes and rebuild.

---

## CloudFront Distribution

CloudFront is a CDN that sits in front of S3. It:
- Serves your site over HTTPS
- Caches files at edge locations globally for fast load times
- Keeps S3 private — users never talk to S3 directly

**Distribution ID:** `E23QXXXX`  
**CloudFront URL:** `https://dyo9XXXX.cloudfront.net`

### Why not make S3 public?

The naive approach is to make the S3 bucket publicly readable. We deliberately avoided this because:
- It exposes your bucket directly to the internet
- Anyone can bypass CloudFront and hit S3 directly (incurring S3 costs, bypassing caching)
- Best practice is to keep S3 private and use **Origin Access Control (OAC)**

---

## Origin Access Control (OAC)

OAC is an AWS mechanism that lets CloudFront sign requests to S3 using IAM. S3 only accepts requests that come from your specific CloudFront distribution — everything else is denied.

### Step 1 — Create the OAC
```bash
aws cloudfront create-origin-access-control \
  --origin-access-control-config '{
    "Name": "portfolio-oac",
    "OriginAccessControlOriginType": "s3",
    "SigningBehavior": "always",
    "SigningProtocol": "sigv4",
    "Description": ""
  }'
```
- `SigningBehavior: always` — every request CloudFront makes to S3 is signed
- `SigningProtocol: sigv4` — uses AWS Signature Version 4 (standard AWS auth)

**OAC ID:** `E2YXXXX`

### Step 2 — Update CloudFront to use S3 REST endpoint + OAC

The original distribution was pointing to the **S3 website endpoint** (`s3-website.ap-south-1.amazonaws.com`). OAC only works with the **S3 REST endpoint** (`.s3.ap-south-1.amazonaws.com`), so we needed to update the distribution config.

CloudFront does not let you update a distribution inline via a single CLI flag — you must pass the **entire distribution config** as a JSON file. So the process was:

**1. Fetch the current config and save it:**
```bash
aws cloudfront get-distribution-config --id E23QXXXX > /tmp/dist-config.json
```
This also returns an `ETag` value in the response — save it, you'll need it in step 3.

**2. Edit it into an updated version at `/tmp/updated-dist-config.json`** with these changes:
- `DomainName` changed from `portXXXX.s3-website.ap-south-1.amazonaws.com` → `portXXXX.s3.ap-south-1.amazonaws.com` (REST endpoint, required for OAC)
- `CustomOriginConfig` block removed — that block is for HTTP servers; S3 uses `S3OriginConfig` instead
- `S3OriginConfig: { "OriginAccessIdentity": "" }` added — empty string because we're using OAC (not the older OAI method)
- `OriginAccessControlId` set to `E2YXXXX` — links this origin to the OAC we created
- `ViewerProtocolPolicy` changed to `redirect-to-https` — forces all HTTP traffic to redirect to HTTPS
- `Compress: true` — enables gzip/brotli compression for faster loads

The final `/tmp/updated-dist-config.json` looked like this:
```json
{
  "CallerReference": "cli-XXXX",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "portXXXX-s3",
      "DomainName": "portXXXX.s3.ap-south-1.amazonaws.com",
      "S3OriginConfig": { "OriginAccessIdentity": "" },
      "OriginAccessControlId": "E2YXXXX"
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "portXXXX-s3",
    "ViewerProtocolPolicy": "redirect-to-https",
    "Compress": true,
    ...
  }
}
```

> The `CallerReference` must be copied exactly from the original config — do not change it.

**3. Apply the updated config:**
```bash
aws cloudfront update-distribution \
  --id E23QXXXX \
  --if-match E23ZXXXX \
  --distribution-config file:///tmp/updated-dist-config.json
```
- `--if-match` — a version token (ETag) fetched alongside the config in step 1. AWS requires this to prevent overwriting changes made by someone else simultaneously — like an optimistic lock.
- `file://` — tells the CLI to read the config from a local file instead of an inline string

### Step 3 — Add bucket policy allowing only CloudFront
```bash
aws s3api put-bucket-policy --bucket portXXXX --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowCloudFrontOAC",
    "Effect": "Allow",
    "Principal": {
      "Service": "cloudfront.amazonaws.com"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::portXXXX/*",
    "Condition": {
      "StringEquals": {
        "AWS:SourceArn": "arn:aws:cloudfront::9435XXXX:distribution/E23QXXXX"
      }
    }
  }]
}'
```
- `Principal: cloudfront.amazonaws.com` — only the CloudFront service can use this policy
- `Condition: AWS:SourceArn` — scoped to **your specific distribution** only, not any CloudFront distribution
- `9435XXXX` — your 12-digit AWS account ID, found in the AWS Console top-right menu

### Step 4 — Wait for deployment
```bash
aws cloudfront wait distribution-deployed --id E23QXXXX
```
Blocks until CloudFront finishes propagating changes to all edge locations (~5-10 min).

---

## Redeployment (future changes)

Every time you update the site:

```bash
# 1. Build
npm run build

# 2. Upload to S3
aws s3 sync out/ s3://portXXXX --delete

# 3. Invalidate CloudFront cache so it serves fresh files immediately
aws cloudfront create-invalidation \
  --distribution-id E23QXXXX \
  --paths "/*"
```

The invalidation (step 3) tells CloudFront to discard its cached copies and fetch fresh files from S3. Without it, visitors may see the old site for up to 24 hours (the default cache TTL).

---

## Architecture Summary

```
User → CloudFront (dyo9XXXX.cloudfront.net)
         ↓ signed request (OAC)
       S3 (portXXXX, ap-south-1) [private]
```

- S3 bucket has **no public access** — only CloudFront can read it
- CloudFront serves over HTTPS, compresses assets, caches at edge
- Cache TTL: 24h default, 1 year max
