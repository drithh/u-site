"use server";

import * as z from "zod";
// import * as procs from "~/server/api/routers/post";
import { createAction, protectedProcedure } from "~/server/api/trpc";

/** You can import procedures from your api router. */
export const createPost = createAction(procs.createPost);

/** You can also create procedures inline using the reusable procedure builders. */
export const editPost = createAction();
