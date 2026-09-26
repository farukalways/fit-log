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
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: Difficulty;
  duration: number; 
  caloriesBurned: number; 
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
   done?: boolean;
};