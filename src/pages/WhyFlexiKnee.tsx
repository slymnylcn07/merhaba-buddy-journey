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
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BadgeCheck,
  Facebook,
  Instagram
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LIMITED_WARRANTY_YEARS, RETURN_WINDOW_DAYS, SUPPORT_RESPONSE_TIME } from "@/lib/policy-config";
import {
  BRAND_DESCRIPTION,
  OFFICIAL_FACEBOOK_URL,
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_SITE_URL,
} from "@/lib/brand-config";

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

  const differenceHighlights = [
    "Cordless daily use",
    "Clean touch controls",
    "Secure comfort-first fit"
  ];

  const faqs = [
    {
      question: "What is the official FlexiKnee website?",
      answer: "The official FlexiKnee website is flexi-knee.com. Product details, customer support, shipping and return information published on this domain are the official FlexiKnee store resources."
    },
    {
      question: "How do I use FlexiKnee?",
      answer: "Simply wrap FlexiKnee around your knee, secure the adjustable straps, and use the simple controls to select your preferred heat and vibration settings. The controls are designed to be straightforward. Follow the included manual, begin with a comfortable setting, and stop if the device feels uncomfortable."
    },
    {
      question: "How long is a typical session?",
      answer: "Use the session length and frequency stated in the included manual. Begin conservatively, check your skin and comfort, and stop if you notice irritation, numbness, or unusual discomfort."
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

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${OFFICIAL_SITE_URL}/why-flexiknee#about`,
    url: `${OFFICIAL_SITE_URL}/why-flexiknee`,
    name: "About FlexiKnee",
    description: BRAND_DESCRIPTION,
    isPartOf: { "@id": `${OFFICIAL_SITE_URL}/#website` },
    about: { "@id": `${OFFICIAL_SITE_URL}/#organization` },
    mainEntity: {
      "@type": "Organization",
      "@id": `${OFFICIAL_SITE_URL}/#organization`,
      name: "FlexiKnee",
      url: `${OFFICIAL_SITE_URL}/`,
      sameAs: [OFFICIAL_INSTAGRAM_URL, OFFICIAL_FACEBOOK_URL],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About FlexiKnee | Official Brand, Products & Support</title>
        <meta name="description" content="Learn about the official FlexiKnee brand, its Smart Heated Knee Massager, product standards, customer support, returns, warranty, and verified social profiles." />
        <link rel="canonical" href="https://flexi-knee.com/why-flexiknee" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/why-flexiknee" />
        <meta property="og:title" content="About FlexiKnee | Official Brand, Products & Support" />
        <meta property="og:description" content="Learn about the official FlexiKnee brand, its Smart Heated Knee Massager, product standards, customer support, returns, warranty, and verified social profiles." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@flexikneeofficial" />
        <meta name="twitter:title" content="About FlexiKnee | Official Brand" />
        <meta name="twitter:description" content="The official FlexiKnee brand page for products, standards, support, and verified profiles." />
        <meta name="twitter:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(aboutPageJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
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
              <BadgeCheck className="mr-2 h-4 w-4" /> Official FlexiKnee brand
            </Badge>
            <h1 className="mb-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-white md:text-6xl">
              About FlexiKnee
            </h1>
            <p className="max-w-2xl text-xl font-semibold leading-8 text-white md:text-2xl lg:mx-0">
              Premium knee comfort, designed for real life.
            </p>
            <p className="mb-7 mt-4 max-w-2xl text-lg leading-8 text-slate-300 lg:mx-0">
              {BRAND_DESCRIPTION} Adjustable warmth, integrated red light and massage-style vibration come together in a cordless design for calm, simple routines at home.
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
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm lg:justify-start">
              <a href={`${OFFICIAL_SITE_URL}/`} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/15">
                Official site: flexi-knee.com
              </a>
              <a href={OFFICIAL_INSTAGRAM_URL} target="_blank" rel="me noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-slate-200 hover:bg-white/10 hover:text-white">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a href={OFFICIAL_FACEBOOK_URL} target="_blank" rel="me noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-slate-200 hover:bg-white/10 hover:text-white">
                <Facebook className="h-4 w-4" /> Facebook
              </a>
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
              The official FlexiKnee brand
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              FlexiKnee develops knee-comfort products and practical educational guides around simple at-home routines. The official FlexiKnee website is <strong className="text-slate-900">flexi-knee.com</strong>, supported by the verified Instagram and Facebook profiles linked on this page.
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
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">Refined around the routine</p>
              <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] text-white md:text-4xl">
                Designed to feel considered in every detail
              </h2>
              <p className="mx-auto max-w-2xl text-slate-300">
                Each view below shows the same idea from a different angle: a calmer evening setup, a practical daytime rhythm and a fit that feels simple to adjust.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  image: "/images/product-stories/massager-evening-reading.png",
                  alt: "FlexiKnee used during a calm evening reading routine",
                  title: "A calmer evening setup",
                  text: "Soft lighting, a quiet seat and an easy session length make the product feel natural in a wind-down routine.",
                },
                {
                  image: "/images/product-stories/massager-workday-routine.png",
                  alt: "FlexiKnee worn while working from home",
                  title: "Fits around the day",
                  text: "The cordless format supports flexible use around work, breaks and the moments when your schedule is already full.",
                },
                {
                  image: "/images/product-stories/massager-closeup-comfort.png",
                  alt: "Close-up of FlexiKnee wraparound fit and controls",
                  title: "Comfort-first in the details",
                  text: "The wraparound shape, adjustable straps and clean control layout help the device feel straightforward from the first use.",
                },
              ].map((item, index) => (
                <article 
                  key={item.title}
                  className="group overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 shadow-xl shadow-black/10 opacity-0 translate-y-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.07] [.animate-in_&]:opacity-100 [.animate-in_&]:translate-y-0"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="overflow-hidden">
                    <img src={item.image} alt={item.alt} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">
                      Detail {index + 1}
                    </div>
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
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200/70 bg-white/85 p-6 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.32)] backdrop-blur md:p-10">
            <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Premium details
                </div>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
                  What makes FlexiKnee different
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                  A cleaner, more elevated take on an at-home knee routine: cordless use, intuitive controls and a fit designed to feel easy from the first session.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {differenceHighlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm font-medium text-slate-700 shadow-sm">
                    <div className="mb-2 flex items-center gap-2 text-blue-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.18em]">Included</span>
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="border-slate-200/80 bg-white hover:-translate-y-1 hover:shadow-xl transition-all duration-500 opacity-0 translate-y-6 [.animate-in_&]:opacity-100 [.animate-in_&]:translate-y-0"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 transition-transform duration-300 hover:scale-110">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-950">{feature.title}</h3>
                    <p className="text-sm leading-7 text-slate-600">{feature.description}</p>
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
          <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.28),transparent_52%)] px-6 py-14 text-center shadow-2xl shadow-blue-950/30 md:px-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
              <Sparkles className="h-4 w-4" />
              Knee comfort quiz
            </div>
            <h2 className="mb-4 text-3xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
              Not sure where to start? Take the 60-second quiz.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-slate-300">
              Answer a few quick questions and we will point you to the routine, guide and FlexiKnee option that best fits your day.
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-200">
              {[
                "3 quick questions",
                "Routine matched to your answers",
                "Product and guide recommendations",
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-14 px-10 text-lg font-semibold transition-transform duration-300 hover:scale-105">
                <Link to="/knee-quiz">
                  Start the Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="h-14 px-8 text-base font-semibold text-slate-200 hover:bg-white/10 hover:text-white">
                <Link to="/product/knee-massager-smart-red-light-and-massage-therapy">
                  View the Product
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyFlexiKnee;
