import Link from 'next/link';
import { categories } from '@/lib/categories';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

export function CategoryList() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
      {categories.map((category) => (
        <Link href={`/category/${category.slug}`} key={category.slug} className="group">
          <Card className="overflow-hidden border border-border/60 bg-card/80 transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-lg">
            <CardContent className="flex flex-col items-center justify-center gap-2.5 p-4 sm:gap-3 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20 sm:h-12 sm:w-12">
                <category.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <p className="text-center text-xs font-semibold text-foreground/80 transition-colors group-hover:text-foreground sm:text-sm">
                {category.name}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
