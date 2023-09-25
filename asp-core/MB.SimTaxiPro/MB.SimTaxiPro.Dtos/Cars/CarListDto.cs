namespace MB.SimTaxiPro.Dtos.Cars
{
    public class CarListDto
    {
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string PlateNumber { get; set; }
        public DateTime ProductionYear { get; set; }

        public string DriverFullName { get; set; }
    }
}
