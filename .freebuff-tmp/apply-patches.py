import json, os, re, sys

DRAFTS = '.freebuff/drafts'
PATCHES = '.freebuff-tmp'

BAD_MARKERS = re.compile(r"(wait,|wait!|let's|re-evaluate|recalculate)", re.I)

def validate(q, fails, batch):
    t = q['question_text'] + ' ' + ' '.join(q['options']) + ' ' + q['explanation']
    if '`' in t:
        fails.append(f"{batch}/{q['q']}: backtick")
    if '\ufffd' in t:
        fails.append(f"{batch}/{q['q']}: U+FFFD")
    if len(q['options']) != 4:
        fails.append(f"{batch}/{q['q']}: options != 4")
    if not (0 <= q['correct_option'] <= 3):
        fails.append(f"{batch}/{q['q']}: key out of range")
    if not re.search(r'\[1\]', q['explanation']):
        fails.append(f"{batch}/{q['q']}: no [1] mark tag")
    if 'marks]' not in q['question_text']:
        fails.append(f"{batch}/{q['q']}: no marks tag in stem")
    if len(q['options']) == 4 and len(set(o.strip() for o in q['options'])) != 4:
        fails.append(f"{batch}/{q['q']}: duplicate options")
    m = BAD_MARKERS.search(q['explanation'])
    if m:
        fails.append(f"{batch}/{q['q']}: drafting marker '{m.group(0)}'")

summary = []
all_fails = []

for batch in ['002', '003', '004', '005', '006', '007', '008']:
    dp = os.path.join(DRAFTS, f'wma12-p2-b{batch}.json')
    pp = os.path.join(PATCHES, f'patch-b{batch}.json')
    d = json.load(open(dp, encoding='utf-8'))
    patch = json.load(open(pp, encoding='utf-8'))
    qs = {q['q']: q for q in d['questions']}
    unknown = [k for k in patch if k not in qs]
    if unknown:
        all_fails.append(f"b{batch}: patch ids not in draft: {unknown}")
    for qid, fields in patch.items():
        q = qs[qid]
        for k, v in fields.items():
            q[k] = v
    json.dump(d, open(dp, 'w', encoding='utf-8'), ensure_ascii=False)

    # re-read from disk and validate the final state
    d2 = json.load(open(dp, encoding='utf-8'))
    qs2 = d2['questions']
    dist = [0, 0, 0, 0]
    for q in qs2:
        dist[q['correct_option']] += 1
        validate(q, all_fails, f'b{batch}')
    stems = [q['question_text'] for q in qs2]
    if len(set(stems)) != len(stems):
        dups = [s for s in set(stems) if stems.count(s) > 1]
        all_fails.append(f"b{batch}: duplicate stems: {[s[:60] for s in dups]}")
    summary.append(f"wma12-p2-b{batch}.json patched={len(patch)} count={len(qs2)} rot={'/'.join(map(str,dist))}")

print('\n'.join(summary))
if all_fails:
    print('FAILS:')
    print('\n'.join(all_fails))
    sys.exit(1)
print('ALL PATCHES APPLIED + FORMAT CHECKS PASS')
