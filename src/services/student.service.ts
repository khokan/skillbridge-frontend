import { cookies } from "next/headers";
import { StudentProfile, UpdateStudentProfileInput } from "@/types/profile";

export type Booking = {
  id: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  startTime: string;
  endTime: string;
  price: number;
  currency: string;
  tutor: { id: string; name: string };
};

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

//* No Dynamic and No { cache: no-store } : SSG -> Static Page
//* { cache: no-store } : SSR -> Dynamic Page
//* next: { revalidate: 10 } : ISR -> Mix between static and dynamic

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
  limit?: string;
}

export interface BlogData {
  title: string;
  content: string;
  tag?: string[];
}

export const studentService = {
  getBookings: async function (): Promise<{ data: { items: Booking[] } | null; error: { message: string } | null }> {
    try {
      const url = new URL(`${API_URL}/bookings`);
  
      const res = await fetch(url.toString());
      const data = await res.json();

      console.log("Fetched bookings data:", data);
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  // ✅ GET current student profile
  getProfile: async function () {
    try {
      const cookieStore = await cookies();

      const url = new URL(`${API_URL}/users/me`);
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(), // sends your BetterAuth cookie session
        },
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || data?.error) {
        return { data: null, error: { message: data?.message ?? "Failed to load profile" } };
      }

      return { data: data as StudentProfile, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },


 // ✅ PATCH update profile
  updateProfile: async function (payload: UpdateStudentProfileInput) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data?.error) {
        return { data: null, error: { message: data?.message ?? "Profile update failed" } };
      }

      return { data: data as StudentProfile, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  
  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  createBlogPost: async (blogData: BlogData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Post not created." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
