# Latest News — Frontend

Home responsiva em Next.js 16, React 19 e TypeScript, baseada nas telas **V2 — Home** e **V2 — Home · Mobile** do [Doop](http://localhost:4400/c/0-aEfmGzf5).

```sh
npm install
npm run dev
```

## Organização

- `app/page.tsx`: Server Component que compõe a home.
- `app/_components/`: componentes exclusivos da home; estado no cliente apenas para temas da lateral e prévia.
- `app/globals.css`: estilos e tokens compartilhados, com medidas em rem.
- `data/articles.ts`: consulta server-side à API .NET, validação do retorno e adaptação para a interface.
- `data/demo-articles.ts`: conteúdo da referência usado quando não existe configuração de API.
- `lib/articles.ts`: tipos compartilhados.
- `public/images/`: imagens locais da referência; créditos no rodapé.

Sem Server Actions e sem shadcn. A consulta usa `fetch` no servidor; não é necessário adicionar TanStack Query para esta home. Componentes de futuras rotas devem ficar na pasta `_components` da própria rota, seguindo o padrão do helpdesk-lab.

## API .NET

Para conectar aos dados reais, copie `.env.example` para `.env.local` e defina:

```dotenv
API_BASE_URL=http://localhost:5221
```

Reinicie o Next.js. A home consulta `GET /api/Articles` a cada requisição, com timeout de oito segundos. A origem permanece no servidor, sem exigir CORS no navegador. Não inclua `/api` na variável.

No ambiente local deste projeto, a API redireciona HTTP para HTTPS com certificado de desenvolvimento .NET. Com Node 24, habilite os certificados já confiáveis do Windows antes de iniciar o frontend:

```powershell
$env:NODE_USE_SYSTEM_CA = "1"
npm run dev
```

Isso mantém a validação HTTPS ativa. O certificado precisa estar previamente confiável no Windows. Em produção, utilize a origem HTTPS da API com um certificado público válido.

Contrato atual: `id`, `title`, `imageUrl`, `createdAt`, `levels: [{ id, level, text }]`. O primeiro nível fornece o resumo da listagem. Categorias e áudio ainda não existem nesse contrato e não são inventados para artigos reais. Uma falha da API mostra erro com opção de tentar novamente; uma lista vazia mostra o estado vazio, sem substituir os resultados por dados de demonstração.

Sem `API_BASE_URL`, a home apresenta os cinco artigos da referência. Os temas da lateral filtram a listagem; clicar novamente no tema selecionado restaura todos os artigos.

## Escopo desta etapa

A home inclui cabeçalho, cards, guia de leitura, temas na lateral e rodapé. “Read article” abre uma prévia acessível em diálogo nativo; quando conectado à API, permite alternar entre os textos dos níveis retornados. Os dados de demonstração possuem somente o resumo do design. Reprodução de áudio, página completa do artigo e área administrativa ficam para as próximas etapas; o botão administrativo permanece desabilitado.

```sh
npm run lint
npm run build
```
