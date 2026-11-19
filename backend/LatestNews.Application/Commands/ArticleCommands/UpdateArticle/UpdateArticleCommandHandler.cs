using LatestNews.Application.Mapping;
using LatestNews.Application.ViewModels;
using LatestNews.Core.Repository;
using MediatR;

namespace LatestNews.Application.Commands.ArticleCommands.UpdateArticle
{
    public class UpdateArticleCommandHandler : IRequestHandler<UpdateArticleCommand, ArticleViewModel>
    {
        private readonly IArticleRepository _articleRepository;
        public UpdateArticleCommandHandler(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<ArticleViewModel> Handle(UpdateArticleCommand request, CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetByIdAsync(request.Id);
            if (article == null)
                return null;

            article.UpdateTitle(request.Title);

            await _articleRepository.UpdateArticleAsync(article);

            return article.ToViewModel();
        }
    }
}
