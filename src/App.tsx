/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/Navbar";
import { SplineSceneBasic } from "./components/SplineDemo";
import { LandingAccordionItem } from "./components/ui/interactive-image-accordion";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { PricingSection } from "./components/PricingSection";
import { ClientsSectionDemo } from "./components/ClientsSectionDemo";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100">
      <Navbar />
      
      {/* Hero Section - Clean Light Background */}
      <section className="w-full bg-slate-50 pt-20">
        <div className="w-full max-w-7xl mx-auto">
          <SplineSceneBasic />
        </div>
      </section>

      {/* Trusted By Section (Social Proof) */}
      <section className="w-full py-16 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-mono font-bold tracking-[0.3em] text-slate-400 uppercase mb-10">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {["Google", "Microsoft", "Amazon", "Netflix", "Meta"].map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Interactive Accordion Section */}
      <LandingAccordionItem />

      {/* Project Showcase Section */}
      <ProjectShowcase />

      {/* Pricing Section with Scroll Animation */}
      <PricingSection />

      {/* Testimonials Section */}
      <ClientsSectionDemo />

      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer Section */}
      <footer className="w-full py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <span className="text-slate-900 font-bold text-xl tracking-tight">Tech Agency</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs text-center md:text-left leading-relaxed">
              Building the future of digital experiences with precision and passion.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold text-emerald-500/80 uppercase tracking-widest">All Systems Operational</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Tech Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-xs">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-xs">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-xs">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
