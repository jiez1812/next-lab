import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJS Lab",
  description: "Lab for anything learning NextJS",
  visualViewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="winter" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
