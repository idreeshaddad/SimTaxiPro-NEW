using MB.SimTaxiPro.Utils.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace MB.SimTaxiPro.Entities
{
    public class Driver
    {
        public Driver()
        {
            Cars = new List<Car>();
            Bookings = new List<Booking>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SSN { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }

        public List<Booking> Bookings { get; set; }
        public List<Car> Cars { get; set; }


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
                return DateTime.Now.Year - DateOfBirth.Year;
            }
        }
    }
}
