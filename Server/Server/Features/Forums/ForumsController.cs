using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Data.Models;
using Server.Features.Forums.Models;
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

        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<List<Forum>>> GetAll()
        {
            var forums = await this.forumService.GetAll();

            return this.Ok(forums);
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

        [HttpGet]
        [Route("GetById/{forumId}")]
        public async Task<ActionResult<Forum>> GetById(int forumId)
        {
            try
            {
                var forum = await this.forumService.GetById(forumId);
                return this.Ok(forum);
            } catch
            {
                return this.NotFound();
            }
        }

        [Route("UpdateById/{forumId}")]
        [HttpPut]
        public async Task<ActionResult> UpdateById(int forumId, UpdateForumModel model)
        {
            var updated = await this.forumService.UpdateById(forumId, model);

            if (!updated)
            {
                return this.BadRequest();
            }
            return this.Ok();
        }

        [Route("DeleteById/{forumId}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteById(int forumId)
        {
            var deleted = await this.forumService.DeleteById(forumId);

            if (!deleted)
            {
                return this.BadRequest();
            }
            return this.Ok();
        }

    }
}
