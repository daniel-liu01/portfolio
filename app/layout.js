import { Spline_Sans, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const splineSans = Spline_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Daniel Liu",
  description: "UX/UI Design Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${splineSans.variable} ${splineSansMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
