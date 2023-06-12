import { createTRPCRouter } from "~/server/api/trpc";
import { organizationRouter } from "~/server/api/routers/organization";
import { memberRouter } from "~/server/api/routers/member";
import { achievementRouter } from "~/server/api/routers/achievement";
import { reviewRouter } from "~/server/api/routers/review";
import { workProgramRouter } from "~/server/api/routers/work-program";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  organization: organizationRouter,
  member: memberRouter,
  achievement: achievementRouter,
  review: reviewRouter,
  workProgram: workProgramRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
