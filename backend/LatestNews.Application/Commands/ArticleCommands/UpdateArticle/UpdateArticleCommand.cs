using LatestNews.Application.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace LatestNews.Application.Commands.ArticleCommands.UpdateArticle
{
    public class UpdateArticleCommand : IRequest<ArticleViewModel?>
    {
        public Guid Id { get; set; }
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        [StringLength(100, MinimumLength = 1)]
        public string? Category { get; set; }
        [StringLength(500)]
        public IFormFile? Image { get; set; }
        public bool RemoveImage { get; set; }
        [StringLength(250000)]
        public string? BasicText { get; set; }
        [StringLength(250000)]
        public string? AdvancedText { get; set; }
    }
}
