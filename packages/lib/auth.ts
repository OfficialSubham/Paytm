import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import dotenv from "dotenv";
import path from "path";
import Facebook from "next-auth/providers/facebook";
import z from "zod";
import { prisma } from "@repo/db/client";
import { compare, hash } from "bcryptjs"


dotenv.config({
  path: path.resolve(`${process.cwd()}`, "../..", ".env")
})


const userSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(5)
})

interface UserReturn {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      //All the login stuff
      name: "credentials",
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
        password: {
          label: "Password", type: "password",
          placeholder: "123456"
        },
        type: { label: "type", type: "text" }
      },
      async authorize(credentials: any): Promise<any> {
        //console.log("CREDENTIALS : ", credentials)
        try {
          const validData = userSchema.safeParse(credentials);

          if (!validData.success) {
            throw new Error("Invalid input: Check Your input properly");
          }

          const isLogin = credentials.type === "login";
          if (isLogin) {
            const { email, password } = credentials;
            if (!email || !password) {
              throw new Error("Invalid: Enter valid credentials")
            }
            const checkUserExist = await prisma.user.findUnique({
              where: {
                email
              }
            });
            if (!checkUserExist) {
              throw new Error("Invalid User doesnot Existed")
            }
            if (checkUserExist.authType !== "credentials") {
              throw new Error("User doesnot login with credentials")

            }
            const validPassword = await compare(password, checkUserExist.password || "");
            if (!validPassword) {
              throw new Error("Invalid input: Check Your Email and Password");
            }
            return {
              id: checkUserExist.id,
              firstName: checkUserExist.firstName,
              lastName: checkUserExist.lastName,
              email: checkUserExist.email
            }


          }


          const { email, firstName, lastName, password } = credentials;
          const checkUserExist = await prisma.user.findUnique({
            where: {
              email
            }
          });

          if (checkUserExist) {
            throw new Error("User already Existed with this email");
          }

          const hashPassword = await hash(password, 10);

          const newUser = await prisma.user.create({
            data: {
              email,
              firstName,
              lastName,
              password: hashPassword,
              authType: "credentials"
            }
          })

          return {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
          }


        } catch (error) {
          throw error;
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
    async jwt({ token, user, account }) {
      console.log("USER : ", user);
      console.log("ACCOUNT : ", account);

      if (user && account) {
        //check weather the user already Existed then do your stuff
        const checkUserExist = await prisma.user.findUnique({
          where: {
            email: user.email
          }
        })
        if (checkUserExist && checkUserExist.authType !== account.provider) {
          throw new Error("Invalid: account does not logged in with these credentials");
        }
        if (checkUserExist) {
          token.id = checkUserExist.id;
          token.name = user.firstName + " " + user.lastName;
          token.email = user.email;
          token.image = user.image;
        }
        else {
          const newUser = await prisma.user.create({
            data: {
              authType: account.provider,
              email: user.email,
              image: user.image,
              firstName: user.name.split(" ")[0],
              lastName: user.name.split(" ")[1]
            }
          })
          token.id = newUser.id;
          token.name = newUser.firstName + " " + newUser.lastName;
          token.email = newUser.email;
          token.image = newUser.image;
        }

        return token;

      }

      else if (user) {
        token.id = user.id;
        token.name = user.firstName + " " + user.lastName;
        token.email = user.email;
        token.image = user.image;
      }
      console.log("TOKEN : ", token);
      return token;
    },
    session: ({ session, token }: any) => {
      console.log("SESSION : ", session);
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.id = token.id;
      if (token.image) {
        session.user.image = token.image;
      }
      return session;
    },
    redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allow redirection to URLs from the same origin (domain)
      // Default to the base URL
      // console.log("URL : ", url, "BASEURL : ", baseUrl)
      // const frontendURL = new URL("http://localhost:3000");
      // const backendURL = new URL(url, baseUrl);
      // const error = backendURL.searchParams.get("error");

      // if (error) {
      //   frontendURL.pathname = "/signup";
      //   frontendURL.searchParams.set("error", error);
      // }

      console.log("URL : ", url, "BASEURL : ", baseUrl)

      return baseUrl;
    }
  },
  pages: {
    signIn: "/signup",
    error: "/signup"
  },
  debug: true,

}
