using System.ComponentModel.DataAnnotations;
using static Server.Data.Validations.Forum;

namespace Server.Models.Forum
{
    public class CreateForumModel
    {
        public int? ParentId { get; set; }
        public string Type { get; set; } = "category";
        public string Name { get; set; }

        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
    }
}
