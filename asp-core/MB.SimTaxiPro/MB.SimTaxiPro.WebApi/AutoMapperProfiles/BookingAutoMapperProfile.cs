using AutoMapper;
using MB.SimTaxiPro.Dtos.Bookings;
using MB.SimTaxiPro.Entities;

namespace MB.SimTaxiPro.WebApi.AutoMapperProfiles
{
    public class BookingAutoMapperProfile : Profile
    {
        public BookingAutoMapperProfile()
        {
            CreateMap<Booking, BookingListDto>();
            CreateMap<Booking, BookingDetailsDto>();
            CreateMap<CreateUpdateBookingDto, Booking>().ReverseMap();
        }
    }
}
