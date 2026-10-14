import json

P = '.freebuff/drafts/wma12-p2-b004.json'
d = json.load(open(P, encoding='utf-8'))
q = next(x for x in d['questions'] if x['q'] == 'Q088')

# f(-1) = 2(-1)^3 + k(-1)^2 - 8(-1) - 3 = -2 + k + 8 - 3 = k + 3, so k = -3 = option 3.
# The previous patch keyed option 2 (value 3) with an explanation that itself derived k + 3 = 0.
q['correct_option'] = 3
q['explanation'] = (r'By the factor theorem, if \((x + 1)\) is a factor then \(f(-1) = 0\) M1 [1]. '
    r'Substitute \(x = -1\): \(2(-1)^3 + k(-1)^2 - 8(-1) - 3 = 0\) M1 [1]. '
    r'Simplify: \(-2 + k + 8 - 3 = 0\), which reduces to \(k + 3 = 0\). '
    r'Therefore the exact value of k is -3 A1 [1].')

json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False)
print('fixed Q088 -> key', q['correct_option'], 'value', q['options'][3])
