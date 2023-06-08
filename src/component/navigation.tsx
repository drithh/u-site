import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogTrigger } from "~/ui/dialog";

interface NavigationProps {
  signInModal: React.ReactNode;
  signUpModal: React.ReactNode;
}

export default function Navigation({
  signInModal,
  signUpModal,
}: NavigationProps) {
  return (
    <nav className="mt-6 flex place-content-between place-items-center  gap-4 border-2 border-solid border-stone-200 px-4 py-3 text-justify font-serif">
      <Link href="/">
        <Image
          src="/nav-logo.webp"
          alt="U-Site Logo"
          width={240}
          height={240}
          className="rounded-x w-32 max-w-sm"
        ></Image>
      </Link>

      <div className="flex flex-row gap-4 font-sans">
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
      </div>
    </nav>
  );
}
