using System;
using System.Collections.Generic;
using System.Text;

namespace LatestNews.Application.ViewModels
{
    public class ArticleViewModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<ArticleLevelViewModel> Levels { get; set; } = new();
    }
}
