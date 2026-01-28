import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Hotel, Hospital, Home, Briefcase, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/ui/PageTransition";
import { CTASection } from "@/components/sections/CTASection";

const services = [
  {
    icon: Building2,
    title: "Contract Cleaning Services",
    description: "Long-term cleaning staff placement with full supervision and management for any commercial property.",
    features: [
      "Dedicated account manager",
      "Flexible shift arrangements",
      "Quality control protocols",
      "Staff performance monitoring",
    ],
    shifts: "Day & Night shifts available",
  },
  {
    icon: Hotel,
    title: "Hotel Housekeeping Staff",
    description: "Trained housekeeping personnel for hotels, lodges, and hospitality venues. Our staff understand guest expectations and hospitality standards.",
    features: [
      "Room turnover specialists",
      "Public area attendants",
      "Laundry personnel",
      "Night audit cleaners",
    ],
    shifts: "24/7 coverage available",
  },
  {
    icon: Hospital,
    title: "Hospital & Healthcare Cleaning",
    description: "Specialized cleaning staff trained in infection control protocols and healthcare facility cleaning standards.",
    features: [
      "Infection control training",
      "OSHA compliant practices",
      "Ward & theater cleaning",
      "Medical waste awareness",
    ],
    shifts: "Round-the-clock shifts",
  },
  {
    icon: Home,
    title: "Apartment & Estate Cleaning",
    description: "Reliable cleaning teams for residential apartments, estates, and property management companies.",
    features: [
      "Common area maintenance",
      "Lobby & hallway cleaning",
      "Parking lot attendants",
      "Garbage collection teams",
    ],
    shifts: "Day shifts, 6 days/week",
  },
  {
    icon: Briefcase,
    title: "Office & Corporate Cleaning",
    description: "Professional cleaning personnel for offices, NGOs, and corporate environments. Maintain a pristine workspace for your team.",
    features: [
      "Daily office cleaning",
      "Washroom sanitation",
      "Kitchen area maintenance",
      "After-hours cleaning",
    ],
    shifts: "Flexible scheduling",
  },
  {
    icon: Clock,
    title: "Temporary / Relief Staff",
    description: "Short-term cleaning staff for events, peak seasons, or to cover staff absences. Quick deployment, same quality standards.",
    features: [
      "Event cleaning teams",
      "Holiday coverage",
      "Emergency replacements",
      "Project-based staffing",
    ],
    shifts: "As needed basis",
  },
];

export default function Services() {
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
              Our Services
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="heading-xl text-primary-foreground mt-2 mb-4"
            >
              Managed Cleaning Staff Solutions
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-primary-foreground/80"
            >
              We provide trained, vetted, and supervised cleaning personnel—not equipment. 
              You get reliable staff without the HR burden. We handle recruitment, payroll, 
              supervision, and replacements.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card-elevated p-6 md:p-8"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Icon & Title */}
                  <div className="lg:w-1/3">
                    <div className="w-14 h-14 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="heading-md text-foreground mb-2">{service.title}</h2>
                    <p className="body-base">{service.description}</p>
                    <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      <Clock className="w-4 h-4 mr-2" />
                      {service.shifts}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="lg:w-2/3 lg:border-l lg:border-border lg:pl-8">
                    <h3 className="font-display font-semibold text-foreground mb-4">
                      What's Included
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Button asChild className="gradient-hero border-0">
                        <Link to="/contact">
                          Request Quote
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to="/how-it-works">Learn How It Works</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
