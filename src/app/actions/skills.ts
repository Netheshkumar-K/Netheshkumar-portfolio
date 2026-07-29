"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  return await prisma.skill.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function addSkill(data: {
  name: string;
  percentage: number;
  iconUrl?: string;
  order?: number;
}) {
  try {
    await prisma.skill.create({
      data: {
        ...data,
        isVisible: true,
        order: data.order || 0,
      }
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to add skill" };
  }
}

export async function updateSkill(id: string, data: {
  name: string;
  percentage: number;
  iconUrl?: string;
}) {
  try {
    await prisma.skill.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update skill" };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({
      where: { id }
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete skill" };
  }
}

export async function toggleSkillVisibility(id: string, isVisible: boolean) {
  try {
    await prisma.skill.update({
      where: { id },
      data: { isVisible }
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update visibility" };
  }
}
