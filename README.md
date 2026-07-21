# Texas Uniformes — Site institucional

Redesign do site institucional da Texas Uniformes (fabricação de uniformes sob encomenda desde 1995, Ananindeua/PA). Next.js 16 (App Router, Cache Components) + Tailwind CSS v4 + Sanity CMS (Studio embutido em `/studio`).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). O site funciona **sem nenhuma variável de ambiente configurada** — todo o conteúdo (textos, imagens, depoimentos, FAQ) vem de um fallback local (`src/lib/content/fallback-data.ts`) com imagens placeholder geradas em `public/placeholders/`.

## Conectando o CMS (Sanity)

Enquanto as variáveis abaixo não forem definidas, o site usa o conteúdo placeholder e o painel em `/studio` mostra uma tela pedindo configuração — isso é esperado.

1. Copie `.env.local.example` para `.env.local`
2. Crie um projeto gratuito em [sanity.io/manage](https://www.sanity.io/manage) (ou rode `npx sanity login` e `npx sanity init` a partir desta pasta)
3. Preencha `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` no `.env.local`
4. Acesse `/studio` — o painel do Sanity deve carregar normalmente
5. (Opcional) Para popular o projeto com o mesmo conteúdo placeholder do site, gere um token de escrita em manage.sanity.io (API → Tokens → Editor), exporte como `SANITY_API_WRITE_TOKEN` e rode:
   ```bash
   node scripts/seed-sanity.mjs
   ```

Assim que o Sanity estiver configurado, qualquer conteúdo publicado no Studio passa a substituir automaticamente o placeholder correspondente (o fallback só é usado para o que ainda não foi preenchido).

## Envio de leads (formulário de orçamento)

Sem `RESEND_API_KEY`, o formulário funciona normalmente e o lead é logado no servidor, mas nenhum e-mail é enviado. Para ativar o envio:

1. Crie uma conta em [resend.com](https://resend.com) e gere uma API key
2. Preencha `RESEND_API_KEY` no `.env.local` (e `LEAD_EMAIL_TO` / `LEAD_EMAIL_FROM` se quiser mudar os padrões)

## Estrutura

- `src/app/(site)/` — páginas do site (Home, Empresa, Clientes, Contato, 4 páginas de segmento)
- `src/app/studio/` — Sanity Studio embutido (layout próprio, sem header/footer do site)
- `src/app/api/lead/` — recebe o formulário de orçamento e envia por e-mail via Resend
- `src/components/` — componentes de UI e seções reutilizáveis
- `src/lib/content/` — camada de dados: usa Sanity se configurado, senão cai no fallback local
- `studio/schemaTypes/` — schemas do Sanity (segmento, depoimento, logo de cliente, FAQ, configurações do site)
- `scripts/generate-placeholders.mjs` — gera as imagens placeholder em `public/placeholders/`
- `scripts/seed-sanity.mjs` — popula um projeto Sanity vazio com o mesmo conteúdo placeholder

## Deploy

Repositório conectado à Vercel — cada push em `main` gera um deploy automático. Configure as variáveis de ambiente acima no painel do projeto na Vercel (Settings → Environment Variables) para ativar CMS e envio de e-mail em produção.
