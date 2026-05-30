import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const stage = searchParams.get('stage')
  const group = searchParams.get('group')

  let query = supabase
    .from('matches')
    .select('*')
    .order('match_date', { ascending: true })

  if (stage) query = query.eq('stage', stage)
  if (group) query = query.eq('group_name', group)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ matches: data })
}