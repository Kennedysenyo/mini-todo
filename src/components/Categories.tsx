"use client";
import { useState } from "react"

const categories  = ["all", "home", "school", "projects", "personal"];

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  
  const categoryElements = categories.map((cat, index) => (
    <button 
      key={index}
      className={`p-4 sm:text-md capitalize  shadow-lg w-25 cursor-pointer  transition-shadow duration-300 border-b-2 border-r-2  ${activeIndex === index ? "bg-lavender text-white border-white hover:shadow-xl" : "bg-white text-lavender border-lavender shadow-md"}`}
      onClick={() => (
        setActiveIndex(index)
      )}
    >
      {cat}
    </button>
  )) 
  

  return (
    <div className="flex flex-wrap justify-center sm:w-[690px] gap-3 p-4 border-r-3 border-b-4 border-lavender bg-gray-100">
      {categoryElements}
    </div>
  )
}