using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using ProjetoSGOS.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
var app = builder.Build();

//cadastrando clientes
app.MapPost("/clientes/cadastrar", ([FromBody] Cliente[] clientes, [FromServices] AppDbContext ctx) => 
{   
    foreach (Cliente cliente in clientes)
    {
        ctx.Clientes.Add(cliente);
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

//cadastrando Produto
app.MapPost("/produto/cadastrar", ([FromBody] Produto[] produtos, [FromServices] AppDbContext ctx) => 
{   
    foreach (Produto produto in produtos)
    {
        ctx.Produtos.Add(produto);
    }
    
    ctx.SaveChanges();
    return Results.Created("",produtos);
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



app.Run();
