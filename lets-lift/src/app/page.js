// pages/index.js
import React from "react";
import { getServerSession } from "next-auth";
import styles from "../styles/Home.module.css";
import { redirect } from "next/navigation";
import { Background } from "@/components/animatedBackground";

export const metadata = {
  title: "Lets Lift!",
  description: "An app to find lift buddies!",
};

export default async function Home() {
  const session = await getServerSession();
  if (session && session.user) {
    redirect("/liftSelection");
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lets Lift!</h1>
      <Background />
      <a className={styles.button} href="/api/auth/signin">
        Sign in
      </a>
    </div>
  );
}
