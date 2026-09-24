-- Named FK to profiles so PostgREST can embed parent/child usernames.
alter table public.parent_student_links
  drop constraint if exists parent_student_links_parent_fk;
alter table public.parent_student_links
  add constraint parent_student_links_parent_fk
  foreign key (parent_id) references public.profiles(user_id) on delete cascade;
alter table public.parent_student_links
  drop constraint if exists parent_student_links_student_fk;
alter table public.parent_student_links
  add constraint parent_student_links_student_fk
  foreign key (student_id) references public.profiles(user_id) on delete cascade;
