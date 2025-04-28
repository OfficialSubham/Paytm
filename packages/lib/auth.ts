import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import dotenv from "dotenv";
import path from "path";
import Facebook from "next-auth/providers/facebook";
import { signIn } from "next-auth/react";

dotenv.config({
  path: path.resolve(`${process.cwd()}`, "../..", ".env")
})

interface ICredentials {
  firstName: string;
  lastName: string;
  email: string;
  hashPassword: string;
}

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      //All the login stuff
      name: "Email",
      credentials: {
        firstName: {
          label: "First Name", type: "text",
          placeholder: "alex123"
        },
        lastName: {
          label: "Last Name", type: "text",
          placeholder: "alex123"
        },
        email: {
          label: "email", type: "text",
          placeholder: "my@mail.com"
        },
        hashPassword: {
          label: "Password", type: "password",
          placeholder: "123456"
        }
      },
      async authorize(credentials: any) {
        // console.log(credentials)


        return {
          //define user info to save in the cookie
          id: "1",
          name: "myname",
          email: "mymail"
        }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.CLIENT_SECRET || ""
    }),
    Facebook({
      clientId: process.env.APP_ID || "",
      clientSecret: process.env.APP_SECRET || ""
    })

  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token }: any) => {
      // console.log(session);

      session.user.id = token.sub;
      return session;
    },
    redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allow redirection to URLs from the same origin (domain)
       // Default to the base URL
      console.log("URL : ",url, "BASEURL : ",baseUrl)
      return "http://localhost:3000"
      }
  },
  pages: {
    signIn: "/signup"
  },
  debug: true,

}
