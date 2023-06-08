import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Button } from "~/ui/button";
import Link from "next/link";
export default function SignIn() {
  return (
    <div className="mt-8 flex flex-col place-items-center gap-4 border-2 border-solid border-stone-200 pb-8 pt-4  font-serif">
      <h1 className="text-[5rem] font-bold">Sign In</h1>
      <div className="w-4/5 border-y-2 border-solid border-stone-200 px-8 py-4">
        <SignInForm linkToSignUp />
      </div>
    </div>
  );
}

interface SignInFormProps {
  linkToSignUp?: boolean;
}

export function SignInForm({ linkToSignUp }: SignInFormProps) {
  return (
    <div className="flex flex-col gap-4 font-sans ">
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="email" className="text-lg text-stone-600">
          Email
        </Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="password" className="text-lg text-stone-600">
          Password
        </Label>
        <Input type="password" id="password" placeholder="Password" />
      </div>
      <Button
        type="submit"
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
