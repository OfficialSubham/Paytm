import { type ReactNode } from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="font-bold mb-4 ">
        {title}
      </div>
      <div className="p-2 bg-gray-400/10 border rounded-md">
        {children}
      </div>
    </div>
  );
}
