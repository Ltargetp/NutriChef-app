import Link from 'next/link';
import { categories } from '@/lib/categories';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function CategoryList() {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-3">
      {categories.map((category) => (
        <Link href={`/category/${category.slug}`} key={category.slug} className="group">
          <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-primary/50">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <category.icon className="h-10 w-10 text-primary/80 transition-colors group-hover:text-primary" />
              <p className="mt-2 text-center text-sm font-semibold text-foreground/80 transition-colors group-hover:text-foreground">
                {category.name}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
