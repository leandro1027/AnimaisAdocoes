import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/services/api';
import Navbar from '@/components/navbar';

interface Animal {
  id: number;
  nome: string;
  especie: string;
  idade: number;
  adotado: boolean;
}

export default function ListaAnimais() {
  const [animais, setAnimais] = useState<Animal[]>([]);

  useEffect(() => {
    api.get('/animais').then(res => setAnimais(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Lista de Animais</h2>
        <Link href="/animais/novo">➕ Novo Animal</Link>
        <ul>
          {animais.map(animal => (
            <li key={animal.id}>
              <strong>{animal.nome}</strong> ({animal.especie}, {animal.idade} anos)
              {' '}
              {animal.adotado ? '✅ Adotado' : '❌ Não adotado'}
              {' '}
              <Link href={`/animais/${animal.id}`}>✏️ Editar</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
