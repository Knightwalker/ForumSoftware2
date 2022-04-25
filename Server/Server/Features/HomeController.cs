using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Server.Features
{
    public class HomeController : ApiController
    {
        [ApiExplorerSettings(IgnoreApi = true)] // Hide from Swagger, Otherwise we get NoMethod error
        public ActionResult Get()
        {
            return this.Ok("Works");
        }
    }
}