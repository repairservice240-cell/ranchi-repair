import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const allItems = [{ name: 'Home', url: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-slate-100/80 rounded-xl mb-6 text-xs text-slate-600 font-medium">
      <ol className="flex items-center flex-wrap gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content={String(index + 1)} />
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              
              {isLast ? (
                <span className="text-slate-900 font-bold tracking-tight truncate max-w-[200px] sm:max-w-none" itemProp="name">
                  {item.name}
                </span>
              ) : (
                <Link to={item.url} className="hover:text-brand-600 flex items-center gap-1 transition-colors" itemProp="item">
                  {index === 0 && <Home className="w-3.5 h-3.5 text-slate-500" />}
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
