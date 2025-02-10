import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from 'react';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tutoring Website",
  description: "To help with enrollment process and other features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isMaintenanceMode = false; // Set this to true when you want the maintenance page

  if (isMaintenanceMode) {
    // Redirect all traffic to the maintenance page
    return (
      <html lang="en">
        <body>
          <h1>🚧 Site Under Maintenance 🚧</h1>
          <p>We are currently updating our website. Please check back soon!</p>
        </body>
      </html>
    );
  }


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics /> 
      </body>
    </html>
  );
}
