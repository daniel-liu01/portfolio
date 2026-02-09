"use client";

import { useState } from "react";
import ContentSection from "@/components/project/ContentSection";
import AboutMeImage from "@/components/AboutMeImage";
import styles from "./page.module.css";

export default function AboutMeSection() {
  const [powCount, setPowCount] = useState(0);

  return (
    <ContentSection
      title="About Me"
      variant="imageLeftTextRight"
      leftContent={
        <AboutMeImage
          className={`content-section-image-single ${styles.doodleImg}`}
          onPow={() => setPowCount((c) => c + 1)}
        />
      }
    >
      <p>
        Hello! My name is Daniel. I am a UX/UI designer based in Vancouver. I
        originally grew up in Taiwan and moved to Canada at the age of 10.
      </p>
      <p>
        I got into design back when I was taking a gap year from university. I
        told my friend I wasn&apos;t sure what to study and he told me:
        <strong>
          &quot;You should look into UX design, they make buttons.&quot;
        </strong>{" "}
        I then went down the rabbit hole and here I am today. I love the
        creative aspect of this field, where I get to solve problems in a
        non-traditional, creative way.
      </p>
      {powCount > 0 && (
        <p className={styles.powCounter}>Pow counter: {powCount}</p>
      )}
    </ContentSection>
  );
}
