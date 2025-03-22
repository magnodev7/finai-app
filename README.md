# FinAI - Seu Assistente Financeiro Inteligente

## Configuração do Ambiente

### Variáveis de Ambiente

Para executar este projeto, você precisará configurar algumas variáveis de ambiente. Siga os passos abaixo:

1. Copie o arquivo `.env.example` para um novo arquivo chamado `.env`:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e preencha com suas credenciais:

```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:3000
VITE_HYPERBOLIC_API_URL=seu_url_hyperbolic
VITE_HYPERBOLIC_API_KEY=sua_chave_hyperbolic

# Backend Environment Variables
DATABASE_URL=sua_url_do_banco_de_dados
JWT_SECRET=sua_chave_secreta_jwt

# API Keys
OPENAI_API_KEY=sua_chave_openai
```

⚠️ **IMPORTANTE: Nunca comite o arquivo `.env` no repositório. Ele contém informações sensíveis e já está incluído no `.gitignore`.**

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/magnodev7/finai-app.git
cd finai-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente conforme descrito acima.

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Tecnologias Utilizadas

- React + TypeScript
- Vite
- TailwindCSS
- React Query
- Zustand
- React Router DOM
- Recharts
- Headless UI

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── hooks/         # Hooks personalizados
├── services/      # Serviços e APIs
└── styles/        # Estilos globais
```

## Segurança

- Todas as chaves de API e credenciais sensíveis devem ser armazenadas em variáveis de ambiente
- Nunca comite arquivos `.env` no repositório
- Use o arquivo `.env.example` como template para as variáveis necessárias
- Mantenha suas chaves de API seguras e não as compartilhe

## Contribuindo

1. Crie um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.