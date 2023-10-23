using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MB.SimTaxiPro.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class Booking_paymentTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentTime",
                table: "Bookings",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentTime",
                table: "Bookings");
        }
    }
}
