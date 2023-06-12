import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const workProgramRouter = createTRPCRouter({
  createWorkProgram: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        title: z.string(),
        date: z.date(),
        status: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const workProgram = await ctx.prisma.workProgram.create({
        data: {
          ...input,
        },
      });

      return workProgram;
    }),
  updateWorkProgram: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        date: z.date(),
        status: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const workProgram = await ctx.prisma.workProgram.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });

      return workProgram;
    }),
  deleteWorkProgram: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const workProgram = await ctx.prisma.workProgram.delete({
        where: {
          id: input.id,
        },
      });

      return workProgram;
    }),
});
