using LatestNews.Core.Entities;

namespace LatestNews.Core.Repository
{
    public interface IArticleRepository
    {
        Task<List<Article>> GetAllArticlesAsync();
        Task<Article?> GetByIdAsync(Guid id);
        Task<Article> CreateArticleAsync(Article entity);
        Task<Article> UpdateArticleAsync(Article entity);
        Task<bool> DeleteArticleAsync(Guid id);
    }
}
