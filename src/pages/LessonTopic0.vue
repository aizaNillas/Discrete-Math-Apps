<template>
  <div class="lesson-container">
    <!-- ✅ Lesson AFTER Pre-Test -->
    <div>
      <h5 class="title">📚 Discrete Mathematics</h5>
      <!-- Normal Lesson View -->
      <div v-if="!showImplication">
        <div v-for="(topic, index) in topics" :key="index" class="content-box" v-show="selectedTopic === null || selectedTopic === index">
          <h5 @click="toggleTopic(index)" class="clickable-title" :ref="'topicTitle-' + index">
            {{ topic.title }} {{ selectedTopic === index ? "" : "" }}
          </h5>
          <div v-if="selectedTopic === index">
            <!-- Main Topic Card -->
            <div class="topic-card">
              <div class="card-header">
                <h5>{{ topic.title }}</h5>
              </div>
              <div class="card-body">
                <p v-html="formatContent(topic.content)"></p>
              </div>
            </div>

            <!-- Existing problem boxes (unchanged) -->
            <div v-if="topic.problem" class="problem-box">
              <h4>🔍 Try This</h4>
              <p><strong><span style="color: red;">❓</span> {{ topic.problem.question }}</strong></p>
              <button @click="toggleSolution(index, 'main')" class="solve-button">
                {{ showSolution[index].main ? "🔽 Hide Solution" : "🔍 Show Solution" }}
              </button>
              <div v-if="showSolution[index].main">
                <p v-for="(step, stepIndex) in topic.problem.steps" :key="stepIndex">
                  <button @click="toggleStep(index, stepIndex, 'main')" class="step-button">
                    Step {{ stepIndex + 1 }}
                  </button>
                  <span v-if="revealedSteps[index].main.includes(stepIndex)">➡️ {{ step }}</span>
                </p>
              </div>
            </div>
            <div v-if="topic.altProblem" class="problem-box">
              <h4>Try Again</h4>
              <p><strong><span style="color: red;">❓</span> {{ topic.altProblem.question }}</strong></p>
              <button @click="toggleSolution(index, 'alt')" class="solve-button">
                {{ showSolution[index].alt ? "🔽 Hide Solution" : "🔍 Show Solution" }}
              </button>
              <div v-if="showSolution[index].alt">
                <p v-for="(step, stepIndex) in topic.altProblem.steps" :key="stepIndex">
                  <button @click="toggleStep(index, stepIndex, 'alt')" class="step-button">
                    Step {{ stepIndex + 1 }}
                  </button>
                  <span v-if="revealedSteps[index].alt.includes(stepIndex)">➡️ {{ step }}</span>
                </p>
              </div>
            </div>

            <!-- Topic 0: What is Discrete Mathematics -->
            <div v-if="index === 0">
              <!-- Goals of Discrete Mathematics Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5><strong> Goals of Discrete Mathematics</strong></h5>
                </div>
                <div class="card-body">
                  <ol>
                    <li>
                      <strong>Mathematical Reasoning</strong>
                      <div class="explanation-card">
                        <div class="explanation-header"> Explanation</div>
                        <div class="explanation-body">
                          Mathematical reasoning is the process of thinking logically about mathematics. It involves analyzing mathematical concepts, making connections between them, and applying logical principles to solve problems and draw conclusions.
                        </div>
                      </div>
                    </li>
                    <li>
                      <strong>Algorithmic Thinking</strong>
                      <div class="explanation-card">
                        <div class="explanation-header"><strong> Explanation</strong></div>
                        <div class="explanation-body">
                          Developing step-by-step procedures to solve problems efficiently.
                        </div>
                      </div>
                    </li>
                    <li>
                      <strong>Modeling Real-World Problems</strong>
                      <div class="explanation-card">
                        <div class="explanation-header"> Explanation</div>
                        <div class="explanation-body">
                          Representing practical situations using discrete mathematical structures.
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              <!-- Applications and Modeling Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5> Applications and Modeling in Discrete Mathematics</h5>
                </div>
                <div class="card-body">
                  <p>It's often said that mathematics is useful in solving a very wide variety of practical problems. Discrete mathematics, broadly conceived, underpins about half of pure mathematics and of operations research as well as all of computer science.</p>
                </div>
              </div>

              <!-- Everyday Examples Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5> Examples of Discrete Mathematics in Everyday Life</h5>
                </div>
                <div class="card-body">
                  <div class="example-grid">
                    <div class="example-card">
                      <div class="example-icon">💻</div>
                      <div class="example-content">
                        <strong>Computers & Files</strong>
                        <p>Software and files are stored as strings of 1s and 0s (binary)</p>
                      </div>
                    </div>
                    <div class="example-card">
                      <div class="example-icon">🌐</div>
                      <div class="example-content">
                        <strong>Networks</strong>
                        <p>Internet routers connected by cables form discrete structures</p>
                      </div>
                    </div>
                    <div class="example-card">
                      <div class="example-icon">🗺️</div>
                      <div class="example-content">
                        <strong>Google Maps</strong>
                        <p>Uses graph theory to find fastest routes</p>
                      </div>
                    </div>
                    <div class="example-card">
                      <div class="example-icon">🔐</div>
                      <div class="example-content">
                        <strong>Encryption</strong>
                        <p>Cryptography relies on number theory and discrete math</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Topic 1: Combinatorial Analysis -->
            <div v-if="index === 1">
              <!-- Main Concept Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5> Key Concepts in Combinatorial Analysis</h5>
                </div>
                <div class="card-body">
                  <p>Combinatorial Analysis is the mathematics of counting, arranging, and selecting objects. It provides tools for solving problems where we need to determine the number of possible arrangements or selections.</p>
                </div>
              </div>

              <!-- 1. Basic Counting Principles Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5>1️⃣ Basic Counting Principles</h5>
                </div>
                <div class="card-body">
                  <!-- Addition Principle Card -->
                  <div class="principle-card">
                    <div class="principle-header">
                      <h6>➕ Addition Principle</h6>
                    </div>
                    <div class="principle-body">
                      <p><strong>Rule:</strong> If a task can be done in m ways or n ways (mutually exclusive), total ways = m + n</p>
                      <div class="definition-card">
                        <div class="definition-header">📐 Formula</div>
                        <div class="definition-body">
                          <code>Total = m + n</code>
                        </div>
                      </div>
                      
                      <!-- Example Problem Card -->
                      <div class="example-problem-card">
                        <div class="problem-header">
                          <h6> Example Problem</h6>
                        </div>
                        <div class="problem-body">
                          <p><strong>Problem:</strong> A student can choose Math 101 (3 sections) OR Math 102 (5 sections). How many choices?</p>
                          
                          <button @click="toggleExample('additionExample')" class="solve-button">
                            {{ showExamples.additionExample ? "🔽 Click to Hide Solution" : "Click to Show Solution" }}
                          </button>
                          
                          <div v-if="showExamples.additionExample" class="solution-steps">
                            <div v-for="(step, stepIndex) in exampleSteps.additionExample" :key="'add-' + stepIndex" class="step-card">
                              <button @click="toggleExampleStep('additionExample', stepIndex)" class="step-button-card">
                                <span class="step-number">Step {{ stepIndex + 1 }}</span>
                                <span class="step-title">{{ step.title }}</span>
                              </button>
                              <div v-if="revealedExampleSteps.additionExample.includes(stepIndex)" class="step-content-card">
                                <div v-html="step.content"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Multiplication Principle Card -->
                  <div class="principle-card">
                    <div class="principle-header">
                      <h6>✖️ Multiplication Principle</h6>
                    </div>
                    <div class="principle-body">
                      <p><strong>Rule:</strong> If a task has k steps with n₁, n₂, ..., nₖ ways each, total ways = n₁ × n₂ × ... × nₖ</p>
                      <div class="definition-card">
                        <div class="definition-header">📐 Formula</div>
                        <div class="definition-body">
                          <code>Total = n₁ × n₂ × ... × nₖ</code>
                        </div>
                      </div>
                      
                      <!-- Example Problem Card -->
                      <div class="example-problem-card">
                        <div class="problem-header">
                          <h6>Example Problem</h6>
                        </div>
                        <div class="problem-body">
                          <p><strong>Problem:</strong> Restaurant offers 4 sandwiches, 3 drinks, 2 desserts. How many meal combinations?</p>
                          
                          <button @click="toggleExample('multiplicationExample')" class="solve-button">
                            {{ showExamples.multiplicationExample ? "🔽 Click to Hide Solution" : "Click to Show Solution" }}
                          </button>
                          
                          <div v-if="showExamples.multiplicationExample" class="solution-steps">
                            <div v-for="(step, stepIndex) in exampleSteps.multiplicationExample" :key="'mult-' + stepIndex" class="step-card">
                              <button @click="toggleExampleStep('multiplicationExample', stepIndex)" class="step-button-card">
                                <span class="step-number">Step {{ stepIndex + 1 }}</span>
                                <span class="step-title">{{ step.title }}</span>
                              </button>
                              <div v-if="revealedExampleSteps.multiplicationExample.includes(stepIndex)" class="step-content-card">
                                <div v-html="step.content"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. Permutations Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5><strong>2️⃣ Permutations</strong></h5>
                </div>
                <div class="card-body">
                  <div class="definition-card">
                    <div class="definition-header">
                      <h7> Definition</h7>
                    </div>
                    <div class="definition-body">
                      <p>Arrangements of elements <strong>where order matters</strong>.</p>
                    </div>
                  </div>
                  
                  <!-- Formula Card -->
                  <div class="formula-card">
                    <div class="formula-header">
                      <h6>📐 Formulas</h6>
                    </div>
                    <div class="formula-body">
                      <div class="formula-row">
                        <div class="formula-item">
                          <strong>All n items:</strong>
                          <div class="definition-card">
                            <div class="definition-header"> Formula</div>
                            <div class="definition-body">
                              <code>P(n) = n!</code>
                            </div>
                          </div>
                          <div class="explanation-card">
                            <div class="explanation-header"> Explanation</div>
                            <div class="explanation-body">
                              n! = n × (n-1) × (n-2) × ... × 2 × 1
                            </div>
                          </div>
                        </div>
                        <div class="formula-item">
                          <strong>r out of n items:</strong>
                          <div class="definition-card">
                            <div class="definition-header"> Formula</div>
                            <div class="definition-body">
                              <code>P(n, r) = n!/(n-r)!</code>
                            </div>
                          </div>
                          <div class="explanation-card">
                            <div class="explanation-header"> Explanation</div>
                            <div class="explanation-body">
                              Choose r items from n and arrange them in order
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Example Problem Card -->
                  <div class="example-problem-card">
                    <div class="problem-header">
                      <h6> Example Problem</h6>
                    </div>
                    <div class="problem-body">
                      <p><strong>Problem:</strong> In a race with 8 runners, how many ways to award gold, silver, and bronze medals?</p>
                      
                      <button @click="toggleExample('permutationExample')" class="solve-button">
                        {{ showExamples.permutationExample ? "🔽 Click to Hide Solution" : "Click to Show Solution" }}
                      </button>
                      
                      <div v-if="showExamples.permutationExample" class="solution-steps">
                        <div v-for="(step, stepIndex) in exampleSteps.permutationExample" :key="'perm-' + stepIndex" class="step-card">
                          <button @click="toggleExampleStep('permutationExample', stepIndex)" class="step-button-card">
                            <span class="step-number">Step {{ stepIndex + 1 }}</span>
                            <span class="step-title">{{ step.title }}</span>
                          </button>
                          <div v-if="revealedExampleSteps.permutationExample.includes(stepIndex)" class="step-content-card">
                            <div v-html="step.content"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 3. Combinations Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5>3️⃣ Combinations</h5>
                </div>
                <div class="card-body">
                  <div class="definition-card">
                    <div class="definition-header">
                      <h7> Definition</h7>
                    </div>
                    <div class="definition-body">
                      <p>Selections of elements <strong>where order does NOT matter</strong>.</p>
                    </div>
                  </div>
                  
                  <!-- Formula Card -->
                  <div class="formula-card">
                    <div class="formula-header">
                      <h6>📐 Formula</h6>
                    </div>
                    <div class="formula-body">
                      <div class="definition-card">
                        <div class="definition-header"> Formula</div>
                        <div class="definition-body">
                          <code>C(n, r) = n!/(r!(n-r)!)</code>
                        </div>
                      </div>
                      <div class="explanation-card">
                        <div class="explanation-header"> Explanation</div>
                        <div class="explanation-body">
                          Also written as <code>ⁿCᵣ</code> or binomial coefficient. Divides permutations by r! to remove order arrangements.
                        </div>
                      </div>
                      <div class="definition-card">
                        <div class="definition-header">
                          <h7> Important Property</h7>
                        </div>
                        <div class="definition-body">
                          <code>C(n, r) = C(n, n-r)</code>
                          <p>Choosing r items is same as choosing which (n-r) items to leave out.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Example Problem Card -->
                  <div class="example-problem-card">
                    <div class="problem-header">
                      <h6> Example Problem</h6>
                    </div>
                    <div class="problem-body">
                      <p><strong>Problem:</strong> Form a committee of 4 from 10 volunteers. How many different committees?</p>
                      
                      <button @click="toggleExample('combinationExample')" class="solve-button">
                        {{ showExamples.combinationExample ? "🔽 Click to Hide Solution" : "Click to Show Solution" }}
                      </button>
                      
                      <div v-if="showExamples.combinationExample" class="solution-steps">
                        <div v-for="(step, stepIndex) in exampleSteps.combinationExample" :key="'comb-' + stepIndex" class="step-card">
                          <button @click="toggleExampleStep('combinationExample', stepIndex)" class="step-button-card">
                            <span class="step-number">Step {{ stepIndex + 1 }}</span>
                            <span class="step-title">{{ step.title }}</span>
                          </button>
                          <div v-if="revealedExampleSteps.combinationExample.includes(stepIndex)" class="step-content-card">
                            <div v-html="step.content"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 4. Binomial Theorem Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5>4️⃣ Binomial Theorem</h5>
                </div>
                <div class="card-body">
                  <div class="definition-card">
                    <div class="definition-header">
                      <h7>Definition</h7>
                    </div>
                    <div class="definition-body">
                      <p>Expands expressions of the form (a + b)^n using combinations.</p>
                    </div>
                  </div>
                  
                  <!-- Formula Card -->
                  <div class="formula-card">
                    <div class="formula-header">
                      <h6>📐 Formula</h6>
                    </div>
                    <div class="formula-body">
                      <div class="definition-card">
                        <div class="definition-header"> Formula</div>
                        <div class="definition-body">
                          <code>(a + b)^n = Σ_{k=0}^{n} C(n, k) a^{n-k} b^{k}</code>
                        </div>
                      </div>
                      <div class="definition-card">
                        <div class="definition-header">🔤 Symbol Explanation</div>
                        <div class="definition-body">
                          <ul>
                            <li><strong>Σ (Sigma):</strong> Summation symbol</li>
                            <li><strong>k = 0 to n:</strong> Index goes from 0 to n</li>
                            <li><strong>C(n, k):</strong> Binomial coefficient</li>
                            <li><strong>a^{n-k} b^{k}:</strong> Powers change as k increases</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Example Problem Card -->
                  <div class="example-problem-card">
                    <div class="problem-header">
                      <h6> Example Problem</h6>
                    </div>
                    <div class="problem-body">
                      <p><strong>Problem:</strong> Expand (x + 2)^3 using the Binomial Theorem.</p>
                      
                      <button @click="toggleExample('binomialExample')" class="solve-button">
                        {{ showExamples.binomialExample ? "🔽 Click to Hide Solution" : "Click to Show Solution" }}
                      </button>
                      
                      <div v-if="showExamples.binomialExample" class="solution-steps">
                        <div v-for="(step, stepIndex) in exampleSteps.binomialExample" :key="'binom-' + stepIndex" class="step-card">
                          <button @click="toggleExampleStep('binomialExample', stepIndex)" class="step-button-card">
                            <span class="step-number">Step {{ stepIndex + 1 }}</span>
                            <span class="step-title">{{ step.title }}</span>
                          </button>
                          <div v-if="revealedExampleSteps.binomialExample.includes(stepIndex)" class="step-content-card">
                            <div v-html="step.content"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 5. Inclusion-Exclusion Principle Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5>5️⃣ Inclusion-Exclusion Principle</h5>
                </div>
                <div class="card-body">
                  <div class="definition-card">
                    <div class="definition-header">
                      <h7>Definition</h7>
                    </div>
                    <div class="definition-body">
                      <p>Counts elements in unions of overlapping sets by adding sizes, subtracting intersections.</p>
                    </div>
                  </div>
                  
                  <!-- Formula Card -->
                  <div class="formula-card">
                    <div class="formula-header">
                      <h6>📐 Formulas</h6>
                    </div>
                    <div class="formula-body">
                      <div class="formula-row">
                        <div class="formula-item">
                          <strong>Two Sets:</strong>
                          <div class="definition-card">
                            <div class="definition-header"> Formula</div>
                            <div class="definition-body">
                              <code>|A ∪ B| = |A| + |B| - |A ∩ B|</code>
                            </div>
                          </div>
                        </div>
                        <div class="formula-item">
                          <strong>Three Sets:</strong>
                          <div class="definition-card">
                            <div class="definition-header"> Formula</div>
                            <div class="definition-body">
                              <code>|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|</code>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="explanation-card">
                        <div class="explanation-header"> Why This Works</div>
                        <div class="explanation-body">
                          Elements in intersections are counted multiple times, so we subtract them. For three sets, we subtract too much and need to add back the triple intersection.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Example Problem Card -->
                  <div class="example-problem-card">
                    <div class="problem-header">
                      <h6> Example Problem</h6>
                    </div>
                    <div class="problem-body">
                      <p><strong>Problem:</strong> In a class of 40: 25 study Math, 20 study Physics, 15 study both. How many study at least one subject?</p>
                      
                      <button @click="toggleExample('inclusionExample')" class="solve-button">
                        {{ showExamples.inclusionExample ? "🔽 Click to Hide Solution" : "Click to Show Solution" }}
                      </button>
                      
                      <div v-if="showExamples.inclusionExample" class="solution-steps">
                        <div v-for="(step, stepIndex) in exampleSteps.inclusionExample" :key="'incl-' + stepIndex" class="step-card">
                          <button @click="toggleExampleStep('inclusionExample', stepIndex)" class="step-button-card">
                            <span class="step-number">Step {{ stepIndex + 1 }}</span>
                            <span class="step-title">{{ step.title }}</span>
                          </button>
                          <div v-if="revealedExampleSteps.inclusionExample.includes(stepIndex)" class="step-content-card">
                            <div v-html="step.content"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 6. Pigeonhole Principle Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5>6️⃣ Pigeonhole Principle</h5>
                </div>
                <div class="card-body">
                  <div class="definition-card">
                    <div class="definition-header">
                      <h7> Definition</h7>
                    </div>
                    <div class="definition-body">
                      <p>If more items are placed into fewer containers, at least one container must contain multiple items.</p>
                    </div>
                  </div>
                  
                  <!-- Formula Card -->
                  <div class="formula-card">
                    <div class="formula-header">
                      <h6>📐 Formal Statement</h6>
                    </div>
                    <div class="formula-body">
                      <div class="definition-card">
                        <div class="definition-header"> Formula</div>
                        <div class="definition-body">
                          <code>If n items → m containers with n > m, then at least one container has ⌈n/m⌉ items</code>
                        </div>
                      </div>
                      <div class="definition-card">
                        <div class="definition-header">🔤 Symbol Explanation</div>
                        <div class="definition-body">
                          <ul>
                            <li><strong>⌈x⌉:</strong> Ceiling function - smallest integer ≥ x</li>
                            <li><strong>n:</strong> Number of items (pigeons)</li>
                            <li><strong>m:</strong> Number of containers (holes)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Example Problem Card -->
                  <div class="example-problem-card">
                    <div class="problem-header">
                      <h6> Example Problem</h6>
                    </div>
                    <div class="problem-body">
                      <p><strong>Problem:</strong> In a group of 13 people, show at least 2 share a birth month.</p>
                      
                      <button @click="toggleExample('pigeonholeExample')" class="solve-button">
                        {{ showExamples.pigeonholeExample ? "🔽 Click to Hide Solution" : "Click to Show Solution" }}
                      </button>
                      
                      <div v-if="showExamples.pigeonholeExample" class="solution-steps">
                        <div v-for="(step, stepIndex) in exampleSteps.pigeonholeExample" :key="'pigeon-' + stepIndex" class="step-card">
                          <button @click="toggleExampleStep('pigeonholeExample', stepIndex)" class="step-button-card">
                            <span class="step-number">Step {{ stepIndex + 1 }}</span>
                            <span class="step-title">{{ step.title }}</span>
                          </button>
                          <div v-if="revealedExampleSteps.pigeonholeExample.includes(stepIndex)" class="step-content-card">
                            <div v-html="step.content"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 7. Combinatorial Proofs Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5>7️⃣ Combinatorial Proofs</h5>
                </div>
                <div class="card-body">
                  <div class="definition-card">
                    <div class="definition-header">
                      <h7>Definition</h7>
                    </div>
                    <div class="definition-body">
                      <p>Proving identities by counting the same thing in two different ways.</p>
                    </div>
                  </div>
                  
                  <div class="definition-card">
                    <div class="definition-header">
                      <h7> Proof Technique</h7>
                    </div>
                    <div class="definition-body">
                      <p><strong>Basic Strategy:</strong> Count something in two different valid ways, then equate the two counts.</p>
                      <div class="definition-card">
                        <div class="definition-header"> Common Application</div>
                        <div class="definition-body">
                          Proving combinatorial identities like <code>C(n, r) = C(n, n-r)</code>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Example Problem Card -->
                  <div class="example-problem-card">
                    <div class="problem-header">
                      <h6> Example Problem</h6>
                    </div>
                    <div class="problem-body">
                      <p><strong>Problem:</strong> Prove C(n, r) = C(n, n-r) using combinatorial argument.</p>
                      
                      <button @click="toggleExample('combinatorialProofExample')" class="solve-button">
                        {{ showExamples.combinatorialProofExample ? "🔽 Click to Hide Solution" : "Click to Show Solution" }}
                      </button>
                      
                      <div v-if="showExamples.combinatorialProofExample" class="solution-steps">
                        <div v-for="(step, stepIndex) in exampleSteps.combinatorialProofExample" :key="'proof-' + stepIndex" class="step-card">
                          <button @click="toggleExampleStep('combinatorialProofExample', stepIndex)" class="step-button-card">
                            <span class="step-number">Step {{ stepIndex + 1 }}</span>
                            <span class="step-title">{{ step.title }}</span>
                          </button>
                          <div v-if="revealedExampleSteps.combinatorialProofExample.includes(stepIndex)" class="step-content-card">
                            <div v-html="step.content"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Topic 2: Discrete Structures -->
            <div v-if="index === 2">
              <!-- Goals Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5> Goals of Studying Discrete Structures</h5>
                </div>
                <div class="card-body">
                  <div class="goal-grid">
                    <div class="goal-card">
                      <div class="goal-icon"></div>
                      <div class="goal-content">
                        <h6>Understand Non-Continuous Objects</h6>
                        <p>Work with mathematical structures that are distinct and separate</p>
                      </div>
                    </div>
                    <div class="goal-card">
                      <div class="goal-icon">🧩</div>
                      <div class="goal-content">
                        <h6>Model & Solve Problems</h6>
                        <p>Use abstract structures to represent and solve real-world problems</p>
                      </div>
                    </div>
                    <div class="goal-card">
                      <div class="goal-icon">💻</div>
                      <div class="goal-content">
                        <h6>Foundation for CS</h6>
                        <p>Provide knowledge for algorithms, programming, and data structures</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Core Topics Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5> Core Topics in Discrete Structures</h5>
                </div>
                <div class="card-body">
                  <!-- Topics Grid -->
                  <div class="topics-grid">
                    <!-- Sets Card -->
                    <div class="topic-card-sm">
                      <div class="topic-header">
                        <h6> A. Sets</h6>
                      </div>
                      <div class="topic-body">
                        <ul>
                          <li><strong>Definition:</strong> Collection of distinct elements</li>
                          <li><strong>Operations:</strong> ∪, ∩, −, Complement</li>
                          <li><strong>Concepts:</strong> Power sets, Cartesian products</li>
                        </ul>
                      </div>
                    </div>

                    <!-- Relations Card -->
                    <div class="topic-card-sm">
                      <div class="topic-header">
                        <h6> B. Relations</h6>
                      </div>
                      <div class="topic-body">
                        <ul>
                          <li>Subset of Cartesian product</li>
                          <li><strong>Properties:</strong> Reflexive, Symmetric, Transitive</li>
                          <li><strong>Types:</strong> Equivalence relations, Partial orders</li>
                        </ul>
                      </div>
                    </div>

                    <!-- Functions Card -->
                    <div class="topic-card-sm">
                      <div class="topic-header">
                        <h6> C. Functions</h6>
                      </div>
                      <div class="topic-body">
                        <ul>
                          <li>Rule assigning each input to exactly one output</li>
                          <li><strong>Types:</strong> Injective, Surjective, Bijective</li>
                          <li>Composition and inverses</li>
                        </ul>
                      </div>
                    </div>

                    <!-- Logic Card -->
                    <div class="topic-card-sm">
                      <div class="topic-header">
                        <h6> D. Logic</h6>
                      </div>
                      <div class="topic-body">
                        <ul>
                          <li>Propositions & connectives</li>
                          <li>Truth tables</li>
                          <li>Predicate logic (∀, ∃)</li>
                          <li>Logical equivalence</li>
                        </ul>
                      </div>
                    </div>

                    <!-- Graphs & Trees Card -->
                    <div class="topic-card-sm">
                      <div class="topic-header">
                        <h6> E. Graphs & Trees</h6>
                      </div>
                      <div class="topic-body">
                        <ul>
                          <li><strong>Graphs:</strong> Vertices & edges</li>
                          <li><strong>Trees:</strong> Acyclic graphs</li>
                          <li>Binary trees, spanning trees</li>
                        </ul>
                      </div>
                    </div>

                    <!-- Matrices Card -->
                    <div class="topic-card-sm">
                      <div class="topic-header">
                        <h6> F. Matrices</h6>
                      </div>
                      <div class="topic-body">
                        <ul>
                          <li>Represent relations & graphs</li>
                          <li>Adjacency matrices</li>
                          <li>Boolean matrices</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Applications Card -->
              <div class="concept-card">
                <div class="card-header">
                  <h5>💻 Applications in Computer Science</h5>
                </div>
                <div class="card-body">
                  <div class="applications-grid">
                    <div class="app-card">
                      <div class="app-icon">🗄️</div>
                      <div class="app-content">
                        <strong>Database Design</strong>
                        <p>Relations, functions, normalization</p>
                      </div>
                    </div>
                    <div class="app-card">
                      <div class="app-icon">⚡</div>
                      <div class="app-content">
                        <strong>Algorithms</strong>
                        <p>Graph algorithms, sorting, searching</p>
                      </div>
                    </div>
                    <div class="app-card">
                      <div class="app-icon">🔐</div>
                      <div class="app-content">
                        <strong>Cryptography</strong>
                        <p>Encryption, security protocols</p>
                      </div>
                    </div>
                    <div class="app-card">
                      <div class="app-icon">🌐</div>
                      <div class="app-content">
                        <strong>Networks</strong>
                        <p>Routing, connectivity, protocols</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Next Lesson Buttons -->
            <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px; padding: 15px 35px ;">
              <div v-if="index === 0">
                <button @click="nextTopic(index)" class="next-button">Next Lesson</button>
              </div>
              <div v-if="index === 1">
                <button @click="nextTopic(index)" class="next-button">Next Lesson</button>
              </div>
              <div v-if="index === 2">
                <button @click="selectedTopic = null" class="next-button">⬅️ Back to Lessons</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Logic Laws Section (unchanged) -->
      <div v-else class="content-box">
        <div class="problem-box">
          <h5 style="text-align: center;">Laws to Simplify Logical Expressions</h5>
          <div id="law0" class="guide-box">
            <strong>1️⃣ Law of Double Negation</strong><br>
            ¬¬p ⇔ p<br>
            ➡️ Negating a statement twice gives back the original statement.<br>
            Example: ¬¬True = True
          </div>
          <!-- ... other laws ... -->
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <button @click="showImplication = false; selectedTopic = null" class="next-button">⬅️ Back to Lesson</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LessonTopicThree",
  data() {
    return {
      selectedTopic: null,
      showSolution: Array(3).fill({ main: false, alt: false }),
      revealedSteps: Array(3).fill({ main: [], alt: [] }),
      viewedTopics: new Set(),
      showConjunctionExample: false,
      showImplication: false,
      topics: [
        { 
          title: "What is Discrete Mathematics", 
          content: "<strong>Discrete mathematics </strong>is the study of mathematical structures that can be considered \"discrete\" (in a way analogous to discrete variables, having a bijection with the set of natural numbers) rather than \"continuous\" (analogously to continuous functions)." 
        },
        { 
          title: "Combinatorial Analysis", 
          content: "<strong>Combinatorial Analysis </strong> is a branch of discrete mathematics that deals with counting, arranging, and analyzing finite sets of discrete structures. It's fundamental to probability theory, computer science (especially algorithms), and many fields of mathematics." 
        },
        { 
          title: "Discrete Structures", 
          content: "<strong>Discrete Structures </strong> are fundamental concepts in Discrete Mathematics that deal with mathematical structures that are distinct and separate, not continuous. They are essential in computer science, information theory, and logic." 
        }
      ],
      lawTexts: [
        "Law of Double Negation: Not not p is equivalent to p. Negating a statement twice gives back the original statement. Example: Not not True equals True.",
        "De Morgan's Laws: Not p or q is equivalent to not p and not q. Not p and q is equivalent to not p or not q. The negation of or becomes and, and vice versa. Example: Not Rain or Cold equals Not Rain and Not Cold.",
        "Commutative Laws: p or q is equivalent to q or p. p and q is equivalent to q and p. Order doesn't matter in and or or operations. Example: A and B equals B and A.",
        "Associative Laws: p or q or r is equivalent to p or q or r grouped differently. p and q and r is equivalent to p and q and r grouped differently. The way statements are grouped doesn't change the result. Example: A or B or C equals A or B or C.",
        "Distributive Laws: p or q and r is equivalent to p or q and p or r. p and q or r is equivalent to p and q or p and r. Similar to multiplication and addition in math — distribute across. Example: A or B and C equals A or B and A or C.",
        "Idempotent Laws: p or p is equivalent to p. p and p is equivalent to p. Repeating the same statement doesn't change its meaning. Example: A or A equals A.",
        "Identity Laws: p or False is equivalent to p. p and True is equivalent to p. Combining with false or true keeps the same value. Example: A or False equals A.",
        "Inverse Negation Laws: p or not p is equivalent to True. p and not p is equivalent to False. A statement or its opposite is always true; both together are always false. Example: It's raining or not raining equals Always True.",
        "Domination Laws: p or True is equivalent to True. p and False is equivalent to False. Anything or True is True; anything and False is False. Example: A or True equals True.",
        "Absorption Laws: p or p and q is equivalent to p. p and p or q is equivalent to p. Adding extra conditions that include p doesn't change the result. Example: A or A and B equals A."
      ],
      showExamples: {
        additionExample: false,
        multiplicationExample: false,
        permutationExample: false,
        combinationExample: false,
        binomialExample: false,
        inclusionExample: false,
        pigeonholeExample: false,
        combinatorialProofExample: false
      },
      revealedExampleSteps: {
        additionExample: [],
        multiplicationExample: [],
        permutationExample: [],
        combinationExample: [],
        binomialExample: [],
        inclusionExample: [],
        pigeonholeExample: [],
        combinatorialProofExample: []
      },
      exampleSteps: {
        additionExample: [
          { 
            title: "Identify the problem type", 
            content: "This uses the <strong>Addition Principle</strong> because the student can choose <strong>EITHER</strong> Math 101 <strong>OR</strong> Math 102, but not both. The choices are mutually exclusive." 
          },
          { 
            title: "Extract the numbers", 
            content: "Math 101 has <strong>3 sections</strong>, Math 102 has <strong>5 sections</strong>." 
          },
          { 
            title: "Apply Addition Principle", 
            content: "Total choices = <strong>3 + 5 = 8</strong>.<br><br>The Addition Principle states: If a task can be done in m ways or n ways (but not both), then there are m + n ways to do it." 
          },
          { 
            title: "Why this works", 
            content: "The Addition Principle applies when choices are <strong>mutually exclusive</strong> (you can't take both courses simultaneously). Each section choice is distinct and doesn't overlap with the other course." 
          },
          { 
            title: "Answer", 
            content: "<strong>The student has 8 possible choices.</strong><br><br>These are: 3 choices from Math 101 sections + 5 choices from Math 102 sections." 
          }
        ],
        multiplicationExample: [
          { 
            title: "Identify the problem type", 
            content: "This uses the <strong>Multiplication Principle</strong> because we're making multiple independent choices in sequence: sandwich, then drink, then dessert." 
          },
          { 
            title: "Extract the numbers", 
            content: "Sandwiches = <strong>4 types</strong><br>Drinks = <strong>3 types</strong><br>Desserts = <strong>2 types</strong>" 
          },
          { 
            title: "Apply Multiplication Principle", 
            content: "Total combinations = <strong>4 × 3 × 2 = 24</strong>.<br><br>The Multiplication Principle states: If a task consists of multiple steps, and step 1 can be done in m ways, step 2 in n ways, etc., then total ways = m × n × ..." 
          },
          { 
            title: "Why this works", 
            content: "For each sandwich choice, there are 3 drink choices. For each sandwich-drink combination, there are 2 dessert choices. The choices are independent and sequential, so we multiply the possibilities." 
          },
          { 
            title: "Logical verification", 
            content: "Let's verify with a smaller example:<br>If we had 2 sandwiches (A,B), 2 drinks (1,2), and 1 dessert (X):<br>Possible meals: A1X, A2X, B1X, B2X = 4 meals = 2 × 2 × 1" 
          },
          { 
            title: "Answer", 
            content: "<strong>There are 24 different meal combinations possible.</strong><br><br>This means a customer can choose from 24 distinct complete meals." 
          }
        ],
        permutationExample: [
          { 
            title: "Identify parameters", 
            content: "<strong>n = 8</strong> (total runners)<br><strong>r = 3</strong> (medal positions: gold, silver, bronze)" 
          },
          { 
            title: "Determine formula", 
            content: "Use <strong>P(8, 3)</strong> since order matters (gold ≠ silver ≠ bronze). Different arrangements of the same 3 runners give different medal outcomes." 
          },
          { 
            title: "Apply formula", 
            content: "P(8, 3) = <strong>8!/(8-3)! = 8!/5!</strong><br>8! = 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1<br>5! = 5 × 4 × 3 × 2 × 1 = 120" 
          },
          { 
            title: "Simplify", 
            content: "Cancel 5! from numerator and denominator:<br><strong>8 × 7 × 6 × 5 × 4 × 3 × 2 × 1</strong><br>-----------------------------------<br><strong>5 × 4 × 3 × 2 × 1</strong><br><br>= <strong>8 × 7 × 6 = 336</strong>" 
          },
          { 
            title: "Logical verification", 
            content: "Gold medal: 8 choices<br>Silver medal: 7 remaining choices<br>Bronze medal: 6 remaining choices<br><strong>Total: 8 × 7 × 6 = 336</strong><br><br>This matches our permutation calculation." 
          },
          { 
            title: "Answer", 
            content: "<strong>There are 336 different ways to award the medals.</strong><br><br>This means there are 336 possible podium outcomes for the 8 runners." 
          }
        ],
        combinationExample: [
          { 
            title: "Identify parameters", 
            content: "<strong>n = 10</strong> (total volunteers)<br><strong>r = 4</strong> (committee size)" 
          },
          { 
            title: "Determine formula", 
            content: "Use <strong>C(10, 4)</strong> since order doesn't matter (committee members are not ranked - a committee {A,B,C,D} is the same as {D,C,B,A})." 
          },
          { 
            title: "Apply formula", 
            content: "C(10, 4) = <strong>10!/(4!(10-4)!) = 10!/(4!6!)</strong><br>10! = 10 × 9 × 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1<br>4! = 4 × 3 × 2 × 1 = 24<br>6! = 6 × 5 × 4 × 3 × 2 × 1 = 720" 
          },
          { 
            title: "Calculate step by step", 
            content: "C(10, 4) = <strong>(10 × 9 × 8 × 7 × 6!)/(24 × 6!)</strong><br><br>Cancel 6! from numerator and denominator:<br>= <strong>(10 × 9 × 8 × 7)/24</strong><br><br>Calculate numerator: 10 × 9 = 90, 90 × 8 = 720, 720 × 7 = 5040<br><br>Divide by 24: 5040 ÷ 24 = 210" 
          },
          { 
            title: "Logical verification", 
            content: "First, if order mattered:<br>Choose any 4 from 10: 10 × 9 × 8 × 7 = 5040 arrangements<br><br>But each committee of 4 people can be arranged in 4! = 24 different orders<br><br>So unique committees = 5040/24 = 210" 
          },
          { 
            title: "Answer", 
            content: "<strong>There are 210 different possible committees.</strong><br><br>This means from 10 volunteers, we can form 210 distinct committees of 4 people each." 
          }
        ],
        binomialExample: [
          { 
            title: "Identify parameters", 
            content: "<strong>a = x</strong><br><strong>b = 2</strong><br><strong>n = 3</strong>" 
          },
          { 
            title: "Apply Binomial Theorem", 
            content: "(x + 2)^3 = <strong>∑ from k=0 to 3 of C(3, k) x^(3-k) 2^k</strong><br><br>This means we'll calculate terms for k = 0, 1, 2, 3" 
          },
          { 
            title: "Calculate each term", 
            content: "<strong>k = 0:</strong> C(3, 0) x^(3-0) 2^0 = 1 × x^3 × 1 = <strong>x^3</strong><br><br><strong>k = 1:</strong> C(3, 1) x^(3-1) 2^1 = 3 × x^2 × 2 = <strong>6x^2</strong><br><br><strong>k = 2:</strong> C(3, 2) x^(3-2) 2^2 = 3 × x^1 × 4 = <strong>12x</strong><br><br><strong>k = 3:</strong> C(3, 3) x^(3-3) 2^3 = 1 × x^0 × 8 = <strong>8</strong>" 
          },
          { 
            title: "Combine terms", 
            content: "Add all terms together:<br><strong>x^3 + 6x^2 + 12x + 8</strong>" 
          },
          { 
            title: "Verification by direct multiplication", 
            content: "(x+2)^3 = (x+2)(x+2)(x+2)<br>= (x^2 + 4x + 4)(x+2)<br>= x^3 + 2x^2 + 4x^2 + 8x + 4x + 8<br>= <strong>x^3 + 6x^2 + 12x + 8</strong><br><br>✓ Matches our binomial expansion!" 
          },
          { 
            title: "Answer", 
            content: "<strong>(x + 2)^3 = x^3 + 6x^2 + 12x + 8</strong><br><br>The Binomial Theorem provides a systematic way to expand such expressions without manual multiplication." 
          }
        ],
        inclusionExample: [
          { 
            title: "Define sets", 
            content: "Let <strong>M = students studying Math</strong><br>Let <strong>P = students studying Physics</strong>" 
          },
          { 
            title: "Given values", 
            content: "|M| = <strong>25</strong><br>|P| = <strong>20</strong><br>|M ∩ P| = <strong>15</strong> (students studying both)" 
          },
          { 
            title: "Apply Inclusion-Exclusion", 
            content: "Formula: <strong>|M ∪ P| = |M| + |P| - |M ∩ P|</strong><br><br>This formula prevents double-counting students who study both subjects." 
          },
          { 
            title: "Substitute values", 
            content: "|M ∪ P| = <strong>25 + 20 - 15</strong>" 
          },
          { 
            title: "Calculate", 
            content: "= <strong>45 - 15 = 30</strong>" 
          },
          { 
            title: "Logical verification", 
            content: "Math only: 25 - 15 = <strong>10 students</strong><br>Physics only: 20 - 15 = <strong>5 students</strong><br>Both: <strong>15 students</strong><br><br>Total at least one subject: 10 + 5 + 15 = <strong>30 students</strong><br><br>✓ Matches our calculation!" 
          },
          { 
            title: "Answer", 
            content: "<strong>30 students study at least one of Math or Physics.</strong><br><br>This means 10 students study only Math, 5 study only Physics, and 15 study both." 
          }
        ],
        pigeonholeExample: [
          { 
            title: "Identify 'pigeons' and 'holes'", 
            content: "<strong>Pigeons</strong> = 13 people (items to distribute)<br><strong>Holes</strong> = 12 months (containers to put them in)" 
          },
          { 
            title: "Apply Pigeonhole Principle", 
            content: "Since <strong>13 > 12</strong> (more pigeons than holes), by the Pigeonhole Principle, at least one hole must contain more than one pigeon." 
          },
          { 
            title: "Calculate minimum in fullest hole", 
            content: "⌈13/12⌉ = ⌈1.083⌉ = <strong>2</strong><br><br>The ceiling function ⌈x⌉ gives the smallest integer ≥ x." 
          },
          { 
            title: "Logical reasoning", 
            content: "If we try to distribute 13 people evenly among 12 months:<br>1. Put 1 person in each month = 12 people placed<br>2. The 13th person must go into a month that already has 1 person<br>3. Result: At least one month has 2 people" 
          },
          { 
            title: "Generalization", 
            content: "With n+1 items and n containers, at least one container has ≥ 2 items.<br><br>This is the simplest form of the Pigeonhole Principle." 
          },
          { 
            title: "Answer", 
            content: "<strong>By the Pigeonhole Principle, at least 2 people in a group of 13 must share a birth month.</strong><br><br>This is a mathematical certainty, not just probability." 
          }
        ],
        combinatorialProofExample: [
          { 
            title: "Understand what we're proving", 
            content: "C(n, r) = number of ways to choose r items from n.<br>C(n, n-r) = number of ways to choose n-r items from n.<br><br>We need to show these are equal using counting arguments." 
          },
          { 
            title: "Method 1: Direct combinatorial interpretation", 
            content: "Choosing r items from n is equivalent to choosing which n-r items to leave behind.<br><br>For every selection of r items, there's a corresponding selection of the n-r items not chosen." 
          },
          { 
            title: "Method 2: Formal proof by counting", 
            content: "Let S be a set with n elements.<br>Left side: Count subsets of size r. There are C(n, r) such subsets.<br>Right side: Count subsets of size n-r. There are C(n, n-r) such subsets." 
          },
          { 
            title: "Establish bijection", 
            content: "For each subset A of size r, consider its complement A' (elements not in A).<br>A' has size n-r, and this mapping is one-to-one and onto.<br><br>Thus, number of subsets of size r = number of subsets of size n-r." 
          },
          { 
            title: "Example with numbers", 
            content: "Let n = 5, r = 2.<br>C(5, 2) = 10 ways to choose 2 items.<br>C(5, 3) = 10 ways to choose 3 items.<br><br>Choosing {A,B} from {A,B,C,D,E} corresponds to choosing to leave behind {C,D,E}." 
          },
          { 
            title: "Conclusion", 
            content: "Since both sides count the same thing (just from different perspectives), <strong>C(n, r) = C(n, n-r).</strong>" 
          },
          { 
            title: "Why this is a combinatorial proof", 
            content: "We used counting and set relationships rather than algebraic manipulation of factorials.<br><br>This proof helps understand WHY the identity is true, not just THAT it's true." 
          }
        ]
      }
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    toggleTopic(index) {
      this.selectedTopic = this.selectedTopic === index ? null : index;
      this.showSolution = this.showSolution.map(() => ({ main: false, alt: false }));
      this.revealedSteps = this.revealedSteps.map(() => ({ main: [], alt: [] }));
      this.viewedTopics.add(index);
      this.showConjunctionExample = false;
      this.showImplication = false;
      // Reset all example toggles when changing topics
      Object.keys(this.showExamples).forEach(key => {
        this.showExamples[key] = false;
      });
      // Reset all revealed steps
      Object.keys(this.revealedExampleSteps).forEach(key => {
        this.revealedExampleSteps[key] = [];
      });
      
      // Scroll to top when opening a topic
      if (this.selectedTopic === index) {
        this.$nextTick(() => {
          this.scrollToTopicTitle(index);
        });
      }
    },
    
    nextTopic(currentIndex) {
      // Clear current solution states
      this.showSolution = this.showSolution.map(() => ({ main: false, alt: false }));
      this.revealedSteps = this.revealedSteps.map(() => ({ main: [], alt: [] }));
      
      // Reset all example toggles
      Object.keys(this.showExamples).forEach(key => {
        this.showExamples[key] = false;
      });
      
      // Reset all revealed steps
      Object.keys(this.revealedExampleSteps).forEach(key => {
        this.revealedExampleSteps[key] = [];
      });
      
      // Go to next topic (if there is one)
      if (currentIndex < this.topics.length - 1) {
        this.selectedTopic = currentIndex + 1;
        this.viewedTopics.add(currentIndex + 1);
        
        // Scroll to the topic title after a brief delay to ensure DOM is updated
        this.$nextTick(() => {
          setTimeout(() => {
            this.scrollToTopicTitle(this.selectedTopic);
          }, 50);
        });
      }
    },
    
    scrollToTopicTitle(topicIndex) {
      // Scroll to the very top of the page first
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Then find the topic title element and scroll to it
      this.$nextTick(() => {
        const titleElement = this.$refs[`topicTitle-${topicIndex}`];
        if (titleElement && titleElement[0]) {
          // Add a small delay to ensure the DOM has rendered
          setTimeout(() => {
            titleElement[0].scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start'
            });
          }, 100);
        }
      });
    },
    
    toggleSolution(topicIndex, type) {
      this.showSolution[topicIndex][type] = !this.showSolution[topicIndex][type];
      if (!this.showSolution[topicIndex][type]) {
        this.revealedSteps[topicIndex][type] = [];
      }
    },
    
    toggleStep(topicIndex, stepIndex, type) {
      const stepList = this.revealedSteps[topicIndex][type];
      if (stepIndex === 0 || stepList.includes(stepIndex - 1)) {
        const stepPos = stepList.indexOf(stepIndex);
        stepPos === -1 ? stepList.push(stepIndex) : stepList.splice(stepPos, 1);
      }
    },
    
    formatContent(content) {
      return content.replace(/\n/g, "<br>");
    },
    
    toggleExample(exampleName) {
      this.showExamples[exampleName] = !this.showExamples[exampleName];
      if (!this.showExamples[exampleName]) {
        this.revealedExampleSteps[exampleName] = [];
      }
    },
    
    toggleExampleStep(exampleName, stepIndex) {
      const stepList = this.revealedExampleSteps[exampleName];
      if (stepIndex === 0 || stepList.includes(stepIndex - 1)) {
        const stepPos = stepList.indexOf(stepIndex);
        stepPos === -1 ? stepList.push(stepIndex) : stepList.splice(stepPos, 1);
      }
    }
  }
};
</script>

<style scoped>
.lesson-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: url('/images/bac.webp') no-repeat center center fixed;
  border-radius: 0;
  box-shadow: none;
  font-family: 'Arial', sans-serif;
  text-align: center;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  overflow-y: auto;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin: 10px 0;
}

.content-box {
  padding: 5px;
  background: rgba(217, 230, 239, 0.62);
  border-radius: 15px;
  margin-bottom: 20px;
}

.clickable-title {
  cursor: pointer;
  padding: 10px;
  color: black;
  border-radius: 10px;
  margin: 10px;
  transition: transform 0.3s;
  scroll-margin-top: 20px; /* For smooth scrolling to this element */
}

.clickable-title:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* ============ CARD STYLES ============ */

/* Main Topic Card */
.topic-card {
  background: #ece9db;
  border-radius: 12px;
  margin: 15px 0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg,  #046169 0%, #046169 100%);
  color: white;
  padding: 15px;
  text-align: left;
}

.card-header h5 {
  margin: 0;
  font-size: 18px;
}

.card-body {
  padding: 20px;
  text-align: left;
  line-height: 1.6;
}

/* Concept Card */
.concept-card {
  background: white;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  border-left: 5px solid  #046169;
}

/* Principle Card */
.principle-card {
  background: #f9f9f9;
  border-radius: 8px;
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #e0e0e0;
}

.principle-header {
  background: #e3f2fd;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.principle-header h6 {
  margin: 0;
  color:  #046169;
}

/* Formula Card */
.formula-card {
  background: #f5f5f4;
  border-radius: 8px;
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #dcdbd7;
}

.formula-header {
  background: #046169;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.formula-header h6 {
  margin: 0;
  color: #ebeef0;
}

.formula-body {
  padding: 10px;
}

.formula-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 15px 0;
}

.formula-item {
  flex: 1;
  min-width: 200px;
}

/* Definition Card - Updated with consistent border color */
.definition-card {
  background: #e5ebecd2;
  border-radius: 8px;
  margin: 15px 0;
  padding: 15px;
  border-left: 4px solid #046169;
  border-top: 1px solid #046169;
  border-right: 1px solid #046169;
  border-bottom: 1px solid #046169;
}

.definition-header {
  color: #046169;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
}

.definition-body {
  font-size: 14px;
  line-height: 1.5;
}

.definition-body code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #046169;
}

/* Explanation Card */
.explanation-card {
  background: #e5ebecd2;
  border-radius: 8px;
  margin: 10px 0;
  padding: 12px;
  border-left: 4px solid  #046169;
}

.explanation-header {
  color: #0a0a0a;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
}

.explanation-body {
  font-size: 14px;
  line-height: 1.5;
}

/* Example Problem Card */
.example-problem-card {
  background: #fff3e0;
  border-radius: 8px;
  margin: 20px 0;
  padding: 15px;
  border: 2px solid  #046169;
}

.problem-header {
  background: #e9e4dc;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.problem-header h6 {
  margin: 0;
  color: #070d09;
}

.problem-body {
  padding: 10px;
}

/* Solution Steps */
.solution-steps {
  margin-top: 15px;
}

.step-card {
  margin: 10px 0;
}

.step-button-card {
  background: linear-gradient(135deg, #10bd4c 0%, #10bd4c 100%);
  color: white;
  border: none;
  padding: 12px 15px;
  width: 100%;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.step-button-card:hover {
  background: linear-gradient(135deg, #056a2d 0%, #04643c 100%);
  transform: translateX(5px);
}

.step-number {
  background: white;
  color: #097c15;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;
}

.step-title {
  flex: 1;
}

.step-content-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin: 5px 0;
  border-left: 4px solid #4CAF50;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Example Grids */
.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin: 15px 0;
}

.example-card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.example-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.example-icon {
  font-size: 24px;
  margin-right: 15px;
  min-width: 40px;
}

.example-content {
  flex: 1;
}

.example-content strong {
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.example-content p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* Topics Grid */
.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  margin: 15px 0;
}

.topic-card-sm {
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-top: 4px solid #046169;
}

.topic-header {
  color: #046169;
  font-weight: bold;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e8f5e9;
}

.topic-header h6 {
  margin: 0;
  font-size: 16px;
}

.topic-body ul {
  margin: 0;
  padding-left: 20px;
}

.topic-body li {
  margin: 5px 0;
  font-size: 14px;
  line-height: 1.4;
}

/* Goal Grid */
.goal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 15px 0;
}

.goal-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.goal-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.goal-content h6 {
  color: #333;
  margin: 10px 0;
}

.goal-content p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* Applications Grid */
.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 15px 0;
}

.app-card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.app-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.app-icon {
  font-size: 28px;
  margin-bottom: 10px;
}

.app-content strong {
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.app-content p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* Existing Problem Boxes */
.problem-box {
  background: rgb(221, 231, 238);
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  text-align: left;
  font-size: 15px;
}

/* Buttons */
.submit-button, .solve-button, .next-button, .step-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
  transition: background 0.3s;
}

.submit-button {
  padding: 15px 30px;
  font-size: 18px;
  min-width: 200px;
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
  display: block;
}

.submit-button:hover, .solve-button:hover, .next-button:hover, .step-button:hover {
  background: #388E3C;
}

.next-button {
  background: linear-gradient(135deg, #4CAF50 0%, #4CAF50 100%);
  padding: 12px 25px;
  font-size: 16px;
  margin: 20px auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-box {
    padding: 10px;
  }
  
  .card-body, .problem-body {
    padding: 15px;
  }
  
  .formula-row {
    flex-direction: column;
  }
  
  .formula-item {
    width: 100%;
  }
  
  .example-grid,
  .topics-grid,
  .goal-grid,
  .applications-grid {
    grid-template-columns: 1fr;
  }
  
  .step-button-card {
    padding: 10px;
  }
  
  .step-number {
    width: 25px;
    height: 25px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 18px;
  }
  
  .card-header h5 {
    font-size: 16px;
  }
  
  .next-button {
    width: 100%;
    font-size: 14px;
  }
  
  .example-card,
  .goal-card,
  .app-card {
    padding: 12px;
  }
}
</style>