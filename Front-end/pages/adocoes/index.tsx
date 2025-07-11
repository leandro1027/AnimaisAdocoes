// pages/adocoes/index.tsx
import { useEffect, useState } from 'react';
import api from '@/services/api';
import Navbar from '@/components/navbar';
import Link from 'next/link';

interface Adocao {
  id: number;
  adotante: string;
  dataAdocao: string;
  observacoes?: string;
  animal: {
    nome: string;
    especie: string;
  };
}

export default function ListaAdocoes() {
  const [adocoes, setAdocoes] = useState<Adocao[]>([]);

  useEffect(() => {
    api.get('/adocoes').then(res => setAdocoes(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Adoções</h2>
        <Link href="/adocoes/novo">➕ Nova Adoção</Link>
        <ul>
          {adocoes.map(adocao => (
            <li key={adocao.id}>
              <strong>{adocao.animal.nome} ({adocao.animal.especie})</strong> adotado por <em>{adocao.adotante}</em> em {new Date(adocao.dataAdocao).toLocaleDateString()}
              {' '}
              <Link href={`/adocoes/${adocao.id}`}>✏️ Editar</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
