using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoSGOS.Models
{
    public class Pagamento
    {
        public int PagamentoId { get; set; }
        public double Valor { get; set; } = 0;
        public Forma Forma { get; set; }
        
        public int OrdemServicoId { get; set; }
        public OrdemServico OrdemServico { get; set; } = null!;
    }

    public enum Forma
    {
        Dinheiro = 0,
        CartaoCredito = 1,
        CartaoDebido = 2,
        Boleto = 3
    }
}