-- Hand-reviewed, question-specific explanation repairs.
-- Every update checks the old text, correct option, and short-explanation condition.
DO $$
DECLARE changed integer;
BEGIN
  UPDATE public.questions
     SET explanation = 'Area is velocity multiplied by time, so the units are m s⁻¹ × s = m. Signed area gives displacement; total area gives distance if direction changes.'
   WHERE id = 'a57b388b-b3f1-432e-8401-ab3408bbb4fe'
     AND explanation = 'v × t has units of displacement.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'displacement';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'a57b388b-b3f1-432e-8401-ab3408bbb4fe';
  END IF;
  UPDATE public.questions
     SET explanation = 'At terminal velocity the speed is constant, so acceleration and resultant force are zero. Upward drag therefore balances the downward weight.'
   WHERE id = 'daa6b4d9-a0a4-41ae-8abc-8b4026d48b5a'
     AND explanation = 'Forces balance at terminal velocity.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'weight equal to drag';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'daa6b4d9-a0a4-41ae-8abc-8b4026d48b5a';
  END IF;
  UPDATE public.questions
     SET explanation = 'The normal reaction is the contact force exerted by a surface and acts at right angles to it. It is not necessarily opposite to weight.'
   WHERE id = 'd7728878-4020-473a-94e5-2dbbb9a3a992'
     AND explanation = 'Normal means perpendicular.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'perpendicular to the surface';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'd7728878-4020-473a-94e5-2dbbb9a3a992';
  END IF;
  UPDATE public.questions
     SET explanation = 'Stress = force/area, giving N m⁻². One N m⁻² is one pascal (Pa), not a joule or a newton.'
   WHERE id = 'ae3620b4-ade8-4a07-804c-e4874ad4bcf0'
     AND explanation = 'N m⁻² = Pa.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'pascals';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'ae3620b4-ade8-4a07-804c-e4874ad4bcf0';
  END IF;
  UPDATE public.questions
     SET explanation = 'In one period T, a wave travels one wavelength λ. Since f=1/T, its speed is v=λ/T=fλ; the units are Hz × m = m s⁻¹.'
   WHERE id = '180678e9-daf4-4e9e-a125-2880c8604193'
     AND explanation = 'Standard relation.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'v = fλ';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '180678e9-daf4-4e9e-a125-2880c8604193';
  END IF;
  UPDATE public.questions
     SET explanation = 'As a source approaches, successive wavefronts are closer together, so wavelength decreases. Wave speed in the medium is unchanged, hence f=v/λ increases.'
   WHERE id = 'df8a4258-53db-4f53-9145-8300bd805368'
     AND explanation = 'Wavefronts bunch up.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'higher frequency';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'df8a4258-53db-4f53-9145-8300bd805368';
  END IF;
  UPDATE public.questions
     SET explanation = 'Both springs undergo the same extension x, while their restoring forces add: F=kx+kx=2kx. Thus the equivalent stiffness is 2k.'
   WHERE id = 'd717ca79-9b8f-4aac-9e11-9c3797ca4d37'
     AND explanation = 'Parallel springs add stiffness.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = '2k';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'd717ca79-9b8f-4aac-9e11-9c3797ca4d37';
  END IF;
  UPDATE public.questions
     SET explanation = 'For circular motion, a=v²/r toward the centre. Newton’s second law gives F=ma=mv²/r; this is the resultant force, not an extra force type.'
   WHERE id = 'e713bbfb-f2fe-4e3d-8813-ddb89c9ea94e'
     AND explanation = 'Standard formula.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'mv²/r';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'e713bbfb-f2fe-4e3d-8813-ddb89c9ea94e';
  END IF;
  UPDATE public.questions
     SET explanation = 'The CPU saves its current state, branches to the interrupt service routine (ISR), handles the event, then restores the state to resume the interrupted program.'
   WHERE id = '8258374f-d587-475c-ac77-436c926dc608'
     AND explanation = 'Interrupt service routine.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'save context and run an ISR';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '8258374f-d587-475c-ac77-436c926dc608';
  END IF;
  UPDATE public.questions
     SET explanation = 'With dynamic linking, a program connects to shared library code when it runs rather than copying all library code into the executable at compile time.'
   WHERE id = 'c39ed44b-94dc-401e-ad90-0a862dcc385f'
     AND explanation = 'Shared at runtime.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'bind at run time';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'c39ed44b-94dc-401e-ad90-0a862dcc385f';
  END IF;
  UPDATE public.questions
     SET explanation = 'Third normal form removes dependencies where a non-key attribute depends on another non-key attribute, rather than directly on the key.'
   WHERE id = '6b2d335e-59bf-4cf9-af53-e80fc91dd621'
     AND explanation = 'Non-key → non-key chains.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'transitive dependencies';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '6b2d335e-59bf-4cf9-af53-e80fc91dd621';
  END IF;
  UPDATE public.questions
     SET explanation = 'First normal form requires each field to contain a single, indivisible value. Repeating groups or lists stored in one field violate this rule.'
   WHERE id = '56af7063-ecdd-4390-94e0-afb7b21302ef'
     AND explanation = 'No repeating groups.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'atomic values';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '56af7063-ecdd-4390-94e0-afb7b21302ef';
  END IF;
  UPDATE public.questions
     SET explanation = 'Data-protection laws regulate how personal data is collected, processed, stored and shared, giving individuals rights over information that identifies them.'
   WHERE id = '32d3d496-8bc6-48ce-ae7a-6eaed5ad8f9f'
     AND explanation = 'Privacy regulation.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'personal data';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '32d3d496-8bc6-48ce-ae7a-6eaed5ad8f9f';
  END IF;
  UPDATE public.questions
     SET explanation = 'The null hypothesis contains equality at the claimed value, H₀:p=0.5. The alternative p>0.5 sets a one-tailed test asking whether the proportion is greater.'
   WHERE id = '80669450-dc11-45d5-a049-4404c7a641c5'
     AND explanation = 'The null always carries the equality.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'H₀: p = 0.5, H₁: p > 0.5';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '80669450-dc11-45d5-a049-4404c7a641c5';
  END IF;
  UPDATE public.questions
     SET explanation = 'The alternative hypothesis specifies the direction of evidence. Since H₁ says p<p₀, unusually small values of the test statistic lie in the rejection region.'
   WHERE id = '9c806c16-ead4-460c-b928-0f55ba3775c7'
     AND explanation = 'The direction in H₁ picks the tail.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'the lower tail only';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '9c806c16-ead4-460c-b928-0f55ba3775c7';
  END IF;
  UPDATE public.questions
     SET explanation = 'For zero resultant moment about a pivot, the sum of clockwise moments equals the sum of anticlockwise moments. Each moment is force × perpendicular distance.'
   WHERE id = 'de357f1d-f248-4c3a-a38c-de7f11c171de'
     AND explanation = 'Principle of moments.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'clockwise moments equal anticlockwise moments';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'de357f1d-f248-4c3a-a38c-de7f11c171de';
  END IF;
  UPDATE public.questions
     SET explanation = 'Wave intensity is proportional to amplitude squared. Doubling amplitude multiplies intensity by 2²=4, not by 2.'
   WHERE id = '26fa5615-6f93-4e86-8421-7e8b53bf0510'
     AND explanation = 'I ∝ amplitude².'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = '×4';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '26fa5615-6f93-4e86-8421-7e8b53bf0510';
  END IF;
  UPDATE public.questions
     SET explanation = 'At a node, opposing waves cancel at every instant, so displacement is always zero. Adjacent antinodes oscillate with maximum amplitude.'
   WHERE id = '374f61d0-532a-4d74-af87-d06eb07ebe09'
     AND explanation = 'Destructive superposition at all times.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'always zero';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '374f61d0-532a-4d74-af87-d06eb07ebe09';
  END IF;
  UPDATE public.questions
     SET explanation = 'Undo reverses the most recent action first, so actions are last-in, first-out (LIFO). A stack lets the latest action be popped first.'
   WHERE id = '17973fbf-f016-4c48-a7fc-eb46a3a0bbfd'
     AND explanation = 'Most recent first.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'stack';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '17973fbf-f016-4c48-a7fc-eb46a3a0bbfd';
  END IF;
  UPDATE public.questions
     SET explanation = 'An interpreter translates and executes source code during runtime, typically one statement at a time. It can report an error when execution reaches the faulty line.'
   WHERE id = '61911695-0175-4867-b620-4c16fd999f0c'
     AND explanation = 'Stops at the first error.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'executes line by line';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '61911695-0175-4867-b620-4c16fd999f0c';
  END IF;
  UPDATE public.questions
     SET explanation = 'A packet-filtering firewall applies rules to information such as source/destination IP addresses and port numbers to allow or block traffic.'
   WHERE id = 'ade679b0-9d2e-4eb8-98e0-de85e7ce25e6'
     AND explanation = 'Packet filtering.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'ports and IP addresses';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'ade679b0-9d2e-4eb8-98e0-de85e7ce25e6';
  END IF;
  UPDATE public.questions
     SET explanation = 'Spooling queues print jobs on storage so applications can continue while the slower printer processes each job in order.'
   WHERE id = 'a805e2e6-6466-45e0-b1c8-ec98b1d073ea'
     AND explanation = 'Queueing slow output.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'print jobs';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'a805e2e6-6466-45e0-b1c8-ec98b1d073ea';
  END IF;
  UPDATE public.questions
     SET explanation = 'The CPU places a memory or I/O address on the address bus to identify the location being accessed. The data bus carries values and may be bidirectional.'
   WHERE id = '0ac4274e-e469-45c7-bb7a-9a5f606da9ae'
     AND explanation = 'CPU drives addresses.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'one-way from CPU';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '0ac4274e-e469-45c7-bb7a-9a5f606da9ae';
  END IF;
  UPDATE public.questions
     SET explanation = 'An assembler converts assembly mnemonics and labels into machine-code instructions and addresses that the processor can execute.'
   WHERE id = '9ffe14de-a4de-4dfd-9ce7-d85d70b7ef40'
     AND explanation = 'One-to-one translation.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'an assembler';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '9ffe14de-a4de-4dfd-9ce7-d85d70b7ef40';
  END IF;
  UPDATE public.questions
     SET explanation = 'A base case stops further recursive calls. Without one, calls continue until resources are exhausted instead of returning a result.'
   WHERE id = '37d21cba-64d4-4c89-8793-4de419e41f50'
     AND explanation = 'Otherwise infinite calls.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'a base case';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '37d21cba-64d4-4c89-8793-4de419e41f50';
  END IF;
  UPDATE public.questions
     SET explanation = 'The ACM Code places the public good first and requires computing professionals to avoid harm, including foreseeable harm from systems they build or operate.'
   WHERE id = '74f8e93f-9b0a-49ce-b256-d323d4791ea9'
     AND explanation = 'Public interest first.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'avoid harm to the public';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '74f8e93f-9b0a-49ce-b256-d323d4791ea9';
  END IF;
  UPDATE public.questions
     SET explanation = 'Secant is the reciprocal of cosine: secθ=1/cosθ, provided cosθ is not zero.'
   WHERE id = '15178648-e7df-4a2c-a56e-30dcf09afeca'
     AND explanation = 'Secant is the reciprocal of cosine.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = '1/cos θ';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '15178648-e7df-4a2c-a56e-30dcf09afeca';
  END IF;
  UPDATE public.questions
     SET explanation = 'A router operates at the network layer and examines destination IP addresses to choose the next hop. A switch normally forwards frames using MAC addresses.'
   WHERE id = 'e4420986-a589-4f40-a22b-1262ae5c71d1'
     AND explanation = 'Layer-3 device.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'IP addresses';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'e4420986-a589-4f40-a22b-1262ae5c71d1';
  END IF;
  UPDATE public.questions
     SET explanation = 'HTTPS is HTTP carried over TLS, providing encryption and server authentication. It is not merely a different application protocol.'
   WHERE id = '270d740c-491a-44a8-badb-4e32fe87bbf7'
     AND explanation = 'Secure sockets layer.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'TLS encryption';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '270d740c-491a-44a8-badb-4e32fe87bbf7';
  END IF;
  UPDATE public.questions
     SET explanation = 'The program counter stores the address of the next instruction to fetch. It is updated after fetch unless a branch changes control flow.'
   WHERE id = 'b7c60746-21cd-4b28-8673-3a879a928ce1'
     AND explanation = 'Program counter.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'the next instruction''s address';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'b7c60746-21cd-4b28-8673-3a879a928ce1';
  END IF;
  UPDATE public.questions
     SET explanation = 'A breakpoint marks where execution pauses, allowing the programmer to inspect variables and step through the program.'
   WHERE id = 'c39cc314-dafd-4739-9326-b1adb9e79ed8'
     AND explanation = 'Core debugging tool.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'pause execution at a line';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'c39cc314-dafd-4739-9326-b1adb9e79ed8';
  END IF;
  UPDATE public.questions
     SET explanation = 'A full-duplex channel transmits and receives at the same time. Half-duplex allows both directions, but only one at a time.'
   WHERE id = 'cba1169f-da5b-4c69-b22f-840d060456a9'
     AND explanation = 'Like a phone call.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'both directions simultaneously';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'cba1169f-da5b-4c69-b22f-840d060456a9';
  END IF;
  UPDATE public.questions
     SET explanation = 'Binary search compares with the middle item and discards half the range, which is valid only when the data is sorted in the search order.'
   WHERE id = 'f2e3048e-36c9-4c8d-bdc6-2086b05fb0bf'
     AND explanation = 'Halving depends on order.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'sorted data';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', 'f2e3048e-36c9-4c8d-bdc6-2086b05fb0bf';
  END IF;
  UPDATE public.questions
     SET explanation = 'Radian measure is arc length divided by radius: θ=s/r. If s=r, then θ=1 radian.'
   WHERE id = '3f4e6216-e3fc-445e-980e-50d74f4383a6'
     AND explanation = 'That is the definition of one radian.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = '1 radian';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '3f4e6216-e3fc-445e-980e-50d74f4383a6';
  END IF;
  UPDATE public.questions
     SET explanation = 'A primary key identifies each row, so its values must be unique and cannot be NULL. It may contain one attribute or several.'
   WHERE id = '817b6796-f96d-4c98-9e15-0395028b8959'
     AND explanation = 'Uniquely identifies rows.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'unique and non-null';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '817b6796-f96d-4c98-9e15-0395028b8959';
  END IF;
  UPDATE public.questions
     SET explanation = 'A foreign key stores a value matching a key in a related table, enforcing referential integrity. In this item, the keyed answer names the common primary-key reference.'
   WHERE id = '70fffe1f-5db1-45b7-b943-e535dd4be2d3'
     AND explanation = 'Creates the relationship.'
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = 'another table''s primary key';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', '70fffe1f-5db1-45b7-b943-e535dd4be2d3';
  END IF;
END
$$;
