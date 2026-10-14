import json

P = '.freebuff/drafts/wma12-p2-b001.json'
d = json.load(open(P))
qs = {q['q']: q for q in d['questions']}

# Q002: with constant +15, f(-3) = 9k + 0 so k = 0, which is in no option
# (-2/2/-4/4). Change constant +15 -> -3 so k = 2 (key 1) is exactly right.
q = qs['Q002']
q['question_text'] = (r'Given that \((x + 3)\) is a factor of \(f(x) = x^3 + kx^2 - 4x - 3\), '
                      r'find the exact value of the constant k. [WMA12 P2, 3 marks]')
q['correct_option'] = 1
q['explanation'] = (r'By the factor theorem, if \((x + 3)\) is a factor, then \(f(-3) = 0\) M1 [1]. '
    r'Substitute \(x = -3\): \((-3)^3 + k(-3)^2 - 4(-3) - 3 = 0\) M1 [1]. '
    r'Simplify: \(-27 + 9k + 12 - 3 = 0\), which gives \(9k - 18 = 0\). '
    r'Therefore the exact value of k is 2 A1 [1].')

# Q010: true x = (log3(24)-1)/2 ~ 0.94639 -> 0.946, but options offer 0.943.
# Fix option 1 to 0.946 and repair the explanation's wrong rounding.
q = qs['Q010']
q['options'] = ['0.443', '0.946', '1.44', '0.892']
q['correct_option'] = 1
q['explanation'] = (r'Take logarithms of both sides: \(\log(3^{2x+1}) = \log 24\) M1 [1]. '
    r'Bring the exponent to the front: \((2x + 1)\log 3 = \log 24\). '
    r'Divide by \(\log 3\): \(2x + 1 = \frac{\log 24}{\log 3} \approx 2.89278\) M1 [1]. '
    r'Subtract 1 to get \(2x \approx 1.89278\), then divide by 2 to find \(x \approx 0.94639\). '
    r'Rounded to 3 significant figures, this is 0.946 A1 [1].')

# Q022: S10 = 5[8 + 27] = 175 = option 0, but keyed 1. Flip key, clean explanation.
q = qs['Q022']
q['correct_option'] = 0
q['explanation'] = (r'Use the sum formula for an arithmetic progression: '
    r'\(S_n = \frac{n}{2}[2a + (n-1)d]\) M1 [1]. '
    r'Substitute \(n = 10, a = 4, d = 3\): '
    r'\(S_{10} = \frac{10}{2}[2(4) + (10 - 1)(3)] = 5[8 + 27] = 5(35) = 175\) M1 [1]. '
    r'The exact sum is 175 A1 [1].')

json.dump(d, open(P, 'w'), ensure_ascii=False)
print('wrote', P)
