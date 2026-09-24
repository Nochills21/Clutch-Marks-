-- Parents self-serve: they may create/delete their own links (the existing
-- policies only let them view). Insert is restricted to real parent accounts.
drop policy if exists "Parents can create own links" on public.parent_student_links;
create policy "Parents can create own links"
  on public.parent_student_links for insert
  with check (
    has_role(auth.uid(), 'parent'::app_role) and parent_id = auth.uid()
  );
drop policy if exists "Parents can remove own links" on public.parent_student_links;
create policy "Parents can remove own links"
  on public.parent_student_links for delete
  using (parent_id = auth.uid());
