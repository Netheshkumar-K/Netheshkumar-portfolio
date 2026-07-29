"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  const settings = await prisma.siteSettings.findMany();
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);
  
  return settingsMap;
}

export async function getSetting(key: string) {
  const setting = await prisma.siteSettings.findUnique({
    where: { key }
  });
  return setting?.value || null;
}

export async function updateSetting(key: string, value: string) {
  try {
    await prisma.siteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update setting" };
  }
}

export async function updateSettings(settings: Record<string, string>) {
  try {
    const promises = Object.entries(settings).map(([key, value]) => 
      prisma.siteSettings.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      })
    );
    await Promise.all(promises);
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update settings" };
  }
}
