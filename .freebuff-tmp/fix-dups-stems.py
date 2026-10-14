import json

DRAFTS = '.freebuff/drafts'


def load(f):
    return json.load(open(f'{DRAFTS}/{f}', encoding='utf-8'))


def save(f, d):
    json.dump(d, open(f'{DRAFTS}/{f}', 'w', encoding='utf-8'), ensure_ascii=False)
    print('wrote', f)


def q(d, qid):
    return next(x for x in d['questions'] if x['q'] == qid)


# ── wma11-p1-b014 Q336: midpoint (-2,5)-(4,-1) duplicated from b002/Q031 ──
f = 'wma11-p1-b014.json'
d = load(f)
x = q(d, 'Q336')
x['question_text'] = r'Find the coordinates of the midpoint of the line segment joining (-3, 4) and (5, -2). [WMA11 P1, 2 marks]'
x['options'] = ['(2, 2)', '(1, -1)', '(1, 1)', '(-1, 1)']
x['correct_option'] = 2
x['explanation'] = (r'Apply the midpoint formula: \((\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2})\) M1 [1]. '
                    r'Substitute the coordinates: \((\frac{-3 + 5}{2}, \frac{4 + (-2)}{2})\). '
                    r'This simplifies to \((\frac{2}{2}, \frac{2}{2})\), yielding exactly (1, 1) A1 [1].')
save(f, d)

# ── wma11-p1-b015 Q369: range where x^3-3x^2 decreases, duplicate of b006/Q142 ──
f = 'wma11-p1-b015.json'
d = load(f)
x = q(d, 'Q369')
x['question_text'] = r'Find the range of values for x for which the function \(y = x^3 - 6x^2 + 9x\) is decreasing. [WMA11 P1, 4 marks]'
x['options'] = [r'\(1 < x < 3\)', r'\(x < 1 \text{ or } x > 3\)', r'\(-3 < x < -1\)', r'\(x < -3 \text{ or } x > -1\)']
x['correct_option'] = 0
x['explanation'] = (r'A function is decreasing where its first derivative is negative. Differentiate to get '
                    r'\(\frac{dy}{dx} = 3x^2 - 12x + 9\) M1 [1]. Set up the inequality \(3x^2 - 12x + 9 < 0\) and '
                    r'divide by 3: \(x^2 - 4x + 3 < 0\). Factorise: \((x - 1)(x - 3) < 0\) M1 [1]. The critical '
                    r'values are 1 and 3 M1 [1]. The positive quadratic falls below the x-axis between its roots, '
                    r'giving exactly \(1 < x < 3\) A1 [1].')
save(f, d)

# ── wma11-p1-b017 Q447: cosine rule 3,5,60 duplicate of b002/Q038 ──
f = 'wma11-p1-b017.json'
d = load(f)
x = q(d, 'Q447')
x['question_text'] = r'In triangle ABC, side a = 4 cm, side b = 7 cm, and angle C = \(60^\circ\). Find the exact length of side c. [WMA11 P1, 3 marks]'
x['options'] = ['37', r'\(\sqrt{37}\)', r'\(\sqrt{65}\)', r'\(\sqrt{93}\)']
x['correct_option'] = 1
x['explanation'] = (r'Apply the cosine rule: \(c^2 = a^2 + b^2 - 2ab\cos C\) M1 [1]. Substitute the values: '
                    r'\(c^2 = 4^2 + 7^2 - 2(4)(7)\cos 60^\circ\). Calculate: \(c^2 = 16 + 49 - 56(0.5)\) M1 [1]. '
                    r'This simplifies to \(65 - 28 = 37\). Take the square root: \(c = \sqrt{37}\), which is the '
                    r'exact length A1 [1].')
save(f, d)

# ── wma11-p1-b018 Q465: 150 deg -> radians, duplicate of b002/Q034 ──
f = 'wma11-p1-b018.json'
d = load(f)
x = q(d, 'Q465')
x['question_text'] = r'Convert \(210^\circ\) into radians. State the exact value in terms of \(\pi\). [WMA11 P1, 2 marks]'
x['options'] = [r'\(\frac{5\pi}{6}\)', r'\(\frac{7\pi}{6}\)', r'\(\frac{11\pi}{6}\)', r'\(\frac{7\pi}{4}\)']
x['correct_option'] = 1
x['explanation'] = (r'To convert degrees to radians, multiply the angle by \(\frac{\pi}{180}\) M1 [1]. '
                    r'Calculating \(210 \times \frac{\pi}{180}\) allows you to divide the numerator and denominator '
                    r'by 30 to get exactly \(\frac{7\pi}{6}\) A1 [1].')
save(f, d)

# ── wma11-p1-b018 Q469: cosine rule 5,6,60 duplicate of b011/Q266 ──
x = q(d, 'Q469')
x['question_text'] = r'In triangle ABC, side a = 2 cm, side b = 9 cm, and angle C = \(60^\circ\). Find the exact length of side c. [WMA11 P1, 3 marks]'
x['options'] = ['67', r'\(\sqrt{67}\)', r'\(\sqrt{85}\)', r'\(\sqrt{103}\)']
x['correct_option'] = 1
x['explanation'] = (r'Use the cosine rule: \(c^2 = a^2 + b^2 - 2ab\cos C\) M1 [1]. Substitute the values: '
                    r'\(c^2 = 2^2 + 9^2 - 2(2)(9)\cos 60^\circ\). Calculate: \(c^2 = 4 + 81 - 36(0.5)\) M1 [1]. '
                    r'This simplifies to \(85 - 18 = 67\). Take the square root to find exactly \(\sqrt{67}\) A1 [1].')
save(f, d)

# ── wma11-p1-b018 Q475: integrate 2x+3 through (1,4), duplicate of b005/Q120 ──
x = q(d, 'Q475')
x['question_text'] = r'A curve has gradient function \(\frac{dy}{dx} = 4x - 1\) and passes through the point (2, 5). Find the equation of the curve. [WMA11 P1, 3 marks]'
x['options'] = [r'\(y = 2x^2 - x - 1\)', r'\(y = 2x^2 - x + 1\)', r'\(y = 2x^2 - x - 5\)', r'\(y = 2x^2 - x\)']
x['correct_option'] = 0
x['explanation'] = (r'Integrate the gradient function to get the general curve equation: '
                    r'\(y = \frac{4x^2}{2} - x + c = 2x^2 - x + c\) M1 [1]. Substitute the coordinate (2, 5) to '
                    r'solve for c: \(5 = 2(2)^2 - 2 + c\) M1 [1]. This simplifies to \(5 = 6 + c\), which gives '
                    r'\(c = -1\). The equation of the curve is exactly \(y = 2x^2 - x - 1\) A1 [1].')
save(f, d)

# ── wma11-p1-b019 Q485: intersection x+y=5 & 2x-y=4, duplicate of b002/Q032 ──
f = 'wma11-p1-b019.json'
d = load(f)
x = q(d, 'Q485')
x['question_text'] = r'Find the point of intersection of the lines \(2x + y = 11\) and \(x - y = 1\). [WMA11 P1, 3 marks]'
x['options'] = ['(3, 4)', '(4, 5)', '(4, 3)', '(3, 5)']
x['correct_option'] = 2
x['explanation'] = (r'Add the two equations to eliminate y: \((2x + y) + (x - y) = 11 + 1\) M1 [1]. This '
                    r'simplifies to \(3x = 12\), giving \(x = 4\) M1 [1]. Substitute \(x = 4\) into the second '
                    r'equation: \(4 - y = 1\), which means \(y = 3\). The intersection is exactly (4, 3) A1 [1].')
save(f, d)

# ── wma12-p2-b007 Q153: coeff of x^2 in (2+3x)^4, exact dup of b004/Q089 ──
f = 'wma12-p2-b007.json'
d = load(f)
x = q(d, 'Q153')
x['question_text'] = r'Find the coefficient of \(x^3\) in the binomial expansion of \((2 - x)^5\). State the exact integer value. [WMA12 P2, 2 marks]'
x['options'] = ['-40', '40', '-80', '-10']
x['correct_option'] = 0
x['explanation'] = (r'Use the general term formula for \((a + bx)^n\), which is \(\binom{n}{r} a^{n-r} (bx)^r\) M1 [1]. '
                    r'For \(x^3\), \(n = 5, r = 3, a = 2, b = -1\). The term is '
                    r'\(\binom{5}{3}(2)^{5-3}(-x)^3 = 10(4)(-x^3)\) M1 [1]. Calculate the product: '
                    r'\(10 \times 4 \times (-1) = -40\). The exact coefficient is -40 A1 [1].')
save(f, d)

# ── wma11-p1-b009 Q202: "claim the answer is 4" reads as a drafting tell ──
f = 'wma11-p1-b009.json'
d = load(f)
x = q(d, 'Q202')
x['explanation'] = (r'Write out the brackets twice: \((\sqrt{7} - \sqrt{3})(\sqrt{7} - \sqrt{3})\). Expand using '
                    r'FOIL to get \(7 - \sqrt{21} - \sqrt{21} + 3\) M1 [1]. Combine the integer terms (7 + 3 = 10) '
                    r'and the surd terms to yield exactly \(10 - 2\sqrt{21}\) A1 [1]. Be careful not to square each '
                    r'term separately and claim the value is 4.')
save(f, d)
