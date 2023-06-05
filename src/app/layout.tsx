import "~/styles/globals.css";
import { Playfair_Display, Lato } from "next/font/google";
import { twMerge } from "tailwind-merge";
import Providers from "~/lib/providers";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={twMerge(
            " flex min-h-screen place-content-center  ",
            lato.variable,
            playfair.variable
          )}
        >
          <div className="w-full max-w-5xl">
            {children}
            <footer className="mt-8 border-2 border-solid border-stone-200 px-8 py-4 font-sans">
              s
            </footer>
          </div>
        </body>
      </html>
    </Providers>
  );
}
