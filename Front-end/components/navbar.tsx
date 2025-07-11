import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-start gap-6">
        <Link href="/usuarios" className="hover:text-blue-200 font-medium transition">
          Usuários
        </Link>
        <Link href="/animais" className="hover:text-blue-200 font-medium transition">
          Animais
        </Link>
        <Link href="/adocoes" className="hover:text-blue-200 font-medium transition">
          Adoções
        </Link>
      </div>
    </nav>
  );
}
