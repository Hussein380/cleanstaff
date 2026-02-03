import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Industries", href: "/industries" },
  { name: "Why Us", href: "/why-us" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-navy/80 backdrop-blur-xl border-b border-white/10 py-4">
      <nav className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-teal/20">
              <span className="text-white font-black text-lg">CS</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-xl text-white transition-colors">CleanStaff</span>
              <span className="block text-[10px] uppercase font-bold tracking-[0.2em] -mt-1 text-white/60">Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive(item.href)
                  ? "text-teal bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+254700000000"
              className="flex items-center gap-2 text-sm font-bold transition-colors text-white/80 hover:text-white"
            >
              <Phone className="w-4 h-4 text-teal" />
              <span className="hidden xl:inline">+254 700 000 000</span>
            </a>
            <Button asChild size="lg" className="premium-button px-6 h-11 bg-white text-navy hover:bg-teal hover:text-white transition-all border-0 ring-0">
              <Link to="/contact">Request Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="container-custom py-8 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-4 rounded-xl text-lg font-bold transition-all ${isActive(item.href)
                    ? "text-teal bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/10">
                <Button asChild size="lg" className="w-full premium-button bg-white text-navy hover:bg-teal hover:text-white h-14 text-lg">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Request a Quote
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

