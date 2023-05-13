using api.Data;
using api.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace api.Features.Auth;

[Route("api/[controller]")]
[ApiController]
public partial class AuthController : ControllerBase
{
    private readonly HtContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(HtContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;

    }

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(UserDto request)
    {
        CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

        var user = new User
        {
            Email = request.Email,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt
        };

        _context.Add(user);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            return BadRequest("User exists");
        }

        return Ok(user);
    }

    private static void CreatePasswordHash(String password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512();
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
    }
}
