-- Remove the receipt-upload path that belonged to the bank/UrPay flow.
--
-- `Users can upload payment receipts` let any signed-in student write into
-- homework-uploads/payments/<uid>/ and `Users can view payment receipts` let
-- them (and admins) read it back. Nothing writes or reads that prefix any more —
-- Stripe Checkout collects the payment — so the two policies are a write surface
-- with no owner. The `homework-uploads` bucket and its ai-marker policies stay:
-- that is a different, live feature.
--
-- No BEGIN/COMMIT: .freebuff/apply-sql-file.cjs wraps the file for the dry run.

drop policy if exists "Users can upload payment receipts" on storage.objects;
drop policy if exists "Users can view payment receipts" on storage.objects;
