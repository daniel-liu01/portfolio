import { Spline_Sans, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

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
  title: "Daniel Liu | UX/UI Designer — Design, Research, Branding",
  description:
    "UX designer focused on user research, product design, and brand systems. Portfolio of selected case studies and projects by Daniel Liu.",
};

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('portfolio-theme');
      var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (t === 'dark' || (!t && d)) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${splineSans.variable} ${splineSansMono.variable}`}>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
