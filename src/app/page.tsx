// import Link from "next/link";
import { api } from "~/trpc/server";
// import image from next/image
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex flex-col place-items-center gap-4 font-serif">
        <h1 className="text-[5rem] font-bold">UKM UNS</h1>
        <h3 className="max-w-2xl text-center text-3xl font-medium">
          Wadah aktivitas kemahasiswaan luar kelas untuk mengembangkan minat,
          bakat dan keahlian
        </h3>
      </header>
      <main className="mt-20 font-sans">
        {/* @ts-expect-error - Async Server Component */}
        <Organizations />
      </main>
    </>
  );
}

async function Organizations() {
  const organizations = await api.organization.getOrganizations.query({});

  return (
    <div className="flex flex-col place-content-center gap-4 border-t-2 border-solid border-stone-200">
      {organizations.map((organization) => (
        <div
          key={organization.id}
          className="border-b-2 border-solid border-stone-200 p-6"
        >
          <div className="flex gap-4">
            <div className="h-48 w-48">
              <Image
                src={organization.image ?? ""}
                alt={organization.name}
                className="h-full w-full rounded-lg bg-stone-600"
              ></Image>
            </div>
            <div className="flex h-48 flex-1 flex-col place-content-between gap-3">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-stone-700">
                  {organization.name}
                </h3>
                <p className="line-clamp-3  text-justify text-lg text-stone-500">
                  {organization.description}
                </p>
              </div>
              <div className="flex place-content-end">
                <Link
                  href={`/organization/${organization.id}`}
                  className="text-lg font-bold  text-stone-500 hover:underline"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
