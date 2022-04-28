using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Data.Models;
using Server.Features.Topics.Models;
using System.Security.Claims;

namespace Server.Features.Topics
{
    public class TopicsController : ApiController
    {
        private readonly ApplicationDbContext dbContext;
        private readonly TopicsService topicsService;

        public TopicsController(ApplicationDbContext dbContext, TopicsService topicsService)
        {
            this.dbContext = dbContext;
            this.topicsService = topicsService;
        }

        [HttpPost]
        [Authorize]
        [Route("Create")]
        public async Task<ActionResult<int>> Create(CreateTopicModel model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return BadRequest();
            }

            var createdTopic = await topicsService.Create(model, userId);

            return Created("Create", createdTopic.Id);
        }

        [HttpPut]
        [Route("UpdateById/{topicId}")]
        public async Task<ActionResult<Post>> UpdateById(int topicId, CreateTopicModel model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return BadRequest();
            }

            var userCanUpdateThisTopic = await topicsService.canUserUpdateThisTopic(topicId, userId);
            if (!userCanUpdateThisTopic)
            {
                return this.Forbid();
            }

            try
            {
                var post = await this.topicsService.UpdateById(topicId, model, userId);
                return this.Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetById/{topicId}")]
        public async Task<ActionResult<Topic>> GetById(int topicId)
        {
            try
            {
                var topic = await this.topicsService.GetById(topicId);
                return this.Ok(topic);
            }
            catch
            {
                return this.NotFound();
            }
        }

        [Route("DeleteById/{topicId}")]
        [Authorize]
        [HttpDelete]
        public async Task<ActionResult> DeleteById(int topicId)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return BadRequest();
            }

            var userCanDeleteThisTopic = await topicsService.canUserDeleteThisTopic(topicId, userId);
            if (!userCanDeleteThisTopic)
            {
                return this.Forbid();
            }

            var deleted = await this.topicsService.DeleteById(topicId);
            if (!deleted)
            {
                return this.Conflict();
            }
            return this.Ok();
        }

    }
}
