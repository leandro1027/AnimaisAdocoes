import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/services/api';
import Navbar from '@/components/navbar';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
}

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    api.get('/usuarios').then(res => setUsuarios(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Usuários</h2>
        <Link href="/usuarios/novo">➕ Novo Usuário</Link>
        <ul>
          {usuarios.map(u => (
            <li key={u.id}>
              <strong>{u.nome}</strong> ({u.email}) — {u.telefone || '-'} — {u.endereco || '-'}{' '}
              <Link href={`/usuarios/${u.id}`}>✏️ Editar</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
