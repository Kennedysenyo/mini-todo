import { Categories } from "@/components/Categories";
import { Todo } from "@/components/Todo";
import { FiPlusSquare } from "react-icons/fi"
import Link from "next/link";
import { getTodos } from "@/actions/todo";


interface Todo {
  id: number,
  title: string,
  category: "home" | "school" | "projects" | "personal",
  createdAt: Date | null
}

export default async function Home() {

  const todos: Todo[] = await getTodos()
  const todoElements = todos.map(todo => (
    <Todo key={todo.id} id={todo.id} title={todo.title} />
  ))

  return (
   <main className="h-screen bg-gray-200 flex flex-col items-center p-4 ">
    <div className="relative">
      <Categories />
      <Link className="absolute -bottom-15 right-0 bg-lavender active:bg-white border-r-2 border-b-3 border-lavender" href="/create"><FiPlusSquare color="white" size={40} /></Link>
    </div>

    <div className="p-5 pt-20 flex flex-wrap justify-center sm:justify-start w-full">
      {todoElements}
    </div>
   </main>
  );
}
