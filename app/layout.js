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
  title: "Daniel Liu | UX Designer — Design × Research × Brand",
  description:
    "UX designer focused on user research, product design, and brand systems. Portfolio of selected case studies and projects by Daniel Liu.",
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
