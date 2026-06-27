# DocEngine

DocEngine é um conversor de arquivos moderno, gratuito, acessível e simples de usar. Ele foi pensado também para idosos, com texto grande, botões grandes, alto contraste e um fluxo direto:

1. Escolher arquivo
2. Escolher formato
3. Baixar

## Privacidade

O objetivo principal do DocEngine é converter arquivos no navegador do usuário sempre que tecnicamente possível.

- Nenhum arquivo é enviado para servidor por padrão.
- Nenhum arquivo é salvo após a conversão.
- Nenhum histórico de conversão é criado.
- Não há login.
- Não há banco de dados.
- Não há cookies.
- Não há localStorage ou sessionStorage.
- Não há analytics, tracking, telemetria, Sentry, PostHog, Google Analytics ou Vercel Analytics.
- Não há banner de cookies porque o app não usa cookies.

A interface deixa claro: **Seus arquivos não saem do seu dispositivo.**

## Funcionalidades iniciais

### Imagens

- JPG para PNG
- PNG para JPG
- WEBP para PNG/JPG
- PNG/JPG para WEBP
- Redimensionar imagem
- Comprimir imagem
- Remover metadados quando possível via recriação em Canvas

### PDF

- Extrair páginas específicas de PDF
- Imagem para PDF
- Base modular para expandir juntar PDFs, separar páginas e PDF para imagens

### OCR

- OCR de imagem para TXT com Tesseract local em Web Worker
- Idiomas iniciais: português, alemão e inglês
- OCR de PDF escaneado é sinalizado como limitado nesta versão

### Áudio e vídeo

- MP4 para MP3
- MP4 para GIF
- MOV para MP4 quando possível
- WAV para MP3 quando possível
- Corte simples por parâmetros avançados
- Usa ffmpeg.wasm em Web Worker, carregado apenas quando necessário

### Documentos

- DOCX para TXT
- DOCX para HTML simples
- TXT para PDF
- Markdown para PDF
- Markdown para HTML

DOCX para PDF perfeito não é prometido no navegador sem LibreOffice.

## Limitações do navegador

Conversões pesadas dependem do dispositivo do usuário. Arquivos grandes de vídeo, PDFs muito extensos e OCR podem consumir muita memória, demorar ou falhar. Quando isso acontece, o app mostra mensagens simples, por exemplo:

> Esse arquivo é grande demais para converter no navegador. Tente um arquivo menor.

Se uma conversão exigir servidor para funcionar bem, ela deve ficar indisponível na versão privada hospedada na Vercel.

## Arquitetura

Os conversores ficam em `src/lib/converters`.

Cada conversor declara:

- formatos de entrada
- formatos de saída
- se roda no navegador
- tamanho recomendado máximo
- dependências
- função `convert(file, options)`

O registro central fica em `src/lib/converters/registry.ts`. A interface mostra apenas conversões disponíveis para o tipo de arquivo enviado.

## Segurança

- Conteúdo de arquivo não é executado como código.
- HTML gerado é sanitizado com DOMPurify.
- Não há `dangerouslySetInnerHTML` na interface.
- Tamanhos são limitados por tipo de conversão.
- URLs criadas com `URL.createObjectURL` são revogadas.
- Headers de segurança e CSP são configurados em `next.config.ts`.

## Instalação local

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Verificação

```bash
npm run lint
npm run test
npm run build
```

## Deploy na Vercel

1. Envie o repositório para GitHub, GitLab ou Bitbucket.
2. Importe o projeto na Vercel.
3. Use as configurações padrão de Next.js.
4. Faça deploy.

Não é necessário configurar banco de dados, autenticação ou variáveis de ambiente.

## Roadmap

- Juntar múltiplos PDFs no navegador
- Separar PDF página por página
- Renderizar PDF para imagens
- OCR completo de PDF escaneado por página
- HTML para PDF simples com melhor paginação
- Mais idiomas de OCR
- Testes de interface e acessibilidade

## Licença

MIT
