import "./globals.css";
import { Footer, Navbar, Provider, ScrollToTop } from "../components";

export default function RootLayout({ children }) {
  return (
    <html lang='zh-Hans'>
      <head />
      <body className='min-h-screen flex flex-col items-center justify-between'>
        <Provider>
          <Navbar />
          {children}
          <ScrollToTop />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
