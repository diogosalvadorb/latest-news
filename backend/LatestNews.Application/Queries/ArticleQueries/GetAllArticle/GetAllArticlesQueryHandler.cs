using LatestNews.Application.ViewModels;
using LatestNews.Core.Repository;
using MediatR;


namespace LatestNews.Application.Queries.ArticleQueries.GetAllArticle
{
    public class GetAllArticlesQueryHandler : IRequestHandler<GetAllArticlesQuery, List<ArticleViewModel>>
    {
        private readonly IArticleRepository _articleRepository;

        public GetAllArticlesQueryHandler(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<List<ArticleViewModel>> Handle(GetAllArticlesQuery request, CancellationToken cancellationToken)
        {
            var articles = await _articleRepository.GetAllArticlesAsync();

            return articles.Select(article => new ArticleViewModel
            {
                Id = article.Id,
                Title = article.Title,
                Category = article.Category,
                ImageUrl = article.ImageUrl,
                CreatedAt = article.CreatedAt,
                Levels = article.Levels.Select(level => new ArticleLevelViewModel
                {
                    Id = level.Id,
                    Level = level.Level,
                    Text = level.Text,
                }).ToList()
            }).ToList();
        }
    }
}
