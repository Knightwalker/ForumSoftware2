using Microsoft.AspNetCore.Mvc;

namespace Server.Features
{
    [ApiController]
    [Route("[controller]")]
    public abstract class ApiController : ControllerBase
    {
    }
}
