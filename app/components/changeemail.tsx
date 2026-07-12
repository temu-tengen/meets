"use client";

import styles from "./changeemail.module.css";
import { useActionState } from "react";
import { changeEmail } from "../actions/actions";

interface FormState {
    success: boolean;
    message: string;
}

const initialState: FormState = {
    success: false,
    message: "",
};


export default function ChangeEmailForm() {
    const [state, submitAction, isPending] = useActionState(changeEmail, initialState);

    return (
        <div className={styles.container} >
            <h3>Change Email</h3>

            <form action={submitAction} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    className={styles.input}
                    type="text"
                    name="newEmail"
                    placeholder="Enter new email"
                    required
                />

                <button type="submit" disabled={isPending}>
                    {isPending ? "Updating..." : "Update Email"}
                </button>
            </form>

            <p>{state.message}</p>
        </div>
    );
}
