
-- Explicit restrictive SELECT policy on questions: only admins
CREATE POLICY "Only admins can directly read questions"
  ON public.questions AS RESTRICTIVE
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Realtime channel authorization: only approved users can subscribe
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved users can read realtime messages"
  ON realtime.messages FOR SELECT TO authenticated
  USING (
    is_user_approved((select auth.uid()))
    OR has_role((select auth.uid()), 'admin'::app_role)
  );

CREATE POLICY "Approved users can send realtime messages"
  ON realtime.messages FOR INSERT TO authenticated
  WITH CHECK (
    is_user_approved((select auth.uid()))
    OR has_role((select auth.uid()), 'admin'::app_role)
  );
