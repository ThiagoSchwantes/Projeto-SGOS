using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoSGOS.Models
{
    public class Pagamento
    {
        public string? PagamentoId { get; set; } = Guid.NewGuid().ToString();
        public string? Forma { get; set; }
        public double Valor { get; set; } 

        public string OrdemServicoId { get; set; } = null!;
        public OrdemServico OrdemServico { get; set; } = null!;
    }
}