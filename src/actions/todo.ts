"use server";
import { db } from "@/db";
import { todosTable } from "@/db/schema";
import { redirect } from "next/navigation";

type CategeoryType = "home" | "school" | "projects" | "personal";

interface TodoType{
  title?: string;
  category?: CategeoryType;
}

export interface TodoTypeError {
  errors: TodoType;
  success: boolean;
}

export async function createTodo(prevSate: TodoTypeError, formData: FormData) {
  const title = formData.get("title") as string;
  const categoryValue = formData.get("category");
  const category: CategeoryType = ["home", "school", "projects", "personal"].includes(categoryValue as CategeoryType)
    ? (categoryValue as CategeoryType)
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
  redirect("/")
}