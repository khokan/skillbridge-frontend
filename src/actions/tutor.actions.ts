"use server";

import { tutorService } from "@/services/tutor.service";

export const getTutorReviews = async (id: string) => tutorService.geReviews(id);

export const getTutors = async () => {
  return await tutorService.getTutors();
};

export const getTutorById = async (id: string) => {
  return await tutorService.getTutorById(id);
};

// optional, if you ever add mutations that affect list:
export const refreshTutors = async () => {
//   revalidateTag("tutors");
};


