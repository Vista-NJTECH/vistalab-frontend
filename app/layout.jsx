import "./globals.css";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang='zh-Hans'>
      <head />
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
