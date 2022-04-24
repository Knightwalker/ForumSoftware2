using System.ComponentModel.DataAnnotations;
using static Server.Data.Validations.Forum;

namespace Server.Data.Models
{
    public class Forum
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Type { get; set; } = "category";
        public string Name { get; set; }

        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
        public Forum Parent { get; set; }
        public List<Forum> Children { get; set; }
        public List<Topic> Topics { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
