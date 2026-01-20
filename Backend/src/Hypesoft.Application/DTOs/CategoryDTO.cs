

namespace Backend.src.Hypesoft.Application.DTOs
{
    public class CategoryDTO
    {
        public string Id { get; set; }  = string.Empty;

        public string Nome { get; set; } = string.Empty;

        public int QuantidadeProdutos { get; set; }

        public DateTime CriadoEm { get; set; }

        public DateTime AtualizadoEm { get; set; }

    }

}