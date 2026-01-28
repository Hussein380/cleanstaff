import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeInUp } from "@/components/ui/PageTransition";

const industries = [
  {
    title: "Hotels & Lodges",
    description: "Housekeeping staff trained in hospitality standards for guest satisfaction.",
    image: "/service-hotel.png",
  },
  {
    title: "Hospitals & Clinics",
    description: "Staff trained in infection control and healthcare facility protocols.",
    image: "/service-hospital.png",
  },
  {
    title: "Apartments & Estates",
    description: "Reliable cleaning teams for residential properties and common areas.",
    image: "/hero-image.png",
  },
  {
    title: "Offices & NGOs",
    description: "Professional cleaning personnel for corporate and institutional environments.",
    image: "/service-office.png",
  },
];

export function IndustriesPreview() {
  return (
    <section className="py-24 bg-white dark:bg-navy relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-teal/10 text-teal text-xs font-bold uppercase tracking-widest">
              Specialized Staffing
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-6 tracking-tight leading-[1.1]">
              Tailored Solutions for <span className="text-teal">Every Sector</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We understand that different industries have unique protocols.
              Our personnel are rigorously trained specifically for your sector's standards.
            </p>
          </motion.div>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative h-[350px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-teal/20"
              >
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Modern Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-teal-light transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 mb-6">
                    {industry.description}
                  </p>
                  <div className="h-1 w-0 bg-teal transition-all duration-500 group-hover:w-full rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <Button asChild size="lg" variant="outline" className="premium-button border-navy/30 bg-navy/5 text-navy hover:bg-navy hover:text-white px-10 h-14 text-base font-bold transition-all duration-300 border-2">
              <Link to="/industries">
                Explore All Sectors
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

