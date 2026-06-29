import { createClient } from "@/lib/supabase/client";
import { ResumeData, ResumeDocument } from "@/types/resume";
import { emptyResumeData } from "@/utils/sample-data";

const supabase = createClient();

// ===== Create Resume =====
export async function createResume(
  title: string = "Untitled Resume",
  templateId: string = "classic",
  data: ResumeData = emptyResumeData
): Promise<ResumeDocument | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: resume, error } = await supabase
    .from("resumes")
    .insert({
      user_id: user.id,
      title,
      data: data as unknown as Record<string, unknown>,
      template_id: templateId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating resume:", error);
    return null;
  }

  return resume as unknown as ResumeDocument;
}

// ===== Get All Resumes =====
export async function getResumes(): Promise<ResumeDocument[]> {
  const { data: resumes, error } = await supabase
    .from("resumes")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching resumes:", error);
    return [];
  }

  return (resumes || []) as unknown as ResumeDocument[];
}

// ===== Get Resume By ID =====
export async function getResumeById(
  id: string
): Promise<ResumeDocument | null> {
  const { data: resume, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching resume:", error);
    return null;
  }

  return resume as unknown as ResumeDocument;
}

// ===== Update Resume =====
export async function updateResume(
  id: string,
  updates: {
    title?: string;
    data?: ResumeData;
    template_id?: string;
  }
): Promise<ResumeDocument | null> {
  const updateData: Record<string, unknown> = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (updates.data) {
    updateData.data = updates.data as unknown as Record<string, unknown>;
  }

  const { data: resume, error } = await supabase
    .from("resumes")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating resume:", error);
    return null;
  }

  return resume as unknown as ResumeDocument;
}

// ===== Delete Resume =====
export async function deleteResume(id: string): Promise<boolean> {
  const { error } = await supabase.from("resumes").delete().eq("id", id);

  if (error) {
    console.error("Error deleting resume:", error);
    return false;
  }

  return true;
}
