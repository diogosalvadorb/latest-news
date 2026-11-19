using LatestNews.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LatestNews.Infrastructure.Persistence.Configuration
{
    public class ArticleLevelConfiguration : IEntityTypeConfiguration<ArticleLevel>
    {
        public void Configure(EntityTypeBuilder<ArticleLevel> builder)
        {
            builder.Property(l => l.Text)
                .IsRequired();

            builder.Property(l => l.AudioUrl)
                .HasMaxLength(500);
        }
    }
}
