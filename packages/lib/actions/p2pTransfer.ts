"use server";

import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import { prisma } from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const from = session?.user?.id;
    if (!from) {
      return {
        message: "User Not Authenticated",
      };
    }
   
    const toUser = await prisma.user.findUnique({
      where: {
        email: to,
      },
    });
    if (!toUser) {
      return {
        message: "User Doesnot Exists",
      };
    }
    else if (toUser.id == Number(from)) {
      return {
        message: "Why are you sending money to your self??"
      }
    }

    prisma.$transaction(async (tx) => {
       await tx.$queryRaw`SELECT FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: {
          userId: Number(from),
        },
      });
      if (!fromBalance || fromBalance.amount < amount) {
        return {
          message: "Insufficient Funds",
        };
      }
      // await new Promise(r => setTimeout(r, 4000))
      
      await tx.balance.update({
        where: {
          userId: Number(from),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });
      await tx.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });
      await tx.p2pTransfer.create({
        data: {
          amount,
          timestamp: new Date(),
          fromUserId: Number(from),
          toUserId: toUser.id,
        }
      })
    });
    
    return {
      message: "Transaction Successfull",
    };
  } catch (error) {
    return {
      message: "Some Error Occured"
    }
  }
}
