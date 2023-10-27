using api.Domain;
using api.Domain.Habits;
using api.Features.Auth;

namespace api.Data;

public static class SeedContext
{
    public static void Seed(this HtContext context)
    {
        string user1Password = "string";
        PasswordService.CreatePasswordHash(user1Password, out byte[] user1Hash, out byte[] user1Salt);

        string user2Password = "test";
        PasswordService.CreatePasswordHash(user2Password, out byte[] user2Hash, out byte[] user2Salt);

        var users = new HtUser[]
        {
            new HtUser() { Email = "string", PasswordHash = user1Hash, PasswordSalt = user1Salt, LastLogin = DateTime.UtcNow.AddDays(-10) },
            new HtUser() { Email = "test", PasswordHash = user2Hash, PasswordSalt = user2Salt },
        };

        context.Users.AddRange(users);
        context.SaveChanges();

        var habits = new Habit[]
        {
            new Habit() { Name = "Seeded New Habit", User = users[0], Phase = Phase.New, History = new byte[] { 0b00000000, 0b00000000, 0b0000000, 0b0000000 } },
            new Habit() { Name = "Seeded Strong Habit", User = users[0], Phase = Phase.Strong, History = new byte[] { 0b11111111, 0b11111111, 0b11111111 } },
            new Habit() { Name = "Seeded Building Habit", User = users[1], Phase = Phase.Build, History = new byte[] { 0b00000000, 0b00001111, 0b11111111 } },
            new Habit() { Name = "Seeded Fading Habit", User = users[0], Phase = Phase.Fade, History = new byte[] { 0b11111111, 0b11110000, 0b00000000, 0b00000000 } },
            new Habit() { Name = "Seeded Plateau Habit", User = users[0], Phase = Phase.Plateau, History = new byte[] { 0b00010001, 0b00010001, 0b00010001 } },
            new Habit() { Name = "Seeded Every Other Day Habit", User = users[0], Phase = Phase.Plateau, History = new byte[] { 0b10101010, 0b10101010, 0b10101010 } },
        };

        context.Habits.AddRange(habits);
        context.SaveChanges();
    }
}
