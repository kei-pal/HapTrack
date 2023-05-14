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
    public async Task<ActionResult<HtUser>> Register(UserDto request)
    {
        PasswordService.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

        var user = new HtUser
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
}
