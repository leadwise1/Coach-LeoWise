import { Link } from "react-router-dom";
import { FileText } from 'lucide-react';

export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <FileText className="w-12 h-12 text-gray-400" />
        </div>
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
