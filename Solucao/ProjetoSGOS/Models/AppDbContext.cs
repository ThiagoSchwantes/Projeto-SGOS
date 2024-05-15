using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ProjetoSGOS.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Produto>  Produtos{ get; set; }
        public DbSet<Acabamento> Acabamentos { get; set; }
        public DbSet<Equipamento> Equipamentos { get; set; }
        public DbSet<Pagamento> Pagamentos { get; set; }
        public DbSet<Funcionario> Funcionarios { get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=banco.db");
        }
    }
}