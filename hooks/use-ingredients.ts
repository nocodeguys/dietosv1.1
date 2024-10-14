import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface Ingredient {
  // Define the structure of your ingredient data here
  id: string;
  name: string;
  // ... other properties
}

interface IngredientFilters {
  name?: string;
  category?: string;
  allergens?: string[];
  seasons?: string[];
  isLocal?: boolean;
}

export function useIngredients(filters: IngredientFilters): UseQueryResult<Ingredient[], Error> {
  return useQuery({
    queryKey: ['ingredients', filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters.name) params.append('name', filters.name)
      if (filters.category) params.append('category', filters.category)
      if (filters.allergens?.length) params.append('allergens', filters.allergens.join(','))
      if (filters.seasons?.length) params.append('seasons', filters.seasons.join(','))
      if (filters.isLocal !== undefined) params.append('isLocal', filters.isLocal.toString())

      const response = await fetch(`/api/ingredients?${params}`)
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }
      return response.json() as Promise<Ingredient[]>
    },
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    retry: 3, // Retry failed requests 3 times
  })
}
