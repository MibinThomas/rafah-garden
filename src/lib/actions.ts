"use server";

import { writeFile, readFile } from "fs/promises";
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
    const publicPath = path.join(process.cwd(), "public", "uploads", filename);

    // Ensure uploads directory exists (In a production environment, you might use fs.mkdirSync)
    await writeFile(publicPath, buffer);

    return { success: true, url: `/uploads/${filename}` };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Failed to upload image" };
  }
}

const CONTENT_PATH = path.join(process.cwd(), "src/lib/site-content.json");
const PRODUCTS_PATH = path.join(process.cwd(), "src/lib/data.json");
const SETTINGS_PATH = path.join(process.cwd(), "src/lib/settings.json");
const ORDERS_PATH = path.join(process.cwd(), "src/lib/orders.json");
const ENQUIRIES_PATH = path.join(process.cwd(), "src/lib/enquiries.json");
const BLOG_PATH = path.join(process.cwd(), "src/lib/blog.json");
const NEWS_PATH = path.join(process.cwd(), "src/lib/news.json");
const USERS_PATH = path.join(process.cwd(), "src/lib/users.json");

// --- Generic Module Actions ---

async function readJson(filePath: string) {
  const file = await readFile(filePath, "utf8");
  return JSON.parse(file);
}

async function writeJson(filePath: string, data: any) {
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

// --- Specific Actions ---

export async function getSettings() { return await readJson(SETTINGS_PATH); }
export async function updateSettings(settings: any) { return await updateEntity(SETTINGS_PATH, settings, "/admin/settings"); }

export async function getOrders() { return await readJson(ORDERS_PATH); }
export async function updateOrder(order: any) { return await updateEntity(ORDERS_PATH, order, "/admin/orders"); }

export async function getEnquiries() { return await readJson(ENQUIRIES_PATH); }
export async function updateEnquiry(enquiry: any) { return await updateEntity(ENQUIRIES_PATH, enquiry, "/admin/enquiries"); }

export async function getBlogPosts() { return await readJson(BLOG_PATH); }
export async function updateBlogPost(post: any) { return await updateEntity(BLOG_PATH, post, "/admin/blog"); }
export async function deleteBlogPost(id: string) { return await deleteEntity(BLOG_PATH, id, "/admin/blog"); }

export async function getNews() { return await readJson(NEWS_PATH); }
export async function updateNewsItem(item: any) { return await updateEntity(NEWS_PATH, item, "/admin/news"); }
export async function deleteNewsItem(id: string) { return await deleteEntity(NEWS_PATH, id, "/admin/news"); }

export async function getUsers() { return await readJson(USERS_PATH); }
export async function updateUser(user: any) { return await updateEntity(USERS_PATH, user, "/admin/users"); }
export async function deleteUser(id: string) { return await deleteEntity(USERS_PATH, id, "/admin/users"); }

async function updateEntity(filePath: string, updatedEntity: any, revalidate: string) {
  try {
    const data = await readJson(filePath);
    const index = data.findIndex((item: any) => item.id === updatedEntity.id);
    if (index === -1) {
      data.push(updatedEntity);
    } else {
      data[index] = updatedEntity;
    }
    await writeJson(filePath, data);
    revalidatePath(revalidate);
    return { success: true };
  } catch (error) {
    console.error(`Failed to update ${filePath}:`, error);
    return { success: false, error: "Failed to save" };
  }
}

async function deleteEntity(filePath: string, id: string, revalidate: string) {
  try {
    const data = await readJson(filePath);
    const filtered = data.filter((item: any) => item.id !== id);
    await writeJson(filePath, filtered);
    revalidatePath(revalidate);
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete from ${filePath}:`, error);
    return { success: false, error: "Failed to delete" };
  }
}

// --- Product Actions ---

export async function getProducts(): Promise<Array<{ id: string; [key: string]: unknown }>> {
  const file = await readFile(PRODUCTS_PATH, "utf8");
  return JSON.parse(file);
}

export async function updateProduct(product: { id: string; [key: string]: unknown }) {
  try {
    const products = await getProducts();
    const index = products.findIndex((p) => p.id === product.id);

    if (index === -1) {
      products.push(product);
    } else {
      products[index] = product;
    }

    await writeFile(PRODUCTS_PATH, JSON.stringify(products, null, 2), "utf8");
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath(`/shop/${product.id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const products = await getProducts();
    const filtered = products.filter((p) => p.id !== id);
    await writeFile(PRODUCTS_PATH, JSON.stringify(filtered, null, 2), "utf8");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

// --- Site Content Actions ---

export async function getSiteContent(): Promise<Record<string, unknown>> {
  const file = await readFile(CONTENT_PATH, "utf8");
  return JSON.parse(file);
}

export async function updateSiteContent(content: unknown) {
  try {
    await writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf8");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/site-content");
    return { success: true };
  } catch (error) {
    console.error("Failed to update site content:", error);
    return { success: false, error: "Failed to update site content" };
  }
}
