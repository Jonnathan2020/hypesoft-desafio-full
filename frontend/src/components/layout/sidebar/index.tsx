import { Button } from "@/components/ui/button"
import {Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet"
import Link from "next/link";
import {Home, Package, PanelBottom, ChartNoAxesCombined, ShoppingBag, Blocks, Airplay} from "lucide-react"
import {TooltipProvider, Tooltip, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip"

export function Sidebar(){
    return(
        <div className="flex w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-48 border-r bg-background sm:flex">
                <nav className="flex flex-col gap-2 px-4 py-5">

                    <TooltipProvider>
                        <Link href="/home" className="flex items-center gap-3 rounded-lg px-3 py-2 text-green-600 hover:text-foreground hover:bg-muted transition">
                            <Airplay className="h-5 w-5"/>
                            <span className="Logo text-sm font-medium">Gestor de Produtos</span>
                        </Link>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a href="/home" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition">
                                    <Home className="h-5 w-5"/>
                                    <span className="text-sm font-medium">Home</span>
                                </a>                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Início</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition">
                                    <ChartNoAxesCombined className="h-5 w-5"/>
                                    <span className="text-sm font-medium">Dashboard</span>
                                </Link>                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a href="/products" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition">
                                    <ShoppingBag className="h-5 w-5"/>
                                    <span className="text-sm font-medium">Produtos</span>
                                </a>                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Produtos</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a href="/categories" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition">
                                    <Blocks className="h-5 w-5"/>
                                    <span className="text-sm font-medium">Categorias</span>
                                </a>                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Categorias</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a href="/stock" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition">
                                    <Package className="h-5 w-5"/>
                                    <span className="text-sm font-medium">Estoque</span>
                                </a>                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Estoque</TooltipContent>
                        </Tooltip>

                    </TooltipProvider>

                </nav>
            </aside>

            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14"> 
                <header 
                    className="sticky top-0 z-30 flex h-14 items-center px-4 
                    border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
                    >
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelBottom className="w-5 h-5"/>
                                <span className="sr-only">Abrir/Fechar menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="sm:max-w-x">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link href="/home" className="flex items-center gap-3 rounded-lg px-3 py-2 text-green-600 hover:text-foreground hover:bg-muted transition">
                                    <Airplay className="h-5 w-5"/>
                                    <span className="Logo text-sm font-medium">Gestor de Produtos</span>
                                </Link>

                                <a //Home
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    >   
                                    <Home className="h-5 w-5 transition-all"/>
                                    Início
                                </a>

                                <a //Dashboard
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    >   
                                    <ChartNoAxesCombined className="h-5 w-5 transition-all"/>
                                    Dashboard
                                </a>

                                <a //Produtos
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    >   
                                    <ShoppingBag className="h-5 w-5 transition-all"/>
                                    Produtos
                                </a>

                                <a //Categorias
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    >   
                                    <Blocks className="h-5 w-5 transition-all"/>
                                    Categorias
                                </a>

                                <a //Estoque
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    >   
                                    <Package className="h-5 w-5 transition-all"/>
                                    Estoque
                                </a>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
            </div>
        </div>
    )
}