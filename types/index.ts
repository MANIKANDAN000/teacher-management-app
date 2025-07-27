// src/types/index.ts

// This interface defines the "shape" or "contract" for a Teacher object.
// Any object that is treated as a Teacher in our application must have these properties
// with these specific data types (string, number).
export interface Teacher {
  id: string;
  name: string;
  subject: string;
  avatarUrl: string;
  salary: number;
  memberSince: string; // Stored as a string in 'YYYY-MM-DD' format
}