"use client";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  label: string;
}

export const SubmitButton = (props : ButtonProps) => {

  const { pending } =  useFormStatus();

  return <button
  className="bg-lavender p-4 mt-6 text-white text-xl cursor-pointer border-r-2 border-b-4 rounded active:bg-white capitalize active:text-lavender hover:shadow-lg"
  type="submit"
  disabled={pending}
>
  {pending ? "Loading..." : props.label}
</button>

}