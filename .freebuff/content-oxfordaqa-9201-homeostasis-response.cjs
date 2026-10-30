// OxfordAQA International GCSE Biology 9201 — topic 3.4 Organisms' interaction
// with the environment.
// Statements covered: 3.4.1 The human nervous system, 3.4.2 Homeostasis, 3.4.3
// Control of water and ion content of the body, 3.4.4 Temperature control,
// 3.4.5 Control of blood glucose, 3.4.6 Behaviour, 3.4.7 Infection and response.
//
// Seven subsections, one mechanism: a receptor detects a change, a coordinator
// compares it with a set point, and an effector reverses it. Teaching the loop
// once and then applying it to water, temperature and glucose is what stops the
// three from being memorised as three unrelated lists.
module.exports = {
  topicSlug: "organisms-interaction-with-the-environment",
  title: "IGCSE Biology (OxfordAQA): Response and Homeostasis",
  html: `<h2>Response and Homeostasis</h2>
<p>Organisms survive by responding to change, and the body does most of that without asking. This topic covers the two systems that produce the response — nerves, which act in milliseconds, and hormones, which act over minutes or hours — and then the four conditions the body fights to keep constant: water and ion content, temperature, blood glucose, and the internal environment that pathogens threaten. Every one of those is the same loop: a receptor detects a change, a coordination centre compares it with a set point, and an effector reverses the change. Learn the loop once and the four examples become applications rather than four separate lists to memorise.</p>

<h3>1. The nervous system</h3>
<p>The nervous system has two parts: the central nervous system (brain and spinal cord), which coordinates the response, and the peripheral nerves, which carry information to and from it. Information travels as electrical impulses along neurones.</p>
<ul>
  <li><strong>Sensory neurone</strong> — carries an impulse from a receptor to the central nervous system.</li>
  <li><strong>Relay neurone</strong> — inside the spinal cord or brain, connecting sensory to motor neurones.</li>
  <li><strong>Motor neurone</strong> — carries an impulse from the central nervous system to an effector, a muscle or gland.</li>
  <li><strong>Synapse</strong> — the gap between two neurones. A chemical neurotransmitter diffuses across it, which slows the impulse slightly but allows signals to be passed in one direction only.</li>
</ul>
<p>A <strong>reflex action</strong> is an automatic, rapid response that does not involve conscious thought, and it protects the body. The reflex arc runs: stimulus → receptor → sensory neurone → relay neurone in the spinal cord → motor neurone → effector → response. Because the relay neurone sits in the spinal cord, the response happens before the brain has processed the pain, which is why you snatch your hand back from a hot pan before you feel it.</p>

<h3>2. Homeostasis and negative feedback</h3>
<p>Homeostasis is the maintenance of a constant internal environment. It matters because enzymes and cells work within narrow limits: a few degrees too warm and enzymes denature, too little water and cells lose their shape.</p>
<p>A <strong>negative feedback</strong> loop reverses any change from the set point. If blood glucose rises, the body responds in a way that lowers it; if it falls, the body responds in a way that raises it. A <strong>positive feedback</strong> loop would amplify the change, and the body avoids those except in specific events such as childbirth.</p>
<p>The three components are worth naming in every answer: a <strong>receptor</strong> detects the change, a <strong>coordination centre</strong> (brain, spinal cord or a gland) processes it, and an <strong>effector</strong> produces the response. "The body reacts" earns nothing; "the pancreas detects the rise and secretes insulin, which causes the liver to store glucose" earns all three marks.</p>

<h3>3. Water and ion balance</h3>
<p>Water enters in food and drink and leaves in urine, sweat, exhaled air and faeces. The kidneys keep the balance by filtering the blood and reabsorbing what the body needs, and the volume and concentration of urine is the visible output of that decision.</p>
<ul>
  <li><strong>Too little water</strong> (or much sweating): the pituitary gland releases more ADH, the kidneys reabsorb more water, and urine becomes small in volume and concentrated.</li>
  <li><strong>Too much water</strong> (after drinking a lot): less ADH is released, less water is reabsorbed, and urine becomes large in volume and dilute.</li>
  <li><strong>Ions</strong> are regulated the same way: excess ions are excreted in urine, and ions lost in sweat are replaced from the diet.</li>
</ul>
<p>Kidney failure is treated by dialysis, which removes waste and excess water by diffusion across a partially permeable membrane, or by a transplant. Dialysis has to be repeated several times a week because it works intermittently; a working transplanted kidney does the job continuously, but the immune system must be suppressed to stop rejection.</p>

<h3>4. Temperature control</h3>
<p>The body's core temperature is held near 37 °C. A part of the brain called the hypothalamus is the coordination centre, and the effectors are the skin's blood vessels, sweat glands and muscles.</p>
<table border="1">
  <tr><th>Too hot</th><th>Effect</th><th>Too cold</th><th>Effect</th></tr>
  <tr><td>Vasodilation</td><td>Blood vessels near the skin widen, so more blood flows there and more heat is lost by radiation</td><td>Vasoconstriction</td><td>Vessels narrow, so less blood reaches the surface and less heat is lost</td></tr>
  <tr><td>Sweating</td><td>Water evaporates from the skin, taking heat energy with it</td><td>Shivering</td><td>Muscles contract rapidly, and respiration in them releases heat</td></tr>
  <tr><td>Hairs lie flat</td><td>Less air is trapped, so less insulation</td><td>Hairs stand up</td><td>Air is trapped as insulation</td></tr>
</table>
<p>Fever is the same mechanism working to a different set point, which is why a feverish person shivers even though their temperature is high: the body is trying to reach the new, higher set point.</p>

<h3>5. Blood glucose</h3>
<p>The pancreas monitors blood glucose and releases two hormones with opposite effects. Insulin lowers glucose; glucagon raises it.</p>
<ul>
  <li><strong>After a meal</strong>, glucose rises. The pancreas releases insulin, which makes the liver and muscles take up glucose and store it as glycogen, and fat cells store it as fat. Glucose falls.</li>
  <li><strong>During exercise or fasting</strong>, glucose falls. The pancreas releases glucagon, which makes the liver break glycogen down into glucose and release it into the blood. Glucose rises.</li>
  <li><strong>Type 1 diabetes</strong> — the pancreas does not produce enough insulin, so glucose stays high. It is treated with insulin injections, diet and exercise.</li>
  <li><strong>Type 2 diabetes</strong> — the body's cells stop responding to insulin. It is managed mainly by diet, weight loss and exercise, and is linked to obesity.</li>
</ul>
<p>Both types cause glucose to appear in urine, because the kidney cannot reabsorb it all. That is why urine testing was the original diagnostic test.</p>

<h3>6. Worked example: water balance</h3>
<p>A student drinks 2.0 dm³ of water in a day and loses 0.6 dm³ in urine, 1.0 dm³ in sweat and 0.4 dm³ in exhaled air. Calculate the net water balance, and predict what happens to ADH release if sweating then doubles.</p>
<p>total loss = 0.6 + 1.0 + 0.4 = 2.0 dm³, so the balance is 2.0 − 2.0 = 0 dm³ and the body is in balance. If sweat loss rises to 2.0 dm³, total loss becomes 3.0 dm³, so 1.0 dm³ more water has been lost than taken in.</p>
<p><em>Key:</em> intake = water taken in (dm³); total loss = urine + sweat + exhaled water (dm³); balance = intake − total loss; a negative balance means the body must conserve water.</p>
<p>With a negative balance, more ADH is released, the kidneys reabsorb more water and the urine becomes smaller in volume and more concentrated. That single sentence answers most of the water-balance questions in this topic.</p>

<h3>7. Behaviour</h3>
<p>Not every response is internal. Behaviour is a response that involves the whole organism moving or acting, and it is often the fastest way to cope with a change.</p>
<ul>
  <li><strong>Courtship behaviour</strong> helps individuals recognise a mate of the same species, synchronise breeding and choose a healthy partner.</li>
  <li><strong>Taxes and kineses</strong> are directed or undirected movements in response to a stimulus: woodlice move away from light and towards damp, which keeps them from drying out.</li>
  <li><strong>Circadian rhythms</strong> are daily cycles, such as sleeping at night, controlled by internal clocks that light resets.</li>
  <li><strong>Social behaviour</strong>, such as a warning call, can protect relatives, which is why it persists despite the risk to the caller.</li>
</ul>

<h3>8. Infection and response</h3>
<p>A pathogen is a microorganism that causes disease — bacteria, viruses, fungi or protists. Diseases spread by direct contact, in the air, in water, in food, or through vectors such as mosquitoes.</p>
<ul>
  <li><strong>The body's first line:</strong> skin, mucus, cilia, stomach acid and tears, which stop pathogens entering.</li>
  <li><strong>The immune response:</strong> white blood cells engulf pathogens (phagocytosis), produce antibodies that are specific to one antigen, and produce antitoxins that neutralise toxins.</li>
  <li><strong>Vaccination</strong> introduces a dead or inactive pathogen so the body makes antibodies and memory cells; a later infection is fought before symptoms appear.</li>
  <li><strong>Antibiotics</strong> kill bacteria but not viruses, which is why antibiotics do not treat a cold.</li>
  <li><strong>Antibiotic resistance</strong> develops because bacteria vary, and the ones that survive treatment reproduce — which is why the full course must be completed and antibiotics should not be used for viral infections.</li>
</ul>
<p>Because antibodies are specific, a person who has had measles has memory cells for measles and is unlikely to catch it again, but has no protection against mumps. That specificity is also why a new vaccine is needed for each strain of a virus that mutates quickly.</p>

<h3>9. Typical mistakes</h3>
<ul>
  <li>Saying a reflex "goes to the brain and back". The relay neurone is in the spinal cord; that is what makes the response fast.</li>
  <li>Confusing insulin and glucagon. Insulin lowers glucose; glucagon raises it.</li>
  <li>Describing vasodilation as "blood vessels get wider to cool the blood" without saying that more blood reaches the surface and more heat is radiated.</li>
  <li>Claiming sweat cools the body because it is cold. It cools by evaporating, which takes heat from the skin.</li>
  <li>Saying antibiotics cure flu, or that a vaccine kills the pathogen directly. A vaccine trains the immune response.</li>
  <li>Writing "white blood cells eat germs" without naming antibodies, antigens or memory cells where the question asks for the immune response.</li>
  <li>Forgetting that ADH makes urine more concentrated, not more dilute.</li>
</ul>

<h3>10. Exam-style questions</h3>
<ol>
  <li>Describe the pathway of a reflex arc when a hand touches a hot pan. <em>Answer:</em> The temperature receptor in the skin detects the heat, a sensory neurone carries the impulse to the spinal cord, a relay neurone passes it to a motor neurone, which carries it to the arm muscle, and the muscle contracts to pull the hand away.</li>
  <li>Explain why reflex actions are useful. <em>Answer:</em> They are automatic and rapid because they do not involve conscious thought, so the body avoids damage before the brain has processed the pain.</li>
  <li>Explain what happens to ADH release after a person sweats heavily. <em>Answer:</em> Water loss lowers blood water content, so more ADH is released from the pituitary gland, the kidneys reabsorb more water and urine becomes smaller in volume and more concentrated.</li>
  <li>Explain how the body cools itself on a hot day. <em>Answer:</em> Vasodilation brings more blood to the skin surface so more heat is radiated, and sweating increases so evaporation removes heat energy from the skin.</li>
  <li>Compare insulin and glucagon. <em>Answer:</em> Both are released by the pancreas; insulin lowers blood glucose by making the liver store it as glycogen, while glucagon raises it by making the liver break glycogen down.</li>
  <li>Explain why antibiotics are not prescribed for viral infections. <em>Answer:</em> Antibiotics kill bacteria and have no effect on viruses, so they would not treat the infection and would increase the risk of antibiotic resistance.</li>
  <li>Explain how vaccination protects a person against a disease. <em>Answer:</em> It introduces a dead or inactive pathogen, so white blood cells produce antibodies and memory cells; on later infection the memory cells make antibodies quickly, before symptoms develop.</li>
  <li>A person loses 1.8 dm³ of water in sweat, 0.5 dm³ in urine and 0.4 dm³ in exhaled air, and drinks 2.4 dm³. Calculate the net balance. <em>Answer:</em> total loss = 1.8 + 0.5 + 0.4 = 2.7 dm³; balance = 2.4 − 2.7 = −0.3 dm³, so the body has lost 0.3 dm³ more than it took in.</li>
</ol>

<h3>11. Revision checklist</h3>
<ul>
  <li>I can name the three neurone types and describe a synapse.</li>
  <li>I can order a reflex arc and explain why it is fast.</li>
  <li>I can define homeostasis and describe a negative feedback loop.</li>
  <li>I can explain how ADH controls water reabsorption.</li>
  <li>I can describe vasodilation, vasoconstriction, sweating and shivering.</li>
  <li>I can explain insulin, glucagon and the difference between type 1 and type 2 diabetes.</li>
  <li>I can give examples of behavioural responses and their value.</li>
  <li>I can describe the body's defences, the immune response, vaccination and antibiotic resistance.</li>
</ul>
`,
};
