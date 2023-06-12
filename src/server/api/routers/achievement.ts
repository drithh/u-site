import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const achievementRouter = createTRPCRouter({
  createAchievement: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        title: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const achievement = await ctx.prisma.achievement.create({
        data: {
          ...input,
        },
      });

      return achievement;
    }),
  updateAchievement: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const achievement = await ctx.prisma.achievement.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });

      return achievement;
    }),
  deleteAchievement: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const achievement = await ctx.prisma.achievement.delete({
        where: {
          id: input.id,
        },
      });

      return achievement;
    }),
});
