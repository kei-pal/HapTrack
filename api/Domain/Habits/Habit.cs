namespace api.Domain.Habits;

public class Habit
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public Phase Phase { get; set; } = Phase.New;
    public int History { get; set; } // using bit stuffing

    // Navigation Properties
    public HtUser User { get; set; } = default!;
}
