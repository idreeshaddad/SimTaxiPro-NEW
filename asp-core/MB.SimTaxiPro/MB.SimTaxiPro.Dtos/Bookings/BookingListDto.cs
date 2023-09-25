namespace MB.SimTaxiPro.Dtos.Bookings
{
    public class BookingListDto
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public DateTime PickUpTime { get; set; }

        public string CarTitle { get; set; }

        public string DriverFullName { get; set; }
    }
}
