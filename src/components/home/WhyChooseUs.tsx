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
    <section id="why-us" className="py-16 md:py-24 bg-blue-50/50 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 text-orange-600 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-orange-500" />
            <span>Why Ranchi Trusts Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Why Choose Us</h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto font-medium">Quality you can trust, service you can depend on</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-white border border-slate-200/80 hover:border-blue-500 p-6 sm:p-7 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex gap-5 hover:-translate-y-0.5"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                  {f.icon}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
