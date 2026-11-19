using LatestNews.Application.Queries.ArticleQueries.GetAllArticle;
using LatestNews.Application.Queries.ArticleQueries.GetArticleById;
using LatestNews.Application.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LatestNews.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ArticlesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleViewModel>> GetById(Guid id, CancellationToken cancellationToken)
        {
            var query = new GetArticleByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllArticles()
        {
            var query = new GetAllArticlesQuery();

            var articles = await _mediator.Send(query);
            return Ok(articles);
        }
    }
}
