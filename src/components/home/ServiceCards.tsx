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
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">OUR SERVICES</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Repair Services We Offer</h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Expert AC, refrigerator, washing machine, microwave &amp; geyser repair services across Ranchi.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const photoSrc = servicePhotos[service.id] || service.heroImage;

            return (
              <div
                key={service.id}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Service Poster Image */}
                <div className="relative w-full bg-gray-100 overflow-hidden">
                  <img
                    src={photoSrc}
                    alt={`${service.name} Service in Ranchi`}
                    className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-blue-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 z-10">
                    <span>Starting ₹{service.startingPrice}</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span>Starting ₹{service.startingPrice}</span>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <button
                    onClick={() => onOpenBooking(service.slug)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg shadow-md hover:-translate-y-0.5 transition-all shrink-0 active:scale-95 animate-pulse"
                    id={`service-card-book-${service.id}`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-white" />
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {trustBadges.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="group flex flex-col items-center text-center gap-2 py-5 px-3 bg-white rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-full bg-blue-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 group-hover:text-white transition-colors duration-300">{title}</p>
                <p className="text-[11px] text-slate-500 group-hover:text-blue-100 font-medium transition-colors duration-300">{sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
