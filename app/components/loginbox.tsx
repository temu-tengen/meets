"use client";

import styles from "./loginbox.module.css";

import { loginAction } from "../actions/actions.js";
import { useActionState } from "react";

interface ActionState {
  success: boolean;
  message: string;
}

const initialState: ActionState = {
  success: false,
  message: "",
};

export default function LoginBox() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <input className={styles.input} type="text" name="username" placeholder="Username" required />
        <input className={styles.input} type="password" name="password" placeholder="Password" required />

        <button className={styles.button} type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Log In"}
        </button>

        {state?.message && <p className={styles.p}>{state?.message}</p>}
      </form>
    </div>
  );
}
