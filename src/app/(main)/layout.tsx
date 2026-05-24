import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Appsidebar from "@/components/sidebar/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chat",
  description:
    "This chat app is created with Groq ai and with next js and deploy on vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <Appsidebar />

          <main className="w-full">
            
            <div className="flex items-center border-b p-4">
              <SidebarTrigger />
            </div>

            <div className="p-4">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
