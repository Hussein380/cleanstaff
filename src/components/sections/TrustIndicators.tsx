import { motion } from "framer-motion";
import { Shield, Users, Award, CheckCircle } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/components/ui/PageTransition";

const indicators = [
  {
    icon: Shield,
    title: "Trained & Vetted Staff",
    description: "All personnel undergo thorough background checks and professional training",
  },
  {
    icon: Users,
    title: "Staff Replacement Guarantee",
    description: "Swift replacement at no extra cost if any staff member underperforms",
  },
  {
    icon: Award,
    title: "Uniformed & Supervised",
    description: "Professional appearance with on-site supervision for quality assurance",
  },
  {
    icon: CheckCircle,
    title: "Labour Compliance",
    description: "Full compliance with Kenyan labour laws and industry standards",
  },
];

export function TrustIndicators() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {indicators.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-card rounded-lg p-6 shadow-custom-sm border border-border/50"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
