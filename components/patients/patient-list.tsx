'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

type Patient = {
  id: string
  name: string
  email: string
  dietaryPreferences: string
  lastAppointment: string
}

const initialPatients: Patient[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', dietaryPreferences: 'Vegan', lastAppointment: '2024-10-01' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', dietaryPreferences: 'Gluten-free', lastAppointment: '2024-10-05' },
  { id: '3', name: 'Alice Johnson', email: 'alice@example.com', dietaryPreferences: 'Keto', lastAppointment: '2024-10-08' },
]

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Dietary Preferences</TableHead>
            <TableHead>Last Appointment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.dietaryPreferences}</TableCell>
              <TableCell>{patient.lastAppointment}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}