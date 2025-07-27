// src/components/AddTeacherModal.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Teacher } from '../types';
import Input from './ui/Input';
import Button from './ui/Button';

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTeacher: (newTeacher: Teacher) => void;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({ isOpen, onClose, onAddTeacher }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // This state will now hold a permanent Data URL string
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // --- MODIFIED: This function now uses FileReader to create a Data URL ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 1. Create a new FileReader object
      const reader = new FileReader();
      
      // 2. Define what happens when the reader finishes loading the file
      reader.onloadend = () => {
        // The result is the Data URL. Set it in state for the preview.
        setPreviewUrl(reader.result as string);
      };

      // 3. Tell the reader to read the file and convert it to a Data URL
      reader.readAsDataURL(file);
    }
  };

  // Helper function to reset the form to a clean state
  const resetForm = () => {
    setName('');
    setSubject('');
    setSalary('');
    setError(null);
    setPreviewUrl(null); // Also clear the image preview
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subject || !salary || isNaN(Number(salary))) {
      setError('Please fill out all fields with valid data.');
      return;
    }

    const newTeacher: Teacher = {
      id: `t-${Date.now()}`,
      name,
      subject,
      salary: Number(salary),
      memberSince: new Date().toISOString().split('T')[0],
      // The avatarUrl is now the permanent Data URL from our state
      avatarUrl: previewUrl || `https://i.pravatar.cc/150?u=${Date.now()}`,
    };

    onAddTeacher(newTeacher);
    handleClose();
  };

  // The cleanup useEffect for revoking the URL is no longer needed with FileReader.

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start pt-16 p-4 overflow-y-auto" onClick={handleClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Add New Teacher</h2>
            <button type="button" onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {error && <p className="bg-red-100 text-red-700 text-sm rounded-md p-3 mb-4">{error}</p>}

          <div className="space-y-4">
            {/* The preview section remains the same, it will now display the Data URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Profile Picture</label>
              <div className="mt-2 flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
                  {previewUrl ? (
                    <Image src={previewUrl} alt="Profile preview" width={64} height={64} className="h-full w-full object-cover" />
                  ) : (
                    <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <label htmlFor="file-upload" className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
            </div>

            <Input id="name" label="Teacher Name" value={name} onChange={e => setName(e.target.value)} required />
            <Input id="subject" label="Teaching Field" value={subject} onChange={e => setSubject(e.target.value)} required />
            <Input id="salary" label="Annual Salary ($)" type="number" placeholder="e.g., 65000" value={salary} onChange={e => setSalary(e.target.value)} required />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Teacher
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherModal;