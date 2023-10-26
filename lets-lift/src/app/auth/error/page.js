"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">Authentication Error</h2>
      <pre className="w-full bg-gray-200 p-2">{decodeURI(error ?? "")}</pre>
      <p className="opacity-75">Try signing in again...</p>
    </div>
  );
}
