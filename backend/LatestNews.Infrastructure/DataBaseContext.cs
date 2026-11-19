using LatestNews.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace LatestNews.Infrastructure
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }

        public DbSet<Article> Articles  { get; set; }
        public DbSet<ArticleLevel> ArticleLevels { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());         
        }
    }
}
