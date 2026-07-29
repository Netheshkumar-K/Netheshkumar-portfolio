"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function addTestimonial(data: {
  name: string;
  feedback: string;
  company?: string;
  designation?: string;
  rating?: number;
  profilePhoto?: string;
  isFeatured?: boolean;
}) {
  try {
    await prisma.testimonial.create({
      data: {
        ...data,
        rating: data.rating || 5,
        status: "APPROVED",
      }
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to add testimonial" };
  }
}

export async function updateTestimonial(id: string, data: {
  name: string;
  feedback: string;
  company?: string;
  designation?: string;
  rating?: number;
  profilePhoto?: string;
  isFeatured?: boolean;
  status?: string;
}) {
  try {
    await prisma.testimonial.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update testimonial" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({
      where: { id }
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete testimonial" };
  }
}

export async function toggleTestimonialFeatured(id: string, isFeatured: boolean) {
  try {
    await prisma.testimonial.update({
      where: { id },
      data: { isFeatured }
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to toggle status" };
  }
}
