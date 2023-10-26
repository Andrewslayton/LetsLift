import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { createNewUser, getUserById } from "@/lib/db/users";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const user_id = user.user.id; //THEY TROLLIN
      const dbUser = await getUserById(user_id);
      if (!dbUser) {
        await createNewUser(user.user);
      }
      return true;
    },
    async jwt({ token, account }) {
      if (!account) {
        return token;
      }
      const updatedToken = {
        ...token,
        id: account.providerAccountId,
      };
      return updatedToken;
    },
    async session({ session, token }) {
      const user = {
        ...session.user,
        id: token.id,
      };
      session.user = user;
      return session;
    },
  },
  pages: {
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
