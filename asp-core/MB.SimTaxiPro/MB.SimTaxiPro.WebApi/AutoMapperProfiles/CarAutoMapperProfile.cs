﻿using AutoMapper;
using MB.SimTaxiPro.Dtos.Cars;
using MB.SimTaxiPro.Entities;

namespace MB.SimTaxiPro.WebApi.AutoMapperProfiles
{
    public class CarAutoMapperProfile : Profile
    {
        public CarAutoMapperProfile()
        {
            CreateMap<Car, CarListDto>();
            CreateMap<Car, CarDetailsDto>();
            CreateMap<Car, CreateUpdateCarDto>().ReverseMap();
        }
    }
}
