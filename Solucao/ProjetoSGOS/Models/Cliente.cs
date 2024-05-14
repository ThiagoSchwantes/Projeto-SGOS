namespace ProjetoSGOS.Models;
public class Cliente
{
    public string? ClienteId { get; set; } = Guid.NewGuid().ToString();
    public string? Nome { get; set; }
    public string? CPF { get; set; }
    public string? RG { get;set; }
    public DateTime DataCadastro { get; set; }

    public int Cep { get; set; }
    public string? Endereco { get; set; }
    public string? Bairro { get; set; }
    public string? Cidade { get; set; }
    public int Telefone { get; set; }

    public Cliente()
    {
        DataCadastro = DateTime.Today;
    }
}