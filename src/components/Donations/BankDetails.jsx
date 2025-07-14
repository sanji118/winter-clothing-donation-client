
export const BankDetails = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium text-gray-800 mb-2">Bank Transfer Details</h4>
      <div className="space-y-2 text-sm text-gray-600">
        <p><span className="font-medium">Bank Name:</span> Example Bank</p>
        <p><span className="font-medium">Account Name:</span> Your Organization</p>
        <p><span className="font-medium">Account Number:</span> 1234567890</p>
        <p><span className="font-medium">Branch:</span> Main Branch</p>
        <p><span className="font-medium">Routing Number:</span> 123456789</p>
        <p className="mt-3 text-gray-700">
          Please use your name as reference when making the transfer and email the receipt to donations@example.org
        </p>
      </div>
    </div>
  );
};