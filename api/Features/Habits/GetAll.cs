using api.Data;
using api.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Habits;

[Route("api/[controller]")]
[ApiController]
public partial class HabitsController : ControllerBase
{
    private readonly HtContext _context;

    public HabitsController(HtContext context)
    {
        _context = context;
    }

    // GET: api/Habits
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Habit>>> GetHabits()
    {
        if (_context.Habits == null)
        {
            return NotFound();
        }
        return await _context.Habits.ToListAsync();
    }
}
