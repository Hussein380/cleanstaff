import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/components/ui/PageTransition";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Background Image with Responsive Handling */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-image.png"
          alt="Professional Cleaning Staff"
          className="w-full h-full object-cover object-center lg:object-[center_30%] transition-transform duration-1000 scale-100"
        />
        {/* Advanced Multi-layer Overlay for Readability */}
        <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
        <div className="absolute inset-0 bg-grid-white opacity-10" />
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="py-24 md:py-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-white/20 text-teal-light text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                Trusted by 50+ Organizations in Nairobi
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="heading-xl text-white mb-8 text-balance"
            >
              Professional Managed <br className="hidden md:block" />
              <span className="text-teal-light">Cleaning Staff</span> Solutions
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-2xl text-white/70 max-w-2xl mb-12 leading-relaxed"
            >
              We provide trained, supervised, and reliable cleaning personnel under flexible contracts.
              No more HR headaches—we handle the recruitment, training, and 24/7 on-site management.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 mb-16">
              <Button
                asChild
                size="lg"
                className="premium-button bg-teal hover:bg-teal-light text-white border-none px-12 h-16 text-lg font-black"
              >
                <Link to="/contact" className="flex items-center">
                  Request a Quote
                  <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 px-10 border-white/20 text-white hover:bg-white/10 glass-morphism text-lg border-2 transition-all"
              >
                <Link to="/how-it-works" className="flex items-center">
                  <Play className="mr-3 w-6 h-6 fill-current" />
                  See How It Works
                </Link>
              </Button>
            </motion.div>

            {/* Floating Info Cards (Responsive Grid) */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-12"
            >
              {[
                { label: "Staff Deployed", value: "500+", desc: "Vetted & Trained" },
                { label: "Active Clients", value: "50+", desc: "Hotels & Hospitals" },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl hover:bg-teal group cursor-default">
                  <div className="text-3xl font-black text-white group-hover:text-white transition-colors">{stat.value}</div>
                  <div className="text-xs text-white/50 group-hover:text-white/80 uppercase tracking-widest font-bold mt-1 mb-2 transition-colors">{stat.label}</div>
                  <div className="text-xs text-white/30 group-hover:text-white/60 font-medium transition-colors">{stat.desc}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-teal/50 to-transparent" />
      </motion.div>
    </section>
  );
}
