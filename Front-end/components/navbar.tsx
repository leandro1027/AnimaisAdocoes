// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <Link href="/usuarios" style={{ marginRight: 15 }}>Usuários</Link>
      <Link href="/animais" style={{ marginRight: 15 }}>Animais</Link>
      <Link href="/adocoes">Adoções</Link>
    </nav>
  );
}
