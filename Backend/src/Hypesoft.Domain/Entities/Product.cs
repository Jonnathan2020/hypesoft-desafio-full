using Microsoft.EntityFrameworkCore.Metadata;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.src.Hypesoft.Domain.Entities


{
    //Entidade Product  - Core do sistema de produtos
    public class Product
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;

        public decimal Custo { get; set; }

        public decimal Preco { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CategoriaId { get; set; } = string.Empty;

        public int QuantidadeEstoque { get; set; }

        public DateTime CriadoEm { get; set; }

        public DateTime AtualizadoEm { get; set; }


        [BsonIgnore]
        public virtual Category? Category { get; set; }

        public bool IsLowStock(int minEstoque = 10)
        {
            return QuantidadeEstoque <= minEstoque;
        }

        //Atualização de estoque
        public void StockUpdate(int novaQuantidade)
        {
            if (novaQuantidade < 0)
            {
                throw new ArgumentException("Quantidade de estoque não pode ser negativa!", nameof(novaQuantidade));

                QuantidadeEstoque = novaQuantidade;
                AtualizadoEm = DateTime.UtcNow;
            }
        }

        public void PriceUpdate(decimal novoPreco)
        {
            if (novoPreco <= 0)
            {
                throw new ArgumentException("Preço deve ser maior que zero!", nameof(novoPreco));
            }

            Preco = novoPreco;
            AtualizadoEm = DateTime.UtcNow;
        }

    }
}