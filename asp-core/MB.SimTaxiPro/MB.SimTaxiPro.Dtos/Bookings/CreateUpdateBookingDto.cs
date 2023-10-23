using MB.SimTaxiPro.Utils.Enums;

namespace MB.SimTaxiPro.Dtos.Bookings
{
    public class CreateUpdateBookingDto
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public DateTime PickUpTime { get; set; }

        public int? CarId { get; set; }

        public int? DriverId { get; set; }

        public List<int> PassengerIds { get; set; } = new List<int>();

        public PaymentMethod PaymentMethod { get; set; }
        public double Price { get; set; }
    }
}
