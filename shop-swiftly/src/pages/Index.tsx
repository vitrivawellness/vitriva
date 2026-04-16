import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Leaf, 
  ShieldCheck, 
  Beaker, 
  Zap, 
  Moon, 
  Activity, 
  Brain,
  ArrowRight,
  Star,
  Home,
  ChevronRight,
  Battery,
  Coffee,
  CheckCircle,
  HelpCircle,
  Clock,
  LayoutGrid
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1 },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      <Navbar />
      
      {/* SEO Breadcrumbs */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="container-wide">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" /> Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Wellness</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Energy Booster</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* HERO SECTION — Psychological hook */}
      <section className="relative pt-24 pb-40 overflow-hidden bg-vitriva-primary-xlight">
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="max-w-xl"
            >
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-semibold text-vitriva-primary bg-white/60 w-fit px-4 py-2 rounded-full border border-vitriva-primary/10">
                <span className="flex items-center gap-1">⭐ 4.8/5 from customers</span>
                <span className="w-1 h-1 rounded-full bg-vitriva-primary/30" />
                <span className="flex items-center gap-1">🚚 Free delivery above ₹499</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-serif font-extrabold leading-[1.1] mb-6 text-slate-900 tracking-tight">
                Always feeling tired? <br />
                <span className="text-vitriva-primary">Get the Vitriva boost for ₹15.</span>
              </h1>

              <p className="tagline text-xl mb-8 leading-relaxed max-w-lg">
                "A stress-free, healthy life at the cost of a chai — that's the Vitriva promise."
              </p>

               <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-vitriva-primary" /> No unnecessary fillers. Pure science.
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-vitriva-primary" /> Priced for every Indian family.
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-vitriva-primary" /> Wellness that lasts.
                </li>
              </ul>
              
              <div className="flex flex-col gap-3 max-w-sm">
                <Button size="lg" asChild className="btn-primary w-full bg-vitriva-primary text-white hover:bg-vitriva-primary-light py-7 rounded-2xl text-lg shadow-soft transition-all duration-300">
                  <Link to="/products">Shop Now — Free Delivery Today</Link>
                </Button>
                <p className="text-center text-sm font-bold text-vitriva-accent">
                  🔥 143 people bought this week
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-square bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-soft border border-vitriva-primary/10 relative">
                <img src="/assets/Hero.jpeg" alt="Vitriva Hero Image" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === FEATURED BENIFITS === */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="text-vitriva-primary font-bold tracking-widest uppercase text-xs mb-4 block">Premium Wellness Essentials</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Always feeling tired? Get the Vitriva boost.</h2>
            <div className="w-20 h-1.5 bg-vitriva-primary rounded-full mx-auto" />
          </div>

          {/* Usage & Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-vitriva-primary-xlight p-10 rounded-[2.5rem] border border-vitriva-primary/10"
            >
              <div className="w-14 h-14 bg-vitriva-primary rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-vitriva-primary">Instant Energy (Day Use)</h3>
              <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                Kickstart your morning without the caffeine crash. Our bioavailable formula provides sustained physiological energy.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-900 font-semibold italic">
                  <CheckCircle className="w-5 h-5 text-vitriva-primary" /> Fix office afternoon sleepiness.
                </li>
                <li className="flex items-center gap-3 text-slate-900 font-semibold italic">
                  <CheckCircle className="w-5 h-5 text-vitriva-primary" /> Clear brain fog instantly.
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200"
            >
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
                <Moon className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">Deep Sleep Help (Night Use)</h3>
              <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                Calm your nervous system and prepare your body for deep, restorative sleep.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-900 font-semibold italic">
                  <CheckCircle className="w-5 h-5 text-slate-700" /> Stop leg cramps at night.
                </li>
                <li className="flex items-center gap-3 text-slate-900 font-semibold italic">
                  <CheckCircle className="w-5 h-5 text-slate-700" /> Wake up truly refreshed.
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Clinical Potency",
                image: "/assets/Home1.jpeg",
                content: "Our premium products ensure maximum absorption and targeted physiological support.",
              },
              {
                title: "Absolute Purity",
                image: "/assets/Home2.jpeg",
                content: "Lab verified ingredients to ensure 100% purity and enhanced bioavailability.",
              },
              {
                title: "Everyday Value",
                image: "/assets/Home3.jpeg",
                content: "Premium wellness solutions at prices that fit seamlessly into your daily lifestyle.",
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group relative overflow-hidden rounded-3xl bg-vitriva-bg border border-slate-100 hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-vitriva-text-secondary mb-6 font-medium leading-relaxed">{item.content}</p>
                  <Link to="/products" className="inline-flex items-center gap-2 text-vitriva-primary font-bold text-sm hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === WHY VITRIVA SECTION === */}
      <section className="py-24 bg-vitriva-surface-2 border-y border-slate-100">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Results-driven Wellness</h2>
            <p className="text-xl text-vitriva-text-secondary max-w-2xl mx-auto font-medium">
              Why thousands are completely switching their health routine to Vitriva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-sm">
              <img src="/assets/Home4.jpeg" alt="Wellness feature 1" className="w-full h-64 object-cover" />
            </motion.div>
            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-sm">
              <img src="/assets/Home5.jpeg" alt="Wellness feature 2" className="w-full h-64 object-cover" />
            </motion.div>
            <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-sm">
              <img src="/assets/Home6.jpeg" alt="Wellness feature 3" className="w-full h-64 object-cover" />
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" asChild className="btn-primary bg-slate-900 text-white hover:bg-slate-800 px-10 py-6 text-lg rounded-xl">
              <Link to="/products">Join the Vitriva Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem-Solution FAQ */}
      <section className="py-24 bg-white">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Your Wellness Questions, Answered</h2>
            <p className="text-slate-500 text-lg">Science-backed solutions for your daily struggles.</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-slate-200 rounded-2xl px-6 bg-slate-50 shadow-sm overflow-hidden">
              <AccordionTrigger className="text-xl font-bold py-6 hover:no-underline">
                <span className="flex items-center gap-3"><Battery className="w-6 h-6 text-vitriva-primary" /> Always feeling tired?</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-lg pb-6 leading-relaxed">
                That persistent drain is often a sign of nutrient depletion. Vitriva's magnesium-based formula helps optimize your body's Energy production at a cellular level, giving you a natural bounce back for just ₹15.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-slate-200 rounded-2xl px-6 bg-slate-50 shadow-sm overflow-hidden">
              <AccordionTrigger className="text-xl font-bold py-6 hover:no-underline">
                <span className="flex items-center gap-3"><Clock className="w-6 h-6 text-vitriva-primary" /> Leg cramps at night?</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-lg pb-6 leading-relaxed">
                Muscle spasms at 3 AM are the body's way of asking for help. Our chelated magnesium reaches your muscles faster, relaxing them so you can sleep through the night without interruption.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-slate-200 rounded-2xl px-6 bg-slate-50 shadow-sm overflow-hidden">
              <AccordionTrigger className="text-xl font-bold py-6 hover:no-underline">
                <span className="flex items-center gap-3"><Brain className="w-6 h-6 text-vitriva-primary" /> Brain fog fix?</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-lg pb-6 leading-relaxed">
                Mental clarity starts with a calm nervous system. By supporting neurotransmitter function, Vitriva helps clear the "mental haze" so you can focus on what matters.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-slate-200 rounded-2xl px-6 bg-slate-50 shadow-sm overflow-hidden">
              <AccordionTrigger className="text-xl font-bold py-6 hover:no-underline">
                <span className="flex items-center gap-3"><Coffee className="w-6 h-6 text-vitriva-primary" /> Office afternoon sleepiness?</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-lg pb-6 leading-relaxed">
                The 3 PM slump is real. Instead of another coffee, try Vitriva. It stabilizes your energy levels without the jitters or the subsequent crash.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Marketplace Trust Bar */}
      <section className="py-16 border-t border-slate-100 bg-slate-50/50">
        <div className="container-wide">
          <p className="text-center text-slate-400 font-bold uppercase tracking-widest text-xs mb-10">Available Soon On</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-7" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming Soon to Amazon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg" alt="Flipkart" className="h-7" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming Soon to Flipkart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                    <img src="https://companieslogo.com/img/orig/INDIAMART.NS_BIG-467a563d.png?t=1720244492" alt="IndiaMart" className="h-7" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming Soon to IndiaMart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </section>

      {/* === ANIMATED STATS === */}
      <section className="py-20 bg-vitriva-primary text-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold font-serif mb-2">10k+</span>
              <span className="text-vitriva-primary-xlight font-semibold uppercase tracking-wide text-sm">Customers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold font-serif mb-2">₹14.6</span>
              <span className="text-vitriva-primary-xlight font-semibold uppercase tracking-wide text-sm">Per Capsule</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold font-serif mb-2">4.8★</span>
              <span className="text-vitriva-primary-xlight font-semibold uppercase tracking-wide text-sm">Avg Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold font-serif mb-2">48hr</span>
              <span className="text-vitriva-primary-xlight font-semibold uppercase tracking-wide text-sm">Fast Delivery</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
