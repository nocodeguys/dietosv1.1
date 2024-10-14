import { Suspense } from 'react'
import { IngredientList } from '@/components/ingredients/ingredient-list'

export default function IngredientsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Ingredients</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <IngredientList />
      </Suspense>
    </div>
  )
}