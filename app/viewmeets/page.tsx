import AddMeet from "../components/addmeet";
import styles from "./page.module.css";

export default async function MeetsPage() {
    return (
        <div className={styles.container}>
            <h1>Meets</h1>
            <AddMeet/>
        </div>
    );
}