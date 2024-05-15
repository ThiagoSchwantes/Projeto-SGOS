using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoSGOS.Models
{
    public class OrdemServico
    {
        public String? OrdemServicoId { get; set; } = Guid.NewGuid().ToString();
        public DateTime DataAbertura { get; set; }
    }

    public OrdemServico()
    {
        DataAbertura = DateTime.Today;
    }
}