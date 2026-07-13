import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAction } from "../actions/actions";
import ChangePasswordForm from "../components/changepass";
import Link from "next/link";
import LogoutButton from "../components/logoutbutton/logoutbutton";

import ChangeEmailForm from "../components/changeemail";

import { getAllUserInfo } from "../actions/actions";

import styles from "./page.module.css";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_token");
  const username = cookieStore.get("username")?.value;

  const allUserInfo = await getAllUserInfo();

  if (!session) {
    redirect("/");
  }

  return (
    <main className={styles.container} style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Welcome {username}! This page is secure and only visible to logged-in users.</p>
      <LogoutButton />

      <ChangePasswordForm></ChangePasswordForm>
      <ChangeEmailForm></ChangeEmailForm>

      <p>Voting is how many people are coming. Click the vote button to inform others that you are coming. This is not private, your username ({username}) will be publicly available.</p>

      <Link href="/addmeets" className={styles.link}>Add Meets</Link>
      <Link href="/viewmeets" className={styles.link}>View Meets</Link>



      {username === "mehta30" && (
        <div>
          <h2>Admin Section (Viewable by mehta30)</h2>
          <p>{JSON.stringify(allUserInfo)}</p>
        </div>
      )}

    </main>
  );
}
