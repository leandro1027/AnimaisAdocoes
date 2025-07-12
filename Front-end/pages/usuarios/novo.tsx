import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/services/api';
import Navbar from '@/components/navbar';
import './styles/novousuario.css';

export default function NovoUsuario() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [erro, setErro] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    if (!nome.trim() || !email.trim()) {
      setErro('Nome e email são obrigatórios.');
      return;
    }

    try {
      await api.post('/usuarios', { nome, email, telefone, endereco });
      router.push('/usuarios');
    } catch (err: any) {
      setErro(err.response?.data?.message || 'Erro ao criar usuário.');
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Novo Usuário</h2>
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

          <button type="submit">Criar</button>
        </form>
      </main>
    </>
  );
}
