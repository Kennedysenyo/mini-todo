"use client";
import { useState } from "react"
import { SortCategoryType } from "@/actions/todo";

const categories: SortCategoryType[] = ["all", "home", "school", "projects", "personal"];

interface CategoriesProp {
  selectCategory: (category: SortCategoryType) => void ;
}

export const Categories = (props: CategoriesProp) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  
  const categoryElements = categories.map((cat, index) => (
    <button 
      key={index}
      className={`p-4 sm:text-md capitalize  shadow-lg w-25 cursor-pointer  transition-shadow duration-300 border-b-2 border-r-2  ${activeIndex === index ? "bg-lavender text-white border-white hover:shadow-xl" : "bg-white text-lavender border-lavender shadow-md"}`}
      onClick={() =>{
        setActiveIndex(index)
        props.selectCategory(cat )
      }}
    >
      {cat}
    </button>
  )) 
  

  return (
    <div className="flex flex-wrap justify-center sm:w-[630px] gap-3 p-4 border-r-3 border-b-4 border-lavender bg-gray-100">
      {categoryElements}
    </div>
  )
}