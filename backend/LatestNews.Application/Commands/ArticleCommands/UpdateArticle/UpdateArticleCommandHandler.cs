using LatestNews.Application.Mapping;
using LatestNews.Core.Entities;
using LatestNews.Application.ViewModels;
using LatestNews.Core.Repository;
using MediatR;

namespace LatestNews.Application.Commands.ArticleCommands.UpdateArticle
{
    public class UpdateArticleCommandHandler : IRequestHandler<UpdateArticleCommand, ArticleViewModel?>
    {
        private readonly IArticleRepository _articleRepository;
        public UpdateArticleCommandHandler(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<ArticleViewModel?> Handle(UpdateArticleCommand request, CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetByIdAsync(request.Id);
            if (article == null)
                return null;

            article.UpdateTitle(request.Title.Trim());
            if (request.Category != null) article.Category = request.Category.Trim();
            if (request.RemoveImage) article.ImageUrl = null;
            else if (!string.IsNullOrWhiteSpace(request.Image)) article.ImageUrl = request.Image;
            foreach (var (number, text) in new[] { (1, request.BasicText), (2, request.AdvancedText) })
            {
                if (text == null) continue;
                var level = article.Levels.FirstOrDefault(item => item.Level == number);
                if (level == null)
                {
                    level = new ArticleLevel { Id = Guid.NewGuid(), ArticleId = article.Id, Level = number };
                    article.Levels.Add(level);
                }
                level.UpdateContent(text, level.AudioUrl);
            }

            await _articleRepository.UpdateArticleAsync(article);

            return article.ToViewModel();
        }
    }
}
