import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { z } from "zod";

export const organizationRouter = createTRPCRouter({
  getOrganizations: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        field: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const organizations = await ctx.prisma.organization.findMany({
        where: {
          name: input.name,
          field: input.field,
        },
      });

      return organizations;
    }),
});
