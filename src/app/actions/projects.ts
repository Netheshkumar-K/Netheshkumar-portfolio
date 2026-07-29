"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function addProject(data: {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  technologies?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  order?: number;
}) {
  try {
    await prisma.project.create({
      data: {
        ...data,
        isVisible: true,
        order: data.order || 0,
      }
    });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to add project" };
  }
}

export async function updateProject(id: string, data: {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  technologies?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
}) {
  try {
    await prisma.project.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id }
    });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete project" };
  }
}

export async function toggleProjectVisibility(id: string, isVisible: boolean) {
  try {
    await prisma.project.update({
      where: { id },
      data: { isVisible }
    });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update visibility" };
  }
}
