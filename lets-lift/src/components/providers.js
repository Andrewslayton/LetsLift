"use client"
import React from "react";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;

