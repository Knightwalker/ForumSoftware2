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
        private readonly ForumsService forumsService;

        public ForumsController(ApplicationDbContext dbContext, ForumsService forumsService)
        {
            this.dbContext = dbContext;
            this.forumsService = forumsService;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<List<Forum>>> GetAll()
        {
            var forums = await this.forumsService.GetAll();

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

            try
            {
                var createdForum = await forumsService.Create(model, userId);
                return Created("Create", createdForum.Id);
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }

        }

        [HttpGet]
        [Route("GetById/{forumId}")]
        public async Task<ActionResult<Forum>> GetById(int forumId)
        {
            try
            {
                var forum = await this.forumsService.GetById(forumId);
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
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return BadRequest();
            }

            var userCanUpdateThisForum = await forumsService.canUserUpdateThisForum(forumId, userId);
            if (!userCanUpdateThisForum)
            {
                return this.Forbid();
            }

            var updated = await this.forumsService.UpdateById(forumId, model);
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
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return BadRequest();
            }

            var userCanDeleteThisForum = await forumsService.canUserDeleteThisForum(forumId, userId);
            if (!userCanDeleteThisForum)
            {
                return this.Forbid();
            }

            var deleted = await this.forumsService.DeleteById(forumId);
            if (!deleted)
            {
                return this.Conflict();
            }
            return this.Ok();
        }

    }
}
