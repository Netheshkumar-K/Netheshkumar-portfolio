"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getEducations() {
  return await prisma.education.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function addEducation(data: {
  degree: string;
  department: string;
  collegeName: string;
  university: string;
  startYear: string;
  endYear?: string;
  cgpa?: string;
  status: string;
  description?: string;
  order?: number;
}) {
  try {
    await prisma.education.create({
      data: {
        degree: data.degree,
        department: data.department,
        collegeName: data.collegeName,
        university: data.university,
        startYear: data.startYear,
        endYear: data.endYear,
        cgpa: data.cgpa,
        status: data.status,
        description: data.description,
        isVisible: true,
        order: data.order || 0,
      }
    });
    revalidatePath("/admin/education");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to add education" };
  }
}

export async function deleteEducation(id: string) {
  try {
    await prisma.education.delete({
      where: { id }
    });
    revalidatePath("/admin/education");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete education" };
  }
}

export async function updateEducation(id: string, data: {
  degree: string;
  department: string;
  collegeName: string;
  university: string;
  startYear: string;
  endYear?: string;
  cgpa?: string;
  status: string;
  description?: string;
}) {
  try {
    await prisma.education.update({
      where: { id },
      data: {
        degree: data.degree,
        department: data.department,
        collegeName: data.collegeName,
        university: data.university,
        startYear: data.startYear,
        endYear: data.endYear,
        cgpa: data.cgpa,
        status: data.status,
        description: data.description,
      }
    });
    revalidatePath("/admin/education");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update education" };
  }
}

export async function toggleEducationVisibility(id: string, isVisible: boolean) {
  try {
    await prisma.education.update({
      where: { id },
      data: { isVisible }
    });
    revalidatePath("/admin/education");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update visibility" };
  }
}
