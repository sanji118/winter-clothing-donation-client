
import { FormRadio } from '../ui/FormElements';

export const PaymentMethodSelector = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-gray-800">Payment Method</h3>
      <div className="space-y-2">
        <FormRadio
          name="paymentMethod"
          value="ssl"
          checked={value === 'ssl'}
          onChange={onChange}
          label="Credit/Debit Card (SSLCommerz)"
        />
        <FormRadio
          name="paymentMethod"
          value="bank"
          checked={value === 'bank'}
          onChange={onChange}
          label="Bank Transfer"
        />
      </div>
    </div>
  );
};