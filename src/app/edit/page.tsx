



export default function EditPage() {
  return (
    <main className="h-screen bg-gray-200 flex flex-col items-center p-4 pt-10 gap-5">
      <h1 className="text-2xl font-bold text-[#A483C2] text-center">Edit Todo</h1>
      <form className="bg-white p-4 w-4/5 sm:w-[429px] border-r-3 border-b-4 border-lavender flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <label className="text-xl text-lavender" htmlFor="title">Todo:</label>
          <input className="border border-lavender p-4 text-[#A483C2]" id="title" name="title" type="text" />
        </div>
        
        <div className="flex flex-col gap-4">
          <label className="text-xl text-lavender" htmlFor="category">Select Category:</label>
          <select className="border border-lavender p-4 text-[#A483C2]" id="category" name="category">
            <option value="home">Home</option>
            <option value="school">School</option>
            <option value="project">Project</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        <button className="bg-lavender p-4 mt-10 text-white text-xl cursor-pointer border-r-2 border-b-4 active:bg-white active:text-lavender hover:shaldow-lg" type="submit">Add</button>
      </form>
    </main>
  )
}