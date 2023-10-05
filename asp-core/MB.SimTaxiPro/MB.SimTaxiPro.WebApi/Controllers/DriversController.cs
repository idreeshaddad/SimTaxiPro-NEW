using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.SimTaxiPro.Entities;
using MB.SimTaxiPro.EntityFrameworkCore;
using AutoMapper;
using MB.SimTaxiPro.Dtos.Drivers;

namespace MB.SimTaxiPro.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        #region Data and Const

        private readonly SimTaxiProDbContext _context;
        private readonly IMapper _mapper;

        public DriversController(SimTaxiProDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverDto>>> GetDrivers()
        {
            var drivers = await _context
                            .Drivers
                            .ToListAsync();

            var driverDtos = _mapper.Map<List<DriverDto>>(drivers);

            return driverDtos;                            
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DriverDetailsDto>> GetDriver(int id)
        {
            var driver = await _context
                                    .Drivers
                                    .Include(driver => driver.Cars)
                                    .SingleOrDefaultAsync(driver => driver.Id == id);

            if (driver == null)
            {
                return NotFound();
            }

            var driverDto = _mapper.Map<DriverDetailsDto>(driver);

            return driverDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateDriverDto>> GetDriverForEdit(int id)
        {
            var driver = await _context
                                    .Drivers
                                    .SingleOrDefaultAsync(driver => driver.Id == id);

            if (driver == null)
            {
                return NotFound();
            }

            var driverDto = _mapper.Map<CreateUpdateDriverDto>(driver);

            return driverDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDriver(int id, CreateUpdateDriverDto driverDto)
        {
            if (id != driverDto.Id)
            {
                return BadRequest();
            }

            var driver = await _context
                                    .Drivers
                                    .FindAsync(id);

            if (driver == null)
            {
                return NotFound();
            }

            _mapper.Map(driverDto, driver);

            try
            {
                _context.Update(driver);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverExists(id))
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
        public async Task<ActionResult> CreateDriver(CreateUpdateDriverDto driverDto)
        {
            var driver = _mapper.Map<Driver>(driverDto);

            _context.Drivers.Add(driver);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var driver = await _context
                                .Drivers
                                .Include(driver => driver.Cars)
                                .Include(driver => driver.Bookings)
                                .Where(driver => driver.Id == id)
                                .SingleOrDefaultAsync();

            if (driver == null)
            {
                return NotFound();
            } 

            _context.Drivers.Remove(driver);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> AssignDriverCars(int driverId, List<int> carIds)
        {
            var driver = await _context
                            .Drivers
                            .Include(driver => driver.Cars)
                            .SingleOrDefaultAsync(driver => driver.Id == driverId);

            if (driver == null)
            {
                return NotFound($"Driver with Id={driverId} cannot be found");
            }

            var cars = await _context
                                .Cars
                                .Where(car => carIds.Contains(car.Id))
                                .ToListAsync();

            if (cars.Count() == 0)
            {
                return NotFound($"Cars with Ids={carIds.ToString()} cannot be found");
            }


            driver.Cars.AddRange(cars);
            _context.Update(driver);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> UnassignCar(int driverId, int carId)
        {
            var car = await _context.Cars.FindAsync(carId);

            if (car == null)
            {
                return NotFound();
            }

            car.DriverId = null;

            _context.Update(car);
            await _context.SaveChangesAsync();

            return Ok();
        }

        #endregion

        #region Private Methods

        private bool DriverExists(int id)
        {
            return (_context.Drivers?.Any(e => e.Id == id)).GetValueOrDefault();
        } 

        #endregion
    }
}
