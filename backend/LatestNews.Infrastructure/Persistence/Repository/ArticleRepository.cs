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

        public async Task<(List<Article> Items, int Page, int TotalCount, List<string> Categories)> GetPagedArticlesAsync(int page, int pageSize, string? search, string? category, CancellationToken cancellationToken)
        {
            var query = _context.Articles.AsNoTracking();
            var categories = await query.Where(a => a.Category != null && a.Category.Trim() != "")
                .Select(a => a.Category.Trim()).Distinct().OrderBy(value => value).ToListAsync(cancellationToken);
            if (!string.IsNullOrWhiteSpace(category)) query = query.Where(a => a.Category.Trim() == category);
            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(a => a.Title.Contains(search) || a.Category.Contains(search) || a.Levels.Any(level => level.Level == 1 && level.Text.Contains(search)));
            var totalCount = await query.CountAsync(cancellationToken);
            var lastPage = Math.Max(1, (int)Math.Ceiling((double)totalCount / pageSize));
            page = Math.Min(page, lastPage);
            var items = await query.OrderByDescending(a => a.CreatedAt).ThenByDescending(a => a.Id)
                .Skip((page - 1) * pageSize).Take(pageSize).Include(a => a.Levels).ToListAsync(cancellationToken);
            return (items, page, totalCount, categories);
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
