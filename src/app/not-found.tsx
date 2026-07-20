import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="mb-4 text-6xl">🌿</span>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mb-6 text-sm text-gray-500">
        This campaign page does not exist or has been removed.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Back to Campaign
      </Link>
    </main>
  );
}
