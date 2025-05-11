"use client"

import { Appbar } from "@repo/ui/AppBar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export const AppbarClient = () => {
  const router = useRouter();
  const session = useSession();
  return (
    <div>
      <Appbar onSignIn={signIn} onSignOut={async () => {
        await signOut()
        router.push("/api/auth/signin")
      }}
        user={session.data?.user}
      />
    </div>

  )
}

