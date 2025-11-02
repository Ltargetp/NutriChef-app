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
  isDessert?: boolean;
  isCocktail?: boolean;
};

export type Category = {
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type SubscriptionLevel = 'Free' | 'Premium' | 'Pro';

export type UserProfile = {
  id: string; // matches firebase auth uid
  displayName?: string;
  email?: string;
  subscriptionLevel: SubscriptionLevel;
  subscriptionId?: string; // e.g., from Stripe or PayPal
  subscriptionEndDate?: Date;
  favoriteRecipeIds?: string[];
}

export type DailyPlan = {
  id?: string;
  userId: string;
  date: Date;
  calorieTarget: number;
  meals: {
    breakfast?: string; // recipeId
    lunch?: string; // recipeId
    dinner?: string; // recipeId
    snacks?: string[]; // recipeIds
  }
}
