// src/app/page.tsx
'use client';

// Import React hooks and types
import React, { useState } from 'react';
import { Teacher } from '../types';

// Import the initial data and all necessary components
import { mockTeachers } from '../data/mockTeachers';
import Header from '../components/Header';
import TeacherCard from '../components/TeacherCard';
import AddTeacherModal from '../components/AddTeacherModal';

export default function HomePage() {
  // --- STATE MANAGEMENT ---

  // 1. The list of teachers is now a state variable.
  // We initialize it with the data from our mock file.
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  
  // 2. This state controls whether the "Add Teacher" modal is open or closed.
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // --- HANDLER FUNCTIONS ---

  // This function is called by the AddTeacherModal when the form is submitted.
  // It receives the new teacher object as an argument.
  const handleAddNewTeacher = (newTeacher: Teacher) => {
    // We update the teachers state by adding the new teacher to the beginning
    // of the array. This makes the new card appear at the top of the list.
    setTeachers(prevTeachers => [newTeacher, ...prevTeachers]);
  };

  return (
    <>
      {/* 
        We pass a function to the Header component. When the "Add Teacher"
        button inside the Header is clicked, it will call this function,
        which sets our modal state to 'true'.
      */}
      <Header onAddTeacherClick={() => setIsAddModalOpen(true)} />

      <main>
        <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* 
              CRUCIAL CHANGE: We now map over the 'teachers' state variable.
              This ensures that when we add a new teacher and the state updates,
              React will re-render this list to include the new card.
            */}
            {teachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 
        The AddTeacherModal is always rendered here, but it will only be visible
        on screen if its 'isOpen' prop is true.
      */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)} // Pass a function to allow the modal to close itself
        onAddTeacher={handleAddNewTeacher} // Pass the function to add a new teacher
      />
    </>
  );
}