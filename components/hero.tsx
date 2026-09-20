import { profile } from "@/data/portfolio";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <p className={styles.role}>
        {profile.name}<span aria-hidden="true">/</span>{profile.role}
      </p>
      <h1 id="hero-title">
        I build the product.
        <br />
        <span>And the systems behind it.</span>
      </h1>
      <p className={styles.intro}>{profile.intro}</p>
      <div className={styles.actions}>
        <a href="#work" className={styles.workLink}>
          View my work<span aria-hidden="true">↓</span>
        </a>
        <a href={profile.resumeUrl} download="Adnan_Baig_Resume.pdf" className={styles.contactLink}>
          Download resume <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className={styles.details}>
        <span>Building professionally since 2021</span>
        <span>{profile.location} · Open to remote roles</span>
      </div>
    </section>
  );
}
