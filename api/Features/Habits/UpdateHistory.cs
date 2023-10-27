using api.Domain.Habits;
using Microsoft.AspNetCore.Mvc;
using static api.Features.Habits.UpdateHistory;

namespace api.Features.Habits;

public partial class HabitsController : ControllerBase
{
    // PUT: api/Habits/5/history
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}/history")]
    public async Task<IActionResult> PutHabitHistory(Guid id, UpdateHabitHistoryCommand request)
    {

        if (id != request.Id)
        {
            return BadRequest();
        }

        //var oldHabit = await _context.Habits.FindAsync(id);

        //Console.WriteLine($"Old:{oldHabit.History} New:{request.History}");

        var habit = new Habit { Id = request.Id, History = request.History }; // Create a new instance with the updated property

        _context.Entry(habit).Property(x => x.History).IsModified = true; // Mark the specific property as modified

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (Exception)
        {
            throw;
        }

        return NoContent();
    }
}

public class UpdateHistory
{
    public record UpdateHabitHistoryCommand
    {
        public Guid Id { get; set; }
        public byte[] History { get; set; } = Array.Empty<byte>();
    }
}