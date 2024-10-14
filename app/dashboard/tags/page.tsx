import { Suspense } from 'react'
import { TagList } from '@/components/tags/tag-list'

export default function TagsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tags</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TagList />
      </Suspense>
    </div>
  )
}