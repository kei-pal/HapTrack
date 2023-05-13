namespace api.Domain;

public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = default!;
    public byte[] PasswordHash { get; set; } = default!;
    public byte[] PasswordSalt { get; set; } = default!;
}
