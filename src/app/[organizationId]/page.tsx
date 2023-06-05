export default function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  return <h1>My Page {params.organizationId}</h1>;
}
