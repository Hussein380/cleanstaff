import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/components/ui/PageTransition";

export function Hero() {
  return (
    <section className="relative gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative">
        <div className="py-20 md:py-28 lg:py-36">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Trusted by 50+ Organizations in Nairobi
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="heading-xl text-primary-foreground mb-6"
            >
              Professional Managed Cleaning Staff for Hotels, Hospitals & Commercial Spaces
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed"
            >
              We provide trained, supervised, and reliable cleaning personnel under flexible contracts. 
              No more HR headaches, absenteeism issues, or supervision concerns—we handle it all.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-teal-light text-accent-foreground font-semibold px-8"
              >
                <Link to="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/how-it-works">
                  <Play className="mr-2 w-5 h-5" />
                  How It Works
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-primary-foreground/20 grid grid-cols-3 gap-8"
            >
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                  500+
                </div>
                <div className="text-sm text-primary-foreground/70">Staff Deployed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                  50+
                </div>
                <div className="text-sm text-primary-foreground/70">Active Clients</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                  10+
                </div>
                <div className="text-sm text-primary-foreground/70">Years Experience</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
