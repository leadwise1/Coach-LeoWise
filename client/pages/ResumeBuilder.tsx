import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function parseResume(text: string) {
  const sections = {
    summary: "",
    experience: "",
    education: "",
    projects: "",
    skills: "",
    certifications: "",
    volunteering: "",
    extracurricular: "",
    notes: "",
  } as Record<string, string>;
  const map: Record<string, keyof typeof sections> = {
    "professional summary": "summary",
    "work experience": "experience",
    experience: "experience",
    education: "education",
    projects: "projects",
    skills: "skills",
    certifications: "certifications",
    "volunteering / service": "volunteering",
    volunteering: "volunteering",
    "extracurricular activities": "extracurricular",
    "optimization notes": "notes",
    notes: "notes",
  };
  const lines = text.split(/\n+/);
  let current: keyof typeof sections | null = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const key = line.toLowerCase();
    if (map[key]) {
      current = map[key];
      continue;
    }
    if (current) {
      sections[current] += (sections[current] ? "\n" : "") + line;
    }
  }
  return sections;
}

function useTemplateTheme(id: string | null) {
  switch (id) {
    case "option1":
      return { accent: "from-zinc-800 to-zinc-600" };
    case "option2":
      return { accent: "from-indigo-500 to-fuchsia-500" };
    case "option3":
      return { accent: "from-amber-500 to-rose-500" };
    case "option4":
      return { accent: "from-red-500 to-slate-500" };
    case "option5":
      return { accent: "from-violet-600 to-purple-500" };
    default:
      return { accent: "from-indigo-600 to-fuchsia-600" };
  }
}

export default function ResumeBuilder() {
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [raw, setRaw] = useState<string>("");

  useEffect(() => {
    setTemplateId(localStorage.getItem("resume_template_id"));
    const saved = localStorage.getItem("resume_generated_text");
    if (saved) setRaw(saved);
  }, []);

  const sections = useMemo(() => parseResume(raw), [raw]);
  const theme = useTemplateTheme(templateId);

  const onExportPDF = () => {
    window.print();
  };

  const onExportDoc = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Resume</title></head><body>${
      document.getElementById("resume-print-root")?.innerHTML || ""
    }</body></html>`;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.doc";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="container py-10">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <p className="mt-1 text-sm text-muted-foreground">Template: {templateId ?? "not selected"}</p>
          <div className="mt-4 space-y-3">
            <label className="text-sm font-medium">Source Text</label>
            <Textarea value={raw} onChange={(e) => setRaw(e.target.value)} className="min-h-[220px]" />
            <p className="text-xs text-muted-foreground">Edit any text. We parse into sections on the right.</p>
            <div className="flex gap-2 pt-2">
              <Button onClick={onExportPDF}>Export PDF</Button>
              <Button variant="outline" onClick={onExportDoc}>Export Word</Button>
            </div>
          </div>
        </div>
        <div>
          <div className="print:shadow-none overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className={`h-3 w-full bg-gradient-to-r ${theme.accent}`} />
            <div id="resume-print-root" className="p-6 print:p-0">
              <h2 className="text-xl font-bold tracking-tight">Professional Summary</h2>
              <p className="mt-1 whitespace-pre-line text-sm leading-6">{sections.summary || "Not provided."}</p>

              <h2 className="mt-4 text-xl font-bold tracking-tight">Work Experience</h2>
              <p className="mt-1 whitespace-pre-line text-sm leading-6">{sections.experience || "Not provided."}</p>

              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Education</h2>
                  <p className="mt-1 whitespace-pre-line text-sm leading-6">{sections.education || "Not provided."}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Projects</h2>
                  <p className="mt-1 whitespace-pre-line text-sm leading-6">{sections.projects || "Not provided."}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Skills</h2>
                  <p className="mt-1 whitespace-pre-line text-sm leading-6">{sections.skills || "Not provided."}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Certifications</h2>
                  <p className="mt-1 whitespace-pre-line text-sm leading-6">{sections.certifications || "Not provided."}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Volunteering / Service</h2>
                  <p className="mt-1 whitespace-pre-line text-sm leading-6">{sections.volunteering || "Not provided."}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Extracurricular Activities</h2>
                  <p className="mt-1 whitespace-pre-line text-sm leading-6">{sections.extracurricular || "Not provided."}</p>
                </div>
              </div>

              <h2 className="mt-4 text-xl font-bold tracking-tight">Optimization Notes</h2>
              <p className="mt-1 whitespace-pre-line text-sm leading-6">{sections.notes || "Not provided."}</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Tip: Use the Templates page to change the style. PDF uses your browser's Print to PDF.</p>
        </div>
      </div>
    </section>
  );
}
