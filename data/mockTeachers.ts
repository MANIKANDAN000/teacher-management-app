// src/data/mockTeachers.ts

// We import the Teacher interface from our types file to ensure type safety.
// If any object in this array is missing a required property, TypeScript will show an error.
import { Teacher } from '../types';

// This is an array of Teacher objects that will be used as the initial state.
export const mockTeachers: Teacher[] = [
  {
    id: 't-001',
    name: 'Eleanor Vance',
    subject: 'Physics',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    salary: 65000,
    memberSince: '2021-08-15',
  },
  {
    id: 't-002',
    name: 'Marcus Holloway',
    subject: 'Computer Science',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    salary: 72000,
    memberSince: '2020-02-20',
  },
  {
    id: 't-003',
    name: 'Anya Petrova',
    subject: 'Literature',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    salary: 61000,
    memberSince: '2022-01-10',
  },
  {
    id: 't-004',
    name: 'David Chen',
    subject: 'Mathematics',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    salary: 68000,
    memberSince: '2019-11-05',
  },
  {
    id: 't-005',
    name: 'Sophia Loren',
    subject: 'History',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    salary: 63000,
    memberSince: '2023-03-22',
  },
  {
    id: 't-006',
    name: 'Kenji Tanaka',
    subject: 'Art & Design',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
    salary: 66000,
    memberSince: '2021-09-01',
  },
];