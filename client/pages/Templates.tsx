import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const templates = [
  {
    id: "option1",
    name: "Option 1",
    img: "https://cdn.builder.io/api/v1/image/assets%2F97052129558d481882bb7b8a999ce5cc%2F62982d9aeebf415f8fcda33fb58010d0?format=webp&width=800",
  },
  {
    id: "option2",
    name: "Option 2",
    img: "https://cdn.builder.io/api/v1/image/assets%2F97052129558d481882bb7b8a999ce5cc%2F16b808da4696486b857263ab7f982b3b?format=webp&width=800",
  },
  {
    id: "option3",
    name: "Option 3",
    img: "https://cdn.builder.io/api/v1/image/assets%2F97052129558d481882bb7b8a999ce5cc%2F8550d9d4543e4b4594e126d50701b7c6?format=webp&width=800",
  },
  {
    id: "option4",
    name: "Option 4",
    img: "https://cdn.builder.io/api/v1/image/assets%2F97052129558d481882bb7b8a999ce5cc%2F7031ee872f1142869ca89f13b531e4c3?format=webp&width=800",
  },
  {
    id: "option5",
    name: "Option 5",
    img: "https://cdn.builder.io/api/v1/image/assets%2F97052129558d481882bb7b8a999ce5cc%2F43d381b91d5e460d88a08b40add78c4c?format=webp&width=800",
  },
];

export default function Templates() {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    const saved = localStorage.getItem("resume_template_id");
    if (saved) setSelected(saved);
  }, []);
  const choose = (id: string) => {
    setSelected(id);
    localStorage.setItem("resume_template_id", id);
  };

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Choose a Resume Template
        </h1>
        <p className="mt-3 text-muted-foreground">
          Pick a design. We’ll auto-fill it with AI. You can switch anytime.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <div
            key={t.id}
            className="group overflow-hidden rounded-xl border bg-card shadow-sm"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
              <img
                src={t.img}
                alt={t.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">ID: {t.id}</div>
              </div>
              <Button
                onClick={() => choose(t.id)}
                variant={selected === t.id ? "default" : "outline"}
              >
                {selected === t.id ? "Selected" : "Select"}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-3xl text-center">
        <a
          href="/#ai"
          className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-medium text-white hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500"
        >
          Use this template
        </a>
        <p className="mt-2 text-xs text-muted-foreground">
          Your selection is saved locally and will be used for exports/layout.
        </p>
      </div>
    </section>
  );
}