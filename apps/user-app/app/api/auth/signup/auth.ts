import bcrypt from "bcryptjs";
import { prisma } from "@repo/db/client";
import { signIn } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"


interface IBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface IReq {
    body: IBody
}

const bodySchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
}).strict()

// export async function POST(req: NextRequest) {
//     const body = await req.json()

//     const { firstName, lastName, email, password } = body;

//     try {
//         const validUser = bodySchema.safeParse(body)
//         if (!validUser.success) return NextResponse.json({ message: "Enter Valid Credentials" })
//         const user = await prisma.user.findUnique({
//             where: {
//                 email
//             }
//         })
//         if (user) {
//             return NextResponse.json({ message: "User already Exists with this email" })
//         }
//         const hashPassword = await bcrypt.hash(password, 10)
//         const newUser = await prisma.user.create({
//             data: {
//                 firstName,
//                 lastName,
//                 email,
//                 password: hashPassword
//             },
//             omit: {
//                 password: true
//             }
//         })
//         //Login user automatically after signup

//         const result = await signIn("credentials", {
//             redirect: false,
//             firstName,
//             lastName,
//             email,
//             hashPassword
//         })

//         if (result?.error) {
//             return NextResponse.json({ message: "Something Went Wrong" })
//         }

//         return NextResponse.json({ message: "User logged in successfully", status: 400 })


//     } catch (error) {
//         console.log(error)
//     }

// }

export const GET = () => {
    return NextResponse.json({message: "working"})
}