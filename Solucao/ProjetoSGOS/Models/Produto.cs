using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoSGOS.Models
{
    public class Produto
    {
        public string? ProdutoId { get; set; } = Guid.NewGuid().ToString();
        public string? Nome { get; set; }
        public string? Descricao { get; set; }
        public double Preco { get; set;}
        public DateTime CriadoEm { get; set; } = DateTime.Today;
        
        public string EquipamentoId { get; set; } = null!;
        public Equipamento Equipamento { get; set; } = null!;

        public string AcabamentoId { get; set; } = null!;
        public Acabamento Acabamento { get; set; } = null!;
    }
}