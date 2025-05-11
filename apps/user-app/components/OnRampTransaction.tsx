import { Card } from "@repo/ui/card";

export const OnRampTransaction = ({ transaction }: {
  transaction: {
    id: number;
    time: Date;
    amount: number;
    //  TODO : type of status more specific 
    status: string;
    provider: string;
  }[]
}) => {
  if (!transaction.length) {
    return <Card title="Recent Transaction">
      <div className="w-full text-center py-8">
        No Recent Transaction
      </div>
    </Card>
  }
  else {
    return (
      <Card title="Recent Transaction">
        <div className="w-full p-2 flex flex-col">
          {transaction.map((t) => {
            return (
              <div className="flex justify-between" key={t.id}>
                <div>
                  <div className="text-sm">Recieved INR</div>
                  <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}
                  </div>
                </div>
                <div>
                  + Rs {t.amount / 100}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    )
  }

}

