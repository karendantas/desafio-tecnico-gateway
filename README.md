# Desafio Gateway

Este repositório contém a solução do desafio técnico da **Digital Gateway**.

## Como rodar

1. Clone o repositório

   ```bash
      https://github.com/karendantas/desafio-tecnico-gateway.git
   ```

2. Instale as dependências

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```
4. Adicione um `.env` com a url
   
   ```bash
   EXPO_PUBLIC_GRAPHQL_URL=url_API
   ```
   
## Observação importante!

No primeiro carregamento do app pode aparecer o erro abaixo.
Caso isso aconteça, basta recarregar o aplicativo.

Esse erro vem do Android, que ainda não oferece suporte nativo ao BlurView.
Para alcançar o efeito visual do Figma, utilizei a prop experimental: `experimentalBlurMethod="dimezisBlurView"`

![alt text](image.png)

## Demonstração



https://github.com/user-attachments/assets/7a136325-e8b8-48be-83b8-1e464d3a6875


## Decisões técnicas

### Sobre a autenticação

- Utilização de um AuthContext para centralizar:
  - login
  - logout
  - cadastro
  - dados do usuário
  - gerenciamento de token
  - Armazenamento de dados sensíveis com expo-secure-store, por ser mais seguro que o async-storage.

- Redirecionamento e proteção de rotas feitos no \_layout.tsx, separando:
  - telas públicas (auth)
  - telas privadas (app)

### Comunicação com a API

- Utilização do Apollo Client, biblioteca recomendada para GraphQL, com excelente suporte ao React Native.
- Uso de useQuery e useMutation para gerenciamento automático, loading e erros.

- Tratativas de erros
  - Usei os metodos de OnCompleted e OnError que o próprio apollo oferece para criar
    Alerts de sucesso ou erro.

- Estados de loading e telas de carregamento para melhor usabilidade para o usuário

- Componentes e estilizações
  Optei pelo `StyleSheet` padrão do React Native.

  Em projetos maiores ou em bare workflow, libs como `react-native-unistyles` podem ser adotadas para melhor performance e escalabilidade dos estilos.

## O que faria com mais tempo

- Melhorar validação de formulários usando zod + react-hook-form
- Melhorar usabilidade com KeyboardAvoidingView
- Buscar alternativas mais estáveis para efeitos de blur no Android
- Refinar o grid de imagens
- Criar um theme de cores para melhor padronização visual
- Melhorar efeitos visuais de loading e listas vazias
- Usar `zustand` para controle de estados globais e storage
