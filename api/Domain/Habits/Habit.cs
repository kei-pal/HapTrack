namespace api.Domain.Habits;

public class Habit
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public Phase Phase { get; set; } = Phase.New;
    public byte[] History { get; set; } = Array.Empty<byte>();

    // Navigation Properties
    public HtUser User { get; set; } = default!;
}
