


export interface Product {
    id: string;
    nome: string;
    descricao: string;
    custo: number;
    preco: number;
    categoriaId: string;
    categoriaName: string;
    quantidadeEstoque: number;
    criadoEm: string;
    atualizadoEm: string;
  }

export interface ProdutoDashboard {
    id: string;
    nome: string;
    descricao: string;
    categoriaNome: string;
    quantidadeEstoque: number;
    custo: number;
    preco: number;
  }

// Produto agregado para gráfico
export interface ProductPerCategory {
  month: string;
  nomeCategoria: string;
  category: string;
  totalCusto: number;
  quantidadeEstoque: number;
  totalValores: number;
  quantidadeProdutos: number;
}

// Tipo do chart config
export interface ChartConfig {
  [key: string]: { label: string; color: string };
}
  
  export interface Category {
    id: string;
    nome: string;
    quantidadeProdutos : number;
    criadoEm: string;
    atualizadoEm: string;
  }
  
  export interface ProdutoEstoqueBaixo {
    id: string;
    nome: string;
    descricao: string;
    custo: number;
    preco: number;
    categoriaId: string;
    quantidadeEstoque: number;
    criadoEm: string;
    atualizadoEm: string;
  }

  export interface DashboardData {
    totalProdutos: number;
    totalCusto: number;
    totalValores: number;
    produtosEstoqueBaixo: ProdutoEstoqueBaixo[];
    produtosPorCategoria: ProductPerCategory[];
  }

  export interface CreateProductRequest {
    nome: string;
    descricao: string;
    custo: number;
    preco: number;
    categoriaId: string;
    quantidadeEstoque: number;
  }
  
  export interface UpdateProductRequest {
    id: string;
    nome?: string;
    descricao?: string;
    custo?: number;
    preco?: number;
    categoriaId?: string;
    quantidadeEstoque?: number;
  }
  
  export interface CreateCategoryRequest {
    nome: string;
  }
  
  export interface UpdateCategoryRequest {
    id: string;
    nome?: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    totalContado: number;
    paginaNum: number;
    paginaTam: number;
    totalPaginas: number;
  }
  
  export interface DashboardStats {
    totalProdutos: number;
    totalCusto: number;
    totalValores: number;
    produtosEstoqueBaixo: Product[];
    produtosPorCategoria: CategoryValues[];
  }
  
  export interface CategoryValues {
    nomeCategoria: string;
    quantidadeProdutos: number;
    totalCusto: number;
    totalValores: number;
  }
  
  export interface User {
    id: string;
    email: string;
    nome: string;
    roles: string[];
  }
  
  export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
    error?: string | null;
    keycloak?: any; // Keycloak instance
  }