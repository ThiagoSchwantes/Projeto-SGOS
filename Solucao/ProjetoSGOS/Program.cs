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
        Cliente? clienteExistente = ctx.Clientes.FirstOrDefault(c => c.CPF == cliente.CPF);
        if (clienteExistente is not null){
            return Results.BadRequest("Um cliente já foi cadastrado com esse cpf");
        }

        clienteExistente = ctx.Clientes.FirstOrDefault(c => c.RG == cliente.RG);
        if (clienteExistente is not null){
            return Results.BadRequest("Um cliente já foi cadastrado com esse RG");
        }
        
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
app.MapPut("/clientes/alterar/{id}",([FromRoute] int id, [FromBody] Cliente clienteAlterado, [FromServices] AppDbContext ctx) =>
{
    Cliente? cliente = ctx.Clientes.FirstOrDefault(c => c.ClienteId == id);
    if (cliente is null){
        return Results.NotFound("Cliente não encontrado!");
    }

    Cliente? clienteExistente = ctx.Clientes.FirstOrDefault(c => (c.CPF == clienteAlterado.CPF) && (c.ClienteId != id));
    if (clienteExistente is not null){
        return Results.BadRequest("Um cliente já foi cadastrado com esse cpf");
    }

    clienteExistente = ctx.Clientes.FirstOrDefault(c => (c.RG == clienteAlterado.RG) && (c.ClienteId != id));
    if (clienteExistente is not null){
        return Results.BadRequest("Um cliente já foi cadastrado com esse RG");
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
app.MapDelete("/clientes/deletar/{id}",([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Cliente? cliente = ctx.Clientes.FirstOrDefault(c => c.ClienteId == id);
    if (cliente is null)
    {
        return Results.NotFound("Cliente não encontrado!");
    }
    ctx.Clientes.Remove(cliente);
    ctx.SaveChanges();
    return Results.Ok("Cliente deletado com sucesso!");
});

//-------------------------------------------------------------------------------------------------------
//cadastrando vendedor
app.MapPost("/vendedores/cadastrar", ([FromBody] Vendedor[] vendedores, [FromServices] AppDbContext ctx) => 
{   
    foreach (Vendedor vendedor in vendedores)
    {
        Vendedor? vendedorExistente = ctx.Vendedores.FirstOrDefault(v => v.Usuario == vendedor.Usuario);
        if (vendedorExistente is not null){
            return Results.BadRequest("Um vendedor já foi cadastrado com esse usuário (" + vendedor.Usuario + ")");
        }
        ctx.Vendedores.Add(vendedor);
    }
    
    ctx.SaveChanges();
    return Results.Created("", vendedores);
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
app.MapPut("/vendedores/alterar/{id}",([FromRoute] int id, [FromBody] Vendedor vendedorAlterado, [FromServices] AppDbContext ctx) =>
{
    Vendedor? vendedor = ctx.Vendedores.FirstOrDefault(v => v.VendedorId == id);
    if (vendedor is null)
    {
        return Results.NotFound("vendedor não encontrado!");
    }

    Vendedor? vendedorExistente = ctx.Vendedores.FirstOrDefault(v => (v.Usuario == vendedorAlterado.Usuario) && (v.VendedorId != id));
    if (vendedorExistente is not null){
        return Results.BadRequest("Um vendedor já foi cadastrado com esse usuário (" + vendedor.Usuario + ")");
    }

    vendedor.Nome = vendedorAlterado.Nome;
    vendedor.Usuario = vendedorAlterado.Usuario;
    vendedor.Senha = vendedorAlterado.Senha;

    ctx.Vendedores.Update(vendedor);
    ctx.SaveChanges();
    return Results.Ok("vendedor alterado com sucesso!");
});

//deletar vendedor
app.MapDelete("/vendedores/deletar/{id}",([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Vendedor? Vendedor = ctx.Vendedores.FirstOrDefault(c => c.VendedorId == id);
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
        Acabamento? acabamentoExistente = ctx.Acabamentos.FirstOrDefault(a => a.Nome == acabamento.Nome);
        if (acabamentoExistente is not null){
            return Results.BadRequest("Um acabamento já foi cadastrado com esse nome (" + acabamento.Nome + ")");
        }
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

    Acabamento? acabamentoExistente = ctx.Acabamentos.FirstOrDefault(a => (a.Nome == acabamentoAlterado.Nome) && (a.AcabamentoId != id));
    if (acabamentoExistente is not null){
        return Results.BadRequest("Um acabamento já foi cadastrado com esse nome (" + acabamento.Nome + ")");
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
        Equipamento? equipamentoExistente = ctx.Equipamentos.FirstOrDefault(e => e.Nome == equipamento.Nome);
        if (equipamentoExistente is not null){
            return Results.BadRequest("Um equipamento já foi cadastrado com esse usuário (" + equipamento.Nome + ")");
        }
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

    Equipamento? equipamentoExistente = ctx.Equipamentos.FirstOrDefault(e => (e.Nome == equipamentoAlterado.Nome) && (e.EquipamentoId != id));
    if (equipamentoExistente is not null){
        return Results.BadRequest("Um acabamento já foi cadastrado com esse nome (" + equipamento.Nome + ")");
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

#pragma warning disable CS8620 // O argumento não pode ser usado para o parâmetro devido a diferenças na nulidade dos tipos de referência.
        return Results.Ok(
            ctx.OrdemServicos?
            .Include(os => os.Produtos)
            .ThenInclude(p => p.Acabamento)?
            .Include(os => os.Produtos)
            .ThenInclude(p => p.Equipamento)?
            .Include(os => os.Vendedor)
            .Include(os => os.Cliente)
            .ToList()
        );
#pragma warning restore CS8620 // O argumento não pode ser usado para o parâmetro devido a diferenças na nulidade dos tipos de referência.
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

    ordemServico.Observacoes = ordemServicoAlterada.Observacoes;
    ordemServico.ClienteId = ordemServicoAlterada.ClienteId;
    ordemServico.VendedorId = ordemServicoAlterada.VendedorId;
    ordemServico.Status = 0;
    

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
        OrdemServico? ordemServico = ctx.OrdemServicos.FirstOrDefault(c => c.OrdemServicoId == produto.OrdemServicoId);

        if (ordemServico is null)
        {
            return Results.NotFound("Ordem de Serviço não encontrada com este id: " + produto.OrdemServicoId);
        }
        produto.OrdemServico = ordemServico;

        produto.ValorUnitario = produto.Largura * produto.Altura * produto.ValorM2;

        produto.ValorSubTotal = produto.ValorUnitario * produto.Quantidade;   

        produto.OrdemServico.ValorTotal += produto.ValorSubTotal;
        produto.OrdemServico.ValorAPagar = produto.OrdemServico.ValorTotal - produto.OrdemServico.ValorDesconto;
        
        ctx.Produtos.Add(produto);
    }
    
    ctx.SaveChanges();
    return Results.Created("", produtos);
});

//listando Produto
app.MapGet("/produtos/listar",([FromServices] AppDbContext ctx) =>
{
    if (ctx.Produtos.Any())
    {
        return Results.Ok(ctx.Produtos.Include(p => p.Acabamento).Include(p => p.Equipamento).ToList());
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

//validação de acesso do vendedor/funcionario
app.MapPost("/vendedor/validacaoAcesso", (Vendedor vendedor, [FromServices] AppDbContext ctx) =>
{
    var vendedorEncontrado = ctx.Vendedores.FirstOrDefault(v => v.Usuario == vendedor.Usuario && v.Senha == vendedor.Senha);

    if (vendedorEncontrado != null)
    {
        return Results.Ok("Acesso autorizado.");
    }
    return Results.BadRequest("Usuário ou senha incorreto.");
});

//alterar status da ordem de serviço pelo id
app.MapPut("/ordem-servico/alterarStatus/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{

    OrdemServico? ordemServico = ctx.OrdemServicos.FirstOrDefault(c => c.OrdemServicoId == id);
    
    if (ordemServico is null)
    {
        return Results.NotFound("Ordem de Serviço não encontrada!");
    }

    if (ordemServico.Status < Status.ProntoParaEntrega)
    {
        ordemServico.Status++;
    }else
    {
        return Results.BadRequest("O status da ordem de serviço não pode ser atualizado, pois se encontra no status: " + ordemServico.Status.ToString());
    }

    ctx.OrdemServicos.Update(ordemServico);
    ctx.SaveChanges();

    return Results.Ok("Status da Ordem de Serviço alterado com sucesso!");
});


//-------------------------------------------------------------------------------------------------------
//cadastrando Solicitação de baixa
app.MapPost("/solicitar-baixa/{id}", ([FromRoute] int id, [FromBody] OrdemServico os, [FromServices] AppDbContext ctx) =>
{ 
    OrdemServico? OrdemServico = ctx.OrdemServicos.FirstOrDefault(os => os.OrdemServicoId == id);

    if (OrdemServico is null)
    {
        return Results.NotFound("Ordem de Serviço não encontrada!");
    }else if(OrdemServico.Status >= Status.SolicitadoBaixa){
        return Results.BadRequest("Não é possivel fazer essa operação, pois a Ordem de Serviço já se encontra na situação: " + OrdemServico.Status);
    }


    if(os.Pagamentos is null || os.Pagamentos.Count == 0)
    {
        return Results.BadRequest(os.Pagamentos);
    }

    OrdemServico.ValorDesconto = os.ValorDesconto;
    OrdemServico.ValorAPagar = OrdemServico.ValorTotal - os.ValorDesconto;

    double valorTotalPagamento = os.Pagamentos.Sum(p => p.Valor);

    if(valorTotalPagamento != OrdemServico.ValorAPagar){
        double Comparacao = OrdemServico.ValorAPagar - valorTotalPagamento;
        return Results.BadRequest("O pagamento está incorreto! R$" + Comparacao);
    }

    foreach (Pagamento pagamento in os.Pagamentos)
    {
        OrdemServico.Pagamentos?.Add(pagamento);
    }

    OrdemServico.Status = Status.SolicitadoBaixa;
    ctx.OrdemServicos.Update(OrdemServico);
    ctx.SaveChanges();

    return Results.Ok("Solicitação de baixa realizada com sucesso!");
});


app.MapGet("/solicitar-baixa/listar",([FromServices] AppDbContext ctx) =>
{
    if (ctx.OrdemServicos.Any())
    {
#pragma warning disable CS8620 // O argumento não pode ser usado para o parâmetro devido a diferenças na nulidade dos tipos de referência.
        return Results.Ok(
            ctx.OrdemServicos?
            .Include(os => os.Pagamentos)?
            .Include(os => os.Produtos)
            .ThenInclude(p => p.Acabamento)?
            .Include(os => os.Produtos)
            .ThenInclude(p => p.Equipamento)?
            .Include(os => os.Vendedor)
            .Include(os => os.Cliente)
            .Where(os => os.Status == Status.SolicitadoBaixa)
            .ToList()
        );
#pragma warning restore CS8620 // O argumento não pode ser usado para o parâmetro devido a diferenças na nulidade dos tipos de referência.
    }

    return Results.NotFound("Tabela vazia!");
});

app.MapPatch("/solicitar-baixa/autorizar/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    OrdemServico? OrdemServico = ctx.OrdemServicos.FirstOrDefault(os => os.OrdemServicoId == id);

    if (OrdemServico is null)
    {
        return Results.NotFound("Ordem de Serviço não encontrada!");
    }

    OrdemServico.Status = Status.Baixada;
    ctx.OrdemServicos.Update(OrdemServico);
    ctx.SaveChanges();

    return Results.Ok("Ordem de serviço baixada!!");
});

app.Run();