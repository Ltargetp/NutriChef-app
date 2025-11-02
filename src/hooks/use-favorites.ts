"use client";

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'healthybyte_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const toggleFavorite = useCallback((recipeId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error('Failed to save favorites to localStorage', error);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((recipeId: string) => {
    return favorites.includes(recipeId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite, isInitialized };
};
