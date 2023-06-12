import { api } from "~/trpc/server";
import Information from "./component/information";
import Achievement from "./component/achievement";
import Member from "./component/member";
import WorkProgram from "./component/work-program";
// init dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default async function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  const organization = await api.organization.getOrganizationById.query({
    id: params.organizationId,
  });

  return (
    <>
      <main className="mt-8 flex flex-col gap-8">
        <Information
          organization={organization.detail}
          id={params.organizationId}
        />
        <Achievement
          data={organization.achievements}
          id={params.organizationId}
        />
        <Member data={organization.members} id={params.organizationId} />
        <WorkProgram
          data={organization.workPrograms}
          id={params.organizationId}
        />
      </main>
    </>
  );
}
