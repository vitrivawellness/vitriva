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
    <div className="min-h-screen">
      <Navbar />
      <div className="container-wide py-20 max-w-md mx-auto">
        <h1 className="text-3xl text-center mb-2">Create Account</h1>
        <p className="text-center text-muted-foreground mb-8">Join MAISON for a personalized experience</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><Label>Full Name</Label><Input placeholder="Jane Doe" className="mt-1" value={fullName} onChange={(e) => setFullName(e.target.value)} required /></div>
          <div><Label>Email</Label><Input type="email" placeholder="you@example.com" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div><Label>Password</Label><Input type="password" placeholder="••••••••" className="mt-1" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <div><Label>Confirm Password</Label><Input type="password" placeholder="••••••••" className="mt-1" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
          <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-foreground font-medium hover:underline">Sign in</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
