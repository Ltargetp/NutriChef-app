export type Recipe = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
};

export type Category = {
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
};
