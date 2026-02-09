import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/components/ui/PageTransition";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background with Professional Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-image.png"
          alt="Professional Cleaning Staff"
          className="w-full h-full object-cover object-center lg:object-right transition-transform duration-1000"
        />
        {/* Cleaner Gradient Overlay - More Professional, Less "Techy" */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent/20" />
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="py-32 lg:py-48 max-w-3xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Trust Badge - Simplified */}
            <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-navy flex items-center justify-center text-[10px] font-bold text-navy">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                ))}
              </div>
              <span className="text-white/80 text-sm font-medium pl-2">
                Trusted by 50+ Top Organizations
              </span>
            </motion.div>

            {/* Headline - Stronger Typography */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
            >
              Cleaning Staff <br />
              <span className="text-teal">Solutions that Work.</span>
            </motion.h1>

            {/* Subtext - Clearer Value Prop */}
            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed font-medium"
            >
              We don't just send cleaners; we manage the entire hygiene operation.
              Recruitment, training, and supervision—handled by experts, so you can focus on business.
            </motion.p>

            {/* CTAs - High Contrast */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-base font-bold bg-teal hover:bg-teal-light text-white rounded-lg shadow-lg shadow-teal/20 transition-all hover:scale-105"
              >
                <Link to="/contact">
                  Get a Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-bold border-white/30 text-white hover:bg-white hover:text-navy rounded-lg transition-all bg-transparent"
              >
                <Link to="/how-it-works">
                  How It Works
                </Link>
              </Button>
            </motion.div>

            {/* Key Benefits - Simple List */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10"
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-teal shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold">Fully Vetted Staff</h3>
                  <p className="text-white/60 text-sm">Background checks & rigorous training.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-teal shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold">5-Star Standards</h3>
                  <p className="text-white/60 text-sm">Consistent quality with daily supervision.</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
