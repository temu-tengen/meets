"use client";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <div className="header">
      <h1 className="siteTitle">PFF Meets</h1>

      <ul className="navLinks">
        <li>
          <button className="link" onClick={() => { router.push("/dashboard"); }}>Dashboard</button>
        </li>
        <li>
          <button className="link" onClick={() => {  router.push("/viewmeets"); }}>View Meets</button>
        </li>
        <li>
          <button className="link" onClick={() => {  router.push("/addmeet"); }}>Add Meet</button>
        </li>
        <li className="link">
          <button className="comingSoonFont" onClick={() => {  router.push("/anchat"); }}>Anchat (Coming Soon)</button>
        </li>
      </ul>
    </div>

  );
}