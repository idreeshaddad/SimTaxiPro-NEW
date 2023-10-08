using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.SimTaxiPro.Entities;
using MB.SimTaxiPro.EntityFrameworkCore;
using AutoMapper;
using MB.SimTaxiPro.Dtos.Cars;

namespace MB.SimTaxiPro.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        #region Data and Const

        private readonly SimTaxiProDbContext _context;
        private readonly IMapper _mapper;

        public CarsController(SimTaxiProDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDto>>> GetCars()
        {
            var cars = await _context
                                .Cars
                                .Include(car => car.Driver)
                                .ToListAsync();

            var carDtos = _mapper.Map<List<CarDto>>(cars);

            return carDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CarDetailsDto>> GetCar(int id)
        {
            var car = await _context
                                .Cars
                                .Include(car => car.Driver)
                                .Where(car => car.Id == id)
                                .SingleOrDefaultAsync();

            if (car == null)
            {
                return NotFound();
            }

            var carDetailsDto = _mapper.Map<CarDetailsDto>(car);

            return carDetailsDto;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateCarDto>> GetCarForEdit(int id)
        {
            var car = await _context.Cars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            var createUpdateCarDto = _mapper.Map<CreateUpdateCarDto>(car);

            return createUpdateCarDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCar(int id, CreateUpdateCarDto createUpdateCarDto)
        {
            if (id != createUpdateCarDto.Id)
            {
                return BadRequest();
            }

            var car = await _context
                                .Cars
                                .FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            _mapper.Map(createUpdateCarDto, car);

            try
            {
                _context.Update(car);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
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
        public async Task<ActionResult<Car>> CreateCar(CreateUpdateCarDto createUpdateCarDto)
        {
            var car = _mapper.Map<Car>(createUpdateCarDto);

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion

        #region Private Functions

        private bool CarExists(int id)
        {
            return (_context.Cars?.Any(e => e.Id == id)).GetValueOrDefault();
        } 

        #endregion
    }
}
