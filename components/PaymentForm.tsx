// src/components/PaymentForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Teacher } from '../types';
import Input from './ui/Input';
import Button from './ui/Button';
import Alert from './ui/Alert';

interface PaymentFormProps {
  teacher: Teacher;
  onClose: () => void; // Function to tell the parent card to close this form
}

const PaymentForm: React.FC<PaymentFormProps> = ({ teacher, onClose }) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // This effect runs when the component is first shown
  useEffect(() => {
    // Pre-fill the form with the correct monthly salary
    const monthlySalary = (teacher.salary / 12).toFixed(2);
    setAmount(monthlySalary);
  }, [teacher]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Simulate an API call to a payment gateway
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a successful or failed response
    if (Math.random() > 0.1) { // 90% success rate
      setSuccess(`Payment to ${teacher.name} was successful!`);
      // After success, wait 2 seconds and then close the form
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setError('Payment failed. Please check details and try again.');
      setIsLoading(false);
    }
  };

  return (
    // This container has a top border to separate it from the card's main content
    <div className="pt-4 border-t border-slate-200/80">
      <h3 className="text-md font-semibold text-slate-700 mb-3">Payment Details</h3>
      
      {/* Show success or error messages */}
      {success && <Alert type="success" message={success} />}
      {error && <Alert type="error" message={error} />}

      {/* Only show the form if the payment has not been successfully processed yet */}
      {!success && (
        <form onSubmit={handlePayment} className="space-y-4">
          <Input
            id={`amount-${teacher.id}`}
            label="Payment Amount (USD)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            required
          />
          <div>
            <label htmlFor={`paymentMethod-${teacher.id}`} className="block text-sm font-medium text-slate-700">
              Payment Method
            </label>
            <select id={`paymentMethod-${teacher.id}`} name="paymentMethod" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
              <option>Bank Transfer</option>
              <option>Company Account</option>
            </select>
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full" isLoading={isLoading}>
              {isLoading ? 'Processing...' : `Confirm Payment`}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;