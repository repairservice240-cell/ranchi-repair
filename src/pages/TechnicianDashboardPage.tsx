import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { 
  Wrench, Phone, Navigation, CheckCircle2, Clock, 
  MapPin, AlertCircle, LogOut, ShieldCheck, DollarSign, Calendar
} from 'lucide-react';
import { ServiceBookingLead } from '../types';

export const TechnicianDashboardPage: React.FC = () => {
  const { currentUser, logoutUser, businessInfo } = useSiteContext();
  const navigate = useNavigate();

  const [isOnline, setIsOnline] = useState(true);

  // Sample active technician job leads in Ranchi
  const [techJobs, setTechJobs] = useState<ServiceBookingLead[]>([
    {
      id: 'RR-JOB-501',
      name: 'Prakash Sharma',
      mobile: '9835198765',
      whatsapp: '9835198765',
      appliance: 'Split AC (Voltas 1.5 Ton)',
      brand: 'Voltas',
      serviceRequired: 'Gas Charging & Deep Cleaning',
      problemDesc: 'AC blowing warm air, low cooling in bedroom.',
      city: 'Ranchi',
      locality: 'Morabadi',
      pincode: '834008',
      address: 'Plot #18, Near Tagore Hill Road, Morabadi, Ranchi',
      preferredDate: 'Today (Immediate)',
      preferredTime: '11:00 AM - 1:00 PM',
      createdAt: new Date().toISOString(),
      status: 'Assigned'
    },
    {
      id: 'RR-JOB-502',
      name: 'Anjali Kumari',
      mobile: '9431187654',
      whatsapp: '9431187654',
      appliance: 'Washing Machine (LG 7kg Front Load)',
      brand: 'LG',
      serviceRequired: 'Motor Noise & Water Leak',
      problemDesc: 'Water leaking during rinse cycle.',
      city: 'Ranchi',
      locality: 'Lalpur',
      pincode: '834001',
      address: 'Flat 302, Circular Road, Near Nucleus Mall, Lalpur, Ranchi',
      preferredDate: 'Today',
      preferredTime: '2:30 PM',
      createdAt: new Date().toISOString(),
      status: 'Contacted'
    },
    {
      id: 'RR-JOB-498',
      name: 'Dr. R. K. Mahato',
      mobile: '9771012345',
      whatsapp: '9771012345',
      appliance: 'Double Door Refrigerator (Samsung 253L)',
      brand: 'Samsung',
      serviceRequired: 'Defrost Sensor & Compressor Check',
      problemDesc: 'Freezer is working but lower compartment not cooling.',
      city: 'Ranchi',
      locality: 'Kanke Road',
      pincode: '834006',
      address: 'House 14B, Near CIP, Kanke Road, Ranchi',
      preferredDate: 'Yesterday',
      preferredTime: '4:00 PM',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      status: 'Completed'
    }
  ]);

  if (!currentUser) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 px-4 text-center flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-200">
          <AlertCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-xl font-black text-slate-900 mb-2">Technician Portal Login Required</h2>
          <p className="text-xs text-slate-600 mb-6">
            Kripya apna Technician ID aur Security PIN enter karke dashboard access karein.
          </p>
          <Link
            to="/login"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-sm transition-all shadow-md"
          >
            <span>Go to Login Portal</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdateJobStatus = (jobId: string, nextStatus: ServiceBookingLead['status']) => {
    setTechJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: nextStatus } : j));
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const activeJobsCount = techJobs.filter(j => j.status !== 'Completed').length;
  const completedJobsCount = techJobs.filter(j => j.status === 'Completed').length;

  return (
    <div className="bg-slate-900 min-h-screen py-8 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Bar */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 border border-slate-700 shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/30 shrink-0">
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-extrabold uppercase">
                  Verified Service Partner
                </span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold border transition-all ${
                    isOnline
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-700 text-slate-400 border-slate-600'
                  }`}
                >
                  {isOnline ? '🟢 Online (Available for Ranchi Calls)' : '🔴 Offline'}
                </button>
              </div>
              <h1 className="text-xl font-black text-white">{currentUser.name}</h1>
              <p className="text-xs text-slate-400">
                Service Region: {currentUser.locality || 'Ranchi Central & Surrounding Areas'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-red-950/60 hover:bg-red-900 border border-red-800/80 text-red-300 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Assigned Active Jobs</div>
            <div className="text-2xl font-black text-emerald-400">{activeJobsCount} Jobs</div>
            <div className="text-[11px] text-slate-400 mt-1">Pending doorstep visits in Ranchi</div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Completed Today</div>
            <div className="text-2xl font-black text-blue-400">{completedJobsCount} Jobs</div>
            <div className="text-[11px] text-slate-400 mt-1">Customer verified &amp; closed</div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Estimated Daily Payout</div>
            <div className="text-2xl font-black text-amber-400">₹ 2,450</div>
            <div className="text-[11px] text-slate-400 mt-1">Visiting charge + repair labor split</div>
          </div>
        </div>

        {/* Jobs List Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <span>Today&apos;s Doorstep Service Jobs in Ranchi</span>
          </h2>

          <div className="space-y-4">
            {techJobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-800/90 border border-slate-700/90 rounded-3xl p-6 shadow-xl space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/80">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
                      #{job.id}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      📍 {job.locality}, Ranchi
                    </span>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                    job.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    Status: {job.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-base font-extrabold text-white mb-1">
                      {job.appliance} Repair
                    </h3>
                    <p className="text-xs text-amber-300 font-semibold mb-2">
                      Issue: {job.problemDesc}
                    </p>
                    <div className="text-xs text-slate-300 space-y-1">
                      <p><strong className="text-white">Customer:</strong> {job.name}</p>
                      <p><strong className="text-white">Phone:</strong> +91 {job.mobile}</p>
                      <p><strong className="text-white">Address:</strong> {job.address}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col justify-between space-y-3">
                    <div className="text-xs text-slate-300 space-y-1">
                      <p><strong className="text-slate-400">Service Slot:</strong> {job.preferredDate} ({job.preferredTime})</p>
                      <p><strong className="text-slate-400">Expected Charge:</strong> ₹ 299 Visiting + Parts extra</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                        href={`tel:${job.mobile}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call Customer
                      </a>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(job.address + ', Ranchi')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md"
                      >
                        <Navigation className="w-3.5 h-3.5" /> GPS Location
                      </a>
                    </div>
                  </div>
                </div>

                {/* Job Action Buttons */}
                <div className="pt-3 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 font-medium">Update Job Progress:</span>
                  <div className="flex flex-wrap gap-2">
                    {job.status !== 'Assigned' && (
                      <button
                        onClick={() => handleUpdateJobStatus(job.id, 'Assigned')}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-200 rounded-xl"
                      >
                        Mark Assigned
                      </button>
                    )}
                    {job.status !== 'Contacted' && (
                      <button
                        onClick={() => handleUpdateJobStatus(job.id, 'Contacted')}
                        className="px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600 text-xs font-extrabold text-blue-200 border border-blue-500/40 rounded-xl"
                      >
                        On The Way
                      </button>
                    )}
                    {job.status !== 'Completed' && (
                      <button
                        onClick={() => handleUpdateJobStatus(job.id, 'Completed')}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-xs font-black text-white rounded-xl shadow-md flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Mark Job Completed &amp; Paid
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
