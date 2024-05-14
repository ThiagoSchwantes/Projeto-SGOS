using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using ProjetoSGOS.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapPost("/cliente/cadastrar", ([FromBody] Cliente cliente, [FromServices] AppDbContext ctx) => 
{
    ctx.Clientes.Add(cliente);
    ctx.SaveChanges();
    return Results.Created("",cliente);
});



app.Run();
