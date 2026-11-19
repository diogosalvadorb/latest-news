# Latest News — Frontend

Home responsiva em Next.js 16, React 19 e TypeScript, baseada nas telas **V2 — Home** e **V2 — Home · Mobile** do [Doop](http://localhost:4400/c/0-aEfmGzf5).

```sh
npm install
npm run dev
```

## Organização

- `app/page.tsx`: Server Component que compõe a home.
- `app/_components/`: componentes exclusivos da home; estado no cliente apenas para busca e filtros.
- `app/globals.css`: estilos e tokens compartilhados, com medidas em rem.
- `data/articles.ts`: consulta server-side à API .NET, validação do retorno e adaptação para a interface.
- `data/demo-articles.ts`: conteúdo da referência usado quando não existe configuração de API.
- `lib/articles.ts`: tipos compartilhados.
- `public/images/`: imagens locais da referência; créditos no rodapé.

Sem Server Actions e sem shadcn. A consulta usa `fetch` no servidor; não é necessário adicionar TanStack Query para esta home. Componentes de futuras rotas devem ficar na pasta `_components` da própria rota, seguindo o padrão do helpdesk-lab.

## API .NET

A instalação local já está configurada em `.env.local` para consumir a API .NET. Para configurar outro ambiente, copie `.env.example` para `.env.local` e defina:

```dotenv
API_BASE_URL=https://localhost:7014
```

Reinicie o Next.js. A home consulta `GET /api/Articles` a cada requisição, com timeout de oito segundos. A origem permanece no servidor, sem exigir CORS no navegador. Não inclua `/api` na variável.

Use Node.js 24. Os comandos `npm run dev` e `npm start` usam `--use-system-ca` para confiar nos certificados já confiáveis do Windows, incluindo o certificado de desenvolvimento .NET. Não é necessário desativar a validação HTTPS. Alternativamente, ao iniciar o Next.js diretamente:

```powershell
$env:NODE_USE_SYSTEM_CA = "1"
npm run dev
```

Isso mantém a validação HTTPS ativa. O certificado precisa estar previamente confiável no Windows. Em produção, utilize a origem HTTPS da API com um certificado público válido.

Contrato atual: `id`, `title`, `category`, `imageUrl`, `createdAt`, `levels: [{ id, level, text }]`. O primeiro nível fornece o resumo da listagem. Categorias são strings livres vindas do backend; os filtros são gerados a partir dos valores retornados. Categoria vazia não gera filtro. O contrato ainda não expõe áudio. Uma falha da API mostra erro com opção de tentar novamente; uma lista vazia mostra o estado vazio, sem substituir os resultados por dados de demonstração.

Sem `API_BASE_URL`, a home apresenta os cinco artigos da referência. A busca funciona junto com a categoria selecionada. “All articles” remove o filtro de categoria e “Clear filters” limpa a busca e a categoria. Em telas pequenas, todos os temas ficam acessíveis por rolagem horizontal.

## Escopo desta etapa

A home inclui cabeçalho, busca, filtros, cards, guia de leitura, temas na lateral e rodapé. O título e “Read article” navegam para `/articles/{id}`. A página é um Server Component que consulta `GET /api/Articles/{id}` em `data/articles.ts`, com componentes específicos em `app/articles/[id]/_components/`. Basic e Advanced exibem os textos retornados pelo backend; também há ajuste de fonte. IDs inválidos ou ausentes mostram a página de artigo não encontrado; falhas da API mostram erro com opção de tentar novamente. O player de áudio é apenas visual, com botões desativados e sem reprodução, busca de arquivo de áudio ou síntese de voz. A área administrativa continua fora desta etapa. Os dados de demonstração possuem somente o resumo do design.

```sh
npm run lint
npm run build
```
