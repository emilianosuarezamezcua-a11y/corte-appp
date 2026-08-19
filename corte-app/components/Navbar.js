export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="font-semibold text-lg">Corte App</a>
        <div className="flex gap-6 text-sm">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/docs" className="hover:text-blue-600">Docs</a>
        </div>
      </div>
    </nav>
  );
}
