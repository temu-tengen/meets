import AddMeet from "../components/addmeet";
import styles from "./page.module.css";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function MeetsPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session_token");

    if (!session) {
        redirect("/");
    }

    return (
        <div className={styles.container}>
            <h1>Meets</h1>
            <AddMeet/>
        </div>
    );
}