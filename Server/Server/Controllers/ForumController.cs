using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Data.Models;
using Server.Models.Forum;
using System.Security.Claims;

namespace Server.Controllers
{
    public class ForumController : ApiController
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<User> userManager;

        public ForumController(ApplicationDbContext dbContext, UserManager<User> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        [Authorize]
        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult<int>> Create(CreateForumModel model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return BadRequest();
            }

            var forum = new Forum
            {
                ParentId = model.ParentId,
                Type = model.Type,
                Name = model.Name,
                Description = model.Description,
                UserId = userId
            };

            this.dbContext.Add(forum);
            await this.dbContext.SaveChangesAsync();

            return Created("Create", forum.Id);

        }
    }
}
