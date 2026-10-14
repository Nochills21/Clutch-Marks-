import json

P = '.freebuff/drafts/wma13-p3-b001.json'
d = json.load(open(P))
qs = {q['q']: q for q in d['questions']}

# Q001: stem numerator 5x+3 has no integer partial fractions (true A=8/3, B=7/3).
# Fix stem to 5x+1 so keyed option 0 (2/(x-1)+3/(x+2)) is exactly right.
q = qs['Q001']
q['question_text'] = r'Express \(\frac{5x + 1}{(x - 1)(x + 2)}\) in partial fractions. [WMA13 P3, 3 marks]'
q['correct_option'] = 0
q['explanation'] = (r'Write the partial fraction expansion as \(\frac{5x + 1}{(x - 1)(x + 2)} '
    r'\equiv \frac{A}{x - 1} + \frac{B}{x + 2}\) M1 [1]. Multiply by the denominator: '
    r'\(5x + 1 = A(x + 2) + B(x - 1)\). Substitute \(x = 1\): \(6 = 3A \Rightarrow A = 2\) M1 [1]. '
    r'Substitute \(x = -2\): \(-9 = B(-3) \Rightarrow B = 3\) M1 [1]. '
    r'The partial fractions are \(\frac{2}{x - 1} + \frac{3}{x + 2}\) A1 [1].')

# Q002: stem 7x-2 gives B=12/5 (no valid option); leaked drafting note proposed 7x+6,
# which duplicates Q003. Use fresh stem 7x+1 -> 4/(x+3)+3/(x-2), key 0, clean explanation.
q = qs['Q002']
q['question_text'] = r'Express \(\frac{7x + 1}{(x + 3)(x - 2)}\) in partial fractions. [WMA13 P3, 3 marks]'
q['options'] = [r'\(\frac{4}{x + 3} + \frac{3}{x - 2}\)',
                r'\(\frac{3}{x + 3} + \frac{4}{x - 2}\)',
                r'\(\frac{5}{x + 3} + \frac{2}{x - 2}\)',
                r'\(\frac{4}{x + 3} - \frac{3}{x - 2}\)']
q['correct_option'] = 0
q['explanation'] = (r'Set up \(\frac{7x + 1}{(x + 3)(x - 2)} \equiv \frac{A}{x + 3} + \frac{B}{x - 2}\) M1 [1]. '
    r'Multiply out denominators: \(7x + 1 = A(x - 2) + B(x + 3)\). '
    r'Substitute \(x = 2\): \(15 = 5B \Rightarrow B = 3\) M1 [1]. '
    r'Substitute \(x = -3\): \(-20 = A(-5) \Rightarrow A = 4\) M1 [1]. '
    r'The partial fractions are \(\frac{4}{x + 3} + \frac{3}{x - 2}\) A1 [1].')

# Q004: stem 2x^2+5x-1 gives A=1.5 (no valid option); keyed option is Q005's answer.
# Fresh stem 2x^2+4x-2 -> 1/(x-1)+1/(x+1)+2/(x+1)^2, key 0, clean explanation.
q = qs['Q004']
q['question_text'] = (r'Express \(\frac{2x^2 + 4x - 2}{(x - 1)(x + 1)^2}\) in partial fractions '
                      r'with a repeated linear factor. [WMA13 P3, 4 marks]')
q['correct_option'] = 0
q['explanation'] = (r'Set up \(\frac{2x^2 + 4x - 2}{(x - 1)(x + 1)^2} \equiv \frac{A}{x - 1} + '
    r'\frac{B}{x + 1} + \frac{C}{(x + 1)^2}\) M1 [1]. Multiply by the denominator: '
    r'\(2x^2 + 4x - 2 = A(x + 1)^2 + B(x - 1)(x + 1) + C(x - 1)\). '
    r'Substitute \(x = 1\): \(2 + 4 - 2 = 4 = 4A \Rightarrow A = 1\) M1 [1]. '
    r'Substitute \(x = -1\): \(2 - 4 - 2 = -4 = C(-2) \Rightarrow C = 2\) M1 [1]. '
    r'Compare \(x^2\) coefficients: \(2 = A + B \Rightarrow B = 1\) M1 [1]. '
    r'The partial fractions are \(\frac{1}{x - 1} + \frac{1}{x + 1} + \frac{2}{(x + 1)^2}\) A1 [1].')

# Q006: stem 5x^2-3x+2 gives C=0 (no valid option); keyed option is Q007's answer.
# Fresh stem 5x^2-2x-1 -> 1/(x-1)+(4x+2)/(x^2+1), key 2, clean explanation.
q = qs['Q006']
q['question_text'] = (r'Express \(\frac{5x^2 - 2x - 1}{(x - 1)(x^2 + 1)}\) in partial fractions '
                      r'with a linear and an irreducible quadratic factor. [WMA13 P3, 4 marks]')
q['correct_option'] = 2
q['explanation'] = (r'Set up \(\frac{5x^2 - 2x - 1}{(x - 1)(x^2 + 1)} \equiv \frac{A}{x - 1} + '
    r'\frac{Bx + C}{x^2 + 1}\) M1 [1]. Multiply by denominators: '
    r'\(5x^2 - 2x - 1 = A(x^2 + 1) + (Bx + C)(x - 1)\). '
    r'Substitute \(x = 1\): \(5 - 2 - 1 = 2 = 2A \Rightarrow A = 1\) M1 [1]. '
    r'Equate \(x^2\) coefficients: \(5 = A + B \Rightarrow B = 4\) M1 [1]. '
    r'Compare constant terms: \(-1 = A - C \Rightarrow C = 2\) M1 [1]. '
    r'The partial fractions are \(\frac{1}{x - 1} + \frac{4x + 2}{x^2 + 1}\) A1 [1].')

# Q024: wrong paper tag in stem.
q = qs['Q024']
q['question_text'] = q['question_text'].replace('[WMA12 P2, 4 marks]', '[WMA13 P3, 4 marks]')

# Q025: true trapezium estimate is ~0.78279 -> 0.783, which was in no option
# (keyed 0.785 is the exact pi/4). Add 0.783 as option 0, key 0, clean explanation.
q = qs['Q025']
q['options'] = ['0.783', '0.785', '0.780', '0.790']
q['correct_option'] = 0
q['explanation'] = (r'Find strip width \(h = \frac{1 - 0}{4} = 0.25\) M1 [1]. '
    r'The ordinates \(x = 0, 0.25, 0.5, 0.75, 1.0\) give '
    r'\(y = 1, 0.94118, 0.8, 0.64, 0.5\) M1 [1]. Apply the trapezoidal rule: '
    r'\(\frac{0.25}{2}(1 + 0.5 + 2(0.94118 + 0.8 + 0.64)) = 0.125(6.26236) \approx 0.78279\) M1 [1]. '
    r'To 3 decimal places the estimate is \(0.783\) A1 [1].')

json.dump(d, open(P, 'w'), ensure_ascii=False)
print('wrote', P)
