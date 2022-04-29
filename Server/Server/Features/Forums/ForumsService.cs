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
                ImageUrl = model.ImageUrl,
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
                    ImageUrl= x.ImageUrl,
                    UserId= x.UserId,
                    User = x.User,
                    Children = x.Children.Select(c => new Forum
                    {
                        Id = c.Id,
                        Type = c.Type,
                        Name = c.Name,
                        Description = c.Description,
                        ImageUrl = c.ImageUrl,
                        UserId = c.UserId,
                        Topics = c.Topics.Select(x => new Topic
                        {
                            Id= x.Id,
                            Name = x.Name,
                        }).ToList()
                    }).ToList(),
                    Topics = x.Topics.Select(t => new Topic
                    {
                        Id = t.Id,
                        Name = t.Name,
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
                    ImageUrl = x.ImageUrl,
                    UserId = x.UserId,
                    User = x.User,
                    Children = x.Children.Select(f => new Forum
                    {
                        Id = f.Id,
                        Type = f.Type,
                        Name = f.Name,
                        Description = f.Description,
                        ImageUrl = x.ImageUrl,
                        UserId = f.UserId,
                    }).ToList(),
                    Topics = x.Topics.Select(t => new Topic
                    {
                        Id = t.Id,
                        Name = t.Name,
                        Description = t.Description,
                        UserId = t.UserId,
                        User = t.User,
                        Posts = t.Posts.Select(p => new Post
                        {
                            Id = p.Id
                        }).ToList()
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
            forum.ImageUrl = model.ImageUrl;

            try
            {
                await this.dbContext.SaveChangesAsync();
                return true;
            } catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }

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

            try
            {
                this.dbContext.Forums.Remove(forum);
                await this.dbContext.SaveChangesAsync();
                return true;
            } catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }

        }

        public async Task<bool> canUserUpdateThisForum(int forumId, string userId)
        {
            var forum = await this.dbContext.Forums
                .Where(x => x.Id == forumId)
                .FirstOrDefaultAsync();

            if (forum == null)
            {
                return false;
            }

            if (userId != forum.UserId)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> canUserDeleteThisForum(int forumId, string userId)
        {
            var forum = await this.dbContext.Forums
                .Where(x => x.Id == forumId)
                .FirstOrDefaultAsync();

            if (forum == null)
            {
                return false;
            }

            if (userId != forum.UserId)
            {
                return false;
            }
            return true;
        }

    }
}
