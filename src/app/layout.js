import "./globals.css";

export const metadata = {
  title: "Tailored Furnitures | Luxury Wall Art Collection",
  description:
    "A sculptural tribute to timeless spaces through intricate, custom wood relief artwork.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Dynamic cross-origin pre-connect for optimized font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-espresso selection:text-canvas">
        {children}
      </body>
    </html>
  );
}
