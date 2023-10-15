using MB.SimTaxiPro.Utils.Enums;

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

        public bool IsPaid { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public double Price { get; set; }

        public List<Passenger> Passengers { get; set; } = new List<Passenger>();
    }
}
