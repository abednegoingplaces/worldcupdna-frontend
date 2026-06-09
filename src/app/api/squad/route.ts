import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const teamId = searchParams.get('teamId')

  if (!teamId) {
    return NextResponse.json({ error: 'Missing teamId parameter' }, { status: 400 })
  }

  const apiKey = process.env.FOOTBALL_DATA_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(`https://api.football-data.org/v4/teams/${teamId}/matches?status=SCHEDULED&limit=5`, {
      headers: { 'X-Auth-Token': apiKey },
      next: { revalidate: 3600 } // cache for 1 hour
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: `Football API returned ${res.status}`, detail: text },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch from Football Data API', detail: err.message },
      { status: 500 }
    )
  }
}
