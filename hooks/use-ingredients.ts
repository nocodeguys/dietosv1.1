import { useQuery, UseQueryResult } from '@tanstack/react-query'

export type Ingredient = {
  id: string
  name: { [key: string]: string }
  producer: string
  category: string
  tags: string[]
  energy_kcal: number
  protein_g: number
  fat_g: number
  carbohydrates_g: number
}

export function useIngredients(filters: {
  name?: string
  category?: string
  tags?: string[]
} = {}): UseQueryResult<Ingredient[], Error> {
  return useQuery({
    queryKey: ['ingredients', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, value);
          }
        }
      });

      const response = await fetch(`/api/ingredients?${params}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API response:', data);

      if (Array.isArray(data)) {
        return data as Ingredient[];
      }
      if (data && Array.isArray(data.results)) {
        return data.results as Ingredient[];
      }
      if (data && Array.isArray(data.ingredients)) {
        return data.ingredients as Ingredient[];
      }

      throw new Error('Unexpected data structure received from API');
    },
  })
}
