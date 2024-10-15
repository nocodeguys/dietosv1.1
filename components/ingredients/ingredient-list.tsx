'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Ingredient {
  id: string
  name: { [key: string]: string }
  energy_kcal: number
  protein_g: number
  fat_g: number
  carbohydrates_g: number
  created_by: string | null
}

async function fetchIngredients(): Promise<Ingredient[]> {
  const response = await fetch('/api/ingredients')
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients')
  }
  return response.json()
}

export default function IngredientList() {
  const { data: ingredients, isLoading, error } = useQuery<Ingredient[], Error>({
    queryKey: ['ingredients'],
    queryFn: fetchIngredients,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Energy (kcal)</TableHead>
            <TableHead>Protein (g)</TableHead>
            <TableHead>Fat (g)</TableHead>
            <TableHead>Carbohydrates (g)</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients?.map((ingredient) => (
            <TableRow key={ingredient.id}>
              <TableCell className="font-medium">{ingredient.name.en || 'Unnamed Ingredient'}</TableCell>
              <TableCell>
                <Badge variant="default">{ingredient.energy_kcal}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{ingredient.protein_g}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{ingredient.fat_g}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{ingredient.carbohydrates_g}</Badge>
              </TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${ingredient.created_by || 'unknown'}`} />
                  <AvatarFallback>
                    {ingredient.created_by 
                      ? ingredient.created_by.substring(0, 2).toUpperCase() 
                      : 'UN'}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/ingredients/${ingredient.id}`} passHref>
                  <Button variant="outline">View Details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}