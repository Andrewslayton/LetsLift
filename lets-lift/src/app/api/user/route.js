import { getUserById } from "@/lib/db/users";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = new URLSearchParams(req.nextUrl.searchParams);
  if (
    !searchParams ||
    (!searchParams.has("user_id") && !searchParams.has("user_ids"))
  ) {
    return NextResponse.error();
  }
  if (searchParams.has("user_ids")) {
    const user_ids = JSON.parse(
    decodeURIComponent(searchParams.get("user_ids"))
    );
    const users = await Promise.all(
      user_ids.map((user_id) => getUserById(user_id))
    );
    return NextResponse.json({ users });
  }
  const user = await getUserById(searchParams.get("user_id"));
  return NextResponse.json({ user });
}
