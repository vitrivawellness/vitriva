import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { api } from "@/services/api";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setIsLoading(true);
    try {
      await api.register({ full_name: fullName, email, password });
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md bg-white rounded-[40px] p-10 lg:p-12 shadow-medical border border-slate-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-medical-purple rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <span className="text-white font-serif font-bold italic text-2xl">V</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500 font-medium italic">Join the Vitriva community</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
              <Input 
                placeholder="Dr. Jane Doe" 
                className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-medical-purple/20 font-medium" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
              <Input 
                type="email" 
                placeholder="you@email.com" 
                className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-medical-purple/20 font-medium" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Password</Label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-medical-purple/20 font-medium" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Confirm Password</Label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-medical-purple/20 font-medium" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>
            <Button className="w-full h-14 rounded-2xl shadow-medical text-lg font-bold mt-4" type="submit" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already enrolled? <Link to="/login" className="text-medical-purple font-bold hover:underline ml-1">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
