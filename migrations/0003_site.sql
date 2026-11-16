create table if not exists site_contact (
  id integer primary key,
  email text not null,
  phone text not null,
  linkedin text not null,
  location text not null
);

insert into site_contact (id, email, phone, linkedin, location)
values (
  1,
  'mahmuodnagib9@gmail.com',
  '+254 745 791 267',
  'https://www.linkedin.com/in/mahmoudnagib001',
  'Nairobi, Kenya'
)
on conflict (id) do nothing;

create table if not exists site_pages (
  id serial primary key,
  slug text not null unique,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);
