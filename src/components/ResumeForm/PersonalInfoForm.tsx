"use client";

import { useResumeStore } from "@/store/resume-store";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Chip, { AddChipButton } from "@/components/ui/Chip";
import { v4 } from "@/utils/id";

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;

  const handleChange = (field: string, value: string) => {
    updatePersonalInfo(field, value);
  };

  const addLink = () => {
    const newLink = { id: v4(), label: "", url: "" };
    updatePersonalInfo("links", [...personalInfo.links, newLink]);
  };

  const removeLink = (id: string) => {
    updatePersonalInfo(
      "links",
      personalInfo.links.filter((l) => l.id !== id)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="font-['Inter'] text-[32px] font-bold leading-[40px] tracking-[-0.01em] text-on-surface">
          Personal Information
        </h1>
        <p className="font-['Source_Sans_3'] text-[14px] leading-[20px] text-on-surface-variant mt-1">
          This section is usually the first thing employers see.
        </p>
      </div>

      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-surface-container-low border-2 border-dashed border-outline-variant flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-outline group-hover:text-primary text-3xl">
              add_a_photo
            </span>
            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
              <span className="font-['Inter'] text-[12px] font-semibold text-surface-white">
                Upload
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="font-['Inter'] text-[12px] font-semibold text-primary hover:underline text-left">
              Upload Photo
            </button>
            <span className="font-['Source_Sans_3'] text-[12px] text-outline-variant">
              Max file size: 5MB. Suggested ratio 1:1.
            </span>
          </div>
        </div>

        {/* Name Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="firstName"
            label="First Name"
            placeholder="e.g. John"
            value={personalInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <Input
            id="lastName"
            label="Last Name"
            placeholder="e.g. Doe"
            value={personalInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        {/* Professional Title */}
        <Input
          id="jobTitle"
          label="Professional Title"
          placeholder="e.g. Senior Software Engineer"
          value={personalInfo.professionalTitle}
          onChange={(e) => handleChange("professionalTitle", e.target.value)}
        />

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="email"
            label="Email"
            icon="mail"
            type="email"
            placeholder="e.g. hello@email.com"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            id="phone"
            label="Phone"
            icon="call"
            type="tel"
            placeholder="e.g. +1 234 567 890"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        {/* Location */}
        <Input
          id="location"
          label="Location"
          icon="location_on"
          placeholder="City, Country"
          value={personalInfo.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />

        {/* Links & Socials */}
        <div className="flex flex-col gap-2">
          <label className="font-['Inter'] text-[14px] font-medium leading-[16px] tracking-[0.01em] text-on-surface">
            Links & Socials
          </label>
          <div className="flex flex-wrap gap-2">
            {personalInfo.links.map((link) => (
              <Chip
                key={link.id}
                label={link.url || link.label || "New Link"}
                onRemove={() => removeLink(link.id)}
              />
            ))}
            <AddChipButton label="Add Link" onClick={addLink} />
          </div>
        </div>

        {/* Professional Summary */}
        <Textarea
          id="summary"
          label="Professional Summary"
          placeholder="Briefly describe your professional background, key achievements, and career goals..."
          rows={5}
          maxChars={500}
          currentChars={personalInfo.summary.length}
          value={personalInfo.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          rightAction={
            <button
              className="font-['Inter'] text-[12px] font-semibold text-primary flex items-center gap-1 hover:underline"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">
                auto_awesome
              </span>
              AI Write
            </button>
          }
        />
      </form>
    </div>
  );
}
