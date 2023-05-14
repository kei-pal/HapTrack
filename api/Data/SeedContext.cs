using api.Domain.Habits;

namespace api.Data;

public static class SeedContext
{
    public static void Seed(this HtContext context)
    {
        var habits = new Habit[]
        {
            new Habit() { Name = "Seeded New Habit", Phase = Phase.New, History = 0b00000000000000000000000000000000 },
            new Habit() { Name = "Seeded Strong Habit", Phase = Phase.Strong, History = 0b00000000000000000000000000000111 },
            new Habit() { Name = "Seeded Building Habit", Phase = Phase.Build, History = 0b00000000000000000000000000000011 },
            new Habit() { Name = "Seeded Fading Habit", Phase = Phase.Fade, History = 0b00000000000000000000000000000100 },
            new Habit() { Name = "Seeded Plateau Habit", Phase = Phase.Plateau, History = 0b00000000000000000000000000000010 },
            new Habit() { Name = "Seeded Every Other Day Habit", Phase = Phase.Plateau, History = 0b00101010101010101010101010101010 },
        };

        context.Habits.AddRange(habits);
        context.SaveChanges();
    }
}
