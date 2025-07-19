import React, { useState, useEffect } from 'react';
import { initiateSSLPayment } from '../../services/paymentService';
import { validateEmail, validatePhone } from '../../utils/validators';
import { FormInput, FormSelect, FormCheckbox } from '../ui/FormElements';
import { Button } from '../ui/Button';
import useAuth from '../../services/authService';

export const DonationForm = ({ 
  campaigns, 
  defaultCampaignId,
  defaultCampaignSlug,
  defaultCampaignTitle
}) => {
  
  const { user } = useAuth();
  console.log(user?.uid)
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    userId: user?.uid || null,
    amount: '',
    campaignSlug: defaultCampaignSlug || '',
    isAnonymous: false,
    message: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [hasChangedCampaign, setHasChangedCampaign] = useState(false);

  // Initialize with default campaign
  useEffect(() => {
    if (defaultCampaignSlug && campaigns.length > 0 && !hasChangedCampaign) {
      const selectedCampaign = campaigns.find(c => 
        c._id === defaultCampaignId || 
        c.slug === defaultCampaignSlug
      );
      
      if (selectedCampaign) {
        setActiveCampaign(selectedCampaign);
        setFormData(prev => ({
          ...prev,
          campaignSlug: selectedCampaign.slug
        }));
      }
    }
  }, [campaigns, defaultCampaignId, defaultCampaignSlug, hasChangedCampaign]);

  // Update active campaign when campaignSlug changes
  useEffect(() => {
    if (formData.campaignSlug) {
      const selected = campaigns.find(c => c.slug === formData.campaignSlug);
      setActiveCampaign(selected);
    }
  }, [formData.campaignSlug, campaigns]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    
    if (name === 'campaignSlug' && !hasChangedCampaign) {
      setHasChangedCampaign(true);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    else if (isNaN(formData.amount)) newErrors.amount = 'Must be a number';
    else if (Number(formData.amount) <= 0) newErrors.amount = 'Must be greater than 0';
    if (!formData.campaignSlug) newErrors.campaignSlug = 'Please select a campaign';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const donationData = {
        ...formData,
        amount: Number(formData.amount),
        name: formData.isAnonymous? 'Anonymous Donor' : formData.name,
        email: formData.isAnonymous? null : formData.email,
        phone: formData.isAnonymous ? null : formData.phone,
        userId: formData.userId,
        campaignSlug: formData.campaignSlug,
        campaignId: activeCampaign?._id,
        campaignTitle: activeCampaign?.title,
        isAnonymous: formData.isAnonymous
      };

      const response = await initiateSSLPayment(donationData);
      window.location.href = response.url;
    } catch (error) {
      console.error('Donation submission error:', error);
      setErrors({
        submit: error.response?.data?.message || 'Payment processing failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }

    console.log(formData.name, formData.phone, formData.email , formData.campaignSlug);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
      {!hasChangedCampaign && defaultCampaignTitle && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Donate to: {defaultCampaignTitle}
          </h2>
          {activeCampaign?.description && (
            <p className="text-gray-600 mt-2 text-sm">{activeCampaign.description}</p>
          )}
        </div>
      )}

      
      {hasChangedCampaign && activeCampaign && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Donate to: {activeCampaign.title}
          </h2>
          {activeCampaign.description && (
            <p className="text-gray-600 mt-2 text-sm">{activeCampaign.description}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          
          <FormInput
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
          
          <FormInput
            label="Amount (BDT)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            error={errors.amount}
            required
            min="1"
            step="any"
          />
          
          <div className="md:col-span-2">
            <FormSelect
              label="Select Campaign"
              name="campaignSlug"
              value={formData.campaignSlug}
              onChange={handleChange}
              error={errors.campaignSlug}
              required
              options={[
                { value: '', label: '-- Select a Campaign --', disabled: true },
                ...campaigns.map(campaign => ({
                  value: campaign.slug,
                  label: campaign.title
                }))
              ]}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <FormCheckbox
            name="isAnonymous"
            checked={formData.isAnonymous}
            onChange={handleChange}
            label="Make this donation anonymous"
          />
          
          <FormInput
            label="Message (Optional)"
            name="message"
            value={formData.message}
            onChange={handleChange}
            as="textarea"
            rows={3}
            placeholder="Add a personal message..."
          />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <FormCheckbox
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            error={errors.agreeToTerms}
            required
            label={
              <span>
                I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms</a> and {' '}
                <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
              </span>
            }
          />
        </div>
        
        {errors.submit && (
          <div className="text-red-600 text-sm mt-2">{errors.submit}</div>
        )}
        
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Proceed to Payment'}
          </Button>
        </div>
      </form>
    </div>
  );
};