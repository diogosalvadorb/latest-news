using LatestNews.Application.ViewModels;
using MediatR;

namespace LatestNews.Application.Queries.ArticleQueries.GetAllArticle
{
    public class GetAllArticlesQuery : IRequest<List<ArticleViewModel>>
    {
    }
}
