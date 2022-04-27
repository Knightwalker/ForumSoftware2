using System.ComponentModel.DataAnnotations;

namespace Server.Features.Posts.Models
{
    public class CreatePostModel
    {
        [Required]
        public string Name { get; set; }
        public string Content { get; set; }

        [Required]
        public int TopicId { get; set; }
    }
}