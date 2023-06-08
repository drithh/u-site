"use client";

import { Dialog, DialogTrigger } from "~/ui/dialog";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "~/ui/avatar";
import { signOut } from "next-auth/react";
interface AuthProps {
  signInModal: React.ReactNode;
  signUpModal: React.ReactNode;
}
export default function Auth({ signInModal, signUpModal }: AuthProps) {
  const session = useSession();
  const name = session.data?.user?.name ?? "AA";
  console.log(session);
  return (
    <div className="flex flex-row gap-4 font-sans">
      {session.status === "authenticated" ? (
        <Profile name={name} />
      ) : (
        <>
          <Link href="/sign-in">
            <Dialog>
              <DialogTrigger asChild>
                <button className="rounded-xl border-2 border-stone-200 px-4 py-2 hover:bg-stone-200 hover:text-stone-600">
                  Sign In
                </button>
              </DialogTrigger>
              {signInModal}
            </Dialog>
          </Link>
          <Link href="/sign-up">
            <Dialog>
              <DialogTrigger asChild>
                <button className="rounded-xl border-2 border-stone-200 px-4 py-2 hover:bg-stone-200 hover:text-stone-600">
                  Sign Up
                </button>
              </DialogTrigger>
              {signUpModal}
            </Dialog>
          </Link>
        </>
      )}
    </div>
  );
}

import { LogOut, Users } from "lucide-react";

import { Button } from "~/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu";

interface ProfileProps {
  name: string;
}

export function Profile({ name }: ProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={null}>
          <Avatar className="h-12 w-12">
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-sans">
        <Link href="/organization" className="hover:cursor-pointer">
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>UKM</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <button
          onClick={() =>
            void signOut({
              callbackUrl: "/",
            })
          }
          className="w-full hover:cursor-pointer"
        >
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
