// data.ts

export type Category =
  | "CHEST"
  | "BACK"
  | "LEGS"
  | "SHOULDERS"
  | "ARMS"
  | "CORE";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Workout = {
  id: string;
  name: string;
  categories: Category[];
  equipment: string[];
  duration: number; // minutes
  calories: number; // kcal
  rating: number;
  difficulty: Difficulty;
  sets: number;
  reps: string;
  description: string;
  instructions: string[];
};

