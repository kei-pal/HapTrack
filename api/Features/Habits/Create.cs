using api.Domain;
using Microsoft.AspNetCore.Mvc;

namespace api.Features.Habits;

public partial class HabitsController : ControllerBase
{
    // POST: api/Habits
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Habit>> PostHabit(CreateHabitCommand request)
    {
        var habit = new Habit()
        {
            Name = request.Name,
        };

        _context.Habits.Add(habit);
        await _context.SaveChangesAsync();

        return CreatedAtAction("PostHabit", new { id = habit.Id }, habit);
    }
}

public record CreateHabitCommand
{
    public string Name { get; set; } = default!;
}