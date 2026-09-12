import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { 
  User, Wrench, ShieldCheck, Phone, Lock, ArrowRight, 
  CheckCircle2, KeyRound, Smartphone, Sparkles, AlertCircle, HelpCircle
} from 'lucide-react';

type RoleTab = 'customer' | 'technician' | 'admin';

export const LoginPage: React.FC = () => {
  const { businessInfo, loginUser, trackEvent } = useSiteContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<RoleTab>('customer');
  
  // Customer Form state
  const [customerMobile, setCustomerMobile] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [customerName, setCustomerName] = useState('');
  
  // Technician Form State
  const [techId, setTechId] = useState('');
  const [techPin, setTechPin] = useState('');
  
  // Admin Form State
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  
  // Feedback / Error
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Handle Customer Submit - Step 1: Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleaned = customerMobile.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setErrorMsg('Kripya valid 10-digit mobile number enter karein.');
      return;
    }
    setOtpStep(true);
    setSuccessToast(`OTP sent successfully to +91 ${cleaned}! (Demo OTP: 123456)`);
    trackEvent('form_start', 'Customer Login OTP Request');
  };

  // Handle Customer OTP Verify
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMsg('Kripya 6-digit OTP enter karein.');
      return;
    }
    
    // Perform login
    loginUser({
      id: `cust-${Date.now()}`,
      name: customerName.trim() || `Customer (${customerMobile.slice(-4)})`,
      mobile: customerMobile,
      role: 'customer',
      locality: 'Ranchi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });

    trackEvent('form_submit', 'Customer Login Success');
    navigate('/dashboard');
  };

  // Handle Technician Login
  const handleTechLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!techId || !techPin) {
      setErrorMsg('Tech ID/Mobile and Security PIN are required.');
      return;
    }

    loginUser({
      id: techId || 'TECH-804',
      name: 'Rajesh Kumar (Senior Technician)',
      mobile: '9835100000',
      role: 'technician',
      locality: 'Lalpur & Main Road, Ranchi',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    });

    trackEvent('form_submit', 'Technician Login Success');
    navigate('/technician');
  };

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!adminUser || !adminPass) {
      setErrorMsg('Username and Password enter karein.');
      return;
    }

    loginUser({
      id: 'admin-1',
      name: 'Ranchi Repair Admin',
      mobile: businessInfo.phone,
      email: businessInfo.email || 'admin@ranchirepair.com',
      role: 'admin'
    });

    trackEvent('form_submit', 'Admin Login Success');
    navigate('/admin');
  };

  // Quick Demo Logins
  const handleQuickDemo = (role: RoleTab) => {
    setErrorMsg('');
    if (role === 'customer') {
      loginUser({
        id: 'cust-demo-101',
        name: 'Amit Sharma',
        mobile: '9835123456',
        role: 'customer',
        locality: 'Morabadi, Ranchi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      });
      navigate('/dashboard');
    } else if (role === 'technician') {
      loginUser({
        id: 'tech-804',
        name: 'Suresh Verma (Certified Technician)',
        mobile: '9431198765',
        role: 'technician',
        locality: 'Kanke Road & Harmu, Ranchi',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
      });
      navigate('/technician');
    } else {
      loginUser({
        id: 'admin-super',
        name: 'Super Admin',
        mobile: businessInfo.phone,
        email: 'admin@ranchirepair.com',
        role: 'admin'
      });
      navigate('/admin');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen py-12 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden">
      
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Header Logo & Title */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/40 border border-blue-400/40 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-black text-2xl">R</span>
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              {businessInfo.companyName}
            </span>
          </Link>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            Portal Access &amp; Login
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Doorstep Appliance Repair Services in Ranchi, Jharkhand
          </p>
        </div>

        {/* Tab Role Switcher */}
        <div className="bg-slate-800/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/60 shadow-xl mb-6 flex gap-1">
          <button
            onClick={() => { setActiveTab('customer'); setErrorMsg(''); setOtpStep(false); }}
            className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'customer'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Customer</span>
          </button>

          <button
            onClick={() => { setActiveTab('technician'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'technician'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Technician</span>
          </button>

          <button
            onClick={() => { setActiveTab('admin'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>

        {/* Form Card Container */}
        <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/70 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/80">
          
          {/* Toast / Notification Banner */}
          {successToast && (
            <div className="mb-5 p-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-start gap-3 text-emerald-300 text-xs font-semibold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successToast}</span>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-500/15 border border-red-500/30 rounded-2xl flex items-start gap-3 text-red-300 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: CUSTOMER LOGIN */}
          {activeTab === 'customer' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-blue-400" />
                    Customer Portal Login
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Track repair status &amp; view active bookings
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('customer')}
                  className="px-3 py-1.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 font-extrabold text-[11px] rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>Demo Login</span>
                </button>
              </div>

              {!otpStep ? (
                /* Step 1: Mobile Input Form */
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Your Full Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Verma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Mobile Number (Required)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="98765 43210"
                        value={customerMobile}
                        onChange={(e) => setCustomerMobile(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-blue-600/35 flex items-center justify-center gap-2 group mt-2"
                  >
                    <span>Get 6-Digit OTP</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              ) : (
                /* Step 2: OTP Verification Form */
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="text-center py-2">
                    <p className="text-xs text-slate-300 font-medium">
                      Enter 6-Digit OTP sent to <span className="font-bold text-white">+91 {customerMobile}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setOtpStep(false)}
                      className="text-[11px] font-bold text-blue-400 hover:underline mt-1 inline-block"
                    >
                      Edit Mobile Number
                    </button>
                  </div>

                  {/* 6 Digit Inputs */}
                  <div className="flex items-center justify-center gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        className="w-11 h-12 text-center text-lg font-black bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ))}
                  </div>

                  {/* Quick Auto Fill Button for Convenience */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setOtp(['1', '2', '3', '4', '5', '6'])}
                      className="text-xs font-extrabold text-blue-400 hover:text-blue-300 underline"
                    >
                      Auto-fill Demo OTP (123456)
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-emerald-600/35 flex items-center justify-center gap-2 group"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Verify OTP &amp; Login</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: TECHNICIAN LOGIN */}
          {activeTab === 'technician' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-emerald-400" />
                    Technician Partner Portal
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    View assigned jobs &amp; update customer service status
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('technician')}
                  className="px-3 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-extrabold text-[11px] rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Demo Tech Login</span>
                </button>
              </div>

              <form onSubmit={handleTechLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Technician ID or Mobile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. TECH-804 or 9835100000"
                      value={techId}
                      onChange={(e) => setTechId(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Security PIN / Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={techPin}
                      onChange={(e) => setTechPin(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-emerald-600/35 flex items-center justify-center gap-2 group mt-2"
                >
                  <Wrench className="w-4 h-4 text-white" />
                  <span>Access Technician Job Board</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: ADMIN LOGIN */}
          {activeTab === 'admin' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                    Admin Staff Portal
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Website settings, leads, localities &amp; SEO audit
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('admin')}
                  className="px-3 py-1.5 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-extrabold text-[11px] rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Demo Admin Login</span>
                </button>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Admin Username / Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="admin@ranchirepair.com"
                      value={adminUser}
                      onChange={(e) => setAdminUser(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm font-bold focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm font-bold focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-purple-600/35 flex items-center justify-center gap-2 group mt-2"
                >
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Login to Admin Dashboard</span>
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Security & Support Footer */}
        <div className="mt-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted &amp; Secure Authentication</span>
          </div>

          <p className="text-xs text-slate-400">
            Need help accessing your Ranchi Repair account?{' '}
            <a href={`tel:${businessInfo.phone}`} className="text-blue-400 font-bold hover:underline">
              Call Support: {businessInfo.phone}
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};
