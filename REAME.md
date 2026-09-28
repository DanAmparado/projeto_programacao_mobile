# Projeto React Native - 1º Bimestre

Aplicativo mobile desenvolvido em **React Native** com **Expo SDK 54** para a disciplina de Desenvolvimento Mobile da FATEC Franca.

**Integrante:**
- Daniel Lemos Amparado Junior

---

## Sobre o projeto

Aplicação mobile com 4 telas que simula um sistema de login, cadastro de usuário e visualização de cards com dados consumidos da **PokéAPI**.

### Funcionalidades

- **Tela de Login**: autentica o usuário com base no cadastro salvo localmente (e-mail ou CPF + senha).
- **Tela de Cadastro**: cadastra nome, telefone, CPF, e-mail, curso e senha, com validação de todos os campos.
- **Tela de Cards**: exibe cards de Pokémons com imagem, nome (em português e inglês), HP e tipos. Permite buscar, adicionar, filtrar por tipo, ver detalhes e excluir.
- **Tela de Detalhes**: mostra informações completas do Pokémon selecionado (altura, peso, tipos, habilidades e status base).

---

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| React Native | Framework principal |
| Expo SDK 54 | Ambiente de desenvolvimento |
| React Navigation (Native Stack) | Navegação entre telas |
| AsyncStorage | Persistência local dos dados do usuário |
| PokéAPI | Fonte de dados dos cards |
| JavaScript (ES6+) | Linguagem |

---

## API utilizada

**PokéAPI** — https://pokeapi.co/

API pública, gratuita e sem necessidade de chave de acesso. Fornece dados completos sobre o universo Pokémon (nome, imagem, tipos, status, habilidades, altura, peso, etc.).

### Endpoints utilizados

- `GET /pokemon/{nome_ou_id}` — busca um Pokémon específico.
- `GET /pokemon?limit=100000&offset=0` — lista completa (para busca e sugestões).
- `GET /type/{tipo}` — lista os Pokémons de um determinado tipo.
- `GET /pokemon-species/{id}` — tradução do nome para pt-BR.

---

## Estrutura do projeto
```
ProjetoInicial/
├── App.js
├── app.json
├── package.json
├── README.md
└── src/
├── screens/
│ ├── LoginScreen.js
│ ├── CadastroScreen.js
│ ├── CardsScreen.js
│ └── DetalhesScreen.js
├── services/
│ ├── storage.js (AsyncStorage)
│ └── pokeapi.js (integração com a PokéAPI)
├── utils/
│ └── validacoes.js (validação de CPF, e-mail, telefone)
└── styles.js (estilos globais)´
```

---

## Como executar o projeto

### Pré-requisitos

- **Node.js** (versão 18 ou superior): https://nodejs.org/
- **Expo Go** instalado no celular:
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
  - iOS: https://apps.apple.com/app/expo-go/id982107779
- Celular e computador na **mesma rede Wi-Fi**

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/DanAmparado/projeto_programacao_mobile
cd projeto_programacao_mobile
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o Servidor de Desenvolvimento:

```bash
npx expo start
```
4. Abra o app no celular:

Android: abra o Expo Go e escaneie o QR Code exibido no terminal.

iOS: abra a câmera nativa do iPhone e escaneie o QR Code.

Se o QR Code não funcionar (redes restritivas, como Wi-Fi de faculdade), use:

    ```bash
    npx expo start --tunnel
    ```

Fluxo de uso

1. Primeiro acesso: toque em CADASTRAR USUÁRIO.

2. Preencha os campos. CPF e telefone são formatados automaticamente e validados.

3. Toque em SALVAR — os dados são salvos localmente via AsyncStorage.

4. Volte à tela de Login e entre com e-mail (ou CPF) e a senha cadastrada.

5. Na tela de Cards:

    * Use a barra de busca para procurar por nome ou número (ex: pikachu ou 25).

    * Toque em BUSCAR para adicionar um card.

    * Toque em ALEATÓRIO para adicionar um Pokémon aleatório.

    * Use os chips de tipo para filtrar por fogo, água, etc.

    * Toque em VER MAIS DETALHES para abrir a tela de detalhes.

    * Toque em EXCLUIR para remover um card.

6. Toque em SAIR no canto superior direito para encerrar a sessão.

---

Observações

* A persistência é feita com AsyncStorage (equivalente ao LocalStorage no mobile).

* A senha é armazenada em texto puro apenas para fins acadêmicos. Em produção, deve ser feito hash + autenticação em servidor.

* A PokéAPI tem os nomes apenas em inglês; a tradução para pt-BR é obtida via endpoint pokemon-species e armazenada em cache local para otimizar as requisições.

---

Licença

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Mobile — FATEC Franca, 2026.