import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GIT_HUB_CLIENT_ID,
      clientSecret: process.env.GIT_HUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET
}

export default NextAuth(authOptions)