using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Data.Migrations
{
    public partial class n5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ModifiedDate",
                table: "Posts",
                newName: "ModifiedOnDate");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Posts",
                newName: "CreatedOnDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ModifiedOnDate",
                table: "Posts",
                newName: "ModifiedDate");

            migrationBuilder.RenameColumn(
                name: "CreatedOnDate",
                table: "Posts",
                newName: "CreatedDate");
        }
    }
}
