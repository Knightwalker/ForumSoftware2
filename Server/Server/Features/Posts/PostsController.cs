using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Data.Models;
using Server.Features.Posts.Models;
using System.Security.Claims;

namespace Server.Features.Posts
{
    public class PostsController : ApiController
    {
        private readonly ApplicationDbContext dbContext;
        private readonly PostsService postsService;

        public PostsController(ApplicationDbContext dbContext, PostsService postsService)
        {
            this.dbContext = dbContext;
            this.postsService = postsService;
        }

        [HttpPost]
        [Authorize]
        [Route("Create")]
        public async Task<ActionResult<int>> Create(CreatePostModel model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return BadRequest();
            }

            var createdPost = await postsService.Create(model, userId);

            return Created("Create", createdPost.Id);
        }

        [HttpGet]
        [Route("GetById/{postId}")]
        public async Task<ActionResult<Post>> GetById(int postId)
        {
            try
            {
                var post = await this.postsService.GetById(postId);
                return this.Ok(post);
            }
            catch
            {
                return this.NotFound();
            }
        }

        [HttpPut]
        [Route("UpdateById/{postId}")]
        public async Task<ActionResult<Post>> UpdateById(int postId, CreatePostModel model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return BadRequest();
            }

            try
            {
                var post = await this.postsService.UpdateById(postId, model, userId);
                return this.Ok();
            }
            catch
            {
                return this.NotFound();
            }
        }

        [Route("DeleteById/{postId}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteById(int postId)
        {
            var deleted = await this.postsService.DeleteById(postId);

            if (!deleted)
            {
                return this.BadRequest();
            }
            return this.Ok();
        }

    }
}
