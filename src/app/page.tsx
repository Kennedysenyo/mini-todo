"use client"
import { Categories } from "@/components/Categories";
import { Todo } from "@/components/Todo";
import { FiPlusSquare } from "react-icons/fi"
import Link from "next/link";
import { getTodos, SortCategoryType } from "@/actions/todo";
import { useState, useEffect } from "react";
import { Loading } from "@/components/Loading";
import { NoTodos } from "@/components/NoTodos";


interface Todo {
  id: number,
  title: string,
  category: "home" | "school" | "projects" | "personal",
  createdAt: Date | null
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  console.log(todos)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true)
      try {
        const todosData = await getTodos("all");
        setTodos(todosData);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleCategories = async (category: SortCategoryType) => {
    try {
      setLoading(true)
      const filteredTodos = await getTodos(category);
      setTodos(filteredTodos);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching filtered todos:", error);
    }
  };

  const todoElements = todos.map(todo => (
    <Todo key={todo.id} id={todo.id} title={todo.title} />
  ))

  return (
   <main className="h-screen bg-gray-200 flex flex-col items-center p-4 ">
    <div className="relative">
      <Categories selectCategory={handleCategories} />

      <Link className="absolute -bottom-15 right-0 bg-lavender active:bg-white border-r-2 border-b-3 border-lavender" href="/create"><FiPlusSquare color="white" size={40} /></Link>
    </div>

    <div className="p-5 pt-20 flex flex-wrap justify-center md:justify-start gap-6 w-full">
      {loading ? <Loading /> : todoElements.length === 0 ? <NoTodos /> : todoElements}
    </div>
   </main>
  );
}
