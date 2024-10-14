import { useQuery } from '@tanstack/react-query'

export function useIngredients(filters: {
  name?: string
  category?: string
  allergens?: string[]
  seasons?: string[]
  isLocal?: boolean
}) {
  return useQuery(['ingredients', filters], async () => {
    const params = new URLSearchParams()
    if (filters.name) params.append('name', filters.name)
    if (filters.category) params.append('category', filters.category)
    if (filters.allergens) params.append('allergens', filters.allergens.join(','))
    if (filters.seasons) params.append('seasons', filters.seasons.join(','))
    if (filters.isLocal !== undefined) params.append('isLocal', filters.isLocal.toString())

    const response = await fetch(`/api/ingredients?${params}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
}