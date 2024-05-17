using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjetoSGOS.Models
{
    public class Vendedor
    {
        public int VendedorId { get; set; }
        public string Nome {get; set; } = null!;
        public string Usuario { get; set;} = null!;
        public string Senha { get; set;} = null!;

        public ICollection<OrdemServico>? OrdemServicos{ get; }
    }
}