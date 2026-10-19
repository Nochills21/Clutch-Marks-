// Batch r1: deepens seven thin CS notes (OL and AS) toward 3000+ characters.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "230d770c-b169-4153-b7a0-41297244195b": `
<h3>Worked example: tracing a linear search</h3>
<p>Take the list 14, 7, 22, 9, 31 and search for 22. Start at index 0 and compare: 14 is not 22, so move on. Index 1 holds 7, not a match. Index 2 holds 22, which matches, so the algorithm returns index 2 and stops. If the target were 40, every element would be compared and the algorithm would report that the value is absent after checking all five. A trace table with columns for index, value compared and result makes this easy to show in an exam answer.</p>
<h3>Common mistakes in algorithm questions</h3>
<ul>
<li>Stopping a loop one element too early or too late. Check the start value, the end condition and whether the upper bound is inclusive.</li>
<li>Confusing a counter with the value being tested. Trace both variables separately.</li>
<li>Writing pseudocode without a clear output. Always state what the algorithm returns or prints.</li>
</ul>
`,
    "410f9140-4fa3-467e-8cac-852bafc28653": `
<h3>Worked example: building an expression from a circuit</h3>
<p>A circuit gives Q = (A AND B) OR NOT C. Build it in stages: first the AND gate on A and B, then a NOT gate on C, then an OR gate combining the two outputs. A truth table with columns A, B, C, then the intermediate AND output, NOT C and finally Q, has eight rows for three inputs. Set out every row in order so that no combination is missed.</p>
<h3>Simplifying with Boolean laws</h3>
<p>Laws such as De Morgan's theorem let you rewrite NOT (A AND B) as NOT A OR NOT B. Use them to reduce a gate count before drawing a circuit. Always check a simplified expression against the original truth table, because a single misapplied law changes the output for some inputs.</p>
`,
    "11594218-4521-43d6-bccd-fb79cda469b4": `
<h3>Worked example: working out a subnet</h3>
<p>A device has the IP address 192.168.1.10 with the subnet mask 255.255.255.0. Applying the mask with a bitwise AND gives the network address 192.168.1.0. The first usable host address is 192.168.1.1 and the last is 192.168.1.254, because the all-zeros address is the network and the all-ones address is the broadcast. Question setters often ask for the broadcast address, which here is 192.168.1.255.</p>
<h3>Packets, protocols and layers</h3>
<ul>
<li>A message is split into packets. Each packet carries a header with the source and destination addresses and a sequence number so the receiver can rebuild the message in order.</li>
<li>Protocols define the rules for each layer. TCP checks for lost packets and requests a resend, while UDP sends without that checking, which suits live video and gaming.</li>
</ul>
`,
    "f2259878-433e-406d-9dea-7531aff6d69a": `
<h3>Worked example: a loop that totals marks</h3>
<p>Suppose a program must add up five test marks and print the average. Set a total variable to 0 before the loop. Repeat five times: read a mark, add it to the total. After the loop, divide the total by 5 and output the result. Tracing the variables on paper with marks 60, 70, 80, 90 and 100 gives totals of 60, 130, 210, 300 and 400, so the printed average is 80. Exam answers are marked on the logic, so write each step even when a shorter program would work.</p>
<h3>Choosing between selection and iteration</h3>
<p>Use selection (IF or CASE) when the program must choose one route. Use iteration (FOR, WHILE or REPEAT) when the same steps must run several times. A FOR loop suits a known count, while a WHILE loop suits a count that depends on input, because its condition is checked before each pass.</p>
`,
    "f4ec1c0b-4462-46b9-98fe-457d9fbd7e90": `
<h3>Worked example: a sensor-driven robot</h3>
<p>A robot moves forward while an ultrasonic sensor reports distances greater than 20 cm. When the reading falls to 20 cm or less, the robot stops and turns right, then resumes. Describe this as input (distance reading), process (compare the reading with the threshold) and output (motor commands). Mark schemes reward naming each part of the control loop: sensing, decision and actuation.</p>
<h3>Sensors, actuators and feedback</h3>
<ul>
<li>A sensor converts a physical quantity such as light, temperature or distance into a signal. An actuator converts an electrical signal into motion, such as a motor or servo.</li>
<li>Feedback means the output is measured and used to correct the next action. Without feedback a robot cannot adjust when conditions change, such as a wheel slipping on a wet floor.</li>
</ul>
`,
    "37c076d2-e903-4a57-8672-96dd9b97fbec": `
<h3>Worked example: GET or POST</h3>
<p>A search box on a website sends the query in the URL, for example the request GET search?q=fractions. This is a GET request, and the address can be bookmarked. A login form sends the password in the body of a POST request, so it does not appear in the URL or in browser history. Knowing which method a form uses, and why, is a common short-answer point.</p>
<h3>Client-side and server-side validation</h3>
<ul>
<li>Client-side validation runs in the browser and gives fast feedback, such as rejecting an empty email field before anything is sent.</li>
<li>Server-side validation runs on the web server and is essential, because client-side checks can be bypassed by anyone who edits the request.</li>
</ul>
`,
    "c1d1652f-cd1f-4ce5-b824-a753d5fc6db0": `
<h3>Worked example: transfer time and latency</h3>
<p>A 2 Mbit file sent over a link of 1 Mbit per second takes 2 seconds to transfer, ignoring overheads. Latency is the delay before the first bit arrives, and it adds to the total time. If the latency is 0.2 seconds, the complete delivery takes about 2.2 seconds. Stating which quantity you are calculating, and the units, earns method marks even when the final figure is slightly off.</p>
<h3>Bandwidth and the shared medium</h3>
<ul>
<li>Bandwidth is the maximum data rate of a link. Actual throughput is lower when many devices share the medium, because they take turns or collide.</li>
<li>Wired connections such as Ethernet usually give more stable speeds than wireless, which is affected by distance, walls and interference.</li>
</ul>
`
  }
};
