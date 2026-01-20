using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.src.Hypesoft.Domain.Entities
{
    public class Category
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nome { get; set; } = string.Empty;

        public int QuantidadeProdutos { get; set; } = 0;

        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;

        public DateTime AtualizadoEm { get; set; } = DateTime.UtcNow;

        public virtual ICollection<Product> Products { get; set; } = new List<Product>();

        public void IncrementProductCount()
        {
            QuantidadeProdutos++;
            AtualizadoEm = DateTime.UtcNow;
        }

        public void DecrementProductCount()
        {
            if (QuantidadeProdutos > 0)
            {
                QuantidadeProdutos--;
                AtualizadoEm = DateTime.UtcNow;
            }
        }

        public void UpdateProductCount(int contador)
        {
            if (contador < 0)
            {
                throw new ArgumentException("Quantidade de produtos não pode ser negativo!", nameof(contador));

                QuantidadeProdutos = contador;
                AtualizadoEm = DateTime.UtcNow;
            }
        }
    }
}