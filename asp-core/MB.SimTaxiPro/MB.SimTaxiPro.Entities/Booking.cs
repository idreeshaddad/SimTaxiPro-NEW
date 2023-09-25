namespace MB.SimTaxiPro.Entities
{
    public class Booking
    {
        public int Id { get; set; }
        public string From { get; set; } 
        public string To { get; set; } 
        public DateTime PickUpTime { get; set; }

        public int? CarId { get; set; }
        public Car Car { get; set; }

        public int? DriverId { get; set; }
        public Driver Driver { get; set; }

        public List<Passenger> Passengers { get; set; } = new List<Passenger>();
    }
}
