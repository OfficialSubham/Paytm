import bcrypt from "bcryptjs";
import { prisma } from "@repo/db/client";
import { signIn } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

interface IBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface IReq {
    body: IBody
}


export async function POST(req: NextRequest) {
    const body = await req.json()

    const { firstName, lastName, email, password } = body;

    try {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
            return NextResponse.json({ message: "User already Exists with this email" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashPassword
            },
            omit: {
                password: true
            }
        })
        //Login user automatically after signup

        const result = await signIn("credentials", {
            redirect: false,
            firstName,
            lastName,
            email
        })

        if (result?.error) {
            return NextResponse.json({ message: "Something Went Wrong" })
        }

        return NextResponse.json({ message: "User logged in successfully", status: 400 })


    } catch (error) {
        console.log(error)
    }

}