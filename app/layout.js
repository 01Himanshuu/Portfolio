import { Inter, JetBrains_Mono, Caveat, Syne, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import SoundProvider from "./components/SoundProvider";
import SmoothScroll from "./components/SmoothScroll";
import GridBackground from "./components/GridBackground";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import NavigationCleanup from "./components/NavigationCleanup";
import CinematicSectionTransitions from "./components/CinematicSectionTransitions";
import DynamicBackgroundEngine from "./components/DynamicBackgroundEngine";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const pacifico = Caveat({
  variable: "--font-pacifico",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://himanshuu.dev"),
  title: {
    default: "HIMANSHU JANGRA © 2026 // Software Developer & Cinematic Director",
    template: "%s | HIMANSHU JANGRA",
  },
  description:
    "Himanshu Jangra — Software Engineer & Cinematic Storyteller. Bridging high-performance engineering platforms with 8K RAW cinema.",
  keywords: [
    "Himanshu Jangra",
    "portfolio",
    "software developer",
    "cinematic director",
    "Next.js",
    "TypeScript",
    "WebGL",
    "AI Systems",
    "motion design",
  ],
  authors: [{ name: "Himanshu Jangra", url: "https://github.com/01himanshuu" }],
  creator: "Himanshu Jangra",
  publisher: "Himanshu Jangra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://himanshuu.dev",
    title: "HIMANSHU JANGRA © 2026 // Where Code Meets Creativity",
    description:
      "Bridging high-performance engineering platforms with 8K RAW cinematic storytelling.",
    siteName: "HIMANSHU JANGRA PORTFOLIO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Himanshu Jangra Portfolio — Software Engineer & Cinematic Storyteller",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIMANSHU JANGRA © 2026 // Software Developer & Cinematic Director",
    description:
      "Bridging high-performance engineering platforms with 8K RAW cinematic storytelling.",
    creator: "@_01_himanshu",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${manrope.variable} ${ibmPlexMono.variable} ${pacifico.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SoundProvider>
          <ThemeProvider>
            <SmoothScroll>
              <div className="noise-overlay" aria-hidden="true" />
              <GridBackground />
              <DynamicBackgroundEngine />
              <CursorGlow />
              <ScrollProgress />
              <NavigationCleanup />
              <CinematicSectionTransitions />
              <Header />
              <main className="relative z-[2]">{children}</main>
              <StatusBar />
            </SmoothScroll>
          </ThemeProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
