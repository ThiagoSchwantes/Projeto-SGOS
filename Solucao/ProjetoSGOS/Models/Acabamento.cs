using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoSGOS.Models
{
    public class Acabamento
    {
        public string? AcabamentoId { get; set; } = Guid.NewGuid().ToString();
        public string? Nome { get; set; }
        public string? Descricao { get; set; }
        public DateTime CriadoEm { get; set; }

        public Acabamento(){
            CriadoEm = DateTime.Today;
        }
    }
}