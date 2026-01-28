import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeInUp } from "@/components/ui/PageTransition";

const industries = [
  {
    title: "Hotels & Lodges",
    description: "Housekeeping staff trained in hospitality standards for guest satisfaction.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
  },
  {
    title: "Hospitals & Clinics",
    description: "Staff trained in infection control and healthcare facility protocols.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
  },
  {
    title: "Apartments & Estates",
    description: "Reliable cleaning teams for residential properties and common areas.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
  },
  {
    title: "Offices & NGOs",
    description: "Professional cleaning personnel for corporate and institutional environments.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  },
];

export function IndustriesPreview() {
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
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Industries We Serve
            </span>
            <h2 className="heading-lg text-foreground mt-2 mb-4">
              Tailored Solutions for Every Sector
            </h2>
            <p className="body-lg">
              We understand that different industries have unique cleaning requirements. 
              Our staff are trained specifically for your sector's needs.
            </p>
          </motion.div>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-lg h-64 md:h-72"
              >
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-bold text-xl text-primary-foreground mb-2">
                    {industry.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/industries">
                Explore All Industries
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
