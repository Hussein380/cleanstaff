import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "../ui/WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAppPage = location.pathname.startsWith('/operations') ||
    location.pathname.startsWith('/scheduling') ||
    location.pathname.startsWith('/jobs') ||
    location.pathname.startsWith('/quality') ||
    location.pathname.startsWith('/inventory') ||
    location.pathname.startsWith('/portal');

  if (isAppPage) {
    return (
      <div className="min-h-screen bg-navy">
        <main>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
