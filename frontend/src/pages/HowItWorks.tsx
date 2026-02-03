import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Search, Users, ClipboardCheck, Receipt, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/ui/PageTransition";
import { CTASection } from "@/components/sections/CTASection";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Submit Your Requirements",
    description: "Tell us about your cleaning needs through our online form or by calling us directly.",
    details: [
      "Type of facility (hotel, hospital, office, etc.)",
      "Number of cleaners required",
      "Preferred shift times (day/night)",
      "Any special requirements or certifications needed",
    ],
  },
  {
    icon: Search,
    step: "02",
    title: "Site Assessment & Proposal",
    description: "Our team visits your premises to understand your specific needs and environment.",
    details: [
      "Physical inspection of all areas",
      "Assessment of cleaning frequency",
      "Review of existing challenges",
      "Customized proposal within 48 hours",
    ],
  },
  {
    icon: Users,
    step: "03",
    title: "Staff Recruitment & Training",
    description: "We recruit, vet, and train cleaning personnel specifically for your requirements.",
    details: [
      "Background checks on all candidates",
      "Industry-specific training",
      "Uniform and equipment provision",
      "Introduction to your facility protocols",
    ],
  },
  {
    icon: ClipboardCheck,
    step: "04",
    title: "Supervised Operations",
    description: "Our supervisors manage daily operations, ensuring consistent quality and performance.",
    details: [
      "Daily attendance tracking",
      "Quality inspections and checklists",
      "Performance feedback loops",
      "Immediate issue resolution",
    ],
  },
  {
    icon: Receipt,
    step: "05",
    title: "Simple Monthly Billing",
    description: "Receive one consolidated invoice. We handle all payroll, benefits, and HR matters.",
    details: [
      "Transparent pricing structure",
      "No hidden charges",
      "Monthly or custom billing cycles",
      "Dedicated account support",
    ],
  },
];

const faqs = [
  {
    question: "How quickly can you deploy staff?",
    answer: "For most requirements, we can deploy trained staff within 5-7 business days. Emergency replacements can be arranged within 24-48 hours.",
  },
  {
    question: "What if a staff member underperforms?",
    answer: "We provide free replacement of any staff member who doesn't meet performance standards. Our supervisors proactively monitor quality to catch issues early.",
  },
  {
    question: "Do you provide cleaning supplies and equipment?",
    answer: "We focus on providing personnel. However, we can advise on supplies and coordinate with your preferred vendors. Some clients prefer us to procure supplies as part of the contract.",
  },
  {
    question: "What are your contract terms?",
    answer: "We offer flexible terms starting from 3-month contracts. Longer commitments often come with preferential rates. Month-to-month arrangements are also possible for temporary needs.",
  },
];

export default function HowItWorks() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.span
              variants={fadeInUp}
              className="text-accent font-medium text-sm uppercase tracking-wider"
            >
              How It Works
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="heading-xl text-primary-foreground mt-2 mb-4"
            >
              Simple Process, Reliable Results
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-primary-foreground/80"
            >
              From initial consultation to ongoing service delivery—we make staffing your 
              cleaning operations effortless. Here's how we work with you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-0"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-7 top-24 bottom-0 w-0.5 bg-border hidden md:block" />
                )}

                <div className="flex flex-col md:flex-row gap-6 md:gap-8 pb-12">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center relative z-10">
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 card-elevated p-6 md:p-8">
                    <span className="text-accent font-bold text-sm">Step {step.step}</span>
                    <h2 className="heading-md text-foreground mt-1 mb-3">{step.title}</h2>
                    <p className="body-base mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA after steps */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Button asChild size="lg" className="gradient-hero border-0">
              <Link to="/contact">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="heading-lg text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="body-lg">
                Common questions about our managed cleaning staff services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-card rounded-lg p-6 shadow-custom-sm border border-border/50"
                >
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
