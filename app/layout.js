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
  title: "HIMANSHU JANGRA©2026",
  description:
    "Himanshu Jangra — Software Developer & Content Creator. Explore my tech and social media portfolios.",
  keywords:
    "Himanshu Jangra, portfolio, developer, content creator, full-stack, AI, mobile, cybersecurity",
  author: "Himanshu Jangra",
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
              <div className="grid-background" aria-hidden="true" />
              <GridBackground />
              <CursorGlow />
              <ScrollProgress />
              <NavigationCleanup />
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
