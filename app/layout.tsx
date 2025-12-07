import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/query-provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat_Buddy",
  description: "A chat application made with Next.js",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) 
{
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} data-theme="dark">

          <QueryProvider>
              {children}
              <Toaster position="top-left" reverseOrder={false} />
          </QueryProvider>

      </body>
    </html>
  );
}
