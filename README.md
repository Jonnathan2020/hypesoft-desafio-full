# DESAFIO HYPESOFT - GESTOR DE PRODUTOS DASHBOARD #


# Gestor de Produtos – Backend API

API REST do **Gestor de Produtos**, desenvolvida para demonstrar uma arquitetura moderna, segura e escalável utilizando **.NET 9**, **Clean Architecture**, **DDD** e **CQRS**.

Projeto focado em boas práticas, separação de responsabilidades e integração com autenticação corporativa via **Keycloak**.

----

## 🚀 Funcionalidades Implementadas

### 🔐 Autenticação e Autorização

* Integração com **Keycloak** (OAuth2 / OpenID Connect)
* Validação automática de **JWT**
* Proteção de endpoints
* Logout integrado
* Configuração de CORS
* Pipeline de middlewares de segurança

---

### 📦 Gestão de Produtos

* CRUD completo de produtos
* Controle de estoque
* Validação de regras de negócio
* Busca por nome
* Paginação server-side
* DTOs específicos para leitura e escrita

---

### 🗂️ Gestão de Categorias

* CRUD completo
* Associação com produtos
* Integridade referencial
* Bloqueio de exclusão quando vinculada a produtos

---

### 📊 Dashboard

* Total de produtos
* Valor total do estoque
* Produtos com estoque baixo
* Distribuição por categoria
* Endpoints otimizados para dashboards

---

## 🧱 Arquitetura Técnica

### Backend (.NET 9) – Clean Architecture + DDD

```bash
backend/src/
├── Hypesoft.Domain/              # Camada de Domínio
│   ├── Entities/                 # Entidades principais
│   ├── ValueObjects/             # Objetos de Valor
│   ├── Repositories/             # Interfaces
│   └── Common/                   # Entidades base
├── Hypesoft.Application/   	  # Camada de Aplicação
│   ├── Commands/                 # Commands (CQRS)
│   ├── Queries/                  # Queries (CQRS)
│   ├── Handlers/                 # MediatR
│   ├── DTOs/                     # DTOs
│   ├── Validators/               # FluentValidation
│   └── Mappings/                 # AutoMapper
├── Hypesoft.Infrastructure       # Infraestrutura
│   ├── Data/                     # MongoDB Context
│   └── Repositories/             # Implementações
└── Hypesoft.API                  # API
    ├── Controllers
    ├── Middlewares
    └── Configuration
```

---

## 🛠️ Stack Tecnológica – Backend

* .NET 9 / C# 12
* Clean Architecture
* Domain-Driven Design (DDD)
* CQRS + MediatR
* MongoDB
* FluentValidation
* AutoMapper
* Serilog
* Keycloak
* Docker / Docker Compose

---

## ▶️ Como Executar

### Pré-requisitos

* Docker Desktop
* .NET 9 SDK
* Node.js 18+
* Git

### Subir o ambiente

```bash
git clone https://github.com/Jonnathan2020/hypesoft-desafio1.git
cd backend
docker-compose up -d
```

---

## 🔍 Serviços Disponíveis

| Serviço       | URL                                                            |
| ------------- | -------------------------------------------------------------- |
| API           | [http://localhost:5000/api](http://localhost:5000/api)         |
| Swagger       | [http://localhost:5000/swagger](http://localhost:5000/swagger) |
| Health Check  | [http://localhost:5000/health](http://localhost:5000/health)   |
| Keycloak      | [http://localhost:8080](http://localhost:8080)                 |
| Mongo Express | [http://localhost:8081](http://localhost:8081)                 |

---

## 🔐 Segurança Implementada

* JWT obrigatório
* Global Exception Handler
* Rate Limiting
* Sanitização de inputs
* Headers de segurança
* CORS restritivo

---

## 🧠 Padrões Arquiteturais

* Clean Architecture
* DDD
* CQRS
* Repository Pattern
* Mediator Pattern
* SOLID
* Clean Code

---

## 📌 Status do Projeto

✔️ Backend completo
 Arquitetura robusta
 Pronto para evolução e produção

---


# Gestor de Produtos – Frontend

Aplicação frontend do **Gestor de Produtos**, desenvolvida em **Next.js 14**, com foco em **experiência do usuário**, **performance** e **integração segura** com a API.

---

## 🎯 Funcionalidades

### 🔐 Autenticação

* Login via Keycloak
* Proteção de rotas
* Refresh automático de token
* Logout integrado
* Context API para autenticação

---

### 📊 Dashboard

* Cards de métricas
* Gráficos interativos (Recharts)
* Alertas de estoque baixo
* Produtos recentes

---

### 📦 Produtos

* CRUD completo
* Busca e paginação
* Validação de formulários
* Interface responsiva

---

### 🗂️ Categorias

* CRUD completo
* Contador de produtos
* Validação de exclusão
* UI consistente

---

## 🧱 Arquitetura Frontend

```bash
frontend/src/
├── app/
│   ├── categories/
│   ├── dashboard/
│   ├── home/
│   ├── products/
│   ├── stock/
│   └── login/ -> future
├── components/
│   ├── Auth/
│   │	├── app/
│   │	├── categories/
│   │	└── dashboard/
│   │	
│   ├── charts/
│   │	└── totalProducts/
│   ├── forms/
│   │	├── AddProduct/
│   │	├── DeleteProduct/
│   │	├── EditProduct/
│   │	└── searchForm/
│   ├── layout/
│   │	├── itemsLowStock/
│   │	├── ProductsTable/
│   │	└── sidebar/
│   └── ui/
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── useCategories.ts
│   ├── useDashboard.ts
│   ├── useLowStockProducts.ts
│   └── useProduct.ts
├── services/
│   └── api.ts
├── types/
    └── index.ts
└── utils/
```

---

## 🛠️ Stack Tecnológica – Frontend

* Next.js 14 (App Router)
* React 18 + TypeScript
* TailwindCSS
* shadcn/ui
* React Query (TanStack)
* React Hook Form + Zod
* Recharts
* Axios
* Keycloak JS

---

## ▶️ Execução

```bash
cd frontend
npm install
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## 🎨 UX e UI

* Design moderno
* Componentes reutilizáveis
* Feedback visual
* Totalmente responsivo
* Animações suaves

---

## ⚡ Performance

* Cache com React Query
* Paginação server-side
* Code splitting automático
* Lazy loading de componentes

---

## 📌 Status do Projeto

✔️ Frontend completo
 Integrado com backend
Pronto para produção

---
