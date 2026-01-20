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
✔️ Integrado com backend
✔️ Pronto para produção

---
