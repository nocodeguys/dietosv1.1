import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const patient = await request.json()
  const { data, error } = await supabase
    .from('patients')
    .update(patient)
    .eq('id', params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase
    .from('patients')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Patient deleted successfully' })
}