import Image from "next/image";
import styles from "./page.module.css";
import LoginBox from "./components/loginbox";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "PFF Login",
  description: "PFF Meets Login Page",
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_token");

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className={styles.page}>
      <LoginBox />
    </div>
  );
}
