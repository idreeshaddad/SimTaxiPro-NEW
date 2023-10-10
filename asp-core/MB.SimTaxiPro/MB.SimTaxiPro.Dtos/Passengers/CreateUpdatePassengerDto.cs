using MB.SimTaxiPro.Utils.Enums;

namespace MB.SimTaxiPro.Dtos.Passengers
{
    public class CreateUpdatePassengerDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }

        public string? FullName { get; set; }
    }
}
