// src/components/TeacherCard.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Teacher } from '../types';
import Button from './ui/Button'; // The button component
import PaymentForm from './PaymentForm'; // The inline form component

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  // State to control if the payment form is visible for this card
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  // A simple function to toggle the state
  const handleTogglePayment = () => {
    setIsPaymentVisible(prevState => !prevState);
  };

  return (
    // Main card container with improved styling
    <div className="bg-white rounded-xl shadow-lg shadow-slate-200/60 overflow-hidden transition-all duration-300">
      <div className="p-6">

        {/* --- Teacher Info Section --- */}
        <div className="flex items-center space-x-4">
          <Image
            className="h-16 w-16 rounded-full object-cover"
            src={teacher.avatarUrl}
            alt={`Avatar of ${teacher.name}`}
            width={64}
            height={64}
          />
          <div>
            <div className="text-lg font-bold text-slate-800">{teacher.name}</div>
            <p className="text-sm text-slate-500">{teacher.subject}</p>
          </div>
        </div>

        {/* --- Salary Details Section --- */}
        <div className="mt-5 pt-5 border-t border-slate-200/80 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Annual Salary:</span>
            <span className="font-semibold text-green-600">
              ${teacher.salary.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Member Since:</span>
            <span className="font-semibold text-slate-700">
              {new Date(teacher.memberSince).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/*
          --- THIS IS THE CORRECTED SECTION THAT ADDS THE BUTTON BACK ---
          The container for the button that shows and hides the payment form.
        */}
        <div className="mt-6">
          <Button
            className="w-full"
            // This logic changes the button's appearance based on state
            // 'secondary' variant has a gray background and dark text (black font)
            variant={isPaymentVisible ? 'secondary' : 'primary'}
            onClick={handleTogglePayment}
          >
            {isPaymentVisible ? 'Cancel Payment' : 'Pay Monthly Salary'}
          </Button>
        </div>
        {/* --- END OF CORRECTED SECTION --- */}


        {/* This is the container for the payment form that slides up and down */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isPaymentVisible ? 'max-h-96 pt-4' : 'max-h-0'}`}>
          {isPaymentVisible && (
            <PaymentForm
              teacher={teacher}
              onClose={() => setIsPaymentVisible(false)}
            />
          )}
        </div>
        
      </div>
    </div>
  );
};

export default TeacherCard;