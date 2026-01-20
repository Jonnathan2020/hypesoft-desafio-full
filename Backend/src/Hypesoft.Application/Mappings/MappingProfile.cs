using AutoMapper;
using Backend.src.Hypesoft.Application.DTOs;
using Backend.src.Hypesoft.Domain.Entities;
using Hypesoft.Application.Commands;

namespace Hypesoft.Application.Mappings;

// Atualizando o AutoMapper pra ele conhecer as classes de Categoria também.
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Mapeamentos de Produto
        CreateMap<Product, ProductDTO>();
        CreateMap<ProductDTO, Product>();
        CreateMap<ProductCreateCommand, Product>();
        CreateMap<ProductUpdateCommand, Product>();

        // Mapeamentos de Categoria
        CreateMap<Category, CategoryDTO>();
        CreateMap<CategoryDTO, Category>();
        CreateMap<CategoryCreateCommand, Category>();
        CreateMap<CategoryUpdateCommand, Category>();
    }

    
}