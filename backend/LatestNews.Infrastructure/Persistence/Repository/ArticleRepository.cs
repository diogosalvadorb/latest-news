using LatestNews.Core.Entities;
using LatestNews.Core.Repository;
using Microsoft.EntityFrameworkCore;

namespace LatestNews.Infrastructure.Persistence.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly DataBaseContext _context;
        public ArticleRepository(DataBaseContext context)
        {
            _context = context;
        }

        public async Task<Article?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Articles
                .AsNoTracking()
                .Include(article => article.Levels)
                .SingleOrDefaultAsync(article => article.Id == id, cancellationToken);
        }

        public async Task<List<Article>> GetAllArticlesAsync()
        {
            return await _context.Articles.AsNoTracking().Include(a => a.Levels).OrderByDescending(a => a.CreatedAt).ToListAsync();
        }
    }
}
