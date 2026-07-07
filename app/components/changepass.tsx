"use client";

import { useActionState } from "react";
import { changePassword } from "../actions/actions.js";

import styles from "./changepass.module.css";

interface FormState {
  success: boolean;
  message: string;
}

const initialState: FormState = {
  success: false,
  message: "",
};

export default function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, initialState);

  return (
    <div className={styles.container}>
      <h3>Change Password</h3>
      
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input 
          className={styles.input}
          type="password" 
          name="newPassword" 
          placeholder="Enter new password" 
          required 
        />
        
        <button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Password"}
        </button>
      </form>

      {state?.message && (
        <p style={{ color: state.success ? "green" : "red", marginTop: "10px" }}>
          {state.message}
        </p>
      )}
    </div>
  );
}
