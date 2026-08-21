# Texas Uniformes — Site institucional

Site institucional da Texas Uniformes, construído com Next.js 16, Tailwind CSS v4 e Supabase. O conteúdo é gerido pelo painel interno em `/admin`.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Sem as variáveis do Supabase, o site usa o conteúdo de apoio em `src/lib/content/fallback-data.ts`.

## Configurando o CMS

1. Copie `.env.local.example` para `.env.local`.
2. No Supabase, em **Settings → API**, informe `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Aplique as migrações: `supabase db push --linked`.
4. Acesse `/admin/login` com um usuário que tenha perfil `admin` ou `editor` em `public.profiles`.

O banco contém configurações gerais, linhas de produto, benefícios, galerias, FAQs, logos, depoimentos e a biblioteca pública `site-media` para imagens. As quatro linhas de produto existentes já são carregadas pelas migrações iniciais.

## Estrutura

- `src/app/(site)/` — páginas públicas
- `src/app/(admin)/` e `src/app/(admin-auth)/` — painel administrativo e autenticação
- `src/lib/content/` — leitura pública do conteúdo do Supabase, com fallback local
- `src/lib/supabase/` — clientes e proteção de rotas
- `supabase/migrations/` — banco, regras de acesso e conteúdo inicial

## Deploy

Configure as variáveis do Supabase no provedor de hospedagem antes do deploy. O usuário autenticado precisa ter o papel adequado em `public.profiles`; o acesso ao painel e às políticas de escrita do banco é protegido por RLS.
