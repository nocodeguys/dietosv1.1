import { Sidebar } from '@/components/dashboard/sidebar'
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
      <Toaster />
    </div>
  )
}
