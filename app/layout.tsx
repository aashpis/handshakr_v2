import type { Metadata } from "next";
import "./globals.css";
// import { Analytics } from '@vercel/analytics/next'; //pnpm i @vercel/analytics


export const metadata: Metadata = {
  title: "Handshakr",
  description: "Handshakr, the secure handshake agreement app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
