import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAC40 GenAI Scout — Powered by Claude",
  description: "Identifiez les meilleurs prospects GenAI dans le CAC40. Analyse en temps réel des stratégies IA, powered by Anthropic Claude.",
  openGraph: {
    title: "CAC40 GenAI Scout",
    description: "Intelligence commerciale GenAI pour les 40 plus grandes entreprises françaises.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
