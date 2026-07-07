import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAction } from "../actions/actions";
import ChangePasswordForm from "../components/changepass";
import Link from "next/link";

import styles from "./page.module.css";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_token");
  const username = cookieStore.get("username")?.value;

  if (!session) {
    redirect("/login");
  }

  return (
    <main className={styles.container} style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Welcome {username}! This page is secure and only visible to logged-in users.</p>
      <button className={styles.button} onClick={logoutAction}>Logout</button>

      <ChangePasswordForm></ChangePasswordForm>

      <Link href="/viewmeets" className={styles.link}>View Meets</Link>
    </main>
  );
}
