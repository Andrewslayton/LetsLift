"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <header className="flex gap-4 p-4 bg-black">
        <div className="flex gap-4 ml-auto">
          <p className="text-blue-300">
            {session.user.name}
          </p>
          <button onClick={() => signOut()} className="text-red-600">
            Sign out
          </button>
        </div>
      </header>
    );
  }
  return (
    <header className="flex gap-4 p-4 bg-black">
      <Link href="/">
        <h1 className="text-blue-300">Home</h1>
      </Link>
      <Link href="/aboutPage">
        <h1 className="text-blue-300">about</h1>
      </Link>
      <button onClick={() => signIn()} className="text-blue-300 ml-auto">
        Sign in
      </button>
    </header>
  );
};
export default SignInButton;
