using System.Collections;

namespace LatestNews.Core.Entities
{
    public class Article
    {
        private readonly List<ArticleLevel> _levels = new();
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<ArticleLevel> Levels => _levels;

        public ArticleLevel? GetLevel(Guid levelId)
        {
            return _levels.FirstOrDefault(level => level.Id == levelId);
        }

        public void UpdateLevel(Guid levelId, string text, string audioUrl)
        {
            var level = GetLevel(levelId)
                ?? throw new InvalidOperationException("Article level not found.");

            level.UpdateContent(text, audioUrl);
        }

        public void UpdateTitle(string title)
        {
            Title = title;
        }
    }
}
