"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border-default hidden md:flex flex-col bg-surface-white pt-8 px-4 shrink-0">
      <nav className="space-y-2">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-colors ${
            pathname === "/dashboard"
              ? "bg-primary-container/10 text-primary font-bold"
              : "text-on-surface-variant hover:bg-surface-container-low"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">description</span>
          My Resumes
        </Link>
        <Link
          href="/dashboard/templates"
          className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-colors ${
            pathname === "/dashboard/templates"
              ? "bg-primary-container/10 text-primary font-bold"
              : "text-on-surface-variant hover:bg-surface-container-low"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">web</span>
          Templates
        </Link>
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-colors ${
            pathname === "/dashboard/settings"
              ? "bg-primary-container/10 text-primary font-bold"
              : "text-on-surface-variant hover:bg-surface-container-low"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          Settings
        </Link>
      </nav>

      <div className="mt-auto pb-8">
        <Link
          href="/builder/new"
          className="w-full flex justify-center items-center gap-2 bg-primary-container text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create Resume
        </Link>
      </div>
    </aside>
  );
}
