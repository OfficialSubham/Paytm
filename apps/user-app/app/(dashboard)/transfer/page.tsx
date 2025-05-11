import { Balancecard } from "../../../components/Balancecard"
import { OnRampTransaction } from "../../../components/OnRampTransaction"
import { AddMoney } from "../../../components/AddMoney"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "@repo/lib/auth"
import { prisma } from "@repo/db/client"
import { redirect } from "next/navigation"

async function getBalance() {
  const session = await getServerSession(NEXT_AUTH);
  if (!session?.user) {
    redirect("/login")
  }
  const balance = await prisma.balance.findUnique({
    where: {
      userId: Number(session?.user?.id)
    }
  })
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0
  }
}

async function getOnRampTransaction() {
  const session = await getServerSession(NEXT_AUTH);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id)
    }
  })
  return txns.map(t => ({
    id: t.id,
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider
  }))
}

const Transfer = async () => {
  const balance = await getBalance();
  const transaction = await getOnRampTransaction();
  return (
    <>
      <div className="font-bold text-4xl text-[#6a51a6] mb-5">Transfer</div>
      <div >
        <div className="w-full flex gap-4">
          <AddMoney />
          <div className="w-full">
            <Balancecard amount={balance.amount} locked={balance.locked}
            />
            <OnRampTransaction transaction={transaction} />
          </div>
        </div>
      </div>

    </>
  )
}

export default Transfer
