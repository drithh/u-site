import Link from "next/link";
import { createPost } from "~/app/actions";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Button } from "~/ui/button";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return <main className=""></main>;
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  return <div>asdad</div>;
}
