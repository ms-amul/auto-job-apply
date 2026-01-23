import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { brand } from "@/utils/brand";
import SessionProvider from "@/components/providers/SessionProvider";
import DevelopmentBadge from "@/components/ui/DevelopmentBadge";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
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
        className={`${jakarta.variable} ${outfit.variable} antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
          Skip to main content
        </a>
        <SessionProvider>
          <DevelopmentBadge />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
