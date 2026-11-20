using LatestNews.Application.Commands.ArticleCommands.CreateArticle;
using LatestNews.Application.Commands.ArticleCommands.DeleteArticle;
using LatestNews.Application.Commands.ArticleCommands.UpdateArticle;
using LatestNews.Application.Commands.ArticleCommands.UpdateArticleLevel;
using LatestNews.Application.Queries.ArticleQueries.GetAllArticle;
using LatestNews.Application.Queries.ArticleQueries.GetArticleById;
using LatestNews.Application.ViewModels;
using MediatR;
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
        public async Task<ActionResult<ArticleViewModel>> GetById(Guid id)
        {
            var query = new GetArticleByIdQuery(id);
            var result = await _mediator.Send(query);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllArticles([FromQuery] string? search, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 8)
        {
            var query = new GetAllArticlesQuery
            {
                SearchTerm = search,
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateArticleCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("{articleId}/levels/{levelId}")]
        public async Task<IActionResult> UpdateLevel(Guid articleId, Guid levelId, [FromBody] UpdateArticleLevelCommand command)
        {
            command.ArticleId = articleId;
            command.LevelId = levelId;

            var result = await _mediator.Send(command);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArticle(Guid id, [FromForm] UpdateArticleCommand command)
        {
            command.Id = id;
            var result = await _mediator.Send(command);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(Guid id)
        {
            var query = new DeleteArticleCommand(id);

            var result = await _mediator.Send(query);
            if (!result)
                return NotFound();
            
            return NoContent();
        }
    }
}
