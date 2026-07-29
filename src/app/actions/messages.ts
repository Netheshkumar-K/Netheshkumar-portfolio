"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import nodemailer from "nodemailer";

export async function getMessages() {
  return await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function sendMessage(data: {
  name: string;
  email: string;
  subject?: string;
  content: string;
}) {
  try {
    await prisma.message.create({
      data,
    });
    
    // Send Email Notification
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
        subject: `New Portfolio Message: ${data.subject || 'No Subject'}`,
        text: `You have a new message from your portfolio contact form.\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject || 'N/A'}\n\nMessage:\n${data.content}`,
      };

      await transporter.sendMail(mailOptions);
    }

    revalidatePath("/admin/messages");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to send message" };
  }
}

export async function deleteMessage(id: string) {
  try {
    await prisma.message.delete({
      where: { id }
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete message" };
  }
}

export async function toggleMessageRead(id: string, isRead: boolean) {
  try {
    await prisma.message.update({
      where: { id },
      data: { isRead }
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to toggle read status" };
  }
}
