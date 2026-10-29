import localFont from "next/font/local";
import { Spline_Sans, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ClimbNav from "@/components/climb/ClimbNav";

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

const roxborough = localFont({
  src: "./fonts/roxborough-cf-regular.otf",
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata = {
  title: "Daniel Liu | UX/UI Designer — Design, Research, Branding",
  description:
    "UX designer focused on user research, product design, and brand systems. Portfolio of selected case studies and projects by Daniel Liu.",
};

const themeScript = `
  (function() {
    try {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      var t = localStorage.getItem('portfolio-theme');
      var dark = t === 'dark';
      document.documentElement.classList.toggle('dark', dark);
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${splineSans.variable} ${splineSansMono.variable} ${roxborough.variable}`}>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
        <CustomCursor />
        <ClimbNav />
        {children}
      </body>
    </html>
  );
}
