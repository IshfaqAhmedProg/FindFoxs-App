import Cursor from "@/components/LandingComponents/Cursor";
import { HeroSection } from "@/components/LandingComponents/HeroSection";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/Home.module.css";
export default function Dashboard() {
  const { user } = useAuth();
  return (
    <main className={styles.main}>
      <Cursor />
      {user.email}
    </main>
  );
}
