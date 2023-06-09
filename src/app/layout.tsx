import "~/styles/globals.css";
import { Playfair_Display, Lato } from "next/font/google";
import { twMerge } from "tailwind-merge";
import Providers from "~/lib/providers";
import Image from "next/image";
import Link from "next/link";
import { Copyright } from "lucide-react";
import { Toaster } from "~/ui/toaster";
import Navigation from "~/component/navigation";

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "U-Site",
  description: "Carilah UKM yang sesuai dengan minat dan bakatmu",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default  function RootLayout({
  children,
  signInModal,
  signUpModal,
}: {
  children: React.ReactNode;
  signInModal: React.ReactNode;
  signUpModal: React.ReactNode;
}) {
  return (
    <Providers >
      <html lang="en">
        <body
          className={twMerge(
            " flex min-h-screen place-content-center  ",
            lato.variable,
            playfair.variable
          )}
        >
          <div className="w-full max-w-5xl">
            <Navigation signInModal={signInModal} signUpModal={signUpModal} />
            {children}
            <footer className="my-8 flex flex-row place-content-center place-items-center gap-4 border-2 border-solid border-stone-200 px-8 py-4 font-sans">
              <div className="flex h-24 w-full flex-col place-content-between place-items-start px-8">
                <div className="h-0.5 w-4/5 bg-stone-200"></div>
                <div className="h-0.5 w-4/5 place-self-end bg-stone-200"></div>
                <div className="h-0.5 w-4/5 bg-stone-200"></div>
              </div>
              <div className="flex flex-col">
                <Link href="/">
                  <Image
                    src="/footer-logo.webp"
                    alt="U-Site Logo"
                    width={240}
                    height={240}
                    className="rounded-x w-32 max-w-sm"
                  ></Image>
                </Link>
                <div className="flex place-content-center text-stone-600">
                  <Copyright className="w-5" />
                  <span className="ml-2">2023 U-Site</span>
                </div>
              </div>
              <div className="flex h-24 w-full flex-col place-content-between place-items-end px-8">
                <div className="h-0.5 w-4/5 bg-stone-200"></div>
                <div className="h-0.5 w-4/5 place-self-start bg-stone-200"></div>
                <div className="h-0.5 w-4/5 bg-stone-200"></div>
              </div>
            </footer>
            <Toaster />
          </div>
        </body>
      </html>
    </Providers>
  );
}
