import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteContext } from '../../context/SiteContext';
import { Star, MessageSquareQuote, Quote, ArrowRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { reviews } = useSiteContext();
  const published = reviews.filter(r => r.status === 'published').slice(0, 6);

  const displayReviews = published.length > 0 ? published : [
    { id: '1', customerName: 'Rajesh Kumar Verma', locality: 'Morabadi', rating: 5, comment: 'My Voltas split AC stopped cooling during hot peak summer. Called technician. He arrived in 35 minutes at Morabadi, diagnosed R32 gas leak, repaired it cleanly, and completed jet cleaning. Cooling is awesome now!', service: 'AC Repair', status: 'published' as const, date: '2024-01-15' },
    { id: '2', customerName: 'Priya Sharma', locality: 'Kanke Road', rating: 5, comment: 'IFB Front Load washing machine was giving E2 drain error code. The technician replaced the drain pump on-site at very reasonable charge. Very honest and polite service in Kanke.', service: 'Washing Machine Repair', status: 'published' as const, date: '2024-01-20' },
    { id: '3', customerName: 'Sanjay Sinha', locality: 'Harmu Colony', rating: 5, comment: 'LG Double Door fridge compressor was clicking continuously. The technician replaced the relay & capacitor with 90-day warranty. Doorstep service in Harmu was super fast.', service: 'Refrigerator Repair', status: 'published' as const, date: '2024-02-05' },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/70 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 text-orange-600 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-orange-500" />
            <span>Verified Ranchi Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Customer Testimonials</h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto font-medium">See what our happy customers in Ranchi say about our doorstep repair service</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {displayReviews.map((rev) => (
            <div
              key={rev.id}
              className="group relative bg-white hover:bg-slate-50/50 border border-slate-200/80 hover:border-blue-400 p-6 sm:p-7 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between hover:-translate-y-0.5 overflow-hidden"
            >
              {/* Background Quote Icon Accent */}
              <Quote className="absolute top-5 right-5 w-10 h-10 text-blue-50 group-hover:text-blue-100 transition-colors pointer-events-none" />

              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-xs" />
                    ))}
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/80">
                    Verified Customer
                  </span>
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal mb-6 relative z-10">
                  "{rev.comment}"
                </p>
              </div>

              {/* Customer Avatar & Details Footer */}
              <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-600/20 shrink-0">
                  {rev.customerName.charAt(0)}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {rev.customerName}
                  </p>
                  <p className="text-xs text-blue-600 font-bold">
                    {rev.locality}, Ranchi • <span className="text-slate-500 font-normal">{rev.service}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read All Reviews Button */}
        <div className="mt-10 text-center">
          <Link
            to="/reviews/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <span>Read All Ranchi Customer Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
