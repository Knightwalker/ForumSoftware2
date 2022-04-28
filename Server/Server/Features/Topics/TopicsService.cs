using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Data.Models;
using Server.Features.Topics.Models;

namespace Server.Features.Topics
{
    public class TopicsService
    {
        private readonly ApplicationDbContext dbContext;
        public TopicsService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Topic> Create(CreateTopicModel model, string userId)
        {
            var topic = new Topic
            {
                Name = model.Name,
                Description = model.Description,
                ForumId = model.ForumId,
                UserId = userId
            };

            this.dbContext.Add(topic);
            await this.dbContext.SaveChangesAsync();

            return topic;
        }

        public async Task<Topic> GetById(int topicId)
        {
            var topic = await this.dbContext.Topics
                .Where(x => x.Id == topicId)
                .Select(x => new Topic
                {
                    Id = x.Id,
                    ForumId = x.ForumId,
                    Name = x.Name,
                    Description = x.Description,
                    UserId = x.UserId,
                    Posts = x.Posts.Select(p => new Post
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Content = p.Content,
                        TopicId = p.TopicId,
                        UserId = p.UserId,
                        User = p.User
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (topic == null)
            {
                throw new Exception("Topic not found");
            }

            return topic;
        }

        public async Task<Topic> UpdateById(int topicId, CreateTopicModel model, string userId)
        {
            var topic = this.dbContext.Topics
                .Where(x => x.Id == topicId)
                .FirstOrDefault();

            if (topic == null)
            {
                throw new Exception();
            }

            topic.Name = model.Name;
            topic.Description = model.Description;
            topic.ModifiedOnDate = DateTime.Now;
            await this.dbContext.SaveChangesAsync();

            return topic;
        }

        public async Task<bool> DeleteById(int topicId)
        {
            var topic = await this.dbContext.Topics
                .Where(x => x.Id == topicId)
                .FirstOrDefaultAsync();

            if (topic == null)
            {
                return false;
            }

            try
            {
                this.dbContext.Topics.Remove(topic);
                await this.dbContext.SaveChangesAsync();
                return true;
            } catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }

        }

        public async Task<bool> canUserUpdateThisTopic(int topicId, string userId)
        {
            var topic = await this.dbContext.Topics
                .Where(x => x.Id == topicId)
                .FirstOrDefaultAsync();

            if (topic == null)
            {
                return false;
            }

            if (userId != topic.UserId)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> canUserDeleteThisTopic(int topicId, string userId)
        {
            var topic = await this.dbContext.Topics
                .Where(x => x.Id == topicId)
                .FirstOrDefaultAsync();

            if (topic == null)
            {
                return false;
            }

            if (userId != topic.UserId)
            {
                return false;
            }
            return true;
        }

    }
}
