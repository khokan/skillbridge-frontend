import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
export type TutorProfilePayload = {
  bio: string;
  languages: string[];
  hourlyRate: number;
};

export const tutorProfileService = {
  get: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/tutor-profile/me`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

     // Handle 404 (no profile) differently from other errors
      if (res.status === 404) {
        return { data: null, error: null }; // No profile exists - this is OK
      }
      
      if (!res.ok) {
        // For other errors, return an error
        const errorData = await res.json().catch(() => ({ message: "Failed to fetch profile" }));
        return { data: null, error: { message: errorData.message || "Failed to fetch profile" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.error("Error fetching tutor profile:", error);
      return { data: null, error: { message: "Failed to fetch profile" } };
    }
  },

  create: async function (payload: TutorProfilePayload) {
    try {
      const cookieStore = await cookies();
        console.log("API_URL:", API_URL);
      const res = await fetch(`${API_URL}/tutor-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: data.message } };
      }

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Profile creation failed" } };
    }
  },

  update: async function (payload: TutorProfilePayload) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/tutor-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: data.message } };
      }

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Profile update failed" } };
    }
  },

  remove: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/tutor-profile`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        return { error: { message: "Delete failed" } };
      }

      return { error: null };
    } catch {
      return { error: { message: "Delete failed" } };
    }
  },
};
