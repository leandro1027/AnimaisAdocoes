# 🐶🐱 AnimaisAdocoes

Este repositório contém um sistema simples para cadastro, gerenciamento e adoção de animais resgatados. O projeto foi desenvolvido utilizando tecnologias modernas no padrão full stack, com o objetivo de aprendizagem.

## ✨ Funcionalidades

- Cadastro de usuários
- Cadastro e gerenciamento de animais resgatados
- Sistema de adoção com vínculo entre animal e adotante
---

## 🧰 Tecnologias Utilizadas

### Front-end:
- React
- Next.js
- Tailwind CSS

### Back-end:
- NestJS
- TypeScript
- Prisma ORM

### Banco de Dados:
- SQLite (modo desenvolvimento)

---

## 🗂 Estrutura do Projeto

AnimaisAdocoes/
├── Front-end/ # Interface do usuário
│ ├── pages/ # Páginas do Next.js
│ ├── components/ # Componentes reutilizáveis
│ └── styles/ # Estilização com Tailwind
│
├── Back-end/ # API e regras de negócio
│ ├── src/
│ │ ├── modules/ # Módulos da aplicação (usuarios, animais, adocoes)
│ │ └── prisma/ # Configuração do Prisma ORM
│ └── main.ts # Ponto de entrada do NestJS
│
└── prisma/ # Migrations e schema.prisma
---

## ▶️ Como Rodar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/leandro1027/AnimaisAdocoes.git
cd AnimaisAdocoes
