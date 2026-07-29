"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getAchievements() {
  return await prisma.achievement.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllAchievements() {
  return await prisma.achievement.findMany({ orderBy: { order: "asc" } });
}

export async function addAchievement(data: {
  title: string;
  type: string;
  description?: string;
  organizer?: string;
  date?: string;
  position?: string;
  badgeUrl?: string;
  certificateUrl?: string;
}) {
  await prisma.achievement.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/achievements");
  return { success: true };
}

export async function updateAchievement(id: string, data: {
  title?: string;
  type?: string;
  description?: string;
  organizer?: string;
  date?: string;
  position?: string;
  badgeUrl?: string;
  certificateUrl?: string;
}) {
  await prisma.achievement.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin/achievements");
  return { success: true };
}

export async function deleteAchievement(id: string) {
  await prisma.achievement.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/achievements");
  return { success: true };
}

export async function toggleAchievementVisibility(id: string, isVisible: boolean) {
  await prisma.achievement.update({ where: { id }, data: { isVisible } });
  revalidatePath("/");
  revalidatePath("/admin/achievements");
  return { success: true };
}
