export default function CampaignSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 animate-pulse">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-6 w-full rounded-full bg-gray-200" />
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mx-auto h-4 w-1/3 rounded bg-gray-200" />
        <div className="mx-auto mt-2 h-8 w-1/2 rounded bg-gray-200" />
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 h-5 w-1/4 rounded bg-gray-200" />
        <div className="h-12 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
