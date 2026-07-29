"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getExperiences() {
  return await prisma.experience.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function addExperience(data: {
  companyName: string;
  designation: string;
  employmentType: string;
  location?: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description?: string;
  technologiesUsed?: string;
  order?: number;
}) {
  try {
    await prisma.experience.create({
      data: {
        ...data,
        isVisible: true,
        order: data.order || 0,
      }
    });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to add experience" };
  }
}

export async function updateExperience(id: string, data: {
  companyName: string;
  designation: string;
  employmentType: string;
  location?: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description?: string;
  technologiesUsed?: string;
}) {
  try {
    await prisma.experience.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update experience" };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({
      where: { id }
    });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete experience" };
  }
}

export async function toggleExperienceVisibility(id: string, isVisible: boolean) {
  try {
    await prisma.experience.update({
      where: { id },
      data: { isVisible }
    });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update visibility" };
  }
}
