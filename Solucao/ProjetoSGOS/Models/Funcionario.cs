using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjetoSGOS.Models
{
    public class Funcionario
    {
        public string? FuncionarioId { get; set; } = Guid.NewGuid().ToString();
        public string? Nome {get; set; }
        public string? Usuario { get; set;}
        public string? Senha { get; set;}
    }
}