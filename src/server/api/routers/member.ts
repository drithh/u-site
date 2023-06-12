import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const memberRouter = createTRPCRouter({
  createMember: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        name: z.string(),
        studentId: z.string(),
        email: z.string(),
        position: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const member = await ctx.prisma.member.create({
        data: {
          ...input,
        },
      });

      return member;
    }),
  updateMember: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        studentId: z.string().optional(),
        email: z.string().optional(),
        position: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const member = await ctx.prisma.member.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });

      return member;
    }),
  deleteMember: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const member = await ctx.prisma.member.delete({
        where: {
          id: input.id,
        },
      });

      return member;
    }),
});
