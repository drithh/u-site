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
  console.log(session);
  return (
    <div className="flex flex-row gap-4 font-sans">
      {session.status === "authenticated" ? (
        <Profile data={session.data} />
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
import { toast } from "~/ui/use-toast";
import type { Session } from "next-auth";

interface ProfileProps {
  data: Session;
}

export function Profile({ data }: ProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={null} className="h-12 w-12 rounded-full">
          <Avatar className="h-12 w-12">
            {/* {data.user.image && (
              <AvatarImage
                src={data.user.image}
                alt={data.user.name ?? "User Image"}
              />
            )} */}
            <AvatarFallback>
              {data.user.name?.slice(0, 2).toUpperCase() ?? "AA"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-sans">
        {data.user.organizationId?.length && (
          <Link
            href={`/organizations/${data.user.organizationId}/edit`}
            className="w-full"
          >
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>UKM</span>
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <button
          onClick={() => {
            toast({
              title: "Logged out",
            });
            void signOut({
              callbackUrl: "/",
            });
          }}
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
