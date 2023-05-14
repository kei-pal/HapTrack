using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace api.Features.Habits;

public partial class HabitsController : ControllerBase
{
    // DELETE: api/Habits/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHabit(Guid id)
    {
        var userEmail = User.FindFirstValue(ClaimTypes.Email);
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == userEmail);
        if (user == null) { return NotFound(); }

        var habit = await _context.Habits.FindAsync(id);
        if (habit == null)
        {
            return NotFound();
        }

        if (habit.User != user) { return Unauthorized(); }

        _context.Habits.Remove(habit);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}