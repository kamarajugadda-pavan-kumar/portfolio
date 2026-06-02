import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.pavankamarajugadda.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pavan Kumar — Senior GenAI / ML Engineer",
    template: "%s | Pavan Kumar",
  },
  description:
    "Senior Generative AI & ML Engineer specialising in RAG pipelines, agentic workflows, and production LLM systems. Based in Hyderabad, India.",
  keywords: [
    "GenAI Engineer",
    "ML Engineer",
    "RAG",
    "LangChain",
    "LangGraph",
    "LlamaIndex",
    "PyTorch",
    "AI portfolio",
  ],
  authors: [{ name: "Pavan Kumar" }],
  creator: "Pavan Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Pavan Kumar — Senior GenAI / ML Engineer",
    description:
      "Production-grade GenAI systems — RAG pipelines, agentic workflows, and ML applications.",
    siteName: "Pavan Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavan Kumar — Senior GenAI / ML Engineer",
    description:
      "Production-grade GenAI systems — RAG pipelines, agentic workflows, and ML applications.",
    creator: "@pavankumar",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
