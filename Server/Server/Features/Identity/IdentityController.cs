using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Server.Data;
using Server.Data.Models;
using Server.Features.Identity.Models;

namespace Server.Features.Identity
{
    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly AppSettings appSettings;
        private readonly IdentityService identityService;
        private readonly ApplicationDbContext dbContext;

        public IdentityController(
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            IdentityService identityService,
            ApplicationDbContext dbContext)
        {
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
            this.identityService = identityService;
            this.dbContext = dbContext;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> Register(RegisterRequestModel model)
        {
            var user = new User
            {
                Email = model.Email,
                UserName = model.UserName,
                ImageUrl = "https://2img.net/u/1614/38/46/76/avatars/7-15.jpg" // Default user workaround
            };
            try
            {
                var result = await userManager.CreateAsync(user, model.Password);
                return this.Ok();
            } catch (Exception ex)
            {
                Console.WriteLine(ex);
                return this.BadRequest(ex);
            }

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

        [HttpGet]
        [Route("GetById/{userId}")]
        public async Task<ActionResult<User>> GetById(string userId)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return this.NotFound();
            }

            return user;

        }

        [HttpPut]
        [Authorize]
        [Route("UpdateAvatarById/{userId}")]
        public async Task<ActionResult<User>> UpdateById(string userId, ChangeAvatarModel model)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return this.NotFound();
            }

            var dbUser = await this.dbContext.Users
               .Where(x => x.Id == userId)
               .FirstOrDefaultAsync();

            if (dbUser == null) { return this.NotFound(); }

            dbUser.ImageUrl = model.ImageUrl;
            dbContext.SaveChanges();
            user.ImageUrl = model.ImageUrl;

            return user;
        }

        [HttpPut]
        [Authorize]
        [Route("UpdateEmailById/{userId}")]
        public async Task<ActionResult<User>> UpdateById(string userId, ChangeEmailModel model)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return this.NotFound();
            }

            await userManager.SetEmailAsync(user, model.Email);

            return user;
        }

        [HttpPut]
        [Authorize]
        [Route("UpdateUsernameById/{userId}")]
        public async Task<ActionResult<User>> UpdateUsernameById(string userId, ChangeUserNameModel model)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return this.NotFound();
            }

            await userManager.SetUserNameAsync(user, model.UserName);

            return user;
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            var users = await this.dbContext.Users.Where(x => x.Id == x.Id).ToListAsync();

            if (users == null)
            {
                return BadRequest();
            }

            return users;
        }

    }
}
