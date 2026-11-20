using System.Collections;

namespace LatestNews.Core.Entities
{
    public class Article
    {
        public Article(string title, string? imageUrl = null)
        {
            Id = Guid.NewGuid();
            Title = ValidateTitle(title);
            ImageUrl = imageUrl;
            CreatedAt = DateTime.UtcNow;
        }

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
            Title = ValidateTitle(title);
        }

        public void UpdateImage(string? imageUrl)
        {
            ImageUrl = imageUrl;
        }

        private static string ValidateTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Article title is required.", nameof(title));

            return title.Trim();
        }

        public static Article CreateWithGeneratedLevels(string title, string? imageUrl, string basicText, string advancedText, string basicAudioUrl, string advancedAudioUrl)
        {
            var article = new Article(title, imageUrl);

            article.AddLevel(ArticleLevel.CreateBasic(article.Id, basicText, basicAudioUrl));
            article.AddLevel(ArticleLevel.CreateAdvanced(article.Id, advancedText, advancedAudioUrl));

            return article;
        }

        public void AddLevel(ArticleLevel level)
        {
            if (_levels.Any(existingLevel => existingLevel.Level == level.Level))
                throw new InvalidOperationException($"Article already has level {level.Level}.");

            _levels.Add(level);
        }
    }
}
