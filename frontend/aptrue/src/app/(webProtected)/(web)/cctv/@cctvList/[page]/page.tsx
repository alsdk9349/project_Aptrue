import CCTVList from '@/components/cctv/cctvList';

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return <CCTVList />;
}
