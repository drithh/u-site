"use client";

import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Button } from "~/ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "~/ui/use-toast";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";

interface SignInFormProps {
  linkToSignUp?: boolean;
  successCallback?: () => void;
}

export default function SignInForm({
  linkToSignUp,
  successCallback,
}: SignInFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      console.log("submit");
      const data = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      console.log(data);
      if (data?.error) {
        toast({
          variant: "destructive",
          title: data.error,
        });
      } else {
        toast({
          title: "Signed in successfully",
        });
        if (successCallback) {
          successCallback();
        } else {
          router.push("/");
        }
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-4 font-sans ">
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="email" className="text-lg text-stone-600">
          Email
        </Label>
        <Input ref={emailRef} type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="password" className="text-lg text-stone-600">
          Password
        </Label>
        <Input
          ref={passwordRef}
          type="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <Button
        type="button"
        onClick={handleSubmit}
        className="mt-6 w-full bg-stone-400 text-lg font-semibold text-white"
      >
        Sign In
      </Button>
      {/* or */}
      <div className="flex flex-col items-center gap-2">
        <div className="my-5 h-0.5 w-full bg-stone-200">
          <span className="white relative left-1/2 top-1/2 inline-block  -translate-x-1/2 -translate-y-[55%] transform bg-white px-2 text-lg text-stone-600">
            Or
          </span>
        </div>
        <Button
          type="submit"
          className="w-full bg-stone-400 text-lg font-semibold text-white"
          onClick={() => {
            void signIn("google", {
              callbackUrl: "/",
            });
          }}
        >
          Sign In with Google
        </Button>
      </div>
      {/* dont have an account? */}

      {linkToSignUp && (
        <div className="flex flex-col items-center gap-2">
          <div className="text-stone-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-stone-400 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
