using System.ComponentModel.DataAnnotations;
using LatestNews.Application.ViewModels;
using LatestNews.Application.Mapping;
using LatestNews.Core.Repository;
using MediatR;

namespace LatestNews.Application.Queries.ArticleQueries.GetPagedArticles;

public class GetPagedArticlesQuery : IRequest<PagedArticlesViewModel>
{
    [Range(1, int.MaxValue)] public int Page { get; set; } = 1;
    [Range(1, 100)] public int PageSize { get; set; } = 6;
    [StringLength(200)] public string? Search { get; set; }
    [StringLength(100)] public string? Category { get; set; }
}

public class GetPagedArticlesQueryHandler(IArticleRepository repository) : IRequestHandler<GetPagedArticlesQuery, PagedArticlesViewModel>
{
    public async Task<PagedArticlesViewModel> Handle(GetPagedArticlesQuery request, CancellationToken cancellationToken)
    {
        var result = await repository.GetPagedArticlesAsync(request.Page, request.PageSize, request.Search?.Trim(), request.Category?.Trim(), cancellationToken);
        return new PagedArticlesViewModel(result.Items.Select(article => article.ToViewModel()).ToList(), result.Page, request.PageSize, result.TotalCount, (int)Math.Ceiling((double)result.TotalCount / request.PageSize), result.Categories);
    }
}