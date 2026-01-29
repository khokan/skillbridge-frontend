"use server";

import { studentService } from "@/services/student.service";
import { UpdateStudentProfileInput } from "@/types/profile";

export const getBookings = async () => {
  return await studentService.getBookings();
};

export const getStudentProfile = async () => {
  return await studentService.getProfile();
};

export const updateStudentProfile = async (payload: UpdateStudentProfileInput) => {
  return await studentService.updateProfile(payload);
};