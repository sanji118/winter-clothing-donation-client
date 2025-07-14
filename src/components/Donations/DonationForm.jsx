import React, { useState, useEffect } from 'react';
import { initiateSSLPayment, submitBankDonation } from '../../services/paymentService';
import { validateEmail, validatePhone } from '../../utils/validators';
import { FormInput, FormSelect, FormRadio, FormCheckbox } from '../ui/FormElements';
import { Button } from '../ui/Button';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { BankDetails } from './BankDetails';
import useAuth from '../../services/authService';

export const DonationForm = ({ campaigns }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    amount: '',
    campaignSlug: '',
    paymentMethod: 'ssl',
    isAnonymous: false,
    message: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState(null);

  
  useEffect(() => {
    if (campaigns.length === 1) {
      setFormData(prev => ({
        ...prev,
        campaignSlug: campaigns[0].slug
      }));
      setActiveCampaign(campaigns[0]);
    }
  }, [campaigns]);

  
  useEffect(() => {
    if (formData.campaignSlug) {
      const selected = campaigns.find(c => c.slug === formData.campaignSlug);
      setActiveCampaign(selected);
    }
  }, [formData.campaignSlug, campaigns]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0) newErrors.amount = 'Invalid amount';
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
      if (formData.paymentMethod === 'ssl') {
        // Process SSL payment
        const paymentData = {
          amount: formData.amount,
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          campaignSlug: formData.campaignSlug,
          userId: user?._id || 'guest'
        };
        
        const response = await initiateSSLPayment(paymentData);
        window.location.href = response.url;
        console.log(response.url);
      } else {
        // Process bank donation
        const donationData = {
          ...formData,
          userId: user?.email || null,
          paymentStatus: 'pending',
          paymentMethod: 'bank'
        };
        
        await submitBankDonation(donationData);
      }
    } catch (error) {
      console.error('Donation submission error:', error);
      setErrors({
        submit: error.response?.data?.message || 'Failed to process donation. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }

    
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Donation</h2>
      
      {activeCampaign && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800">{activeCampaign.title}</h3>
          <p className="text-gray-600 mt-1">{activeCampaign.shortDescription}</p>
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
            min="10"
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
                { value: '', label: '-- Select a Campaign --' },
                ...campaigns.map(campaign => ({
                  value: campaign.slug,
                  label: campaign.title
                }))
              ]}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <PaymentMethodSelector
            value={formData.paymentMethod}
            onChange={handleChange}
          />
          
          {formData.paymentMethod === 'bank' && <BankDetails />}
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
                I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and 
                <a href="/privacy" className="text-blue-600 hover:underline"> Privacy Policy</a>
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
            className="w-full md:w-auto"
          >
            {isSubmitting ? 'Processing...' : 'Donate Now'}
          </Button>
        </div>
      </form>
    </div>
  );
};