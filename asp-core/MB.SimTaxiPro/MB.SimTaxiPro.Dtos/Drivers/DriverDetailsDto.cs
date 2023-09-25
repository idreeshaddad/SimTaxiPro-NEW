using MB.SimTaxiPro.Dtos.Cars;
using MB.SimTaxiPro.Utils.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace MB.SimTaxiPro.Dtos.Drivers
{
    public class DriverDetailsDto
    {
        public DriverDetailsDto()
        {
            Cars = new List<CarListDto>();
        }

        public int Id { get; set; }
        public string FullName { get; set; }
        public string SSN { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }

        public List<CarListDto> Cars { get; set; }
    }
}
