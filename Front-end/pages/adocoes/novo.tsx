// pages/adocoes/novo.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@/services/api';
import Navbar from '@/components/navbar';

interface Animal {
  id: number;
  nome: string;
  adotado: boolean;
}

export default function NovaAdocao() {
  const router = useRouter();
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [animalId, setAnimalId] = useState<number>();
  const [adotante, setAdotante] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get('/animais').then(res => {
      const disponiveis = res.data.filter((a: Animal) => !a.adotado);
      setAnimais(disponiveis);
      if (disponiveis.length > 0) setAnimalId(disponiveis[0].id);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    if (!animalId) {
      setErro('Selecione um animal.');
      return;
    }
    if (!adotante.trim()) {
      setErro('Informe o nome do adotante.');
      return;
    }

    try {
      await api.post('/adocoes', { animalId, adotante, observacoes });
      router.push('/adocoes');
    } catch (err: any) {
      setErro(err.response?.data?.message || 'Erro ao criar adoção.');
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Nova Adoção</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Animal:</label>
            <select value={animalId} onChange={e => setAnimalId(Number(e.target.value))}>
              {animais.map(a => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Nome do Adotante:</label>
            <input
              type="text"
              value={adotante}
              onChange={e => setAdotante(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Observações:</label>
            <textarea
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
            />
          </div>

          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          <button type="submit">Cadastrar Adoção</button>
        </form>
      </main>
    </>
  );
}
