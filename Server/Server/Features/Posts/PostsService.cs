using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Data.Models;
using Server.Features.Posts.Models;

namespace Server.Features.Posts
{
    public class PostsService
    {
        private readonly ApplicationDbContext dbContext;
        public PostsService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Post> Create(CreatePostModel model, string userId)
        {
            var post = new Post
            {
                Name = model.Name,
                Content = model.Content,
                TopicId = model.TopicId,
                UserId = userId
            };

            this.dbContext.Add(post);
            await this.dbContext.SaveChangesAsync();

            return post;
        }

        public async Task<Post> GetById(int postId)
        {
            var post = await this.dbContext.Posts
                .Where(x => x.Id == postId)
                .Select(x => new Post
                {
                    Id = x.Id,
                    Name = x.Name,
                    Content = x.Content,
                    TopicId =x.TopicId,
                    UserId = x.UserId,
                    CreatedOnDate = x.CreatedOnDate,
                    ModifiedOnDate = x.ModifiedOnDate,
                })
                .FirstOrDefaultAsync();

            if (post == null)
            {
                throw new Exception("Post not found");
            }

            return post;
        }

        public async Task<Post> UpdateById(int postId, CreatePostModel model, string userId)
        {
            var post = this.dbContext.Posts
                .Where(x => x.Id == postId)
                .FirstOrDefault();

            if (post == null)
            {
                throw new Exception();
            }

            post.Name = model.Name;
            post.Content = model.Content;
            post.ModifiedOnDate = DateTime.Now;
            await this.dbContext.SaveChangesAsync();

            return post;
        }

        public async Task<bool> DeleteById(int postId)
        {
            var post = await this.dbContext.Posts
                .Where(x => x.Id == postId)
                .FirstOrDefaultAsync();

            if (post == null)
            {
                return false;
            }

            try
            {
                this.dbContext.Posts.Remove(post);
                await this.dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }

        }

    }
}
