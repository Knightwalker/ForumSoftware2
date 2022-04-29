//using System.ComponentModel.DataAnnotations;

namespace Server.Features.Identity.Models
{
    public class ChangeAvatarModel
    {
        public string ImageUrl { get; set; }
    }

    public class ChangeEmailModel
    {
        public string Email { get; set; }
    }

    public class ChangeUserNameModel
    {
        public string UserName { get; set; }
    }
}