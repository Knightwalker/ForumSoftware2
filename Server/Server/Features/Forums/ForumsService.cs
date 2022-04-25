using Server.Data;
using Server.Data.Models;

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
    }
}
