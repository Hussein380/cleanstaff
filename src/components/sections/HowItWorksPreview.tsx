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
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="heading-lg text-foreground mt-2 mb-4">
              Simple Process, Reliable Results
            </h2>
            <p className="body-lg">
              From initial consultation to ongoing service delivery—we make staffing your cleaning operations effortless.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-border" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative text-center lg:text-left"
                >
                  {/* Step Circle */}
                  <div className="relative z-10 flex lg:flex-col items-center lg:items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="lg:hidden flex-1 text-left">
                      <span className="text-accent font-bold text-sm">Step {step.step}</span>
                      <h3 className="font-display font-semibold text-foreground">{step.title}</h3>
                    </div>
                  </div>

                  {/* Content - Desktop */}
                  <div className="hidden lg:block">
                    <span className="text-accent font-bold text-sm">Step {step.step}</span>
                    <h3 className="font-display font-semibold text-foreground mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Content - Mobile */}
                  <p className="lg:hidden text-sm text-muted-foreground pl-20">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <Button asChild size="lg" className="gradient-hero border-0">
              <Link to="/how-it-works">
                Learn More About Our Process
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
