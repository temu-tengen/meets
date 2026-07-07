import Image from "next/image";
import styles from "./page.module.css";
import LoginBox from "./components/loginbox";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <LoginBox />
    </div>
  );
}
