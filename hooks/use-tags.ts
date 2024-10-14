import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface Tag {
  // Define the structure of your tag data here
  id: string;
  name: string;
  // ... other properties
}

interface TagFilters {
  name?: string;
}

export function useTags(filters: TagFilters): UseQueryResult<Tag[], Error> {
  return useQuery({
    queryKey: ['tags', filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters.name) params.append('name', filters.name)

      const response = await fetch(`/api/tags?${params}`)
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }
      return response.json() as Promise<Tag[]>
    },
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    retry: 3, // Retry failed requests 3 times
  })
}
