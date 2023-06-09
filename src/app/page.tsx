import Organizations from "~/component/organization";

export default function Home() {
  return (
    <>
      <header className="mt-8 flex flex-col place-items-center gap-4 border-2 border-solid border-stone-200 pb-8 pt-4  font-serif">
        <h1 className="text-[5rem] font-bold">UKM UNS</h1>
        <h3 className="max-w-2xl text-center text-3xl font-medium">
          Wadah aktivitas kemahasiswaan luar kelas untuk mengembangkan minat,
          bakat dan keahlian
        </h3>
      </header>
      <main className="mt-8 border-2 border-solid border-stone-200 px-8 py-4 font-sans">
        <Organizations />
      </main>
    </>
  );
}
