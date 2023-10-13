// pages/liftselect/page.js
import React from 'react';
import styles from '@/styles/liftSelection.module.css'; // Updated import path
import { getServerSession } from "next-auth";
import LiftSelection from '@/components/liftSelection';
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Lift Selection',
    description: 'Lift Selection',
    // ...
}

export default async function Page() {
    const session = await getServerSession();
    if (!session || !session.user) {
    redirect("/");
  }
    return (
        <div className={styles.container}>
           <LiftSelection/>
        </div>
    );
}





