using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoSGOS.Models
{
    public class Pagamento
    {
        public string? PagamentoId { get; set; } = Guid.NewGuid().ToString();
        public string? FormaDePagamento { get; set; }
        public DateTime CriadoEm { get; set; }

        public Pagamento(){
            CriadoEm = DateTime.Today;
        }
    }
}