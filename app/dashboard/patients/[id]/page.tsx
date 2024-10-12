'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

type Patient = {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  height: string
  weight: string
  dietaryPreferences: string
  allergies: string
  medicalConditions: string
}

export default function PatientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Fetch patient data
    const fetchPatient = async () => {
      // Replace this with actual API call
      const response = await fetch(`/api/patients/${params.id}`)
      const data = await response.json()
      setPatient(data)
    }
    fetchPatient()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPatient(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setPatient(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log(patient)
    // Update patient data
    await fetch(`/api/patients/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient),
    })
    setIsEditing(false)
  }

  if (!patient) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/patients">
              Patients
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{patient.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Patient' : 'Patient Details'}</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={patient.name}
              onChange={handleChange}
              required
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={patient.email}
              onChange={handleChange}
              required
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={patient.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={patient.dateOfBirth}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={handleSelectChange('gender')} disabled={!isEditing} value={patient.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              name="height"
              type="number"
              value={patient.height}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              value={patient.weight}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
          <Textarea
            id="dietaryPreferences"
            name="dietaryPreferences"
            value={patient.dietaryPreferences}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea
            id="allergies"
            name="allergies"
            value={patient.allergies}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="medicalConditions">Medical Conditions</Label>
          <Textarea
            id="medicalConditions"
            name="medicalConditions"
            value={patient.medicalConditions}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {isEditing && <Button type="submit">Save Changes</Button>}
      </form>
    </div>
  )
}