import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ayush Raj — AI/ML Engineer & Builder",
  description:
    "B.Tech student at IIIT Bhubaneswar specializing in Machine Learning, NLP, Generative AI, RAG systems, and LLM-powered applications. Portfolio showcasing projects, skills, and achievements.",
  keywords: [
    "Ayush Raj",
    "AI Engineer",
    "ML Engineer",
    "Software Developer",
    "LangChain",
    "RAG",
    "NLP",
    "IIIT Bhubaneswar",
    "Portfolio",
  ],
  authors: [{ name: "Ayush Raj" }],
  openGraph: {
    title: "Ayush Raj — AI/ML Engineer & Builder",
    description:
      "B.Tech student at IIIT Bhubaneswar specializing in Machine Learning, NLP, Generative AI, and RAG systems.",
    url: "https://ayushraj.dev",
    siteName: "Ayush Raj Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Raj — AI/ML Engineer & Builder",
    description:
      "Portfolio of Ayush Raj — AI/ML Engineer, LangChain Developer, and Problem Solver.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
        style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
