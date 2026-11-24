-- Run this ONCE in Supabase: SQL Editor -> New query -> paste -> Run

create table submissions (
  id text primary key,
  name text not null,
  age int,
  contact text,
  grade_section text,
  activity text,
  date date,
  role text,
  notes text,
  photo_paths text[] default '{}',
  status text default 'Pending',
  created bigint
);

alter table submissions enable row level security;

-- Anyone (participants) can submit, but cannot read others' submissions
create policy "participants can submit" on submissions for insert to anon, authenticated with check (true);
-- Only the logged-in admin can read, update, delete
create policy "admin read"   on submissions for select to authenticated using (true);
create policy "admin update" on submissions for update to authenticated using (true);
create policy "admin delete" on submissions for delete to authenticated using (true);

-- Private photo bucket
insert into storage.buckets (id, name, public) values ('documentation', 'documentation', false);
create policy "participants can upload" on storage.objects for insert to anon, authenticated with check (bucket_id = 'documentation');
create policy "admin read files"   on storage.objects for select to authenticated using (bucket_id = 'documentation');
create policy "admin delete files" on storage.objects for delete to authenticated using (bucket_id = 'documentation');