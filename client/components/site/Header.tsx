import Link from 'next/link';
import { Button } from '../ui/button';

  export const Header = () => {
    return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-bold">
            LW
          </span>
          <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            LeadWise Foundation
          </span>
        </Link>
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6"
        >
          <a
            href="#features"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#coaching"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            Coaching
          </a>
          <a
            href="#dashboard"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            Dashboard
          </a>
          <a
            href="#pricing"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            Pricing
          </a>
          <Link
            href="/templates"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            Templates
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/templates">View Templates</Link>
          </Button>
          <Button className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500">
            <a href="#get-started">Start Free Trial</a>
          </Button>
        </div>
      </div>
    </header>
  );
};
