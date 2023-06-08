"use client";

import { SignInForm } from "~/app/sign-in/page";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/ui/dialog";
import { useRouter } from "next/navigation";

export default function SignInModal() {
  const router = useRouter();

  return (
    <DialogContent
      onClick={() => {
        void router.back();
      }}
      className="font-sans sm:max-w-[425px]"
    >
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-stone-600">
          Sign In
        </DialogTitle>
        <DialogDescription className="text-lg">
          Sign in to your account to continue
        </DialogDescription>
      </DialogHeader>
      <SignInForm />
    </DialogContent>
  );
}
