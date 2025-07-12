import Link from 'next/link';
import React from 'react';

const navStyle: React.CSSProperties = {
  padding: '1rem 2rem',
  backgroundColor: '#eee',
  display: 'flex',
  gap: '500px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const linkStyle: React.CSSProperties = {
  color: '#333',
  textDecoration: 'none',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'color 0.3s ease',
};

const linkHoverStyle = {
  color: '#0070f3',
  textDecoration: 'underline',
};

export default function Navbar() {
  // Para hover inline, precisa de estado ou usar onMouseEnter/onMouseLeave
  // Vou fazer simples com state para um exemplo rápido:

  const [hovered, setHovered] = React.useState<string | null>(null);

  function handleMouseEnter(link: string) {
    setHovered(link);
  }
  function handleMouseLeave() {
    setHovered(null);
  }

  return (
    <nav style={navStyle}>
      <Link
        href="/usuarios"
        style={hovered === 'usuarios' ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
        onMouseEnter={() => handleMouseEnter('usuarios')}
        onMouseLeave={handleMouseLeave}
      >
        Usuários
      </Link>
      <Link
        href="/animais"
        style={hovered === 'animais' ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
        onMouseEnter={() => handleMouseEnter('animais')}
        onMouseLeave={handleMouseLeave}
      >
        Animais
      </Link>
      <Link
        href="/adocoes"
        style={hovered === 'adocoes' ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
        onMouseEnter={() => handleMouseEnter('adocoes')}
        onMouseLeave={handleMouseLeave}
      >
        Adoções
      </Link>
    </nav>
  );
}
