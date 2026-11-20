using LatestNews.Core.Entities;

namespace LatestNews.Core.Repository
{
    public interface IArticleRepository
    {
        Task<List<Article>> GetAllArticlesAsync();
        Task<(List<Article> Items, int Page, int TotalCount, List<string> Categories)> GetPagedArticlesAsync(int page, int pageSize, string? search, string? category, CancellationToken cancellationToken);
        Task<Article?> GetByIdAsync(Guid id);
        Task<Article> CreateArticleAsync(Article entity);
        Task<Article> UpdateArticleAsync(Article entity);
        Task<bool> DeleteArticleAsync(Guid id);
    }
}
