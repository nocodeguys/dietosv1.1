import Link from 'next/link'
import { PatientList } from '@/components/patients/patient-list'
import { Button } from '@/components/ui/button'

export default function PatientsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patient Management</h1>
        <Link href="/dashboard/patients/add">
          <Button>Add New Patient</Button>
        </Link>
      </div>
      <PatientList />
    </div>
  )
}