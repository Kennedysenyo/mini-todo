
import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const todoCategory = pgEnum("todo_category",["home", "school", "projects", "personal"])


export const todosTable = pgTable("todos_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: todoCategory("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})