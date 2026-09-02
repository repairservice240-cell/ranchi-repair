import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useSeo } from '../hooks/useSeo';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';
import { BookOpen, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogPageProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

// Single article view — always receives currentPost so hooks are unconditional
const BlogPostView: React.FC<{ currentPost: BlogPost; onOpenBooking: (s?: string) => void }> = ({ currentPost, onOpenBooking }) => {
  const { businessInfo } = useSiteContext();

  useSeo({
    title: `${currentPost.title} | ${businessInfo.companyName}`,
    description: currentPost.excerpt,
    canonicalPath: `/blog/${currentPost.slug}/`
  });

  const breadcrumbs = [
    { name: 'Blog & Tips', url: '/blog/' },
    { name: currentPost.title, url: `/blog/${currentPost.slug}/` }
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <article className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={breadcrumbSchema} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
          <div className="space-y-3">
            <span className="px-3 py-1 bg-brand-100 text-brand-700 font-bold text-xs rounded-full">
              {currentPost.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              {currentPost.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-4">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {currentPost.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {currentPost.publishDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {currentPost.readTime}
              </span>
            </div>
          </div>

          <div
            className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: currentPost.content }}
          />

          <div className="mt-8 p-6 bg-brand-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-base">Facing Appliance Issues in Ranchi?</div>
              <div className="text-xs text-slate-300">Book certified doorstep technician visit within 30 minutes.</div>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-blue-600/25 shrink-0"
            >
              Book Doorstep Repair
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

// Blog listing view
const BlogListView: React.FC<{ onOpenBooking: (s?: string) => void }> = ({ onOpenBooking }) => {
  const { blogPosts, businessInfo } = useSiteContext();
  const publishedBlogs = blogPosts.filter(b => b.status === 'published');

  useSeo({
    title: `Appliance Maintenance Tips & Guides | ${businessInfo.companyName} Ranchi`,
    description: `Read local appliance servicing guides, AC cooling tips, washing machine troubleshooting, and fridge maintenance advice for Ranchi homes.`,
    canonicalPath: '/blog/'
  });

  const breadcrumbs = [{ name: 'Blog & Maintenance Tips', url: '/blog/' }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <JsonLdSchema schema={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Ranchi Appliance Care Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Appliance Repair Guides & Tips
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Expert maintenance advice to keep your home appliances running efficiently in Ranchi climate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedBlogs.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-brand-50 text-brand-700 rounded-full inline-block mb-3">
                  {post.category}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 hover:text-brand-600 transition-colors mb-3">
                  <Link to={`/blog/${post.slug}/`}>{post.title}</Link>
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">{post.publishDate} • {post.readTime}</span>
                <Link to={`/blog/${post.slug}/`} className="font-bold text-brand-600 flex items-center gap-1 hover:underline">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main router — chooses between article view and listing view
export const BlogPage: React.FC<BlogPageProps> = ({ onOpenBooking }) => {
  const { blogSlug } = useParams<{ blogSlug?: string }>();
  const { blogPosts } = useSiteContext();

  const publishedBlogs = blogPosts.filter(b => b.status === 'published');
  const currentPost = blogSlug ? publishedBlogs.find(b => b.slug === blogSlug) : undefined;

  if (blogSlug && currentPost) {
    return <BlogPostView currentPost={currentPost} onOpenBooking={onOpenBooking} />;
  }

  return <BlogListView onOpenBooking={onOpenBooking} />;
};
