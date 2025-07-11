import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@/services/api';
import Navbar from '@/components/navbar';

export default function EditarUsuario() {
  const router = useRouter();
  const { id } = router.query;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!id) return;

    api.get(`/usuarios/${id}`).then(res => {
      setNome(res.data.nome);
      setEmail(res.data.email);
      setTelefone(res.data.telefone || '');
      setEndereco(res.data.endereco || '');
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    if (!nome.trim() || !email.trim()) {
      setErro('Nome e email são obrigatórios.');
      return;
    }

    try {
      await api.put(`/usuarios/${id}`, { nome, email, telefone, endereco });
      router.push('/usuarios');
    } catch (err: any) {
      setErro(err.response?.data?.message || 'Erro ao atualizar usuário.');
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Editar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input value={nome} onChange={e => setNome(e.target.value)} required />
          </div>

          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div>
            <label>Telefone:</label>
            <input value={telefone} onChange={e => setTelefone(e.target.value)} />
          </div>

          <div>
            <label>Endereço:</label>
            <input value={endereco} onChange={e => setEndereco(e.target.value)} />
          </div>

          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          <button type="submit">Salvar</button>
        </form>
      </main>
    </>
  );
}
