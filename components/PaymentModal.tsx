// src/components/PaymentModal.tsx
import React, { useState, useEffect } from 'react';
import { Teacher } from '../types';
import Input from './ui/Input';
import Button from './ui/Button';
import Alert from './ui/Alert';

interface PaymentModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ teacher, isOpen, onClose }) => {
  // ... (rest of the state logic is the same)
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (teacher) {
      const monthlySalary = (teacher.salary / 12).toFixed(2);
      setAmount(monthlySalary);
      setError(null);
      setSuccess(null);
      setIsLoading(false);
    }
  }, [teacher, isOpen]);

  // THIS IS THE MOST IMPORTANT LINE IN THIS FILE
  // If the 'isOpen' prop is false, this component renders nothing (null).
  if (!isOpen) {
    return null;
  }
  
  // ... (The handlePayment function is the same)
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid, positive amount.');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (Math.random() > 0.1) {
      setSuccess(`Successfully paid $${numericAmount} to ${teacher.name}.`);
      setTimeout(() => { onClose(); }, 2500);
    } else {
      setError('Payment failed. Please try again.');
    }
    setIsLoading(false);
  };

  // The rest of the JSX is returned only if 'isOpen' is true.
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold text-secondary">Salary Payment</h2>
                {/* Add a check here to ensure teacher is not null */}
                <p className="text-slate-500 mt-1">For {teacher?.name}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="mt-6">
            {success && <Alert type="success" message={success} />}
            {error && <Alert type="error" message={error} />}
            {!success && (
              <form onSubmit={handlePayment} className="space-y-4 mt-4">
                <Input
                  id="amount"
                  label="Payment Amount (USD)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                />
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-slate-700">Payment Method</label>
                  <select id="paymentMethod" name="paymentMethod" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                    <option>Bank Transfer</option>
                    <option>PayPal</option>
                    <option>Credit Card</option>
                  </select>
                </div>
                <div className="pt-2">
                    <Button type="submit" className="w-full" isLoading={isLoading}>
                      {isLoading ? 'Processing...' : `Pay $${amount}`}
                    </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;