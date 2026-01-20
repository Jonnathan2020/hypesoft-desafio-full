

namespace Backend.src.Hypesoft.Application.DTOs
{
    public class ProductDTO
    {
        public string Id { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;

        public decimal Custo { get; set; }

        public decimal Preco { get; set; }

        public string CategoriaId { get; set; } = string.Empty;

        public int QuantidadeEstoque { get; set; }

        public DateTime CriadoEm { get; set; }

        public DateTime AtualizadoEm { get; set; }

    }

}