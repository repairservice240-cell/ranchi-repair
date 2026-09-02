import React from 'react';
import { Shield, Clock, Package, Star, Award } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: 'Verified Technicians',
    desc: 'All our technicians are experienced and background-verified for your safety and peace of mind.',
  },
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: 'Same-Day Service',
    desc: 'Emergency repairs available with quick 30-minute response times across all of Ranchi.',
  },
  {
    icon: <Package className="w-6 h-6 text-white" />,
    title: 'Genuine Spare Parts',
    desc: 'We only use original and genuine spare parts for all repairs with 90-day parts warranty.',
  },
  {
    icon: <Star className="w-6 h-6 text-white" />,
    title: 'No Hidden Charges',
    desc: 'Transparent pricing with detailed quotation before starting any work. Pay only what is agreed.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden shadow-2xl border-y border-blue-900/40">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>Why Ranchi Trusts Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">Why Choose Us</h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto font-medium">Quality you can trust, service you can depend on</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-blue-500/60 p-6 sm:p-7 rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-600/15 flex gap-5 hover:-translate-y-1 backdrop-blur-md"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
                  {f.icon}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white mb-1 group-hover:text-blue-300 transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
