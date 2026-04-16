import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

const PrivacyPolicy = () => {
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
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900">Privacy Policy</h1>
              <p className="text-lg text-slate-600 font-medium italic">
                Your health is personal. Your data should be too.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-wide max-w-4xl px-6">
          <div className="prose prose-slate prose-lg max-w-none space-y-12">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-vitriva-primary mb-4">
                <Shield className="w-6 h-6" /> Introduction
              </h2>
              <p className="text-slate-600 leading-relaxed">
                At Vitriva Wellness Pvt Limited, we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website vitriva-wellness.com and our practices for collecting, using, maintaining, protecting, and disclosing that information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-vitriva-primary mb-4">
                <FileText className="w-6 h-6" /> Information We Collect
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We collect several types of information from and about users of our Website, including information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>By which you may be personally identified, such as name, postal address, e-mail address, and telephone number ("personal information").</li>
                <li>About your internet connection, the equipment you use to access our Website, and usage details.</li>
                <li>Health-related preferences you provide to help us recommend the right wellness products.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-vitriva-primary mb-4">
                <Lock className="w-6 h-6" /> Data Security
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls. Any payment transactions will be encrypted using SSL technology.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-vitriva-primary mb-4">
                <Eye className="w-6 h-6" /> How We Use Your Information
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We use information that we collect about you or that you provide to us, including any personal information:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-600">
                <li>To present our Website and its contents to you.</li>
                <li>To provide you with information, products, or services that you request from us.</li>
                <li>To fulfill any other purpose for which you provide it.</li>
                <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="text-slate-600">
                To ask questions or comment about this privacy policy and our privacy practices, contact us at:<br />
                <span className="font-bold">Email:</span> hello@vitriva-wellness.com<br />
                <span className="font-bold">Phone:</span> +91 82483 73198
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
