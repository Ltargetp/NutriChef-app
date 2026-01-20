import Link from 'next/link';
import { categories } from '@/lib/categories';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

export function CategoryList() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <Link href={`/category/${category.slug}`} key={category.slug} className="group">
          <Card className="overflow-hidden border border-border/60 bg-card/80 transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-lg">
            <CardContent className="flex flex-col items-center justify-center gap-3 p-5 sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <category.icon className="h-6 w-6" />
              </div>
              <p className="text-center text-sm font-semibold text-foreground/80 transition-colors group-hover:text-foreground">
                {category.name}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
