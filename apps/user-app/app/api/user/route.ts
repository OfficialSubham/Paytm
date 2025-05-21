import { PrismaClient } from "@repo/db/client"
import { NEXT_AUTH } from "@repo/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
const client = new PrismaClient();
export const GET = async () => {
    // await client.user.create({
    //     data: {
    //         email: "asd",
    //         name: "adsads"
    //     }
    // })
    const session = await getServerSession(NEXT_AUTH);
    return NextResponse.json({
        message: "hi there",
        session
    })
}