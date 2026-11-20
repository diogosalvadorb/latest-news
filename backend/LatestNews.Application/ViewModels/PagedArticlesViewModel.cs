namespace LatestNews.Application.ViewModels;

public record PagedArticlesViewModel(List<ArticleViewModel> Items, int Page, int PageSize, int TotalCount, int TotalPages, List<string> Categories);