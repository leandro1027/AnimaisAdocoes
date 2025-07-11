// pages/adocoes/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/services/api';
import Navbar from '@/components/navbar';

interface Animal {
  id: number;
  nome: string;
  adotado: boolean;
}

export default function EditarAdocao() {
  const router = useRouter();
  const { id } = router.query;

  const [adotante, setAdotante] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [animalId, setAnimalId] = useState<number | null>(null);
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!id) return;

    // Busca dados da adoção atual
    api.get(`/adocoes/${id}`).then(res => {
      setAdotante(res.data.adotante);
      setObservacoes(res.data.observacoes);
      setAnimalId(res.data.animalId); // precisa vir no DTO do back
    });

    // Busca animais disponíveis (inclui o que está nessa adoção atual)
    api.get('/animais').then(res => {
      setAnimais(res.data);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!animalId || !adotante.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      await api.put(`/adocoes/${id}`, {
        animalId,
        adotante,
        observacoes,
      });
      router.push('/adocoes');
    } catch (err: any) {
      setErro(err.response?.data?.message || 'Erro ao atualizar adoção.');
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Editar Adoção</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Animal:</label>
            <select value={animalId ?? ''} onChange={e => setAnimalId(Number(e.target.value))}>
              {animais.map(a => (
                <option key={a.id} value={a.id}>
                  {a.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Nome do Adotante:</label>
            <input
              type="text"
              value={adotante}
              onChange={e => setAdotante(e.target.value)}
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

          <button type="submit">Salvar Alterações</button>
        </form>
      </main>
    </>
  );
}
