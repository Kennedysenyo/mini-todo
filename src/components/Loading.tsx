

export const Loading = () => {
  return (
    <div className=" w-full flex flex-col justify-center items-center bg-gray-200">
      <div className="animate-bounce text-lavender text-2xl font-bold mb-4">Loading ToDos...</div>
      <div className="flex space-x-2">
        <span className="h-3 w-3 bg-lavender rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
        <span className="h-3 w-3 bg-lavender rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
        <span className="h-3 w-3 bg-lavender rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
      </div>
    </div>
  );
}
