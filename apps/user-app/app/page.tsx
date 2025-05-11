import { NEXT_AUTH } from "@repo/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect("/dashboard")
  }
  else {
    redirect("/api/auth/signin")
  }
}

export default Home
