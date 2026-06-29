"use client";

interface ChipProps {
  label: string;
  icon?: string;
  onRemove?: () => void;
  variant?: "default" | "outline";
}

export default function Chip({
  label,
  icon = "link",
  onRemove,
  variant = "default",
}: ChipProps) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
        variant === "default"
          ? "bg-surface-container-low border border-border-default"
          : "bg-surface-white border border-dashed border-primary"
      }`}
    >
      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
        {icon}
      </span>
      <span className="font-['Source_Sans_3'] text-[14px] leading-[20px] text-on-surface">
        {label}
      </span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-surface-variant rounded-full p-0.5 ml-1 transition-colors"
          aria-label={`Remove ${label}`}
        >
          <span className="material-symbols-outlined text-[16px] text-outline">
            close
          </span>
        </button>
      )}
    </div>
  );
}

// ===== Add Chip Button =====
interface AddChipButtonProps {
  label: string;
  icon?: string;
  onClick: () => void;
}

export function AddChipButton({
  label,
  icon = "add",
  onClick,
}: AddChipButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 bg-surface-white border border-dashed border-primary text-primary px-3 py-1.5 rounded-full hover:bg-primary-container/5 transition-colors font-['Inter'] text-[12px] font-semibold leading-[16px]"
    >
      <span className="material-symbols-outlined text-[16px]">{icon}</span>
      {label}
    </button>
  );
}
