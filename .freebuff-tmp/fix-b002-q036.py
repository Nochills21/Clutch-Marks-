import json

P = '.freebuff/drafts/wma12-p2-b002.json'
d = json.load(open(P, encoding='utf-8'))
q = next(x for x in d['questions'] if x['q'] == 'Q036')

# True value: [1/2 e^{2x} + 3x]_0^1 = (1/2 e^2 + 3) - 1/2 = 1/2 e^2 + 2.5 = option 0.
# Key said 1 and the explanation leaked a drafting note that had already worked this out.
q['correct_option'] = 0
q['explanation'] = (r'Integrate the exponential term and the constant term: \(\int e^{2x} dx = \frac{1}{2}e^{2x}\) '
    r'and \(\int 3 dx = 3x\) M1 [1]. The antiderivative is \([\frac{1}{2}e^{2x} + 3x]_0^1\) M1 [1]. '
    r'At the upper limit: \(\frac{1}{2}e^2 + 3\). At the lower limit: \(\frac{1}{2}e^0 + 0 = \frac{1}{2}\). '
    r'Subtracting gives \(\frac{1}{2}e^2 + 3 - \frac{1}{2} = \frac{1}{2}e^2 + 2.5\) A1 [1].')

json.dump(d, open(P, 'w', encoding='utf-8'), ensure_ascii=False)
print('fixed Q036')
