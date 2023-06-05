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
        // where: {
        //   name: {
        //     search: input.name,
        //   },
        //   field: input.field,
        // },
      });

      return organizations;
    }),
  getOrganizationById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const organization = await ctx.prisma.organization.findUnique({
        where: {
          id: input.id,
        },
      });

      const achievements = await ctx.prisma.achievement.findMany({
        where: {
          organizationId: input.id,
        },
      });

      const members = await ctx.prisma.member.findMany({
        where: {
          organizationId: input.id,
        },
      });

      const workPrograms = await ctx.prisma.workProgram.findMany({
        where: {
          organizationId: input.id,
        },
      });

      return {
        detail: organization,
        achievements,
        members,
        workPrograms,
      };
    }),
  createOrganization: protectedProcedure
    .input(
      z.object({
        organization: z.object({
          name: z.string(),
          field: z.string(),
          description: z.string(),
          vision: z.string().optional(),
          mission: z.string().optional(),
          establishedAt: z.string().optional(),
        }),
        achievements: z
          .array(
            z.object({
              title: z.string(),
              date: z.string(),
            })
          )
          .optional(),
        members: z
          .array(
            z.object({
              name: z.string(),
              studentId: z.string(),
              email: z.string(),
              position: z.string(),
            })
          )
          .optional(),
        workPrograms: z
          .array(
            z.object({
              title: z.string(),
              status: z.string(),
              date: z.string(),
            })
          )
          .optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const organization = await ctx.prisma.organization.create({
        data: {
          ...input.organization,
        },
      });

      if (input.achievements) {
        await ctx.prisma.achievement.createMany({
          data: input.achievements.map((achievement) => ({
            ...achievement,
            organizationId: organization.id,
          })),
        });
      }
      if (input.members) {
        await ctx.prisma.member.createMany({
          data: input.members.map((member) => ({
            ...member,
            organizationId: organization.id,
          })),
        });
      }

      if (input.workPrograms) {
        await ctx.prisma.workProgram.createMany({
          data: input.workPrograms.map((workProgram) => ({
            ...workProgram,
            organizationId: organization.id,
          })),
        });
      }

      return organization;
    }),
  updateOrganization: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        field: z.string().optional(),
        description: z.string().optional(),
        vision: z.string().optional(),
        mission: z.string().optional(),
        establishedAt: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const organization = await ctx.prisma.organization.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });

      return organization;
    }),
});
