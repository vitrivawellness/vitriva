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

      {/* === HERO SECTION === */}
      <section className="relative pt-24 pb-40 overflow-hidden bg-gradient-to-b from-medical-lavender via-white to-white">
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="max-w-xl"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-medical-purple uppercase bg-white rounded-full border border-medical-purple/10 shadow-sm">
                Science-Backed Wellness
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] mb-8 text-slate-900">
                Precision <br />
                <span className="text-medical-purple italic">Health</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed font-light">
                Premium products designed for your well-being. Science-backed. Highly effective. Essential nutrition.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 mb-12">
                <Button size="lg" className="bg-medical-purple text-white hover:bg-primary-dark px-10 py-7 rounded-2xl text-lg font-bold shadow-soft transition-all duration-300">
                  Shop Collection
                </Button>
                <div className="flex items-center gap-4 px-5 py-2 bg-white rounded-2xl shadow-medical border border-slate-50">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-600">4.9/5 Average</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-10">
                {[
                  { icon: ShieldCheck, label: "GMP Certified" },
                  { icon: Beaker, label: "Lab Verified" },
                  { icon: Leaf, label: "100% Pure" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-400 font-bold uppercase tracking-widest">
                    <item.icon className="w-5 h-5 text-medical-purple" />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-square bg-white rounded-[40px] flex items-center justify-center p-16 overflow-hidden shadow-soft border border-medical-lavender relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-medical-lavender/50 to-transparent opacity-60" />
                <div className="relative z-10 text-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-10 border-2 border-dashed border-medical-purple/10 rounded-full"
                  />
                  <span className="block text-[180px] font-serif text-medical-purple/10 mb-2 leading-none">Vit</span>
                  <span className="block text-2xl font-bold tracking-[0.4em] text-medical-purple/30 uppercase">Wellness</span>
                </div>
              </div>
              
              {/* Feature Tags */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 -left-8 bg-white p-5 shadow-soft rounded-[24px] flex items-center gap-4 border border-white"
              >
                <div className="w-12 h-12 rounded-2xl bg-medical-purple/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-medical-purple" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Recovery</p>
                  <p className="font-bold text-slate-800 text-lg">Cellular Level</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 -right-8 bg-white p-5 shadow-soft rounded-[24px] flex items-center gap-4 border border-white"
              >
                <div className="w-12 h-12 rounded-2xl bg-medical-blue/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-medical-blue" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Cognitive</p>
                  <p className="font-bold text-slate-800 text-lg">Focus Optimized</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === FEATURED BENIFITS === */}
      <section className="py-32 bg-slate-50">
        <div className="container-wide">
          <div className="text-center mb-24">
            <span className="text-medical-purple font-bold tracking-widest uppercase text-xs mb-4 block">Premium Wellness Essentials</span>
            <h2 className="text-5xl font-serif font-bold mb-6">How It Works</h2>
            <div className="w-20 h-1.5 bg-medical-purple rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Enhanced Bioavailability",
                icon: Activity,
                color: "bg-purple-50 text-purple-600",
                content: "Our premium products ensure maximum absorption and minimal waste.",
              },
              {
                title: "Neuromuscular Support",
                icon: Zap,
                color: "bg-amber-50 text-amber-600",
                content: "Regulates essential electrolyte balance to support muscle fiber relaxation and nerve signaling.",
              },
              {
                title: "Stress Modulation",
                icon: Brain,
                color: "bg-blue-50 text-blue-600",
                content: "Formulated to support the hypothalamic-pituitary-adrenal (HPA) axis and cortisol management.",
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-white p-10 rounded-[32px] shadow-medical hover:shadow-soft transition-all duration-500 border border-transparent hover:border-medical-purple/10"
              >
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-500 mb-8 font-light leading-relaxed">{item.content}</p>
                <Link to="/products" className="inline-flex items-center gap-2 text-medical-purple font-bold text-sm hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === QUALITY SECTION === */}
      <section className="py-40 bg-white overflow-hidden relative">
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-5xl font-serif font-bold mb-10 leading-tight">Product <br /><span className="text-medical-purple">Benefits</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Chelated Minerals",
                  "Bioactive Forms",
                  "Vegan Certified",
                  "Purity Tested",
                  "No Preservatives",
                  "Zero Fillers"
                ].map((adv, i) => (
                  <div key={i} className="flex gap-4 items-center p-6 bg-medical-lavender/30 rounded-2xl border border-medical-lavender hover:bg-white hover:shadow-medical transition-all">
                    <CheckCircle2 className="w-5 h-5 text-medical-purple shrink-0" />
                    <span className="font-bold text-slate-700 text-sm tracking-tight">{adv}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
              className="bg-medical-purple rounded-[48px] p-16 text-white shadow-soft relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <h3 className="text-3xl font-bold mb-10 italic">Our Promise</h3>
              <p className="text-2xl text-white/80 mb-12 leading-relaxed font-light italic">
                "Designed for optimal wellness. Ideal for those seeking premium nutritional support for body and mind."
              </p>
              
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest mb-3">Serving</p>
                  <p className="text-xl font-bold">400mg Elemental</p>
                </div>
                <div>
                  <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest mb-3">Purity</p>
                  <p className="text-xl font-bold">100% Tested</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* === FINAL CALL === */}
      <section className="py-40 bg-white">
        <div className="container-wide text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-4xl mx-auto bg-slate-900 rounded-[64px] p-24 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-medical-purple/40 to-transparent opacity-50" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10">Start Your <br /><span className="text-medical-purple">Wellness Journey</span></h2>
              <Button size="xl" className="bg-white text-slate-900 hover:bg-medical-purple hover:text-white px-12 py-8 rounded-2xl text-xl font-bold transition-all shadow-xl">
                Order Your Supply
              </Button>
              <p className="mt-10 text-white/40 text-sm italic">Tested. Proven. Essential.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
