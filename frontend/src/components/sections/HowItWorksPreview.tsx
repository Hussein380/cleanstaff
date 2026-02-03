import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Search, Users, ClipboardCheck, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeInUp } from "@/components/ui/PageTransition";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Submit Requirements",
    description: "Tell us about your cleaning needs, shift preferences, and number of staff required.",
  },
  {
    icon: Search,
    step: "02",
    title: "Site Assessment",
    description: "Our team visits your premises to assess staffing needs and understand your requirements.",
  },
  {
    icon: Users,
    step: "03",
    title: "Staff Deployment",
    description: "We recruit, train, and deploy vetted cleaning personnel tailored to your specifications.",
  },
  {
    icon: ClipboardCheck,
    step: "04",
    title: "Supervised Operations",
    description: "Our supervisors manage daily operations, ensuring consistent quality and performance.",
  },
  {
    icon: Receipt,
    step: "05",
    title: "Monthly Invoicing",
    description: "Receive a simple monthly invoice. We handle payroll, benefits, and all HR matters.",
  },
];

export function HowItWorksPreview() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-teal/10 text-teal-light text-xs font-bold uppercase tracking-widest border border-teal/20">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
              Simple Process, <span className="text-teal-light">Reliable Results</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              From initial consultation to ongoing service delivery—we've engineered a data-driven
              approach to make staffing your cleaning operations effortless.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
              >
                {/* Connector Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px] bg-gradient-to-r from-teal/40 to-transparent z-0" />
                )}

                <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10">
                  {/* Step Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                      <step.icon className="w-8 h-8 text-teal-light" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-teal flex items-center justify-center text-xs font-black text-navy shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-teal-light transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} className="mt-20 text-center">
            <Button asChild size="lg" className="premium-button bg-white text-navy hover:bg-white/90 px-10 h-14 text-base font-bold shadow-xl shadow-white/5">
              <Link to="/how-it-works">
                Explore Our Delivery Model
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

