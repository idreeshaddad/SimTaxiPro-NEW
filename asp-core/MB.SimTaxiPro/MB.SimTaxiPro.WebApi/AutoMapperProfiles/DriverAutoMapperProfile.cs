using AutoMapper;
using MB.SimTaxiPro.Dtos.Drivers;
using MB.SimTaxiPro.Entities;

namespace MB.SimTaxiPro.WebApi.AutoMapperProfiles
{
    public class DriverAutoMapperProfile : Profile
    {
        public DriverAutoMapperProfile()
        {
            CreateMap<Driver, DriverListDto>();
            CreateMap<Driver, DriverDetailsDto>();
            CreateMap<Driver, CreateUpdateDriverDto>().ReverseMap();
        }
    }
}
