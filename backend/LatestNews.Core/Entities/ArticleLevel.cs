namespace LatestNews.Core.Entities
{
    public class ArticleLevel
    {
        public Guid Id { get; set; }
        public Guid ArticleId { get; set; }
        public Article? Article { get; set; }

        public int Level { get; set; }
        public string Text { get; set; } = string.Empty;
        public string AudioUrl { get; set; } = string.Empty;
        public int WordCount { get; set; }

        public void UpdateContent(string text, string audioUrl)
        {
            Text = text;
            AudioUrl = audioUrl;
        }
    }
}
