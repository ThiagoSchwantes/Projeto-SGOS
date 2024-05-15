using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace ProjetoSGOS.Models;

[Index(nameof(CPF), IsUnique = true)]
[Index(nameof(RG), IsUnique = true)]
public class Cliente
{
    public string ClienteId { get; set; } = Guid.NewGuid().ToString();

    [Required(ErrorMessage = "O nome é obrigatório")]
    public string? Nome { get; set; }

    
    [Required(ErrorMessage = "O CPF é obrigatório")]
    public string? CPF { get; set; }

    [Required(ErrorMessage = "O RG é obrigatório")]
    public string? RG { get; set; }
    public DateTime DataCadastro { get; set; } = DateTime.Today;

    [Required(ErrorMessage = "O CEP é obrigatório")]
    public string? Cep { get; set; }

    [Required(ErrorMessage = "O Endereço é obrigatório")]
    public string? Endereco { get; set; }

    [Required(ErrorMessage = "O Bairro é obrigatório")]
    public string? Bairro { get; set; }

    [Required(ErrorMessage = "A Cidade é obrigatório")]
    public string? Cidade { get; set; }

    [Required(ErrorMessage = "O Telefone é obrigatório")]
    public string? Telefone { get; set; }

    public List<OrdemServico> OrdemServicos { get; } = [];
}