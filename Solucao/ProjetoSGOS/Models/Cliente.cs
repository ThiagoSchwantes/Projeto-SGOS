using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace ProjetoSGOS.Models;

[Index(nameof(CPF), IsUnique = true)]
[Index(nameof(RG), IsUnique = true)]
public class Cliente
{
    public int ClienteId { get; set; }
    public DateTime DataCadastro { get; set; } = DateTime.Today;
    

    [Required(ErrorMessage = "O nome é obrigatório")]
    public string Nome { get; set; } = null!;

    
    [Required(ErrorMessage = "O CPF é obrigatório")]
    public string CPF { get; set; } = null!;

    [Required(ErrorMessage = "O RG é obrigatório")]
    public string RG { get; set; } = null!;

    [Required(ErrorMessage = "O CEP é obrigatório")]
    public string Cep { get; set; } = null!;

    [Required(ErrorMessage = "O Endereço é obrigatório")]
    public string Endereco { get; set; } = null!;

    [Required(ErrorMessage = "O Bairro é obrigatório")]
    public string Bairro { get; set; } = null!;

    [Required(ErrorMessage = "A Cidade é obrigatório")]
    public string Cidade { get; set; } = null!;

    [Required(ErrorMessage = "O Telefone é obrigatório")]
    public string Telefone { get; set; } = null!;

    public ICollection<OrdemServico>? OrdemServicos { get; }
}