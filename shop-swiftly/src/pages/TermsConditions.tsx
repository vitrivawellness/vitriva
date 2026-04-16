import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Scale, CheckCircle, AlertCircle, Truck } from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <section className="bg-vitriva-primary-xlight py-16 mb-12">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900">Terms & Conditions</h1>
              <p className="text-lg text-slate-600 font-medium italic">
                Transparent rules for a healthier relationship.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-wide max-w-4xl px-6">
          <div className="prose prose-slate prose-lg max-w-none space-y-12">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-vitriva-primary mb-4">
                <Scale className="w-6 h-6" /> 1. Acceptance of Terms
              </h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-vitriva-primary mb-4">
                <CheckCircle className="w-6 h-6" /> 2. Product Use & Disclaimer
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Vitriva Wellness products are FSSAI approved science-led nutritional supplements. However, they are not intended to diagnose, treat, cure, or prevent any disease. Always consult with a healthcare professional before starting any new supplement regimen, especially if you have a medical condition or are pregnant.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-vitriva-primary mb-4">
                <Truck className="w-6 h-6" /> 3. Shipping & Delivery
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We offer free delivery on orders above ₹499. Orders are typically processed within 24-48 hours. Shipping times vary by location but usually range from 3-5 business days across India.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-vitriva-primary mb-4">
                <AlertCircle className="w-6 h-6" /> 4. Returns & Refunds
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Due to the nature of high-potency nutritional products, we only accept returns for items that are damaged during transit or have manufacturing defects. Please notify us within 48 hours of delivery with photographic evidence.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-xl font-bold mb-2">Governing Law</h3>
              <p className="text-slate-600">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in Puducherry.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;
