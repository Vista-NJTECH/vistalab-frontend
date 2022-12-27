import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "用户名" },
        password: { label: "password", type: "password", placeholder: "密码" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        if (username !== "admin" || password !== "admin") return null;
        return { name: "Cael", email: "dsafds@qq.com" };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
