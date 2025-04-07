"use server";
import { db } from "@/db";
import { todosTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type CategoryType = "home" | "school" | "projects" | "personal";

export type SortCategoryType = "all" | "home" | "school" | "projects" | "personal"


interface TodoType{
  title?: string;
  category?: CategoryType;
}

export interface TodoTypeError {
  errors: TodoType;
  success: boolean;
}

// Create a todo
export async function createTodo(prevSate: TodoTypeError, formData: FormData) {
  const title = formData.get("title") as string;
  const categoryValue = formData.get("category");
  const category: CategoryType = ["home", "school", "projects", "personal"].includes(categoryValue as CategoryType)
    ? (categoryValue as CategoryType)
    : "home";

  const errors: TodoType = {};

  if (!title) { 
    errors.title= "Todo is required!";
  }
  
  if (Object.keys(errors).length !== 0) {
    return {
      errors,
      success: false
    }
  }

  await db.insert(todosTable).values({title, category})
  
  revalidatePath("/")
  return {errors: {}, success: true}
}


// Get all or categorized todos
export async function getTodos(category: SortCategoryType) {
  if ( category === "all" ) {
    const res =  await db.select().from(todosTable)
    return res
  }
  const res = await db.select().from(todosTable).where(eq(todosTable.category, category))
  return res;
}

// Get todo by id
export async function getTodoById(id: number) {
  const todo = await db.select().from(todosTable).where(eq(todosTable.id, id))
  return todo
} 

// Update Todo
export async function updateTodo(id: number, prevState: TodoTypeError, formData: FormData) {
  const title = formData.get("title")?.toString().trim() || "";
  const categoryValue = formData.get("category");
  const category: CategoryType = ["home", "school", "projects", "personal"].includes(categoryValue as CategoryType)
    ? (categoryValue as CategoryType)
    : "home";

  const errors: TodoType = {};
  if (!title) {
    errors.title = "Todo is required!";
  }

  if (Object.keys(errors).length !== 0) {
    return { errors, success: false };
  }

  const updatedTodo = await db
    .update(todosTable)
    .set({ title, category })
    .where(eq(todosTable.id, id))
    .returning();

  if (!updatedTodo) {
    return { errors: {}, success: false };
  }

  revalidatePath("/");
  return { errors: {}, success: true };
}


// Delete a todo 
export async function deleteTodo(id: number) {
  await db.delete(todosTable).where(eq(todosTable.id, id));
}