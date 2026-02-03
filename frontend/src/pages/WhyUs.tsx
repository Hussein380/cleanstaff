import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Award, Clock, Headphones, BadgeCheck, RefreshCw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/ui/PageTransition";
import { CTASection } from "@/components/sections/CTASection";

const reasons = [
  {
    icon: Target,
    title: "Single Point of Accountability",
    description: "One contract, one invoice, one point of contact. We take full responsibility for your cleaning staff—no more juggling multiple vendors or dealing with individual employee issues.",
  },
  {
    icon: RefreshCw,
    title: "Free Staff Replacement",
    description: "If any staff member underperforms or fails to meet standards, we replace them at no extra cost. Your operations never suffer due to personnel issues.",
  },
  {
    icon: Shield,
    title: "Background-Checked Workers",
    description: "Every cleaner we deploy has undergone thorough vetting including criminal background checks, reference verification, and health assessments.",
  },
  {
    icon: Users,
    title: "On-Site Supervision",
    description: "Our supervisors are present on-site to manage daily operations, conduct quality checks, and ensure your standards are consistently met.",
  },
  {
    icon: Award,
    title: "Trained & Certified Staff",
    description: "All personnel receive industry-specific training before deployment. Healthcare staff get infection control training; hospitality staff learn guest service protocols.",
  },
  {
    icon: Clock,
    title: "24/7 Shift Coverage",
    description: "Whether you need day shifts, night shifts, or round-the-clock coverage, we have the capacity to staff your requirements without gaps.",
  },
  {
    icon: Headphones,
    title: "Responsive Support",
    description: "Issues don't wait for business hours. Our support team is available for urgent matters, ensuring rapid response to any cleaning emergencies.",
  },
  {
    icon: BadgeCheck,
    title: "Labour Law Compliance",
    description: "We handle all employment compliance—contracts, payroll, benefits, and statutory deductions. You get peace of mind knowing everything is above board.",
  },
];

const stats = [
  { value: "500+", label: "Staff Currently Deployed" },
  { value: "50+", label: "Active Client Sites" },
  { value: "98%", label: "Client Retention Rate" },
  { value: "10+", label: "Years in Business" },
];

export default function WhyUs() {
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
              Why Choose Us
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="heading-xl text-primary-foreground mt-2 mb-4"
            >
              Your Trusted Cleaning Staff Partner
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-primary-foreground/80"
            >
              We're not just a cleaning company—we're your strategic partner in maintaining 
              clean, hygienic spaces. Here's why organizations across Nairobi trust us.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary py-12">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reasons Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="heading-lg text-foreground mb-4">
                Why Organizations Choose CleanStaff
              </h2>
              <p className="body-lg">
                We take the hassle out of cleaning operations so you can focus on your core business.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="card-elevated p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeInUp} className="heading-lg text-foreground mb-4">
              Our Commitment to You
            </motion.h2>
            <motion.p variants={fadeInUp} className="body-lg mb-8">
              When you partner with CleanStaff Solutions, you're not just hiring cleaners—you're 
              gaining a partner committed to your facility's hygiene standards. We invest in 
              training, supervision, and quality control so that you never have to worry about 
              cleaning again.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="gradient-hero border-0">
                <Link to="/contact">
                  Partner With Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
