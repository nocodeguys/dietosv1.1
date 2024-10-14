'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'

interface Meal {
  id: string
  name: string
  description: string
  is_ai_generated: boolean
}

async function fetchMeals(): Promise<Meal[]> {
  const response = await fetch('/api/meals')
  if (!response.ok) {
    throw new Error('Failed to fetch meals')
  }
  return response.json()
}

export default function MealList() {
  const { data: meals, isLoading, error } = useQuery<Meal[], Error>({
    queryKey: ['meals'],
    queryFn: fetchMeals,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals?.map((meal) => (
        <Card key={meal.id} className="p-4">
          <h2 className="text-lg font-semibold">{meal.name}</h2>
          <p>{meal.description}</p>
          <p>AI Generated: {meal.is_ai_generated ? 'Yes' : 'No'}</p>
        </Card>
      ))}
    </div>
  )
}