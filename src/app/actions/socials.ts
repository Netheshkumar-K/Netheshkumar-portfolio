"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getSocials() {
  return await prisma.socialMedia.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function addSocial(data: {
  platform: string;
  url: string;
  icon?: string;
  isVisible?: boolean;
}) {
  try {
    const count = await prisma.socialMedia.count();
    await prisma.socialMedia.create({
      data: {
        ...data,
        order: count,
      }
    });
    revalidatePath("/admin/socials");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to add social media link" };
  }
}

export async function updateSocial(id: string, data: {
  platform: string;
  url: string;
  icon?: string;
  isVisible?: boolean;
}) {
  try {
    await prisma.socialMedia.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/socials");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update social media link" };
  }
}

export async function deleteSocial(id: string) {
  try {
    await prisma.socialMedia.delete({
      where: { id }
    });
    revalidatePath("/admin/socials");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete social media link" };
  }
}
