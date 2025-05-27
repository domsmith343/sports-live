
import type { NewsArticle } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Newspaper, ArrowRight } from 'lucide-react';

function NewsArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {article.imageUrl && (
        <div className="relative w-full h-48">
          <Image 
            src={article.imageUrl} 
            alt={article.headline} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint={article.dataAiHint || "news article"}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg leading-tight">{article.headline}</CardTitle>
        <CardDescription className="text-xs pt-1">
          {article.source && `${article.source} - `}{article.timestamp}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{article.summary}</p>
      </CardContent>
      {article.articleUrl && (
        <CardFooter>
          <Button variant="link" asChild className="p-0 h-auto text-primary">
            <Link href={article.articleUrl} target="_blank" rel="noopener noreferrer">
              Read More <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default function NewsFeed({ articles }: { articles: NewsArticle[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
        <Newspaper size={28} className="text-primary" /> Latest News
      </h2>
      {articles.length === 0 ? (
        <p className="text-muted-foreground">No news articles available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
