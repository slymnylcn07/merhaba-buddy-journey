import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Flame, 
  Lightbulb, 
  Heart, 
  BatteryCharging, 
  Zap,
  RotateCcw,
  Shield,
  Headphones,
  ChevronDown,
  Briefcase,
  Dumbbell,
  Sofa,
  Users
} from "lucide-react";
import { useEffect, useRef } from "react";

const WhyFlexiKnee = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToFeatures = () => {
    document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: Flame,
      title: "Targeted Heat Support",
      description: "Comfortable warmth designed to help you relax and unwind."
    },
    {
      icon: Lightbulb,
      title: "Light Therapy Integration",
      description: "Built-in light support for a modern at-home therapy experience."
    },
    {
      icon: Heart,
      title: "Comfort-First Fit",
      description: "Soft padding and a stable design that feels secure without feeling bulky."
    },
    {
      icon: BatteryCharging,
      title: "Wireless & Rechargeable",
      description: "No cords during sessions — use it where you're comfortable."
    },
    {
      icon: Zap,
      title: "Easy Daily Routine",
      description: "Simple controls and a straightforward setup — no learning curve."
    }
  ];

  const trustItems = [
    {
      icon: RotateCcw,
      title: "30-Day Easy Returns",
      description: "Not satisfied? Return it hassle-free."
    },
    {
      icon: Shield,
      title: "2-Year Warranty Included",
      description: "Full coverage for peace of mind."
    },
    {
      icon: Headphones,
      title: "24–48 Hour Support",
      description: "Our team responds quickly to help."
    }
  ];

  const whoItsFor = [
    { icon: Briefcase, text: "Office workers and active lifestyles" },
    { icon: Dumbbell, text: "Post-workout recovery routines" },
    { icon: Sofa, text: "At-home relaxation and comfort sessions" },
    { icon: Users, text: "Anyone who wants a simple, consistent knee-care habit" }
  ];

  const faqs = [
    {
      question: "How do I use FlexiKnee?",
      answer: "Simply wrap FlexiKnee around your knee, secure the adjustable straps, and use the simple controls to select your preferred heat and vibration settings. It's designed to be intuitive — most users are comfortable within seconds."
    },
    {
      question: "How long is a typical session?",
      answer: "Most users enjoy sessions of 15–20 minutes. You can use it multiple times a day based on your comfort level and routine."
    },
    {
      question: "Is it rechargeable?",
      answer: "Yes! FlexiKnee is fully wireless and rechargeable. A single charge provides multiple sessions, so you can use it throughout the day without being tethered to an outlet."
    },
    {
      question: "What's included in the box?",
      answer: "Each FlexiKnee package includes the knee massager device, a USB charging cable, a user manual, and a bonus digital e-guide with tips for daily use."
    },
    {
      question: "How do returns work?",
      answer: "We offer a 30-day easy return policy. If you're not satisfied, simply start a return through your account — you'll need your order number and email. We'll guide you through the process."
    },
    {
      question: "What does the warranty cover?",
      answer: "Our 2-year warranty covers manufacturing defects and functional issues. If your FlexiKnee stops working as expected, we'll replace it or refund you — no hassle."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="relative py-16 md:py-24 overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="container px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-wider animate-fade-in">
              Why FlexiKnee
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Smarter Knee Relief, Designed for Real Life
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A premium knee therapy device combining comfort-focused design with targeted heat and light support — easy to use at home, whenever you need it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="text-lg px-8 h-14 font-semibold">
                <Link to="/product/knee-massager-smart-red-light-and-massage-therapy">
                  Shop FlexiKnee
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-muted-foreground hover:text-primary"
                onClick={scrollToFeatures}
              >
                See how it works
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)}
        className="py-12 md:py-16 bg-muted/30 opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Knee discomfort shouldn't slow you down
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether it's after work, training, or daily movement, knee discomfort can disrupt your routine. FlexiKnee is built to support recovery moments with simple, consistent at-home sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features-section" 
        ref={(el) => (sectionsRef.current[2] = el)}
        className="py-16 md:py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What makes FlexiKnee different
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Designed with real users in mind — simple, effective, and built to fit into your daily life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="border-border/50 bg-card hover:shadow-lg transition-all duration-500 opacity-0 translate-y-6 [.animate-in_&]:opacity-100 [.animate-in_&]:translate-y-0"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)}
        className="py-16 md:py-20 bg-muted/30 opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Made for everyday people
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {whoItsFor.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border/50 opacity-0 translate-x-[-20px] transition-all duration-500 [.animate-in_&]:opacity-100 [.animate-in_&]:translate-x-0 hover:border-primary/30 hover:shadow-md"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            
            <p className="text-center text-xs text-muted-foreground italic">
              FlexiKnee is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)}
        className="py-16 md:py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Confidence built in
              </h2>
              <p className="text-muted-foreground">
                We stand behind every FlexiKnee with guarantees that matter.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustItems.map((item, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 opacity-0 scale-95 transition-all duration-500 [.animate-in_&]:opacity-100 [.animate-in_&]:scale-100 hover:shadow-lg hover:border-primary/20"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:bg-primary/20">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-8">
              Start a return easily with your order number and email.{" "}
              <Link to="/account#returns" className="text-primary hover:underline">
                Go to returns
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={(el) => (sectionsRef.current[5] = el)}
        className="py-16 md:py-20 bg-muted/30 opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-background border border-border/50 rounded-xl px-6 data-[state=open]:shadow-md opacity-0 translate-y-4 transition-all duration-500 [.animate-in_&]:opacity-100 [.animate-in_&]:translate-y-0"
                  style={{ transitionDelay: `${index * 75}ms` }}
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.question === "How do returns work?" ? (
                      <>
                        We offer a 30-day easy return policy. If you're not satisfied, simply{" "}
                        <Link to="/account#returns" className="text-primary hover:underline">
                          start a return through your account
                        </Link>
                        {" "}— you'll need your order number and email. We'll guide you through the process.
                      </>
                    ) : (
                      faq.answer
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        ref={(el) => (sectionsRef.current[6] = el)}
        className="py-16 md:py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to feel the FlexiKnee difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore the device and start your at-home routine today.
            </p>
            <Button asChild size="lg" className="text-lg px-10 h-14 font-semibold transition-transform duration-300 hover:scale-105">
              <Link to="/product/knee-massager-smart-red-light-and-massage-therapy">
                Go to Product Page
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyFlexiKnee;
