import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { 
  User, Phone, MessageCircle, Clock, MapPin, CheckCircle2, 
  Wrench, ShieldCheck, LogOut, PlusCircle, FileText, ChevronRight, AlertCircle, Calendar
} from 'lucide-react';
import { ServiceBookingLead } from '../types';

interface CustomerDashboardPageProps {
  onOpenBooking: (serviceSlug?: string) => void;
}

export const CustomerDashboardPage: React.FC<CustomerDashboardPageProps> = ({ onOpenBooking }) => {
  const { currentUser, logoutUser, businessInfo, leads } = useSiteContext();
  const navigate = useNavigate();

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // If user is not logged in or not customer role, redirect to login
  if (!currentUser) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 px-4 text-center flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-200">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-xl font-black text-slate-900 mb-2">Login Required</h2>
          <p className="text-xs text-slate-600 mb-6">
            Kripya apna Ranchi Repair account login karein booking status track karne ke liye.
          </p>
          <Link
            to="/login"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-sm transition-all shadow-md"
          >
            <span>Go to Login Portal</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Filter leads matching current user mobile or fallback to all active leads for demo
  const userLeads: ServiceBookingLead[] = leads.filter(l => 
    l.mobile && currentUser.mobile && l.mobile.includes(currentUser.mobile.slice(-8))
  );

  // Default sample leads if none in context so user sees active status UI
  const displayLeads: ServiceBookingLead[] = userLeads.length > 0 ? userLeads : [
    {
      id: 'RR-L-9842',
      name: currentUser.name,
      mobile: currentUser.mobile,
      whatsapp: currentUser.mobile,
      appliance: 'Split AC (Voltas 1.5 Ton)',
      brand: 'Voltas',
      serviceRequired: 'Cooling Issue & General Service',
      problemDesc: 'AC is not cooling properly and making buzzing noise.',
      city: 'Ranchi',
      locality: currentUser.locality || 'Morabadi',
      pincode: '834008',
      address: 'House #42, Near Oxygen Park, Morabadi, Ranchi',
      preferredDate: 'Today (Immediate)',
      preferredTime: '11:00 AM - 1:00 PM',
      createdAt: new Date().toISOString(),
      status: 'Assigned'
    },
    {
      id: 'RR-L-8910',
      name: currentUser.name,
      mobile: currentUser.mobile,
      whatsapp: currentUser.mobile,
      appliance: 'Washing Machine (LG Front Load)',
      brand: 'LG',
      serviceRequired: 'Spin Cycle Drain Error',
      problemDesc: 'Water not draining during spin cycle.',
      city: 'Ranchi',
      locality: currentUser.locality || 'Morabadi',
      pincode: '834008',
      address: 'House #42, Near Oxygen Park, Morabadi, Ranchi',
      preferredDate: 'Yesterday',
      preferredTime: '3:00 PM',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      status: 'Completed'
    }
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const currentLead = displayLeads.find(l => l.id === selectedLeadId) || displayLeads[0];

  const getStatusSteps = (status: ServiceBookingLead['status']) => {
    const steps = [
      { key: 'New', label: 'Booking Confirmed', desc: 'Request registered' },
      { key: 'Contacted', label: 'Call Verified', desc: 'Agent assigned' },
      { key: 'Assigned', label: 'Technician Assigned', desc: 'On the way to location' },
      { key: 'Completed', label: 'Repair Completed', desc: 'Service finished & invoiced' },
    ];

    let currentStepIndex = 0;
    if (status === 'Contacted') currentStepIndex = 1;
    if (status === 'Assigned') currentStepIndex = 2;
    if (status === 'Completed') currentStepIndex = 3;

    return { steps, currentStepIndex };
  };

  const { steps, currentStepIndex } = getStatusSteps(currentLead.status);

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Profile Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl border-2 border-blue-400/50 object-cover shadow-lg shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-extrabold uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-3 h-3 text-blue-400" /> Verified Customer Account
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
              <p className="text-xs text-slate-300 flex items-center gap-3 mt-1">
                <span>📱 +91 {currentUser.mobile}</span>
                <span>📍 {currentUser.locality || 'Ranchi'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto relative z-10 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/30 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Book New Repair</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-3 bg-red-950/60 hover:bg-red-900 border border-red-800/80 text-red-300 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Col: Active Bookings List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center justify-between">
              <span>Your Repair Bookings</span>
              <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                {displayLeads.length} Total
              </span>
            </h2>

            <div className="space-y-3">
              {displayLeads.map((lead) => {
                const isSelected = lead.id === currentLead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black text-slate-400 uppercase">
                        #{lead.id}
                      </span>
                      <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        lead.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : lead.status === 'Assigned'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {lead.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                      {lead.appliance} Repair
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {lead.serviceRequired}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {lead.locality}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> {lead.preferredDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 2 Cols: Live Repair Status Detail */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Status Tracker Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Live Booking Status Tracker
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-0.5">
                    {currentLead.appliance} Service
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-slate-400">Booking ID</div>
                  <div className="text-sm font-black text-slate-800">#{currentLead.id}</div>
                </div>
              </div>

              {/* Graphical Step Progress */}
              <div className="py-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
                  {steps.map((step, idx) => {
                    const isDone = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    return (
                      <div key={step.key} className="flex flex-col items-center text-center relative z-10">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm mb-2 transition-all ${
                          isDone
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : (idx + 1)}
                        </div>
                        <span className={`text-xs font-extrabold ${isCurrent ? 'text-blue-600' : 'text-slate-700'}`}>
                          {step.label}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                          {step.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technician Info Banner if Assigned or Completed */}
              {(currentLead.status === 'Assigned' || currentLead.status === 'Completed') && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black shrink-0">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-blue-600 uppercase">Assigned Doorstep Technician</div>
                      <h4 className="text-sm font-extrabold text-slate-900">Manoj Kumar (Certified AC &amp; Appliance Expert)</h4>
                      <p className="text-xs text-slate-500">Service Badge #RR-TECH-804 • Ranchi Central Team</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs transition-all shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Tech
                    </a>
                    <a
                      href={`https://wa.me/91${businessInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs transition-all shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* Booking Summary Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Service Requested</span>
                  <span className="font-extrabold text-slate-900">{currentLead.serviceRequired}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Appliance &amp; Brand</span>
                  <span className="font-extrabold text-slate-900">{currentLead.appliance} ({currentLead.brand})</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Locality &amp; Address</span>
                  <span className="font-extrabold text-slate-900">{currentLead.address}, {currentLead.locality}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Preferred Time Slot</span>
                  <span className="font-extrabold text-slate-900">{currentLead.preferredDate} ({currentLead.preferredTime})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => alert(`Official Invoice for Booking #${currentLead.id} has been sent to your mobile via SMS / WhatsApp.`)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all border border-slate-200"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Download Service Invoice</span>
                </button>

                <a
                  href={`tel:${businessInfo.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Need Urgent Help? Call {businessInfo.phone}</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
