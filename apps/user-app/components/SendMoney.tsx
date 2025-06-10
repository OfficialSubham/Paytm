"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { z } from "zod";
import { useState } from "react";
import { p2pTransfer } from "@repo/lib/actions/p2pTransfer";

const SendMoney = () => {
  const sendMoneySchema = z.object({
    email: z.string().email(),
    amount: z.number().gt(0),
  });
  const [amount, setAmount] = useState(0);
  const [reciever, setReciever] = useState("");
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReciever(e.target.value);
  };
  const handelSendMoney = async () => {
    const result = sendMoneySchema.safeParse({
      email: reciever,
      amount,
    });
    if (!result.success) {
      return alert("Enter Proper Credentials");
    }
    const amountInPaise = amount * 100;
    const { message } = await p2pTransfer(reciever, amountInPaise);
    console.log(message);
    return alert(message);
  };
  return (
    <Card title="Send">
      <div className="flex gap-3 flex-col">
        <div className="flex flex-col gap-1">
          <div>Email</div>
          <input
            type="text"
            className="px-3 rounded-md h-8"
            placeholder="alex@email.com"
            value={reciever}
            onChange={handleEmail}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>Amount</div>
          <input
            type="number"
            className="rounded-md h-8 px-3"
            placeholder="6969"
            value={amount != 0 ? amount : ""}
            onChange={handleAmount}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={handelSendMoney}>Send</Button>
      </div>
    </Card>
  );
};

export default SendMoney;
