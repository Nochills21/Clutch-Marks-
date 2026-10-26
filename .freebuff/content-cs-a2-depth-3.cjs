// Computer Science A2 batch 10 (final): Pearson Edexcel IAL Computer Science -
// encryption, encryption protocols and digital certificates (Unit 3 security
// depth); artificial intelligence and machine learning; simulation, sensors and
// real-world data handling. Apply:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-a2-depth-3.cjs > .freebuff-tmp/cs-a2-depth-3.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-a2-depth-3.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-a2-depth-3.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science A2
module.exports = {
  expectType: "notes",
  titles: {
    "b85187cd-a73d-45af-9ae1-f1616a80a393": "Edexcel IAL Computer Science: Encryption, Protocols and Digital Certificates",
    "133adf87-5244-40c1-a0b3-da5a3093d610": "Edexcel IAL Computer Science: Artificial Intelligence and Machine Learning",
    "10ed5d54-2c62-4360-a2d0-483a39f500af": "Edexcel IAL Computer Science: Simulation, Sensors and Real-World Data",
  },
  rows: {
    "b85187cd-a73d-45af-9ae1-f1616a80a393": `
<h2>Edexcel IAL Computer Science: Encryption, Protocols and Digital Certificates</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 3 Advanced Computer Science: encryption, encryption protocols and digital certificates. The AS security note covered threats and defence-in-depth; this note goes into the cryptography itself — how symmetric and asymmetric systems work under the hood, how protocols like TLS compose them into secure channels, and how certificates bind keys to identities. Every exchange below is traced message by message, because the marks sit in the sequence.</p>

<h3>The goals of cryptography</h3>
<p>Cryptography serves four properties, and each technique below should be read against them: <strong>confidentiality</strong> (only the intended reader), <strong>integrity</strong> (detect any change), <strong>authentication</strong> (prove who sent it), and <strong>non-repudiation</strong> (the sender cannot deny it). A plain lock (encryption) gives only the first; the rest need hashes, signatures and certificates.</p>

<h3>Symmetric encryption under the hood</h3>
<p>One shared secret key encrypts and decrypts. Modern ciphers (AES) work by <strong>substitution–permutation networks</strong>: repeated rounds that substitute bytes (confusion) and shuffle positions (diffusion), each round keyed from the original key by a key schedule — so a single flipped plaintext bit changes roughly half the ciphertext bits after a few rounds. Block ciphers process fixed blocks (AES: 128 bits) in a <strong>mode</strong> (CBC chains blocks by XOR-ing each plaintext block with the previous ciphertext block, requiring an initialisation vector; ECB — the naive mode — leaks patterns and is unsafe; CTR turns the block cipher into a stream).</p>
<pre><code>One AES-style round, conceptually:

  plaintext block (128 bits)
    -> AddRoundKey (XOR with round key)
    -> SubBytes (substitution table: confusion)
    -> ShiftRows (permute: diffusion)
    -> MixColumns (mix within columns: more diffusion)
  ... 10-14 rounds (key size dependent) ...
  -> ciphertext block

Property worth the mark: encryption itself is deterministic without the IV/mode,
so identical plaintext blocks would give identical ciphertext - the pattern
leak ECB suffers. CBC's XOR of the previous ciphertext block (and a random IV)
breaks that regularity.</code></pre>
<p>The symmetric strengths and weaknesses: very fast (bulk data), strong with adequate key lengths (AES-256); the weakness is the <strong>key distribution problem</strong> — every pair of communicators needs a shared secret, and every new pair multiplies the keys (n(n−1)/2 pairs) — plus key revocation and rotation logistics.</p>

<h3>Asymmetric encryption under the hood</h3>
<p>A mathematically related <strong>key pair</strong>: the public key encrypts (or verifies), the private key decrypts (or signs). RSA's mechanism rests on the trapdoor: multiplying two large primes is easy; factoring their product is computationally infeasible at key sizes of 2048+ bits. Elliptic-curve systems (ECC) give equivalent strength with far smaller keys, suiting mobile and TLS today.</p>
<pre><code>RSA, the shape of the maths (numbers exaggerated for clarity):

  1. Choose primes p = 61, q = 53.  n = p x q = 3233   (public modulus)
  2. phi(n) = (p-1)(q-1) = 3120.
  3. Choose public exponent e = 17 (coprime to 3120).
  4. Compute private exponent d: d x e = 1 mod 3120 -> d = 2753.
  5. Encrypt message m = 65:  c = m^e mod n = 65^17 mod 3233 = 2790.
  6. Decrypt:  m = c^d mod n = 2790^2753 mod 3233 = 65.  ✓

Security: publishing (n = 3233, e = 17) reveals nothing useful WITHOUT
factoring n; with real 2048-bit n, factoring is the infeasible step. Signing
runs the other way: the signer applies d, anyone verifies with e.</code></pre>
<p>Asymmetric strengths: no shared secret to distribute (the public key can be published), enabling signatures and non-repudiation; weakness: orders of magnitude slower than symmetric, so it is used for key exchange and signatures, not bulk data — the hybrid pattern below.</p>
<pre><code>Signatures and hashing, traced:

  Signing a message:
    hash = SHA-256(message)                 (fixed 256-bit digest)
    signature = RSA-encrypt(hash) with the SIGNER'S PRIVATE key
    send (message, signature)

  Verifying:
    compute hash1 = SHA-256(message)
    hash2 = RSA-decrypt(signature) with the signer's PUBLIC key
    match -> the message is unaltered AND only the private-key holder signed
             it (authentication AND non-repudiation).

A hash is one-way and collision-resistant: any edit changes the digest
completely (avalanche), so tampering is detectable even in large documents.</code></pre>

<table border="1" cellpadding="6">
<tr><th></th><th>Symmetric</th><th>Asymmetric</th></tr>
<tr><td>Keys</td><td>One shared secret</td><td>Public/private pair</td></tr>
<tr><td>Speed</td><td>Fast (AES)</td><td>Slow (RSA, ECC) — 100–1000× for bulk</td></tr>
<tr><td>Use</td><td>Bulk data encryption</td><td>Key exchange, signatures, certificates</td></tr>
<tr><td>Key distribution</td><td>Hard problem (n(n−1)/2 keys)</td><td>Public key can be published freely</td></tr>
<tr><td>Non-repudiation</td><td>No (either holder could have made the ciphertext)</td><td>Yes — signatures bind the private key</td></tr>
</table>

<h3>Hybrid systems and encryption protocols</h3>
<p>Real protocols combine the two families: use asymmetric cryptography to authenticate and agree a fresh symmetric <strong>session key</strong>, then encrypt the conversation symmetrically for speed. The session key is ephemeral — compromising it later decrypts nothing else.</p>
<pre><code>TLS handshake (HTTPS), message by message:

  Client                                    Server
    | --- ClientHello (ciphers, random) ---->|
    | <--- ServerHello (cipher chosen) ------|
    | <--- Certificate (server's public key) |
    | <--- ServerHelloDone ------------------|
    |    [client verifies the CERTIFICATE chain to a trusted CA]
    | --- KeyExchange (pre-master secret     |
    |     encrypted with server's public key)|
    | --- ChangeCipherSpec + Finished ------>|
    | <--- ChangeCipherSpec + Finished ------|
    Both now hold the same symmetric session key (derived from the secret).
    | <========== encrypted application data ==========> |

Why each step matters: Hello negotiates the cipher suite; the certificate
authenticates the server; the key exchange gives confidentiality (only the
private-key holder reads the pre-master secret); Finished confirms both sides
derived the same keys, defeating downgrade tampering.</code></pre>
<p>Related protocols: <strong>SSH</strong> (encrypted remote shell and transfer, authenticating hosts by keys), <strong>IPsec/VPNs</strong> (encrypting whole IP tunnels between sites), <strong>PGP/GPG</strong> (email signing/encryption with a web-of-trust model), <strong>WPA2/WPA3</strong> (Wi-Fi link encryption). Each solves the same composition problem for a different layer.</p>

<h3>Digital certificates and trust</h3>
<p>A <strong>digital certificate</strong> binds an identity to a public key, issued and signed by a <strong>certificate authority (CA)</strong> whose own key is trusted by the client's operating system/browser (the <strong>trust store</strong>). Contents: subject (domain), subject's public key, issuer, validity period, serial number, and the CA's signature. Verification walks the <strong>chain</strong> from the site's certificate up through intermediates to a trusted root.</p>
<ul>
<li><strong>Issuance:</strong> the applicant generates a key pair, sends a CSR (with proof of control over the domain), the CA validates (DV by email/DNS; EV with organisation checks) and signs.</li>
<li><strong>Revocation:</strong> compromised keys must die early — CRLs (revocation lists) and OCSP (live status queries); browsers check before trusting.</li>
<li><strong>Self-signed certificates</strong>: usable for testing only; no chain to a trusted root, so browsers warn — the mechanism, not mere "untrustworthiness", is the mark.</li>
<li><strong>Trust model weaknesses</strong> worth naming: a compromised CA can sign falsely; the system is only as strong as its least careful CA (notable incidents: DigiNotar).</li>
</ul>
<pre><code>Worked: verifying a certificate chain in a browser, step by step.

1. The server sends its certificate (leaf) plus intermediates.
2. The browser checks the leaf's validity period (not expired/not future).
3. It verifies the CA signature on the leaf using the intermediate's key.
4. It follows intermediates up to a root already in its trust store.
5. It checks the hostname matches the certificate's subject (SAN field).
6. It checks revocation status (OCSP/CRL) for the leaf and intermediates.

Any failure breaks the padlock: expired date (step 2), unknown issuer
(step 4 - self-signed), wrong domain (step 5 - another site's certificate),
or revoked key (step 6 - the compromised-key case).</code></pre>

<h3>Worked example: securing a web application end to end</h3>
<pre><code>Requirements: users log in, place orders, view invoices.

1. Transport: HTTPS everywhere (TLS 1.3), HSTS so plain HTTP never negotiates -
   protects credentials and cookies in transit.
2. Certificates: a CA-signed certificate with auto-renewal (certbot-style);
   monitor expiry - the classic outage is a lapsed certificate.
3. Passwords: stored as salted bcrypt/argon2 hashes (never reversible
   encryption); 2FA at login for account takeover resistance.
4. Sessions: random session IDs, Secure/HttpOnly/SameSite cookies, short
   expiry; CSRF tokens on state-changing requests.
5. Data at rest: card details tokenised (never stored raw); database backups
   encrypted with keys held separately.
6. Integrity: signed software releases (code-signing certificates) so the
   deployed application is provably what the team built.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying asymmetric encryption "is more secure"; it solves key distribution and signatures — security depends on key sizes and protocol design, not the family.</li>
<li>Forgetting that hashing alone proves integrity but not authorship; a shared hash proves nothing about who sent it — signatures add the private-key step.</li>
<li>Describing certificates as "encryption files"; a certificate is a signed binding of identity to public key.</li>
<li>Tracing TLS without the verification steps: the CA chain check and hostname match are the authentication marks.</li>
<li>Confusing CRL with OCSP (list pulled periodically vs live per-lookup) or missing revocation entirely.</li>
<li>Reusing session keys or calling them permanent; ephemerality limits the blast radius of compromise.</li>
<li>Claiming a padlock proves a site is honest; TLS proves the connection is private and the domain is authenticated — not the merchant's intent.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 3, 4 marks).</strong> Explain how symmetric and asymmetric encryption are combined in HTTPS.</p>
<p>Answer: Asymmetric encryption authenticates the server (its certificate carries a public key signed by a trusted CA) and encrypts a pre-master secret the client generates, so only the server's private key can read it. Both sides then derive the same ephemeral symmetric session key and encrypt the actual data with a fast symmetric cipher. This gets asymmetric's safe key agreement and symmetric's speed where the bulk flows.</p>
<p><strong>Question 2 (Unit 3, 4 marks).</strong> Describe how a digital signature provides authentication and non-repudiation.</p>
<p>Answer: The signer hashes the message and encrypts the digest with their private key; the signature travels with the message. A verifier decrypts the signature with the signer's public key and compares it with their own hash of the message. A match proves the message is unaltered (integrity) and that only the holder of the private key could have signed it (authentication), so the signer cannot later deny it (non-repudiation).</p>
<p><strong>Question 3 (Unit 3, 5 marks).</strong> Explain the role of certificate authorities in establishing trust.</p>
<p>Answer: A CA binds an identity to a public key by signing a certificate containing the subject, key, validity period and issuer. Clients hold trusted root CA keys in their trust store, so verifying the chain from the site's certificate up to a root proves the key belongs to that domain. CAs validate applicants (DV/EV), and revocation (CRL/OCSP) ends trust early if keys leak. The model's weakness is that any compromised CA can sign falsely — trust is only as strong as its weakest CA.</p>
<p><strong>Question 4 (Unit 3, 4 marks).</strong> Explain the key distribution problem and how it is addressed.</p>
<p>Answer: Symmetric encryption needs every communicating pair to share a secret key in advance; with n users that is n(n−1)/2 keys, and any interception of a distributed key compromises the channel. It is addressed by asymmetric key exchange (publishing a public key lets any party agree a session key securely), key distribution centres/protocols, and hybrid systems where asymmetric agreement hands over an ephemeral symmetric key.</p>
<p><strong>Question 5 (Unit 3, 3 marks).</strong> Explain why TLS uses a new session key for each connection.</p>
<p>Answer: Ephemeral keys limit exposure: if a session key is later compromised, only that one session's traffic is decryptable, not past or future ones. Fresh keys also resist replay attacks (old captured traffic under a different key reads as noise) and shrink the value of any single key theft.</p>
<p><strong>Question 6 (Unit 3, 4 marks).</strong> A browser warns that a certificate is invalid. Explain three possible causes.</p>
<p>Answer: The certificate has expired (outside its validity period); the chain cannot be verified to a trusted root (self-signed or an untrusted intermediate); the hostname does not match the certificate's subject/SAN (the certificate belongs to another domain); or the certificate has been revoked following key compromise. Each failure corresponds to one check of the verification process.</p>
<p>Cryptography protects channels between machines; the next note covers the software that increasingly acts within them — artificial intelligence.</p>
`,

    "133adf87-5244-40c1-a0b3-da5a3093d610": `
<h2>Edexcel IAL Computer Science: Artificial Intelligence and Machine Learning</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 3 Advanced Computer Science: artificial intelligence — its definitions and techniques, machine learning, and the engineering of AI systems. The AS ethics note touched AI's impact; this note is the technical depth: how models are represented, trained and evaluated, what the major technique families actually do, and where each one fails. Training loops and search traces are walked step by step.</p>

<h3>What AI is, precisely</h3>
<p><strong>Artificial intelligence</strong> is software performing tasks we would call intelligent if a human did them — perception, reasoning, learning, planning, language. The classic distinction: <strong>strong AI</strong> (general, human-equivalent understanding — not achieved) versus <strong>narrow AI</strong> (excellent at one defined task — everything deployed today). The test questions: the Turing test (can a machine's conversational behaviour be distinguished from a human's?) and the Chinese Room argument (symbol manipulation without understanding — a philosophical objection worth naming).</p>
<p>Two great families of technique: <strong>symbolic AI</strong> (search and logic — the system reasons over explicit representations) and <strong>machine learning</strong> (the system's behaviour is fitted to data). Modern systems mix them.</p>

<h3>Search and reasoning</h3>
<p>Many AI problems are <strong>state-space search</strong>: a start state, goal states, and operators moving between states; the task is to find a path. Strategies: <strong>uninformed</strong> (breadth-first, depth-first — see the graph traversal note) and <strong>informed/heuristic</strong> (best-first, A* using an evaluation function; minimax for games).</p>
<pre><code>Game playing with minimax, traced on tic-tac-toe:

  Minimax assumes both players play perfectly: MAX maximises the score,
  MIN minimises it.

  Look ahead from a position where MAX can win immediately in one of three
  moves (moves a, b, c):
    move a -> terminal +1 (win for MAX)
    move b -> after MIN's best reply, 0 (draw)
    move c -> after MIN's best reply, -1 (loss)
  MAX chooses move a: min/max over children = +1.

  Alpha-beta pruning cuts branches that cannot change the decision: if move a
  already guarantees +1, MIN's reply to move b is never examined once b's
  subtree provably scores below +1. The search depth decides strength and
  time - "explain the trade-off" is the follow-up mark.</code></pre>

<h3>Expert systems</h3>
<p>An <strong>expert system</strong> encodes human expertise as rules over a knowledge base, applied by an inference engine: <strong>forward chaining</strong> (data-driven: match facts against rules, fire conclusions, repeat — diagnosis) and <strong>backward chaining</strong> (goal-driven: to prove X, find rules concluding X, prove their conditions — configuration). Uncertainty handling (confidence factors) and explanation facilities (which rules fired) are their design strengths; brittleness outside the encoded knowledge and the knowledge-engineering bottleneck are their limits.</p>
<pre><code>Forward chaining traced (simplified fault diagnosis):

  Knowledge base:
    R1: IF engine_wont_start AND lights_dim        THEN battery_flat
    R2: IF battery_flat                            THEN charge_battery
    R3: IF engine_wont_start AND lights_ok          THEN starter_fault

  Facts: engine_wont_start, lights_dim.
  Cycle 1: R1's conditions match -> conclude battery_flat.
  Cycle 2: R2's condition matches -> conclude charge_battery.
  Cycle 3: no new rules fire -> stop. Output: charge_battery.

  Notice R3 never fires (lights_ok is false) - the matching is exact.</code></pre>

<h3>Machine learning, in depth</h3>
<p>Machine learning fits behaviour to data. The three learning styles (supervised: labelled examples; unsupervised: structure in unlabelled data; reinforcement: reward-driven trial) and their main methods:</p>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Task</th><th>Mechanism</th><th>Failure modes</th></tr>
<tr><td>Decision trees</td><td>Classification/regression</td><td>Greedy splits maximising information gain</td><td>Overfitting deep trees; unstable to small data changes</td></tr>
<tr><td>k-nearest neighbours</td><td>Classification</td><td>Majority vote of the k closest training points</td><td>Curse of dimensionality; slow at scale</td></tr>
<tr><td>Naive Bayes</td><td>Classification (spam)</td><td>Posterior probabilities assuming feature independence</td><td>Independence assumption rarely holds exactly</td></tr>
<tr><td>Linear/logistic regression</td><td>Prediction/classification</td><td>Fit weights minimising error</td><td>Misses non-linear structure</td></tr>
<tr><td>Neural networks</td><td>Perception, language, games</td><td>Layers of weighted units trained by backpropagation</td><td>Opaque; data-hungry; brittle off-distribution</td></tr>
</table>
<pre><code>Neural network training, one epoch traced:

  Layer: inputs x1, x2 -> weights w -> weighted sum -> activation -> output.
  1. Forward: prediction = f(w1x1 + w2x2 + bias).
  2. Loss: measure error against the true label (e.g. squared error).
  3. Backpropagation: compute dLoss/dw for each weight (chain rule from the
     output layer backwards).
  4. Update: w <- w - learningRate * dLoss/dw   (gradient descent).
  5. Repeat across all examples; many epochs until validation loss plateaus.

  The activation function must be non-linear (sigmoid, ReLU) or the whole
  network collapses to one linear model - a favourite "why" question.

Overfitting diagnosis: training accuracy 99%, validation 70% - the model
memorised the training set. Remedies: more data, regularization, dropout,
early stopping on the validation curve.</code></pre>
<p><strong>Evaluation</strong> is where marks live: a train/validation/test split (or k-fold cross-validation); a <strong>confusion matrix</strong> (true/false positives/negatives) giving <strong>accuracy</strong>, <strong>precision</strong> (of the positives predicted, how many correct), <strong>recall</strong> (of the real positives, how many found), and F1 balancing them. Class imbalance exposes plain accuracy (a 99%-negative dataset is "99% accurate" predicting all negative); the choice of metric follows the cost of each error — medical screening values recall, spam filtering values precision.</p>
<pre><code>Confusion matrix worked (200 patients, 20 have the disease):

                      predicted +   predicted -
  actual + (20)            16            4
  actual - (180)            8          172

  accuracy  = (16 + 172) / 200 = 0.94
  precision = 16 / (16 + 8)    = 0.667
  recall    = 16 / (16 + 4)    = 0.80

Reading: 94% accuracy LOOKS strong, but a third of positive alarms are false
(24 alarms, 8 wrong) and a fifth of cases are missed (4 of 20). Which number
matters depends on the harm of each error - the medical context says recall.</code></pre>

<h3>Applications and their technique</h3>
<ul>
<li><strong>Natural language processing</strong> — tokenisation, embeddings, sequence models; translation, summarisation, chatbots, sentiment.</li>
<li><strong>Computer vision</strong> — convolutional networks; classification, detection, segmentation (self-driving perception, medical imaging).</li>
<li><strong>Robotics</strong> — perception + planning + control; SLAM for mapping and localisation.</li>
<li><strong>Recommender systems</strong> — collaborative filtering (users like you) and content-based (item similarity).</li>
<li><strong>Speech</strong> — recognition (audio to text) and synthesis (text to audio).</li>
</ul>

<h3>Worked example: building and evaluating a classifier</h3>
<pre><code>Task: flag fraudulent card transactions.

1. Data: 6 months of transactions labelled fraud/legitimate (0.2% fraud -
   heavily imbalanced from the start).
2. Features: amount, time, location distance from last transaction, merchant
   category, spending-rate change. (Feature engineering matters more than the
   model choice at this level.)
3. Split: 60/20/20 train/validation/test, stratified so fraud rate is present
   in all splits.
4. Train several models (logistic regression baseline, decision tree, neural
   net); select on the validation set by RECALL at an acceptable precision -
   missing fraud costs more than a false alarm review.
5. Test once, honestly: confusion matrix on the held-out test set.
6. Deploy with monitoring: live drift detection (feature distributions shift;
   fraud patterns evolve), periodic retraining, and a human-review loop for
   flagged cases.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying machine learning "is programmed with rules"; rules are learned from data — that is the definition.</li>
<li>Reporting accuracy on imbalanced data without precision/recall; the metric choice is the mark.</li>
<li>Testing on training data (or tuning on the test set) — the test set is touched once.</li>
<li>Confusing overfitting (high train, low validation) with underfitting (both low) — the diagnosis drives different remedies.</li>
<li>Describing neural networks as "simulating the brain" in place of the mechanism: weighted layers, activation, backpropagation.</li>
<li>Claiming AI systems understand their outputs; the Chinese Room point and brittleness off-distribution are the honest limits.</li>
<li>Forgetting reinforcement learning's exploration/exploitation trade-off in RL answers.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 3, 4 marks).</strong> Explain the difference between supervised and unsupervised learning with examples.</p>
<p>Answer: Supervised learning trains on labelled examples — inputs paired with correct outputs — minimising prediction error; e.g. learning spam/ham from emails marked by users. Unsupervised learning finds structure in unlabelled data; e.g. clustering customers by purchasing behaviour with no predefined groups. Supervision needs labelled data (costly) but evaluates against truth; unsupervised discovers patterns a human might not define.</p>
<p><strong>Question 2 (Unit 3, 5 marks).</strong> Describe how a neural network is trained.</p>
<p>Answer: Initialise weights randomly; run a forward pass computing a prediction through weighted layers and non-linear activations; compute the loss against the true label; backpropagate the error to find each weight's gradient; update weights against the gradient scaled by the learning rate. Repeat over many examples and epochs until validation performance plateaus, with techniques like early stopping and regularisation against overfitting.</p>
<p><strong>Question 3 (Unit 3, 4 marks).</strong> Explain overfitting and two ways to prevent it.</p>
<p>Answer: Overfitting is when a model memorises training data's noise and idiosyncrasies instead of the general pattern — high training accuracy but poor validation/test accuracy. Prevention: use more representative training data; regularise (penalise complexity), use dropout in neural nets, stop training early when the validation curve degrades, and prefer simpler models when performance is comparable.</p>
<p><strong>Question 4 (Unit 3, 5 marks).</strong> A disease-screening model has 95% accuracy on data where 2% of patients are positive. Explain why accuracy alone is misleading and which metrics matter.</p>
<p>Answer: Predicting "negative" for everyone yields 98% accuracy while catching nothing — so accuracy hides failure on the minority class. The confusion matrix gives precision (of those flagged, how many truly ill — false alarms' cost) and recall (of the truly ill, how many flagged — missed diagnoses' cost). For screening, recall dominates (a missed case is dangerous); the F1 score balances both, and the confusion matrix itself is the honest picture.</p>
<p><strong>Question 5 (Unit 3, 4 marks).</strong> Explain how a recommender system based on collaborative filtering works.</p>
<p>Answer: It builds a user–item matrix of ratings or behaviours, finds users with similar taste patterns (nearest neighbours in that space), and recommends items those similar users rated highly but the target user has not seen. Strength: no item knowledge needed. Weaknesses: cold start (new users/items have no data) and popularity bias (rare items rarely recommended).</p>
<p><strong>Question 6 (Unit 3, 3 marks).</strong> Explain the difference between a symbolic expert system and a machine learning system.</p>
<p>Answer: An expert system stores human knowledge as explicit IF–THEN rules applied by an inference engine — transparent and explainable, but limited to encoded knowledge and costly to build. A machine learning system derives its decision function from data — scalable to perceptual tasks and improves with data, but opaque and dependent on data quality, and unable to reason beyond its training distribution.</p>
<p>The last note of the course covers how models and systems meet the physical world: simulation, sensors and real-world data.</p>
`,

    "10ed5d54-2c62-4360-a2d0-483a39f500af": `
<h2>Edexcel IAL Computer Science: Simulation, Sensors and Real-World Data</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 3/Unit 4: computer simulation and modelling, sensors and data capture, and the handling of real-world data — its messiness, validation, and the visualisation that makes it usable. These are the topics where the exam's scenario questions live: a flood model, a weather station, a clinical trial dataset. Every model below is walked through its loop, because simulation questions mark the loop, not the name.</p>

<h3>Simulation and modelling</h3>
<p>A <strong>model</strong> is a simplified representation of a system; a <strong>simulation</strong> runs that model over time to observe behaviour that may be impossible, dangerous, slow or expensive to observe on the real system. Why simulate: safety (crash tests, disaster planning), cost (flight training without aircraft), speed (compressing years of climate into hours), and experimentation with impossible scenarios (a dam's failure, a pandemic's spread).</p>
<table border="1" cellpadding="6">
<tr><th>Model type</th><th>Method</th><th>Suits</th></tr>
<tr><td>Continuous (mathematical)</td><td>Differential equations stepped through time</td><td>Physics, climate, population dynamics</td></tr>
<tr><td>Discrete-event</td><td>State changes at event times; a clock jumps to each event</td><td>Queues, factories, network traffic</td></tr>
<tr><td>Monte Carlo</td><td>Thousands of random samples; aggregate the outcomes</td><td>Risk, finance, uncertainty estimates</td></tr>
<tr><td>Agent-based</td><td>Autonomous agents following local rules; macro behaviour emerges</td><td>crowds, ecosystems, markets</td></tr>
</table>
<pre><code>Discrete-event simulation traced: a bank queue.

  State: queue length, teller busy/idle, clock.
  Events: ARRIVAL, DEPARTURE.

  clock 08:00  ARRIVAL A -> queue 1; teller idle -> serve A; schedule
               DEPARTURE 08:05
  clock 08:02  ARRIVAL B -> queue 1 (teller busy); B waits
  clock 08:04  ARRIVAL C -> queue 2
  clock 08:05  DEPARTURE A -> teller free -> serve B (queue 1);
               schedule DEPARTURE 08:09
  clock 08:09  DEPARTURE B -> serve C (queue 0)
  ...
  Collect: average wait, max queue, teller utilisation.

  Run it again with different arrival rates (or random draws) to find the
  teller count meeting a "95% wait under 5 minutes" target - the purpose of
  the exercise.</code></pre>
<p><strong>Monte Carlo</strong> method, traced: to estimate pi, sample random (x, y) points in the unit square and count those with x² + y² ≤ 1 — the ratio converges to π/4. More seriously: sampling thousands of market or epidemic paths gives outcome distributions rather than single predictions — the technique behind risk models.</p>
<p>Simulation validity is the critical-thinking mark: a model is only as good as its assumptions; <strong>verification</strong> (does the model do what was intended?) differs from <strong>validation</strong> (does it match reality?); random inputs need realistic distributions; and outputs carry uncertainty that must be reported, not presented as fact.</p>

<h3>Model design and its assumptions</h3>
<p>Building a model is choosing what to leave out — and the exam rewards naming those choices. A flood model treats the river channel as a shape and rain as an input rate; it ignores debris, tides and the farmer's culvert. Each abstraction is an assumption with a validity range: outside it (an unprecedented storm) the model's output is extrapolation, not prediction. Sensitivity analysis tests which assumptions matter — vary each parameter and watch the output; a result that swings wildly on one uncertain input is fragile and must be reported as such. Documentation of assumptions is what turns a demonstration into an artefact a decision-maker can trust.</p>

<h3>Sensors and data capture</h3>
<p>A <strong>sensor</strong> converts a physical quantity into an electrical signal the system reads: temperature (thermistor/thermocouple), light (LDR/photodiode), pressure, humidity, motion (PIR/accelerometer), sound, pH, flow. The signal chain from world to data: sensing → analogue signal → <strong>conditioning</strong> (amplify, filter noise) → <strong>analogue-to-digital conversion</strong> (sample and quantise — the Unit 1 representation work in hardware) → microcontroller → storage or transmission.</p>
<ul>
<li><strong>Sampling settings:</strong> rate (must exceed twice the fastest change — Nyquist) and resolution (bits of the ADC decide measurement granularity).</li>
<li><strong>Calibration:</strong> mapping raw readings to true values against known references; drift requires periodic recalibration.</li>
<li><strong>Error sources:</strong> noise (random — smoothed by averaging or filtering), bias (systematic — fixed by calibration), drift, quantisation, and placement (an unshielded temperature sensor reads the sun, not the air).</li>
<li><strong>Logging and transmission:</strong> local buffering when offline, batch upload, and battery/scheduling trade-offs in remote deployments (a weather station sleeps between readings).</li>
</ul>
<pre><code>Worked: a river flood-warning station.

  Sensors: water-level ultrasonic ranger (sampled every 5 min), rainfall
  tipping-bucket (event-counted), temperature for compensation.
  Signal chain: analogue level -> amplifier -> 12-bit ADC -> microcontroller.
  Noise handling: median of 5 readings per sample (rejects a stuck-ping
  outlier); moving average for the displayed trend.
  Validation: level must be 0-8 m (range check); sudden 3 m jumps rejected
  as sensor faults unless the rainfall counter agrees (cross-check).
  Transmission: hourly GPRS batch upload; local ring buffer of 7 days.
  Alerting: threshold + rate-of-rise rule (level rising 0.5 m/hour warns
  earlier than a simple high-water mark).
  Calibration: manual staff-gauge reading weekly; offset corrected in code.</code></pre>

<h3>Real-world data: messy, then usable</h3>
<p>Real data breaks textbook assumptions: missing values, duplicates, inconsistent formats (dates in three styles, units mixed), outliers, and errors of capture. The pipeline the exam expects:</p>
<ul>
<li><strong>Collection</strong> — decide what to measure and the granularity; document the method.</li>
<li><strong>Cleaning</strong> — handle missing values (delete, impute mean/median, or model), remove duplicates, standardise formats and units, correct or flag outliers (decide: error or genuine extreme?).</li>
<li><strong>Integration</strong> — merge sources with matching keys; reconcile conflicting values.</li>
<li><strong>Analysis</strong> — descriptive statistics (mean, median, mode, range, standard deviation); identify trends and correlations — with the warning that correlation is not causation.</li>
<li><strong>Visualisation</strong> — choose the chart for the question: line (trends over time), bar (comparison), histogram (distribution), scatter (relationship), pie (composition of a whole — sparingly).</li>
<li><strong>Interpretation</strong> — state conclusions with their uncertainty and the limitations of the data.</li>
</ul>
<pre><code>Worked: cleaning a hospital admissions dataset.

  raw rows: 12,411
  1. duplicates (same patient ID + timestamp): 213 removed -> 12,198
  2. date formats ("03/04/26", "2026-04-03", "3 Apr 26") standardised to ISO
  3. ages: 4 rows "150", "−3", "n/a" -> out-of-range rejected; n/a imputed
     from the median age ONLY for aggregate analysis (flagged, not invented)
  4. admission_ward: inconsistent casing/spelling ("A&E", "a and e") mapped
     to a controlled vocabulary
  5. stay_duration recalculated from standardised dates (derived field beats
     trusting the raw column)
  6. descriptive stats on the clean set: mean stay 4.2 days, median 3.0,
     std dev 3.1 - the mean/median gap reveals the skewed long-stay tail.

  The rule: document every cleaning decision; deleting outliers silently is
  how honest data becomes misleading data.</code></pre>
<p><strong>Big data context:</strong> volume, velocity, variety, veracity (the four Vs) describe why traditional tools fail; sampling and streaming strategies, and privacy obligations over personal data, accompany every real-world dataset. <strong>Correlation versus causation</strong> earns its own marks: two series moving together may share a third cause, and the experiment or domain reasoning must justify a causal claim.</p>

<h3>Worked example: from sensor to decision</h3>
<pre><code>A greenhouse climate model: temperature, humidity and CO2 sensors feed a
simulation that predicts tomorrow's conditions and controls vents/heaters.

1. Capture: sensors sampled each minute; ADC resolution 0.1 C.
2. Clean: range checks; median filter; calibration offsets applied.
3. Model: a discrete-time heat/moisture model (loss per hour depends on the
   delta to outside temperature and wind).
4. Simulate: run the model forward with forecast weather; Monte Carlo over
   forecast uncertainty to get a spread of outcomes.
5. Decide: if the 5th percentile of predicted overnight temperature drops
   below 4 C, pre-heat before sunset (acting early beats reacting).
6. Verify: compare yesterday's prediction with today's measured reality;
   re-fit parameters weekly - the model earns trust by tracking truth.</code></pre>

<h3>Statistical measures in practice</h3>
<p>Real-world analysis rests on a small kit of measures, each answering one question. The <strong>mean</strong> summarises central tendency but is pulled by outliers; the <strong>median</strong> resists them (a skewed stay-length distribution reads median 3.0 against mean 4.2); the <strong>mode</strong> names the most common value (category data). <strong>Range</strong> and <strong>standard deviation</strong> describe spread — the standard deviation being the typical distance from the mean. <strong>Correlation</strong> (Pearson's r between −1 and +1) measures linear association, not cause. Choosing the right pair and reading their disagreement is a recurring exam skill: when mean and median diverge, the data is skewed and the honest summary says so.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying simulation "predicts the future"; it explores model behaviour under assumptions — output uncertainty must be reported.</li>
<li>Confusing verification with validation: built right versus matches reality.</li>
<li>Ignoring sampling rate vs signal frequency (aliasing) or ADC resolution vs required precision in sensor answers.</li>
<li>Treating missing values as zero; zeros are data, blanks are absence — the handling changes statistics.</li>
<li>Quoting correlation as causation in data questions.</li>
<li>Choosing visualisations that mislead (truncated y-axes, pie charts for many categories); the chart must fit the question.</li>
<li>Silent outlier removal: state the criterion and the effect, because genuine extremes may be the finding.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 3, 4 marks).</strong> Explain why a flight simulator is used instead of real training flights.</p>
<p>Answer: Simulation safely reproduces rare and dangerous situations (engine failure, severe weather) that cannot be risked for training, at a fraction of the cost of operating aircraft, with unlimited repetition and instant reset. The model's fidelity is validated against real flight data, and trainees can pause and review — none of which is possible in the air.</p>
<p><strong>Question 2 (Unit 3, 4 marks).</strong> Describe the difference between discrete-event and continuous simulation.</p>
<p>Answer: Continuous simulation advances the whole system state in fixed time steps governed by differential equations — suiting smoothly varying systems like climate or population. Discrete-event simulation jumps the clock directly between state-changing events (arrivals, departures) and processes each in order — suiting queues, factories and networks where nothing happens between events. Discrete-event is efficient for sparse activity; continuous fits dense, gradual change.</p>
<p><strong>Question 3 (Unit 3, 4 marks).</strong> Explain two sources of error in sensor measurements and how each is handled.</p>
<p>Answer: Random noise (electrical interference, fluctuation) distorts individual readings — handled by sampling multiple readings and filtering (median or moving average). Systematic bias (the sensor reads consistently high due to calibration drift) shifts all readings — handled by calibrating against a known reference and applying a correction, with periodic recalibration. Range checks reject physically impossible values before use.</p>
<p><strong>Question 4 (Unit 3, 5 marks).</strong> Describe the steps in preparing real-world data for analysis.</p>
<p>Answer: Collect with a documented method and granularity. Clean: remove duplicates, standardise formats and units, resolve missing values (delete, impute or flag — never treat as zero), handle outliers with a stated criterion. Integrate sources by matching keys. Analyse with descriptive statistics and trends. Visualise with charts fitted to the question. Interpret with uncertainty and limitations stated, and avoid causal claims from correlation alone.</p>
<p><strong>Question 5 (Unit 3, 4 marks).</strong> Explain what is meant by verification and validation of a simulation model.</p>
<p>Answer: Verification checks the model is built correctly — the code implements the intended equations and rules (tested against hand calculations). Validation checks the model is a good representation of reality — its outputs match real observations within tolerance. A model can be verified yet invalid (the wrong equations faithfully implemented), so both are required before trusting results.</p>
<p><strong>Question 6 (Unit 3, 3 marks).</strong> Explain why a Monte Carlo simulation runs thousands of trials.</p>
<p>Answer: Random sampling of uncertain inputs produces a distribution of outcomes rather than a single number; thousands of trials make that distribution stable enough to estimate probabilities (e.g. the 5% worst-case flood height) and quantify uncertainty. The aggregate statistics converge as trials increase — one run would be an anecdote, not a risk estimate.</p>
<p>With this note the Computer Science estate is complete: IGCSE 0478 Papers 1 and 2, and the Edexcel IAL Units 1–4 framework, each note at the exam-grade depth standard.</p>
`,
  },
};
