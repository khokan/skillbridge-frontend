"use server";

import { tutorProfileService, TutorProfilePayload } from "@/services/tutorProfile.service";
import { revalidateTag } from "next/cache";

export const getTutorProfile = async () => {
  return await tutorProfileService.get();
};

export const createTutorProfile = async (payload: TutorProfilePayload) => {
    console.log("Creating tutor profile with payload:", payload);
  const res = await tutorProfileService.create(payload);
//    revalidateTag("tutorProfile");
  return res;
};

export const updateTutorProfile = async (payload: TutorProfilePayload) => {
  const res = await tutorProfileService.update(payload);
//   revalidateTag("tutorProfile");
  return res;
};

export const deleteTutorProfile = async () => {
  const res = await tutorProfileService.remove();
//   revalidateTag("tutorProfile");
  return res;
};
