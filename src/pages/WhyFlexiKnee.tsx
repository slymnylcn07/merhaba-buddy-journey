import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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
import { useEffect, useRef, useState } from "react";
import { LIMITED_WARRANTY_YEARS, RETURN_WINDOW_DAYS, SUPPORT_RESPONSE_TIME } from "@/lib/policy-config";

const WhyFlexiKnee = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      title: "Integrated Red Light",
      description: "Built-in red light mode with simple touch controls for an easy at-home routine."
    },
    {
      icon: Heart,
      title: "Comfort-First Fit",
      description: "Soft padding and a stable design that feels secure without feeling bulky."
    },
    {
      icon: BatteryCharging,
      title: "Wireless & Rechargeable",
      description: "No cords during sessions, use it where you're comfortable."
    },
    {
      icon: Zap,
      title: "Easy Daily Routine",
      description: "Simple controls and a straightforward setup, no learning curve."
    }
  ];

  const trustItems = [
    {
      icon: RotateCcw,
      title: `${RETURN_WINDOW_DAYS}-Day Easy Returns`,
      description: `Eligible returns accepted within ${RETURN_WINDOW_DAYS} days of delivery.`
    },
    {
      icon: Shield,
      title: `${LIMITED_WARRANTY_YEARS}-Year Limited Warranty`,
      description: "Coverage for eligible manufacturing faults."
    },
    {
      icon: Headphones,
      title: "Responsive Customer Support",
      description: `We normally reply ${SUPPORT_RESPONSE_TIME}.`
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
      answer: "Simply wrap FlexiKnee around your knee, secure the adjustable straps, and use the simple controls to select your preferred heat and vibration settings. It's designed to be intuitive, most users are comfortable within seconds."
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
      question: "What if my device arrives damaged or develops a fault?",
      answer: "Contact us with your order number and a short description. Eligible manufacturing faults are covered by our 2-year limited warranty, while delivery damage and incorrect items are handled under our returns policy."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Why FlexiKnee | Premium Knee Comfort for Real Life</title>
        <meta name="description" content="Discover FlexiKnee, a premium cordless knee comfort device combining adjustable warmth, integrated red light and massage-style vibration for simple at-home routines." />
        <link rel="canonical" href="https://flexi-knee.com/why-flexiknee" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/why-flexiknee" />
        <meta property="og:title" content="Why FlexiKnee | Premium Knee Comfort for Real Life" />
        <meta property="og:description" content="Discover FlexiKnee, a premium cordless knee comfort device combining adjustable warmth, integrated red light and massage-style vibration for simple at-home routines." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="Why FlexiKnee | Premium Knee Comfort for Real Life" />
        <meta name="twitter:description" content="Discover FlexiKnee, a premium cordless knee comfort device designed for simple at-home routines." />
        <meta name="twitter:image" content="https://flexi-knee.com/images/og-image.jpg" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="relative overflow-hidden bg-slate-950 py-16 text-white opacity-0 translate-y-8 transition-all duration-700 ease-out md:py-24 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        {/* Parallax Background Elements */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.28),transparent_34%),linear-gradient(135deg,#020617_0%,#0f172a_58%,#172554_100%)]"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.15}px) translateX(${scrollY * -0.05}px)` }}
        />
        <div 
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0005})` }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-primary/4 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * -0.12}px)` }}
        />
        <div className="container relative z-10 px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="text-center lg:text-left">
            <Badge className="mb-5 border-white/15 bg-white/10 text-blue-200 text-xs uppercase tracking-[0.18em] animate-fade-in">
              Why FlexiKnee
            </Badge>
            <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-[-0.045em] text-white md:text-6xl">
              Premium Knee Comfort, Designed for Real Life
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl lg:mx-0">
              Adjustable warmth, integrated red light and massage-style vibration in a cordless design made for calm, simple routines at home.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="text-lg px-8 h-14 font-semibold">
                <Link to="/product/knee-massager-smart-red-light-and-massage-therapy">
                  Shop FlexiKnee
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-slate-300 hover:bg-white/10 hover:text-white"
                onClick={scrollToFeatures}
              >
                See how it works
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-5 rounded-[2.75rem] bg-blue-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-blue-950/40 backdrop-blur">
                <img
                  src="/images/flexiknee-lifestyle-home.webp"
                  alt="FlexiKnee smart heated knee massager used during a calm at-home routine"
                  className="aspect-[4/3] w-full rounded-[2rem] object-cover"
                  fetchPriority="high"
                />
                <div className="grid grid-cols-3 gap-2 p-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200 sm:text-xs">
                  <span className="rounded-xl bg-white/10 px-2 py-3">Cordless</span>
                  <span className="rounded-xl bg-white/10 px-2 py-3">Easy controls</span>
                  <span className="rounded-xl bg-white/10 px-2 py-3">Adjustable fit</span>
                </div>
              </div>
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
            <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 md:text-4xl">
              Comfort that fits around real life
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From long workdays to post-activity wind-downs, FlexiKnee is designed to make a short comfort routine feel easy to repeat.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Story Section */}
      <section 
        ref={(el) => (sectionsRef.current[7] = el)}
        className="bg-slate-950 py-16 text-white opacity-0 translate-y-8 transition-all duration-700 ease-out md:py-24 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] text-white md:text-4xl">
                Designed to feel considered in every detail
              </h2>
              <p className="mx-auto max-w-2xl text-slate-300">
                A cordless form, simple touch controls and an adjustable wraparound fit come together in a device that feels at home in your routine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  image: "/images/flexiknee-lifestyle-home.webp",
                  title: "Comfortable at home",
                  text: "A calm at-home setup makes FlexiKnee easier to fit into a short daily routine.",
                },
                {
                  image: "/images/flexiknee-lifestyle-work.webp",
                  title: "Works around real schedules",
                  text: "The product is designed for people who want something practical after work, training or long standing days.",
                },
                {
                  image: "/images/shopify-gallery/flexiknee-gallery-07-system.webp",
                  title: "Part of a wider system",
                  text: "Use the main device on its own or explore complementary FlexiKnee products for movement and everyday support.",
                },
              ].map((item, index) => (
                <article 
                  key={item.title}
                  className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-xl shadow-black/10 opacity-0 translate-y-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.07] [.animate-in_&]:opacity-100 [.animate-in_&]:translate-y-0"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features-section" 
        ref={(el) => (sectionsRef.current[2] = el)}
        className="bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.16),transparent_42%)] py-16 opacity-0 translate-y-8 transition-all duration-700 ease-out md:py-24 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What makes FlexiKnee different
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Thoughtful controls, cordless use and a comfort-first fit, without unnecessary complexity.
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
                Clear returns, limited warranty coverage and responsive support after your purchase.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustItems.map((item, index) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 text-center shadow-sm opacity-0 scale-95 transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl [.animate-in_&]:opacity-100 [.animate-in_&]:scale-100"
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
                    {faq.answer}
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
        className="bg-slate-950 py-16 text-white opacity-0 translate-y-8 transition-all duration-700 ease-out md:py-24 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <div className="container px-4">
          <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.28),transparent_52%)] px-6 py-14 text-center shadow-2xl shadow-blue-950/30 md:px-12">
            <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
              Bring a calmer routine home.
            </h2>
            <p className="mb-8 text-lg leading-8 text-slate-300">
              See the product, compare the details and choose the routine that fits your day.
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
