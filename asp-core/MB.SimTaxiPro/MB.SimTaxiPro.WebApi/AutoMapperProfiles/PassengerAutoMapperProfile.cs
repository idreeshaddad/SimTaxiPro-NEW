using AutoMapper;
using MB.SimTaxiPro.Dtos.Passengers;
using MB.SimTaxiPro.Entities;

namespace MB.SimTaxiPro.WebApi.AutoMapperProfiles
{
    public class PassengerAutoMapperProfile : Profile
    {
        public PassengerAutoMapperProfile()
        {
            CreateMap<Passenger, PassengerListDto>();
            CreateMap<Passenger, PassengerDetailsDto>();
            CreateMap<Passenger, CreateUpdatePassengerDto>().ReverseMap();
        }
    }
}
