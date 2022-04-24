namespace Server.Data.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public int TopicId { get; set; }
        public Topic Topic { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
