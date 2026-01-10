import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Hi it's Daniel . . !</h1>
          <p>
            🚧 Portfolio under construction... Cool stuff loading… please check
            back soon!
          </p>
        </div>
        <div className={styles.avatar}>
          <img src="/vector.jpg" alt="Daniel's Avatar" />
        </div>
      </main>
    </div>
  );
}
