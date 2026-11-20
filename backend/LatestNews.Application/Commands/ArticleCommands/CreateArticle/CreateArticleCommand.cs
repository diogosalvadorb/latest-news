using System.ComponentModel.DataAnnotations;
using LatestNews.Application.ViewModels;
using MediatR;

namespace LatestNews.Application.Commands.ArticleCommands.CreateArticle
{
    public class CreateArticleCommand : IRequest<ArticleViewModel>, IValidatableObject
    {
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        [Required, StringLength(250000)]
        public string Theme { get; set; } = string.Empty;
        [Required, StringLength(100)]
        public string Category { get; set; } = string.Empty;
        [StringLength(500)]
        public string? Image { get; set; }
        public bool GenerateAudio { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Theme.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries).Length > 10000)
                yield return new ValidationResult("Source text must contain at most 10,000 words.", new[] { nameof(Theme) });
            if (!string.IsNullOrEmpty(Image) && !Image.StartsWith("/uploads/articles/", StringComparison.Ordinal) &&
                (!Uri.TryCreate(Image, UriKind.Absolute, out var uri) || (uri.Scheme != "http" && uri.Scheme != "https")))
                yield return new ValidationResult("Enter an HTTP or HTTPS image URL.", new[] { nameof(Image) });
        }
    }
}
