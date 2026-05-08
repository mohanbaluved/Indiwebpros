"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Rocket, 
  Users, 
  Code, 
  Cpu, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Globe, 
  MessageSquare, 
  ArrowRight, 
  ChevronDown,
  Brain,
  Layers,
  GraduationCap,
  ShieldCheck,
  Zap,
  TrendingUp,
  Briefcase
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Logo } from "./ui/Logo";

// --- Components ---

const SectionHeading = ({ title, subtitle, description, light = false }: { title: string, subtitle?: string, description?: string, light?: boolean }) => (
  <div className="flex flex-col items-center text-center mb-16">
    {subtitle && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border",
          light ? "bg-white/10 border-white/20" : "bg-indigo-50 border-indigo-100"
        )}
      >
        <span className={cn(
          "text-[10px] font-mono font-bold tracking-widest uppercase",
          light ? "text-indigo-300" : "text-indigo-600"
        )}>{subtitle}</span>
      </motion.div>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={cn(
        "text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6",
        light ? "text-white" : "text-slate-900"
      )}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={cn(
          "text-lg max-w-2xl leading-relaxed",
          light ? "text-slate-300" : "text-slate-500"
        )}
      >
        {description}
      </motion.p>
    )}
  </div>
);

// --- Sections ---

export function InternshipSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    college: "",
    degree: "",
    year: "1st Year",
    domain: "",
    skills: "",
    reason: ""
  });

  const totalSteps = 4;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setDomain = (domain: string) => setFormData(prev => ({ ...prev, domain }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    try {
      const response = await fetch("/api/internship-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setFormStatus("error");
    }
  };

  const faqs = [
    { q: "Is the internship online?", a: "Yes, the internship is fully virtual, allowing students from anywhere to participate." },
    { q: "Will certificates be provided?", a: "Absolutly! Upon successful completion, you will receive an official Internship Completion Certificate." },
    { q: "Is prior experience required?", a: "While basic understanding is helpful, our program is designed for students and beginners with an eager mind to learn." },
    { q: "Are projects included?", a: "Yes, the entire program is project-based. You will work on real-time industry-standard projects." },
    { q: "What is the duration of the internship?", a: "The program spans 8 weeks, covering everything from fundamentals to final project presentation." },
    { q: "Can beginners apply?", a: "Yes, we welcome beginners! Our mentorship ensures you get the support needed at every step." },
    { q: "Will mentorship be provided?", a: "Yes, you will have access to dedicated mentors for guidance during your learning and project development." },
    { q: "How will communication happen?", a: "Communication will take place through our dedicated community platform and periodic virtual meetings." }
  ];

  return (
    <div id="internship" className="w-full bg-white selection:bg-indigo-100">
      
      {/* SECTION 1 — HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/20 blur-[100px] rounded-full animate-pulse transition-all duration-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-indigo-500/10 border border-indigo-500/20 rounded-full backdrop-blur-md"
          >
            <Rocket className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold tracking-widest text-indigo-300 uppercase">Now Open for 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8"
          >
            🚀 IndiWebPros <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Internship Program 2026
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 font-medium mb-6"
          >
            Build Real Skills. Work on Real Projects. Grow with Industry Exposure.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed mb-12"
          >
            Gain practical experience in Full Stack Development and AI & ML Engineering through hands-on projects, mentorship, and industry-oriented learning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#apply"
              className="group px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/25 active:scale-95"
            >
              Apply Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="px-8 py-4 bg-slate-900/50 border border-slate-800 text-white font-bold rounded-2xl backdrop-blur-md hover:bg-slate-800 transition-all active:scale-95">
              Join Community
            </button>
          </motion.div>

          {/* Floating Elements/Icons */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full pointer-events-none hidden xl:block">
             <motion.div 
               animate={{ y: [0, -20, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-[15%] left-[5%] p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl"
             >
               <Cpu className="w-8 h-8 text-indigo-400" />
             </motion.div>
             <motion.div 
               animate={{ y: [0, 20, 0] }} 
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-[25%] left-[8%] p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl"
             >
               <Code className="w-8 h-8 text-cyan-400" />
             </motion.div>
             <motion.div 
               animate={{ y: [0, -15, 0] }} 
               transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-[20%] right-[6%] p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl"
             >
               <Brain className="w-8 h-8 text-purple-400" />
             </motion.div>
             <motion.div 
               animate={{ y: [0, 25, 0] }} 
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-[20%] right-[10%] p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl"
             >
               <Users className="w-8 h-8 text-emerald-400" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ABOUT INTERNSHIP */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="About the Internship Program"
            subtitle="Bridging the Gap"
            description="The IndiWebPros Internship Program is an 8-week industry-oriented learning experience designed to help students bridge the gap between academic learning and practical implementation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Mentorship", desc: "Expert guidance from industry professionals throughout the journey.", icon: Users },
              { title: "Practical Learning", desc: "Focus on implementation-based workflows over theoretical rote.", icon: Zap },
              { title: "Real Projects", desc: "Work on actual industry-oriented mini projects and final tasks.", icon: Layers },
              { title: "Collaboration", desc: "Experience teamwork with collaborative activities and peer review.", icon: Globe },
              { title: "Skill Development", desc: "Improve technical understanding and boost your practical confidence.", icon: TrendingUp },
              { title: "Community Access", desc: "Join our technical network for lifelong learning and opportunities.", icon: MessageSquare },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-indigo-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — INTERNSHIP DOMAINS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Choose Your Path"
            subtitle="Internship Domains"
            description="Specialize in either modern web technologies or intelligence systems. Each domain is packed with intensive learning."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Domain Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                <div>
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20">
                    <Code className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Full Stack Development</h3>
                  <p className="text-slate-500 mb-6">Designed for students interested in modern web technologies and complete application development.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Topics Covered</h4>
                  <ul className="space-y-3">
                    {["HTML5 & CSS3", "JavaScript (ES6+)", "React Basics", "APIs & Integration", "Backend Fundamentals", "Databases (SQL/NoSQL)", "Git & GitHub", "Authentication", "Deployment"].map(topic => (
                      <li key={topic} className="flex items-center gap-2 text-slate-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Skills Gained</h4>
                  <ul className="space-y-4">
                    {["Frontend Development", "Backend Integration", "Responsive UI Design", "Workflow Management", "Deployment Knowledge"].map(skill => (
                      <li key={skill} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm font-medium">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <a href="#apply" className="w-full inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95">
                  Enroll in Full Stack
                </a>
              </div>
            </motion.div>

            {/* Domain Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                <div>
                  <div className="w-16 h-16 bg-cyan-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-600/20">
                    <Cpu className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">AI & ML Engineering</h3>
                  <p className="text-slate-500 mb-6">Designed for students interested in Artificial Intelligence, Machine Learning, and intelligent systems.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-4">Topics Covered</h4>
                  <ul className="space-y-3">
                    {["Python Programming", "NumPy & Pandas", "ML Fundamentals", "Data Preprocessing", "Model Training", "Deep Learning Basics", "Computer Vision", "NLP Basics", "AI Workflow"].map(topic => (
                      <li key={topic} className="flex items-center gap-2 text-slate-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-4">Skills Gained</h4>
                  <ul className="space-y-4">
                    {["ML Understanding", "AI Model Workflows", "Dataset Handling", "Analytical Thinking", "Project Implementation"].map(skill => (
                      <li key={skill} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm font-medium">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <a href="#apply" className="w-full inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95">
                  Enroll in AI/ML
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — INTERNSHIP DETAILS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Program Logistics"
            subtitle="At a Glance"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Duration", value: "8 Weeks", icon: Calendar, color: "text-indigo-600" },
              { label: "Mode", value: "Online", icon: Globe, color: "text-blue-600" },
              { label: "Type", value: "Project-Based", icon: Rocket, color: "text-purple-600" },
              { label: "Eligibility", value: "Students & Beginners", icon: GraduationCap, color: "text-cyan-600" },
              { label: "Certificate", value: "Professional", icon: Award, color: "text-emerald-600" },
              { label: "Mentorship", value: "1-on-1 Access", icon: Users, color: "text-amber-600" },
              { label: "Projects", value: "Real-Time Tasks", icon: Layers, color: "text-rose-600" },
              { label: "Community", value: "Full Access", icon: MessageSquare, color: "text-indigo-600" },
            ].map((detail, idx) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-center flex flex-col items-center justify-center group hover:bg-white hover:border-indigo-100 hover:shadow-lg transition-all"
              >
                <detail.icon className={cn("w-8 h-8 mb-4 group-hover:scale-110 transition-transform", detail.color)} />
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">{detail.label}</p>
                <p className="text-sm md:text-base font-bold text-slate-900">{detail.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WEEKLY ROADMAP */}
      <section id="roadmap" className="py-24 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <SectionHeading 
            title="Eight-Week Journey to Mastery"
            subtitle="The Roadmap"
            light={true}
          />

          <div className="relative mt-20 space-y-12">
            {/* Timeline center line */}
            <div className="absolute left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

            {[
              { week: 1, title: "Foundation & Introduction", desc: "Setting up the environment and understanding program goals." },
              { week: 2, title: "Core Technical Concepts", desc: "Deep dive into the fundamental building blocks of your domain." },
              { week: 3, title: "Practical Implementation", desc: "Applying initial concepts to small-scale interactive tasks." },
              { week: 4, title: "Intermediate Project Work", desc: "Transitioning to complex problem solving with guided support." },
              { week: 5, title: "Advanced Concepts & Workflows", desc: "Exploring state management, optimizations and advanced APIs." },
              { week: 6, title: "Real-World Development Practices", desc: "Industry standards, clean code, and testing methodologies." },
              { week: 7, title: "Final Project Development", desc: "Individual/Team capstone projects from concept to code." },
              { week: 8, title: "Project Completion & Presentation", desc: "Final refinements, documentation, and demo presentation." },
            ].map((item, idx) => (
              <motion.div
                key={item.week}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-8 w-full",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                <div className="flex-1 text-center md:text-right hidden md:block">
                   {idx % 2 === 0 && (
                     <div className="pr-12">
                       <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-slate-400">{item.desc}</p>
                     </div>
                   )}
                </div>

                <div className="relative z-10 w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-indigo-500/30 flex-shrink-0">
                  {item.week}
                </div>

                <div className="flex-1 text-center md:text-left">
                   {(idx % 2 !== 0 || window.innerWidth < 768) && (
                     <div className="md:pl-12">
                       <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-slate-400">{item.desc}</p>
                     </div>
                   )}
                   {idx % 2 === 0 && window.innerWidth < 768 && (
                     <div className="pl-0">
                       <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-slate-400">{item.desc}</p>
                     </div>
                   )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — INTERNSHIP BENEFITS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Benefits of Joining Us"
            subtitle="Unlock Your Potential"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
            {[
              { title: "Practical Experience", icon: Rocket },
              { title: "Industry-Oriented", icon: Globe },
              { title: "Project Exposure", icon: Layers },
              { title: "Mentorship", icon: Users },
              { title: "Team Collaboration", icon: Briefcase },
              { title: "Resume Building", icon: Award },
              { title: "LinkedIn Support", icon: TrendingUp },
              { title: "Official Certificate", icon: ShieldCheck },
              { title: "Community Access", icon: MessageSquare },
              { title: "Portfolio Building", icon: Code },
            ].map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col items-center text-center group hover:bg-indigo-600 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-white transition-colors">{benefit.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — PROJECT-BASED LEARNING */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="pt-12 space-y-4">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                     className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow"
                   >
                     <p className="text-xs font-bold text-indigo-600 uppercase mb-2">Phase 01</p>
                     <h4 className="font-bold text-slate-900">Guided Tasks</h4>
                   </motion.div>
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                     className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow"
                   >
                     <p className="text-xs font-bold text-cyan-600 uppercase mb-2">Phase 02</p>
                     <h4 className="font-bold text-slate-900">Mini Projects</h4>
                   </motion.div>
                </div>
                <div className="space-y-4">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                     className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow"
                   >
                     <p className="text-xs font-bold text-emerald-600 uppercase mb-2">Phase 03</p>
                     <h4 className="font-bold text-slate-900">Collaborative Flow</h4>
                   </motion.div>
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                     className="p-8 bg-indigo-600 border border-indigo-500 rounded-[2.5rem] shadow-xl text-white"
                   >
                     <p className="text-xs font-bold text-indigo-200 uppercase mb-2">Phase 04</p>
                     <h4 className="font-bold">Final Capstone</h4>
                   </motion.div>
                </div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2">
              <SectionHeading 
                title="Project-Based Learning Approach"
                subtitle="Learning by Doing"
                description="The internship emphasizes practical implementation instead of only theoretical learning. Strengthen your technical understanding and real-world problem-solving ability."
              />
              <div className="mt-8 space-y-4">
                {[
                  "Development workflows",
                  "Project execution strategy",
                  "Agile teamwork approach",
                  "Implementation best practices",
                  "Industry-oriented workflow exposure"
                ].map((item, idx) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 min-w-5" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — CERTIFICATION SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-950 rounded-[3.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

            <div className="flex-1 text-center lg:text-left relative z-10">
              <SectionHeading 
                title="Internship Certification"
                subtitle="Official Recognition"
                light={true}
              />
              <p className="text-slate-400 mb-10 -mt-8 text-lg">
                Participants who successfully complete the internship program will receive an official Internship Completion Certificate from IndiWebPros recognizing their participation, technical learning, and project involvement.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Verify at</p>
                  <p className="text-sm font-bold text-white">indiwebpros.com/verify</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Batch ID</p>
                  <p className="text-sm font-bold text-indigo-400">IWP-INT-2026-001</p>
                </div>
              </div>
            </div>

            <div className="flex-1 relative order-first lg:order-last">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="relative bg-white p-6 md:p-10 rounded-2xl shadow-2xl shadow-indigo-500/20 max-w-lg mx-auto"
              >
                {/* Mock Certificate Content */}
                <div className="border-8 border-slate-50 p-6 md:p-10 flex flex-col items-center text-center">
                   <div className="mb-6">
                     <Logo className="w-12 h-12" />
                   </div>
                   <h2 className="text-2xl font-serif text-slate-900 mb-2">Certificate of Internship</h2>
                   <p className="text-slate-400 italic text-sm mb-6">This is to certify that</p>
                   <div className="w-full border-b border-slate-200 pb-2 mb-4">
                     <span className="text-xl font-bold text-indigo-600">[Intern Name]</span>
                   </div>
                   <p className="text-slate-500 text-xs mb-8">has successfully completed the 8-Week Professional Internship in Full Stack Development with excellence.</p>
                   
                   <div className="w-full flex justify-between items-end mt-4">
                      <div className="text-left">
                        <div className="w-24 border-b border-slate-300 pb-1 mb-1" />
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Program Director</p>
                      </div>
                      <div className="p-2 border border-slate-100 rounded-lg">
                        <div className="grid grid-cols-2 gap-0.5">
                           {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 bg-slate-300" />)}
                        </div>
                        <p className="text-[8px] text-slate-300 font-mono mt-1">QR09X</p>
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — WHY CHOOSE INDIWEBPROS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Why Choose IndiWebPros?"
            subtitle="The IndiWebPros Advantage"
            description="We focus on practical learning, mentorship, and industry-oriented workflows to help you build true technical confidence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Practical Exposure", icon: Zap, color: "text-amber-500" },
              { title: "Mentorship", icon: Users, color: "text-indigo-500" },
              { title: "Real Projects", icon: Layers, color: "text-purple-500" },
              { title: "Skill Development", icon: Award, color: "text-cyan-500" },
              { title: "Technical Community", icon: MessageSquare, color: "text-emerald-500" },
              { title: "Industry Workflow", icon: Briefcase, color: "text-indigo-500" },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-10 bg-white border border-slate-200 rounded-[2.5rem] hover:shadow-xl transition-all group"
              >
                <div className={cn("w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", item.color)}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm">Our platform is built to simulate a high-growth startup environment, giving you the edge in your career journey.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading 
            title="Frequently Asked Questions"
            subtitle="Help Center"
          />

          <div className="space-y-4 mt-6">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-slate-200 rounded-3xl overflow-hidden bg-white hover:border-indigo-200 transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-slate-900 md:text-lg">{faq.q}</span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-indigo-600 transition-transform duration-300",
                    activeFaq === idx ? "rotate-180" : ""
                  )} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-slate-50"
                    >
                      <div className="p-6 pt-0 text-slate-500 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11 — APPLICATION FORM */}
      <section id="apply" className="py-24 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-[3.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Form decorative background */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-[60px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-[60px]" />

            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                 <Rocket className="w-12 h-12 text-indigo-600 mx-auto mb-6" />
                 <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Apply for Internship</h2>
                 <p className="text-slate-500 font-medium">Fill out the application form to join the IndiWebPros 8-Week Internship Program.</p>
              </div>

              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Application Submitted!</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Thank you for applying to the IndiWebPros Internship Program. Your details have been stored securely. Our team will review your application and contact you soon.
                  </p>

                  <button 
                    onClick={() => {
                      setFormStatus("idle");
                      setCurrentStep(1);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        whatsapp: "",
                        college: "",
                        degree: "",
                        year: "1st Year",
                        domain: "",
                        skills: "",
                        reason: ""
                      });
                    }}
                    className="mt-10 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : formStatus === "error" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-rose-50 border border-rose-100 rounded-[2rem] p-12 text-center"
                >
                  <div className="w-20 h-20 bg-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-rose-500/20">
                    <Zap className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Submission Failed</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Something went wrong while processing your application. Please try again later.
                  </p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="mt-10 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-12">
                     <motion.div 
                       className="h-full bg-indigo-600"
                       initial={{ width: 0 }}
                       animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                     />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <AnimatePresence mode="wait">
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="space-y-6">
                            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-3">
                              <span className="w-8 h-px bg-indigo-100" /> Step 01: Domain Selection
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <label className={cn(
                                 "relative flex items-center p-6 border-2 rounded-[2rem] cursor-pointer transition-all group",
                                 formData.domain === "Full Stack Development" ? "border-indigo-600 bg-indigo-50" : "bg-slate-50 border-slate-100 hover:border-indigo-100"
                               )}>
                                 <input 
                                   type="radio" 
                                   name="domain" 
                                   value="Full Stack Development" 
                                   className="sr-only" 
                                   required 
                                   checked={formData.domain === "Full Stack Development"}
                                   onChange={() => setDomain("Full Stack Development")}
                                 />
                                 <div>
                                   <p className="font-black text-slate-900">Full Stack Development</p>
                                   <p className="text-xs text-slate-500">Modern Web Apps</p>
                                 </div>
                                 <div className="ml-auto w-6 h-6 border-2 border-slate-200 rounded-full flex items-center justify-center p-1">
                                   <div className={cn("w-full h-full bg-indigo-600 rounded-full transition-transform", formData.domain === "Full Stack Development" ? "scale-100" : "scale-0")} />
                                 </div>
                               </label>
                               <label className={cn(
                                 "relative flex items-center p-6 border-2 rounded-[2rem] cursor-pointer transition-all group",
                                 formData.domain === "AI & ML Engineering" ? "border-cyan-600 bg-cyan-50" : "bg-slate-50 border-slate-100 hover:border-cyan-100"
                               )}>
                                 <input 
                                   type="radio" 
                                   name="domain" 
                                   value="AI & ML Engineering" 
                                   className="sr-only" 
                                   required 
                                   checked={formData.domain === "AI & ML Engineering"}
                                   onChange={() => setDomain("AI & ML Engineering")}
                                 />
                                 <div>
                                   <p className="font-black text-slate-900">AI & ML Engineering</p>
                                   <p className="text-xs text-slate-500">Intelligent Systems</p>
                                 </div>
                                 <div className="ml-auto w-6 h-6 border-2 border-slate-200 rounded-full flex items-center justify-center p-1">
                                   <div className={cn("w-full h-full bg-cyan-600 rounded-full transition-transform", formData.domain === "AI & ML Engineering" ? "scale-100" : "scale-0")} />
                                 </div>
                               </label>
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={nextStep}
                            disabled={!formData.domain}
                            className="w-full py-6 bg-slate-900 text-white font-black text-xl rounded-[2rem] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                          >
                            Continue to Personal Info <ArrowRight className="w-6 h-6" />
                          </button>
                        </motion.div>
                      )}

                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="space-y-6">
                            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-3">
                              <span className="w-8 h-px bg-indigo-100" /> Step 02: Personal Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                                <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+91 00000 00000" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">WhatsApp Number</label>
                                <input required name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} type="tel" placeholder="+91 00000 00000" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900" />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <button type="button" onClick={prevStep} className="px-8 py-6 bg-slate-100 text-slate-600 font-bold rounded-[2rem] hover:bg-slate-200 transition-all">Back</button>
                            <button 
                              type="button" 
                              onClick={nextStep} 
                              disabled={!formData.fullName || !formData.email || !formData.phone}
                              className="flex-1 py-6 bg-slate-900 text-white font-black text-xl rounded-[2rem] disabled:opacity-50 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                            >
                              Academic Details <ArrowRight className="w-6 h-6" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="space-y-6">
                            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-3">
                              <span className="w-8 h-px bg-indigo-100" /> Step 03: Academic Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">College Name</label>
                                <input required name="college" value={formData.college} onChange={handleInputChange} type="text" placeholder="Enter your institution" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Degree / Branch</label>
                                <input required name="degree" value={formData.degree} onChange={handleInputChange} type="text" placeholder="e.g. B.Tech CSE" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Year of Study</label>
                                <div className="relative">
                                  <select name="year" value={formData.year} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all appearance-none text-slate-900">
                                    <option>1st Year</option>
                                    <option>2nd Year</option>
                                    <option>3rd Year</option>
                                    <option>4th Year</option>
                                    <option>Graduate</option>
                                  </select>
                                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <button type="button" onClick={prevStep} className="px-8 py-6 bg-slate-100 text-slate-600 font-bold rounded-[2rem] hover:bg-slate-200 transition-all">Back</button>
                            <button 
                              type="button" 
                              onClick={nextStep} 
                              disabled={!formData.college || !formData.degree}
                              className="flex-1 py-6 bg-slate-900 text-white font-black text-xl rounded-[2rem] disabled:opacity-50 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                            >
                              Final Step <ArrowRight className="w-6 h-6" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="space-y-6">
                            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-3">
                              <span className="w-8 h-px bg-indigo-100" /> Final Step: Skills & Interest
                            </h4>
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Skills Known</label>
                                <input name="skills" value={formData.skills} onChange={handleInputChange} type="text" placeholder="e.g. Python, JS, Basic CSS" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Why do you want to join?</label>
                                <textarea name="reason" value={formData.reason} onChange={handleInputChange} rows={4} placeholder="Tell us about your interest..." className="w-full px-6 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all resize-none text-slate-900"></textarea>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                            <input type="checkbox" required className="mt-1 w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">I confirm that the provided information is correct and I am ready to commit to the 8-week project-based learning journey.</p>
                          </div>

                          <div className="flex gap-4">
                            <button type="button" onClick={prevStep} className="px-8 py-6 bg-slate-100 text-slate-600 font-bold rounded-[2rem] hover:bg-slate-200 transition-all">Back</button>
                            <button 
                              disabled={formStatus === "submitting"}
                              className={cn(
                                "flex-1 py-6 text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-3",
                                formStatus === "submitting" ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                              )}
                            >
                              {formStatus === "submitting" ? (
                                <>
                                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  🚀 Submit Application
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
