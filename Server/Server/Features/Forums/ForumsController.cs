using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using System.Security.Claims;

namespace Server.Features.Forums
{
    public class ForumsController : ApiController
    {
        private readonly ApplicationDbContext dbContext;
        private readonly ForumsService forumService;

        public ForumsController(ApplicationDbContext dbContext, ForumsService forumService)
        {
            this.dbContext = dbContext;
            this.forumService = forumService;
        }

        [HttpPost]
        [Authorize]
        [Route("Create")]
        public async Task<ActionResult<int>> Create(CreateForumsModel model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return BadRequest();
            }

            var createdForum = await forumService.Create(model, userId);

            return Created("Create", createdForum.Id);

        }
    }
}
