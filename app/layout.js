import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { brand } from "@/utils/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: `${brand.getName()} - Your Dream Job is One Click Away`,
  description: "AI-powered job application assistant that automatically applies to jobs matching your profile. Powered by Nexi.",
};

// Root layout - only global styles, no header/footer
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
