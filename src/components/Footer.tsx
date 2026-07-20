import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/40 py-4 text-center text-xs text-white/40">
      <div className="flex items-center justify-center gap-4">
        <span>Green Belt Crowdfund</span>
        <span className="text-white/20">|</span>
        <Link href="/" className="hover:text-white/70 transition-colors">
          Home
        </Link>
        <a
          href="/SECURITY.md"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/70 transition-colors"
        >
          Security
        </a>
        <a
          href="/USER_GUIDE.md"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/70 transition-colors"
        >
          Guide
        </a>
      </div>
    </footer>
  );
}
