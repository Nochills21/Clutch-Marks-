// Computer Science A2 batch 8: Pearson Edexcel IAL Computer Science (YCP11),
// Unit 3 Advanced Computer Science - abstract data types (stacks, queues, trees,
// hash tables) with algorithmic complexity, algorithms and recursion (sorting,
// searching, graph traversal), and programming paradigms with file processing
// and exception handling. Apply:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-a2-depth.cjs > .freebuff-tmp/cs-a2-depth-1.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-a2-depth-1.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-a2-depth-1.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science A2
module.exports = {
  expectType: "notes",
  titles: {
    "c015774f-319c-423f-94e2-c1b6a3505c70": "Edexcel IAL Computer Science: Abstract Data Types and Complexity",
    "fa0fd6bb-1dda-4f3c-af76-0db40924f2a3": "Edexcel IAL Computer Science: Algorithms, Recursion and Graph Traversal",
    "7ca83ddb-a38f-4f06-b83c-8381e8e73560": "Edexcel IAL Computer Science: Programming Paradigms and Object-Oriented Programming",
  },
  rows: {
    "c015774f-319c-423f-94e2-c1b6a3505c70": `
<h2>Edexcel IAL Computer Science: Abstract Data Types and Complexity</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 3 Advanced Computer Science: abstract data types — stacks, queues, linked lists, trees and hash tables — and the algorithmic complexity that decides which one to choose. An <strong>abstract data type (ADT)</strong> defines behaviour, not implementation: what operations exist and what they guarantee, leaving storage open. That separation is the whole idea — "a queue is FIFO" says nothing about arrays or linked lists — and this note traces every structure operation step by step on drawn memory diagrams.</p>

<h3>Complexity: measuring before choosing</h3>
<p><strong>Big-O notation</strong> describes how an algorithm's time (or space) grows with input size n, ignoring constants and lower-order terms — how it scales, not how fast it is on one machine. Common classes: O(1) constant (array index), O(log n) logarithmic (binary search), O(n) linear (linear search), O(n log n) (merge sort), O(n²) quadratic (bubble sort), O(2ⁿ) exponential (naive recursive fib). Best/average/worst case may differ; the <strong>worst case</strong> is quoted unless stated.</p>
<pre><code>Deriving complexity from code, step by step:

  for i in range(n):          # n iterations
      print(i)                # O(1) work
  -> O(n)

  for i in range(n):          # n iterations
      for j in range(n):      # n iterations EACH
          print(i, j)         # O(1) work
  -> n x n = O(n^2)

  i = 1
  while i < n:                # doubles each pass
      i = i * 2
  -> passes: 1, 2, 4, 8, ... 2^k < n  => k = log2(n)  -> O(log n)

Doubling-and-halving loops are logarithmic because the value spans powers of
two; counting down by one is linear. Reading the update rule is the skill.</code></pre>

<table border="1" cellpadding="6">
<tr><th>Structure</th><th>Access</th><th>Insert</th><th>Delete</th><th>Typical use</th></tr>
<tr><td>Array</td><td>O(1) by index</td><td>O(n) shift</td><td>O(n) shift</td><td>Fixed collections, heavy indexing</td></tr>
<tr><td>Linked list</td><td>O(n) sequential</td><td>O(1) at known node</td><td>O(1) at known node</td><td>Frequent inserts/deletes, unknown size</td></tr>
<tr><td>Stack (LIFO)</td><td>O(1) top only</td><td>O(1) push</td><td>O(1) pop</td><td>Undo, call stack, expression parsing</td></tr>
<tr><td>Queue (FIFO)</td><td>O(1) front only</td><td>O(1) enqueue</td><td>O(1) dequeue</td><td>Print jobs, scheduling, BFS</td></tr>
<tr><td>BST</td><td>O(log n) balanced</td><td>O(log n)</td><td>O(log n)</td><td>Sorted data with dynamic updates</td></tr>
<tr><td>Hash table</td><td>O(1) average</td><td>O(1) average</td><td>O(1) average</td><td>Key-value lookup, no ordering</td></tr>
</table>

<h3>Stacks: LIFO</h3>
<p>A <strong>stack</strong> is last-in, first-out: push adds to the top, pop removes from the top, peek reads it. It models nesting: function calls (the call stack), undo history, expression evaluation, browser back buttons, and recursion (below). Implementations: array with a top index, or linked list with pushes/pops at the head — both O(1) for push/pop.</p>
<pre><code>Trace: evaluate the postfix expression 3 4 + 2 * 7 -   [ (3+4)*2 - 7 ]

Read left to right; numbers push; operators pop two, compute, push.

  token 3:  push 3                      stack [3]
  token 4:  push 4                      stack [3, 4]
  token +:  pop 4, pop 3 -> 3+4 = 7
            push 7                      stack [7]
  token 2:  push 2                      stack [7, 2]
  token *:  pop 2, pop 7 -> 7*2 = 14
            push 14                     stack [14]
  token 7:  push 7                      stack [14, 7]
  token -:  pop 7, pop 14 -> 14-7 = 7
            push 7                      stack [7]

Result: 7. Order matters: the SECOND pop is the left operand - getting that
backwards is the classic stack error (14-7 vs 7-14).

Bracket matching, same mechanism: push every opening bracket; on a closing
bracket, pop and check the pair matches; at the end the stack must be empty.</code></pre>

<h3>Queues: FIFO</h3>
<p>A <strong>queue</strong> is first-in, first-out: enqueue at the rear, dequeue from the front. It models waiting lines: print jobs, keyboard buffers, breadth-first search, task scheduling. Variants: <strong>circular queue</strong> (fixed array with front/rear wrapping — avoids shifting), <strong>priority queue</strong> (dequeue serves the highest priority first), <strong>deque</strong> (insert/remove at both ends).</p>
<pre><code>Trace: queue of print jobs with a circular array of size 4.

  enqueue "A"        [A, -, -, -]   front=0 rear=1
  enqueue "B"        [A, B, -, -]   front=0 rear=2
  dequeue -> "A"     [-, B, -, -]   front=1 rear=2
  enqueue "C"        [-, B, C, -]   front=1 rear=3
  enqueue "D"        [-, B, C, D]   front=1 rear=0 (wraps around)
  dequeue -> "B"     [-, -, C, D]   front=2 rear=0

Full or empty? With front = rear after a dequeue the queue is empty; after an
enqueue it is full - so implementations track a count or leave one slot spare
to disambiguate. That disambiguation is exactly the exam's hard question.</code></pre>

<h3>Linked lists</h3>
<p>A <strong>linked list</strong> stores elements in nodes: data plus a pointer (reference) to the next node; the list holds a head pointer. Insertion and deletion are O(1) once the node is located — re-point two pointers, no shifting — versus the array's O(n); but access is O(n) sequential (no indexing), and each node costs extra memory for its pointer. Variants: <strong>doubly linked</strong> (pointers both ways — O(1) deletion from a known node), <strong>circular</strong> (last node points back to head).</p>
<pre><code>Insert 7 between nodes holding 5 and 9, step by step:

  before:  head -> [5 | *] -> [9 | *] -> [3 | /]

  1. new node: [7 | *]  (its next currently unset)
  2. new.next <- node9          -> [7 | *] -> [9 | *] -> ...
  3. node5.next <- new          -> [5 | *] -> [7 | *] -> [9 | *] -> [3 | /]

  after:   head -> [5] -> [7] -> [9] -> [3] -> None

Order of steps is load-bearing: if step 3 ran first, the link to node 9 would
be lost - the list could not reach 9 or 3 at all. Deleting node 9:
  node7.next <- node9.next (= node3). The unlinked node is garbage collected.</code></pre>

<h3>Trees</h3>
<p>A <strong>tree</strong> is a hierarchical node structure: one root, each node having zero or more children; leaves have none; the <strong>depth/level</strong> of a node is its distance from the root; a <strong>binary tree</strong> has at most two children per node. A <strong>binary search tree (BST)</strong> keeps every left subtree's values below the node's and every right subtree's above, giving O(log n) search/insert on a balanced tree (degenerating to O(n) if built badly — the balancing motivation behind AVL/red-black trees).</p>
<pre><code>Insert 8, 3, 10, 1, 6, 14, 4, 7 into a BST, one at a time:

  8 is root. 3 < 8 -> left. 10 > 8 -> right. 1 < 8 -> left; 1 < 3 -> left.
  6 < 8 -> left; 6 > 3 -> right. 14 > 8 -> right; 14 > 10 -> right.
  4 < 8 -> left; 4 > 3 -> right; 4 < 6 -> left.

              8
           /     \
          3       10
         / \       \
        1   6       14
           /
          4

In-order traversal (left, node, right) visits values in order:
  1, 3, 4, 6, 8, 10, 14 - the property that makes BSTs useful.

Search for 4: 4 < 8 go left -> 4 > 3 go right -> 4 < 6 go left -> found.
Three comparisons for seven nodes - the O(log n) promise.</code></pre>
<p>Traversals to know by mechanism: <strong>pre-order</strong> (node, left, right — copies a tree), <strong>in-order</strong> (left, node, right — sorted order from a BST), <strong>post-order</strong> (left, right, node — deletes/frees a tree safely), <strong>breadth-first/level-order</strong> (level by level, via a queue).</p>

<h3>Hash tables</h3>
<p>A <strong>hash table</strong> maps keys to array slots through a <strong>hash function</strong>, giving O(1) average lookup. The design questions are the exam: a good hash function spreads keys evenly and computes quickly; <strong>collisions</strong> (two keys hashing to one slot) are inevitable and resolved by <strong>chaining</strong> (each slot holds a list) or <strong>open addressing</strong> (probe for the next free slot — linear probing, quadratic probing, double hashing).</p>
<pre><code>Worked: hash(key) = key mod 7, inserting 15, 22, 8, 3, 29 with chaining.

  15 mod 7 = 1   slot 1: [15]
  22 mod 7 = 1   slot 1: [15, 22]      <- collision, chained
   8 mod 7 = 1   slot 1: [15, 22, 8]   <- third collision: a bad function
                                         for this data, or unlucky keys
   3 mod 7 = 3   slot 3: [3]
  29 mod 7 = 1   slot 1: [15, 22, 8, 29]

  Look-up of 29: hash -> slot 1 -> scan the chain 15, 22, 8, 29 -> found.

With open addressing (linear probing) instead:
  15 -> slot 1. 22 -> slot 1 taken, probe 2 -> [_, 15, 22, ...]. 8 -> probe
  1, 2 taken -> slot 3. 3 -> hash 3 taken -> probe 4. 29 -> probe 1,2,3,4
  taken -> slot 5. Look-up probes the same sequence.

Clustering (long chains / long probe runs) degrades toward O(n); a load
factor kept below ~0.75 and a rehash when exceeded is the standard remedy.
Deleting with open addressing needs tombstones so probe chains do not break.</code></pre>

<h3>Worked example: choosing a structure</h3>
<pre><code>Three requirements, three choices with reasons:

1. "Undo feature in an editor" - stack. Actions nest in reverse order of
   doing; undo must pop the most recent first (LIFO), and redo is a second
   stack.

2. "Printer jobs in arrival order" - queue. The job that arrived first must
   print first (FIFO); a stack would starve the oldest job forever.

3. "Fast lookup of student records by ID" - hash table. IDs are unique keys
   with no ordering requirement; hashing gives O(1) average retrieval versus
   O(n) search or O(log n) tree. If range queries ("all students with marks
   60-70") matter, a BST wins instead - the query pattern decides.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Quoting Big-O for the wrong case, or counting constants ("O(2n)"); simplify to the dominant term.</li>
<li>Subtraction and division order in stack evaluation: the second pop is the left operand.</li>
<li>Saying a linked list has random access; only arrays do — lists are sequential.</li>
<li>Forgetting the update-order trap when relinking list nodes (the lost-pointer bug).</li>
<li>Claiming BST operations are always O(log n); only when reasonably balanced — worst case O(n).</li>
<li>Confusing in-order (sorted) with pre-order (copy) traversal purposes.</li>
<li>Ignoring collision handling in hash answers; the function guarantees nothing without a resolution strategy.</li>
<li>Deleting from a linear-probing table by simply clearing the slot — probe chains must survive (tombstones).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 3, 4 marks).</strong> Explain what is meant by an abstract data type and why it is useful.</p>
<p>Answer: An ADT defines a data structure purely by its behaviour — the operations it supports (push/pop for a stack) and their guarantees — without specifying storage. This separates interface from implementation, so the structure can be reimplemented (array to linked list) without changing client code, and the same behaviour can be implemented differently per performance need.</p>
<p><strong>Question 2 (Unit 3, 5 marks).</strong> Trace the stack while evaluating postfix 5 2 + 3 * and give the result.</p>
<p>Answer: Push 5 → [5]; push 2 → [5, 2]; '+': pop 2 and 5, push 7 → [7]; push 3 → [7, 3]; '*': pop 3 and 7, push 21 → [21]. Result 21 = (5 + 2) × 3.</p>
<p><strong>Question 3 (Unit 3, 4 marks).</strong> Compare arrays and linked lists for implementing a dynamic list.</p>
<p>Answer: Arrays give O(1) indexed access and compact storage, but insertion/deletion shifts elements (O(n)) and resizing is disruptive. Linked lists insert and delete in O(1) given a node reference and grow dynamically, but access is sequential O(n) and each node pays pointer overhead. Heavy indexing → array; frequent inserts/deletes at known positions → linked list.</p>
<p><strong>Question 4 (Unit 3, 5 marks).</strong> Explain how a hash table handles collisions and why the hash function matters.</p>
<p>Answer: When two keys hash to one slot, chaining stores a list per slot (lookup scans the short chain) or open addressing probes for the next free slot (linear, quadratic or double hashing). The hash function decides performance: an even spread keeps chains/probes short for O(1) average lookup; a poor function clusters keys, degenerating to O(n). The load factor is monitored and the table rehashed when it grows too full.</p>
<p><strong>Question 5 (Unit 3, 4 marks).</strong> Give the in-order, pre-order and post-order traversals of a BST and state one use of each.</p>
<p>Answer: In-order (left, node, right) visits values sorted — used to output ordered data. Pre-order (node, left, right) preserves structure — used to copy or serialise a tree. Post-order (left, right, node) visits children first — used to delete or free a tree safely.</p>
<p><strong>Question 6 (Unit 3, 3 marks).</strong> Determine the complexity of binary search and explain why.</p>
<p>Answer: O(log n). Each comparison halves the remaining search space (compare with the middle element, discard one half), so after k comparisons at most 2^k items could have been covered; n items need log₂(n) halvings — 1 000 000 items in at most 20 comparisons.</p>
<p>The structures above are only as good as the algorithms that run on them — the next note is those algorithms.</p>
`,

    "fa0fd6bb-1dda-4f3c-af76-0db40924f2a3": `
<h2>Edexcel IAL Computer Science: Algorithms, Recursion and Graph Traversal</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 3 Advanced Computer Science: algorithms — sorting and searching — recursion, and graph traversal. Every algorithm below is traced on the same small dataset so the mechanisms are comparable, and every complexity claim is derived from the trace rather than asserted. At A Level the examiner wants the pass-by-pass state and the reason for the complexity, not just the name.</p>

<h3>Searching: linear and binary</h3>
<pre><code>Dataset (10 values): [12, 19, 24, 31, 38, 44, 52, 67, 71, 89]

Linear search for 52: scan from the left - 12, 19, 24, 31, 38, 44, 52 (7
comparisons). Worst case n comparisons (value absent or last): O(n).
Requires nothing of the data.

Binary search for 52 (data must be sorted): compare with the MIDDLE element.
  low=0 high=9 mid=4 -> [38]  52 > 38 -> search right half
  low=5 high=9 mid=7 -> [67]  52 < 67 -> search left half
  low=5 high=6 mid=5 -> [44]  52 > 44 -> search right half
  low=6 high=6 mid=6 -> [52]  found at index 6 - 4 comparisons for 10 items.

Halving the range each step: O(log n). Every "why is binary faster" answer
must name the halving and the sorted-data precondition.</code></pre>

<h3>Sorting algorithms compared</h3>
<p>Before the traces, the comparison the exam wants in one place. Each algorithm's mechanism dictates its complexity and its niche; the traces below then show <em>why</em> each number is what it is.</p>
<table border="1" cellpadding="6">
<tr><th>Sort</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Stable</th><th>Best niche</th></tr>
<tr><td>Bubble</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td><td>Teaching; tiny nearly-sorted sets (early-exit pass)</td></tr>
<tr><td>Insertion</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td><td>Nearly-sorted or small data</td></tr>
<tr><td>Selection</td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>No</td><td>Few writes available (n swaps total)</td></tr>
<tr><td>Merge</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>Yes</td><td>Guaranteed performance; linked lists; external sorting</td></tr>
</table>

<h3>Sorting: bubble, insertion, selection, merge</h3>
<pre><code>Data: [24, 12, 31, 19] - sort ascending with each algorithm's mechanism.

BUBBLE SORT - swap adjacent out-of-order pairs, pass by pass:
  pass 1: [24,12] swap -> [12,24,31,19]; [24,31] ok; [31,19] swap ->
          [12,24,19,31]  (largest value 31 has "bubbled" to the end)
  pass 2: [12,24] ok; [24,19] swap -> [12,19,24,31]; end is sorted
  pass 3: [12,19] ok; [19,24] ok -> sorted, no swaps means done.
  Worst case O(n^2): reverse-ordered data swaps at every comparison.

INSERTION SORT - build a sorted left portion, insert each next value:
  start [24 | 12 31 19]        (left portion [24])
  insert 12: 12 < 24 -> shift -> [12 24 | 31 19]
  insert 31: 31 >= 24 -> place  -> [12 24 31 | 19]
  insert 19: 19 < 31, 19 < 24, 19 > 12 -> [12 19 24 31]
  Fast on nearly-sorted data (few shifts); worst case O(n^2).

SELECTION SORT - find the minimum of the unsorted part, swap to its front:
  [24 12 31 19] min=12 -> swap with 24 -> [12 | 24 31 19]
  [24 31 19]   min=19 -> swap with 24 -> [12 19 | 31 24]
  [31 24]      min=24 -> swap with 31 -> [12 19 24 31]
  Always O(n^2) comparisons, but only n swaps - good when writes are costly.

MERGE SORT - divide in half recursively, then merge sorted halves:
  [24 12 31 19] -> [24 12] [31 19] -> [24] [12] [31] [19]
  merge -> [12 24] [19 31] -> merge -> [12 19 24 31]
  Every level merges n items, and there are log n levels: O(n log n) always,
  at the cost of O(n) extra memory.</code></pre>
<p>Choosing: small or nearly-sorted data → insertion; minimal memory and small n → selection; guaranteed performance and memory available → merge; tiny arrays with expensive swaps → bubble (mostly pedagogical). The exam asks for the comparison <em>and</em> a reason.</p>

<h3>Recursion</h3>
<p>A <strong>recursive</strong> function calls itself on a smaller instance, with a <strong>base case</strong> ending the recursion. Every recursion is equivalent to iteration plus an explicit stack (the call stack does the pushing). Two rules for correctness: each call must move toward the base case, and the base case must be reachable.</p>
<pre><code>Recursive factorial, traced through the call stack:

  def factorial(n):
      if n <= 1: return 1        # base case
      return n * factorial(n-1)  # recursive case

  factorial(4):
    4 * factorial(3)
        3 * factorial(2)
            2 * factorial(1)
                1                 # base case reached; returns start
            2 * 1 = 2
        3 * 2 = 6
    4 * 6 = 24

Stack depth is n (each call waits for the return below it). A missing base
case never terminates - and deep recursion on large n overflows the stack,
which is why iterative solutions are preferred for deep, simple loops.

Trace table alternative for factorial(4): n=4 -> 24, n=3 -> 6, n=2 -> 2,
n=1 -> 1 (returns), then the multiplications unwind: 2, 6, 24.</code></pre>
<pre><code>Recursive binary search on [12, 19, 24, 31, 38, 44, 52, 67, 71, 89]:

  def bsearch(lo, hi, target):
      if lo > hi: return -1          # base case: empty range
      mid = (lo + hi) // 2
      if data[mid] == target: return mid
      if data[mid] > target: return bsearch(lo, mid-1, target)   # left
      return bsearch(mid+1, hi, target)                          # right

  Search for 31: mid=4 (38) -> 31 < 38 -> recurse left [0..3];
  mid=1 (19) -> 31 > 19 -> recurse right [2..3]; mid=2 (24) -> right [3..3];
  mid=3 (31) -> found. Four recursive calls, each halving the range.</code></pre>

<h3>Graphs and traversal</h3>
<p>A <strong>graph</strong> is nodes (vertices) joined by edges — modelling networks, maps, dependencies. Terminology: <strong>undirected/directed</strong>, <strong>weighted</strong> (edges carry costs), <strong>path</strong>, <strong>cycle</strong>, <strong>connected</strong>. Storage: <strong>adjacency matrix</strong> (n×n grid — O(1) edge check, O(n²) space) versus <strong>adjacency list</strong> (list of neighbours per node — O(V+E) space, faster to iterate edges).</p>
<pre><code>Graph: A connected to B, C; B to D; C to D; D to E.  Start at A.

BREADTH-FIRST SEARCH (queue; visit level by level):
  queue [A]; visit A -> neighbours B, C -> queue [B, C]
  visit B -> neighbour D -> queue [C, D]
  visit C -> neighbour D (already queued/visited) -> queue [D]
  visit D -> neighbour E -> queue [E]
  visit E -> queue []
  Order: A, B, C, D, E. Finds SHORTEST PATH in unweighted graphs (level order).

DEPTH-FIRST SEARCH (stack or recursion; dive to the end, then backtrack):
  visit A -> B (first neighbour)
  visit B -> D
  visit D -> E
  visit E -> backtrack to D -> backtrack to B -> backtrack to A
  visit C -> D already visited -> backtrack
  Order: A, B, D, E, C. Detects CYCLES and solves maze-like problems.

Both mark nodes visited - without that, cycles make them loop forever.
Complexity: O(V + E) with adjacency lists - every vertex and edge processed
once.</code></pre>
<p><strong>Dijkstra's algorithm</strong> (weighted shortest path) extends BFS with a priority queue: keep tentative distances from the source, always settle the nearest unsettled node, and relax (shorten) its neighbours' distances; O((V+E) log V) with a heap. The trace question walks one node's relaxation exactly this way.</p>

<h3>Worked example: algorithm choice for three problems</h3>
<pre><code>1. Find a name in an unsorted phone book (data streams in):
   linear search - no ordering to exploit; O(n).

2. Find a name in a sorted directory of 10^6 entries:
   binary search - O(log n) is about 20 comparisons; sorting once with
   merge sort (O(n log n)) then searching many times amortises quickly.

3. Find the shortest route between two towns on a weighted map:
   Dijkstra - BFS ignores the road distances; a greedy relaxation over a
   priority queue computes the true shortest path; complexity
   O((V+E) log V).</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Applying binary search to unsorted data; the sorted precondition is part of the answer.</li>
<li>Complexity claims without the mechanism ("bubble sort is O(n²)" needs nested loops and the swap rule).</li>
<li>Confusing best/average/worst case; quote worst unless asked.</li>
<li>Recursion without a reachable base case, or not moving toward it.</li>
<li>Forgetting the call stack's cost: recursion uses O(n) stack space even when the algorithm is O(1) in its own memory.</li>
<li>BFS versus DFS purpose swap: BFS = shortest unweighted path; DFS = cycles, connectivity, exhaustive paths.</li>
<li>Unmarked visited sets in graph traversal — infinite loops on cycles.</li>
<li>Merge sort's memory cost omitted; it is O(n) extra space, the standard trade against in-place O(n²) sorts.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 3, 4 marks).</strong> Trace bubble sort on [5, 3, 4, 1] for one pass and describe what the pass achieves.</p>
<p>Answer: Compare 5 and 3 → swap [3, 5, 4, 1]; 5 and 4 → swap [3, 4, 5, 1]; 5 and 1 → swap [3, 4, 1, 5]. The largest value (5) has bubbled to its final position; each pass places one more element, so n−1 passes complete the sort — O(n²).</p>
<p><strong>Question 2 (Unit 3, 4 marks).</strong> Explain why binary search is O(log n) and state its precondition.</p>
<p>Answer: Each comparison discards half the remaining range (compare against the middle, keep one half), so the number of comparisons grows with the number of halvings needed to reach one element — log₂n: a million items need at most 20. Precondition: the data must be sorted by the searched key.</p>
<p><strong>Question 3 (Unit 3, 5 marks).</strong> Write a recursive algorithm to compute the sum of an array and explain its base case.</p>
<p>Answer: FUNCTION sum(a, n): IF n = 0 THEN RETURN 0; ELSE RETURN a[n] + sum(a, n−1); ENDIF. The base case n = 0 returns 0 (empty array sums to zero), guaranteeing termination; each recursive call shrinks n by one toward it. Recursion depth is n, so iterative summation avoids stack growth for huge arrays.</p>
<p><strong>Question 4 (Unit 3, 5 marks).</strong> Compare BFS and DFS on an undirected graph.</p>
<p>Answer: BFS uses a queue and explores level by level, visiting all neighbours before descending — giving the shortest path in unweighted graphs and O(V+E) time, at the cost of queue memory. DFS uses a stack (or recursion) and dives along one path to its end before backtracking — suiting cycle detection, topological ordering and exhaustive search, with memory proportional to the deepest path. Both must mark visited vertices to terminate on cycles.</p>
<p><strong>Question 5 (Unit 3, 4 marks).</strong> Compare adjacency matrices and adjacency lists.</p>
<p>Answer: An adjacency matrix is a V×V grid giving O(1) edge-existence checks but O(V²) space — wasteful for sparse graphs. An adjacency list stores each vertex's neighbours, using O(V+E) space and fast edge iteration, but checking one edge takes O(degree). Dense graphs with frequent edge queries favour matrices; sparse graphs favour lists.</p>
<p><strong>Question 6 (Unit 3, 3 marks).</strong> Explain how Dijkstra's algorithm finds a shortest path and state its limitation.</p>
<p>Answer: It maintains tentative distances from the source, repeatedly settling the unvisited node with the smallest distance and relaxing its edges (updating neighbour distances when the new route is shorter). Once a node is settled its distance is final. Limitation: it requires non-negative edge weights — negative weights break the greedy finality, needing Bellman-Ford instead.</p>
<p>Algorithms need code to run on; the next note covers how programming paradigms structure that code.</p>
`,

    "7ca83ddb-a38f-4f06-b83c-8381e8e73560": `
<h2>Edexcel IAL Computer Science: Programming Paradigms and Object-Oriented Programming</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 3 Advanced Computer Science: programming paradigms, object-oriented programming, file processing and exception handling. A <strong>paradigm</strong> is a style of organising programs — a different answer to "what is a program made of?" — and this note compares the major ones before building object-oriented systems in full: encapsulation, inheritance, polymorphism and abstraction, each traced through concrete code.</p>

<h3>The paradigms</h3>
<table border="1" cellpadding="6">
<tr><th>Paradigm</th><th>Program is…</th><th>Strengths</th><th>Weaknesses</th></tr>
<tr><td>Procedural/imperative</td><td>Ordered instructions updating state</td><td>Direct, efficient, easy to trace</td><td>State sprawl; hard to reuse and reason about at scale</td></tr>
<tr><td>Object-oriented</td><td>Interacting objects bundling data and behaviour</td><td>Modularity, reuse through inheritance, modelling real entities</td><td>Overhead; deep hierarchies become brittle</td></tr>
<tr><td>Declarative (e.g. SQL, logic)</td><td>A description of the desired result</td><td>Concise; the system chooses the method</td><td>Less control over the procedure; unfamiliar reasoning</td></tr>
<tr><td>Functional</td><td>Pure functions composing values, no mutable state</td><td>Easy to reason about and parallelise; no side-effect bugs</td><td>Learning curve; awkward for stateful I/O</td></tr>
</table>
<p><strong>Event-driven</strong> programming (handlers reacting to user/system events) is a style layered over these — the paradigm of GUIs and games — worth naming whenever the question mentions interfaces.</p>

<h3>Object-oriented programming: the four pillars</h3>
<ul>
<li><strong>Encapsulation</strong> — bundle fields with the methods that operate on them, and hide internals behind an interface (private fields, public methods). A bank account's balance is private; deposit() and withdraw() are the only mutators — invalid states become unrepresentable.</li>
<li><strong>Inheritance</strong> — a subclass reuses and extends a superclass (Dog extends Animal), expressing "is-a" relationships and factoring shared code upward.</li>
<li><strong>Polymorphism</strong> — one interface, many implementations: a call like shape.area() dispatches to the correct class's method at run time (overriding), and overloading allows same-named methods with different parameter lists.</li>
<li><strong>Abstraction</strong> — expose essential behaviour and hide detail; abstract classes/interfaces define contracts that implementations must fulfil.</li>
</ul>
<pre><code>Python 3 - all four pillars in one system, traced:

  class Shape:                       # abstraction: a contract
      def area(self):
          raise NotImplementedError

  class Rectangle(Shape):            # inheritance: Rectangle is-a Shape
      def __init__(self, w, h):
          self.__w = w               # encapsulation: name-mangled private
          self.__h = h
      def area(self):                # overriding: polymorphic method
          return self.__w * self.__h

  class Circle(Shape):
      def __init__(self, r):
          self.__r = r
      def area(self):
          return 3.14159 * self.__r ** 2

  shapes = [Rectangle(3, 4), Circle(2)]   # one list, two types
  for s in shapes:
      print(s.area())                # polymorphic dispatch

Trace:
  s = Rectangle(3,4): area() resolves to Rectangle.area -> 12
  s = Circle(2):      area() resolves to Circle.area     -> 12.56636
  The CALLER never branches on type - the object knows its own behaviour.
  print(shapes[0].__w) would fail outside the class: encapsulation holds.</code></pre>
<p>Design vocabulary the exam expects: <strong>class</strong> (the blueprint), <strong>object</strong> (an instance), <strong>attributes</strong> (state), <strong>methods</strong> (behaviour), <strong>constructors</strong> (__init__ initialising valid state), <strong>message passing</strong> (objects collaborating via method calls), and <strong>delegation</strong> over deep inheritance ("has-a" composition is often better than "is-a" inheritance).</p>

<h3>Procedural decomposition in code</h3>
<p>Even inside paradigm debates, the exam wants to see structured code: one entry and exit per construct, no goto, clear naming, and subprograms with explicit interfaces. Decomposition maps a design's structure chart onto modules — a function per leaf — and the discipline of keeping functions short and side-effect-transparent is what makes later maintenance possible. Refactoring patterns name the moves: extracting a repeated block into a function, replacing a magic number with a named constant, and splitting a function that does two jobs into two that do one. Marks attach to showing the decomposition in the answer, not merely asserting that the code is structured.</p>

<h3>Translation software</h3>
<p>Recalling the AS foundation: <strong>compilers</strong> produce standalone executables (whole-program checks, fast execution), <strong>interpreters</strong> execute line by line (portable, immediate feedback), <strong>assemblers</strong> map mnemonics to machine code. A2 depth: multi-stage pipelines (source → lexer → parser → intermediate code → optimiser → code generator), the role of <strong>linkers</strong> (combining object files, resolving symbols) and <strong>loaders</strong> (placing code in memory), and virtual-machine targets (bytecode + JIT compiling hot paths at run time).</p>

<h3>File processing and exception handling</h3>
<p>File processing at A2 depth: sequential versus random-access files; text versus binary (binary is compact and exact for typed data but not human-readable); opening modes (read, write, append, read/write); and the <strong>exception</strong> model for the errors file work reliably produces.</p>
<pre><code>Python 3 - robust file processing with exceptions, line by line:

  try:
      with open("stock.dat", "rb") as f:      # binary, auto-closed
          while True:
              record = f.read(24)             # fixed-size records
              if not record:                  # clean end of file
                  break
              process(record)
  except FileNotFoundError:
      log("stock file missing - restore from backup")
  except PermissionError:
      log("no access - escalate to administrator")
  except (ValueError, struct.error) as e:     # corrupt record
      log("bad record skipped: " + str(e))
  else:
      log("processing complete")
  finally:
      close_resources()                       # ALWAYS runs

Reading the structure: try wraps risky work; each except catches one failure
type and handles it SEPARATELY; else runs only if no exception; finally always
runs (cleanup). Catching bare Exception hides bugs - name the failures you
expect. A missing finally leaks file handles on the error path.</code></pre>
<p>Exception philosophy: exceptions are for exceptional conditions (missing file, network failure, corrupt data), not ordinary control flow (end of loop is a condition, not an exception); propagate what you cannot handle meaningfully, handle at a layer that can; never swallow silently.</p>

<h3>Worked example: designing a small OOP system</h3>
<pre><code>Requirement: a ticket booking system with standard and concession tickets;
concessions are 30% off; both print a description.

1. Identify classes: Booking, Ticket (abstract), StandardTicket,
   ConcessionTicket, Customer.
2. Factor: shared behaviour (description, price calculation interface) goes
   in Ticket; differences go in subclasses - the Liskov-friendly shape.
3. Attributes: Ticket holds event, seat, base price; ConcessionTicket adds
   eligibility proof (encapsulated - checked in __init__).
4. Polymorphism: checkout() calls ticket.price() without branching.
5. Composition: Booking HAS Tickets and a Customer - "has-a", not "is-a".

class Ticket:
    def price(self): raise NotImplementedError

class StandardTicket(Ticket):
    def __init__(self, event, seat, base):
        self.event, self.seat, self.base = event, seat, base
    def price(self): return self.base

class ConcessionTicket(Ticket):
    def __init__(self, event, seat, base):
        self.event, self.seat, self.base = event, seat, base
    def price(self): return self.base * 0.7

Adding a VIP ticket later needs one new subclass and no change to checkout -
the open/closed principle in practice.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Describing inheritance as code reuse only; its exam meaning is an is-a relationship with substitutability (Liskov).</li>
<li>Confusing overloading (compile-time, same name different parameters) with overriding (run-time, subclass redefinition).</li>
<li>Public fields everywhere; encapsulation marks demand private state and controlled access.</li>
<li>Using exceptions for normal flow (EOF is a loop condition; input() returning a sentinel), or catching bare Exception.</li>
<li>finally omitted from file-handling answers — cleanup on the error path is the point.</li>
<li>Calling SQL "procedural" — it is declarative; the question loves this contrast.</li>
<li>Claiming a paradigm is universally best; answers weigh trade-offs per project shape.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 3, 4 marks).</strong> Explain encapsulation and why it improves software quality.</p>
<p>Answer: Encapsulation bundles an object's data with the methods operating on it and hides the data behind an interface (private attributes, public methods). It improves quality because invalid states become unrepresentable — all changes go through validated methods — internal representation can change without breaking clients, and bugs are localised to the class. A bank account exposing only deposit/withdraw cannot be given a negative balance by direct field pokes.</p>
<p><strong>Question 2 (Unit 3, 4 marks).</strong> Explain polymorphism with an example.</p>
<p>Answer: Polymorphism lets one interface serve many implementations, resolved at run time. A drawing program holds a list of Shape objects; calling shape.area() invokes Rectangle.area, Circle.area or Triangle.area depending on each object's actual class, without the caller branching on type. New shapes extend the system without modifying the loop — code is open for extension, closed for modification.</p>
<p><strong>Question 3 (Unit 3, 4 marks).</strong> Compare procedural and object-oriented paradigms.</p>
<p>Answer: Procedural programs are ordered procedures over shared data — straightforward to trace and efficient, but data and functions separate, so state bugs and reuse problems grow with size. OOP bundles state and behaviour into interacting objects, giving modularity, reuse via inheritance and natural modelling of real entities, at the cost of runtime overhead and the discipline needed to keep hierarchies shallow. Small scripting tasks suit procedural style; large evolving systems suit OOP.</p>
<p><strong>Question 4 (Unit 3, 5 marks).</strong> Describe how exceptions improve error handling over return codes.</p>
<p>Answer: With return codes every caller must remember to check them, and errors are easily ignored or mistaken for valid data. Exceptions separate error handling from the main path: try wraps risky work, except blocks handle specific failures at a layer that can respond, finally guarantees cleanup, and an unhandled exception cannot pass silently — it propagates until something handles it or the program reports it. This forces explicit treatment of failure and prevents corrupted state continuing.</p>
<p><strong>Question 5 (Unit 3, 4 marks).</strong> Explain the difference between a compiler and an interpreter and when each suits development.</p>
<p>Answer: A compiler translates the whole program to machine code ahead of execution, producing a fast standalone executable with whole-program diagnostics — suiting production release. An interpreter translates and runs statement by statement, giving immediate feedback and precise error locations but slower execution — suiting development and testing. Many modern systems combine both: compile to bytecode, then interpret or JIT-compile hot paths.</p>
<p><strong>Question 6 (Unit 3, 3 marks).</strong> Describe a situation where composition is preferred over inheritance.</p>
<p>Answer: When a class needs behaviour it does not semantically "is-a": a Car has-an Engine rather than is-a Vehicle-part hierarchy. Composition (holding an Engine object and delegating to it) keeps hierarchies shallow, allows swapping implementations at run time, and avoids the fragile base class problem where a superclass change breaks distant subclasses.</p>
<p>Unit 3's paradigms and structures feed directly into Unit 4's practical project discipline — where design, data and testing become documented process.</p>
`,
  },
};
