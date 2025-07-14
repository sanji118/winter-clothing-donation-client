import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get('tranId');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="mt-3 text-gray-600">
          Thank you for your donation. Your payment has been processed successfully.
        </p>
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Transaction ID:</span><br />
            <span className="text-green-700 font-mono">{tranId || 'N/A'}</span>
          </p>
        </div>

        <Link
          to="/"
          className="inline-block mt-8 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
