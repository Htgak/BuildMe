"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TopNavBarProps {
  variant: "landing" | "builder" | "dashboard";
  resumeTitle?: string;
  onExport?: () => void;
}

export default function TopNavBar({
  variant,
  resumeTitle,
  onExport,
}: TopNavBarProps) {
  if (variant === "builder") {
    return (
      <header className="bg-surface-white flex justify-between items-center px-4 h-14 w-full z-50 border-b border-border-default shrink-0">
        {/* Left: Brand & File Name */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={100} height={32} className="object-contain" priority />
          </Link>
          <div className="h-6 w-px bg-border-default hidden sm:block" />
          <div className="group flex items-center gap-2 cursor-pointer hidden sm:flex">
            <span className="font-['Inter'] text-[14px] font-medium text-on-surface group-hover:text-primary transition-colors">
              {resumeTitle || "Untitled Resume"}
            </span>
            <span className="material-symbols-outlined text-outline-variant group-hover:text-primary text-[16px]">
              edit
            </span>
          </div>
        </div>
        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 mr-2 hidden md:flex">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
              className="text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-colors"
              title="Share"
            >
              <span className="material-symbols-outlined text-[20px]">
                ios_share
              </span>
            </button>
            <button
              onClick={onExport}
              className="text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-colors"
              title="Download"
            >
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
            </button>
          </div>
          <button
            onClick={onExport}
            className="font-['Inter'] text-[14px] font-medium bg-primary-container text-on-primary font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            Export
          </button>
          <button className="ml-2 w-8 h-8 rounded-full overflow-hidden border border-border-default hover:ring-2 hover:ring-primary-container transition-all bg-surface-container-low flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              person
            </span>
          </button>
        </div>
      </header>
    );
  }

  // Landing / Dashboard variant
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="bg-surface-white font-['Inter'] shadow-sm z-50">
      <div className="flex justify-between items-center px-10 w-full h-16 max-w-[1280px] mx-auto">
        {/* Brand */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <Image src="/logo.png" alt="Logo" width={120} height={36} className="object-contain" priority />
        </Link>
        {/* Navigation Links (Desktop) */}
        {variant !== "dashboard" && (
          <div className="hidden md:flex items-center space-x-8">
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors font-['Inter'] text-[14px] font-medium"
              href="/#templates"
            >
              Templates
            </Link>

          </div>
        )}
        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[14px] text-on-surface-variant hidden md:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-on-surface-variant hover:text-primary transition-colors font-['Inter'] text-[14px] font-medium"
              >
                Logout
              </button>
              <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold">
                {user.email ? user.email.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
          ) : (
            <>
              <Link
                className="text-on-surface-variant hover:text-primary transition-colors font-['Inter'] text-[14px] font-medium hidden md:block"
                href="/login"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-primary text-on-primary font-['Inter'] text-[14px] font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
