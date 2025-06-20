# 🗣️ Curso de Idiomas Admin (Frontend)

Este projeto é a interface de administração do sistema de cursos de idiomas, desenvolvido com Angular e baseado no template gratuito **CoreUI**. Ele consome uma **API REST** construída com Spring Boot para gerenciar **alunos** e **turmas**.

> 📡 API REST: [Repositório Backend](https://github.com/chiarelli/CursoIdiomasAPI)

---

## 🔧 Tecnologias Utilizadas

* Angular 19
* CoreUI Angular (versão gratuita)
* TypeScript
* RxJS
* ngx-mask
* Docker + Dev Containers
* Integração com [Cursos de Idiomas API (Spring Boot)](https://github.com/chiarelli/CursoIdiomasAPI)

---

## 📦 Funcionalidades

* Cadastro e edição de alunos
* Cadastro e edição de turmas
* Listagem paginada de alunos e turmas
* Matrícula e desmatrícula de alunos nas turmas
* Visualização de detalhes do aluno e da turma
* Validação de CPF e máscaras de formulário
* Feedback visual de sucesso e erro

---

## ▶️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/chiarelli/CursoIdiomasWeb
cd CursoIdiomasWeb
```

### 2. Rodar via Docker (modo self-contained)

Este comando **executa o frontend Angular e a API backend Spring Boot** (caso backend esteja incluído no compose):

```bash
npm run self-contained -- up -d
```

> Este comando usa o arquivo `docker/docker-compose.yml` para subir a aplicação em ambiente de desenvolvimento.

> Na primeira vez de execução, este comando fará o download e o build das imagens. Tenha paciência, pois pode demorar de 3 a 5 minutos o processo.

O projeto estará disponível em:
📍 [http://localhost:4200](http://localhost:4200)

Documentação interativa disponível via Swagger:
📍 [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## 🧪 Rodando em modo Dev via VSCode + Dev Containers

Se você deseja utilizar um ambiente isolado via Dev Containers, siga os passos abaixo:

### 1. Requisitos

* Docker instalado
* VSCode
* Extensão [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### 2. Clonar o projeto e abrir no VSCode

```bash
git clone https://github.com/chiarelli/CursoIdiomasWeb
cd CursoIdiomasWeb
code .
```

### 3. Abrir no container

Clique em **“Reopen in Container”** quando o VSCode sugerir.

> O ambiente já está pré-configurado com Node.js e Angular CLI.

### 4. Rodar o projeto

No terminal do Dev Container:

```bash
npm install
npm run dev
```

---

## 🌐 Integração com a API

Este projeto se comunica diretamente com a API REST criada no backend:

🔗 [https://github.com/chiarelli/CursoIdiomasAPI](https://github.com/chiarelli/CursoIdiomasAPI)

As URLs, headers e regras de negócio seguem o contrato da API:

* Paginação automática de listagens
* Matrícula e desmatrícula por rota específica (`/secretaria`)
* Regras de negócio validadas tanto no frontend quanto no backend

---

## 🖼️ Layout e Design

O layout é baseado no [CoreUI Angular Template (versão gratuita)](https://coreui.io/angular/), adaptado com:

* Cards para visualização
* Tabelas com paginação
* Formulários com validações reativas
* Componentes reutilizáveis

---

## ✅ Status Atual

* [x] Estrutura de projeto Angular integrada com CoreUI
* [x] Comunicação com API REST paginada
* [x] Cadastro, edição e exclusão de alunos e turmas
* [x] Matrícula e desmatrícula com feedback visual
* [x] Validação de CPF e email
* [x] Suporte a execução em ambiente isolado (Docker/Dev Containers)

---

### 👨‍💻 Autor

> Feito por Raphael Mathias Chiarelli Gomes durante o curso **Java Web Developer** na [COTI Informática](https://www.cotiinformatica.com.br/curso/java).
