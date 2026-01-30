import "./globals.css";
import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <div>
          <Hero />
        </div>
      </main>
    </div>
  );
}
