import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";

// Optimize Playfair Display for our luxury editorial headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Optimize Inter for clean, legible product descriptions and UI elements
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Tailored Furnitures | Luxury Wall Art Collection",
  description:
    "A sculptural tribute to timeless spaces through intricate, custom wood relief artwork.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Global Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18217121132"
          strategy="afterInteractive"
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18217121132');
          `}
        </Script>
      </head>
      <body className="antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col justify-between">
        <AuthProvider>
          <CartProvider>
            <Navbar />

            {/* Safe breathing room buffer for our fixed navigation glass layer */}
            <div className="pt-20 flex-grow w-full">{children}</div>

            {/* Injected Global WhatsApp Dynamic Widget Integration Channel Hook */}
            <WhatsAppWidget />

            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

// import "./globals.css";
// import { Playfair_Display, Inter } from "next/font/google";
// import Navbar from "@/components/NavBar";
// import Footer from "@/components/Footer";
// import { CartProvider } from "@/context/CartContext";
// import { AuthProvider } from "@/context/AuthContext";

// // Optimize Playfair Display for our luxury editorial headings
// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-heading",
//   display: "swap",
// });

// // Optimize Inter for clean, legible product descriptions and UI elements
// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-body",
//   display: "swap",
// });

// export const metadata = {
//   title: "Tailored Furnitures | Luxury Wall Art Collection",
//   description:
//     "A sculptural tribute to timeless spaces through intricate, custom wood relief artwork.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
//       <body className="antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col justify-between">
//         <AuthProvider>
//           <CartProvider>
//             <Navbar />
//             {/* Safe breathing room buffer for our fixed navigation glass layer */}
//             <div className="pt-20 flex-grow w-full">{children}</div>
//             <Footer />
//           </CartProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
