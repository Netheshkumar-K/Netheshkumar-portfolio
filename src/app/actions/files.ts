"use server";

import fs from "fs";
import path from "path";

export async function getPublicFiles() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) return [];
    
    const files = fs.readdirSync(publicDir);
    return files.filter((file) => {
      const stat = fs.statSync(path.join(publicDir, file));
      return !stat.isDirectory();
    });
  } catch (error) {
    console.error("Failed to read public files", error);
    return [];
  }
}

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicDir = path.join(process.cwd(), "public");
    
    // Create public dir if it somehow doesn't exist
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext);
    const uniqueFileName = `${baseName}-${Date.now()}${ext}`;

    const filePath = path.join(publicDir, uniqueFileName);
    fs.writeFileSync(filePath, buffer);
    
    return { success: true, fileName: uniqueFileName, url: `/${uniqueFileName}` };
  } catch (error) {
    console.error("Failed to upload file", error);
    return { success: false, error: "Failed to upload file" };
  }
}

export async function deleteFile(fileName: string) {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const safeName = fileName.startsWith("/") ? fileName.replace("/", "") : fileName;
    
    // Prevent directory traversal attacks
    if (safeName.includes("..") || safeName.includes("/")) {
       return { success: false, error: "Invalid file name" };
    }

    const filePath = path.join(publicDir, safeName);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { success: true };
    }
    return { success: false, error: "File not found" };
  } catch (error) {
    console.error("Failed to delete file", error);
    return { success: false, error: "Failed to delete file" };
  }
}
