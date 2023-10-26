import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { createNewUser, getUserById } from '@/lib/db/users';
export const authOptions = ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
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
  },
  pages : {
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
const handler = NextAuth(authOptions);
export { handler as GET , handler as POST };
