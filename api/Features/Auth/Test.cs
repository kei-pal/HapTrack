using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Features.Auth;

public partial class AuthController : ControllerBase
{
    [HttpGet("test"), Authorize]
    public ActionResult<string> Test()
    {
        return Ok("Succesfully authorized.");
    }
}