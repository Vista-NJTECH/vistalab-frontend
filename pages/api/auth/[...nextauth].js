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
        const res = await fetch("http://124.223.196.177:8181/api/login", {
          method: "POST",
          body: new URLSearchParams({ username, password }),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data.status) return null;
        return { user: username, token: data.token };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
