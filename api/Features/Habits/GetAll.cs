using api.Data;
using api.Domain.Habits;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;
using System.Security.Claims;
using static api.Features.Habits.GetAll;

namespace api.Features.Habits;

[Route("api/[controller]")]
[ApiController]
[Authorize]
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
        var userEmail = User.FindFirstValue(ClaimTypes.Email);

        var habits = await _context.Habits
        .Include(h => h.User)
        .Where(h => h.User.Email == userEmail)
        .ToListAsync();

        var habitsVM = habits.Select(h => new HabitsVM
        {
            Id = h.Id,
            Name = h.Name,
            Phase = h.Phase.ToString(),
            History = h.History,
        }).ToList();

        return habitsVM;
    }
}

public class GetAll
{
    public record HabitsVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string Phase { get; set; } = default!;
        public byte[] History { get; set; } = default!;
    }
}