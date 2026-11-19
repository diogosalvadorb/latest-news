using LatestNews.Application.ViewModels;
using MediatR;

namespace LatestNews.Application.Queries.ArticleQueries.GetArticleById
{
    public class GetArticleByIdQuery : IRequest<ArticleViewModel?>
    {
        public Guid Id { get; }

        public GetArticleByIdQuery(Guid id)
        {
            Id = id;
        }
    }
}
