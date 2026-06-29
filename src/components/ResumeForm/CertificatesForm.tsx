"use client";

import { useResumeStore } from "@/store/resume-store";
import { Certificate } from "@/types/resume";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { v4 } from "@/utils/id";

export default function CertificatesForm() {
  const { resumeData, updateSection } = useResumeStore();
  const certificates = resumeData.certificates;

  const addCertificate = () => {
    const newCert: Certificate = {
      id: v4(),
      name: "",
      issuer: "",
      date: "",
      url: "",
    };
    updateSection("certificates", [...certificates, newCert]);
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    updateSection(
      "certificates",
      certificates.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeCertificate = (id: string) => {
    updateSection("certificates", certificates.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-['Inter'] text-[32px] font-bold leading-[40px] tracking-[-0.01em] text-on-surface">
          Certificates
        </h1>
        <p className="font-['Source_Sans_3'] text-[14px] leading-[20px] text-on-surface-variant mt-1">
          Add professional certifications and credentials.
        </p>
      </div>

      {certificates.map((cert, index) => (
        <div
          key={cert.id}
          className="bg-surface-container-lowest border border-border-default rounded-xl p-6 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline-variant text-[20px]">
                drag_indicator
              </span>
              <span className="font-['Inter'] text-[14px] font-semibold text-on-surface-variant">
                Certificate {index + 1}
              </span>
            </div>
            <button
              onClick={() => removeCertificate(cert.id)}
              className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-full hover:bg-error-container"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>

          <Input
            label="Certificate Name"
            placeholder="e.g. AWS Solutions Architect"
            value={cert.name}
            onChange={(e) => updateCertificate(cert.id, "name", e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Issuer"
              placeholder="e.g. Amazon Web Services"
              value={cert.issuer}
              onChange={(e) => updateCertificate(cert.id, "issuer", e.target.value)}
            />
            <Input
              label="Date"
              type="month"
              value={cert.date}
              onChange={(e) => updateCertificate(cert.id, "date", e.target.value)}
            />
          </div>

          <Input
            label="URL (optional)"
            icon="link"
            placeholder="e.g. credential-url.com"
            value={cert.url || ""}
            onChange={(e) => updateCertificate(cert.id, "url", e.target.value)}
          />
        </div>
      ))}

      <Button variant="secondary" icon="add" onClick={addCertificate} fullWidth>
        Add Certificate
      </Button>
    </div>
  );
}
