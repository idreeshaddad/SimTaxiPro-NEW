using MB.SimTaxiPro.Dtos.Passengers;
using MB.SimTaxiPro.Utils.Enums;

namespace MB.SimTaxiPro.Dtos.Bookings
{
    public class BookingDetailsDto
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public DateTime PickUpTime { get; set; }

        public string CarTitle { get; set; }

        public string DriverFullName { get; set; }

        public List<PassengerDto> Passengers { get; set; }

        public bool IsPaid { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public double Price { get; set; }
        public DateTime? PaymentTime { get; set; }
    }
}
