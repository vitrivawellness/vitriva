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
  Star
} from "lucide-react";

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
                Stop spending ₹500 on doctor visits.<br />
                <span className="text-vitriva-primary">Start spending ₹15 on your health.</span>
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">How It Works</h2>
            <div className="w-20 h-1.5 bg-vitriva-primary rounded-full mx-auto" />
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
