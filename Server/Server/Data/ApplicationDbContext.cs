using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Data.Models;

namespace Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Forum> Forums { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Post> Posts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Forum>()
                .Property(m => m.ParentId)
                .IsRequired(false);

            builder.Entity<Forum>()
                .HasOne(p => p.Parent)
                .WithMany(c => c.Children)
                .HasForeignKey(p => p.ParentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Topic>()
                .HasOne(f => f.Forum)
                .WithMany(t => t.Topics)
                .HasForeignKey(f => f.ForumId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Post>()
                .HasOne(t => t.Topic)
                .WithMany(p => p.Posts)
                .HasForeignKey(t => t.TopicId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Forum>()
                .HasOne(u => u.User)
                .WithMany(f => f.Forums)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Topic>()
                .HasOne(u => u.User)
                .WithMany(t => t.Topics)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Post>()
                .HasOne(u => u.User)
                .WithMany(p => p.Posts)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(builder);
        }
    }
}