"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

export async function getResumeRequests() {
  return await prisma.resumeRequest.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function requestResume(data: {
  name: string;
  email: string;
  purpose: string;
  message?: string;
}) {
  try {
    // 1. Save to DB
    const request = await prisma.resumeRequest.create({
      data,
    });
    revalidatePath("/admin/resume-requests");

    // 2. Fetch the Resume URL from SiteSettings
    const resumeSetting = await prisma.siteSettings.findUnique({
      where: { key: "RESUME_URL" }
    });
    const resumeUrl = resumeSetting?.value || "#";

    // 3. Send Email Notification
    if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "netheshkumark@gmail.com",
        subject: `New Resume Download: ${data.name}`,
        text: `You have a new resume download request.\n\nName: ${data.name}\nEmail: ${data.email}\nPurpose: ${data.purpose}\nMessage: ${data.message || 'N/A'}\n\nThey have been provided the resume link automatically.`,
      };

      await transporter.sendMail(mailOptions);
    }

    return { success: true, resumeUrl };
  } catch (err) {
    console.error("Failed to process resume request:", err);
    return { success: false, error: "Failed to process resume request" };
  }
}

export async function deleteResumeRequest(id: string) {
  try {
    await prisma.resumeRequest.delete({
      where: { id }
    });
    revalidatePath("/admin/resume-requests");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete resume request" };
  }
}
