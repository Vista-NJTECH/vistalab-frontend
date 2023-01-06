import "./globals.css";
import { Footer, Navbar, ScrollToTop, NextauthProvider, ContextProvider } from "../components";

export default function RootLayout({ children }) {
  return (
    <html lang='zh-Hans'>
      <head />
      <body className='min-h-screen flex flex-col items-center justify-between'>
        <NextauthProvider>
          <ContextProvider>
            <Navbar />
            {children}
            <ScrollToTop />
            <Footer />
          </ContextProvider>
        </NextauthProvider>
      </body>
    </html>
  );
}
