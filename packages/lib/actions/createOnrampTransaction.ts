"use server"
import crypto from "crypto"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import { useSession } from "next-auth/react";
import { prisma } from "@repo/db/client";

const generateRandomToken = (len = 32) => {
    return crypto.randomBytes(len).toString('hex');
}

export async function createTransactionEntry(amount: number, provider: string) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Un authenticated request"
        }
    }
    const id = session?.user?.id
    console.log("Session",session)
    const amountInPaise = amount * 100;
    const transaction = await prisma.onRampTransaction.create({
        data: {
            userId: Number(id),
            amount: amountInPaise,
            startTime: new Date(),
            status: "Processing",
            provider: provider,
            token: generateRandomToken(),
        },
    });
    console.log("THIS IS SESSION", transaction);
      return {
            message: "Done"
        }
};