"use client";

import { SignUpForm } from "~/app/sign-up/page";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/ui/dialog";
import { useRouter } from "next/navigation";

export default function SignUpModal() {
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
          Sign Up
        </DialogTitle>
        <DialogDescription className="text-lg">
          Sign up to create your account
        </DialogDescription>
      </DialogHeader>
      <SignUpForm />
    </DialogContent>
  );
}
