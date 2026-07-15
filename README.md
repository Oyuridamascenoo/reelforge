# ReelForge - Gerador de Vídeos de Produtos com IA

Crie vídeos profissionais para seus produtos usando inteligência artificial. Perfeito para vendas no TikTok Shop.

## 🚀 Features

- ✅ Gere 4+ estilos diferentes de vídeos
- ✅ Upload de foto via câmera ou arquivo
- ✅ Geração em tempo real ou background
- ✅ Histórico completo com favoritos e tags
- ✅ Autenticação com email/senha + Google/GitHub
- ✅ 3 planos de assinatura
- ✅ Dashboard completo

## 📋 Planos

| Plano | Preço | Vídeos/mês | Estilos |
|---|---|---|---|
| **Starter** | R$29 | 50 | 2 |
| **Pro** | $79 | 100 | 4 |
| **Enterprise** | $120 | Ilimitado | ∞ |

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Setup Local

1. Clone e instale dependências:
```bash
npm install
```

2. Configure o `.env.local`:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave

# Replicate AI
REPLICATE_API_TOKEN=seu_token

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Google OAuth
GOOGLE_CLIENT_ID=seu_id
GOOGLE_CLIENT_SECRET=seu_secret

# GitHub OAuth
GITHUB_CLIENT_ID=seu_id
GITHUB_CLIENT_SECRET=seu_secret
```

3. Configure o banco de dados:
```bash
# Execute o SQL em config/database.sql no Supabase
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
reelforge/
├── app/
│   ├── api/                    # API routes
│   ├── auth/                   # Páginas de autenticação
│   ├── dashboard/              # Dashboard principal
│   ├── layout.tsx              # Layout global
│   ├── page.tsx                # Homepage
│   └── providers.tsx           # Providers (NextAuth)
├── src/
│   ├── components/             # Componentes React
│   ├── lib/                    # Utilitários (Supabase, etc)
│   ├── types/                  # Tipos TypeScript
│   └── hooks/                  # Custom hooks
├── config/
│   └── database.sql            # Schema do banco
└── .env.local                  # Variáveis de ambiente
```

## 🔧 Tecnologias

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: NextAuth.js
- **IA**: Replicate API, Runway ML
- **Deployment**: Vercel

## 📝 Próximos Passos

- [ ] Integrar Replicate API para geração real de vídeos
- [ ] Implementar sistema de pagamento (Stripe)
- [ ] Adicionar upload direto no TikTok Shop
- [ ] Analytics e estatísticas
- [ ] Mobile app
- [ ] Sistema de notificações

## 📧 Contato

Para dúvidas ou sugestões, entre em contato via email.
