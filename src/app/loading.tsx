import CampaignSkeleton from "@/components/CampaignSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-6 sm:py-10">
      <div className="mb-8 h-8 w-48 animate-pulse rounded bg-gray-200" />
      <CampaignSkeleton />
    </main>
  );
}
