using LatestNews.Application.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace LatestNews.Application.Commands.ArticleCommands.CreateArticle
{
    public class CreateArticleCommand : IRequest<ArticleViewModel>
    {
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        [Required, StringLength(250000)]
        public string Theme { get; set; } = string.Empty;
        [Required, StringLength(100)]
        public string Category { get; set; } = string.Empty;
        [StringLength(500)]
        public IFormFile? Image { get; set; }
        public bool GenerateAudio { get; set; } 
    }
}
