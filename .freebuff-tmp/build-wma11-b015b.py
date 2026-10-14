"""Build the missing WMA11 P1 batch: Q376-Q400 ("Mixed Topics 13").

Fills the three uncovered P1 statement slots in this bank. Numbering follows the
bank's own scheme (1.1 indices, 1.2 surds, 1.3 algebraic fractions; 4.1 graph
features/asymptotes, 4.4 transformations), so the three empty codes are assigned
the chapter content that is still missing and matches the IAL P1 specification:
  1.4  expanding brackets / factorising polynomials of degree >= 3   (spec 1.10)
  4.2  intersection points of graphs, geometrical interpretation      (spec 1.11)
  4.3  graphs of trigonometric functions, periodicity and symmetry    (spec 1.11/3.3)
Every question is exam-tier, 0-based key, mark-scheme tagged M1 [1] / A1 [1].
"""
import json

Q = []
def add(qid, code, stem, options, key, expl):
    assert len(options) == 4, qid
    assert len(set(o.strip() for o in options)) == 4, qid
    assert 0 <= key <= 3, qid
    Q.append({
        "q": qid, "statement_code": code, "difficulty": "exam",
        "question_text": stem, "options": options,
        "correct_option": key, "explanation": expl,
    })

# ── WMA11 1.4 : expanding brackets and factorising polynomials ────────────────

add("Q376", "WMA11 1.4",
    r'Expand and simplify \((x + 2)(x - 3)(x + 1)\). [WMA11 P1, 3 marks]',
    [r'\(x^3 - 7x - 6\)', r'\(x^3 - 7x + 6\)', r'\(x^3 + 7x - 6\)', r'\(x^3 - x^2 - 7x - 6\)'], 0,
    r'Multiply the first two brackets: \((x + 2)(x - 3) = x^2 - x - 6\) M1 [1]. Multiply this by '
    r'\((x + 1)\): \(x^3 + x^2 - x^2 - x - 6x - 6\) M1 [1]. Collecting like terms gives exactly '
    r'\(x^3 - 7x - 6\) A1 [1].')

add("Q377", "WMA11 1.4",
    r'Factorise completely \(x^3 - 4x^2 + 3x\). [WMA11 P1, 2 marks]',
    [r'\(x(x - 1)(x - 3)\)', r'\(x(x + 1)(x + 3)\)', r'\(x(x - 1)(x + 3)\)', r'\(x(x - 3)^2\)'], 0,
    r'Take out the common factor x: \(x(x^2 - 4x + 3)\) M1 [1]. Factorise the quadratic: '
    r'\(x^2 - 4x + 3 = (x - 1)(x - 3)\). The complete factorisation is \(x(x - 1)(x - 3)\) A1 [1].')

add("Q378", "WMA11 1.4",
    r'Given that \(f(x) = x^3 + 2x^2 - 5x - 6\) and \(f(2) = 0\), factorise \(f(x)\) completely. [WMA11 P1, 3 marks]',
    [r'\((x - 2)(x + 1)(x + 3)\)', r'\((x + 2)(x - 1)(x - 3)\)', r'\((x - 2)(x - 1)(x + 3)\)',
     r'\((x - 2)(x + 1)(x - 3)\)'], 0,
    r'Since \(f(2) = 0\), \((x - 2)\) is a factor M1 [1]. Algebraic division gives the quotient '
    r'\(x^2 + 4x + 3\) M1 [1]. Factorising the quotient gives \((x + 1)(x + 3)\), so '
    r'\(f(x) = (x - 2)(x + 1)(x + 3)\) A1 [1].')

add("Q379", "WMA11 1.4",
    r'Factorise \(2x^3 + 3x^2 - 11x - 6\) completely. [WMA11 P1, 3 marks]',
    [r'\((x - 2)(2x + 1)(x + 3)\)', r'\((x + 2)(2x - 1)(x - 3)\)', r'\((x - 2)(2x - 1)(x + 3)\)',
     r'\((x - 2)(2x + 1)(x - 3)\)'], 0,
    r'Test a value: \(f(2) = 16 + 12 - 22 - 6 = 0\), so \((x - 2)\) is a factor M1 [1]. Dividing gives '
    r'the quadratic quotient \(2x^2 + 7x + 3\) M1 [1]. This factorises as \((2x + 1)(x + 3)\), so the '
    r'complete factorisation is \((x - 2)(2x + 1)(x + 3)\) A1 [1].')

add("Q380", "WMA11 1.4",
    r'Factorise completely \(x^4 - 16\). [WMA11 P1, 3 marks]',
    [r'\((x - 2)(x + 2)(x^2 + 4)\)', r'\((x - 4)(x + 4)\)', r'\((x - 2)^2(x + 2)^2\)',
     r'\((x^2 + 4)^2\)'], 0,
    r'Treat \(x^4 - 16\) as a difference of two squares: \((x^2 - 4)(x^2 + 4)\) M1 [1]. The first '
    r'bracket factorises further as \((x - 2)(x + 2)\) M1 [1]. The complete factorisation is '
    r'\((x - 2)(x + 2)(x^2 + 4)\), since \(x^2 + 4\) has no real roots A1 [1].')

add("Q381", "WMA11 1.4",
    r'Expand and simplify \((2x - 1)^3\). [WMA11 P1, 3 marks]',
    [r'\(8x^3 - 12x^2 + 6x - 1\)', r'\(8x^3 + 12x^2 + 6x + 1\)', r'\(8x^3 - 12x^2 + 6x + 1\)',
     r'\(8x^3 - 6x^2 + 6x - 1\)'], 0,
    r'Write the cube as a product: \((2x - 1)(4x^2 - 4x + 1)\) M1 [1]. Expand every term: '
    r'\(8x^3 - 8x^2 + 2x - 4x^2 + 4x - 1\) M1 [1]. Collecting like terms gives exactly '
    r'\(8x^3 - 12x^2 + 6x - 1\) A1 [1].')

add("Q382", "WMA11 1.4",
    r'Given that \((x - 3)\) is a factor of \(x^3 - 2x^2 - 5x + 6\), factorise the expression completely. [WMA11 P1, 3 marks]',
    [r'\((x - 3)(x + 2)(x - 1)\)', r'\((x - 3)(x - 2)(x + 1)\)', r'\((x + 3)(x + 2)(x - 1)\)',
     r'\((x - 3)(x + 2)(x + 1)\)'], 0,
    r'Divide by the given factor \((x - 3)\) to obtain the quadratic quotient \(x^2 + x - 2\) M1 [1]. '
    r'Factorise the quotient: \((x + 2)(x - 1)\) M1 [1]. The complete factorisation is '
    r'\((x - 3)(x + 2)(x - 1)\) A1 [1].')

add("Q383", "WMA11 1.4",
    r'Simplify \(\frac{x^3 - 8}{x - 2}\). [WMA11 P1, 3 marks]',
    [r'\(x^2 + 2x + 4\)', r'\(x^2 - 2x + 4\)', r'\(x^2 + 4\)', r'\(x^2 + 2x - 4\)'], 0,
    r'Recognise \(x^3 - 8\) as a difference of two cubes, with \(a = x\) and \(b = 2\) M1 [1]. It '
    r'factorises as \((x - 2)(x^2 + 2x + 4)\) M1 [1]. Cancelling the common factor \((x - 2)\) leaves '
    r'exactly \(x^2 + 2x + 4\) A1 [1].')

add("Q384", "WMA11 1.4",
    r'Expand \((x + 1)(x^2 - 3x + 2)\) and state the coefficient of x. [WMA11 P1, 2 marks]',
    ['-1', '1', '-3', '2'], 0,
    r'Multiply each term of the quadratic by \((x + 1)\): \(x^3 - 3x^2 + 2x + x^2 - 3x + 2\) M1 [1]. '
    r'Collecting like terms gives \(x^3 - 2x^2 - x + 2\), so the coefficient of x is exactly -1 A1 [1].')

# ── WMA11 4.2 : intersection points and geometrical interpretation ───────────

add("Q385", "WMA11 4.2",
    r'The line \(y = x - 1\) intersects the curve \(y = x^2 - 4x + 3\) at two points. Find the x-coordinates of these points. [WMA11 P1, 4 marks]',
    [r'\(x = 1\) and \(x = 4\)', r'\(x = -1\) and \(x = -4\)', r'\(x = 1\) and \(x = -4\)',
     r'\(x = -1\) and \(x = 4\)'], 0,
    r'At an intersection the two expressions for y are equal: \(x^2 - 4x + 3 = x - 1\) M1 [1]. '
    r'Rearrange to \(x^2 - 5x + 4 = 0\) M1 [1]. Factorise: \((x - 1)(x - 4) = 0\) M1 [1]. The '
    r'x-coordinates are exactly 1 and 4 A1 [1].')

add("Q386", "WMA11 4.2",
    r'Find the coordinates of the points of intersection of the line \(y = 2x + 3\) and the curve \(y = x^2\). [WMA11 P1, 4 marks]',
    ['(3, 9) and (-1, 1)', '(3, 9) and (1, 1)', '(-3, 9) and (1, 1)', '(3, 6) and (-1, 2)'], 0,
    r'Set the expressions equal: \(x^2 = 2x + 3\) M1 [1]. Rearrange to \(x^2 - 2x - 3 = 0\) and '
    r'factorise: \((x - 3)(x + 1) = 0\), so \(x = 3\) or \(x = -1\) M1 [1]. Substitute back: '
    r'\(x = 3\) gives \(y = 9\) and \(x = -1\) gives \(y = 1\) M1 [1]. The points are (3, 9) and '
    r'(-1, 1) A1 [1].')

add("Q387", "WMA11 4.2",
    r'The line \(y = k\) is a tangent to the curve \(y = x^2 - 6x + 11\). Find the value of k. [WMA11 P1, 3 marks]',
    ['2', '-2', '11', '20'], 0,
    r'The line is a tangent when the equation \(x^2 - 6x + 11 = k\) has exactly one solution M1 [1]. '
    r'That requires the discriminant of \(x^2 - 6x + (11 - k) = 0\) to be zero: '
    r'\(36 - 4(11 - k) = 0\) M1 [1]. This gives \(36 - 44 + 4k = 0\), so \(k = 2\) A1 [1].')

add("Q388", "WMA11 4.2",
    r'The line \(y = 3x - 4\) and the curve \(y = x^2 - 2x + 1\) meet at two points. Find the sum of the x-coordinates of these points. [WMA11 P1, 4 marks]',
    ['5', '-5', '3', '2'], 0,
    r'Equate the two expressions: \(x^2 - 2x + 1 = 3x - 4\) M1 [1]. Rearrange to '
    r'\(x^2 - 5x + 5 = 0\) M1 [1]. The sum of the roots of \(ax^2 + bx + c = 0\) is \(-\frac{b}{a}\) '
    r'M1 [1]. Here that gives exactly 5 A1 [1].')

add("Q389", "WMA11 4.2",
    r'The graphs of \(y = x^2 - 2x - 3\) and \(y = 5\) intersect at two points. Find the x-coordinates of these points. [WMA11 P1, 4 marks]',
    [r'\(x = 4\) and \(x = -2\)', r'\(x = -4\) and \(x = 2\)', r'\(x = 4\) and \(x = 2\)',
     r'\(x = -4\) and \(x = -2\)'], 0,
    r'Equate the two expressions: \(x^2 - 2x - 3 = 5\) M1 [1]. Rearrange to \(x^2 - 2x - 8 = 0\) '
    r'M1 [1]. Factorise: \((x - 4)(x + 2) = 0\) M1 [1]. The x-coordinates are exactly 4 and -2 A1 [1].')

add("Q390", "WMA11 4.2",
    r'The line \(y = 2x + c\) is a tangent to the curve \(y = x^2 - 4x + 7\). Find the value of c. [WMA11 P1, 3 marks]',
    ['-2', '2', '-8', '8'], 0,
    r'The line is a tangent when \(x^2 - 4x + 7 = 2x + c\) has exactly one solution M1 [1]. '
    r'Rearranging gives \(x^2 - 6x + (7 - c) = 0\), so the discriminant must be zero: '
    r'\(36 - 4(7 - c) = 0\) M1 [1]. This simplifies to \(36 - 28 + 4c = 0\), so \(c = -2\) A1 [1].')

add("Q391", "WMA11 4.2",
    r'The curve \(y = x^2 + 4x + 1\) and the line \(y = 2x + k\) intersect at two distinct points. Find the condition on k. [WMA11 P1, 3 marks]',
    [r'\(k > 0\)', r'\(k < 0\)', r'\(k > 1\)', r'\(k < 1\)'], 0,
    r'Equate the two expressions: \(x^2 + 4x + 1 = 2x + k\), giving \(x^2 + 2x + (1 - k) = 0\) '
    r'M1 [1]. Two distinct intersection points require the discriminant to be greater than zero: '
    r'\(4 - 4(1 - k) > 0\) M1 [1]. This simplifies to \(4k > 0\), so \(k > 0\) A1 [1].')

add("Q392", "WMA11 4.2",
    r'Find the number of points of intersection of the line \(y = x + 2\) with the curve \(y = x^2 - 3x + 1\). [WMA11 P1, 3 marks]',
    ['2', '0', '1', '3'], 0,
    r'Equate: \(x^2 - 3x + 1 = x + 2\), so \(x^2 - 4x - 1 = 0\) M1 [1]. Its discriminant is '
    r'\((-4)^2 - 4(1)(-1) = 16 + 4 = 20\) M1 [1]. Because the discriminant is positive the equation '
    r'has two distinct real solutions, so there are 2 points of intersection A1 [1].')

# ── WMA11 4.3 : graphs of trigonometric functions ────────────────────────────

add("Q393", "WMA11 4.3",
    r'State the period of the graph \(y = \sin 3x\). [WMA11 P1, 2 marks]',
    [r'\(\frac{2\pi}{3}\)', r'\(6\pi\)', r'\(3\pi\)', r'\(2\pi\)'], 0,
    r'For \(y = \sin bx\) the period is \(\frac{2\pi}{b}\) M1 [1]. Here \(b = 3\), so the period is '
    r'exactly \(\frac{2\pi}{3}\) A1 [1].')

add("Q394", "WMA11 4.3",
    r'Find the number of solutions of \(\sin x = 0.5\) for \(0^\circ \leq x \leq 720^\circ\). [WMA11 P1, 3 marks]',
    ['4', '2', '6', '8'], 0,
    r'The principal solution is \(30^\circ\), and the second solution in the first period is '
    r'\(180^\circ - 30^\circ = 150^\circ\) M1 [1]. The sine graph repeats every \(360^\circ\), so '
    r'adding \(360^\circ\) gives \(390^\circ\) and \(510^\circ\) M1 [1]. There are exactly 4 solutions '
    r'in the interval A1 [1].')

add("Q395", "WMA11 4.3",
    r'State the equations of the asymptotes of the graph \(y = \tan x\) for \(-180^\circ < x < 180^\circ\). [WMA11 P1, 2 marks]',
    [r'\(x = -90^\circ\) and \(x = 90^\circ\)', r'\(x = -180^\circ\) and \(x = 180^\circ\)',
     r'\(x = 0^\circ\) and \(x = 180^\circ\)', r'\(x = 90^\circ\) only'], 0,
    r'Writing \(\tan x = \frac{\sin x}{\cos x}\) shows the graph is undefined where \(\cos x = 0\) '
    r'M1 [1]. Within \(-180^\circ < x < 180^\circ\) this happens at exactly \(x = -90^\circ\) and '
    r'\(x = 90^\circ\), so those are the asymptotes A1 [1].')

add("Q396", "WMA11 4.3",
    r'Find the x-coordinates of the points where the graph \(y = 2\cos x\) crosses the x-axis for \(0 \leq x \leq 2\pi\). [WMA11 P1, 3 marks]',
    [r'\(x = \frac{\pi}{2}\) and \(x = \frac{3\pi}{2}\)', r'\(x = 0\) and \(x = \pi\)',
     r'\(x = \frac{\pi}{2}\) and \(x = \pi\)', r'\(x = \pi\) and \(x = 2\pi\)'], 0,
    r'The graph crosses the x-axis where \(2\cos x = 0\), that is where \(\cos x = 0\) M1 [1]. On the '
    r'interval \(0 \leq x \leq 2\pi\) this happens at \(x = \frac{\pi}{2}\) and '
    r'\(x = \frac{3\pi}{2}\) M1 [1]. Those are exactly the two crossing points A1 [1].')

add("Q397", "WMA11 4.3",
    r'State the maximum value of \(y = 3 - 2\sin x\). [WMA11 P1, 2 marks]',
    ['5', '1', '3', '6'], 0,
    r'The sine function takes every value between -1 and 1 M1 [1]. The expression \(3 - 2\sin x\) is '
    r'largest when \(\sin x\) takes its smallest value, -1, giving \(3 - 2(-1) = 5\) A1 [1].')

add("Q398", "WMA11 4.3",
    r'Write down the coordinates of the maximum point of the graph \(y = \sin x\) for \(0^\circ \leq x \leq 360^\circ\). [WMA11 P1, 2 marks]',
    [r'\((90^\circ, 1)\)', r'\((0^\circ, 1)\)', r'\((180^\circ, 1)\)', r'\((270^\circ, 1)\)'], 0,
    r'The maximum value of \(\sin x\) is 1 M1 [1]. On \(0^\circ \leq x \leq 360^\circ\) this value is '
    r'first reached at \(x = 90^\circ\), so the maximum point is \((90^\circ, 1)\) A1 [1].')

add("Q399", "WMA11 4.3",
    r'State the period of the graph \(y = \tan x\). [WMA11 P1, 2 marks]',
    [r'\(180^\circ\)', r'\(360^\circ\)', r'\(90^\circ\)', r'\(720^\circ\)'], 0,
    r'The tangent graph has asymptotes \(180^\circ\) apart, and between consecutive asymptotes it '
    r'traces the whole of its range M1 [1]. The pattern therefore repeats every \(180^\circ\), which '
    r'is the period A1 [1].')

add("Q400", "WMA11 4.3",
    r'Find the number of times the graph \(y = \sin 2x\) crosses the x-axis for \(0^\circ \leq x \leq 360^\circ\). [WMA11 P1, 3 marks]',
    ['5', '3', '4', '6'], 0,
    r'The graph crosses the x-axis where \(\sin 2x = 0\) M1 [1]. Solving \(2x = 0^\circ, 180^\circ, '
    r'360^\circ, 540^\circ, 720^\circ\) gives \(x = 0^\circ, 90^\circ, 180^\circ, 270^\circ\) and '
    r'\(360^\circ\) M1 [1]. The graph therefore crosses the axis 5 times A1 [1].')

assert [q["q"] for q in Q] == [f"Q{i}" for i in range(376, 401)], [q["q"] for q in Q]
codes = {}
for q in Q:
    codes[q["statement_code"]] = codes.get(q["statement_code"], 0) + 1
assert codes == {"WMA11 1.4": 9, "WMA11 4.2": 8, "WMA11 4.3": 8}, codes

doc = {
    "board": "Edexcel",
    "code": "WMA11",
    "paper": "P1",
    "topic": "Mixed Topics 13",
    "batch": ["Q376-Q400"],
    "questions": Q,
    "technique_note": {
        "title": "Exam technique — Mixed Topics 13",
        "material_type": "exam-technique",
        "content": (
            "This set concentrates on three skills the P1 paper leans on. For polynomial "
            "expansion and factorisation, always look for a root first: testing small values such as "
            "x = 1, -1, 2, -2 is a quick method mark (M1) and tells you which linear factor to divide "
            "out, after which the remaining quadratic usually factorises. For intersections, the only "
            "reliable method is to equate the two expressions and then use the discriminant: it is "
            "positive for two points, zero for a tangent and negative for no intersection, and the "
            "phrase 'is a tangent to' is the examiner's cue that the discriminant equals zero. Reasons "
            "must always be given — a bare value loses the method mark. Finally, trigonometric graphs "
            "are marked for accuracy of detail: write the period as 360 divided by the coefficient of x "
            "for sine and cosine, remember that tangent repeats every 180 degrees and is undefined where "
            "cos x = 0, and count intersections over the interval actually asked for rather than assuming "
            "two per period."
        ),
    },
}

out = ".freebuff/drafts/wma11-p1-b015b.json"
json.dump(doc, open(out, "w", encoding="utf-8"), ensure_ascii=False)
print("wrote", out, "questions:", len(Q), "codes:", codes)
