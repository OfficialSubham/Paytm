import { Button } from "./button"

interface AppbarProps {
  user?: {
    name?: string | null;
  },
  onSignIn: any;
  onSignOut: any;
}

export const Appbar = ({ user, onSignIn, onSignOut }: AppbarProps) => {
  return (
    <>
      <div className="flex justify-between sticky top-0 px-5 py-2 border border-b-2">
        <div className="text-3xl font-bold">
          PayTM
        </div>
        <div>
          <Button onClick={user ? onSignOut : onSignIn}>{user ? "Logout" : "Login"}</Button>

        </div>
      </div>
    </>
  )
}

