import React, { useState } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { runTechnicalSeoAudit, AuditCheckItem } from '../utils/seoAudit';
import { RanchiLocality, ApplianceService, CustomerReview, ServiceBookingLead, EventLog } from '../types';
import { Settings, MapPin, Wrench, Users, MessageSquare, BarChart3, FileText, CheckCircle2, AlertTriangle, XCircle, ClipboardList } from 'lucide-react';

type AdminTab = 'business' | 'seo' | 'localities' | 'services' | 'reviews' | 'brands' | 'faqs' | 'leads' | 'audit';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('business');
  const { 
    businessInfo, updateBusinessInfo, 
    socialLinks, updateSocialLinks, 
    analyticsConfig, updateAnalyticsConfig,
    supportedBrands, setSupportedBrands,
    services, updateService,
    localities, toggleLocalityStatus, updateLocality, addLocality,
    reviews, addReview, updateReviewStatus,
    faqs, addFaq,
    leads, updateLeadStatus,
    events,
    resetToDefaults
  } = useSiteContext();

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: 'business', label: 'Business Info', icon: <Settings className="w-4 h-4" /> },
    { key: 'seo', label: 'SEO & Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'localities', label: 'Ranchi Localities', icon: <MapPin className="w-4 h-4" /> },
    { key: 'services', label: 'Services', icon: <Wrench className="w-4 h-4" /> },
    { key: 'brands', label: 'Brands', icon: <ClipboardList className="w-4 h-4" /> },
    { key: 'reviews', label: 'Reviews', icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'leads', label: 'Booking Leads', icon: <Users className="w-4 h-4" /> },
    { key: 'audit', label: 'SEO Audit', icon: <FileText className="w-4 h-4" /> },
  ];

  const auditResults = runTechnicalSeoAudit(businessInfo, services, localities);
  const passedCount = auditResults.filter(r => r.status === 'passed').length;
  const failedCount = auditResults.filter(r => r.status === 'failed').length;

  const inputClass = "w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all";

  return (
    <div className="bg-slate-100 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
              Admin Panel / Site Configuration
            </div>
            <h1 className="text-xl font-black text-white">{businessInfo.companyName} — Ranchi Repair Website Manager</h1>
            <p className="text-xs text-slate-400 mt-1">All changes are saved instantly and automatically propagate across the entire website.</p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all settings to default placeholders? This cannot be undone.')) {
                resetToDefaults();
              }
            }}
            className="px-4 py-2 bg-red-900/50 hover:bg-red-800 border border-red-800 text-red-300 font-bold text-xs rounded-xl transition-colors shrink-0"
          >
            Reset to Defaults
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === tab.key
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Business Info */}
        {activeTab === 'business' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900 mb-5">Business Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Company Name', key: 'companyName', type: 'text' },
                  { label: 'Tagline', key: 'tagline', type: 'text' },
                  { label: 'Phone Number', key: 'phone', type: 'tel' },
                  { label: 'WhatsApp Number', key: 'whatsapp', type: 'tel' },
                  { label: 'Email Address', key: 'email', type: 'email' },
                  { label: 'Year Established', key: 'yearEstablished', type: 'text' },
                  { label: 'Website Domain', key: 'domain', type: 'text' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      value={(businessInfo as any)[field.key]}
                      onChange={(e) => updateBusinessInfo({ [field.key]: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                ))}
                
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">City (Locked)</label>
                  <input type="text" value="Ranchi" disabled className="w-full px-3 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-sm font-bold text-slate-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">State (Locked)</label>
                  <input type="text" value="Jharkhand" disabled className="w-full px-3 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-sm font-bold text-slate-500 cursor-not-allowed" />
                </div>

                {[
                  { label: 'Office Address', key: 'officeAddress' },
                  { label: 'Area / Locality', key: 'area' },
                  { label: 'PIN Code', key: 'pincode' },
                  { label: 'Latitude', key: 'latitude' },
                  { label: 'Longitude', key: 'longitude' },
                  { label: 'Business Hours', key: 'businessHours' },
                  { label: 'Google Maps URL', key: 'googleMapsUrl' },
                  { label: 'Google Business Profile URL', key: 'googleBusinessProfileUrl' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">{field.label}</label>
                    <input
                      type="text"
                      value={(businessInfo as any)[field.key]}
                      onChange={(e) => updateBusinessInfo({ [field.key]: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900 mb-5">Social Media Profiles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Facebook URL', key: 'facebook' },
                  { label: 'Instagram URL', key: 'instagram' },
                  { label: 'YouTube URL', key: 'youtube' },
                  { label: 'LinkedIn URL', key: 'linkedin' },
                  { label: 'Other Social URL', key: 'other' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">{field.label}</label>
                    <input
                      type="url"
                      value={(socialLinks as any)[field.key]}
                      onChange={(e) => updateSocialLinks({ [field.key]: e.target.value })}
                      placeholder="https://"
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: SEO & Analytics */}
        {activeTab === 'seo' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">SEO & Analytics Configuration</h2>
            <p className="text-xs text-slate-500">Paste these IDs to activate Google Analytics, Tag Manager, Search Console, and Meta Pixel event tracking.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Google Tag Manager ID (GTM-XXXXXX)', key: 'gtmId' },
                { label: 'Google Analytics 4 Measurement ID (G-XXXXXXX)', key: 'ga4Id' },
                { label: 'Meta Pixel ID', key: 'metaPixelId' },
                { label: 'Google Search Console Verification Meta Content', key: 'googleSearchConsoleMeta' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">{field.label}</label>
                  <input
                    type="text"
                    value={(analyticsConfig as any)[field.key]}
                    onChange={(e) => updateAnalyticsConfig({ [field.key]: e.target.value })}
                    placeholder="Enter ID..."
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              <strong>Tip:</strong> GTM ID tracking fires events for: <code>call_click</code>, <code>whatsapp_click</code>, <code>form_submit</code>, <code>book_service_click</code>, <code>service_page_view</code>, <code>locality_page_view</code>.
            </div>
          </div>
        )}

        {/* Tab: Ranchi Localities */}
        {activeTab === 'localities' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900 mb-2">Ranchi Locality Pages (Draft → Publish Manager)</h2>
              <p className="text-xs text-slate-500 mb-5">
                Only <strong>Published</strong> localities appear in sitemap, footer, and service area pages. Draft localities return 404 to prevent thin content indexing.
              </p>

              <div className="space-y-3">
                {localities.map((loc) => (
                  <div key={loc.id} className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    loc.status === 'published' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">{loc.name}</div>
                      <div className="text-xs text-slate-500">/{loc.slug}/ | PIN: {loc.pincode}</div>
                      <p className="text-xs text-slate-600 mt-1 max-w-md line-clamp-1">{loc.description}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        loc.status === 'published' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {loc.status === 'published' ? '✓ Published' : '⏸ Draft'}
                      </span>
                      <button
                        onClick={() => toggleLocalityStatus(loc.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                          loc.status === 'published'
                            ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                            : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                        }`}
                      >
                        {loc.status === 'published' ? 'Move to Draft' : 'Publish Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Locality Form */}
            <NewLocalityForm onAdd={(data) => addLocality(data)} />
          </div>
        )}

        {/* Tab: Services */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-extrabold text-lg text-slate-900 mb-4 border-b border-slate-100 pb-3">{service.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'SEO Title', key: 'seoTitle' },
                    { label: 'Meta Description', key: 'metaDescription' },
                    { label: 'Short Description', key: 'shortDesc' },
                  ].map(field => (
                    <div key={field.key} className={field.key === 'shortDesc' ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">{field.label}</label>
                      <input
                        type="text"
                        value={(service as any)[field.key]}
                        onChange={(e) => updateService(service.id, { [field.key]: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Starting Price (₹)</label>
                    <input
                      type="number"
                      value={service.startingPrice}
                      onChange={(e) => updateService(service.id, { startingPrice: Number(e.target.value) })}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Supported Brands */}
        {activeTab === 'brands' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Supported Appliance Brands</h2>
            <p className="text-xs text-slate-500">These brands appear across all service pages and booking forms. Only list brands you genuinely service.</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {supportedBrands.map((brand) => (
                <div key={brand} className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl">
                  <span className="text-xs font-bold text-slate-800">{brand}</span>
                  <button
                    onClick={() => setSupportedBrands(supportedBrands.filter(b => b !== brand))}
                    className="text-slate-400 hover:text-red-500 transition-colors font-bold text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <AddBrandInput onAdd={(brand) => {
              if (!supportedBrands.includes(brand)) {
                setSupportedBrands([...supportedBrands, brand]);
              }
            }} />
          </div>
        )}

        {/* Tab: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">Customer Reviews</h2>
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                ⚠️ Only enter genuine, verified customer reviews. Do NOT add fake or fabricated reviews. Fake reviews violate Google guidelines.
              </p>
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{rev.customerName} — {rev.locality}, Ranchi</div>
                      <div className="text-xs text-slate-500 mt-1">{rev.comment.slice(0, 80)}...</div>
                      <div className="text-[11px] font-bold text-brand-600 mt-1">{rev.service}</div>
                    </div>
                    <button
                      onClick={() => updateReviewStatus(rev.id, rev.status === 'published' ? 'draft' : 'published')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${
                        rev.status === 'published' 
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      {rev.status === 'published' ? '✓ Published' : '⏸ Draft'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Booking Leads */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900 mb-4">Service Booking Leads ({leads.length})</h2>
            {leads.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No booking leads yet. Submissions from the booking form will appear here.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="pb-2 pr-4">Name & Mobile</th>
                      <th className="pb-2 pr-4">Appliance</th>
                      <th className="pb-2 pr-4">Ranchi Locality</th>
                      <th className="pb-2 pr-4">Date Requested</th>
                      <th className="pb-2 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="py-2">
                        <td className="py-2.5 pr-4">
                          <div className="font-bold text-slate-900">{lead.name}</div>
                          <div className="text-slate-400">{lead.mobile}</div>
                        </td>
                        <td className="py-2.5 pr-4">{lead.appliance} / {lead.brand}</td>
                        <td className="py-2.5 pr-4">{lead.locality}</td>
                        <td className="py-2.5 pr-4">{lead.preferredDate}</td>
                        <td className="py-2.5 pr-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className="px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab: SEO Audit */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                <div className="text-3xl font-black text-emerald-700">{passedCount}</div>
                <div className="text-xs font-bold text-emerald-600 uppercase mt-1">Checks Passed</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <div className="text-3xl font-black text-red-700">{failedCount}</div>
                <div className="text-xs font-bold text-red-600 uppercase mt-1">Checks Failed</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                <div className="text-3xl font-black text-slate-700">{auditResults.length}</div>
                <div className="text-xs font-bold text-slate-500 uppercase mt-1">Total Checks</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900">Technical SEO Compliance Audit Results</h2>
              {auditResults.map((check) => (
                <div key={check.id} className={`p-4 rounded-xl border ${
                  check.status === 'passed' ? 'border-emerald-200 bg-emerald-50'
                  : check.status === 'warning' ? 'border-amber-200 bg-amber-50'
                  : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {check.status === 'passed' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {check.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                      {check.status === 'failed' && <XCircle className="w-4 h-4 text-red-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">{check.title}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          check.category === 'Local SEO' ? 'bg-brand-100 text-brand-700' :
                          check.category === 'Technical SEO' ? 'bg-purple-100 text-purple-700' :
                          check.category === 'Architecture' ? 'bg-cyan-100 text-cyan-700' :
                          check.category === 'Mobile & UX' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {check.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{check.description}</p>
                      {check.recommendation && (
                        <p className="text-xs text-amber-800 mt-1 font-semibold">{check.recommendation}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Event Tracking Logs */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">Recent Conversion Events Log ({events.length})</h2>
              {events.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No events tracked yet. Events fire on Call, WhatsApp, and Booking form interactions.</p>
              ) : (
                <div className="space-y-2">
                  {events.slice(0, 15).map((evt) => (
                    <div key={evt.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-brand-600">{evt.eventType}</span>
                        <span className="text-slate-500 ml-2">{evt.label}</span>
                      </div>
                      <span className="text-slate-400 font-mono">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// Helpers
const NewLocalityForm: React.FC<{ onAdd: (l: any) => void }> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [pincode, setPincode] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="bg-white rounded-2xl p-6 border border-dashed border-brand-400 shadow-sm">
      <h3 className="text-base font-extrabold text-slate-900 mb-4">+ Add New Ranchi Locality</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Locality Name</label>
          <input type="text" value={name} onChange={e => { setName(e.target.value); setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')); }} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all" placeholder="e.g. Ratu Road" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">URL Slug (auto-generated)</label>
          <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all" placeholder="e.g. ratu-road" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">PIN Code</label>
          <input type="text" maxLength={6} value={pincode} onChange={e => setPincode(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all" placeholder="e.g. 834001" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Description</label>
          <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all" placeholder="Brief locality description" />
        </div>
      </div>
      <button
        onClick={() => {
          if (!name || !slug || !pincode) return;
          onAdd({ name, slug, pincode, description: desc || `Doorstep appliance repair in ${name}, Ranchi.`, landmarks: [], status: 'draft', seoTitle: `Appliance Repair in ${name}, Ranchi`, metaDescription: `Doorstep repair in ${name}, Ranchi.`, isIndexable: false, id: slug });
          setName(''); setSlug(''); setPincode(''); setDesc('');
        }}
        className="mt-4 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl transition-colors"
      >
        Add as Draft (Review & Publish Manually)
      </button>
    </div>
  );
};

const AddBrandInput: React.FC<{ onAdd: (brand: string) => void }> = ({ onAdd }) => {
  const [value, setValue] = useState('');
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add brand name..."
        className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 transition-all"
        onKeyDown={e => { if (e.key === 'Enter' && value.trim()) { onAdd(value.trim()); setValue(''); } }}
      />
      <button
        onClick={() => { if (value.trim()) { onAdd(value.trim()); setValue(''); } }}
        className="px-4 py-2.5 bg-brand-600 text-white font-bold text-xs rounded-xl hover:bg-brand-700 transition-colors"
      >
        Add Brand
      </button>
    </div>
  );
};
