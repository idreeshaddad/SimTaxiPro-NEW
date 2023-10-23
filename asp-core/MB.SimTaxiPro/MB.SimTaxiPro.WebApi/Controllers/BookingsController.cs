using AutoMapper;
using MB.SimTaxiPro.Dtos.Bookings;
using MB.SimTaxiPro.Entities;
using MB.SimTaxiPro.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MB.SimTaxiPro.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        #region Data and Const

        private readonly SimTaxiProDbContext _context;
        private readonly IMapper _mapper;

        public BookingsController(SimTaxiProDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetBookings()
        {
            var bookings = await _context
                                .Bookings
                                .Include(b => b.Car)
                                .Include(b => b.Driver)
                                .ToListAsync();

            var bookingDtos = _mapper.Map<List<BookingDto>>(bookings);

            return bookingDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDetailsDto>> GetBooking(int id)
        {
            var booking = await _context
                                    .Bookings
                                    .Include(b => b.Car)
                                    .Include(b => b.Driver)
                                    .Include(b => b.Passengers)
                                    .Where(b => b.Id == id)
                                    .SingleOrDefaultAsync();

            if (booking == null)
            {
                return NotFound();
            }

            var bookingDto = _mapper.Map<BookingDetailsDto>(booking);

            return bookingDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateBookingDto>> GetBookingForEdit(int id)
        {
            var booking = await _context
                                    .Bookings
                                    .Include(booking => booking.Car)
                                    .Include (booking => booking.Driver)
                                    .Include(booking => booking.Passengers)
                                    .SingleOrDefaultAsync(booking => booking.Id == id);

            if (booking == null)
            {
                return NotFound();
            }

            var bookingDto = _mapper.Map<CreateUpdateBookingDto>(booking);

            return bookingDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBooking(int id, CreateUpdateBookingDto bookingDto)
        {
            if (id != bookingDto.Id)
            {
                return BadRequest();
            }

            var booking = await _context
                            .Bookings
                            .Include(booking => booking.Passengers)
                            .Where(booking => booking.Id == id)
                            .SingleOrDefaultAsync();

            if (booking == null)
            {
                return NotFound();
            }

            _mapper.Map(bookingDto, booking);

            await UpdateBookingPassengers(booking, bookingDto.PassengerIds);

            _context.Update(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking(CreateUpdateBookingDto bookingDto)
        {
            var booking = _mapper.Map<Booking>(bookingDto);

            await UpdateBookingPassengers(booking, bookingDto.PassengerIds);

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> PayBooking([FromBody]int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            booking.IsPaid = true;

            _context.Update(booking);
            await _context.SaveChangesAsync();

            return Ok();
        }


        #endregion

        #region Private Functions

        private bool BookingExists(int id)
        {
            return (_context.Bookings?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private async Task UpdateBookingPassengers(Booking booking, List<int> passengerIds)
        {
            booking.Passengers.Clear();

            var passengers = await _context
                                        .Passengers
                                        .Where(passenger => passengerIds.Contains(passenger.Id))
                                        .ToListAsync();

            booking.Passengers.AddRange(passengers); // if passengers is empty it WILL add nothing but it will add

        }

        #endregion
    }
}
