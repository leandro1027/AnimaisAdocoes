import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import Navbar from '@/components/navbar';

export default function EditarAnimal() {
  const router = useRouter();
  const { id } = router.query;

  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [idade, setIdade] = useState<number>(0);
  const [adotado, setAdotado] = useState(false);

  useEffect(() => {
    if (!id) return;

    api.get(`/animais/${id}`).then(res => {
      const animal = res.data;
      setNome(animal.nome);
      setEspecie(animal.especie);
      setIdade(animal.idade);
      setAdotado(animal.adotado);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await api.put(`/animais/${id}`, {
      nome,
      especie,
      idade,
      adotado,
    });

    router.push('/animais');
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Editar Animal</h2>
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
            <label>Adotado:</label>
            <input
              type="checkbox"
              checked={adotado}
              onChange={e => setAdotado(e.target.checked)}
            />
          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
      </main>
    </>
  );
}
