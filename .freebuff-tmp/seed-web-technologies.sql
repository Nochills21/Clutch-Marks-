insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies'), '0478 5.1a', $st$Distinguish the internet from the world wide web, and explain URLs, browsers and servers.$st$, $teach$### What is being asked
Separate the network from the service, or name the part in a web address. The answer keeps infrastructure (internet) apart from content (web).

### Method
1. Internet: the global network of networks — cables, routers, protocols carrying all traffic.
2. World wide web: one service running on it — pages linked by hyperlinks, fetched with HTTP/HTTPS.
3. URL anatomy: protocol (https), domain (www.example.com), path (/notes). Each part routes or locates.
4. Browser requests, server responds: the browser renders HTML/CSS; the server stores and serves the files.

### Worked example
Typing https://example.com/notes: the browser asks DNS for the server's address, requests /notes over HTTPS, and renders the returned page. Check: the internet carried the request, the web defined what was asked for — two layers, one journey.

### Traps
- Internet equals web. Email, gaming and messaging use the internet without the web — the web is a passenger, not the road.
- URL parts swapped. The domain finds the server; the path finds the page — reversing them breaks the request.
- Browsers store the web. Browsers render copies; servers hold the originals — deleting a bookmark deletes nothing.
- HTTP versus HTTPS. The S adds encryption (TLS) — logins and payments need it; plain HTTP exposes everything.

### Timing
Paper 1: 2-3 minutes, 2-3 marks. Layer questions want both named with one difference that actually separates them.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies'), '0478 5.1b', $st$Explain how DNS resolves addresses and how cookies remember users between visits.$st$, $teach$### What is being asked
Trace a page load past the address bar or judge what a cookie does. The answer follows the lookup first, then the memory.

### Method
1. DNS is the phone book: the browser asks a resolver for the domain's IP address and caches the answer briefly.
2. With the IP, the browser requests the page over HTTP/HTTPS; the server responds with files.
3. Cookies are small server-set tokens the browser stores and returns on later visits — sessions, preferences, baskets.
4. Judge cookies by purpose: remembering you (convenience) versus tracking you (privacy) — same mechanism, different masters.

### Worked example
A shop remembers your basket after login: the server set a session cookie at login, and your browser returns it with every request, so the server knows each page belongs to you. Check: delete the cookie and the basket empties — the memory lived in that token, not in your account page.

### Traps
- DNS "finds the website". It translates names to IP addresses — routing and fetching happen after, by other systems.
- Cookies as programs. Cookies are passive text tokens; they cannot run, replicate or scan your disk.
- "Private browsing deletes tracking". It discards local cookies after the session; trackers still profiled you during it.
- Every cookie is spying. Session and preference cookies serve the user; third-party trackers serve advertisers — purpose decides.

### Timing
Paper 1: 3 minutes, 3-4 marks. Flow questions want the order: name, address, request, memory.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies'), '0478 5.2a', $st$Explain blockchain structure and mining in digital currency systems.$st$, $teach$### What is being asked
Describe how cryptocurrency records transactions without a bank. The answer chains three ideas: distributed ledger, linked blocks, rewarded verification.

### Method
1. Blockchain: a shared ledger copied across many computers; each block holds transactions plus the previous block's hash, chaining them in order.
2. Mining/validation: computers compete or collaborate to verify new blocks (solving puzzles or staking); winners append the block and earn currency.
3. Tampering shows: altering one block breaks its hash and every link after — the network rejects the forgery.
4. No central bank: trust comes from consensus and cryptography, not from an institution's promise.

### Worked example
Amina sends 2 coins to Ben: the transaction broadcasts, validators check her balance and signature, the winning block joins the chain, and every copy updates. Check: spending the same coins again fails — the ledger already records them as Ben's, and rewriting it means out-computing the whole network.

### Traps
- "Bitcoins are files sent like attachments". Coins are ledger entries; the chain tracks ownership, nothing is emailed.
- Mining creates coins from nothing. Rewards pay for verification work within strict issuance rules — effort first, coins after.
- One copy to hack. Thousands of copies must agree; forging one copy convinces nobody.
- Anonymous means untraceable. Addresses are pseudonymous — the ledger is public, and patterns de-anonymise careless users.

### Timing
Paper 1: 3-4 minutes, 3-5 marks. Chain questions want the link logic: each block's hash binds it to the last.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies'), '0478 5.2b', $st$Discuss benefits and risks of digital currency for users and businesses.$st$, $teach$### What is being asked
Argue about cryptocurrency adoption. The answer balances borderless speed and inclusion against volatility, crime and energy — judged, not listed.

### Method
1. Benefits: fast borderless transfers, lower fees than some remittance routes, access without a bank account, transparent public ledger.
2. Risks: violent price swings, irreversible mistaken payments, use in crime, energy-hungry validation, lost keys meaning lost funds.
3. Judge per actor: a migrant worker values fees and access; a shop values price stability it does not get.
4. End in judgement: adopt for, avoid for, or condition — with the scenario's facts behind the verdict.

### Worked example
A freelancer paid in crypto across borders: near-instant receipt with small fees (benefit), but a 10% weekly price swing and no password-reset if keys are lost (risks). Verdict: accept, converting to local currency promptly. Check: each point touches the freelancer's facts — speed, fees, volatility, key custody.

### Traps
- Benefits only. Volatility and irreversibility are the syllabus's counterweight — omit them and half the marks go.
- "Crypto is free". Fees, spreads and energy costs exist; compare honestly with alternatives.
- Guaranteed anonymity. Pseudonymity with a public ledger is not invisibility — crime claims overreach.
- No conclusion. Discussion ends in a verdict for the stated actor, not a shrug.

### Timing
Paper 1: 4 minutes, 4-6 marks. Two benefits, two risks, one verdict — the reliable full-mark shape.$teach$, 4)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and title = 'Checkpoints — Web Technologies';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies'), 'Checkpoints — Web Technologies', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Which statement correctly distinguishes the internet from the web?$qt$, $opts$["The internet is the network; the web is one service running on it","They are two names for the same thing","The web carries the internet's cables","The internet only works inside browsers"]$opts$::jsonb, 0, $ex$Infrastructure versus service: cables and routers carry many services, of which the web is one. Sameness, reversed carrying and browser-only claims all invert the relationship.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '0478 5.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$In https://example.com/notes, what does example.com do?$qt$, $opts$["Encrypts the page contents","Formats the page layout","Names the server DNS must find","Stores your passwords"]$opts$::jsonb, 2, $ex$The domain locates the server via DNS. Encryption is the protocol's job; layout is CSS; passwords live in stores, not addresses.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '0478 5.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$What does DNS do when you type a web address?$qt$, $opts$["Encrypts the connection","Translates the domain name to an IP address","Builds the web page","Checks your password"]$opts$::jsonb, 1, $ex$Name-to-address translation is DNS's whole job. Encryption is TLS; building is the server and browser; passwords belong to authentication.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '0478 5.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A news site remembers your dark-mode choice between visits. How?$qt$, $opts$["A cookie storing the preference, returned each visit","The server's faster processor","Your password being retyped silently","DNS remembering your screen"]$opts$::jsonb, 3, $ex$A stored preference cookie returns with each request and the site honours it. DNS resolves names; processors serve faster, not personally; silent password reuse is a vulnerability, not a feature.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '0478 5.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What links each blockchain block to the previous one?$qt$, $opts$["A shared password","A fibre-optic cable","The previous block's hash stored inside it","The bank's signature"]$opts$::jsonb, 2, $ex$Embedded previous-hashes chain blocks in order — tampering breaks the link. Passwords, cables and banks play no role in a decentralised ledger.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '0478 5.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Why is a confirmed blockchain transaction hard to reverse?$qt$, $opts$["Rewriting it means recomputing every later block on most copies","Banks refuse to reverse it","The coins are deleted after sending","Passwords expire immediately"]$opts$::jsonb, 0, $ex$Each later block cements the earlier ones across thousands of copies — reversal needs out-computing the network. No bank is involved; coins transfer, not vanish; passwords are irrelevant.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '0478 5.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which is a genuine benefit of digital currency for cross-border workers?$qt$, $opts$["Guaranteed rising value","Complete anonymity from all authorities","Free electricity for mining","Fast transfers with low fees and no bank account needed"]$opts$::jsonb, 3, $ex$Speed, cost and access are the real inclusion case. Values swing; anonymity is partial; mining energy is a cost, not a freebie.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '0478 5.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A shop considers pricing goods in cryptocurrency. What is the strongest risk?$qt$, $opts$["Customers dislike fast payments","Price volatility between sale and conversion","Too many customers paying at once","The coins weigh too much"]$opts$::jsonb, 1, $ex$A 10% swing erases retail margins — stability is what shops need and crypto lacks. Speed attracts; volume is welcome; weight is a joke about physical cash.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '0478 5.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Explain the roles of the browser, DNS and the web server when a user first visits https://example.com/notes.$qt$, $opts$["DNS renders the page, the browser stores it permanently, the server encrypts passwords","The server translates names, DNS supplies files, the browser banks the coins","Browser renders, DNS translates the domain to an IP, server supplies the page files","All three delete cookies before loading"]$opts$::jsonb, 2, $ex$Marks as awarded: DNS resolves example.com to an address [1]; browser requests and renders while the server provides /notes [1]. Rendering, storage and translation are never DNS's, the browser's permanent store, or the server's naming job.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '0478 5.1a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '5.1')),
('00000000-0000-0000-0000-000000000000', $qt$A charity accepts crypto donations from abroad. Give one benefit and one risk specific to this case.$qt$, $opts$["Benefit: fast borderless gifts; risk: volatility shrinking donations before use","Benefit: guaranteed profit; risk: donors giving too much","Benefit: no records kept; risk: excessive paperwork","Benefit: free mining income; risk: coins expiring"]$opts$::jsonb, 0, $ex$Marks as awarded: borderless speed as the matched benefit [1]; volatility (or irreversibility/key loss) as the matched risk [1]. Profits are never guaranteed; records are public by design; coins neither mine themselves nor expire.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '0478 5.2b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'web-technologies') and code = '5.2'));
