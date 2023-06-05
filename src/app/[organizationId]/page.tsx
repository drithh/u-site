import { api } from "~/trpc/server";
import Image from "next/image";
import type {
  Member,
  WorkProgram,
  Achievement,
  Review,
  User,
} from "@prisma/client";
import { Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";

// init dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { twMerge } from "tailwind-merge";
dayjs.extend(relativeTime);

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
      <header className="mt-8 flex min-h-[28.5rem] flex-col place-items-center gap-4  border-2 border-solid border-stone-200 p-8 text-justify font-serif md:block">
        <Image
          src={organization.detail?.image ?? "/image-not-available.webp"}
          alt={organization.detail?.name ?? "Organization Image"}
          width={240}
          height={240}
          className="float-left  w-full max-w-sm rounded-xl bg-stone-600 md:mr-6"
        ></Image>
        <div className="-mt-4 mb-8 text-center text-[5rem] font-bold md:text-justify">
          {organization.detail?.name}
        </div>
        <span className=" max-w-2xl text-3xl font-medium">
          {organization.detail?.description}
        </span>
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

function Reviews({
  reviews,
}: {
  reviews: (Review & {
    createdBy: User;
  })[];
}) {
  return (
    <div className="review border-2 border-solid border-stone-200 p-8">
      <h2 className="mb-12 text-center text-5xl font-bold uppercase">Review</h2>
      <div className="my-6 flex flex-col gap-8 font-sans ">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-4  border-y-2 border-solid border-stone-200  p-4"
          >
            <div className="flex place-content-between place-items-center">
              <div className="flex">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={twMerge(
                      "h-6 w-6 text-stone-500",
                      review.rating > index && "fill-stone-500"
                    )}
                  />
                ))}
              </div>
              <p className="opacity-60">{dayjs(review.createdAt).fromNow()}</p>
            </div>
            <h3 className="text-justify text-xl font-bold">
              {review.createdBy.name}
            </h3>
            <p className="text-justify text-lg">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
