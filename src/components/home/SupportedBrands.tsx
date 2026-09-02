import React from 'react';
import { useSiteContext } from '../../context/SiteContext';

interface SupportedBrandsProps {
  title?: string;
  showDisclaimer?: boolean;
}

export const SupportedBrands: React.FC<SupportedBrandsProps> = ({
  title = 'Brands We Service',
  showDisclaimer = true,
}) => {
  const { supportedBrands } = useSiteContext();

  const brands = supportedBrands.length > 0 ? supportedBrands : [
    'Samsung', 'LG', 'Whirlpool', 'Bosch', 'Daikin', 'Haier',
    'Godrej', 'Panasonic', 'Voltas', 'Blue Star', 'Carrier',
    'Hitachi', 'IFB', 'Lloyd', 'V-Guard', 'Bajaj', 'Havells', 'Crompton',
  ];

  // Duplicate for seamless loop
  const row1 = [...brands, ...brands];
  const row2 = [...[...brands].reverse(), ...[...brands].reverse()];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          {showDisclaimer && (
            <p className="text-xs italic text-slate-400 mt-1">
              * We are an independent service provider and not affiliated with or authorized by any of the brands listed below.
            </p>
          )}
        </div>

        {/* Row 1 — left to right */}
        <div className="relative overflow-hidden mb-4">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex w-max gap-4 brand-marquee-ltr">
            {row1.map((brand, i) => (
              <div
                key={`r1-${brand}-${i}`}
                className="shrink-0 h-16 px-6 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex w-max gap-4 brand-marquee-rtl">
            {row2.map((brand, i) => (
              <div
                key={`r2-${brand}-${i}`}
                className="shrink-0 h-16 px-6 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
