import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1" role="main" aria-label="Page content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
