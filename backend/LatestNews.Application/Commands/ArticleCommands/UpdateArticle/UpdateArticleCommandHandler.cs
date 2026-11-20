using LatestNews.Application.Mapping;
using LatestNews.Application.ViewModels;
using LatestNews.Core.Repository;
using MediatR;
using LatestNews.Core.Service;
using LatestNews.Application.Validators;

namespace LatestNews.Application.Commands.ArticleCommands.UpdateArticle
{
    public class UpdateArticleCommandHandler : IRequestHandler<UpdateArticleCommand, ArticleViewModel?>
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IAiService _aiService;
        public UpdateArticleCommandHandler(IArticleRepository articleRepository, IAiService aiService)
        {
            _articleRepository = articleRepository;
            _aiService = aiService;
        }

        public async Task<ArticleViewModel?> Handle(UpdateArticleCommand request, CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetByIdAsync(request.Id);
            if (article == null)
                return null;

            string? imageUrl = article.ImageUrl;

            if (request.RemoveImage)
            {
                imageUrl = null;

            }
            else if (request.Image != null)
            {
                var validation = ImageValidator.ValidateImage(request.Image);
                if (!validation.IsValid)
                    throw new InvalidOperationException(validation.ErrorMessage);

                var imageResult = await ImageValidator.ProcessImage(request.Image);

                using var imageStream = new MemoryStream(imageResult.Data);
                imageUrl = await _aiService.UploadImageAsync(imageStream, request.Image.FileName, imageResult.ContentType, request.Title);
            }

            article.UpdateTitle(request.Title);
            article.UpdateImage(imageUrl);

            await _articleRepository.UpdateArticleAsync(article);

            return article.ToViewModel();
        }
    }
}
