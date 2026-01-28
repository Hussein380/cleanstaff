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
    <section className="py-12 bg-white dark:bg-navy-light relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute left-0 top-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -ml-32 -mt-32" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {indicators.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-secondary/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-teal group-hover:text-white">
                <item.icon className="w-8 h-8 text-teal transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

