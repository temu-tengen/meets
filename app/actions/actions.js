"use server";

import { neon } from "@neondatabase/serverless";
import { strict } from "assert";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function loginAction(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  let loginSuccessful = false;

  if (!username || !password) {
    return { success: false, message: "Missing username or password" };
  }

  try {

    const sql = neon(process.env.DATABASE_URL);
    const users = await sql`
      SELECT * FROM users 
      WHERE username = ${username} AND password = ${password} 
      LIMIT 1
    `;

    if (users.length > 0) {
      loginSuccessful = true;
      const cookieStore = await cookies();

      cookieStore.set(
        {
          name: "session_token",
          value: "dakdhjakshdajksdhajkshdajkshdajksdhauqhewihjabdnakjnsmadhwhdjkahdnjks",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
          path: "/",
        }
      );

      cookieStore.set({
        name: "username",
        value: username,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      })
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, message: "An error occurred during login" };
  }

  if (loginSuccessful) {
    redirect("../dashboard");
  }
}

export async function logoutAction() {
  let logoutSuccessful = false;

  try {
    const cookieStore = await cookies();

    cookieStore.set({
      name: "session_token",
      value: "",
      maxAge: 0,
      path: "/",
    });

    logoutSuccessful = true;
  } catch (error) {
    console.error("Logout error:", error);
  }

  if (logoutSuccessful) {
    redirect("../");
  }
}

export async function changePassword(prevState, formData) {
  try {
    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;
    
    const sql = neon(process.env.DATABASE_URL);
    await sql`
    UPDATE users
    SET password = ${formData.get("newPassword")}
    WHERE username = ${username};
  `;
  } catch (error) {
    return { success: false, message: "pass not changed/error pls try agen later arigatogozaimasu"}
  }

  return { success: true, message: "pass changed"}
}

