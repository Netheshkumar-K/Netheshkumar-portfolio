"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getRoles() {
  return await prisma.role.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function addRole(text: string) {
  try {
    const count = await prisma.role.count();
    await prisma.role.create({
      data: {
        text,
        order: count,
      }
    });
    revalidatePath("/admin/roles");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to add role" };
  }
}

export async function updateRole(id: string, text: string) {
  try {
    await prisma.role.update({
      where: { id },
      data: { text },
    });
    revalidatePath("/admin/roles");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update role" };
  }
}

export async function deleteRole(id: string) {
  try {
    await prisma.role.delete({
      where: { id }
    });
    revalidatePath("/admin/roles");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete role" };
  }
}
