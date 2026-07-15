# ReelForge - Setup Checklist

## ✅ Completado

- [x] Projeto Next.js criado com TypeScript + Tailwind
- [x] Estrutura de pastas criada
- [x] Autenticação NextAuth.js (email/senha + Google/GitHub)
- [x] Homepage com seções de features e pricing
- [x] Páginas de signin/signup
- [x] Dashboard com abas (Criar Vídeo + Meus Vídeos)
- [x] Tipos TypeScript definidos
- [x] Configuração Supabase
- [x] API route para geração de vídeos (stub)
- [x] Schema do banco de dados SQL
- [x] Build bem-sucedido

## 📝 Próximos Passos

### 1. **Configurar Supabase** 🔑
- [ ] Criar conta em supabase.com
- [ ] Criar novo projeto
- [ ] Executar script SQL (config/database.sql)
- [ ] Copiar URL e ANON_KEY para .env.local
- [ ] Testar conexão

### 2. **Configurar OAuth** 🔐
- [ ] Google: criar app em Google Cloud Console
- [ ] GitHub: criar OAuth app em GitHub settings
- [ ] Adicionar credenciais no .env.local
- [ ] Testar login social

### 3. **Integração Replicate API** 🎬
- [ ] Criar conta em replicate.com
- [ ] Copiar API token
- [ ] Adicionar no .env.local
- [ ] Implementar chamada real na API (app/api/generate-video/route.ts)
- [ ] Testar geração de vídeos

### 4. **Implementar Funcionalidades**
- [ ] Upload de foto (câmera + arquivo)
- [ ] Geração de vídeos com os 4 estilos
- [ ] Salvar vídeos no Supabase Storage
- [ ] Listar vídeos do usuário
- [ ] Sistema de favoritos
- [ ] Tags/categorização

### 5. **Sistema de Pagamento** 💳
- [ ] Integrar Stripe
- [ ] Criar webhooks para pagamentos
- [ ] Atualizar limite de vídeos por plano
- [ ] Criar página de checkout

### 6. **Melhorias UI/UX**
- [ ] Animações e transições
- [ ] Loading states
- [ ] Error handling
- [ ] Toast notifications
- [ ] Responsive design mobile

### 7. **Deployment** 🚀
- [ ] Setup no Vercel
- [ ] Configurar variáveis de ambiente
- [ ] Deploy automático no GitHub
- [ ] Testar em produção

## 🔧 Variáveis de Ambiente Necessárias

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
REPLICATE_API_TOKEN=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## 🎯 Arquivos Importantes

- `app/page.tsx` - Homepage
- `app/auth/signin/page.tsx` - Login
- `app/auth/signup/page.tsx` - Cadastro
- `app/dashboard/page.tsx` - Dashboard principal
- `app/api/generate-video/route.ts` - API de geração
- `app/api/auth/[...nextauth]/route.ts` - Autenticação
- `src/lib/supabase.ts` - Cliente Supabase
- `config/database.sql` - Schema do banco

## 🚀 Rodar Localmente

```bash
# Instalar dependências
npm install

# Configure .env.local com suas credenciais

# Rodar servidor de desenvolvimento
npm run dev

# Acessar em http://localhost:3000
```

## 💡 Dicas

- Use `npm run build` para testar build de produção
- Use `npm run lint` para verificar code quality
- Supabase oferece 500MB grátis - suficiente para MVP
- Replicate oferece créditos iniciais para testar
- Vercel é gratuito para projetos pessoais

---

**Status**: MVP básico criado e compilando. Próximo: Configurar Supabase e OAuth.
