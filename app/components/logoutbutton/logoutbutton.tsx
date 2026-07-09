"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "../../actions/actions";
import styles from "./logoutbutton.module.css";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.refresh(); 
  };

  return (
    <button className={styles.button} onClick={handleLogout}>
      Logout
    </button>
  );
}
