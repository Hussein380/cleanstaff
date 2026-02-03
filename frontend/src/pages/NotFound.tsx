import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/ui/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <section className="min-h-[70vh] flex items-center justify-center py-16">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center max-w-lg mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="text-8xl md:text-9xl font-display font-bold text-primary/20 mb-4"
            >
              404
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="heading-lg text-foreground mb-4"
            >
              Page Not Found
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="body-lg mb-8"
            >
              Sorry, we couldn't find the page you're looking for. It might have been 
              moved or doesn't exist.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild className="gradient-hero border-0">
                <Link to="/">
                  <Home className="mr-2 w-5 h-5" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Contact Us
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default NotFound;
