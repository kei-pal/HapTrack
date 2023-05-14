using api.Domain.Habits;

namespace api.Data;

public static class SeedContext
{
    public static void Seed(this HtContext context)
    {
        var habits = new Habit[]
        {
            new Habit() { Name = "Seeded Strong Habit", Phase = Phase.Strong },
            new Habit() { Name = "Seeded Building Habit", Phase = Phase.Build },
            new Habit() { Name = "Seeded Fading Habit", Phase = Phase.Fade },
            new Habit() { Name = "Seeded New Habit", Phase = Phase.New },
            new Habit() { Name = "Seeded Plateau Habit", Phase = Phase.Plateau },
        };

        context.Habits.AddRange(habits);
        context.SaveChanges();
    }
}
