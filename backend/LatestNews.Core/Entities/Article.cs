using System.Collections;

namespace LatestNews.Core.Entities
{
    public class Article
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<ArticleLevel> Levels { get; set; } = new List<ArticleLevel>();
    }
}
