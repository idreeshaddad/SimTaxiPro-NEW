using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.SimTaxiPro.Entities;
using MB.SimTaxiPro.EntityFrameworkCore;
using AutoMapper;
using MB.SimTaxiPro.Dtos.Passengers;
using MB.SimTaxiPro.Dtos;

namespace MB.SimTaxiPro.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        #region Data and Const

        private readonly SimTaxiProDbContext _context;
        private readonly IMapper _mapper;

        public PassengersController(SimTaxiProDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PassengerDto>>> GetPassengers()
        {
            var passengers = await _context
                                .Passengers
                                .ToListAsync();

            var passengerDtos = _mapper.Map<List<PassengerDto>>(passengers);

            return passengerDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PassengerDetailsDto>> GetPassenger(int id)
        {
            var passenger = await _context
                                .Passengers
                                .Include(passenger => passenger.Bookings)
                                .Where(passenger => passenger.Id == id)
                                .SingleOrDefaultAsync();

            if (passenger == null)
            {
                return NotFound();
            }

            var passengerDto = _mapper.Map<PassengerDetailsDto>(passenger);

            return Ok(passengerDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdatePassengerDto>> GetPassengerForEdit(int id)
        {
            var passenger = await _context.Passengers.FindAsync(id);

            if(passenger == null)
            {
                return NotFound();
            }

            var passengerDto = _mapper.Map<CreateUpdatePassengerDto>(passenger);

            return passengerDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPassenger(int id, CreateUpdatePassengerDto passengerDto)
        {
            if (id != passengerDto.Id)
            {
                return BadRequest();
            }

            var passenger = await _context.Passengers.FindAsync(id);

            if(passenger == null)
            {
                return NotFound();
            }

            _mapper.Map(passengerDto, passenger);

            try
            {
                _context.Update(passenger);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassengerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> CreatePassenger(CreateUpdatePassengerDto passengeDto)
        {
            var passenger = _mapper.Map<Passenger>(passengeDto);

            _context.Passengers.Add(passenger);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassenger(int id)
        {
            if (_context.Passengers == null)
            {
                return NotFound();
            }
            var passenger = await _context.Passengers.FindAsync(id);
            if (passenger == null)
            {
                return NotFound();
            }

            _context.Passengers.Remove(passenger);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<LookupDto>>> GetPassengersLookup()
        {
            var passengersLookup = await _context
                                            .Passengers
                                            .Select(pass => new LookupDto()
                                            {
                                                Key = pass.Id,
                                                Value = pass.FullName
                                            })
                                            .ToListAsync();

            return Ok(passengersLookup);
        }

        #endregion

        #region Private Method

        private bool PassengerExists(int id)
        {
            return (_context.Passengers?.Any(e => e.Id == id)).GetValueOrDefault();
        } 

        #endregion
    }
}
