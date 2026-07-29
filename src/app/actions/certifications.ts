"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getCertifications() {
  return await prisma.certification.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllCertifications() {
  return await prisma.certification.findMany({ orderBy: { order: "asc" } });
}

export async function addCertification(data: {
  courseName: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  certificateUrl?: string;
  credentialId?: string;
  credentialUrl?: string;
}) {
  await prisma.certification.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/certifications");
  return { success: true };
}

export async function updateCertification(id: string, data: {
  courseName?: string;
  organization?: string;
  issueDate?: string;
  expiryDate?: string;
  certificateUrl?: string;
  credentialId?: string;
  credentialUrl?: string;
}) {
  await prisma.certification.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin/certifications");
  return { success: true };
}

export async function deleteCertification(id: string) {
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/certifications");
  return { success: true };
}

export async function toggleCertificationVisibility(id: string, isVisible: boolean) {
  await prisma.certification.update({ where: { id }, data: { isVisible } });
  revalidatePath("/");
  revalidatePath("/admin/certifications");
  return { success: true };
}
