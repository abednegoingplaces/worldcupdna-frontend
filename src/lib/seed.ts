import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const matches = [
  // Group A
  { id: 'g_a1', home_team: 'Mexico', away_team: 'Argentina', match_date: '2026-06-11T19:00:00Z', stage: 'group', group_name: 'A', status: 'scheduled' },
  { id: 'g_a2', home_team: 'Nigeria', away_team: 'South Africa', match_date: '2026-06-12T15:00:00Z', stage: 'group', group_name: 'A', status: 'scheduled' },
  { id: 'g_a3', home_team: 'Argentina', away_team: 'Nigeria', match_date: '2026-06-16T19:00:00Z', stage: 'group', group_name: 'A', status: 'scheduled' },
  { id: 'g_a4', home_team: 'South Africa', away_team: 'Mexico', match_date: '2026-06-16T19:00:00Z', stage: 'group', group_name: 'A', status: 'scheduled' },
  { id: 'g_a5', home_team: 'Argentina', away_team: 'South Africa', match_date: '2026-06-20T19:00:00Z', stage: 'group', group_name: 'A', status: 'scheduled' },
  { id: 'g_a6', home_team: 'Nigeria', away_team: 'Mexico', match_date: '2026-06-20T19:00:00Z', stage: 'group', group_name: 'A', status: 'scheduled' },
  // Group B
  { id: 'g_b1', home_team: 'USA', away_team: 'Canada', match_date: '2026-06-12T00:00:00Z', stage: 'group', group_name: 'B', status: 'scheduled' },
  { id: 'g_b2', home_team: 'Uruguay', away_team: 'Ecuador', match_date: '2026-06-12T22:00:00Z', stage: 'group', group_name: 'B', status: 'scheduled' },
  { id: 'g_b3', home_team: 'USA', away_team: 'Uruguay', match_date: '2026-06-17T19:00:00Z', stage: 'group', group_name: 'B', status: 'scheduled' },
  { id: 'g_b4', home_team: 'Canada', away_team: 'Ecuador', match_date: '2026-06-17T19:00:00Z', stage: 'group', group_name: 'B', status: 'scheduled' },
  { id: 'g_b5', home_team: 'USA', away_team: 'Ecuador', match_date: '2026-06-21T19:00:00Z', stage: 'group', group_name: 'B', status: 'scheduled' },
  { id: 'g_b6', home_team: 'Canada', away_team: 'Uruguay', match_date: '2026-06-21T19:00:00Z', stage: 'group', group_name: 'B', status: 'scheduled' },
  // Group C
  { id: 'g_c1', home_team: 'Brazil', away_team: 'Germany', match_date: '2026-06-12T19:00:00Z', stage: 'group', group_name: 'C', status: 'scheduled' },
  { id: 'g_c2', home_team: 'Colombia', away_team: 'Chile', match_date: '2026-06-13T15:00:00Z', stage: 'group', group_name: 'C', status: 'scheduled' },
  { id: 'g_c3', home_team: 'Brazil', away_team: 'Colombia', match_date: '2026-06-17T22:00:00Z', stage: 'group', group_name: 'C', status: 'scheduled' },
  { id: 'g_c4', home_team: 'Germany', away_team: 'Chile', match_date: '2026-06-17T22:00:00Z', stage: 'group', group_name: 'C', status: 'scheduled' },
  { id: 'g_c5', home_team: 'Brazil', away_team: 'Chile', match_date: '2026-06-21T22:00:00Z', stage: 'group', group_name: 'C', status: 'scheduled' },
  { id: 'g_c6', home_team: 'Germany', away_team: 'Colombia', match_date: '2026-06-21T22:00:00Z', stage: 'group', group_name: 'C', status: 'scheduled' },
  // Group D
  { id: 'g_d1', home_team: 'France', away_team: 'England', match_date: '2026-06-13T00:00:00Z', stage: 'group', group_name: 'D', status: 'scheduled' },
  { id: 'g_d2', home_team: 'Belgium', away_team: 'Denmark', match_date: '2026-06-13T19:00:00Z', stage: 'group', group_name: 'D', status: 'scheduled' },
  { id: 'g_d3', home_team: 'France', away_team: 'Belgium', match_date: '2026-06-18T19:00:00Z', stage: 'group', group_name: 'D', status: 'scheduled' },
  { id: 'g_d4', home_team: 'England', away_team: 'Denmark', match_date: '2026-06-18T19:00:00Z', stage: 'group', group_name: 'D', status: 'scheduled' },
  { id: 'g_d5', home_team: 'France', away_team: 'Denmark', match_date: '2026-06-22T19:00:00Z', stage: 'group', group_name: 'D', status: 'scheduled' },
  { id: 'g_d6', home_team: 'England', away_team: 'Belgium', match_date: '2026-06-22T19:00:00Z', stage: 'group', group_name: 'D', status: 'scheduled' },
  // Group E
  { id: 'g_e1', home_team: 'Spain', away_team: 'Portugal', match_date: '2026-06-13T19:00:00Z', stage: 'group', group_name: 'E', status: 'scheduled' },
  { id: 'g_e2', home_team: 'Italy', away_team: 'Turkey', match_date: '2026-06-14T15:00:00Z', stage: 'group', group_name: 'E', status: 'scheduled' },
  { id: 'g_e3', home_team: 'Spain', away_team: 'Italy', match_date: '2026-06-18T22:00:00Z', stage: 'group', group_name: 'E', status: 'scheduled' },
  { id: 'g_e4', home_team: 'Portugal', away_team: 'Turkey', match_date: '2026-06-18T22:00:00Z', stage: 'group', group_name: 'E', status: 'scheduled' },
  { id: 'g_e5', home_team: 'Spain', away_team: 'Turkey', match_date: '2026-06-22T22:00:00Z', stage: 'group', group_name: 'E', status: 'scheduled' },
  { id: 'g_e6', home_team: 'Portugal', away_team: 'Italy', match_date: '2026-06-22T22:00:00Z', stage: 'group', group_name: 'E', status: 'scheduled' },
  // Group F
  { id: 'g_f1', home_team: 'Morocco', away_team: 'Senegal', match_date: '2026-06-14T00:00:00Z', stage: 'group', group_name: 'F', status: 'scheduled' },
  { id: 'g_f2', home_team: 'Cameroon', away_team: 'Ghana', match_date: '2026-06-14T19:00:00Z', stage: 'group', group_name: 'F', status: 'scheduled' },
  { id: 'g_f3', home_team: 'Morocco', away_team: 'Cameroon', match_date: '2026-06-19T19:00:00Z', stage: 'group', group_name: 'F', status: 'scheduled' },
  { id: 'g_f4', home_team: 'Senegal', away_team: 'Ghana', match_date: '2026-06-19T19:00:00Z', stage: 'group', group_name: 'F', status: 'scheduled' },
  { id: 'g_f5', home_team: 'Morocco', away_team: 'Ghana', match_date: '2026-06-23T19:00:00Z', stage: 'group', group_name: 'F', status: 'scheduled' },
  { id: 'g_f6', home_team: 'Senegal', away_team: 'Cameroon', match_date: '2026-06-23T19:00:00Z', stage: 'group', group_name: 'F', status: 'scheduled' },
  // Group G
  { id: 'g_g1', home_team: 'Netherlands', away_team: 'Croatia', match_date: '2026-06-14T19:00:00Z', stage: 'group', group_name: 'G', status: 'scheduled' },
  { id: 'g_g2', home_team: 'Austria', away_team: 'Switzerland', match_date: '2026-06-15T15:00:00Z', stage: 'group', group_name: 'G', status: 'scheduled' },
  { id: 'g_g3', home_team: 'Netherlands', away_team: 'Austria', match_date: '2026-06-19T22:00:00Z', stage: 'group', group_name: 'G', status: 'scheduled' },
  { id: 'g_g4', home_team: 'Croatia', away_team: 'Switzerland', match_date: '2026-06-19T22:00:00Z', stage: 'group', group_name: 'G', status: 'scheduled' },
  { id: 'g_g5', home_team: 'Netherlands', away_team: 'Switzerland', match_date: '2026-06-23T22:00:00Z', stage: 'group', group_name: 'G', status: 'scheduled' },
  { id: 'g_g6', home_team: 'Croatia', away_team: 'Austria', match_date: '2026-06-23T22:00:00Z', stage: 'group', group_name: 'G', status: 'scheduled' },
  // Group H
  { id: 'g_h1', home_team: 'Japan', away_team: 'South Korea', match_date: '2026-06-15T00:00:00Z', stage: 'group', group_name: 'H', status: 'scheduled' },
  { id: 'g_h2', home_team: 'Australia', away_team: 'Saudi Arabia', match_date: '2026-06-15T19:00:00Z', stage: 'group', group_name: 'H', status: 'scheduled' },
  { id: 'g_h3', home_team: 'Japan', away_team: 'Australia', match_date: '2026-06-20T19:00:00Z', stage: 'group', group_name: 'H', status: 'scheduled' },
  { id: 'g_h4', home_team: 'South Korea', away_team: 'Saudi Arabia', match_date: '2026-06-20T19:00:00Z', stage: 'group', group_name: 'H', status: 'scheduled' },
  { id: 'g_h5', home_team: 'Japan', away_team: 'Saudi Arabia', match_date: '2026-06-24T19:00:00Z', stage: 'group', group_name: 'H', status: 'scheduled' },
  { id: 'g_h6', home_team: 'South Korea', away_team: 'Australia', match_date: '2026-06-24T19:00:00Z', stage: 'group', group_name: 'H', status: 'scheduled' },
  // Round of 16
  { id: 'r16_1', home_team: 'TBD', away_team: 'TBD', match_date: '2026-06-28T19:00:00Z', stage: 'round_of_16', status: 'scheduled' },
  { id: 'r16_2', home_team: 'TBD', away_team: 'TBD', match_date: '2026-06-28T23:00:00Z', stage: 'round_of_16', status: 'scheduled' },
  { id: 'r16_3', home_team: 'TBD', away_team: 'TBD', match_date: '2026-06-29T19:00:00Z', stage: 'round_of_16', status: 'scheduled' },
  { id: 'r16_4', home_team: 'TBD', away_team: 'TBD', match_date: '2026-06-29T23:00:00Z', stage: 'round_of_16', status: 'scheduled' },
  { id: 'r16_5', home_team: 'TBD', away_team: 'TBD', match_date: '2026-06-30T19:00:00Z', stage: 'round_of_16', status: 'scheduled' },
  { id: 'r16_6', home_team: 'TBD', away_team: 'TBD', match_date: '2026-06-30T23:00:00Z', stage: 'round_of_16', status: 'scheduled' },
  { id: 'r16_7', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-01T19:00:00Z', stage: 'round_of_16', status: 'scheduled' },
  { id: 'r16_8', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-01T23:00:00Z', stage: 'round_of_16', status: 'scheduled' },
  // Quarter Finals
  { id: 'qf_1', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-04T19:00:00Z', stage: 'quarter_final', status: 'scheduled' },
  { id: 'qf_2', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-04T23:00:00Z', stage: 'quarter_final', status: 'scheduled' },
  { id: 'qf_3', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-05T19:00:00Z', stage: 'quarter_final', status: 'scheduled' },
  { id: 'qf_4', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-05T23:00:00Z', stage: 'quarter_final', status: 'scheduled' },
  // Semi Finals
  { id: 'sf_1', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-09T19:00:00Z', stage: 'semi_final', status: 'scheduled' },
  { id: 'sf_2', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-10T19:00:00Z', stage: 'semi_final', status: 'scheduled' },
  // Third Place
  { id: 'tp', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-14T19:00:00Z', stage: 'third_place', status: 'scheduled' },
  // Final
  { id: 'final', home_team: 'TBD', away_team: 'TBD', match_date: '2026-07-19T19:00:00Z', stage: 'final', status: 'scheduled' },
]

const venues = [
  { name: 'The Alchemist', address: 'Westlands, Nairobi', area: 'Westlands', lat: -1.2667, lng: 36.8028, description: 'Popular sports bar with multiple big screens and great atmosphere', verified: true },
  { name: 'K1 Klubhouse', address: 'Karen, Nairobi', area: 'Karen', lat: -1.3167, lng: 36.7167, description: 'Upscale sports lounge with giant screens and premium seating', verified: true },
  { name: 'Brew Bistro', address: 'Westlands, Nairobi', area: 'Westlands', lat: -1.2633, lng: 36.8014, description: 'Rooftop bar perfect for evening matches with great crowd energy', verified: true },
  { name: 'The Local', address: 'Kilimani, Nairobi', area: 'Kilimani', lat: -1.2833, lng: 36.7833, description: 'Lively neighborhood bar, great atmosphere for big games', verified: true },
  { name: 'Olepolos Country Club', address: 'Langata, Nairobi', area: 'Langata', lat: -1.3500, lng: 36.7333, description: 'Outdoor screens with a relaxed setting, perfect for afternoon kickoffs', verified: true },
  { name: 'Gipsy Bar', address: 'Lavington, Nairobi', area: 'Lavington', lat: -1.2833, lng: 36.7667, description: 'Lively crowd, especially electric when African teams play', verified: true },
  { name: 'Havana Bar', address: 'Westlands, Nairobi', area: 'Westlands', lat: -1.2611, lng: 36.8019, description: 'Cuban-themed bar with great screens and cocktails', verified: true },
  { name: 'Club Signature', address: 'Hurlingham, Nairobi', area: 'Hurlingham', lat: -1.2944, lng: 36.7869, description: 'Sports bar with multiple screens and affordable drinks', verified: false },
]

async function seed() {
  console.log('🌱 Seeding database...')

  console.log('📅 Inserting matches...')
  const { error: matchError } = await supabase
    .from('matches')
    .upsert(matches, { onConflict: 'id' })
  if (matchError) {
    console.error('❌ Match error:', matchError.message)
  } else {
    console.log(`✅ ${matches.length} matches seeded`)
  }

  console.log('📍 Inserting venues...')
  const { error: venueError } = await supabase
    .from('venues')
    .upsert(venues, { onConflict: 'id' })
  if (venueError) {
    console.error('❌ Venue error:', venueError.message)
  } else {
    console.log(`✅ ${venues.length} venues seeded`)
  }

  console.log('🎉 Done!')
}

seed()