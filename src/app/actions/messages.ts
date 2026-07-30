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
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
          },
        });

        const recipient = process.env.EMAIL_TO || process.env.EMAIL_USER;
        const htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1b2e; color: #e8f4f8; border-radius: 12px; overflow: hidden; border: 1px solid #37B7C3;">
            <div style="background: linear-gradient(135deg, #088395, #37B7C3); padding: 24px 32px;">
              <h1 style="margin: 0; color: #fff; font-size: 22px;">📩 New Portfolio Message</h1>
              <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">Someone reached out via your contact form</p>
            </div>
            <div style="padding: 28px 32px; background: #071952;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #88aabb; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 90px;">Name</td><td style="padding: 8px 0; color: #e8f4f8; font-weight: bold;">${data.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #88aabb; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td><td style="padding: 8px 0; color: #37B7C3;"><a href="mailto:${data.email}" style="color: #37B7C3;">${data.email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #88aabb; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</td><td style="padding: 8px 0; color: #e8f4f8;">${data.subject || "N/A"}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 16px; background: rgba(55,183,195,0.08); border-left: 3px solid #37B7C3; border-radius: 4px;">
                <p style="margin: 0 0 8px; color: #88aabb; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                <p style="margin: 0; color: #e8f4f8; line-height: 1.6; white-space: pre-wrap;">${data.content}</p>
              </div>
              <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
                <a href="mailto:${data.email}" style="display: inline-block; padding: 10px 24px; background: linear-gradient(135deg, #088395, #37B7C3); color: #fff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: bold;">Reply to ${data.name}</a>
              </div>
            </div>
            <div style="padding: 12px 32px; background: #040e20; text-align: center;">
              <p style="margin: 0; color: #4a6070; font-size: 12px;">Portfolio Contact Form • netheshkumar.dev</p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: recipient,
          replyTo: data.email,
          subject: `📩 New Message: ${data.subject || data.name}`,
          text: `New message from ${data.name} (${data.email})\n\nSubject: ${data.subject || "N/A"}\n\nMessage:\n${data.content}`,
          html: htmlBody,
        });
      } catch (emailErr) {
        console.error("Failed to send message notification email:", emailErr);
      }
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
