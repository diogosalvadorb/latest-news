using LatestNews.Application.ViewModels;
using LatestNews.Core.Repository;
using MediatR;

namespace LatestNews.Application.Queries.ArticleQueries.GetArticleById
{
    public class GetArticleByIdQueryHandler : IRequestHandler<GetArticleByIdQuery, ArticleViewModel?>
    {
        private readonly IArticleRepository _articleRepository;

        public GetArticleByIdQueryHandler(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<ArticleViewModel?> Handle(GetArticleByIdQuery request, CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetByIdAsync(request.Id);
            if (article == null)
                return null;

            return new ArticleViewModel
            {
                Id = article.Id,
                Title = article.Title,
                Category = article.Category,
                ImageUrl = article.ImageUrl,
                CreatedAt = article.CreatedAt,
                Levels = article.Levels.OrderBy(level => level.Level).Select(level => new ArticleLevelViewModel
                {
                    Id = level.Id,
                    Level = level.Level,
                    Text = level.Text,
                }).ToList()
            };
        }
    }
}
