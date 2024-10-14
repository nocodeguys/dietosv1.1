'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Ingredient = {
  id: string
  name: string
  quantity: number
  unit: string
}

type Tag = {
  id: string
  name: string
}

type Meal = {
  id: string
  name: string
  description: string
  is_ai_generated: boolean
  ingredients: { ingredient: Ingredient, quantity: number, unit: string }[]
  tags: { tag: Tag }[]
}

export function MealList() {
  const [nameFilter, setNameFilter] = useState('')
  const [meals, setMeals] = useState<Meal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/meals?name=${nameFilter}`)
        if (!response.ok) {
          throw new Error('Failed to fetch meals')
        }
        const data = await response.json()
        setMeals(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeals()
  }, [nameFilter])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Filter by name..."
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Ingredients</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>AI Generated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>{meal.name}</TableCell>
              <TableCell>{meal.description}</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  {meal.ingredients.map(({ ingredient, quantity, unit }) => (
                    <li key={ingredient.id}>
                      {ingredient.name} ({quantity} {unit})
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {meal.tags.map(({ tag }) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{meal.is_ai_generated ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}