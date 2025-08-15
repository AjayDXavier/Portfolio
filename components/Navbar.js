"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#" className="font-bold">Ajay</a>
        <div className="flex gap-6 text-sm">
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#projects" className="hover:text-blue-600">Projects</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </nav>
  );
}
