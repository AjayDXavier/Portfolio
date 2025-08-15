"use client";

export default function Footer() {
  return (
    <footer className="py-6 border-t bg-white">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-600">
        <span>© {new Date().getFullYear()} Ajay Domnic Xavier</span>
        <a href="#" className="hover:text-blue-600">Back to top ↑</a>
      </div>
    </footer>
  );
}
