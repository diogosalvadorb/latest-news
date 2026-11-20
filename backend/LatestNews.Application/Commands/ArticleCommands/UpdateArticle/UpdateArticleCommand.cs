using System.ComponentModel.DataAnnotations;
using LatestNews.Application.ViewModels;
using MediatR;

namespace LatestNews.Application.Commands.ArticleCommands.UpdateArticle
{
    public class UpdateArticleCommand : IRequest<ArticleViewModel?>, IValidatableObject
    {
        public Guid Id { get; set; }
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        [StringLength(100, MinimumLength = 1)]
        public string? Category { get; set; }
        [StringLength(500)]
        public string? Image { get; set; }
        public bool RemoveImage { get; set; }
        [StringLength(250000)]
        public string? BasicText { get; set; }
        [StringLength(250000)]
        public string? AdvancedText { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (BasicText != null && string.IsNullOrWhiteSpace(BasicText))
                yield return new ValidationResult("Enter the Basic text.", new[] { nameof(BasicText) });
            if (AdvancedText != null && string.IsNullOrWhiteSpace(AdvancedText))
                yield return new ValidationResult("Enter the Advanced text.", new[] { nameof(AdvancedText) });
            if (!string.IsNullOrEmpty(Image) && !Image.StartsWith("/uploads/articles/", StringComparison.Ordinal) &&
                (!Uri.TryCreate(Image, UriKind.Absolute, out var uri) || (uri.Scheme != "http" && uri.Scheme != "https")))
                yield return new ValidationResult("Enter an HTTP or HTTPS image URL.", new[] { nameof(Image) });
        }
    }
}
