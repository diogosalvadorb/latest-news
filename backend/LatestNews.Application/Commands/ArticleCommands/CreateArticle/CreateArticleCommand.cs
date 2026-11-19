using LatestNews.Application.ViewModels;
using MediatR;

namespace LatestNews.Application.Commands.ArticleCommands.CreateArticle
{
    public class CreateArticleCommand : IRequest<ArticleViewModel>
    {
        public string Title { get; set; } = string.Empty;
        public string Theme { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public bool GenerateAudio { get; set; } = true;
    }
}
