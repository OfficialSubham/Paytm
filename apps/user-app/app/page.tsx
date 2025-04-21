import { NEXT_AUTH } from "@repo/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(NEXT_AUTH);
  return (
    <>
    <div>
      {JSON.stringify(session)}
    </div>
      <div className="text-4xl">hi there</div>
    </>
  );
}
