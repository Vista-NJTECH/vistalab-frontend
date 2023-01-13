import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXT_AUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const isFaceLogin = JSON.parse(req.body.isFaceLogin.toLowerCase());

        if (!isFaceLogin) {
          const res = await fetch(`${process.env.BACKEND_URL}api/login`, {
            method: "POST",
            body: new URLSearchParams({ username, password }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          });
          if (!res.ok) return null;

          const data = await res.json();
          if (!data.status) return null;

          const user = {
            username: data.userinfo.username,
            nickname: data.userinfo.name,
            email: data.userinfo.email,
            level: data.userinfo.level,
            group: data.userinfo.p_group,
            created_time: data.userinfo.created_time,
            avatar: data.userinfo.avatar,
            token: data.token,
          };
          return user;
        }

        const user = {
          username: username.username,
          nickname: username.name,
          email: username.email,
          level: username.level,
          group: username.p_group,
          created_time: username.created_time,
          avatar: username.avatar,
          token: password,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
