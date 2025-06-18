import type { NewsArticle } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Newspaper, ArrowRight, Clock, ExternalLink, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

function NewsArticleCard({ article, index }: { article: NewsArticle; index: number }) {
  const isFeatured = index === 0;
  
  return (
    <Card className={cn(
      "flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group",
      isFeatured ? "md:col-span-2 lg:col-span-2" : ""
    )}>
      {article.imageUrl && (
        <div className={cn(
          "relative w-full overflow-hidden",
          isFeatured ? "h-64" : "h-48"
        )}>
          <Image 
            src={article.imageUrl} 
            alt={article.headline} 
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105" 
            data-ai-hint={article.dataAiHint || "news article"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground font-semibold">
                <TrendingUp size={12} className="mr-1" />
                Featured
              </Badge>
            </div>
          )}
          
          {/* Source Badge */}
          {article.source && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="text-xs font-medium">
                {article.source}
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardHeader className={cn("pb-3", isFeatured ? "pt-6" : "pt-4")}>
        <CardTitle className={cn(
          "leading-tight transition-colors duration-200 group-hover:text-primary",
          isFeatured ? "text-xl md:text-2xl" : "text-lg"
        )}>
          {article.headline}
        </CardTitle>
        <CardDescription className="text-xs pt-2 flex items-center gap-2">
          <Clock size={12} className="text-muted-foreground" />
          <span>{article.timestamp}</span>
          {article.source && (
            <>
              <span>•</span>
              <span className="font-medium">{article.source}</span>
            </>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className={cn(
          "text-muted-foreground transition-colors duration-200",
          isFeatured ? "text-base" : "text-sm"
        )}>
          {article.summary}
        </p>
      </CardContent>
      
      {article.articleUrl && (
        <CardFooter className="pt-3">
          <Button 
            variant="link" 
            asChild 
            className="p-0 h-auto text-primary hover:text-primary/80 transition-colors duration-200 group/btn"
          >
            <Link href={article.articleUrl} target="_blank" rel="noopener noreferrer">
              <span className="flex items-center gap-1">
                Read More 
                <ArrowRight size={16} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
              </span>
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default function NewsFeed({ articles }: { articles: NewsArticle[] }) {
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Newspaper size={28} className="text-primary" /> Latest News
        </h2>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-xs">
            {articles.length} Articles
          </Badge>
          <Badge variant="outline" className="text-xs">
            Breaking News
          </Badge>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <Newspaper size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No news articles available.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Featured Article */}
          {featuredArticle && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
                <TrendingUp size={20} />
                Featured Story
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <NewsArticleCard article={featuredArticle} index={0} />
              </div>
            </div>
          )}

          {/* Other Articles */}
          {otherArticles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-muted-foreground flex items-center gap-2">
                <Newspaper size={20} />
                Latest Updates ({otherArticles.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherArticles.map((article, index) => (
                  <NewsArticleCard key={article.id} article={article} index={index + 1} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
