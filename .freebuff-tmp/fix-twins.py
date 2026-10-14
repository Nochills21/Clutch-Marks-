import json

DRAFTS = '.freebuff/drafts'
_cache = {}

def load(f):
    if f not in _cache:
        _cache[f] = json.load(open(f'{DRAFTS}/{f}', encoding='utf-8'))
    return _cache[f]

def save(f):
    json.dump(_cache[f], open(f'{DRAFTS}/{f}', 'w', encoding='utf-8'), ensure_ascii=False)
    print('wrote', f, f"({len(_cache[f]['questions'])} questions)")

def q(f, qid):
    return next(x for x in load(f)['questions'] if x['q'] == qid)

def edit(f, qid, stem, options, key, expl, expect_key_text=None):
    x = q(f, qid)
    if expect_key_text is not None:
        got = x['options'][x['correct_option']]
        assert got == expect_key_text, f'{f}/{qid}: expected keyed {expect_key_text!r}, found {got!r}'
    x['question_text'] = stem
    x['options'] = options
    x['correct_option'] = key
    x['explanation'] = expl
    assert len(options) == 4 and len(set(o.strip() for o in options)) == 4, f'{f}/{qid}: options not distinct'

# ── WMA11 P1 ─────────────────────────────────────────────────────────────────

# twin of b002/Q026 (gradient -2)
edit('wma11-p1-b004.json', 'Q081',
     r'Find the gradient of the line passing through (1, 2) and (5, 4). [WMA11 P1, 2 marks]',
     ['2', '-2', r'\(\frac{1}{2}\)', r'\(-\frac{1}{2}\)'], 2,
     r'Use the gradient formula \(m = \frac{y_2 - y_1}{x_2 - x_1}\) M1 [1]. Substitute the coordinates: '
     r'\(m = \frac{4 - 2}{5 - 1} = \frac{2}{4}\) M1 [1]. This simplifies to exactly \(\frac{1}{2}\) A1 [1].',
     expect_key_text='-2')

# twin of b004/Q096 (distance 5)
edit('wma11-p1-b006.json', 'Q135',
     r'The distance between the points (1, a) and (4, a + 5) is d. Calculate the exact value of d. [WMA11 P1, 2 marks]',
     ['25', '7', r'\(\sqrt{34}\)', r'\(\sqrt{7}\)'], 2,
     r'The horizontal difference is \(4 - 1 = 3\) and the vertical difference is \((a + 5) - a = 5\) M1 [1]. '
     r'Apply the distance formula: \(d = \sqrt{3^2 + 5^2} = \sqrt{9 + 25}\) M1 [1]. This gives exactly '
     r'\(d = \sqrt{34}\) A1 [1].',
     expect_key_text='5')

# twin of b005/Q113 and b016/Q413 (both 30 degrees)
edit('wma11-p1-b007.json', 'Q158',
     r'The area of triangle ABC is 24 cm\(^2\). Given a = 6 cm and b = 8 cm, find the size of angle C. [WMA11 P1, 3 marks]',
     [r'\(90^\circ\)', r'\(60^\circ\)', r'\(45^\circ\)', r'\(30^\circ\)'], 0,
     r'Use the area formula \(\frac{1}{2}ab\sin C = 24\) M1 [1]. Substitute the sides: '
     r'\(\frac{1}{2}(6)(8)\sin C = 24\sin C = 24\), so \(\sin C = 1\) M1 [1]. The angle whose sine is 1 is '
     r'exactly \(90^\circ\) A1 [1].',
     expect_key_text=r'\(30^\circ\)')

# twin of b010/Q249 (both -2 < x < 2)
edit('wma11-p1-b011.json', 'Q271',
     r'Find the range of values for x for which the function \(y = x^3 - 27x\) is decreasing. [WMA11 P1, 4 marks]',
     [r'\(x < -3 \text{ or } x > 3\)', r'\(x < -27 \text{ or } x > 27\)',
      r'\(-3 < x < 3\)', r'\(-27 < x < 27\)'], 2,
     r'A function is decreasing where its first derivative is negative. Differentiate to get '
     r'\(\frac{dy}{dx} = 3x^2 - 27\) M1 [1]. Set up the inequality \(3x^2 - 27 < 0\) and divide by 3: '
     r'\(x^2 - 9 < 0\) M1 [1]. This factorises as \((x - 3)(x + 3) < 0\) with critical values -3 and 3 M1 [1]. '
     r'The positive quadratic falls below the x-axis between its roots, giving exactly \(-3 < x < 3\) A1 [1].',
     expect_key_text=r'\(-2 < x < 2\)')

# twin of b009/Q208 (both -1 +/- sqrt3)
edit('wma11-p1-b012.json', 'Q281',
     r'Solve the simultaneous equations \(y = x + 1\) and \(y = 2x^2 + 5x - 1\). Find the exact values of x. [WMA11 P1, 4 marks]',
     [r'\(-1 \pm \sqrt{2}\)', r'\(1 \pm \sqrt{2}\)', r'\(-1 \pm \sqrt{3}\)', r'\(-1 \pm 2\sqrt{2}\)'], 0,
     r'Substitute the linear equation into the quadratic: \(2x^2 + 5x - 1 = x + 1\) M1 [1]. Rearrange to '
     r'\(2x^2 + 4x - 2 = 0\) and divide by 2: \(x^2 + 2x - 1 = 0\) M1 [1]. Apply the quadratic formula: '
     r'\(x = \frac{-2 \pm \sqrt{4 + 4}}{2} = \frac{-2 \pm \sqrt{8}}{2}\) M1 [1]. This simplifies to '
     r'\(x = -1 \pm \sqrt{2}\) A1 [1].',
     expect_key_text=r'\(-1 \pm \sqrt{3}\)')

# twin of b002/Q037 (both 5 sqrt2)
edit('wma11-p1-b014.json', 'Q341',
     r'In triangle ABC, side a = 6 cm, angle A = \(45^\circ\), and angle B = \(60^\circ\). Find the exact length of side b. [WMA11 P1, 3 marks]',
     [r'\(3\sqrt{2}\)', r'\(6\sqrt{2}\)', r'\(6\sqrt{6}\)', r'\(3\sqrt{6}\)'], 3,
     r'Apply the sine rule \(\frac{a}{\sin A} = \frac{b}{\sin B}\) M1 [1]. Rearrange for b: '
     r'\(b = \frac{a\sin B}{\sin A} = \frac{6\sin 60^\circ}{\sin 45^\circ}\) M1 [1]. Substitute the exact '
     r'values: \(b = \frac{6(\frac{\sqrt{3}}{2})}{\frac{\sqrt{2}}{2}} = \frac{6\sqrt{3}}{\sqrt{2}} = 3\sqrt{6}\) '
     r'A1 [1].',
     expect_key_text=r'\(5\sqrt{2}\)')

# twin of b002/Q031 (same segment)
edit('wma11-p1-b015.json', 'Q361',
     r'Find the coordinates of the midpoint of the line segment joining (1, 6) and (5, -2). [WMA11 P1, 2 marks]',
     ['(1, 2)', '(2, 4)', '(1, 3)', '(3, 2)'], 3,
     r'Apply the midpoint formula: \((\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2})\) M1 [1]. Substitute the '
     r'coordinates: \((\frac{1 + 5}{2}, \frac{6 + (-2)}{2})\). This simplifies to \((\frac{6}{2}, \frac{4}{2})\), '
     r'yielding exactly (3, 2) A1 [1].',
     expect_key_text='(1, 2)')

# twin of b007/Q175 (both 2 sqrt7)
edit('wma11-p1-b015.json', 'Q365',
     r'In triangle ABC, side a = 3 cm, side b = 8 cm, and angle C = \(60^\circ\). Find the exact length of side c. [WMA11 P1, 3 marks]',
     ['7', r'\(\sqrt{73}\)', r'\(\sqrt{97}\)', r'\(\sqrt{55}\)'], 0,
     r'Apply the cosine rule: \(c^2 = a^2 + b^2 - 2ab\cos C\) M1 [1]. Substitute the values: '
     r'\(c^2 = 3^2 + 8^2 - 2(3)(8)\cos 60^\circ\). Calculate: \(c^2 = 9 + 64 - 48(0.5)\) M1 [1]. This '
     r'simplifies to \(73 - 24 = 49\), so \(c = 7\) A1 [1].',
     expect_key_text=r'\(2\sqrt{7}\)')

# twin of b005/Q113 (both 30 degrees)
edit('wma11-p1-b016.json', 'Q413',
     r'The area of triangle ABC is \(6\sqrt{3}\) cm\(^2\). Side a = 4 cm and side b = 6 cm. Find the size of the acute angle C. [WMA11 P1, 3 marks]',
     [r'\(60^\circ\)', r'\(30^\circ\)', r'\(45^\circ\)', r'\(75^\circ\)'], 0,
     r'Use the area formula \(\frac{1}{2}ab\sin C = 6\sqrt{3}\) M1 [1]. Substitute the sides: '
     r'\(\frac{1}{2}(4)(6)\sin C = 12\sin C = 6\sqrt{3}\), so \(\sin C = \frac{\sqrt{3}}{2}\) M1 [1]. The '
     r'acute angle with this sine is exactly \(60^\circ\) A1 [1].',
     expect_key_text=r'\(30^\circ\)')

# twin of b005/Q117 (same curve, same point)
edit('wma11-p1-b016.json', 'Q415',
     r'Find the coordinates of the minimum point on the curve \(y = x^2 - 4x + 7\). [WMA11 P1, 3 marks]',
     ['(2, 11)', '(2, -3)', '(2, 3)', '(-2, 3)'], 2,
     r'Differentiate to find the stationary point: \(\frac{dy}{dx} = 2x - 4\) M1 [1]. Set the derivative to '
     r'zero: \(2x - 4 = 0\), so \(x = 2\) M1 [1]. Substitute back: \(y = 2^2 - 4(2) + 7 = 4 - 8 + 7 = 3\). The '
     r'minimum point is exactly (2, 3) A1 [1].',
     expect_key_text='(3, 1)')

# twin of b007/Q163 (both 2)
edit('wma11-p1-b016.json', 'Q422',
     r'Solve the simultaneous equations \(y = 2x\) and \(x^2 + y^2 = 45\). Find the positive value of x. [WMA11 P1, 4 marks]',
     ['3', '4', '5', r'\(\sqrt{45}\)'], 0,
     r'Substitute \(y = 2x\) into the second equation: \(x^2 + (2x)^2 = 45\) M1 [1]. This gives '
     r'\(x^2 + 4x^2 = 5x^2 = 45\) M1 [1]. Dividing by 5 gives \(x^2 = 9\), so \(x = \pm 3\) and the positive '
     r'value is exactly 3 A1 [1].',
     expect_key_text='2')

# twin of b012/Q282 (both x <= 2)
edit('wma11-p1-b017.json', 'Q441',
     r'Solve the linear inequality \(5(x - 1) \geq 2x + 4\). [WMA11 P1, 3 marks]',
     [r'\(x \geq 3\)', r'\(x \leq 3\)', r'\(x \geq -3\)', r'\(x \leq -3\)'], 0,
     r'Expand the bracket: \(5x - 5 \geq 2x + 4\) M1 [1]. Collect the x terms on one side and the numbers on '
     r'the other: \(3x \geq 9\) M1 [1]. Dividing by 3 gives exactly \(x \geq 3\) A1 [1].',
     expect_key_text=r'\(x \leq 2\)')

# twin of b012/Q280 (same equation, both k = 8)
edit('wma11-p1-b018.json', 'Q455',
     r'The quadratic equation \(3x^2 + kx + 12 = 0\) has equal roots. Given that \(k > 0\), find the exact value of k. [WMA11 P1, 3 marks]',
     ['16', '4', '12', '32'], 2,
     r'For equal roots the discriminant must be zero: \(k^2 - 4(3)(12) = 0\) M1 [1]. This gives '
     r'\(k^2 - 144 = 0\), so \(k^2 = 144\) M1 [1]. Taking the positive square root gives exactly \(k = 12\) '
     r'A1 [1].',
     expect_key_text='8')

# twin of b006/Q130 and b019/Q479 (all 3)
edit('wma11-p1-b018.json', 'Q458',
     r'Find the positive x-coordinate of the point of intersection of the line \(y = 2x + 1\) and the curve \(y = x^2 + 1\). [WMA11 P1, 4 marks]',
     ['1', '2', '3', '4'], 1,
     r'Set the two expressions for y equal: \(2x + 1 = x^2 + 1\) M1 [1]. Rearrange to \(x^2 - 2x = 0\) M1 [1]. '
     r'Factorise: \(x(x - 2) = 0\), so \(x = 0\) or \(x = 2\). The positive x-coordinate is exactly 2 A1 [1].',
     expect_key_text='3')

# twin of b004/Q087 (same sector)
edit('wma11-p1-b018.json', 'Q467',
     r'Find the area of a sector of a circle with radius 8 cm and central angle \(\frac{\pi}{4}\) radians. State the exact value. [WMA11 P1, 2 marks]',
     [r'\(2\pi\)', r'\(8\pi\)', r'\(12\pi\)', r'\(3\pi\)'], 1,
     r'Use the sector area formula \(A = \frac{1}{2}r^2\theta\) M1 [1]. Substitute \(r = 8\) and '
     r'\(\theta = \frac{\pi}{4}\): \(A = \frac{1}{2}(64)(\frac{\pi}{4}) = 8\pi\) A1 [1].',
     expect_key_text=r'\(6\pi\)')

# twin of b006/Q130 and b018/Q458 (all 3)
edit('wma11-p1-b019.json', 'Q479',
     r'Solve the simultaneous equations \(y = 3x\) and \(y = x^2 - 4\). Find the positive value of x. [WMA11 P1, 4 marks]',
     ['1', '2', '3', '4'], 3,
     r'Substitute \(y = 3x\) into the curve: \(3x = x^2 - 4\) M1 [1]. Rearrange to \(x^2 - 3x - 4 = 0\) M1 [1]. '
     r'Factorise: \((x - 4)(x + 1) = 0\), so \(x = 4\) or \(x = -1\). The positive value is exactly 4 A1 [1].',
     expect_key_text='3')

# twin of b003/Q063 (both angle 0.8)
edit('wma11-p1-b019.json', 'Q487',
     r'A sector of a circle has an area of 15 cm\(^2\) and a radius of 5 cm. Find the angle of the sector in radians. [WMA11 P1, 2 marks]',
     ['1.2', '0.4', '1.25', '1.6'], 0,
     r'Use the sector area formula \(A = \frac{1}{2}r^2\theta\) M1 [1]. Substitute \(A = 15\) and \(r = 5\): '
     r'\(15 = \frac{1}{2}(25)\theta\), so \(\theta = \frac{30}{25} = 1.2\) A1 [1].',
     expect_key_text='0.8')

save('wma11-p1-b004.json'); save('wma11-p1-b006.json'); save('wma11-p1-b007.json')
save('wma11-p1-b011.json'); save('wma11-p1-b012.json'); save('wma11-p1-b014.json')
save('wma11-p1-b015.json'); save('wma11-p1-b016.json'); save('wma11-p1-b017.json')
save('wma11-p1-b018.json'); save('wma11-p1-b019.json')

# ── WMA12 P2 ─────────────────────────────────────────────────────────────────

# twin of b004/Q091 (both 10)
edit('wma12-p2-b005.json', 'Q138',
     r'Find the exact value of \(\int_0^2 (3x^2 + 2x + 1) dx\). [WMA12 P2, 3 marks]',
     ['10', '12', '8', '14'], 3,
     r'Integrate term by term with the power rule: \(\int (3x^2 + 2x + 1) dx = x^3 + x^2 + x\) M1 [1]. Apply '
     r'the limits: \(\left[x^3 + x^2 + x\right]_0^2\) M1 [1]. At the upper limit: \(8 + 4 + 2 = 14\); at the '
     r'lower limit 0 the expression is 0. The exact value is 14 A1 [1].',
     expect_key_text='10')

# twin of b003/Q068 (both 3)
edit('wma12-p2-b005.json', 'Q144',
     r'The third term of a geometric progression is 16 and the sixth term is 128. Find the common ratio r. [WMA12 P2, 3 marks]',
     ['3', '2', '4', '1.5'], 1,
     r'Write the given terms with the standard form \(ar^{n-1}\): \(ar^2 = 16\) and \(ar^5 = 128\) M1 [1]. '
     r'Dividing the second equation by the first cancels a: \(r^3 = \frac{128}{16} = 8\) M1 [1]. Taking the '
     r'cube root gives exactly \(r = 2\) A1 [1].',
     expect_key_text='3')

# triple with b004/Q085 and b008/Q192 (all 0.75)
edit('wma12-p2-b005.json', 'Q145',
     r'A geometric progression has first term 20 and sum to infinity 50. Find the common ratio r. [WMA12 P2, 2 marks]',
     ['0.75', '0.5', '0.25', '0.6'], 3,
     r'Use the sum to infinity formula \(S_\infty = \frac{a}{1 - r}\) M1 [1]. Substitute \(a = 20\) and '
     r'\(S_\infty = 50\): \(50 = \frac{20}{1 - r}\), so \(1 - r = 0.4\) and \(r = 0.6\) A1 [1].',
     expect_key_text='0.75')

# twin of b006/Q105 (both 160)
edit('wma12-p2-b007.json', 'Q171',
     r'Find the coefficient of \(x^2\) in the binomial expansion of \((2 + x)^6\). State the exact integer value. [WMA12 P2, 3 marks]',
     ['160', '80', '240', '320'], 2,
     r'Use the general term formula \(\binom{n}{r} a^{n-r} b^r\) M1 [1]. For \(x^2\) take \(n = 6\), '
     r'\(r = 2\), \(a = 2\) and \(b = 1\): \(\binom{6}{2}(2)^{4}(x)^2\) M1 [1]. Calculate '
     r'\(\binom{6}{2} = 15\) and \(2^4 = 16\); multiplying gives \(15 \times 16 = 240\), so the exact '
     r'coefficient is 240 A1 [1].',
     expect_key_text='160')

# twin of b001/Q015 (same curve, both 32/3)
edit('wma12-p2-b008.json', 'Q184',
     r'Find the area of the finite region bounded by the curve \(y = x^2 - 4x\), the x-axis and the line \(x = 2\). State the exact value. [WMA12 P2, 4 marks]',
     [r'\(\frac{32}{3}\)', r'\(\frac{16}{3}\)', r'\(8\)', r'\(\frac{64}{3}\)'], 1,
     r'Find where the curve meets the x-axis: \(x(x - 4) = 0\), so the roots are 0 and 4 and the curve lies '
     r'below the axis on this interval M1 [1]. The region asked for stops at \(x = 2\), so set up '
     r'\(\int_0^2 (4x - x^2) dx\) M1 [1]. Integrate: \(\left[2x^2 - \frac{x^3}{3}\right]_0^2 = 8 - \frac{8}{3}\) '
     r'M1 [1]. This gives \(\frac{24 - 8}{3} = \frac{16}{3}\) A1 [1].',
     expect_key_text=r'\(\frac{32}{3}\)')

# triple with b004/Q085 and b005/Q145 (all 0.75)
edit('wma12-p2-b008.json', 'Q192',
     r'A geometric progression has first term 9 and sum to infinity 12. Find the common ratio r. [WMA12 P2, 2 marks]',
     ['0.75', '0.5', '0.25', '0.6'], 2,
     r'Use the sum to infinity formula \(S_\infty = \frac{a}{1 - r}\) M1 [1]. Substitute \(a = 9\) and '
     r'\(S_\infty = 12\): \(12 = \frac{9}{1 - r}\), so \(1 - r = 0.75\) and \(r = 0.25\) A1 [1].',
     expect_key_text='0.75')

# twin of b006/Q101 (both remainder 0)
edit('wma12-p2-b008.json', 'Q195',
     r'Find the remainder when \(f(x) = x^3 - 5x^2 + 2x + 8\) is divided by \((x - 3)\). [WMA12 P2, 2 marks]',
     ['0', '4', '-4', '2'], 2,
     r'Use the remainder theorem: the remainder when \(f(x)\) is divided by \((x - a)\) is \(f(a)\) M1 [1]. '
     r'Substitute \(x = 3\): \(f(3) = 3^3 - 5(3^2) + 2(3) + 8\) M1 [1]. Simplify: \(27 - 45 + 6 + 8 = -4\) '
     r'A1 [1]. The exact remainder is -4.',
     expect_key_text='0')

save('wma12-p2-b005.json'); save('wma12-p2-b007.json'); save('wma12-p2-b008.json')
print('total edits applied:', 24)
