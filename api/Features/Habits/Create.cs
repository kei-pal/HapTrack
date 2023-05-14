using api.Domain.Habits;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace api.Features.Habits;

public partial class HabitsController : ControllerBase
{
    // POST: api/Habits
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Habit>> PostHabit(CreateHabitCommand request)
    {
        var userEmail = User.FindFirstValue(ClaimTypes.Email);
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == userEmail);

        if (user == null) { return NotFound(); }

        var habit = new Habit()
        {
            Name = request.Name,
            User = user,
        };

        _context.Habits.Add(habit);
        await _context.SaveChangesAsync();

        return CreatedAtAction("PostHabit", new { id = habit.Id }, habit);
    }
}

public record CreateHabitCommand
{
    [StringLength(20, MinimumLength = 3)]
    public string Name { get; set; } = default!;
}