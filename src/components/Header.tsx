import Link from "next/link";

export const Header = () => {
  return (
    <header className="p-5 flex justify-center bg-[#C5BAFF] relative border-b border-white shadow-md">
      <h1 className="text-3xl text-white font-bold">ToDo</h1>
      <Link href="/" className="absolute top-6 left-3 text-white text-center">KenCoding</Link>
    </header>
  )
}