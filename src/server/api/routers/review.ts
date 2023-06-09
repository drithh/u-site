import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const reviewRouter = createTRPCRouter({
  createReview: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        createdById: z.string().min(1),
        rating: z.number().min(1).max(5),
        comment: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const review = await ctx.prisma.review.create({
        data: {
          ...input,
        },
      });

      return review;
    }),
  deleteReview: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const review = await ctx.prisma.review.delete({
        where: {
          id: input.id,
        },
      });

      return review;
    }),
});
