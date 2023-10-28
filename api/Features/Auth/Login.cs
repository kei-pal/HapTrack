using api.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace api.Features.Auth;

public partial class AuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(UserDto request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null)
        {
            return BadRequest("User not found.");
        }

        if(!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
        {
            return BadRequest("Wrong password.");
        }

        var token = CreateJwt(user);

        var daysSinceLastLogin = ((int)(DateTime.Now - user.LastLogin).TotalDays);

        if (daysSinceLastLogin > 0)
        {
            var userHabits = await _context.Habits
                .Include(h => h.User)
                .Where(h => h.User == user)
                .ToListAsync();

            foreach (var habit in userHabits)
            {
                if (daysSinceLastLogin < 32)
                {
                    // TODO: shift/add byte array to represent missed days
                }
                else
                {
                    habit.History = new byte[] { 00000000, 00000000, 0000000 };
                }
            }
        }

        user.LastLogin = DateTime.Now;
        await _context.SaveChangesAsync();

        return Ok(token);
    }

    private static bool VerifyPasswordHash(string requestPassword, byte[] passwordHash, byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512(passwordSalt);
        var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(requestPassword));
        return computeHash.SequenceEqual(passwordHash);
    }

    private string CreateJwt(HtUser user)
    {
        List<Claim> claims = new()
        {
            new Claim(ClaimTypes.Email, user.Email),
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8
            .GetBytes(_configuration.GetSection("JwtKey").Value));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds);

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}

