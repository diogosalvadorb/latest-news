using LatestNews.Application.ViewModels;
using LatestNews.Core.Entities;
using LatestNews.Core.Repository;
using MediatR;

namespace LatestNews.Application.Commands.ArticleCommands.CreateArticle
{
    public class CreateArticleCommandHandler : IRequestHandler<CreateArticleCommand, ArticleViewModel>
    {
        private readonly IArticleRepository _repository;
        public CreateArticleCommandHandler(IArticleRepository repository)
        {
            _repository = repository;
        }

        public async Task<ArticleViewModel> Handle(CreateArticleCommand request, CancellationToken cancellationToken)
        {
            var article = new Article
            {
                Id = Guid.NewGuid(),
                Title = request.Title.Trim(),
                Category = request.Category.Trim(),
                ImageUrl = request.Image,
                CreatedAt = DateTime.UtcNow
            };

            var basicText = GenerateOpenAIBasicText(request.Theme);
            var advancedText = GenerateOpenAIAdvancedText(request.Theme);

            article.Levels.Add(new ArticleLevel
            {
                Id = Guid.NewGuid(),
                ArticleId = article.Id,
                Level = 1,
                Text = basicText,
                AudioUrl = string.Empty,
                WordCount = CountWords(basicText)
            });

            article.Levels.Add(new ArticleLevel
            {
                Id = Guid.NewGuid(),
                ArticleId = article.Id,
                Level = 2,
                Text = advancedText,
                AudioUrl = string.Empty,
                WordCount = CountWords(advancedText)
            });

            await _repository.CreateArticleAsync(article);

            return new ArticleViewModel
            {
                Id = article.Id,
                Title = article.Title,
                Category = article.Category,
                ImageUrl = article.ImageUrl,
                CreatedAt = article.CreatedAt,
                Levels = article.Levels.Select(l => new ArticleLevelViewModel
                {
                    Id = l.Id,
                    Level = l.Level,
                    Text = l.Text,
                }).ToList()
            };
        }

        private int CountWords(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return 0;

            return text.Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries).Length;
        }

        private string GenerateOpenAIBasicText(string theme)
        {
            return $"This is a basic level article about {theme}. " +
                   $"It uses simple words and short sentences. " +
                   $"The vocabulary is easy to understand. " +
                   $"This level is perfect for beginners learning English.";
        }

        private string GenerateOpenAIAdvancedText(string theme)
        {
            return $"This comprehensive article delves into the intricacies of {theme}. " +
                   $"It employs sophisticated vocabulary and complex sentence structures. " +
                   $"The content explores nuanced perspectives and demonstrates advanced linguistic patterns. " +
                   $"This level challenges proficient English speakers to expand their understanding.";
        }
    }
}
