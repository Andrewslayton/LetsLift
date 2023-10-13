"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <header className="flex gap-4 p-4 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <Link href="/">
          <h1>Home</h1>
        </Link>
        <div className="flex gap-4 ml-auto">
          <p className="text-gray-600 dark:text-gray-400">
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
    <header className="flex gap-4 p-4 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <button onClick={() => signIn()} className="text-blue-600 ml-auto">
        Sign in
      </button>
    </header>
  );
};
export default SignInButton;
