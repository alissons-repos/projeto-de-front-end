# Projeto de Front End

> Repositório reservado para a criação do Projeto Integrado de Front-End do curso de Análise e Desenvolvimento de Sistemas do IESB.

## Descrição

**Meu Amigo PET** é uma plataforma online cujo objetivo principal é conectar usuários, sejam eles pais de PETs ou aspirantes ao cargo. Os usuários cadastrados podem criar novas postagens, acessar o "feed" da comunidade e interagir com as demais postagens de modo a obter informações relevantes sobre eventos de PETs, adoção de novos amigos peludos e, quem sabe, até encontrar um possível parceiro para nossos amiguinhos.

O Back-End da aplicação foi construído com Node.js, Express.js, MongoDB e outros pacotes de terceiros disponibilizados pelo NPM (vide arquivo [**package.json**](server/package.json) do diretório **_/server_**).

Já o Front-End foi construído com React.js, React Router, Bootstrap e pacotes de terceiros disponibilizados pelo NPM (vide arquivo [**package.json**](client/package.json) do diretório **_/client_**).

server/package.json

O projeto está armazenado no [GitHub](https://github.com/alissons-repos/projeto-de-front-end) e foi gerenciado com o auxílio de ferramentas disponibilizadas pela própria plataforma, como Issues e Projects.

## Instalação e Inicialização

1. Clone o repositório do projeto em sua máquina local

```bash
git clone https://github.com/alissons-repos/projeto-de-front-end.git
```

2. Em terminais diferentes, navegue até os diretórios **_/server_** e **_/client_**

```bash
cd /projeto-de-front-end/server
cd /projeto-de-front-end/client
```

3. Instale as dependências em cada um dos diretórios abertos

```bash
npm install
```

4. No diretório **_/server_**, execute o servidor localmente

```bash
npm run dev
```

5. No diretório **_/client_**, inicie a aplicação e acesse a URL indicado

```bash
npm run dev
```

### Colaboradores:

-   Alisson Silva dos Santos - 2214290086
-   André Luís Costa Bandeira Coêlho - 2124290028
-   Gabriel Bueno de Sousa - 2214290057
-   Pedro Henrique da Silveira Rocha - 2124290005

### Variáveis de Ambiente (.env):

```
ACCESS_TOKEN_SECRET = 40acffd68adb0b6e95ffd2859abd93c60aa0010220875f41355b72ecb7a8440a35b95bfb3bbaaa6319973469d397a05cb2bf102ccada8e9d40c86ec783fcb7f4

REFRESH_TOKEN_SECRET = ae0ef388b6890282575bef76d44486fafce3a9768f8050bd73423831172d2e23b03ffcf1c937615d133da0bdd58ac528f7df7d64a056c7d56e5708eab15ef322

DATABASE_URL = mongodb+srv://<>:<>@thecluster.rf7trvj.mongodb.net/Meu-Amigo-PET-2?retryWrites=true&w=majority

PORT = 3500
```
