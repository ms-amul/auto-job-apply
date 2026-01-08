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
        <SessionProvider>
          <DevelopmentBadge />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
