import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/ui/PageTransition";
import { CTASection } from "@/components/sections/CTASection";

const industries = [
  {
    title: "Hotels & Lodges",
    description: "Our hospitality-trained staff understand the importance of guest satisfaction. From room turnover to public area maintenance, we deliver excellence.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
    features: [
      "Housekeeping attendants",
      "Public area cleaners",
      "Laundry personnel",
      "Night shift coverage",
    ],
  },
  {
    title: "Hospitals & Clinics",
    description: "Healthcare facilities require specialized cleaning protocols. Our staff are trained in infection control, waste handling, and compliance standards.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop",
    features: [
      "Infection control training",
      "Ward & theater cleaning",
      "Medical waste awareness",
      "OSHA compliance",
    ],
  },
  {
    title: "Apartments & Estates",
    description: "Keep residential properties pristine with dedicated cleaning teams. We handle common areas, lobbies, parking lots, and more.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    features: [
      "Common area maintenance",
      "Lobby & hallway cleaning",
      "Garbage collection",
      "Grounds maintenance support",
    ],
  },
  {
    title: "Offices & Corporate",
    description: "Maintain a professional workspace with our office cleaning personnel. After-hours cleaning ensures minimal disruption to your operations.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    features: [
      "Daily office cleaning",
      "Washroom sanitation",
      "Kitchen maintenance",
      "Flexible scheduling",
    ],
  },
  {
    title: "Schools & Institutions",
    description: "Educational facilities need consistent, reliable cleaning. Our teams understand the unique requirements of schools and learning environments.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=500&fit=crop",
    features: [
      "Classroom cleaning",
      "Cafeteria sanitation",
      "Sports facility maintenance",
      "Holiday deep cleaning",
    ],
  },
  {
    title: "Shopping Malls & Retail",
    description: "High-traffic retail environments need continuous cleaning attention. Our staff keep your spaces welcoming for customers throughout the day.",
    image: "https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=800&h=500&fit=crop",
    features: [
      "Floor maintenance",
      "Restroom attendants",
      "Escalator & elevator cleaning",
      "Event setup support",
    ],
  },
];

export default function Industries() {
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
              Industries We Serve
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="heading-xl text-primary-foreground mt-2 mb-4"
            >
              Tailored Solutions for Every Sector
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-primary-foreground/80"
            >
              Different industries have unique cleaning requirements. Our staff are trained 
              specifically for your sector's needs, ensuring compliance and quality.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card-elevated overflow-hidden"
              >
                <div className="relative h-48 md:h-56">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="font-display font-bold text-xl text-primary-foreground">
                      {industry.title}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{industry.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {industry.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">
                      Get a Quote
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
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
