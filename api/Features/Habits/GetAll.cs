using api.Data;
using api.Domain.Habits;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;
using static api.Features.Habits.GetAll;

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
    public async Task<ActionResult<IEnumerable<HabitsVM>>> GetHabits()
    {
        var habits = await _context.Habits
            .Select(h => new HabitsVM
            {
                Id = h.Id,
                Name = h.Name,
                Phase = h.Phase.ToString(),
            })
            .ToListAsync();

        return habits;
    }
}

public class GetAll
{
    public record HabitsVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string Phase { get; set; } = default!;
    }
}