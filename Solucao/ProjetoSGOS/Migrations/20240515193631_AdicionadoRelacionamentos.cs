using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoSGOS.Migrations
{
    /// <inheritdoc />
    public partial class AdicionadoRelacionamentos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FormaDePagamento",
                table: "Pagamentos",
                newName: "Forma");

            migrationBuilder.RenameColumn(
                name: "CriadoEm",
                table: "Pagamentos",
                newName: "OrdemServicoId");

            migrationBuilder.AddColumn<string>(
                name: "AcabamentoId",
                table: "Produtos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EquipamentoId",
                table: "Produtos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Valor",
                table: "Pagamentos",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "OrdemServicos",
                columns: table => new
                {
                    OrdemServicoId = table.Column<string>(type: "TEXT", nullable: false),
                    DataAbertura = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ClienteId = table.Column<string>(type: "TEXT", nullable: false),
                    FuncionarioId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdemServicos", x => x.OrdemServicoId);
                    table.ForeignKey(
                        name: "FK_OrdemServicos_Clientes_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clientes",
                        principalColumn: "ClienteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdemServicos_Funcionarios_FuncionarioId",
                        column: x => x.FuncionarioId,
                        principalTable: "Funcionarios",
                        principalColumn: "FuncionarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_AcabamentoId",
                table: "Produtos",
                column: "AcabamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_EquipamentoId",
                table: "Produtos",
                column: "EquipamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServicos_ClienteId",
                table: "OrdemServicos",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServicos_FuncionarioId",
                table: "OrdemServicos",
                column: "FuncionarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pagamentos_OrdemServicos_PagamentoId",
                table: "Pagamentos",
                column: "PagamentoId",
                principalTable: "OrdemServicos",
                principalColumn: "OrdemServicoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Acabamentos_AcabamentoId",
                table: "Produtos",
                column: "AcabamentoId",
                principalTable: "Acabamentos",
                principalColumn: "AcabamentoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Equipamentos_EquipamentoId",
                table: "Produtos",
                column: "EquipamentoId",
                principalTable: "Equipamentos",
                principalColumn: "EquipamentoId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pagamentos_OrdemServicos_PagamentoId",
                table: "Pagamentos");

            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Acabamentos_AcabamentoId",
                table: "Produtos");

            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Equipamentos_EquipamentoId",
                table: "Produtos");

            migrationBuilder.DropTable(
                name: "OrdemServicos");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_AcabamentoId",
                table: "Produtos");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_EquipamentoId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "AcabamentoId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "EquipamentoId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "Valor",
                table: "Pagamentos");

            migrationBuilder.RenameColumn(
                name: "OrdemServicoId",
                table: "Pagamentos",
                newName: "CriadoEm");

            migrationBuilder.RenameColumn(
                name: "Forma",
                table: "Pagamentos",
                newName: "FormaDePagamento");
        }
    }
}
