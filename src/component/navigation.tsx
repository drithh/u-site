import Link from "next/link";
import Image from "next/image";
import Auth from "./auth";

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
      <Auth signInModal={signInModal} signUpModal={signUpModal} />
    </nav>
  );
}
