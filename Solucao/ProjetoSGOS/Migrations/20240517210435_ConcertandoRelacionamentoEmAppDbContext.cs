using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoSGOS.Migrations
{
    /// <inheritdoc />
    public partial class ConcertandoRelacionamentoEmAppDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdemServicos_Clientes_OrdemServicoId",
                table: "OrdemServicos");

            migrationBuilder.DropForeignKey(
                name: "FK_Pagamentos_OrdemServicos_PagamentoId",
                table: "Pagamentos");

            migrationBuilder.AlterColumn<int>(
                name: "PagamentoId",
                table: "Pagamentos",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AlterColumn<int>(
                name: "OrdemServicoId",
                table: "OrdemServicos",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateIndex(
                name: "IX_Pagamentos_OrdemServicoId",
                table: "Pagamentos",
                column: "OrdemServicoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServicos_ClienteId",
                table: "OrdemServicos",
                column: "ClienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrdemServicos_Clientes_ClienteId",
                table: "OrdemServicos",
                column: "ClienteId",
                principalTable: "Clientes",
                principalColumn: "ClienteId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pagamentos_OrdemServicos_OrdemServicoId",
                table: "Pagamentos",
                column: "OrdemServicoId",
                principalTable: "OrdemServicos",
                principalColumn: "OrdemServicoId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdemServicos_Clientes_ClienteId",
                table: "OrdemServicos");

            migrationBuilder.DropForeignKey(
                name: "FK_Pagamentos_OrdemServicos_OrdemServicoId",
                table: "Pagamentos");

            migrationBuilder.DropIndex(
                name: "IX_Pagamentos_OrdemServicoId",
                table: "Pagamentos");

            migrationBuilder.DropIndex(
                name: "IX_OrdemServicos_ClienteId",
                table: "OrdemServicos");

            migrationBuilder.AlterColumn<int>(
                name: "PagamentoId",
                table: "Pagamentos",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AlterColumn<int>(
                name: "OrdemServicoId",
                table: "OrdemServicos",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdemServicos_Clientes_OrdemServicoId",
                table: "OrdemServicos",
                column: "OrdemServicoId",
                principalTable: "Clientes",
                principalColumn: "ClienteId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pagamentos_OrdemServicos_PagamentoId",
                table: "Pagamentos",
                column: "PagamentoId",
                principalTable: "OrdemServicos",
                principalColumn: "OrdemServicoId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
