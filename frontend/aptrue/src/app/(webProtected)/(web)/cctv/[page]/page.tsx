export default async function CCTV({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return <div>{page}</div>;
}
