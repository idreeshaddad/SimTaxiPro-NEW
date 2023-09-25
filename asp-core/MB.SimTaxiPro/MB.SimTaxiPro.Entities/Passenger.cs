using MB.SimTaxiPro.Utils.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace MB.SimTaxiPro.Entities
{
    public class Passenger
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateofBirth { get; set; }
        public Gender Gender { get; set; }

        [NotMapped]
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
        [NotMapped]
        public int Age
        {
            get
            {
                return DateTime.Now.Year - DateofBirth.Year;
            }
        }

        public List<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
