using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ProjetoSGOS.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Produto>  Produtos{ get; set; }
        public DbSet<Acabamento> Acabamentos { get; set; }
        public DbSet<Equipamento> Equipamentos { get; set; }
        public DbSet<Pagamento> Pagamentos { get; set; }
        public DbSet<Vendedor> Vendedores { get; set;}
        public DbSet<OrdemServico> OrdemServicos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=banco.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>()
            .HasIndex(p => new {p.RG, p.CPF})
                .IsUnique();

            modelBuilder.Entity<Cliente>()
                .HasMany(c => c.OrdemServicos)
                .WithOne(os => os.Cliente)  
                .HasForeignKey(c => c.ClienteId)
                .IsRequired();

            modelBuilder.Entity<Vendedor>()
                .HasMany(v => v.OrdemServicos)
                .WithOne(os => os.Vendedor)
                .HasForeignKey(os => os.VendedorId)
                .IsRequired();
            
            modelBuilder.Entity<Pagamento>()
                .HasOne(p => p.OrdemServico)
                .WithMany(os => os.Pagamentos)
                .HasForeignKey(p => p.OrdemServicoId)
                .IsRequired();

            modelBuilder.Entity<OrdemServico>()
                .HasMany(os => os.Produtos)
                .WithOne(p => p.OrdemServico)
                .HasForeignKey(p => p.OrdemServicoId)
                .IsRequired();

            modelBuilder.Entity<Produto>()
                .HasOne(p => p.Equipamento)
                .WithMany(e => e.Produtos)
                .HasForeignKey(p => p.EquipamentoId)
                .IsRequired();

            modelBuilder.Entity<Produto>()
                .HasOne(p => p.Acabamento)
                .WithMany(a => a.Produtos)
                .HasForeignKey(p => p.AcabamentoId)
                .IsRequired();
        }
    }
}