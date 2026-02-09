import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/components/ui/PageTransition";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden bg-navy">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal/20 rounded-full blur-[160px]" />
      </div>

      <div className="container-custom relative z-10 px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto glass-morphism rounded-[2.5rem] p-8 md:p-16 text-center border border-white/10 shadow-3xl"
        >
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-navy mb-6 tracking-tight leading-tight">
              Ready to <span className="text-teal">Transform</span> Your Cleaning Operations?
            </h2>
            <p className="text-lg md:text-xl text-navy/70 mb-10 leading-relaxed font-medium">
              Get in touch today for a free staffing consultation. We'll assess your needs
              and provide a tailored managed solution designed for your sector.
            </p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button
                asChild
                size="lg"
                className="premium-button bg-teal hover:bg-teal-light text-white px-10 h-16 text-lg font-black shadow-2xl shadow-teal/20"
              >
                <Link to="/contact">
                  Start Your Consultation
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 px-10 border-white/40 text-navy hover:bg-white/80 glass-morphism text-lg font-bold border-2 transition-all shadow-xl"
              >
                <a href="tel:0723543460">
                  <Phone className="mr-3 w-6 h-6 text-teal" />
                  0723543460
                </a>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
            >
              <div className="flex items-center gap-2 text-navy/40 font-bold tracking-tighter italic text-xl uppercase">
                TRUSTED
              </div>
              <div className="flex items-center gap-2 text-navy/40 font-bold tracking-tighter italic text-xl uppercase">
                VETTED
              </div>
              <div className="flex items-center gap-2 text-navy/40 font-bold tracking-tighter italic text-xl uppercase">
                MANAGED
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

