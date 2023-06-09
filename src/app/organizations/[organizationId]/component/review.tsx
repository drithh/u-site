"use client";

import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "~/ui/avatar";
import { useSession } from "next-auth/react";
import type { Review, User } from "@prisma/client";
import { twMerge } from "tailwind-merge";

// init dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "~/ui/button";
dayjs.extend(relativeTime);

export default function Reviews({
  reviews,
}: {
  reviews: (Review & {
    createdBy: User;
  })[];
}) {
  const session = useSession();
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
                {/* {review.createdBy.image && (
                  <AvatarImage
                    src={review.createdBy.image}
                    alt={review.createdBy.name ?? "User Image"}
                  />
                )} */}
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
      {session.status === "authenticated" && (
        <div className="flex flex-col gap-4 font-sans">
          <ReviewModal />
        </div>
      )}
    </div>
  );
}
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Textarea } from "~/ui/textarea";
import { api } from "~/trpc/client";
import { useRef } from "react";
import { toast } from "~/ui/use-toast";

function ReviewModal() {
  const ratingRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLTextAreaElement>(null);

  const session = useSession();
  const organizationId = session.data?.user.organizationId ?? "";
  const createdById = session.data?.user.id ?? "";

  const createReview = async ({
    rating,
    comment,
  }: {
    rating: number;
    comment: string;
  }) => {
    try {
      await api.review.createReview.mutate({
        rating,
        comment,
        organizationId,
        createdById,
      });
      window.location.reload();
      toast({
        title: "Berhasil menambah review",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menambah review",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-stone-500 text-justify text-xl font-bold text-white hover:bg-stone-600">
          Tambah Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-sans">Edit profile</DialogTitle>
          <DialogDescription className="font-sans">
            Make changes to your profile here. Click save when
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 font-sans">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <Input
              ref={ratingRef}
              id="rating"
              type="number"
              className="col-span-3"
              min={0}
              max={5}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="review" className="text-right">
              Review
            </Label>
            <Textarea ref={reviewRef} id="review" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              const rating = Number(ratingRef.current?.value);
              const comment = reviewRef.current?.value ?? "";
              void createReview({ rating, comment });
            }}
            className="bg-stone-500 text-justify font-sans text-lg font-bold text-white hover:bg-stone-600"
          >
            Tambah Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
