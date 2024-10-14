"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Utensils, Settings, ChevronLeft, ChevronRight, HeadphonesIcon, Apple, Sandwich, Carrot, Tag, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/dashboard/patients', icon: Users, label: 'Patients' },
  { href: '/dashboard/meal-plans', icon: Utensils, label: 'Meal Plans' },
  { href: '/dashboard/meals', icon: Sandwich, label: 'Meals' },
  { href: '/dashboard/ingredients', icon: Carrot, label: 'Ingredients' },
  { href: '/dashboard/meals/tags', icon: Tag, label: 'Tags' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <aside className={`bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        <Link href="/" className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          <Apple className="text-black" size={24} />
          {!isCollapsed && <span className="ml-2 font-bold text-lg">dietOS</span>}
        </Link>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={item.href}>
              {index === 3 && !isCollapsed && (
                <div className="mt-4 mb-2">
                  <span className="text-xs text-gray-500 mt-1 block">Food Database</span>
                </div>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      href={item.href} 
                      className={`flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded ${isCollapsed ? 'justify-center' : ''} ${isActive(item.href) ? 'bg-gray-100' : ''}`}
                    >
                      <item.icon className={isCollapsed ? '' : 'mr-2'} size={20} />
                      {!isCollapsed && <span className="font-normal">{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className={isCollapsed ? 'block' : 'hidden'}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className={`w-full ${isCollapsed ? 'px-0' : ''}`}
                onClick={() => alert('Contact support: hello@nocodeguys.com')}
              >
                <HeadphonesIcon size={20} />
                {!isCollapsed && <span className="ml-2">Support</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className={isCollapsed ? 'block' : 'hidden'}>
              Contact Support
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className={`mt-2 text-xs text-gray-500 text-center`}>
          DietOS v1.1
        </div>
      </div>
    </aside>
  )
}
