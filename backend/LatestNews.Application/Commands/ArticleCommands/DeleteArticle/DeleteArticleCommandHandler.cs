using LatestNews.Core.Repository;
using MediatR;

namespace LatestNews.Application.Commands.ArticleCommands.DeleteArticle
{
    public class DeleteArticleCommandHandler : IRequestHandler<DeleteArticleCommand, bool>
    {
        private readonly IArticleRepository _articleRepository;
        public DeleteArticleCommandHandler(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<bool> Handle(DeleteArticleCommand request, CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetByIdAsync(request.Id);

            if (article == null)
                return false;

            return await _articleRepository.DeleteArticleAsync(request.Id);
        }
    }
}
