using System.ComponentModel.DataAnnotations;
using static Server.Data.Validations.Forum;

namespace Server.Features.Forums.Models
{
    public class CreateForumsModel
    {
        public int? ParentId { get; set; }
        public string Type { get; set; } = "category";
        public string Name { get; set; }
        public string ImageUrl { get; set; }

        [MaxLength(MaxDescriptionLength)]
        public string Description { get; set; }
    }
}
