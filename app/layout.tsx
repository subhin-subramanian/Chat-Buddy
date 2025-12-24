import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/query-provider";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider";
import "stream-chat-react/dist/css/v2/index.css";

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
            <AuthProvider>
              {children}
              <Toaster position="top-left" reverseOrder={false} />
            </AuthProvider>
          </QueryProvider>

      </body>
    </html>
  );
}
