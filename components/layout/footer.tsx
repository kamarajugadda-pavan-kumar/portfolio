import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

const socialLinks = [
  {
    href: "https://github.com/kamarajugadda-pavan-kumar",
    icon: GitHubIcon,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/pavan-kumar-kamarajugadda/",
    icon: LinkedInIcon,
    label: "LinkedIn",
  },
  {
    href: "https://x.com/lollapalooza_00",
    icon: XIcon,
    label: "Twitter / X",
  },
  {
    href: "mailto:kamarajugaddapavankumar@gmail.com",
    icon: Mail,
    label: "Email",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pavan Kumar
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
