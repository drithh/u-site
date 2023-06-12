import bcrypt from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        user: z.object({
          name: z.string(),
          email: z.string(),
          password: z.string(),
        }),
        organization: z
          .object({
            name: z.string(),
            field: z.string(),
            description: z.string(),
          })
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let organization;
      if (input.organization) {
        organization = await ctx.prisma.organization.create({
          data: {
            ...input.organization,
          },
        });
      }

      const { password, ...rest } = input.user;

      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = await ctx.prisma.user.create({
        data: {
          ...rest,
          password: hashedPassword,
          organizationId: organization?.id,
        },
      });

      return {
        user,
        organization,
      };
    }),
});
