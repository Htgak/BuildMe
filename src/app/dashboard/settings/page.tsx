"use client";

import TopNavBar from "@/components/layout/TopNavBar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-surface-white flex flex-col font-['Inter']">
      <TopNavBar variant="dashboard" />

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />

        <main className="flex-1 overflow-y-auto bg-background p-8 md:p-12">
          <div className="max-w-[800px] mx-auto">
            <div className="mb-10">
              <h1 className="text-[32px] font-bold text-on-surface mb-2">Settings</h1>
              <p className="text-on-surface-variant">Manage your account and preferences.</p>
            </div>

            <div className="bg-white border border-border-default rounded-2xl p-8 mb-8">
              <h2 className="text-[20px] font-bold text-on-surface mb-6">Profile Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Email Address</label>
                  <input 
                    type="email" 
                    disabled 
                    value={loading ? "Loading..." : email}
                    placeholder="your.email@example.com" 
                    className="w-full px-4 py-2 border border-border-default rounded-lg bg-surface-container-low text-on-surface-variant" 
                  />
                  <p className="text-xs text-on-surface-variant mt-2">Your email address is managed through your authentication provider.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-error-container rounded-2xl p-8">
              <h2 className="text-[20px] font-bold text-error mb-2">Danger Zone</h2>
              <p className="text-on-surface-variant mb-6 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
              <Button variant="secondary" className="border-error text-error hover:bg-error-container hover:text-on-error transition-colors">
                Delete Account
              </Button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
