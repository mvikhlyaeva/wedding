using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Guests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GuestPersons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GuestId = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Attending = table.Column<bool>(type: "INTEGER", nullable: true),
                    DietaryRestrictions = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuestPersons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuestPersons_Guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "Guests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rsvps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GuestId = table.Column<int>(type: "INTEGER", nullable: false),
                    Note = table.Column<string>(type: "TEXT", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rsvps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rsvps_Guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "Guests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Guests",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { 1, "vd", "Виктория и Дмитрий" },
                    { 2, "aa", "Анастасия и Антон" },
                    { 3, "yana", "Яна" }
                });

            migrationBuilder.InsertData(
                table: "GuestPersons",
                columns: new[] { "Id", "Attending", "DietaryRestrictions", "GuestId", "Name" },
                values: new object[,]
                {
                    { 1, null, null, 1, "Виктория" },
                    { 2, null, null, 1, "Дмитрий" },
                    { 3, null, null, 2, "Анастасия" },
                    { 4, null, null, 2, "Антон" },
                    { 5, null, null, 3, "Яна" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_GuestPersons_GuestId",
                table: "GuestPersons",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_Code",
                table: "Guests",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rsvps_GuestId",
                table: "Rsvps",
                column: "GuestId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GuestPersons");

            migrationBuilder.DropTable(
                name: "Rsvps");

            migrationBuilder.DropTable(
                name: "Guests");
        }
    }
}
