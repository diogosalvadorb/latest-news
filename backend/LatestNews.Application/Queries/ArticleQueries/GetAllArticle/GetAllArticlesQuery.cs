using LatestNews.Application.ViewModels;
using MediatR;

namespace LatestNews.Application.Queries.ArticleQueries.GetAllArticle
{
    public class GetAllArticlesQuery : IRequest<PaginatedResult<ArticleViewModel>>
    {
        public string? SearchTerm { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 8;
    }
}
