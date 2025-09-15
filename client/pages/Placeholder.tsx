import { Link } from "react-router-dom";

export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 text-muted-foreground">
          This page is a placeholder. Tell the assistant to generate its content next. You still have full navigation and layout.
        </p>
        <div className="mt-8">
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
