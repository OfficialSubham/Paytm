import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import dotenv from "dotenv";
import path from "path";
import Facebook from "next-auth/providers/facebook";

dotenv.config({
    path: path.resolve(`${process.cwd()}`, "../..",".env")
})

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            //All the login stuff
            name: "Email",
            credentials: {
                username: {
                    label: "Username", type: "text",
                    placeholder: "alex123"
                },
                password: {
                    label: "Password", type: "password",
                    placeholder: "123456"
                }
            },
            async authorize(credentials: any) {
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
        session: ({session, token}: any) => {
            session.user.id = token.sub;
            return session;
        }
    },
    pages: {
        signIn: "/signup"
    },
    debug: true
}
