import Link from 'next/link'
import { Home, Users, Utensils, Settings } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Home className="mr-2" size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/patients" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Users className="mr-2" size={20} />
              Patients
            </Link>
          </li>
          <li>
            <Link href="/dashboard/meal-plans" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Utensils className="mr-2" size={20} />
              Meal Plans
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Settings className="mr-2" size={20} />
              Settings
            </Link>
          </li>
          <li>
            <Link href="/dashboard/ingredients" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Utensils className="mr-2" size={20} />
              Ingredients
            </Link>
          </li>
          <li>
            <Link href="/dashboard/meals" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Utensils className="mr-2" size={20} />
              Meals
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}