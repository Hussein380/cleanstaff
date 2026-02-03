import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/ui/PageTransition";
import { useToast } from "@/hooks/use-toast";

const industries = [
  "Hotel / Hospitality",
  "Hospital / Healthcare",
  "Apartment / Estate",
  "Office / Corporate",
  "School / Institution",
  "Shopping Mall / Retail",
  "Other",
];

const shiftTypes = [
  "Day Shift Only",
  "Night Shift Only",
  "Both Day & Night",
  "24/7 Coverage",
  "Flexible / TBD",
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    details: ["Westlands Business Centre", "Nairobi, Kenya"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+254 700 000 000", "+254 711 000 000"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@cleanstaff.co.ke", "quotes@cleanstaff.co.ke"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    location: "",
    cleanersRequired: "",
    shiftType: "",
    startDate: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Quote Request Submitted",
      description: "We'll get back to you within 24-48 hours.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="container-custom relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.span
              variants={fadeInUp}
              className="text-teal-light font-bold text-sm uppercase tracking-[0.2em]"
            >
              Contact Us
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="heading-xl text-white mt-4 mb-6"
            >
              Request a Quote
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/70 leading-relaxed"
            >
              Tell us about your cleaning staff requirements. We'll respond with a
              customized proposal within 24-48 hours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="lg:col-span-1"
            >
              <motion.h2 variants={fadeInUp} className="heading-md text-foreground mb-6">
                Get in Touch
              </motion.h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="lg:col-span-2"
            >
              <motion.div variants={fadeInUp} className="glass-card p-6 md:p-10 rounded-3xl border-white/10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="heading-md text-foreground mb-2">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Your quote request has been submitted successfully. Our team will
                      review your requirements and get back to you within 24-48 hours.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          companyName: "",
                          contactName: "",
                          email: "",
                          phone: "",
                          industry: "",
                          location: "",
                          cleanersRequired: "",
                          shiftType: "",
                          startDate: "",
                          message: "",
                        });
                      }}
                      variant="outline"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleChange("companyName", e.target.value)}
                          placeholder="Your organization name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Person *</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => handleChange("contactName", e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="you@company.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="+254 7XX XXX XXX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry *</Label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) => handleChange("industry", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleChange("location", e.target.value)}
                          placeholder="e.g., Westlands, Nairobi"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cleanersRequired">Number of Cleaners Required</Label>
                        <Input
                          id="cleanersRequired"
                          type="number"
                          value={formData.cleanersRequired}
                          onChange={(e) => handleChange("cleanersRequired", e.target.value)}
                          placeholder="e.g., 5"
                          min="1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shiftType">Shift Type</Label>
                        <Select
                          value={formData.shiftType}
                          onValueChange={(value) => handleChange("shiftType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select shift type" />
                          </SelectTrigger>
                          <SelectContent>
                            {shiftTypes.map((shift) => (
                              <SelectItem key={shift} value={shift}>
                                {shift}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="startDate">Preferred Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleChange("startDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Details</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Tell us more about your requirements, special needs, or any questions you have..."
                        rows={4}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full premium-button bg-teal hover:bg-teal-light text-white border-none h-14 text-lg font-black mt-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit Quote Request
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to be contacted by our team regarding your inquiry.
                    </p>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
