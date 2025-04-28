"use client"

import { RootState } from "@repo/store/store";
import { useSelector } from "react-redux";


export default function Page() {
  const balance = useSelector((state: RootState) => state.balance.value)

  return (
    <>
    <div>

    </div>
      <div className="text-4xl">hi there {balance}</div>
    </>
  );
}
