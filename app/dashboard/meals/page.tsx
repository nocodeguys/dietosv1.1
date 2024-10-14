import { Suspense } from 'react'
import { MealList } from '@/components/meals/meal-list'

export default function MealsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Meals</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MealList />
      </Suspense>
    </div>
  )
}