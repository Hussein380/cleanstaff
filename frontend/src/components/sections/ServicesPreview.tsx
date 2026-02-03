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
    image: "/service-office.png",
  },
  {
    icon: Hotel,
    title: "Hotel Housekeeping Staff",
    description: "Trained housekeeping personnel for hotels, lodges, and hospitality venues—day and night shifts available.",
    image: "/service-hotel.png",
  },
  {
    icon: Hospital,
    title: "Hospital & Healthcare Cleaning",
    description: "Specialized cleaning staff trained in infection control and healthcare facility standards.",
    image: "/service-hospital.png",
  },
  {
    icon: Home,
    title: "Apartment & Estate Cleaning",
    description: "Dedicated cleaning teams for residential apartments, estates, and property management companies.",
    image: "/hero-image.png", // Reusing hero image for residential since it looks high-end
  },
  {
    icon: Briefcase,
    title: "Office & Corporate Cleaning",
    description: "Professional cleaning personnel for offices, NGOs, and corporate environments.",
    image: "/service-office.png",
  },
  {
    icon: Clock,
    title: "Temporary / Relief Staff",
    description: "Short-term cleaning staff for events, peak seasons, or to cover staff absences.",
    image: "/service-hotel.png", // Reusing hospital/hotel style for relief
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="max-w-3xl mb-16">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-teal/10 text-teal text-xs font-bold uppercase tracking-widest">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-6 tracking-tight leading-[1.1]">
              Managed <span className="text-teal">Cleaning Staff</span> Solutions
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We don't just provide equipment—we provide trained, vetted cleaning personnel
              under flexible contract arrangements. You focus on your core business,
              we handle the recruitment, training, and 24/7 supervision.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md border border-border/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 active:scale-[0.98]"
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal/90 backdrop-blur-sm flex items-center justify-center text-white shadow-lg">
                      <service.icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-teal transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="p-0 h-auto text-teal font-bold hover:text-navy group/link"
                  >
                    <Link to="/services" className="flex items-center">
                      Explore Service
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 h-1 bg-teal w-0 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <Button asChild size="lg" className="premium-button bg-navy text-white hover:bg-navy-light px-10 h-14 text-base font-bold shadow-xl shadow-navy/10">
              <Link to="/services">
                View All Specialized Solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

