import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "KennyLabs Skincare",
  description: "Unlock Your Natural Glow with KennyLabs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased text-fabish-text bg-fabish-cream selection:bg-fabish-pink">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
