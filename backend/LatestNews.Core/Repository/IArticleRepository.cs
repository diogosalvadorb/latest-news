using LatestNews.Core.Entities;

namespace LatestNews.Core.Repository
{
    public interface IArticleRepository
    {
        Task<List<Article>> GetAllArticlesAsync();
        Task<Article?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
