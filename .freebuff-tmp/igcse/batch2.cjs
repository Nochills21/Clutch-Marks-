// IGCSE notes, batch 2. Worked numbers here were checked by hand and in code.
module.exports = [
  {
    file: 'igcse-transformations-and-vectors',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Transformations and vectors',
    title: 'Transformations and vectors',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Transformations and vectors: reflection, rotation, enlargement and translation (Core); vectors in two dimensions, magnitude and vector geometry (Extended).',
    sections: [
      {
        h: 'Transformations',
        why: 'A transformation is fixed only by its parameters: a reflection needs its mirror line, and a rotation needs its centre, angle and direction. Without them the image is not uniquely determined.',
        paras: [
          'A transformation maps every point of a shape to a new position, giving an image. The four transformations in the Core syllabus are reflection in a line, rotation about a centre, enlargement from a centre by a scale factor, and translation by a vector. Each one needs specific information to be fully described, and a name alone is not enough.',
          'A reflection needs its mirror line, such as x = 2 or y = −1. A rotation needs the centre, the angle and the direction, clockwise or anticlockwise. An enlargement needs the centre and the scale factor; a factor greater than 1 makes the image bigger, a factor between 0 and 1 makes it smaller. A translation needs the column vector (x; y), which moves each point x units across and y units up.',
          'Check each transformed point by plotting it. A rotation of 90° keeps the distance of every point from the centre, so a point that is 3 units from the centre must still be 3 units from it in the image. This is a quick way to catch a mistake in direction.',
        ],
        examples: [
          'rotating the point (2, 1) through 90° anticlockwise about the origin gives (−1, 2). Each coordinate pair is turned so that x becomes −y and y becomes x.',
          'translating A(1, 1) by the vector (3; −2) gives (4, −1), since 1 + 3 = 4 and 1 − 2 = −1.',
        ],
      },
      {
        h: 'Vectors in two dimensions (Extended)',
        why: 'A column vector splits a movement into across and up parts. Because the parts are independent, vectors add and subtract component by component.',
        paras: [
          'A column vector (x; y) describes a movement: x units across and y units up, with a negative value meaning the opposite direction. Vectors are written in bold or with an arrow, and two vectors are equal only when both components are equal.',
          'To add or subtract vectors, work on each component separately. To multiply a vector by a scalar, multiply every component by that number. A scalar multiple points in the same direction (or the opposite direction if the scalar is negative) and has a length that changes by the scalar’s size.',
        ],
        examples: [
          '(3; −2) + (1; 4) = (4; 2). Also 2 × (3; −2) = (6; −4), which is twice as long and in the same direction.',
        ],
      },
      {
        h: 'Magnitude (Extended)',
        why: 'The magnitude is the length of the vector. Pythagoras on the two components gives that length.',
        paras: [
          'The magnitude of a vector is its length, found by treating the components as the two shorter sides of a right-angled triangle. For the vector (x; y), the magnitude is √(x² + y²). Write the magnitude of a vector a as |a|.',
          'Magnitude is always positive or zero. It ignores direction, so (3; −2) and (−3; 2) have the same magnitude even though they point in opposite directions.',
        ],
        formulas: ['|(x; y)| = √(x² + y²)'],
        examples: [
          '|(3; −2)| = √(9 + 4) = √13 ≈ 3.61.',
        ],
      },
      {
        h: 'Vector geometry (Extended)',
        why: 'Going from A to B is the same as going from the origin to B and back to A, so AB = b − a. The midpoint is halfway, so its position vector is the average of the two.',
        paras: [
          'Every point has a position vector, measured from the origin. If A has position vector a and B has position vector b, then the vector from A to B is AB = b − a. Read this as “the position of B minus the position of A”, which is why the subtraction is in that order.',
          'The midpoint M of AB has position vector ½(a + b), the average of the two. A point that divides AB in a given ratio can be found in the same way: move along AB by the fraction of the way required.',
          'Two vectors are parallel when one is a scalar multiple of the other. If AB and AC are scalar multiples of each other, then A, B and C lie on one straight line, and the points are said to be collinear. State the scalar multiple explicitly in your working.',
        ],
        formulas: ['AB = b − a', 'midpoint M = ½(a + b)'],
        examples: [
          'A(1, 2) and B(5, 10). AB = (4; 8) = 4 × (1; 2), so AB is parallel to (1; 2). Since AB and AC would share the point A, any point C with AC = k × (1; 2) lies on the same line.',
          'a point P on AB with AP : PB = 1 : 3 has position vector a + ¼(b − a), because P is one quarter of the way from A to B.',
        ],
      },
    ],
    exam: [
      'State the full description of a transformation, not just its name.',
      'Use a ruler for straight edges when drawing transformed shapes.',
      'When showing vectors are parallel, show one is a scalar multiple of the other.',
    ],
  },
  {
    file: 'igcse-statistics-probability',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Probability',
    title: 'Probability',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Probability: the probability scale, relative and expected frequency, combined events, and conditional probability (Extended).',
    sections: [
      {
        h: 'The probability scale',
        why: 'Probability measures the share of outcomes that happen. Zero means impossible and one means certain, so every probability lies between them.',
        paras: [
          'A probability is a number from 0 to 1. An event with probability 0 cannot happen, an event with probability 1 always happens, and a probability of one half means the event is as likely as not. Probabilities can be given as fractions, decimals or percentages, so convert to the form the question asks for.',
          'The probabilities of all the possible outcomes of an experiment add up to 1. This gives a quick way to find a missing probability: subtract the known probabilities from 1. It also gives the probability that an event does not happen, which is one minus the probability that it does.',
        ],
        formulas: ['P(not A) = 1 − P(A)'],
        examples: [
          'if the probability that a counter is blue is 0.8, the probability that it is not blue is 1 − 0.8 = 0.2.',
        ],
      },
      {
        h: 'Relative and expected frequency',
        why: 'Relative frequency is observed data from trials. As the number of trials grows it settles near the probability, and expected frequency is the probability times the number of trials.',
        paras: [
          'Relative frequency is the number of times an outcome occurs divided by the number of trials. It is based on observed data, so it is an estimate of the probability. With more trials, the relative frequency usually gets closer to the true probability, which is why a small experiment can be misleading.',
          'Expected frequency is the number of times you would expect an outcome to occur, if the probability is correct: probability × number of trials. It is a prediction, so it need not be a whole number, and the actual count will often differ from it.',
          'Work out the probability first and then multiply. Do not confuse the two: a relative frequency is calculated from results, while an expected frequency is calculated from a probability.',
        ],
        formulas: ['expected frequency = probability × number of trials'],
        examples: [
          'a spinner lands on red 30 times in 120 spins, so the relative frequency is 30 ÷ 120 = 0.25.',
          'if P(red) = 0.25, then in 400 spins the expected number of reds is 0.25 × 400 = 100.',
        ],
      },
      {
        h: 'Combined events with replacement',
        why: 'With replacement, each trial is unaffected by the last, so probabilities along a path multiply. A sample space or tree diagram lists every outcome so none is missed.',
        paras: [
          'When two events are combined, a sample space diagram lists all the pairs of outcomes, and a tree diagram shows the same thing branch by branch. In a tree diagram, write the outcomes at the ends of the branches and the probability of each branch beside it. Multiply the probabilities along a path to get the probability of that combination, and add the paths that give the outcome you want.',
          'With replacement, the second trial has the same probabilities as the first, so the events are independent. Without replacement the probabilities change after the first trial, and you must use the reduced numbers on the second set of branches.',
          'A Venn diagram can be used for combined events but is limited to two sets in this course. For more than two outcomes, use a tree diagram.',
        ],
        examples: [
          'two fair dice. The outcomes with sum 7 are 6 out of 36, so P(sum 7) = 6/36 = 1/6.',
          'a bag contains 3 red and 2 blue counters. A counter is taken, replaced, then another is taken. P(red, red) = 3/5 × 3/5 = 9/25. P(at least one blue) = 1 − P(no blue) = 1 − 9/25 = 16/25.',
        ],
      },
      {
        h: 'Conditional probability (Extended)',
        why: 'Conditional probability restricts the sample space to the group named in the question, which changes the denominator. Choosing the right group is the key step.',
        paras: [
          'A conditional probability asks for the chance of one event given that another has already happened. The question tells you the group to work within, and you count only the members of that group. The denominator is the size of that group, not the size of the whole population.',
          'Use a two-way table, a Venn diagram or a tree diagram to organise the counts. Identify the group first, then count the outcomes inside it. Writing the group down as a short phrase, such as “football players”, helps avoid using the whole population by mistake.',
        ],
        examples: [
          '25 students play football. Of these, 8 also play hockey. The probability that a football player plays hockey is 8/25 = 0.32. The denominator is 25, the football players, not the whole class.',
        ],
      },
    ],
    exam: [
      'Check that the probabilities on each set of branches add up to 1.',
      'Write the reason for each step, for example “with replacement”.',
      'For conditional questions, identify the group first, then count within it.',
    ],
  },
  {
    file: 'igcse-number-sets',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Number',
    title: 'Number: sets',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Number: sets, set notation and Venn diagrams (Core).',
    sections: [
      {
        h: 'Set notation',
        why: 'A set is defined by which objects belong to it. The symbols state membership and relationships exactly, so an answer can be checked against the definition.',
        paras: [
          'A set is a well-defined collection of objects, called elements. Membership is written with the symbol ∈, so 2 ∈ A means that 2 is an element of A. A set can be defined by listing its elements, for example B = {a, b, c}, or by a description, for example A = {x : x is a natural number}.',
          'The universal set ℰ holds every element under consideration. The complement A′ is everything in ℰ that is not in A. The union A ∪ B contains the elements in A or B or both, and the intersection A ∩ B contains only the elements in both. The number of elements in a set A is written n(A).',
        ],
        list: [
          'n(A): the number of elements in set A.',
          'A′: the complement of A, meaning all elements of the universal set that are not in A.',
          'ℰ: the universal set.',
          'A ∪ B: the union of A and B, meaning elements in A or B or both.',
          'A ∩ B: the intersection of A and B, meaning elements in both A and B.',
        ],
      },
      {
        h: 'Venn diagrams',
        why: 'Overlapping regions show elements that belong to both sets. Filling in the intersection first and then the outer regions avoids counting the shared elements twice.',
        paras: [
          'A Venn diagram shows sets as overlapping regions inside a rectangle that represents the universal set. Work from the centre outwards: place the number in the intersection first, then the remaining counts for each set, then the number outside all the sets.',
          'If you start with the outer regions, the shared elements are easy to count twice. Starting from the intersection keeps every element in exactly one region.',
        ],
        examples: [
          'ℰ = {1, 2, …, 10}, A = {even numbers}, B = {multiples of 3}. Then A = {2, 4, 6, 8, 10} and B = {3, 6, 9}. A ∩ B = {6}, so n(A ∩ B) = 1. A ∪ B = {2, 3, 4, 6, 8, 9, 10}, so n(A ∪ B) = 7. A′ = {1, 3, 5, 7, 9}.',
        ],
      },
      {
        h: 'Counting elements outside the sets',
        why: 'The universal set holds every element under consideration, so elements outside both sets are the total minus the union. Subtracting from the total is the reliable way to find them.',
        paras: [
          'Elements outside both sets are in the universal set but not in A ∪ B. Their number is the total number of elements minus n(A ∪ B). This is more reliable than counting them one by one, especially when the sets are large.',
          'The union can also be found from the formula n(A ∪ B) = n(A) + n(B) − n(A ∩ B). The intersection is subtracted because it was counted in both n(A) and n(B). Use the formula as a check on your diagram.',
        ],
        formulas: ['n(A ∪ B) = n(A) + n(B) − n(A ∩ B)'],
        examples: [
          'in the example above, 10 − 7 = 3 elements (1, 5 and 7) lie outside both sets. Check: 5 + 3 − 1 = 7.',
        ],
      },
      {
        h: 'Problems with two sets',
        why: 'All the regions together must add up to the total given in the question. Checking that sum catches a missing or double-counted region.',
        paras: [
          'Questions may give a Venn diagram, a description in words, or the numbers in each region. Fill in the diagram from the intersection outwards. If the question gives a description, translate each phrase into a region first, such as “both” for the intersection and “only A” for the part of A outside B.',
          'Finish by adding up every region. The total must match the total given in the question, and if it does not, one region is wrong or missing.',
        ],
      },
    ],
    exam: [
      'Use the correct notation in your answer, for example n(A ∩ B), not a verbal description.',
      'Check that every region in the diagram has a value, and that the total matches the universal set.',
      'Remember that the Venn diagram is limited to two sets in this course.',
    ],
  },
  {
    file: 'igcse-networking-communication',
    eyebrow: 'Cambridge IGCSE Computer Science 0478, Section 2',
    title: 'Networking and communication',
    syllabus: 'Cambridge IGCSE Computer Science 0478, Section 2: data transmission, error detection and encryption; Section 3: network hardware.',
    sections: [
      {
        h: 'Types of transmission',
        why: 'Transmission types differ in how bits travel: serial sends bits one after another, and parallel sends several at once. Each suits different distances and speeds.',
        paras: [
          'Serial transmission sends one bit at a time over a single channel. It suits long distances, because the wires do not need to keep their timing aligned, and it avoids the cost of many wires. Parallel transmission sends several bits at once over several wires. It is fast over short distances, but over long distances the bits can arrive slightly out of step, which is called timing skew.',
          'Communication also has a direction. Simplex is one direction only, such as a television broadcast. Half-duplex is both directions, but not at the same time, like a walkie-talkie. Full-duplex is both directions at once, as in a telephone call.',
          'When comparing serial and parallel in an answer, always name the trade-off between distance and speed, and say which one each situation favours.',
        ],
      },
      {
        h: 'Error detection',
        why: 'A parity bit makes the number of 1s even, so a single flipped bit is detected. Parity detects errors but cannot say where they are or correct them.',
        paras: [
          'Errors can occur during transmission, for example from interference on the line. A parity check adds one extra bit to each byte so that the number of 1s is always even (even parity) or always odd (odd parity). The receiver counts the 1s; if the count is wrong, it knows an error has occurred.',
          'Parity has limits. It detects a single flipped bit, but it cannot say which bit changed, so it cannot correct the error. Two flipped bits can cancel out, leaving the count correct, and the error goes undetected.',
          'A checksum is a value calculated from the data and sent along with it. The receiver recalculates the value and compares it with the one received; a mismatch shows that an error has occurred. Checksums and parity both detect errors, but neither corrects them on its own.',
        ],
        examples: [
          'the byte 1011001 has four 1s. With even parity the parity bit is 0, so the transmitted byte is 10110010. If the receiver counts an odd number of 1s, it knows an error occurred.',
        ],
      },
      {
        h: 'Encryption',
        why: 'Without the key the ciphertext is unreadable, so encryption protects data that might be intercepted. The security depends on keeping the key private.',
        paras: [
          'Encryption converts plaintext into ciphertext using a key, so that only someone with the right key can read it. Decryption reverses the process. Even if the data is intercepted during transmission, it is useless without the key.',
          'Symmetric encryption uses the same key to encrypt and decrypt, so both parties must share it secretly. Asymmetric encryption uses a public key to encrypt and a private key to decrypt. The public key can be shared openly, because only the matching private key can decrypt the message.',
        ],
      },
      {
        h: 'Network hardware',
        why: 'An IP address is assigned by the network and can change, while a MAC address is fixed to the hardware. This is why the two identify different things.',
        paras: [
          'A network interface card (NIC) connects a device to a network. Every NIC has a unique MAC address, which is fixed to the hardware. An IP address identifies a device on a network and can change, for example when the device joins a different network.',
          'A switch connects devices within one local network. It reads the MAC address in each frame and sends the frame only to the device it is addressed to. A router connects different networks together and forwards packets between them using IP addresses.',
        ],
        list: [
          'NIC: connects a device to a network, with a unique MAC address.',
          'Switch: connects devices in one local network and sends each frame to its MAC address.',
          'Router: connects different networks and forwards packets using IP addresses.',
        ],
      },
    ],
    exam: [
      'When comparing serial and parallel, always name the distance and speed trade-off.',
      'For parity questions, count the 1s before deciding the parity bit.',
      'Say which key is used in encryption questions; “the key” alone is not enough for asymmetric systems.',
    ],
  },
];
