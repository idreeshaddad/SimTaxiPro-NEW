namespace MB.SimTaxiPro.Entities
{
    public class Car
    {
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string PlateNumber { get; set; }
        public DateTime ProductionYear { get; set; }

        public string Title
        {
            get
            {
                return $"{Manufacturer} - {Model} - {PlateNumber}";
            }
        }

        public int? DriverId { get; set; }
        public Driver? Driver { get; set; }
    }
}
