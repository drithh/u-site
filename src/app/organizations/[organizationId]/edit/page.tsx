import { api } from "~/trpc/server";
import type { Member, WorkProgram, Review, User } from "@prisma/client";
import Achievement from "./component/achievement";
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
dayjs.extend(relativeTime);
import { twMerge } from "tailwind-merge";

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
      <main className="mt-8 flex flex-col gap-8">
        <Information
          organization={organization.detail}
          id={params.organizationId}
        />
        <Achievement
          data={organization.achievements}
          id={params.organizationId}
        />
        <Members members={organization.members} />
        <WorkPrograms workPrograms={organization.workPrograms} />
        <Reviews reviews={organization.reviews} />
      </main>
    </>
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

import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar";
import Information from "./component/information";

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
            <div className="flex gap-4">
              <Avatar className="h-14 w-14">
                {review.createdBy.image && (
                  <AvatarImage
                    src={review.createdBy.image}
                    alt={review.createdBy.name ?? "User Image"}
                  />
                )}
                <AvatarFallback>
                  {review.createdBy.name?.slice(0, 2).toUpperCase() ?? "AA"}
                </AvatarFallback>
              </Avatar>
              <div className="flex w-full place-content-between place-items-center">
                <div className="flex flex-col place-content-between gap-1">
                  <h3 className="text-justify text-xl font-bold">
                    {review.createdBy.name}
                  </h3>
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
                </div>
              </div>
              <p className="w-32 text-right opacity-60">
                {dayjs(review.createdAt).fromNow()}
              </p>
            </div>

            <p className="text-justify text-lg">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
