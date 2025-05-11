"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { useState } from "react";

export const AddMoney = () => {
  const SUPPORTED_BANKS = [
    {
      name: "HDFC Bank",
      redirectUrl: "https://netbanking.hdfcbank.com"
    },
    {
      name: "AXIS Bank",
      redirectUrl: "https://netbanking.axisbank.com"
    },
    {
      name: "ICICI Bank",
      redirectUrl: "https://netbanking.icicibank.com"
    }

  ]
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);

  return (
    <Card title="Add Money">
      <div className="mb-3">
        <h6 className="text-sm">Amount</h6>
        <input type="number" className="w-full border rounded-md px-2 h-8" placeholder="Amount" />
      </div>
      <div className="mb-3">
        <h6 className="text-sm">Bank</h6>
        <Select options={SUPPORTED_BANKS.map(bank => {
          return {
            key: bank.name,
            value: bank.name,
          }
        })} onSelect={(value) => {
          setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl);
        }}>
        </Select>
      </div>
      <div className="flex items-center justify-center w-full">
        <Button onClick={() => {
          window.location.href = redirectUrl || "";
        }} >
          <span>Add Money</span>
        </Button>
      </div>
    </Card>

  )
}

