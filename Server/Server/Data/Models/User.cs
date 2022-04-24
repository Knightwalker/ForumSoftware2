using Microsoft.AspNetCore.Identity;

namespace Server.Data.Models
{
    public class User : IdentityUser
    {
        public List<Forum> Forums { get; private set; } = new List<Forum>();
        public List<Topic> Topics { get; private set; } = new List<Topic>();
        public List<Post> Posts { get; private set; } = new List<Post>();
    }
}
