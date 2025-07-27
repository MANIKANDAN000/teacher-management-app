// src/components/Header.tsx
import React from 'react';
import Button from './ui/Button'; // Import the Button component

interface HeaderProps {
  onAddTeacherClick: () => void; // A function prop to handle the click
}

const Header: React.FC<HeaderProps> = ({ onAddTeacherClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Teacher Management Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">Powered by Copyrights 2025 Assesments</p>
          </div>
          {/* Add Teacher Button */}
          <Button onClick={onAddTeacherClick}>
            Add Teacher
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;