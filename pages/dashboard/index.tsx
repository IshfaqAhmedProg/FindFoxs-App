import Cursor from "@/components/LandingComponents/Cursor";
import { HeroSection } from "@/components/LandingComponents/HeroSection";
import styles from "@/styles/Home.module.css";
export default function Dashboard() {
  return (
    <main className={styles.main}>
      <Cursor />
      <HeroSection />
    </main>
  );
}
