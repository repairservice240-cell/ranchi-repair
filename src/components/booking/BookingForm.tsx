import React, { useState, useEffect } from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { 
  User, Phone, Lock, Wrench, MessageSquare, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { ServiceBookingLead } from '../../types';
import { trackLeadConversion } from '../../utils/analytics';

interface BookingFormProps {
  initialServiceId?: string;
  initialLocality?: string;
  onSuccess: (lead: ServiceBookingLead) => void;
  isModal?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({ 
  initialServiceId, 
  initialLocality, 
  onSuccess,
  isModal = false 
}) => {
  const { services, supportedBrands, addLead, trackEvent } = useSiteContext();

  const [sameAsWhatsapp, setSameAsWhatsapp] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    appliance: initialServiceId || services[0]?.slug || 'ac-repair',
    brand: supportedBrands[0] || 'LG',
    serviceRequired: '',
    problemDesc: '',
    city: 'Ranchi', // Locked
    locality: initialLocality || 'Ranchi',
    pincode: '834001',
    address: '',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: 'Urgent — Within 30–60 Min'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initial props if changed
  useEffect(() => {
    if (initialServiceId) {
      setFormData(prev => ({ ...prev, appliance: initialServiceId }));
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (initialLocality) {
      setFormData(prev => ({ ...prev, locality: initialLocality }));
    }
  }, [initialLocality]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleWhatsappCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsWhatsapp(checked);
    if (checked) {
      setFormData(prev => ({ ...prev, whatsapp: prev.mobile }));
      setErrors(prev => ({ ...prev, whatsapp: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    }
    if (!formData.mobile.trim() || !/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!sameAsWhatsapp) {
      const wa = formData.whatsapp.trim();
      if (!wa || !/^[6-9]\d{9}$/.test(wa)) {
        newErrors.whatsapp = 'Enter a valid 10-digit WhatsApp number';
      }
    }
    if (!formData.appliance) {
      newErrors.appliance = 'Select an appliance';
    }
    if (!formData.serviceRequired.trim()) {
      newErrors.serviceRequired = 'Please enter service required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Service address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    trackEvent('form_start', 'Submitted Service Booking Form');

    setTimeout(() => {
      const selectedServiceObj = services.find(s => s.slug === formData.appliance || s.id === formData.appliance);
      const applianceName = selectedServiceObj ? selectedServiceObj.name : formData.appliance;
      const finalWhatsapp = sameAsWhatsapp ? formData.mobile : (formData.whatsapp || formData.mobile);

      const createdLead = addLead({
        name: formData.name,
        mobile: formData.mobile,
        whatsapp: finalWhatsapp,
        appliance: applianceName,
        brand: formData.brand,
        serviceRequired: formData.serviceRequired,
        problemDesc: formData.problemDesc,
        city: 'Ranchi',
        locality: formData.locality || 'Ranchi',
        pincode: formData.pincode,
        address: formData.address,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime
      });

      trackLeadConversion(applianceName, formData.locality || 'Ranchi');

      setIsSubmitting(false);
      onSuccess(createdLead);
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl ${isModal ? '' : 'max-w-2xl mx-auto'}`}>
      
      {/* Header */}
      <div className="mb-5 pb-4 border-b border-slate-100">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-2">
          <Wrench className="w-3.5 h-3.5 text-blue-600" />
          <span>Doorstep Technician Booking</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Book Technician Visit in Ranchi
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Instant booking confirmation. Certified technician visits your doorstep within 30-60 minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Your Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rajesh Sharma"
              className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${
                errors.name ? 'border-red-500' : 'border-slate-200'
              }`}
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              name="mobile"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit mobile (e.g. 9876543210)"
              className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${
                errors.mobile ? 'border-red-500' : 'border-slate-200'
              }`}
            />
          </div>
          {errors.mobile && <p className="text-xs text-red-500 mt-1 font-medium">{errors.mobile}</p>}
        </div>

        {/* WhatsApp Checkbox & Revealed Input */}
        <div className="sm:col-span-2 space-y-2">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sameAsWhatsapp}
              onChange={handleWhatsappCheckbox}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
            <span className="text-xs font-semibold text-slate-700">
              WhatsApp number is same as mobile
            </span>
          </label>

          {!sameAsWhatsapp && (
            <div className="pt-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  name="whatsapp"
                  maxLength={10}
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="10-digit WhatsApp number"
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${
                    errors.whatsapp ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.whatsapp && <p className="text-xs text-red-500 mt-1 font-medium">{errors.whatsapp}</p>}
            </div>
          )}
        </div>

        {/* Appliance */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Appliance <span className="text-red-500">*</span>
          </label>
          <select
            name="appliance"
            value={formData.appliance}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          >
            {services.map(s => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Service Required (Custom Self Entry Input) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Service Required <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="serviceRequired"
            value={formData.serviceRequired}
            onChange={handleChange}
            placeholder="e.g. General Repair, Cooling Issue, Part Replacement..."
            className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${
              errors.serviceRequired ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          {errors.serviceRequired && <p className="text-xs text-red-500 mt-1 font-medium">{errors.serviceRequired}</p>}
        </div>

        {/* Service City (Locked) */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Service City
          </label>
          <div className="relative">
            <input
              type="text"
              value="Ranchi, Jharkhand"
              disabled
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 cursor-not-allowed"
            />
            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
          </div>
        </div>

        {/* Service Address */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Service Address in Ranchi <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            rows={2}
            value={formData.address}
            onChange={handleChange}
            placeholder="House/Flat No., Street, Area/Locality, Landmark..."
            className={`w-full p-3 bg-slate-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${
              errors.address ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          {errors.address && <p className="text-xs text-red-500 mt-1 font-medium">{errors.address}</p>}
        </div>
      </div>

      {/* Footer Notice & Submit CTA */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200/80 w-full sm:w-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>No prepayment required. Pay after service.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          {isSubmitting ? (
            <span>Confirming Service Request...</span>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Repair Booking</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
