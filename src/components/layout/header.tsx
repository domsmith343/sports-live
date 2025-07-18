
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { BarChart3 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight">Gridiron Facts</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
