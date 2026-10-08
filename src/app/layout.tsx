import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/shared/AmbientBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Muhammad Abdullah | Data Analyst & AI/ML Engineer",
    template: "%s | Muhammad Abdullah",
  },
  description:
    "Portfolio of Muhammad Abdullah, a Data Analyst and AI/ML Engineer working across data science, machine learning, analytics, and full-stack development.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Muhammad Abdullah Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-transparent text-[#EDEDEF]">
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
