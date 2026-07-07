"use server";

import { neon } from "@neondatabase/serverless";
import { strict } from "assert";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
    return { success: false, message: "pass not changed/error pls try agen later arigatogozaimasu" }
  }

  return { success: true, message: "pass changed" }
}

export async function addMeetAction(prevState, formData) {

  try {
    const sql = neon(process.env.DATABASE_URL);
    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;

    const voters = [];
    await sql`
      INSERT INTO meets (title, info, date, votes, voters, owner)
      VALUES (${formData.get("meetName")}, ${formData.get("meetInfo")}, ${formData.get("meetDate")}, 0, ${voters}, ${username});
    `;
  } catch (error) {
    console.error("Error adding meet:", error);
    return { success: false, message: "Error adding meet. Please try again later." };
  }

  return { success: true, message: "Meet added successfully." };
}

export async function getMeetsAction(prevState) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const meets = await sql`
      SELECT * FROM meets ORDER BY meetid DESC;`

    return meets;
  } catch (error) {
    return null;
  }

}

export async function voteMeetAction(meetid) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    

    const meetsList = await sql`
      SELECT * FROM meets WHERE meetid = ${meetid} LIMIT 1;
    `;

    if (meetsList.length > 0) {
      await sql`
        UPDATE meets
        SET votes = votes + 1
        WHERE meetid = ${meetid};
      `;

      revalidatePath("/viewmeets");
      return { success: true };
    }
    return { success: false, message: "Meet not found" };
  } catch (error) {
    console.error("Error voting:", error);
    return { success: false, message: "Server error" };
  }
}
