using LatestNews.Application.ViewModels;
using MediatR;

namespace LatestNews.Application.Commands.ArticleCommands.UpdateArticle
{
    public class UpdateArticleCommand : IRequest<ArticleViewModel>
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
    }
}
