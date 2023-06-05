import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const reviewRouter = createTRPCRouter({
  createReview: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        createdById: z.string(),
        rating: z.number(),
        comment: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const review = await ctx.prisma.review.create({
        data: {
          ...input,
        },
      });

      return review;
    }),
  deleteReview: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const review = await ctx.prisma.review.delete({
        where: {
          id: input.id,
        },
      });

      return review;
    }),
});
