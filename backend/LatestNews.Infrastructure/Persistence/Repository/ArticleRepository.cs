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

        public async Task<Article?> GetByIdAsync(Guid id)
        {
            return await _context.Articles
                .AsNoTracking()
                .Include(article => article.Levels)
                .SingleOrDefaultAsync(article => article.Id == id);
        }

        public async Task<List<Article>> GetAllArticlesAsync()
        {
            return await _context.Articles.AsNoTracking().Include(a => a.Levels).OrderByDescending(a => a.CreatedAt).ToListAsync();
        }

        public async Task<Article> CreateArticleAsync(Article entity)
        {
            await _context.Articles.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<Article> UpdateArticleAsync(Article entity)
        {
            _context.Articles.Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> DeleteArticleAsync(Guid id)
        {
            var article = await GetByIdAsync(id);

            if (article == null)
                return false;

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
