import MealList from '@/components/meals/meal-list'

export default function MealsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Meals</h1>
      <MealList />
    </div>
  )
}