import { type Workout } from "./data";

// আপনার আসল API URL-টি এখানে বসান
const API_URL = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Fetches workouts from the real backend API endpoint.
 */
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
  copy.sort((a, b) => {
    if (key === "rating") return b.rating - a.rating;
    return a[key] - b[key];
  });
  return copy;
}