'use client'
import { useState } from 'react'
import { useFetchData } from '@/hooks/useFetchData'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

type Tag = {
  id: string
  name: string
}

export function TagList() {
  const [nameFilter, setNameFilter] = useState('')
  const { data: tags, isLoading, error } = useFetchData<Tag[]>(`/api/tags?name=${nameFilter}`, [nameFilter])

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags && tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}