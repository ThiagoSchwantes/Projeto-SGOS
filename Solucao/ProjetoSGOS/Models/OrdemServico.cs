using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoSGOS.Models
{
    public class OrdemServico
    {
        public string OrdemServicoId { get; set; } = Guid.NewGuid().ToString();
        public DateTime DataAbertura { get; set; } = DateTime.Today;

        public string ClienteId { get; set; } = null!;
        public Cliente Cliente { get; set; } = null!;

        public Funcionario Funcionario { get; set; } = null!;
        public string FuncionarioId { get; set; } = null!;
        public List<Pagamento> Pagamentos { get; } = [];
    }
}