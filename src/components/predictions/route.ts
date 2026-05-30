import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

  const { data, error } = await supabase
    .from('predictions')
    .select('*, matches(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ predictions: data })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { user_id, match_id, predicted_home, predicted_away } = body

  if (!user_id || !match_id || predicted_home === undefined || predicted_away === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('predictions')
    .upsert(
      { user_id, match_id, predicted_home, predicted_away },
      { onConflict: 'user_id,match_id' }
    )
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ prediction: data })
}