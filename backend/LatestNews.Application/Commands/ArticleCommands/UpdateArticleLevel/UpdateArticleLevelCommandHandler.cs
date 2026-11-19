using LatestNews.Application.Mapping;
using LatestNews.Application.ViewModels;
using LatestNews.Core.Repository;
using MediatR;

namespace LatestNews.Application.Commands.ArticleCommands.UpdateArticleLevel
{
    public class UpdateArticleLevelCommandHandler : IRequestHandler<UpdateArticleLevelCommand, ArticleLevelViewModel?>
    {
        private readonly IArticleRepository _articleRepository;
        public UpdateArticleLevelCommandHandler(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<ArticleLevelViewModel?> Handle(UpdateArticleLevelCommand request, CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetByIdAsync(request.ArticleId);

            if (article == null)
                return null;

            if (article.GetLevel(request.LevelId) == null)
                return null;

            article.UpdateLevel(request.LevelId, request.Text, request.AudioUrl);

            await _articleRepository.UpdateArticleAsync(article);

            return article.GetLevel(request.LevelId)!.ToViewModel();
        }
    }
}
