import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface Meal {
  // Define the structure of your meal data here
  id: string;
  name: string;
  // ... other properties
}

interface MealFilters {
  name?: string;
  isAiGenerated?: boolean;
}

export function useMeals(filters: MealFilters): UseQueryResult<Meal[], Error> {
  return useQuery({
    queryKey: ['meals', filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters.name) params.append('name', filters.name)
      if (filters.isAiGenerated !== undefined) params.append('isAiGenerated', filters.isAiGenerated.toString())

      const response = await fetch(`/api/meals?${params}`)
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }
      return response.json() as Promise<Meal[]>
    },
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    retry: 3, // Retry failed requests 3 times
  })
}
