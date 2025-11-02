import { Category } from '@/lib/types';
import { Leaf, Drumstick, Fish, Scale, Carrot, Vegan, Cake, Search, Blend } from 'lucide-react';

export const categories: Category[] = [
  { name: 'Salads', slug: 'salads', icon: Leaf },
  { name: 'Chicken', slug: 'chicken', icon: Drumstick },
  { name: 'Fish & Seafood', slug: 'fish-seafood', icon: Fish },
  { name: 'Low Calorie', slug: 'low-calorie', icon: Scale },
  { name: 'Vegetable', slug: 'vegetable', icon: Carrot },
  { name: 'Vegetarian', slug: 'vegetarian', icon: Vegan },
  { name: 'Desserts', slug: 'desserts', icon: Cake },
  { name: 'Smoothies', slug: 'smoothies', icon: Blend },
  { name: 'Search', slug: 'search', icon: Search },
];
