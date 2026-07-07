"use client";

import styles from "./addmeet.module.css";

import { addMeetAction } from "../actions/actions.js";
import { useActionState } from "react";

export default function AddMeet() {
    const [state, formAction, isPending] = useActionState(addMeetAction, { success: false, message: "" });

    return (
        <form className={styles.container} action={formAction}>
            <input className={styles.input} type="text" name="meetName" placeholder="Meet Name" required />
            <input className={styles.input} type="text" name="meetDate" placeholder="Meet Date" required />
            <input className={styles.input} type="text" name="meetInfo" placeholder="Meet Info" required />

            <button className={styles.button} type="submit" disabled={isPending}>
                {isPending ? "Adding..." : "Add Meet"}
            </button>

            {state?.message && <p className={styles.p}>{state?.message}</p>}
        </form>
    );
}