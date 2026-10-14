import json

P = '.freebuff/drafts/wma11-p1-b006.json'
d = json.load(open(P, encoding='utf-8'))
qs = {q['q']: q for q in d['questions']}

# Q144: options 2 and 3 were both "x = 1, x = 2" (key is 3).
# Replace the distractor at index 2 with a sign-error slip (u = 1, 8 -> x = 1, 2).
q = qs['Q144']
assert q['correct_option'] == 3
q['options'][2] = r'\(x = -1, x = -2\)'

# Q150: options 1 (key) and 3 were both "(2x - 1)/(x - 3)".
# Replace the distractor at index 3 with a sign slip in both brackets.
q = qs['Q150']
assert q['correct_option'] == 1
q['options'][3] = r'\(\frac{2x + 1}{x + 3}\)'

for qid in ('Q144', 'Q150'):
    q = qs[qid]
    norm = [o.strip().lower() for o in q['options']]
    assert len(set(norm)) == 4, (qid, q['options'])

json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False)
print('wrote', P)
for qid in ('Q144', 'Q150'):
    q = qs[qid]
    print(qid, 'key', q['correct_option'], '->', q['options'][q['correct_option']])
    for i, o in enumerate(q['options']):
        print('   ', i, o)
