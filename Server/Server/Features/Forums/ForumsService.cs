using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Data.Models;
using Server.Features.Forums.Models;

namespace Server.Features.Forums
{
    public class ForumsService
    {
        private readonly ApplicationDbContext dbContext;
        public ForumsService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Forum> Create(CreateForumsModel model, string userId)
        {
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

            return forum;
        }

        public async Task<List<Forum>> GetAll()
        {
            var forums = await this.dbContext.Forums
                .Where(x => !x.ParentId.HasValue)
                .Select(x => new Forum 
                { 
                    Id = x.Id,
                    Type = x.Type,
                    Name = x.Name,
                    Description= x.Description,
                    UserId= x.UserId,
                    User = x.User,
                    Children = x.Children.Select(c => new Forum
                    {
                        Id = x.Id,
                        Type = x.Type,
                        Name = x.Name,
                        Description = x.Description,
                        UserId = x.UserId,
                    }).ToList()
                })
                .ToListAsync();

            return forums;
        }

        public async Task<Forum> GetById(int forumId)
        {
            var forum = await this.dbContext.Forums
                .Where(x => x.Id == forumId)
                .Select(x => new Forum
                {
                    Id = x.Id,
                    ParentId = x.ParentId,
                    Type = x.Type,
                    Name = x.Name,
                    Description = x.Description,
                    UserId = x.UserId,
                    User = x.User,
                    Children = x.Children.Select(f => new Forum
                    {
                        Id = f.Id,
                        Type = f.Type,
                        Name = f.Name,
                        Description = f.Description,
                        UserId = f.UserId,
                    }).ToList(),
                    Topics = x.Topics.Select(t => new Topic
                    {
                        Id = t.Id,
                        Name = t.Name,
                        UserId = t.UserId,
                        User = t.User,
                    }).ToList(),
                })
                .FirstOrDefaultAsync();

            if (forum == null)
            {
                throw new Exception("Forum not found");
            }

            return forum;
        }

        public async Task<bool> UpdateById(int forumId, UpdateForumModel model)
        {
            var forum = await this.dbContext.Forums
                .Where(x => x.Id == forumId)
                .FirstOrDefaultAsync();

            if (forum == null)
            {
                return false;
            }

            forum.ParentId = model.ParentId;
            forum.Type = model.Type;
            forum.Name = model.Name;
            forum.Description = model.Description;

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteById(int forumId)
        {
            var forum = await this.dbContext.Forums
                .Where(x => x.Id == forumId)
                .FirstOrDefaultAsync();

            if (forum == null)
            {
                return false;
            }

            this.dbContext.Forums.Remove(forum);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

    }
}
