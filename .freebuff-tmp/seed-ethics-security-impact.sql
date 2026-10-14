insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact'), '0478 5.3a', $st$Describe malware types including virus, worm, trojan, spyware and ransomware, and how each harms.$st$, $teach$### What is being asked
Identify malware from its behaviour or match a threat to its damage. The answer names the type and the mechanism — what it does, not just that it is bad.

### Method
1. Virus: attaches to files or programs and needs a host plus user action to spread; damages or deletes data.
2. Worm: spreads by itself across networks with no host file; clogs networks and delivers payloads.
3. Trojan: pretends to be useful software; opens a back door once installed.
4. Spyware: watches quietly (keystrokes, browsing) and reports back. Ransomware: encrypts files and demands payment.

### Worked example
A free game installs fine but secretly records every password typed — that is a trojan delivering spyware. Check: it arrived disguised as something wanted (trojan), and its harm is silent watching (spyware) rather than damage or ransom.

### Traps
- Calling everything a virus. Examiners award the exact type: self-spreading is a worm, disguised is a trojan, watching is spyware, encrypting is ransomware.
- Saying worms need the user to open a file. Self-propagation is the worm's defining trait.
- Claiming spyware announces itself. Its harm depends on staying unnoticed.
- Mixing the ransom with the theft. Ransomware denies access for money; spyware steals information quietly.

### Timing
Paper 1: 2-3 minutes, 2-3 marks. Behaviour-first descriptions earn the mark even when the name is half-remembered.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact'), '0478 5.3b', $st$Explain hacking, phishing and pharming, and list the signs of a phishing message.$st$, $teach$### What is being asked
Name the attack from a scenario or judge whether a message is phishing. The answer picks the attack whose mechanism matches — link versus redirect versus break-in.

### Method
1. Hacking: unauthorised access to a system, usually by exploiting weak passwords or unpatched software.
2. Phishing: bait (urgent message) plus hook (link to a fake login page) to harvest credentials the victim types in.
3. Pharming: tampered DNS sends even correctly-typed addresses to a fake site — no clicked link needed.
4. Phishing signs: urgency and threats, a lookalike sender or URL, requests for passwords or bank details, unexpected attachments.

### Worked example
A text warns your parcel is held and links to a courier login page at a misspelled address. That is phishing: urgency plus a lookalike link harvesting what you type. Check: nothing was broken into (not hacking), and the typed address itself is fine (not pharming) — the link is the weapon.

### Traps
- Calling pharming "phishing with malware". Pharming poisons name resolution; the victim can type everything correctly and still land on the fake site.
- Trusting a familiar display name. Phishing forges senders; check the actual address and URL.
- Saying banks email for passwords. Legitimate banks never ask for credentials by message — any such request is the sign.
- Recommending "better antivirus" against phishing. Antivirus fights malware; phishing fights judgement — verify through the official app or typed address.

### Timing
Paper 1: 2-3 minutes, 2-4 marks. Scenario questions want the attack name plus the matching sign quoted from the scenario.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact'), '0478 5.3c', $st$Recommend protection measures for a scenario, including passwords, 2FA, updates, backups and firewalls.$st$, $teach$### What is being asked
Prescribe defences for a person or small business. The answer fits the threat: access control against intruders, copies against loss, updates against known holes.

### Method
1. Keep intruders out: strong unique passwords, two-factor authentication, a firewall filtering traffic, user accounts with least privilege.
2. Survive failure: regular automatic backups kept offline or off-site (ransomware cannot encrypt what it cannot reach).
3. Close known holes: software and antivirus updates, because patches fix the exact flaws attackers scan for.
4. Match every recommendation to the scenario's facts — a shared PC needs accounts, a shop PC needs backups, everyone needs updates.

### Worked example
A shop keeps customer records on one internet-connected PC with no password. Cheapest fixes: set strong passwords with 2FA (stops casual access) and automatic backups to an offline drive (survives ransomware). Check: both are free or cheap, both target stated facts (no password, one PC), and neither requires new hardware.

### Traps
- Recommending one measure for everything. Antivirus does not replace backups; a firewall does not replace passwords — layers, not favourites.
- Backups on the same always-connected drive. Ransomware encrypts those too; offline or off-site is the point.
- Sharing one strong password. It destroys accountability — one leak compromises everyone, and nobody can be removed.
- Buying hardware as security. A new PC with no password and no backups is the same risk in a shinier box.

### Timing
Paper 1: 3-4 minutes, 4-6 marks. Scenario questions award a mark per matched measure, so give two or three with a reason each.$teach$, 3)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and title = 'Checkpoints — Ethics, Security & Impact';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact'), 'Checkpoints — Ethics, Security & Impact', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Which malware locks files and demands payment for their release?$qt$, $opts$["Ransomware","Virus","Worm","Spyware"]$opts$::jsonb, 0, $ex$Ransomware encrypts files and ransoms the key. A virus needs a host and damages data; a worm self-spreads; spyware watches quietly instead of locking anything.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and code = '0478 5.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$How does a worm differ from a virus?$qt$, $opts$["Viruses spread faster than worms","Worms only attack mobile phones","A worm spreads by itself; a virus needs a host file or user action","There is no difference between them"]$opts$::jsonb, 2, $ex$Self-propagation without a host is the worm's definition; a virus must hitch a ride on a file and usually a click. Speed, target device and equivalence claims are all wrong.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and code = '0478 5.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which message is almost certainly phishing?$qt$, $opts$["An email from a colleague about a meeting","A message demanding urgent action via a lookalike login link","A software update notice on the vendor's own site","A receipt for something you actually bought"]$opts$::jsonb, 1, $ex$Urgency plus a lookalike link is the classic hook. Genuine colleagues, vendor sites and real receipts lack both the pressure and the fake destination.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and code = '0478 5.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$How does pharming differ from phishing?$qt$, $opts$["Phishing uses malware but pharming does not","Pharming needs the victim to click a link","Both attacks need the victim to reply","Pharming redirects a correctly typed address through tampered DNS"]$opts$::jsonb, 3, $ex$Pharming poisons name resolution, so the right address still reaches the wrong site. Phishing needs the victim to follow the bait; neither needs a reply, and malware is optional in both.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and code = '0478 5.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which backup strategy best protects against ransomware?$qt$, $opts$["A single copy on the same disk","Backups on a permanently connected drive","No backups — antivirus is enough","Regular automatic backups stored offline or off-site"]$opts$::jsonb, 3, $ex$Offline or off-site copies survive because ransomware cannot reach them. Same-disk and connected copies get encrypted too; antivirus prevents some attacks but cannot restore files.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and code = '0478 5.3c'), null),
('00000000-0000-0000-0000-000000000000', $qt$Why is two-factor authentication stronger than a password alone?$qt$, $opts$["It makes the password impossible to guess","It adds a second, independent check such as a phone code","It encrypts the password automatically","It works without any password at all"]$opts$::jsonb, 1, $ex$A stolen password alone is useless when a separate factor (phone, token) is also required. 2FA neither strengthens the password itself, nor encrypts it, nor removes it.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and code = '0478 5.3c'), null),
('00000000-0000-0000-0000-000000000000', $qt$A text claims your bank locked your account and links to verify now. What should you do, and why?$qt$, $opts$["Ignore the text and log in through the bank's own app or a typed address","Click the link and log in quickly before the account closes","Reply asking the sender to prove who they are","Forward your password so they can unlock it"]$opts$::jsonb, 0, $ex$Marks as awarded: do not follow the link; verify through the official app or typed address [1]; urgency plus a link is the phishing pattern [1]. Clicking hands credentials over; replying confirms an active victim; no bank unlocks accounts with emailed passwords.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and code = '0478 5.3b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and code = '5.3')),
('00000000-0000-0000-0000-000000000000', $qt$A club keeps member details on one shared PC with a single password everyone knows. Which pair of changes improves security most cheaply?$qt$, $opts$["Buy new computers and a faster connection","Remove the antivirus to speed the PC up","Set individual passwords with 2FA and keep offline backups","Share the password more widely so nobody forgets it"]$opts$::jsonb, 2, $ex$Marks as awarded: individual accounts with 2FA restore access control and accountability [1]; offline backups survive ransomware and disk failure [1]. New hardware keeps the same flaws; removing protection and sharing passwords both worsen the stated risks.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and code = '0478 5.3c'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'ethics-security-impact') and code = '5.3'));
