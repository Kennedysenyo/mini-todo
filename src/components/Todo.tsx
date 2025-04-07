import { FiTrash2, FiEdit3,} from "react-icons/fi";
import Link from "next/link";

interface TodoProps {
  id: number
  title: string 
  handleDelete: (id: number) => void;
}

export const Todo = (props: TodoProps) => {
  return (
    <div 
      className="bg-white p-5 border-r-2 border-b-3 border-lavender shadow-lg flex flex-col items-center mx-auto w-4/5 relative"
    >
      
        <button 
          onClick={() => props.handleDelete(props.id)}
          className="absolute top-0 right-0 cursor-pointer ">
          <FiTrash2 color="pink" size={24} />
        </button>
      
      <p className="text-lavender text-xl font-bold text-center">{props.title}</p>
      <Link href={`/edit?todo=${props.id}`} className="absolute bottom-0 left-0 cursor-pointer">
        <FiEdit3 color="#A483C2" size={24} />
      </Link>
    </div>
  )
}