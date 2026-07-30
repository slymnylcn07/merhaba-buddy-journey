create table if not exists public.guide_views_daily (
  slug text not null,
  view_date date not null default current_date,
  views bigint not null default 0 check (views >= 0),
  primary key (slug, view_date)
);

create table if not exists public.guide_view_visitors (
  slug text not null,
  view_date date not null default current_date,
  visitor_hash text not null,
  created_at timestamptz not null default now(),
  primary key (slug, view_date, visitor_hash)
);

create index if not exists guide_views_daily_date_idx
  on public.guide_views_daily (view_date desc);

create index if not exists guide_view_visitors_date_idx
  on public.guide_view_visitors (view_date desc);

alter table public.guide_views_daily enable row level security;
alter table public.guide_view_visitors enable row level security;

revoke all on table public.guide_views_daily from anon, authenticated;
revoke all on table public.guide_view_visitors from anon, authenticated;
grant all on table public.guide_views_daily to service_role;
grant all on table public.guide_view_visitors to service_role;

create or replace function public.record_guide_view(
  p_slug text,
  p_visitor_hash text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_rows integer;
begin
  if p_slug is null
    or p_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    or length(p_slug) > 120
    or p_visitor_hash is null
    or length(p_visitor_hash) <> 64
  then
    raise exception 'Invalid guide view';
  end if;

  insert into public.guide_view_visitors (slug, view_date, visitor_hash)
  values (p_slug, current_date, p_visitor_hash)
  on conflict do nothing;

  get diagnostics inserted_rows = row_count;

  if inserted_rows = 0 then
    return false;
  end if;

  insert into public.guide_views_daily (slug, view_date, views)
  values (p_slug, current_date, 1)
  on conflict (slug, view_date)
  do update set views = public.guide_views_daily.views + 1;

  if random() < 0.01 then
    delete from public.guide_view_visitors
    where view_date < current_date - 31;

    delete from public.guide_views_daily
    where view_date < current_date - 180;
  end if;

  return true;
end;
$$;

create or replace function public.get_popular_guides(
  p_days integer default 30,
  p_slugs text[] default null,
  p_limit integer default 100
)
returns table (
  slug text,
  total_views bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    daily.slug,
    sum(daily.views)::bigint as total_views
  from public.guide_views_daily as daily
  where daily.view_date >= current_date - (greatest(1, least(coalesce(p_days, 30), 90)) - 1)
    and (
      p_slugs is null
      or cardinality(p_slugs) = 0
      or daily.slug = any(p_slugs)
    )
  group by daily.slug
  order by total_views desc, daily.slug asc
  limit greatest(1, least(coalesce(p_limit, 100), 120));
$$;

create or replace function public.get_popular_guide_slugs(
  p_days integer default 30,
  p_slugs text[] default null,
  p_limit integer default 100
)
returns table (
  slug text
)
language sql
stable
security definer
set search_path = public
as $$
  with ranked as materialized (
    select *
    from public.get_popular_guides(p_days, p_slugs, 120)
  )
  select ranked.slug
  from ranked
  where (
    select coalesce(sum(sample.total_views), 0)
    from ranked as sample
  ) >= 20
  order by ranked.total_views desc, ranked.slug asc
  limit greatest(1, least(coalesce(p_limit, 100), 120));
$$;

revoke all on function public.record_guide_view(text, text) from public, anon, authenticated;
revoke all on function public.get_popular_guides(integer, text[], integer) from public, anon, authenticated;
revoke all on function public.get_popular_guide_slugs(integer, text[], integer) from public, anon, authenticated;
grant execute on function public.record_guide_view(text, text) to anon, authenticated, service_role;
grant execute on function public.get_popular_guides(integer, text[], integer) to service_role;
grant execute on function public.get_popular_guide_slugs(integer, text[], integer) to anon, authenticated, service_role;
