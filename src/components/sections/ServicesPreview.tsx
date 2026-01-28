import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Hotel, Hospital, Home, Briefcase, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeInUp } from "@/components/ui/PageTransition";

const services = [
  {
    icon: Building2,
    title: "Contract Cleaning Services",
    description: "Long-term cleaning staff placement with full supervision and management for any commercial property.",
  },
  {
    icon: Hotel,
    title: "Hotel Housekeeping Staff",
    description: "Trained housekeeping personnel for hotels, lodges, and hospitality venues—day and night shifts available.",
  },
  {
    icon: Hospital,
    title: "Hospital & Healthcare Cleaning",
    description: "Specialized cleaning staff trained in infection control and healthcare facility standards.",
  },
  {
    icon: Home,
    title: "Apartment & Estate Cleaning",
    description: "Dedicated cleaning teams for residential apartments, estates, and property management companies.",
  },
  {
    icon: Briefcase,
    title: "Office & Corporate Cleaning",
    description: "Professional cleaning personnel for offices, NGOs, and corporate environments.",
  },
  {
    icon: Clock,
    title: "Temporary / Relief Staff",
    description: "Short-term cleaning staff for events, peak seasons, or to cover staff absences.",
  },
];

export function ServicesPreview() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="max-w-2xl mb-12">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h2 className="heading-lg text-foreground mt-2 mb-4">
              Managed Cleaning Staff Solutions
            </h2>
            <p className="body-lg">
              We don't sell equipment—we provide trained, vetted cleaning personnel 
              under flexible contract arrangements. You focus on your business, we handle the staff.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group card-elevated p-6 hover:border-accent/30"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-sm font-medium text-accent hover:text-teal-light transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <Button asChild size="lg" className="gradient-hero border-0">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
