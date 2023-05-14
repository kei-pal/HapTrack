using System.Security.Cryptography;

namespace api.Features.Auth;

public static class PasswordService
{
    public static void CreatePasswordHash(String password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512();
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
    }
}
