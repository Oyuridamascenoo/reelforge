import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

const config: any = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Admin credentials for Yuri
        if (
          credentials.email === 'yuridamacenonodigital@hotmail.com' &&
          credentials.password === 'axioma.service@15'
        ) {
          return {
            id: 'admin-1',
            email: 'yuridamacenonodigital@hotmail.com',
            name: 'Yuri Admin',
            role: 'admin',
          };
        }

        // Regular user credentials
        return {
          id: credentials.email,
          email: credentials.email,
          name: 'User',
          role: 'user',
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session && session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) || 'user';
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(config);

export { handler as GET, handler as POST };
