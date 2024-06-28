using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoSGOS.Models
{
    public class Equipamento
    {
        public int EquipamentoId { get; set; }
        public DateTime CriadoEm { get; set; } = DateTime.Now;

        public string Nome { get; set; } = null!;
        public string? Descricao { get; set; }

        public ICollection<Produto>? Produtos { get; }

    }
}