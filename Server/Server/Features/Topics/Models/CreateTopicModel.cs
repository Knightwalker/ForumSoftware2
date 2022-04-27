using System.ComponentModel.DataAnnotations;

namespace Server.Features.Topics.Models
{
    public class CreateTopicModel
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public int ForumId { get; set; }
    }
}
