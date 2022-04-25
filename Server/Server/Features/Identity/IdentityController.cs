using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Server.Data.Models;

namespace Server.Features.Identity
{
    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly AppSettings appSettings;
        private readonly IdentityService identityService;

        public IdentityController(
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            IdentityService identityService)
        {
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
            this.identityService = identityService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> Register(RegisterRequestModel model)
        {
            var user = new User
            {
                Email = model.Email,
                UserName = model.UserName
            };
            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return this.Ok();
            }

            return this.BadRequest(result.Errors);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<string>> Login(LoginRequestModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return this.Unauthorized();
            }

            var isPasswordValid = await this.userManager.CheckPasswordAsync(user, model.Password);
            if (!isPasswordValid)
            {
                return this.Unauthorized();
            }

            var encryptedToken = this.identityService.GenerateJWT(user.UserName, user.Id, this.appSettings.Secret);
            return encryptedToken;

        }

    }
}
