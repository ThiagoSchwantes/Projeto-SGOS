using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace ProjetoSGOS.Models
{
    public class OrdemServico
    {
        public int OrdemServicoId { get; set; }

        public double ValorTotal { get; set; } = 0;
        public double ValorDesconto { get; set; } = 0;
        public double ValorAPagar { get; set; } = 0;

        public string? Observacoes { get; set; }
    
        public DateTime DataHorarioAbertura { get; set; } = DateTime.Today;
        public Status Status { get; set; } = Status.EmProducao;

        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; } = null!;

        public int VendedorId { get; set; }
        public Vendedor Vendedor { get; set; } = null!;

        public ICollection<Produto>? Produtos { get; } = [];

        public ICollection<Pagamento>? Pagamentos { get; set; } = [];
    }
    public enum Status {
        EmProducao = 0,
        EmAcabamento = 1,
        Finalizada = 2,
        SolicitadoBaixa = 3,
        Baixada = 4
    }
}