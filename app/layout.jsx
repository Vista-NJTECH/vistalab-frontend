import "./globals.css";
import Navbar from "../components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang='zh-Hans'>
      <head />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
