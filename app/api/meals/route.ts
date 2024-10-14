import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')

  const supabase = createRouteHandlerClient({ cookies })

  let query = supabase
    .from('meals')
    .select(`
      *,
      ingredients:meal_ingredients(
        quantity,
        unit,
        ingredient:ingredients(*)
      ),
      tags:meal_tags(
        tag:tags(*)
      )
    `)

  if (name) {
    query = query.ilike('name', `%${name}%`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}