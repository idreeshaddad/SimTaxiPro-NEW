using AutoMapper;
using MB.SimTaxiPro.Dtos.Bookings;
using MB.SimTaxiPro.Entities;

namespace MB.SimTaxiPro.WebApi.AutoMapperProfiles
{
    public class BookingAutoMapperProfile : Profile
    {
        public BookingAutoMapperProfile()
        {
            CreateMap<Booking, BookingDto>();

            CreateMap<Booking, BookingDetailsDto>();
            CreateMap<CreateUpdateBookingDto, Booking>();

            CreateMap<Booking, CreateUpdateBookingDto>()
                .ForMember(dest => dest.PassengerIds, opts => opts.MapFrom(src => src.Passengers.Select(passenger => passenger.Id)));
        }
    }
}
