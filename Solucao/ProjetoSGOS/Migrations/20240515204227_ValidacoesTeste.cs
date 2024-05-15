using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoSGOS.Migrations
{
    /// <inheritdoc />
    public partial class ValidacoesTeste : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Clientes_CPF_RG",
                table: "Clientes");

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_CPF",
                table: "Clientes",
                column: "CPF",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_RG",
                table: "Clientes",
                column: "RG",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_RG_CPF",
                table: "Clientes",
                columns: new[] { "RG", "CPF" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Clientes_CPF",
                table: "Clientes");

            migrationBuilder.DropIndex(
                name: "IX_Clientes_RG",
                table: "Clientes");

            migrationBuilder.DropIndex(
                name: "IX_Clientes_RG_CPF",
                table: "Clientes");

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_CPF_RG",
                table: "Clientes",
                columns: new[] { "CPF", "RG" },
                unique: true);
        }
    }
}
