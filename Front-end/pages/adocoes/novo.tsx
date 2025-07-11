import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@/services/api';
import Navbar from '@/components/navbar';

interface Animal {
  id: number;
  nome: string;
  adotado: boolean;
}

interface Usuario {
  id: number;
  nome: string;
}

export default function NovaAdocao() {
  const router = useRouter();
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [animalId, setAnimalId] = useState<number>();
  const [adotanteId, setAdotanteId] = useState<number>();
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarDados() {
      try {
        const resAnimais = await api.get('/animais');
        const disponiveis = resAnimais.data.filter((a: Animal) => !a.adotado);
        setAnimais(disponiveis);
        if (disponiveis.length > 0) setAnimalId(disponiveis[0].id);

        const resUsuarios = await api.get('/usuarios');
        setUsuarios(resUsuarios.data);
        if (resUsuarios.data.length > 0) setAdotanteId(resUsuarios.data[0].id);
      } catch (error) {
        setErro('Erro ao carregar dados.');
      }
    }

    carregarDados();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    if (!animalId) {
      setErro('Selecione um animal.');
      return;
    }
    if (!adotanteId) {
      setErro('Selecione um adotante.');
      return;
    }

    const adotanteSelecionado = usuarios.find(u => u.id === adotanteId);
    if (!adotanteSelecionado) {
      setErro('Adotante inválido.');
      return;
    }

    try {
      await api.post('/adocoes', {
        animalId,
        adotante: adotanteSelecionado.nome, // envia o nome esperado pelo backend
        observacoes,
      });
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
            <label>Adotante:</label>
            <select value={adotanteId} onChange={e => setAdotanteId(Number(e.target.value))}>
              {usuarios.map(u => (
                <option key={u.id} value={u.id}>{u.nome}</option>
              ))}
            </select>
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
