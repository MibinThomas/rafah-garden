"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file uploaded" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const publicPath = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(publicPath, filename);

    // Ensure uploads directory exists
    try {
      await mkdir(publicPath, { recursive: true });
    } catch (e) {
      // Ignore if directory exists
    }
    
    await writeFile(filePath, buffer);

    return { success: true, url: `/uploads/${filename}` };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Failed to upload image" };
  }
}
