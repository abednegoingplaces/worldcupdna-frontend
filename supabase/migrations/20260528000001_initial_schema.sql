-- PROFILES table (fan DNA)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  favorite_team text not null,
  tactical_style text,
  rival_hate_level int default 5,
  dna_badge_url text,
  total_points int default 0,
  created_at timestamptz default now()
);

-- MATCHES table
create table matches (
  id text primary key,
  home_team text not null,
  away_team text not null,
  home_score int,
  away_score int,
  match_date timestamptz not null,
  stage text not null,
  group_name text,
  status text default 'scheduled',
  created_at timestamptz default now()
);

-- PREDICTIONS table
create table predictions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  match_id text references matches(id) on delete cascade,
  predicted_home int not null,
  predicted_away int not null,
  points_earned int default 0,
  created_at timestamptz default now(),
  unique(user_id, match_id)
);

-- WATCH PARTY VENUES table
create table venues (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  address text not null,
  area text not null,
  lat float,
  lng float,
  description text,
  verified boolean default false,
  created_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table predictions enable row level security;
alter table matches enable row level security;
alter table venues enable row level security;

-- RLS Policies
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);

create policy "Matches are viewable by everyone" on matches for select using (true);
create policy "Venues are viewable by everyone" on venues for select using (true);

create policy "Users can view all predictions" on predictions for select using (true);
create policy "Users can insert their own predictions" on predictions for insert with check (auth.uid() = user_id);
create policy "Users can update their own predictions" on predictions for update using (auth.uid() = user_id);