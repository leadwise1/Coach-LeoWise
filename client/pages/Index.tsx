import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  FileText,
  Download,
  Sparkles,
  BookOpenCheck,
  Target,
  BarChart3,
  Layers,
  ShieldCheck,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import VideoCoach from "@/components/site/VideoCoach";

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-200">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="w-full">
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        Career Progress {value}%
      </div>
    </div>
  );
}

function useResumeGenerator(profile: string, job: string) {
  return useMemo(() => {
    const skills = Array.from(
      new Set((profile + " " + job).match(/\b[A-Za-z+#.]{2,}\b/g) || []),
    )
      .slice(0, 12)
      .map((s) => s.replace(/[^A-Za-z+#.]/g, ""))
      .filter(Boolean);

    const tone = job.toLowerCase().includes("senior")
      ? "senior-level"
      : job.toLowerCase().includes("manager")
        ? "leadership"
        : "results-driven";

    const summary = `Results-oriented ${tone} professional with strengths in ${skills.slice(0, 3).join(", ")}. Proven ability to deliver measurable impact by aligning initiatives to business goals and communicating clearly with stakeholders.`;

    const bullets = [
      `Transformed requirements into outcomes by leveraging ${skills.slice(0, 2).join(" and ")} to drive measurable impact.`,
      `Partnered with cross-functional teams to deliver end-to-end solutions with a focus on reliability, performance, and user value.`,
      `Continuously improved processes using data-informed decisions, automation, and high-quality documentation.`,
    ];

    const tailored = `Tailored for this role: emphasize ${skills.slice(0, 2).join(" & ")}, quantify outcomes (e.g., +25% efficiency, -30% costs), and mirror the job description's language for ATS alignment.`;

    return { summary, bullets, tailored };
  }, [profile, job]);
}

function TypingLine() {
  const phrases = [
    "Analyzing job description…",
    "Drafting resume summary…",
    "Optimizing ATS alignment…",
    "Highlighting quantifiable impact…",
  ];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    const tick = () => {
      const current = phrases[index % phrases.length];
      const step = deleting ? -1 : 1;
      const next = current.slice(0, text.length + step);
      setText(next);
      const atEnd = next === current;
      const atStart = next.length === 0;
      let delay = deleting ? 40 : 60;
      if (atEnd && !deleting) {
        delay = 900;
        setDeleting(true);
      } else if (atStart && deleting) {
        delay = 350;
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [index, text, deleting]);

  return (
    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground/80">
      <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />
      <span className="font-mono">{text}</span>
    </div>
  );
}

export default function Index() {
  const [profile, setProfile] = useState("");
  const [job, setJob] = useState("");
  const [generated, setGenerated] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ideas = useResumeGenerator(profile, job);

  const onGenerate = async () => {
    try {
      setLoading(true);
      setGenerated(null);
      setProvider(null);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          job,
          temperature: 0.6,
          maxTokens: 512,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { provider?: string; text?: string };
        if (data?.text) {
          setGenerated(data.text);
          setProvider(data.provider || null);
          return;
        }
      }
      // Fallback to local generator
      const out = [
        `Professional Summary\n${ideas.summary}`,
        `Key Achievements\n• ${ideas.bullets.join("\n• ")}`,
        `Optimization Notes\n${ideas.tailored}`,
      ].join("\n\n");
      setGenerated(out);
      setProvider("local");
    } catch (e) {
      const out = [
        `Professional Summary\n${ideas.summary}`,
        `Key Achievements\n• ${ideas.bullets.join("\n• ")}`,
        `Optimization Notes\n${ideas.tailored}`,
      ].join("\n\n");
      setGenerated(out);
      setProvider("local");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-white" />
        <div className="container py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-xl justify-self-start">
              <div className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-3 py-1 text-xs text-foreground/70 backdrop-blur">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                Build Your Career Foundation with AI-Powered Resumes
              </div>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                LeadWise Foundation empowers job seekers with professional,
                ATS-friendly resumes.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Our AI-powered platform helps you craft compelling content that
                showcases your potential and opens doors to new opportunities.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500"
                >
                  <a href="#ai">Start Building Resume</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/templates">View Templates</a>
                </Button>
              </div>
              <TypingLine />
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Feature
                  icon={Brain}
                  title="AI Content Generation"
                  desc="Get personalized suggestions for every section of your resume"
                />
                <Feature
                  icon={FileText}
                  title="Professional Templates"
                  desc="Choose from modern, ATS-friendly templates designed by experts"
                />
                <Feature
                  icon={Download}
                  title="Instant Export"
                  desc="Download your resume as PDF or Word document in seconds"
                />
              </div>
            </div>
            <div className="relative">
              <VideoCoach src="https://cdn.builder.io/o/assets%2F97052129558d481882bb7b8a999ce5cc%2F935029fd0d3741f98defc2a32ba7c24f?alt=media&token=1bced179-5c5b-4cce-8e10-6d4b38d4f584&apiKey=97052129558d481882bb7b8a999ce5cc" />
            </div>
          </div>
        </div>
      </section>

      {/* Hyper-Personalized */}
      <section id="features" className="container py-20 sm:py-24">
        <SectionTitle
          eyebrow="Hyper-Personalized Resume & Cover Letters"
          title="Our AI crafts compelling narratives that showcase your unique value"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={BookOpenCheck}
            title="Narrative Storytelling"
            desc="Transform your experience into compelling stories that resonate with hiring managers"
          />
          <Feature
            icon={BarChart3}
            title="Quantifiable Achievements"
            desc="AI coaching to identify and articulate measurable impact in your roles"
          />
          <Feature
            icon={Layers}
            title="Industry Customization"
            desc="Tailored content that speaks the language of your target industry and role"
          />
          <Feature
            icon={ShieldCheck}
            title="Bias Detection"
            desc="Advanced algorithms ensure your applications are free from unconscious bias"
          />
          <Feature
            icon={Target}
            title="ATS Alignment"
            desc="Mirror job language to increase compatibility with applicant tracking systems"
          />
          <Feature
            icon={CalendarClock}
            title="Faster Applications"
            desc="Accelerate your job search with reusable sections and smart autofill"
          />
        </div>
      </section>

      {/* See the AI in Action */}
      <section
        id="ai"
        className="relative overflow-hidden border-y bg-gradient-to-b from-white to-indigo-50/40 py-20 sm:py-24"
      >
        <div className="container">
          <SectionTitle
            eyebrow="See the AI in Action"
            title="Generate a personalized resume snippet"
            subtitle="Enter a job description and your profile information."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Your Profile / Experience
                </label>
                <Textarea
                  placeholder="Paste your current resume summary or a brief description of your experience..."
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className="min-h-[140px]"
                />
                <p className="mt-1 text-xs text-muted-foreground">Tip: add 2-4 sentences with skills and outcomes (min ~40 chars).</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Job Description
                </label>
                <Textarea
                  placeholder="Paste the job description you are targeting..."
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="min-h-[140px]"
                />
                <p className="mt-1 text-xs text-muted-foreground">Include responsibilities and required skills (min ~60 chars).</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={onGenerate}
                  disabled={loading || profile.trim().length < 40 || job.trim().length < 60}
                  className={cn("", loading && "opacity-80")}
                >
                  Generate Resume
                </Button>
                <span className="text-sm text-muted-foreground">Provider: {provider ?? "—"}</span>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-full rounded-xl border bg-card p-4">
                <div className="text-sm font-semibold">Generated Result</div>
                <pre className="mt-3 h-[360px] w-full overflow-auto rounded-md bg-muted/40 p-3 text-xs leading-6">
                  {generated || "Your personalized resume will appear here..."}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching */}
      <section id="coaching" className="container py-20 sm:py-24">
        <SectionTitle
          eyebrow="Proactive Career Coaching"
          title="Get ahead with predictive insights and end-to-end management"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={Target}
            title="Predictive Career Pathing"
            desc="AI analyzes market trends to suggest optimal career moves and skills"
          />
          <Feature
            icon={CalendarClock}
            title="Application Management"
            desc="Track applications, follow-ups, and interviews in one dashboard"
          />
          <Feature
            icon={Brain}
            title="Skill Mapping & Learning"
            desc="Personalized learning roadmaps based on goals and market demand"
          />
          <Feature
            icon={Sparkles}
            title="AI/VR Interview Simulation"
            desc="Practice with realistic scenarios and get instant feedback"
          />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-indigo-50/40 to-white" />
        <div className="container">
          <SectionTitle
            eyebrow="Pricing"
            title="Choose the plan that fits your journey"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <PricingCard
              title="Starter"
              price="$0"
              period="/mo"
              cta="Start Free"
              highlighted={false}
              features={[
                "AI content suggestions",
                "ATS-friendly templates",
                "PDF & Word export",
              ]}
            />
            <PricingCard
              title="Pro"
              price="$19"
              period="/mo"
              cta="Start 14‑Day Trial"
              highlighted
              badge="Recommended"
              features={[
                "Cover letters & tailoring",
                "Application tracking dashboard",
                "Interview simulation (AI/VR)",
                "Priority exports & sharing",
              ]}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              period=""
              cta="Contact Sales"
              highlighted={false}
              features={[
                "SSO & advanced security",
                "Team coaching & analytics",
                "Custom templates & branding",
                "Dedicated support",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Command Center */}
      <section
        id="dashboard"
        className="relative overflow-hidden py-20 sm:py-24"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-white" />
        <div className="container">
          <SectionTitle
            eyebrow="Your Career Command Center"
            title="Track progress, manage applications, and accelerate skills"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold">Overview</div>
                  <Badge variant="secondary">Live</Badge>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">
                      Applications
                    </div>
                    <div className="mt-2 text-2xl font-bold">12</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Skills</div>
                    <div className="mt-2 text-2xl font-bold">8 tracking</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">
                      Interviews
                    </div>
                    <div className="mt-2 text-2xl font-bold">4 scheduled</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <div className="mb-4 text-sm font-semibold">
                  Recent Activity
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center justify-between">
                    <span>Applied to Senior Developer at TechCorp</span>
                    <span className="text-muted-foreground">2 hours ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Completed React Advanced Course</span>
                    <span className="text-muted-foreground">1 day ago</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-xl border bg-card p-6">
                <div className="mb-2 text-sm font-semibold">
                  AI Recommendations
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Optimize LinkedIn Profile</span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700">
                      high
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add 3 key skills to increase visibility
                  </p>
                </div>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <div className="text-sm font-semibold">Next Actions</div>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>Follow up with TechCorp</li>
                  <li>Complete Python certification</li>
                  <li>Practice system design questions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="container py-20 sm:py-24">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-[1px] shadow-xl">
          <div className="rounded-2xl bg-white p-8 text-center sm:p-12">
            <h3 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
              Ready to Transform Your Career?
            </h3>
            <p className="mt-3 text-muted-foreground">
              Join thousands of professionals who have accelerated their careers
              with AI-powered insights and personalized coaching.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500"
              >
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Book Demo
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
              <Badge variant="secondary">14-Day Free Trial</Badge>
              <Badge variant="secondary">Privacy Protected</Badge>
              <Badge variant="secondary">Expert Support 24/7</Badge>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PricingCard({
  title,
  price,
  period,
  cta,
  features,
  highlighted = false,
  badge,
}: {
  title: string;
  price: string;
  period: string;
  cta: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-card p-6 shadow-sm",
        highlighted &&
          "border-transparent p-[1px] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600",
      )}
    >
      <div className={cn("rounded-2xl p-5", highlighted && "bg-white")}>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-semibold">{title}</div>
          {badge && (
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <div className="text-4xl font-extrabold tracking-tight">{price}</div>
          <div className="text-sm text-muted-foreground">{period}</div>
        </div>
        <ul className="mt-5 space-y-2 text-sm">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
                ✓
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button
            className={cn(
              "w-full",
              highlighted &&
                "bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500",
            )}
            variant={highlighted ? "default" : "outline"}
          >
            {cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
