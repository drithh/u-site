import type { Session } from "next-auth";
import { env } from "~/env.mjs";
export async function getSession(cookie: string): Promise<Session | null> {
  const response = await fetch(`${env.NEXTAUTH_URL}/api/auth/session`, {
    headers: { cookie },
  });

  if (!response?.ok) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const session = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
  return Object.keys(session).length > 0 ? session : null;
}
