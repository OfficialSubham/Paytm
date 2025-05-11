import { Card } from "@repo/ui/card";

export const Balancecard = ({ amount, locked }: {
  amount: number;
  locked: number
}) => {
  return (
    <Card title="Balance">
      <div className="w-full flex justify-between border-b-2 border-black py-2">
        <span className="w-full h-1">
          Unlocked Balance
        </span>
        <div className="flex w-full justify-end">{amount / 100} INR</div>
      </div>
      <div className="w-full flex justify-between border-b-2 border-black py-2">
        <span className="w-full h-1">
          Total Locked Balance
        </span>
        <div className="flex w-full justify-end">{locked / 100} INR</div>
      </div>
      <div className="w-full flex justify-between border-b-2 border-black py-2">
        <span className="w-full h-1">
          Total Balance
        </span>
        <div className="flex w-full justify-end">{(amount + locked) / 100} INR</div>
      </div>
    </Card>
  )

}

