"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";
const Auth = () => {
  const { data: session } = useSession();
  const user = session?.user;
  if (user) {
    return (
      <div className="flex justify-center flex-col items-center gap-4">
        <div className="flex gap-4 items-center">
          <div className=" w-12 h-12 rounded-full overflow-hidden ">
            <Image
              src={user?.image ?? "/avatar.png"}
              width={50}
              height={50}
              alt="user"
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div>
            <p>Welcome Back</p>
            <p className="capitalize">{user.name}</p>
          </div>
        </div>

        <Button
          className="flex items-center gap-2 text-red-600 hover:text-red-800"
          variant="ghost"
          onClick={() => signOut()}
        >
          <span>Not You? Logout</span>
          <LogOutIcon size={20} />
        </Button>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <Button onClick={() => signIn()}>Login</Button>
    </div>
  );
};

export default Auth;
