import IngredientList from '@/components/ingredients/ingredient-list'

export default function IngredientsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Ingredients</h1>
      <IngredientList />
    </div>
  )
}