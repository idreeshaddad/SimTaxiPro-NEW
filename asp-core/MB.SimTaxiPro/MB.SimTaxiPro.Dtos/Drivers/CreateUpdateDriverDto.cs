using MB.SimTaxiPro.Utils.Enums;

namespace MB.SimTaxiPro.Dtos.Drivers
{
    public class CreateUpdateDriverDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SSN { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }

        public string FullName { get; set; }
    }
}
