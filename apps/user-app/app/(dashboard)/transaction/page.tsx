"use server";

import { prisma } from "@repo/db/client";
import { NEXT_AUTH } from "@repo/lib/auth";
import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";

const sendAndRecievedStats: Record<string, string> = {
  send: "-",
  recieved: "+",
};

const Transaction = async () => {
  const session = await getServerSession(NEXT_AUTH);

  const user = session?.user?.id;

  const p2pTransaction = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: user }, { toUserId: user }],
    },
    select: {
      amount: true,
      timestamp: true,
      toUser: true,
      fromUser: true,
    },
  });
  p2pTransaction.reverse();
  if (!p2pTransaction[0]) {
    return (
      <Card title="Recent Transaction">
        <div className="w-full text-center py-8">No Recent Transaction</div>
      </Card>
    );
  }
  return (
    <Card title="P2P Transactions">
      <div className="max-h-[82vh] py-8 flex-col overflow-y-scroll flex gap-4 pr-4 pl-2">
        {p2pTransaction[0] &&
          p2pTransaction.map((ts) => {
            return (
              <div
                key={`${ts.amount}${ts.timestamp}`}
                className="flex w-full h-14 justify-between"
              >
                <div>
                  <div className="text-sm">
                    To:{" "}
                    {user == ts.toUser.id
                      ? ts.fromUser.firstName
                      : ts.toUser.firstName}
                  </div>
                  <div className="text-slate-600 text-xs">
                    {ts.timestamp.toDateString()}
                  </div>
                </div>
                <div
                  className={
                    user == ts.toUser.id ? "text-green-500" : "text-red-500"
                  }
                >
                  {user == ts.toUser.id ? "+" : "-"} {ts.amount / 100}
                </div>
              </div>
            );
          })}
      </div>
    </Card>
  );
};

export default Transaction;
