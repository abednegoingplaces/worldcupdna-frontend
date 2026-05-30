import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function calculatePoints(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number
): number {
  // Exact score = 3 points
  if (predictedHome === actualHome && predictedAway === actualAway) return 3

  const predictedResult = Math.sign(predictedHome - predictedAway)
  const actualResult = Math.sign(actualHome - actualAway)

  // Correct outcome (win/draw/loss) = 1 point
  if (predictedResult === actualResult) return 1

  return 0
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { match_id } = body

  if (!match_id) return NextResponse.json({ error: 'match_id required' }, { status: 400 })

  // Get match result
  const { data: match, error: matchError } = await supabase
    .from('matches')
    .select('*')
    .eq('id', match_id)
    .single()

  if (matchError || !match) return NextResponse.json({ error: 'Match not found' }, { status: 404 })
  if (match.status !== 'finished') return NextResponse.json({ error: 'Match not finished yet' }, { status: 400 })

  // Get all predictions for this match
  const { data: predictions, error: predError } = await supabase
    .from('predictions')
    .select('*')
    .eq('match_id', match_id)

  if (predError) return NextResponse.json({ error: predError.message }, { status: 500 })

  // Score each prediction and update points
  let scored = 0
  for (const pred of predictions || []) {
    const points = calculat