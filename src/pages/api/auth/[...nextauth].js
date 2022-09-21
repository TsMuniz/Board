import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GIT_HUB_CLIENT_ID,
      clientSecret: process.env.GIT_HUB_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token from a provider.
      
  //     return console.log(user)
  //   }
  // },
  secret: process.env.SECRET
}

export default NextAuth(authOptions)