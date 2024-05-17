using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoSGOS.Models
{
    public class Produto
    {
        public Produto()
        {
            ValorUnitario = Largura * Altura * ValorM2;
            ValorSubTotal = ValorUnitario * Quantidade;
        }

        public int ProdutoId { get; set; }
        public string Nome { get; set; } = null!;
        public string? Descricao { get; set; }
        
        public double Largura { get; set;}
        public double Altura { get; set;}
        public double ValorM2 { get; set; }

        public int Quantidade { get; set;}
        public double ValorUnitario { get; set; }
        public double ValorSubTotal { get; set; }

        public DateTime CriadoEm { get; set; } = DateTime.Today;
        
        public int EquipamentoId { get; set; }
        public Equipamento Equipamento { get; set; } = null!;

        public int AcabamentoId { get; set; }
        public Acabamento Acabamento { get; set; } = null!;

        public int OrdemServicoId { get; set; }
        public OrdemServico OrdemServico { get; set; } = null!;
    }
}