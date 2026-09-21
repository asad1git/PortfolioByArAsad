import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Cursor } from "@/components/ui/Cursor";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { SystemHeader } from "@/components/ui/SystemHeader";
import { PageTransition } from "@/components/ui/PageTransition";
import { XRayOverlay } from "@/components/xray/XRayOverlay";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdul Rahman Asad — Software Engineer | ASAD / SYSTEM",
  description:
    "Experimental digital operating system and portfolio of Abdul Rahman Asad. Software engineering, digital products, distributed systems, and frontend craftsmanship.",
  keywords: [
    "Abdul Rahman Asad",
    "Software Engineer",
    "Full Stack Engineer",
    "Frontend Architect",
    "Next.js",
    "React Native",
    "TypeScript",
    "Creative Developer",
  ],
  authors: [{ name: "Abdul Rahman Asad" }],
  creator: "Abdul Rahman Asad",
  openGraph: {
    title: "Abdul Rahman Asad — Software Engineer | ASAD / SYSTEM",
    description:
      "I build software that turns ideas into usable systems. Explore the interactive system.",
    type: "website",
    locale: "en_US",
    siteName: "ASAD / SYSTEM",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Rahman Asad — Software Engineer",
    description:
      "Experimental digital operating system and portfolio of Abdul Rahman Asad.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#050505] text-[#F2F2F2] selection:bg-[#B6FF3B] selection:text-[#050505] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "name": "Abdul Rahman Asad",
                  "jobTitle": "Software Engineer",
                  "url": "https://asad.systems",
                  "sameAs": ["https://github.com", "https://linkedin.com"],
                },
                {
                  "@type": "WebSite",
                  "name": "ASAD / SYSTEM",
                  "url": "https://asad.systems",
                },
              ],
            }),
          }}
        />
        <SmoothScrollProvider>
          <PageTransition />
          <NoiseOverlay />
          <GridOverlay />
          <Cursor />
          <SystemHeader />
          <XRayOverlay />
          <main className="relative z-30 pt-12">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
