"use client"
import { useActionState, useEffect } from "react"
import { createTodo, TodoTypeError } from "@/actions/todo";
import { redirect, useRouter } from "next/navigation";
import { SubmitButton } from "@/components/SubmitButton";

export default function CreatePage() {

  const router = useRouter();

  const initialState: TodoTypeError = {
    errors: {},
    success: false,
  }

  const [state, formAction, isPending] = useActionState(
    createTodo,
    initialState
  )
  
  useEffect(() => {
    if(state.success) {
      router.replace("/?refresh=true"); // adds the param
      router.back();
    }
  }, [state.success])

  return (
    <main className=" bg-gray-200 flex flex-col items-center p-4 pt-10 gap-5">

      <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4">
      
        <form action={formAction} className="bg-white w-full max-w-md  p-6 rounded-xl shadow-lg border-b-[6px]  border-r-[4px] border-lavender flex flex-col gap-5 relative">

        <button
          onClick={() => router.back()}
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-rose-500 text-xl"
        >
          ✕
        </button>

          <h1 className="text-2xl font-bold text-[#A483C2] text-center"> Intercepted Add Todo</h1>
          <div className="flex flex-col gap-4">
            <label className="text-xl text-lavender" htmlFor="title">Todo:</label>
            <input className="border border-lavender p-4 text-xl text-[#A483C2]" id="title" name="title" type="text" placeholder="create a personal website..." />
            {<p className="text-red-500">{state.errors.title}</p>}
          </div>
          
          <div className="flex flex-col gap-4">
            <label className="text-xl text-lavender" htmlFor="category">Select Category:</label>
            <select className="border border-lavender p-4 text-[#A483C2]" id="category" name="category" defaultValue={"home"}>
              <option value="home">Home</option>
              <option value="school">School</option>
              <option value="projects">Projects</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          <SubmitButton label="Add" />
        </form>
      </div>
    </main>
  )
}