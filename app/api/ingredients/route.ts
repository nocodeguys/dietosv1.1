import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const category = searchParams.get('category')
  const allergens = searchParams.get('allergens')?.split(',')
  const seasons = searchParams.get('seasons')?.split(',')
  const isLocal = searchParams.get('isLocal')

  const supabase = createRouteHandlerClient({ cookies })

  let query = supabase
    .from('ingredients')
    .select('*')

  if (name) {
    query = query.ilike('name', `%${name}%`)
  }
  if (category) {
    query = query.eq('category', category)
  }
  if (allergens) {
    query = query.contains('allergens', allergens)
  }
  if (seasons) {
    query = query.overlaps('seasons', seasons)
  }
  if (isLocal) {
    query = query.eq('is_local', isLocal === 'true')
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { name, category, nutritionalInfo, allergens, isSeasonal, seasons, isLocal } = await request.json()

  const { data, error } = await supabase
    .from('ingredients')
    .insert({
      name,
      category,
      nutritional_info: nutritionalInfo,
      allergens,
      is_seasonal: isSeasonal,
      seasons,
      is_local: isLocal,
      created_by: (await supabase.auth.getUser()).data.user?.id
    })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}