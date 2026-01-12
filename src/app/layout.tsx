import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/AuthContext";
import CartDrawer from "@/components/ui/CartDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  // Fraunces is a variable font, so we don't strictly need to specify weights unless we want strictly static ones,
  // but variable fonts are better.
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chettinad Snacks | Flavor Pop D2C",
  description: "Authentic Chettinad treats handmade with zero preservatives and 100% pure gingelly oil. The taste you remember, delivered to your door.",
  keywords: ["Chettinad snacks", "murukku", "traditional Indian snacks", "handmade snacks", "gingelly oil"],
  openGraph: {
    title: "Chettinad Snacks | Don't Just Snack. Celebrate.",
    description: "Authentic Chettinad treats handmade with zero preservatives and 100% pure gingelly oil.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${dmSans.variable}`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main style={{ paddingTop: '72px' }}>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
