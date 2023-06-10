import { api } from "~/trpc/server";
import CloudinaryImage from "~/component/image";
import type { Member, WorkProgram, Achievement } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";
import Reviews from "./component/review";
import dayjs from "dayjs";
export default async function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  const organization = await api.organization.getOrganizationById.query({
    id: params.organizationId,
  });

  return (
    <>
      <header className="mt-8 flex  flex-col place-items-center gap-4  border-2 border-solid border-stone-200 p-8 text-justify font-serif md:block">
        <div>
          <div className="w-full  max-w-sm rounded-xl bg-stone-600 md:float-left md:mr-6">
            <CloudinaryImage
              imagePath={organization.detail?.image ?? undefined}
            />
          </div>

          <div className="-mt-4 mb-4 text-center text-[5rem] font-bold md:text-justify">
            {organization.detail?.name}
          </div>
          <span className=" max-w-2xl text-3xl font-medium">
            {organization.detail?.description}
          </span>
        </div>
        <div className="clear-left mb-5 w-full pt-5">
          <span className="text-3xl font-semibold">Tanggal Berdiri:</span>
          <span className="pl-2 text-3xl">
            {dayjs(organization.detail?.establishedAt).format("DD MMMM YYYY") ??
              "-"}
          </span>
        </div>
        <div className="mb-5 w-full">
          <div className="text-3xl font-semibold">Visi:</div>
          <div className="pl-5 text-3xl">{organization.detail?.vision}</div>
        </div>
        <div className="w-full">
          <div className="text-3xl font-semibold">Misi:</div>
          <div className="pl-5 text-3xl">{organization.detail?.mission}</div>
        </div>
      </header>
      <main className="mt-8 flex flex-col gap-8">
        <Achievements achievements={organization.achievements} />
        <Members members={organization.members} />
        <WorkPrograms workPrograms={organization.workPrograms} />
        <Reviews reviews={organization.reviews} />
      </main>
    </>
  );
}

function Achievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="achievement border-2 border-solid border-stone-200 p-8">
      <h2 className="mb-12 text-center text-5xl font-bold uppercase">
        Prestasi
      </h2>
      <div className="my-6 grid grid-cols-1 gap-8 font-sans md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex flex-col items-center justify-center gap-2 border-y-2 border-solid border-stone-200  px-4 py-6"
          >
            <h3 className="text-center text-xl font-bold">
              {achievement.title}
            </h3>
            <p className="opacity-60">
              {achievement.date.toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Members({ members }: { members: Member[] }) {
  return (
    <div className="member border-2 border-solid border-stone-200 p-8">
      <h2 className="mb-12 text-center text-5xl font-bold uppercase">
        Keanggotaan
      </h2>
      <div className="my-6 grid grid-cols-1 gap-8 font-sans md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center justify-center border-y-2 border-solid border-stone-200  p-4"
          >
            <h3 className="text-center text-xl font-bold">{member.name}</h3>
            <p className="text-lg">{member.position}</p>
            <p className="text-lg">{member.studentId}</p>
            <p className="opacity-60">{member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkPrograms({ workPrograms }: { workPrograms: WorkProgram[] }) {
  return (
    <div className="work-program border-2 border-solid border-stone-200 p-8">
      <h2 className="mb-12 text-center text-5xl font-bold uppercase">
        Program Kerja
      </h2>
      <div className="my-6 font-sans">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg font-semibold text-black">
                Nama
              </TableHead>
              <TableHead className="text-lg font-semibold text-black">
                Tanggal
              </TableHead>
              <TableHead className="text-lg font-semibold text-black">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workPrograms.map((workProgram) => (
              <TableRow key={workProgram.id} className="">
                <TableCell className="line-clamp-1 h-12 w-52  text-lg text-stone-700 md:w-[34rem]">
                  {workProgram.title}
                </TableCell>
                <TableCell className="text-lg text-stone-700">
                  {workProgram.date.toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-lg text-stone-700">
                  {workProgram.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
