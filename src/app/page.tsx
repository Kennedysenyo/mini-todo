"use client"
import { Categories } from "@/components/Categories";
import { Todo } from "@/components/Todo";
import { FiPlusSquare } from "react-icons/fi"
import Link from "next/link";
import { getTodos, SortCategoryType } from "@/actions/todo";
import { useState, useEffect } from "react";
import { Loading } from "@/components/Loading";
import { NoTodos } from "@/components/NoTodos";
import { useSearchParams } from "next/navigation";
import { deleteTodo } from "@/actions/todo";


interface Todo {
  id: number,
  title: string,
  category: "home" | "school" | "projects" | "personal",
  createdAt: Date | null
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const refresh = searchParams.get("refresh")

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true)
      try {
        const todosData = await getTodos("all");
        setTodos(todosData);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching todos:", error);
      }finally {
        setLoading(false)
      }
    };

    fetchTodos();
  }, [refresh]);

  async function handleDelete(id: number) {
    const originalTodos = [...todos];
   try {
    setTodos( prev => prev.filter(todo => todo.id !== id))
    await deleteTodo(id)
   }catch (error) {
    console.error("Failed to delete todo",error);
    setTodos(originalTodos)
   }
  }

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
    <Todo key={todo.id} id={todo.id} title={todo.title} handleDelete={handleDelete} />
  ))

  return (
   <main className={`min-h-dvh bg-gray-200 flex flex-col items-center p-4` }>
    <div className="relative">
      <Categories selectCategory={handleCategories} />

      <Link className="absolute -bottom-15 right-0 bg-lavender active:bg-white border-r-2 border-b-3 border-lavender" href="/create"><FiPlusSquare color="white" size={40} /></Link>
    </div>

    <div className={`p-5 pt-20 ${ loading || todoElements.length === 0 ? "flex flex-wrap justify-center" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} gap-6 mx-auto`}>

      {loading ? <Loading /> : todoElements.length === 0 ? <NoTodos /> : todoElements}
    </div>
   </main>
  );
}
