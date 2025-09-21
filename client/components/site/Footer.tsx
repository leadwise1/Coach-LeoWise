import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-background" role="contentinfo">
      <div className="container py-12 grid gap-10 md:grid-cols-4">
        <section className="space-y-4" aria-label="LeadWise Foundation information">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-bold" aria-hidden="true">LW</span>
            <span className="text-lg font-extrabold tracking-tight">LeadWise Foundation</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Empowering careers with artificial intelligence and personalized coaching.
          </p>
        </section>
        <nav aria-label="Product navigation">
          <h4 className="font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground" aria-label="Resume Builder section">Resume Builder</a></li>
            <li><a href="#dashboard" className="hover:text-foreground" aria-label="Career Dashboard section">Career Dashboard</a></li>
            <li><Link to="/templates" className="hover:text-foreground" aria-label="Templates page">Templates</Link></li>
            <li><a href="#coaching" className="hover:text-foreground" aria-label="Interview Prep section">Interview Prep</a></li>
          </ul>
        </nav>
        <nav aria-label="Company navigation">
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground" aria-label="About Us page">About Us</a></li>
            <li><a href="#" className="hover:text-foreground" aria-label="Careers page">Careers</a></li>
            <li><a href="#" className="hover:text-foreground" aria-label="Press page">Press</a></li>
            <li><a href="#" className="hover:text-foreground" aria-label="Contact page">Contact</a></li>
          </ul>
        </nav>
        <nav aria-label="Support navigation">
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground" aria-label="Help Center page">Help Center</a></li>
            <li><a href="#" className="hover:text-foreground" aria-label="Privacy Policy page">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-foreground" aria-label="Terms of Service page">Terms of Service</a></li>
            <li><a href="#" className="hover:text-foreground" aria-label="Security page">Security</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © 2024 LeadWise Foundation. All rights reserved.
      </div>
    </footer>
  );
}
