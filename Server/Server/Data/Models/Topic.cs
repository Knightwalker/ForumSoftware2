namespace Server.Data.Models
{
    public class Topic
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ForumId { get; set; }
        public Forum Forum { get; set; }
        public List<Post> Posts { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
