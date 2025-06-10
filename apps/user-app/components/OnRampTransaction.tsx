import { Card } from "@repo/ui/card";

enum Color {
  Success,
  Failure,
  Processing,
}
const colorClassMap: Record<string, string> = {
  "Failure": "text-red-500",
  "Success": "text-green-500",
  "Processing": "text-slate-600"
};
const negPosMap: Record<string, string> = {
  "Failure": "-",
  "Success": "+"
};

export const OnRampTransaction = ({
  transaction,
}: {
  transaction: {
    id: number;
    time: Date;
    amount: number;
    //  TODO : type of status more specific
    status: string;
    provider: string;
  }[];
}) => {
  if (!transaction.length) {
    return (
      <Card title="Recent Transaction">
        <div className="w-full text-center py-8">No Recent Transaction</div>
      </Card>
    );
  } else {
    const getColor = (status: string) => {
      // console.log(colorClassMap)
      // console.log(status, colorClassMap[status]);
      return colorClassMap[status] || "";
    };

    return (
      <Card title="Recent Transaction">
        <div className="w-full p-2 flex flex-col max-h-[26rem] overflow-y-scroll">
          {transaction.map((t) => {
            console.log(t.status)
            return (
              <div className="flex justify-between" key={t.id}>
                <div>
                  <div className="text-sm">Recieved INR</div>
                  <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}
                  </div>
                </div>
                <div className={`${getColor(t.status)}`}>
                   {negPosMap[t.status]} Rs {t.amount / 100}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
};
