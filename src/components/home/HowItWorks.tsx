import React from 'react';
import { ChevronRight, PhoneCall, UserCheck, Wrench, CreditCard } from 'lucide-react';

const steps = [
  { step: 1, icon: PhoneCall, title: 'Book Service', desc: 'Call, WhatsApp, or book online in minutes' },
  { step: 2, icon: UserCheck, title: 'Technician Visit', desc: 'Expert arrives at your preferred time' },
  { step: 3, icon: Wrench, title: 'Professional Repair', desc: 'Quick diagnosis and efficient fixing' },
  { step: 4, icon: CreditCard, title: 'Easy Payment', desc: 'Hassle-free payment with service guarantee' },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">How It Works</h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto font-medium">Fast, reliable doorstep appliance repair across Ranchi</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative group">
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center transition-all duration-300 h-full flex flex-col items-center justify-between shadow-sm hover:shadow-md hover:border-blue-500 hover:-translate-y-0.5">
                  {/* Step Icon Badge */}
                  <div className="relative mb-5">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white rounded-full font-extrabold text-xs flex items-center justify-center shadow-sm">
                      {s.step}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="font-extrabold text-slate-900 mb-2 text-base group-hover:text-blue-600 transition-colors">{s.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{s.desc}</p>
                  </div>
                </div>

                {/* Arrow Connector */}
                {i < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-3.5 z-10 text-slate-300 group-hover:text-blue-600 transition-colors">
                    <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
