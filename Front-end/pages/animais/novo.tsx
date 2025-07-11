import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@/services/api';
import Navbar from '@/components/navbar';

type Usuario = {
  id: number;
  nome: string;
};

export default function NovoAnimal() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [idade, setIdade] = useState<number>(0);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const router = useRouter();

  // Buscar usuários ao carregar o componente
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await api.get<Usuario[]>('/usuarios');
        setUsuarios(response.data);
        if (response.data.length > 0) {
          setUsuarioId(response.data[0].id); // seleciona o primeiro usuário por padrão
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }

    fetchUsuarios();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!usuarioId) {
      alert('Selecione um usuário.');
      return;
    }

    await api.post('/animais', { nome, especie, idade, usuarioId });
    router.push('/animais');
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Cadastrar Novo Animal</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div>
            <label>Espécie:</label>
            <input value={especie} onChange={e => setEspecie(e.target.value)} required />
          </div>
          <div>
            <label>Idade:</label>
            <input
              type="number"
              value={idade}
              onChange={e => setIdade(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label>Usuário:</label>
            <select
              value={usuarioId ?? ''}
              onChange={e => setUsuarioId(Number(e.target.value))}
              required
            >
              {usuarios.map(u => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </main>
    </>
  );
}
