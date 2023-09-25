using MB.SimTaxiPro.Utils.Enums;

namespace MB.SimTaxiPro.Dtos.Drivers
{
    public class DriverListDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string SSN { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }
    }
}
