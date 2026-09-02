import React from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { ArrowRight, Shield, Home, Clock, IndianRupee, ThumbsUp, Calendar } from 'lucide-react';

// Poster images for each service
const servicePhotos: Record<string, string> = {
  'ac-repair':              '/images/ac-repair-technician.jpg',
  'washing-machine-repair': '/images/washing-machine-repair-technician.jpg',
  'refrigerator-repair':    '/images/refrigerator-repair-technician.jpg',
  'microwave-repair':       '/images/microwave-repair-technician.jpg',
  'geyser-repair':          '/images/geyser-repair-technician.jpg',
};

interface ServiceCardsProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

const trustBadges = [
  { icon: Shield,       title: 'Expert Technicians',     sub: 'Trained & Verified'    },
  { icon: Home,         title: 'Doorstep Service',       sub: 'At Your Convenience'  },
  { icon: Clock,        title: 'Quick Response',         sub: 'Same Day Service'     },
  { icon: IndianRupee,  title: 'Transparent Pricing',    sub: 'No Hidden Charges'    },
  { icon: ThumbsUp,     title: 'Satisfaction Guarantee', sub: 'Quality Assured'      },
];

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onOpenBooking }) => {
  const { services } = useSiteContext();

  return (
    <section id="services" className="py-16 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Our Services</h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto font-medium">
            Expert AC, refrigerator, washing machine, microwave &amp; geyser repair services across Ranchi.
          </p>
        </div>

        {/* Service Cards Grid - 3 max columns for larger poster display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const photoSrc = servicePhotos[service.id] || service.heroImage;

            return (
              <div
                key={service.id}
                className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:border-blue-600 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Full Un-cropped Poster Image Display */}
                <div className="relative w-full bg-slate-900 overflow-hidden">
                  <img
                    src={photoSrc}
                    alt={`${service.name} Service in Ranchi`}
                    className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Vibrant Glowing Pulsing Blue Price Badge Overlay */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-black text-[12px] px-3.5 py-1.5 rounded-full shadow-lg shadow-blue-600/40 border border-blue-300/40 animate-pulse flex items-center gap-1.5 z-10">
                    <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping shrink-0" />
                    <span>Starting ₹{service.startingPrice}</span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-700 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Starting ₹{service.startingPrice}</span>
                    </div>
                  </div>

                  {/* Glowing Book Now Button */}
                  <button
                    onClick={() => onOpenBooking(service.slug)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/35 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all shrink-0 active:scale-95 border border-blue-400/30 group/btn relative overflow-hidden"
                    id={`service-card-book-${service.id}`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-white group-hover/btn:scale-110 transition-transform" />
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {trustBadges.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="group flex flex-col items-center text-center gap-2 py-5 px-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm cursor-pointer hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-full bg-blue-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 group-hover:text-white transition-colors duration-300">{title}</p>
                <p className="text-[11px] text-slate-500 group-hover:text-blue-50 font-medium transition-colors duration-300">{sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
