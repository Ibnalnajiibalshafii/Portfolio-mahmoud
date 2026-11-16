create table if not exists projects (
  id serial primary key,
  title text not null,
  summary text not null,
  tools text not null default '',
  tags text not null default '',
  link text not null default '',
  created_at timestamptz not null default now()
);
