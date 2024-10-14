'use client'
import { useState } from 'react'
import { useFetchData } from '@/hooks/useFetchData'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

type Ingredient = {
  id: string
  name: string
  category: string
  allergens: string[]
  is_seasonal: boolean
  is_local: boolean
}

export function IngredientList() {
  const [nameFilter, setNameFilter] = useState('')
  const { data: ingredients, isLoading, error } = useFetchData<Ingredient[]>(`/api/ingredients?name=${nameFilter}`, [nameFilter])

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
            <TableHead>Category</TableHead>
            <TableHead>Allergens</TableHead>
            <TableHead>Seasonal</TableHead>
            <TableHead>Local</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients && ingredients.map((ingredient) => (
            <TableRow key={ingredient.id}>
              <TableCell>{ingredient.name}</TableCell>
              <TableCell>{ingredient.category}</TableCell>
              <TableCell>{ingredient.allergens.join(', ')}</TableCell>
              <TableCell>{ingredient.is_seasonal ? 'Yes' : 'No'}</TableCell>
              <TableCell>{ingredient.is_local ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}