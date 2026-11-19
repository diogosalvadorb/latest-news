using LatestNews.Application.Queries.ArticleQueries.GetAllArticle;
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

        [HttpGet]
        public async Task<IActionResult> GetAllArticles()
        {
            var query = new GetAllArticlesQuery();

            var articles = await _mediator.Send(query);
            return Ok(articles);
        }
    }
}
