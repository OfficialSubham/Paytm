import { NEXT_AUTH } from "@repo/lib/auth";
import NextAuth from "next-auth";
import path from "path"
import dotenv from "dotenv"

dotenv.config({
  path: path.resolve(`${process.cwd()}`, "../..", ".env")
})

// console.log("DATABASE_URL : ", process.cwd())

const handler = NextAuth(NEXT_AUTH);



export const GET = handler;
export const POST = handler;
