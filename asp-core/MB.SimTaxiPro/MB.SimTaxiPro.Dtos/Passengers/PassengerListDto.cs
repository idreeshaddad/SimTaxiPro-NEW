using MB.SimTaxiPro.Utils.Enums;

namespace MB.SimTaxiPro.Dtos.Passengers
{
    public class PassengerListDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public Gender Gender { get; set; }

        public int Age { get; set; }
    }
}
