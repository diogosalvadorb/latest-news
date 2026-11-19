
using LatestNews.Application.Queries.ArticleQueries.GetAllArticle;
using LatestNews.Core.Repository;
using LatestNews.Infrastructure;
using LatestNews.Infrastructure.Persistence.Repository;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DataBaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionSql")));

builder.Services.AddControllers();
builder.Services.AddScoped<IArticleRepository, ArticleRepository>();
builder.Services.AddMediatR(typeof(GetAllArticlesQuery));
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
