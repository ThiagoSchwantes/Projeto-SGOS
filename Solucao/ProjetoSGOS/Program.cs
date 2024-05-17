using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using ProjetoSGOS.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
var app = builder.Build();

//--------------------------------------------------------------------------------------------------------------
//cadastrando clientes

app.MapPost("/clientes/cadastrar", ([FromBody] Cliente[] clientes, [FromServices] AppDbContext ctx) => 
{   
    bool erroValidacao = false;
    List<ValidationResult> erros = [];

    int i = 1;
    foreach (Cliente cliente in clientes)
    {
        
        erroValidacao = Validator.TryValidateObject(cliente, new ValidationContext(cliente), erros, true);

        if(!erroValidacao){
            return Results.BadRequest(erros);
        }
        ctx.Clientes.Add(cliente);
        i++;
    }
    ctx.SaveChanges();
    return Results.Created("",clientes);
});

//listando clientes
app.MapGet("/clientes/listar",([FromServices] AppDbContext ctx) =>
{
    if (ctx.Clientes.Any())
    {
        return Results.Ok(ctx.Clientes.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//alterar clientes
app.MapPut("/clientes/alterar/{cpf}",([FromRoute] string cpf, [FromBody] Cliente clienteAlterado, [FromServices] AppDbContext ctx) =>
{
    Cliente? cliente = ctx.Clientes.FirstOrDefault(c => c.CPF == cpf);
    if (cliente is null){
        return Results.NotFound("Cliente não encontrado!");
    }

    cliente.Nome = clienteAlterado.Nome;
    cliente.CPF = clienteAlterado.CPF;
    cliente.RG = clienteAlterado.RG;
    cliente.Cep = clienteAlterado.Cep;
    cliente.Endereco = clienteAlterado.Endereco;
    cliente.Bairro = clienteAlterado.Bairro;
    cliente.Cidade = clienteAlterado.Cidade;
    cliente.Telefone = clienteAlterado.Telefone;

    ctx.Clientes.Update(cliente);
    ctx.SaveChanges();
    return Results.Ok("Cliente alterado com sucesso!");
});

//deletar cliente
app.MapDelete("/clientes/deletar/{cpf}",([FromRoute] string cpf, [FromServices] AppDbContext ctx) =>
{
    Cliente? cliente = ctx.Clientes.FirstOrDefault(c => c.CPF == cpf);
    if (cliente is null)
    {
        return Results.NotFound("Produto não encontrado!");
    }
    ctx.Clientes.Remove(cliente);
    ctx.SaveChanges();
    return Results.Ok("Cliente deletado com sucesso!");
});

//-------------------------------------------------------------------------------------------------------
//cadastrando vendedor
app.MapPost("/vendedores/cadastrar", ([FromBody] Vendedor[] vendedors, [FromServices] AppDbContext ctx) => 
{   
    foreach (Vendedor vendedor in vendedors)
    {
        ctx.Vendedores.Add(vendedor);
    }
    
    ctx.SaveChanges();
    return Results.Created("",vendedors);
});

//listando vendedor
app.MapGet("/vendedores/listar",([FromServices] AppDbContext ctx) =>
{
    if (ctx.Vendedores.Any())
    {
        return Results.Ok(ctx.Vendedores.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//alterar vendedor
app.MapPut("/vendedores/alterar/{usuario}",([FromRoute] string usuario, [FromBody] Vendedor vendedorAlterado, [FromServices] AppDbContext ctx) =>
{
    Vendedor? vendedor = ctx.Vendedores.FirstOrDefault(c => c.Usuario == usuario);
    if (vendedor is null)
    {
        return Results.NotFound("vendedor não encontrado!");
    }

    vendedor.Nome = vendedorAlterado.Nome;
    vendedor.Usuario = vendedorAlterado.Usuario;
    vendedor.Senha = vendedorAlterado.Senha;

    ctx.Vendedores.Update(vendedor);
    ctx.SaveChanges();
    return Results.Ok("vendedor alterado com sucesso!");
});

//deletar vendedor
app.MapDelete("/vendedores/deletar/{usuario}",([FromRoute] string usuario, [FromServices] AppDbContext ctx) =>
{
    Vendedor? Vendedor = ctx.Vendedores.FirstOrDefault(c => c.Usuario == usuario);
    if (Vendedor is null)
    {
        return Results.NotFound("vendedor não encontrado!");
    }
    ctx.Vendedores.Remove(Vendedor);
    ctx.SaveChanges();
    return Results.Ok("vendedor deletado com sucesso!");
});

//-------------------------------------------------------------------------------------------------------
//cadastrando acabamento
app.MapPost("/acabamentos/cadastrar", ([FromBody] Acabamento[] acabamentos, [FromServices] AppDbContext ctx) => 
{   
    foreach (Acabamento acabamento in acabamentos)
    {
        ctx.Acabamentos.Add(acabamento);
    }
    
    ctx.SaveChanges();
    return Results.Created("",acabamentos);
});

//listando acabamento
app.MapGet("/acabamentos/listar",([FromServices] AppDbContext ctx) =>
{
    if (ctx.Acabamentos.Any())
    {
        return Results.Ok(ctx.Acabamentos.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//alterar acabamento
app.MapPut("/acabamentos/alterar/{id}",([FromRoute] int id, [FromBody] Acabamento acabamentoAlterado, [FromServices] AppDbContext ctx) =>
{
    Acabamento? acabamento = ctx.Acabamentos.FirstOrDefault(c => c.AcabamentoId == id);
    if (acabamento is null){
        return Results.NotFound("Acabamento não encontrado!");
    }

    acabamento.Nome = acabamentoAlterado.Nome;
    acabamento.Descricao = acabamentoAlterado.Descricao;

    ctx.Acabamentos.Update(acabamento);
    ctx.SaveChanges();
    return Results.Ok("Acabamento alterado com sucesso!");
});

//deletar acabamento
app.MapDelete("/acabamentos/deletar/{id}",([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Acabamento? acabamento = ctx.Acabamentos.FirstOrDefault(c => c.AcabamentoId == id);    
    if (acabamento is null)
    {
        return Results.NotFound("Acabamento não encontrado!");
    }
    ctx.Acabamentos.Remove(acabamento);
    ctx.SaveChanges();
    return Results.Ok("Acabamento deletado com sucesso!");
});

//-------------------------------------------------------------------------------------------------------
//cadastrando equipamento
app.MapPost("/equipamentos/cadastrar", ([FromBody] Equipamento[] equipamentos, [FromServices] AppDbContext ctx) => 
{   
    foreach (Equipamento equipamento in equipamentos)
    {
        ctx.Equipamentos.Add(equipamento);
    }
    
    ctx.SaveChanges();
    return Results.Created("",equipamentos);
});

//listando equipamento
app.MapGet("/equipamentos/listar",([FromServices] AppDbContext ctx) =>
{
    if (ctx.Equipamentos.Any())
    {
        return Results.Ok(ctx.Equipamentos.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//alterar equipamento
app.MapPut("/equipamentos/alterar/{id}",([FromRoute] int id, [FromBody] Equipamento equipamentoAlterado, [FromServices] AppDbContext ctx) =>
{
    Equipamento? equipamento = ctx.Equipamentos.FirstOrDefault(c => c.EquipamentoId == id);
    if (equipamento is null){
        return Results.NotFound("Equipamento não encontrado!");
    }

    equipamento.Nome = equipamentoAlterado.Nome;
    equipamento.Descricao = equipamentoAlterado.Descricao;

    ctx.Equipamentos.Update(equipamento);
    ctx.SaveChanges();
    return Results.Ok("Equipamento alterado com sucesso!");
});

//deletar equipamento
app.MapDelete("/equipamentos/deletar/{id}",([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Equipamento? equipamento = ctx.Equipamentos.FirstOrDefault(c => c.EquipamentoId == id);
    if (equipamento is null)
    {
        return Results.NotFound("Equipamento não encontrado!");
    }
    ctx.Equipamentos.Remove(equipamento);
    ctx.SaveChanges();
    return Results.Ok("Equipamento deletado com sucesso!");
});


//---------------------------------------------------------------------------------------------------------
//cadastrando Ordem de Serviço
app.MapPost("/ordem-servico/cadastrar", ([FromBody] OrdemServico[] ordemServicos, [FromServices] AppDbContext ctx) => 
{   

    foreach (OrdemServico ordemServico in ordemServicos)
    {
        ctx.OrdemServicos.Add(ordemServico);
    }
    
    ctx.SaveChanges();
    return Results.Created("",ordemServicos);
});

//listando Ordem de Serviço
app.MapGet("/ordem-servico/listar",([FromServices] AppDbContext ctx) =>
{
    if (ctx.OrdemServicos.Any())
    {
        return Results.Ok(ctx.OrdemServicos.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//alterar  Ordem de Serviço
app.MapPut("/ordem-servico/alterar/{id}",([FromRoute] int id, [FromBody] OrdemServico ordemServicoAlterada, [FromServices] AppDbContext ctx) =>
{
    OrdemServico? ordemServico = ctx.OrdemServicos.FirstOrDefault(c => c.OrdemServicoId == id);
    if (ordemServico is null){
        return Results.NotFound("Ordem de Serviço não encontrada!");
    }

    ordemServico.Status = ordemServicoAlterada.Status;
    ordemServico.Observacoes = ordemServicoAlterada.Observacoes;
    ordemServico.ClienteId = ordemServicoAlterada.ClienteId;
    ordemServico.VendedorId = ordemServicoAlterada.VendedorId;
    

    ctx.OrdemServicos.Update(ordemServico);
    ctx.SaveChanges();
    return Results.Ok("Ordem de Serviço alterada com sucesso!");
});

//deletar Ordem de Serviço
app.MapDelete("/ordem-servico/deletar/{id}",([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    OrdemServico? ordemServico = ctx.OrdemServicos.FirstOrDefault(c => c.OrdemServicoId == id);
    if (ordemServico is null)
    {
        return Results.NotFound("Ordem de Serviço não encontrada!");
    }

    ctx.OrdemServicos.Remove(ordemServico);
    ctx.SaveChanges();
    return Results.Ok("Ordem de Serviço deletada com sucesso!");
});


//---------------------------------------------------------------------------------------------------------
//cadastrando Produto
app.MapPost("/produtos/cadastrar", ([FromBody] Produto[] produtos, [FromServices] AppDbContext ctx) => 
{   
    

    foreach (Produto produto in produtos)
    {
        ctx.Produtos.Add(produto);
    }
    
    ctx.SaveChanges();
    return Results.Created("",produtos);
});

//listando Produto
app.MapGet("/produtos/listar",([FromServices] AppDbContext ctx) =>
{
    if (ctx.Produtos.Any())
    {
        return Results.Ok(ctx.Produtos.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//alterar Produto
app.MapPut("/produtos/alterar/{id}",([FromRoute] int id, [FromBody] Produto produtoAlterado, [FromServices] AppDbContext ctx) =>
{
    Produto? produto = ctx.Produtos.FirstOrDefault(c => c.ProdutoId == id);
    if (produto is null){
        return Results.NotFound("Produto não encontrado!");
    }

    produto.Nome = produtoAlterado.Nome;
    produto.Descricao = produtoAlterado.Descricao;
    

    ctx.Produtos.Update(produto);
    ctx.SaveChanges();
    return Results.Ok("Produto alterado com sucesso!");
});

//deletar Produto
app.MapDelete("/produtos/deletar/{id}",([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Produto? produto = ctx.Produtos.FirstOrDefault(c => c.ProdutoId == id);
    if (produto is null)
    {
        return Results.NotFound("Produto não encontrado!");
    }
    ctx.Produtos.Remove(produto);
    ctx.SaveChanges();
    return Results.Ok("Produto deletado com sucesso!");
});

//-------------------------------------------------------------------------------------------------------
//cadastrando pagamento
app.MapPost("/pagamentos/cadastrar", ([FromBody] Pagamento[] pagamentos, [FromServices] AppDbContext ctx) => 
{   
    foreach (Pagamento pagamento in pagamentos)
    {
        ctx.Pagamentos.Add(pagamento);
    }
    
    ctx.SaveChanges();
    return Results.Created("",pagamentos);
});

//listando pagamento
app.MapGet("/pagamentos/listar",([FromServices] AppDbContext ctx) =>
{
    if (ctx.Pagamentos.Any())
    {
        return Results.Ok(ctx.Pagamentos.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//alterar pagamento
app.MapPut("/pagamentos/alterar/{id}",([FromRoute] int id, [FromBody] Pagamento pagamentoAlterado, [FromServices] AppDbContext ctx) =>
{
    Pagamento? pagamento = ctx.Pagamentos.FirstOrDefault(c => c.PagamentoId == id);
    if (pagamento is null){
        return Results.NotFound("Pagamento não encontrado!");
    }

    pagamento.Forma = pagamentoAlterado.Forma;

    ctx.Pagamentos.Update(pagamento);
    ctx.SaveChanges();
    return Results.Ok("Pagamento alterado com sucesso!");
});

//deletar pagamento
app.MapDelete("/pagamentos/deletar/{id}",([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Pagamento? pagamento = ctx.Pagamentos.FirstOrDefault(c => c.PagamentoId == id);
    if (pagamento is null)
    {
        return Results.NotFound("Pagamento não encontrado!");
    }
    ctx.Pagamentos.Remove(pagamento);
    ctx.SaveChanges();
    return Results.Ok("Pagamento deletado com sucesso!");
});



app.Run();
