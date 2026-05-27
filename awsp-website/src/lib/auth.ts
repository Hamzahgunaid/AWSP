import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validUser = process.env.ADMIN_USERNAME || 'admin';
        const validPass = process.env.ADMIN_PASSWORD || 'awsp2025';
        if (
          credentials?.username === validUser &&
          credentials?.password === validPass
        ) {
          return { id: '1', name: 'AWSP Admin', email: 'admin@awsp.gov.ye' };
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
  pages: { signIn: '/admin/login' },
  secret: process.env.NEXTAUTH_SECRET,
};
