// Pilot batch: roughly doubles three existing study notes.
// Consumed by .freebuff/deepen-materials.cjs. Templates contain no backticks and no dollar-brace sequences.
module.exports = {
  rows: {
    "ab443e7e-11f0-4286-966f-b5ff4edc5835": `
<h2>Databases</h2>
<p>This note covers the Cambridge International AS &amp; A Level Computer Science 9618 content on databases: the structure of a relational database, keys and relationships, normalisation to third normal form, SQL for querying and changing data, and the transaction properties that keep data reliable. Each section ends with the points examiners reward.</p>

<h3>Relational basics</h3>
<p>A relational database stores data in tables (also called relations). Each table describes one type of entity. The columns are fields, each recording one attribute of the entity, and each row is a record holding one instance of the entity. A school might use a Students table (StudentID, Name, DateOfBirth), a Courses table (CourseID, Title, Fee) and an Enrolments table that links them.</p>
<p>Keys control how records are identified and linked:</p>
<ul>
<li><strong>Primary key</strong>: a field, or combination of fields, that uniquely identifies each record. It cannot be empty and it cannot repeat.</li>
<li><strong>Candidate key</strong>: any field or combination that could serve as the primary key. A table can have several candidate keys; one is chosen as the primary key.</li>
<li><strong>Composite key</strong>: a primary key made of two or more fields. In Enrolments, the pair (StudentID, CourseID) is a natural composite key because a student enrols on a course once.</li>
<li><strong>Foreign key</strong>: a field in one table that holds the primary key of a record in another table. It creates the relationship and lets the database enforce referential integrity, so an enrolment cannot refer to a student who does not exist.</li>
</ul>
<p>Relationships are described by how many records on each side can be linked. In a one-to-many relationship, one customer can place many orders but each order belongs to one customer, so the foreign key sits on the many side (Orders.CustomerID). A many-to-many relationship, such as students and courses, cannot be stored directly; it needs a junction table such as Enrolments, which holds two foreign keys.</p>

<h3>Data redundancy and why it matters</h3>
<p>Data redundancy means the same fact is stored more than once. It wastes storage, but the greater danger is inconsistency: a customer's address is changed in one copy and left unchanged in another, and the database then holds two different answers to the same question. Good design stores each fact in one place and links to it with keys. Normalisation is the systematic method for removing redundancy.</p>

<h3>Normalisation</h3>
<ul>
<li><strong>First normal form (1NF)</strong>: every field holds a single atomic value and there are no repeating groups. A cell listing "Maths; Physics" breaks 1NF.</li>
<li><strong>Second normal form (2NF)</strong>: the table is in 1NF and every non-key field depends on the whole primary key. This matters only when the key is composite; a partial dependency is a non-key field that depends on just part of it.</li>
<li><strong>Third normal form (3NF)</strong>: the table is in 2NF and no non-key field depends on another non-key field (no transitive dependency).</li>
</ul>
<p><strong>Worked example.</strong> Consider one table, Enrolments(StudentID, CourseID, StudentName, CourseFee). The key is the composite (StudentID, CourseID). StudentName depends only on StudentID, which is a partial dependency and breaks 2NF. CourseFee depends only on CourseID, another partial dependency. Moving StudentName to a Students table and CourseFee to a Courses table gives three tables whose non-key fields depend on the whole of their own keys. Check 3NF on the Courses table as well: if it held a DepartmentName that depended on DepartmentID rather than CourseID, that would be a transitive dependency, and the department would need its own table.</p>
<p>Normalising too far creates many small tables and more joins. The exam expects you to normalise to 3NF unless the question says otherwise.</p>

<h3>Querying with SQL</h3>
<p>SQL is the language used to create, read, change and delete data. The core statements are:</p>
<pre><code>SELECT Name, DateOfBirth
  FROM Students
  WHERE DateOfBirth &gt;= '2008-01-01'
  ORDER BY Name ASC;

INSERT INTO Students (StudentID, Name, DateOfBirth)
  VALUES (105, 'Amina Hassan', '2008-03-14');

UPDATE Students
  SET Name = 'Amina Ali'
  WHERE StudentID = 105;

DELETE FROM Students
  WHERE StudentID = 105;</code></pre>
<p>Two points are easy to lose marks on. First, an UPDATE or DELETE without a WHERE clause changes or removes every row in the table. Second, WHERE compares against field values, so text values are written in quotes and numbers are not.</p>
<p>Joins combine rows from two tables where a key matches. An inner join returns only the matching pairs:</p>
<pre><code>SELECT Students.Name, Courses.Title
  FROM Enrolments
  INNER JOIN Students ON Enrolments.StudentID = Students.StudentID
  INNER JOIN Courses ON Enrolments.CourseID = Courses.CourseID
  WHERE Courses.Title = 'Physics';</code></pre>
<p>The join condition must compare a primary key with the foreign key that refers to it. Joining on unrelated fields returns meaningless pairs.</p>

<h3>Transactions and integrity</h3>
<p>A transaction is a group of database operations that must succeed or fail together, such as debiting one account and crediting another. Transactions have the ACID properties:</p>
<ul>
<li><strong>Atomicity</strong>: all operations happen, or none do. A failed step triggers a rollback.</li>
<li><strong>Consistency</strong>: the database moves from one valid state to another, and rules such as keys and constraints still hold afterwards.</li>
<li><strong>Isolation</strong>: concurrent transactions do not see each other's partial work. Record locking stops two users changing the same record at once and losing one of the changes.</li>
<li><strong>Durability</strong>: once committed, a change survives a power failure or crash.</li>
</ul>
<p>Referential integrity and validation rules are further protections. A foreign key constraint refuses an enrolment that points at a missing student, and a range check refuses a mark of 150 out of 100.</p>

<h3>Exam tips</h3>
<ul>
<li>When asked to normalise, name the normal form you are reaching, state the dependency you have removed, and show the resulting tables with their keys.</li>
<li>When asked about a foreign key, say which table it sits in and which primary key it refers to.</li>
<li>Write SQL with the exact field and table names from the question, and always check the WHERE clause on UPDATE and DELETE.</li>
<li>For transactions, describe the all-or-nothing outcome and name the property being demonstrated.</li>
</ul>
`,
    "f35f2af5-9d17-40d9-8772-d181fa861e96": `
<h2>Functions</h2>
<p>This note builds the functions work used throughout the Cambridge AS &amp; A Level Mathematics 9709 course. A function maps each input in its <strong>domain</strong> to exactly one output in its <strong>range</strong>. Notation such as f(x) = 2x + 1 names the rule, and the examiner expects you to state domain, range and inverse clearly.</p>

<h3>Domain, range and notation</h3>
<p>The domain is the set of inputs the function accepts. Restrictions usually come from denominators (which cannot be zero), square roots (which need a non-negative argument) and logarithms (which need a positive argument). The range is the set of outputs the function actually produces over that domain. For f(x) = x² on all real numbers, the range is f(x) ≥ 0. Writing the domain as x ≥ 0 gives the same range but changes whether an inverse exists.</p>
<p>A many-to-one function, such as x² on all reals, sends two inputs to the same output. A one-to-one function never does. Only one-to-one functions have inverses.</p>

<h3>Composite functions</h3>
<p>The composite function fg(x) means f(g(x)): apply g first, then f to the result. Order matters, so in general fg(x) and gf(x) are different functions.</p>
<p><strong>Example:</strong> f(x) = 2x + 1 and g(x) = x².</p>
<ul>
<li>fg(x) = f(x²) = 2x² + 1</li>
<li>gf(x) = g(2x + 1) = (2x + 1)² = 4x² + 4x + 1</li>
</ul>
<p>When a restriction is involved, check the range of the inner function against the domain of the outer one. If g(x) = x − 3 with domain x ≥ 0 is followed by f(x) = √x, the range of g is x ≥ −3, which is wider than the domain of f, so the composite fg(x) = √(x − 3) needs x ≥ 3 to be defined. The exam often asks for this domain explicitly.</p>

<h3>Inverse functions</h3>
<p>The inverse f⁻¹ reverses the action of f, so f⁻¹(f(x)) = x. To find it, write y = f(x), swap x and y, then rearrange to make y the subject.</p>
<p><strong>Example:</strong> f(x) = 3x − 2. Write y = 3x − 2, swap to x = 3y − 2, then y = (x + 2)/3. So f⁻¹(x) = (x + 2)/3. Check by substituting: f(f⁻¹(x)) = 3 × (x + 2)/3 − 2 = x.</p>
<p>An inverse exists only if f is one-to-one on its domain. If it is not, restrict the domain to make it so. For f(x) = x² with domain x ≥ 0, the inverse is f⁻¹(x) = √x with domain x ≥ 0. Without the restriction, x² would have no single inverse, because both 3 and −3 square to 9.</p>
<p>The domain of f⁻¹ is the range of f, and the range of f⁻¹ is the domain of f. The graph of y = f⁻¹(x) is the reflection of y = f(x) in the line y = x, so a point (a, b) on f becomes (b, a) on f⁻¹. Use this to check an answer: if (2, 5) is on the graph of f, then (5, 2) must be on the graph of f⁻¹.</p>

<h3>Transformations of graphs</h3>
<p>Each change to the rule moves or stretches the graph in a predictable way. Learn these as a table:</p>
<table border="1" cellpadding="6">
<tr><th>Transformed graph</th><th>Effect on the graph of y = f(x)</th></tr>
<tr><td>y = f(x) + a</td><td>translation by a units up (a &lt; 0: down)</td></tr>
<tr><td>y = f(x + a)</td><td>translation by a units left (a &lt; 0: right)</td></tr>
<tr><td>y = a f(x)</td><td>vertical stretch, scale factor a</td></tr>
<tr><td>y = f(ax)</td><td>horizontal stretch, scale factor 1/a</td></tr>
<tr><td>y = −f(x)</td><td>reflection in the x-axis</td></tr>
<tr><td>y = f(−x)</td><td>reflection in the y-axis</td></tr>
</table>
<p>The horizontal translation runs against the sign: y = (x − 3)² is the graph of x² moved 3 units to the right. A common error is to move it left. For a sequence of transformations, apply them in the order the question gives, tracking a few key points such as the vertex or the intercepts.</p>

<h3>Method for exam questions</h3>
<ul>
<li>For a composite function, write out fg(x) and gf(x) separately whenever the question names two functions, and simplify each.</li>
<li>For an inverse, state both the rule and its domain. A correct rule with the domain missing loses marks.</li>
<li>To show a function has an inverse, argue that it is one-to-one on the stated domain, usually because it is strictly increasing or strictly decreasing there.</li>
<li>When sketching y = f⁻¹(x), reflect the graph of f in y = x and mark where the line crosses it, since that point lies on both graphs.</li>
</ul>
<p><strong>Exam cue:</strong> whenever a question says "hence" or "using your answer to part", the composite or inverse from the earlier part is usually the route to the answer, so keep it in simplified form.</p>
`,
    "c6799c2c-a5ca-4a0d-b962-7bf95e65b17d": `
<h2>Kinematics</h2>
<p>This note covers motion in a straight line and projectile motion for Cambridge AS &amp; A Level Physics 9702 (Mechanics). Kinematics describes how position, velocity and acceleration change with time, without asking what causes the motion. Most exam marks come from choosing the right tool, setting a sign convention, and reading graphs correctly.</p>

<h3>Definitions</h3>
<ul>
<li><strong>Distance</strong> and <strong>speed</strong> are scalars: they have magnitude only.</li>
<li><strong>Displacement</strong> s and <strong>velocity</strong> v are vectors: they have magnitude and direction. Displacement is the change in position, measured from a fixed origin.</li>
<li><strong>Velocity</strong> is the rate of change of displacement: v = ds/dt.</li>
<li><strong>Acceleration</strong> is the rate of change of velocity: a = dv/dt. An object moving at constant speed around a circle is accelerating, because its direction is changing.</li>
</ul>
<p>Speed is the magnitude of velocity. An object that travels 60 m in one direction and then 20 m back has a distance of 80 m and a displacement of 40 m.</p>

<h3>Interpreting graphs</h3>
<ul>
<li>On a displacement–time graph, the gradient is the velocity. A horizontal line means the object is at rest, and a steeper line means a higher speed.</li>
<li>On a velocity–time graph, the gradient is the acceleration. A straight line with constant gradient means uniform acceleration. A horizontal line means constant velocity.</li>
<li>The <strong>area under a velocity–time graph equals the displacement</strong>. Area below the time axis counts as negative, so a return journey partly cancels out.</li>
<li>On an acceleration–time graph, the area under the line equals the change in velocity.</li>
</ul>
<p><strong>Worked example.</strong> A velocity–time graph rises from 0 to 12 m s⁻¹ in 4 s, stays at 12 m s⁻¹ for 6 s, then falls to 0 in 3 s. The area of the triangle is ½ × 4 × 12 = 24 m, the rectangle is 6 × 12 = 72 m, and the final triangle is ½ × 3 × 12 = 18 m. The total displacement is 114 m. The accelerations are 3 m s⁻² for the first 4 s and −4 m s⁻² for the last 3 s.</p>

<h3>SUVAT equations (uniform acceleration only)</h3>
<p>SUVAT stands for displacement s, initial velocity u, final velocity v, acceleration a and time t. The four equations below apply only when acceleration is constant.</p>
<table border="1" cellpadding="6">
<tr><th>Equation</th><th>Quantity not involved</th></tr>
<tr><td>v = u + at</td><td>s</td></tr>
<tr><td>s = ut + ½at²</td><td>v</td></tr>
<tr><td>v² = u² + 2as</td><td>t</td></tr>
<tr><td>s = ½(u + v)t</td><td>a</td></tr>
</table>
<p>Choose the equation that omits the quantity you were not given and do not need. Writing down the list of known and unknown quantities first prevents most errors. Pick a sign convention at the start, normally taking the direction of motion, or up, as positive. For a body falling freely under gravity with up as positive, a = −9.81 m s⁻² (or −9.8 m s⁻² if the question uses g = 9.8).</p>
<p><strong>Worked example.</strong> A car accelerates from 5 m s⁻¹ to 25 m s⁻¹ at 2 m s⁻². The time is found from v = u + at: 25 = 5 + 2t, so t = 10 s. The distance follows from v² = u² + 2as: 625 = 25 + 4s, so s = 150 m. Check with s = ½(u + v)t = ½ × 30 × 10 = 150 m.</p>

<h3>Non-uniform motion</h3>
<ul>
<li>When acceleration is not constant, SUVAT cannot be used. Work from the graphs, or from a displacement function such as s = 3t² − t³, differentiating for velocity and acceleration.</li>
<li>Average speed is total distance divided by total time. Average velocity is total displacement divided by total time. These differ whenever the object changes direction.</li>
<li>The gradient at a point on a curved graph is the gradient of the tangent at that point. Estimate it by drawing the tangent carefully, and state which point you used.</li>
</ul>

<h3>Projectile motion</h3>
<p>A projectile moves under gravity alone, with air resistance ignored. Resolve the launch velocity into two independent components:</p>
<ul>
<li><strong>Horizontal</strong>: uₓ = u cos θ. There is no acceleration, so the horizontal velocity stays constant and s = uₓt.</li>
<li><strong>Vertical</strong>: u_y = u sin θ. The acceleration is g downwards, so SUVAT applies to this component alone.</li>
</ul>
<p>The two motions share only the time t. At the highest point the vertical velocity is zero, so the time to reach the top is u_y/g. If the object lands at the same height it was launched from, the time of flight is 2u_y/g.</p>
<p><strong>Worked example.</strong> A ball is launched at 20 m s⁻¹ at 30° above the horizontal from level ground. uₓ = 20 cos 30° ≈ 17.3 m s⁻¹ and u_y = 20 sin 30° = 10 m s⁻¹. The time of flight is 2 × 10 / 9.81 ≈ 2.04 s. The horizontal range is 17.3 × 2.04 ≈ 35 m. The maximum height is u_y²/(2g) = 100 / 19.62 ≈ 5.1 m.</p>

<h3>Exam tips</h3>
<ul>
<li>Write the sign convention at the top of your working. Many lost marks come from a sign error in a vertical question.</li>
<li>Check whether the question asks for speed or velocity, and distance or displacement. The words decide which quantity to give.</li>
<li>Treat the horizontal and vertical motions of a projectile as two one-dimensional problems linked only by time.</li>
<li>When a graph is given, say which feature (gradient or area) gives the quantity you want before you calculate it.</li>
</ul>
`,
  },
};
