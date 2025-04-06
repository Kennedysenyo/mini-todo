"use client"
import { notFound, useSearchParams } from "next/navigation";
import { getTodoById, updateTodo, TodoTypeError } from "@/actions/todo";
import { useEffect, useState, useActionState } from "react";
import { CategoryType } from "@/actions/todo";
import { Loading } from "@/components/Loading";
import NotFound from "../not-found";


interface TodoType {
  id: number,
  title: string;
  category: CategoryType,
  createdAt: Date | null
}

export default function EditPage() {

  const searchParams = useSearchParams();
  const id = searchParams.get("todo");
  
  if (id === "" || id === null) {
    notFound()
  }

  const initialState: TodoTypeError = {
    errors: {},
    success: false,
  }

  const [state, formAction, isPending] = useActionState(
    updateTodo.bind(null, parseInt(id)),
    initialState,
  )


  const [todo, setTodo] = useState<TodoType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  
  
  useEffect(() => {
    const fetchTodo = async() => {
      try {
        setLoading(true)
        const data = await getTodoById(parseInt(id))
        if (!data) notFound()
        setTodo(data)
        setLoading(false)

      } catch (error) {
        console.error(error)
      }finally {
        setLoading(false)
      }
    }
    fetchTodo()
  }, [id])
  
  if (loading) {
    return (
      <main className="h-screen bg-gray-200 flex flex-col items-center p-4 pt-10 gap-5">
      <h1 className="text-2xl font-bold text-[#A483C2] text-center">Edit Todo</h1>
    <Loading />
    </main>
    )
  }

  return (
    <main className="h-screen bg-gray-200 flex flex-col items-center p-4 pt-10 gap-5">
      <h1 className="text-2xl font-bold text-[#A483C2] text-center">Edit Todo</h1>
     {todo.length === 0 ? 
     <NotFound />
      : 
      <form action={formAction} className="bg-white p-4 w-4/5 sm:w-[429px] border-r-3 border-b-4 border-lavender flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <label className="text-xl text-lavender" htmlFor="title">Todo:</label>
        <input className="border border-lavender p-4 text-[#A483C2]" id="title" name="title" type="text" defaultValue={todo[0].title} />
        {state.errors.title}
      </div>
      
      <div className="flex flex-col gap-4">
        <label className="text-xl text-lavender" htmlFor="category">Select Category:</label>
        <select className="border border-lavender p-4 text-[#A483C2]" id="category" name="category" defaultValue={todo[0].category}>
          <option value="home">Home</option>
          <option value="school">School</option>
          <option value="projects">Projects</option>
          <option value="personal">Personal</option>
        </select>
      </div>

      <button className="bg-lavender p-4 mt-10 text-white text-xl cursor-pointer border-r-2 border-b-4 active:bg-white active:text-lavender hover:shaldow-lg" type="submit">Save</button>
    </form>
      }
    </main>
  )
}