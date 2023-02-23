import { Hero } from "@/components/LandingComponents/Hero";
import styles from "@/styles/Home.module.css";
export default function Dashboard() {
  return (
    <main className={styles.main}>
      <Hero text="Dashboard" />
    </main>
  );
}
