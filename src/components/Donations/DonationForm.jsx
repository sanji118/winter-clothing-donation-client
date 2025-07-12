import { useState } from 'react';
import { LoadingState } from '../ui/LoadingState';
import { ErrorState } from '../ui/ErrorState';
import useAuth from '../../services/authService';


const DonationForm = ({campaigns}) => {
  const {user} = useAuth();

  const [formData, setFormData] = useState({
    campaignSlug: '',
    name: user?.name || '',
    userId: user?.email || '',
    amount: '',
    method: '',
    transactionId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      date: new Date(),
    };

    try {
      const res = await axios.post('/api/donate', payload);
      alert('Donation successful!');
      setFormData({
        campaignSlug: '',
        name: user?.name || '',
        userId: user?._id || '',
        amount: '',
        method: '',
        transactionId: '',
      });
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  if (isLoading) return <LoadingState name={'Donation Form'} />;
  if (isError) return <ErrorState  name={'Donation Form'} />;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-xl font-bold">Donate Now</h2>

      {/* Campaign Select */}
      <div>
        <label className="block mb-1 font-medium">Select Campaign</label>
        <select
          name="campaignSlug"
          value={formData.campaignSlug}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">-- Choose a campaign --</option>
          {campaigns.map(c => (
            <option key={c._id} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div>
        <label className="block mb-1 font-medium">Your Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block mb-1 font-medium">Donation Amount (৳)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min={1}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      {/* Payment Method */}
      <div>
        <label className="block mb-1 font-medium">Payment Method</label>
        <select
          name="method"
          value={formData.method}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">-- Select method --</option>
          <option value="SSLCommerz">Online Payment (SSLCommerz)</option>
          <option value="BankCard">Bank Card</option>
        </select>
      </div>

      {/* Transaction ID */}
      <div>
        <label className="block mb-1 font-medium">Transaction ID</label>
        <input
          type="text"
          name="transactionId"
          value={formData.transactionId}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700"
      >
        Confirm Donation
      </button>
    </form>
  );
};

export default DonationForm;
