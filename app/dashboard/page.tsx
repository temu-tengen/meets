import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAction } from "../actions/actions";
import ChangePasswordForm from "../components/changepass";
import styles from "./page.module.css";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_token");
  const username = cookieStore.get("session_token")?.value;

  if (!session) {
    redirect("/login");
  }

  if (username) {

  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Welcome! This page is secure and only visible to logged-in users.</p>
      <button className={styles.button} onClick={logoutAction}>Logout</button>
      <p></p>

      <ChangePasswordForm></ChangePasswordForm>
    </main>
  );
}
