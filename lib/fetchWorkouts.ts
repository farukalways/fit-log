import { type Workout } from "./data";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";


export async function fetchWorkouts(): Promise<Workout[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Workout[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
    return [];
  }
}



export type SortKey = "duration" | "calories" | "rating";

export function sortWorkouts(list: Workout[], key: SortKey): Workout[] {
  const copy = [...list];
  
  return copy.sort((a, b) => {
    if (key === "rating") {
      return b.rating - a.rating;
    }
    if (key === "duration") {
      return a.duration - b.duration;
    }
    if (key === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }
    return 0;
  });
}