```vue
<template>
  <div class="lesson-container">
    <!-- Pre-Test Section -->
    <div v-if="!preTestCompleted" class="pretest-container">
      <h3 class="title">📝 Pre-Test: Relations and Functions</h3>
      <div v-for="(question, index) in preTestQuestions" :key="index" class="pretest-box">
        <p><strong>{{ index + 1 }}. {{ question.question }}</strong></p>
        <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-box">
          <label class="option-label">
            <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
            <input type="radio" :name="'q' + index" :value="option" v-model="userAnswers[index]" />
            <span class="option-text">{{ option }}</span>
          </label>
        </div>
        <div v-if="showPreTestResult" class="feedback-box">
          <p v-if="userAnswers[index] === question.answer">✅ Correct!</p>
          <p v-else>❌ Incorrect. The correct answer is: {{ question.answer }}</p>
          <p><strong>Explanation:</strong> {{ question.explanation }}</p>
        </div>
      </div>
      <button @click="submitPreTest" class="submit-button pretest-submit-button" :disabled="!preTestAllAnswered">✅ Submit Pre-Test</button>
      <div v-if="showPreTestResult" class="modal-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 999; display: flex; justify-content: center; align-items: center;">
        <div class="result-box" style="background: white; padding: 20px; border-radius: 8px; max-width: 400px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h4>Your Score: {{ score }}/{{ preTestQuestions.length }}</h4>
          <p v-if="score === preTestQuestions.length">🎉 Excellent! You mastered this topic.</p>
          <p v-else-if="score >= Math.ceil(preTestQuestions.length/2)">👍 Good job! Let's review some concepts.</p>
          <p v-else>💡 Don’t worry! The lesson will help you understand better.</p>
          <button @click="preTestCompleted = true; showPreTestResult = false" class="next-button">➡️ Continue to Lesson</button>
        </div>
      </div>
    </div>
    <!-- Lesson AFTER Pre-Test -->
    <div v-else-if="!showPostTest">
      <h4 class="title">📚 Relations and Functions</h4>
      <!-- Normal Lesson View -->
      <div v-if="!subsetPageActive && !hasseDiagramPageActive && !equivalencePageActive && !examplesOfFunctionsPageActive && !functionQuizPageActive && !typesOfFunctionsPageActive && !operationsOnFunctionsPageActive && !graphicalRelationshipPageActive">
        <div v-if="selectedTopic === null">
          <div v-for="(topic, index) in topics" :key="index" class="content-box">
            <h5 @click="toggleTopic(index)" class="clickable-title">
              {{ topic.title }}
            </h5>
          </div>
        </div>
        <div v-else>
          <div class="content-box">
            <h4 @click="toggleTopic(selectedTopic)" class="clickable-title">
              {{ topics[selectedTopic].title }}
            </h4>
            <p v-html="formatContent(topics[selectedTopic].content)"></p>
            <!-- SET TOPIC SPECIAL CONTENT -->
            <div v-if="topics[selectedTopic].type === 'subset'">
              <img
                src="/images/functionrelation.png"
                alt="Function"
                class="lesson-image"
              />
              <div class="definition-box">
                <p>
                  <strong>Given ordered pairs:</strong> (1,c), (2,n), (5,a), (7,n)<br>
                  <strong>Domain</strong> = {1, 2, 5, 7} (all first elements)<br>
                  <strong>Range</strong> = {a, c, n} (all second elements, no repeats)
                </p>
              </div>
              <!-- LET'S TRY Card -->
              <div class="problem-box">
                <h4> Mastery Quiz 1</h4>
                <img
                  src="/images/domainrange.png"
                  alt="Vowels Example"
                  class="lesson-image"
                />
                <p><strong>Q1. What is the range? </strong></p>
                <input
                  v-model="subsetAnswer"
                  placeholder="Type your answer here"
                  class="answer-input"
                />
                <button @click="checkSubsetAnswer" class="submit-button" :disabled="!subsetAnswer.trim()">CHECK ANSWER</button>
                <div v-if="subsetFeedback" class="result-box">
                  <p>{{ subsetFeedback }}</p>
                </div>
              </div>
              <!-- TRY THIS Card -->
              <div class="problem-box">
                <h4> Mastery Quiz 2</h4>
                <img
                  src="/images/rd.png"
                  alt="Set of Even Numbers"
                  class="lesson-image"
                />
                <p><strong>Q2. What is the Domain?</strong></p>
                <input
                  v-model="subsetQuizAnswer"
                  placeholder="Type your answer here"
                  class="answer-input"
                />
                <button @click="checkSubsetQuiz" class="submit-button" :disabled="!subsetQuizAnswer.trim()">CHECK ANSWER</button>
                <div v-if="subsetQuizFeedback" class="result-box">
                  <p>{{ subsetQuizFeedback }}</p>
                </div>
                <button @click="subsetPageActive = true" class="next-button">➡️ Next</button>
              </div>
            </div>
            <!-- Types of Relations Special Content -->
            <div v-if="topics[selectedTopic].type === 'types-of-relations'">
              <div class="content-box">
                <h4> Types of Relations</h4>
                <div class="definition-box">
                  <p>
                    key types of relations:
                  </p>
                  <ul>
                    <li><strong>Equivalence Relation:</strong> Reflexive, Symmetric, and Transitive</li>
                    <li><strong>Partial Order:</strong> Reflexive, Antisymmetric, and Transitive</li>
                    <li><strong>Total Order:</strong> A partial order that is also comparable (for all a,b either aRb or bRa)</li>
                  </ul>
                </div>
              </div>
              <!-- Partial Ordering Card -->
              <div class="content-box">
                <h4>📘 Partial Ordering</h4>
                <div class="definition-box">
                  <p>
                    A partial ordering is a specific type of binary relation that organizes elements of a set in a consistent, but not necessarily complete, order.<br>
                    Let P be a set. A binary relation ≤ on P is a partial order if it satisfies the following properties:
                  </p>
                  <ul>
                    <li><strong>Reflexive:</strong> For all a in P, a ≤ a</li>
                    <li><strong>Antisymmetric:</strong> For all a,b in P, (a ≤ b and b ≤ a) implies a = b</li>
                    <li><strong>Transitive:</strong> For all a,b,c in P, (a ≤ b and b ≤ c) implies a ≤ c</li>
                  </ul>
                  <p>If a relation satisfies these, it is called a partial order, and the pair (P,≤) is called a partially ordered set, or poset.</p>
                </div>
              </div>
              <!-- LET'S TRY Card -->
              <div class="problem-box">
                <h4> Mastery Quiz 1</h4>
                <p><strong>QUESTION: The relation “is a subset of” (⊆) on the power set of {1,2,3} is a partial order. (True/False)</strong></p>
                <input
                  v-model="partialOrderAnswer"
                  placeholder="Type True or False"
                  class="answer-input"
                />
                <button @click="checkPartialOrderAnswer" class="submit-button" :disabled="!partialOrderAnswer.trim()">CHECK ANSWER</button>
                <div v-if="partialOrderFeedback" class="result-box">
                  <p>{{ partialOrderFeedback }}</p>
                </div>
              </div>
              <!-- EXERCISE 2 Card -->
              <div class="problem-box">
                <h4> Mastery Quiz 2</h4>
                <p><strong>QUESTION: The pair (P,≤), where P is a set and ≤ is a partial order, is called a __________.</strong></p>
                <input
                  v-model="posetAnswer"
                  placeholder="Type your answer here"
                  class="answer-input"
                />
                <button @click="checkPosetAnswer" class="submit-button" :disabled="!posetAnswer.trim()">CHECK ANSWER</button>
                <button @click="hasseDiagramPageActive = true" class="next-button">➡️ Next</button>
                <div v-if="posetFeedback" class="result-box">
                  <p>{{ posetFeedback }}</p>
                </div>
              </div>
            </div>
            <!-- Function Special Content -->
            <div v-if="topics[selectedTopic].type === 'function'">
              <img
                src="/images/function3.jpg"
                alt="Function"
                class="lesson-image"
              />
              <div class="content-box">
                <h4>📘 Key Terms</h4>
                <div class="definition-box" style="display: flex; flex-direction: row;">
                  <div style="margin-right: 20px;">
                    <img
                      src="/images/codomain.png"
                      alt="Key Terms"
                      class="lesson-image"
                    />
                    <p><strong>Domain:</strong> The set of all possible inputs (values you can plug into the function).</p>
                    <p><strong>Codomain:</strong> The set that contains all possible outputs (values the function could give).</p>
                    <p><strong>Range:</strong> The set of actual outputs that the function produces (subset of codomain).</p>
                  </div>
                </div>
                <button @click="examplesOfFunctionsPageActive = true" class="next-button">➡️ Next</button>
              </div>
            </div>
            <!-- Types of Functions Special Content -->
            <div v-if="topics[selectedTopic].type === 'types-of-functions'">
              <div class="content-box">
                <h4>📘One-to-One Function (Injective)</h4>
                <div class="definition-box">
                  <p>
                    A function is one-to-one (or injective) if different inputs have different outputs. Formally:<br>
                    f(a) = f(b) ⇒ a = b<br>
                    or equivalently, a ≠ b ⇒ f(a) ≠ f(b)
                  </p>
                </div>
                <div class="guide-box">
                  <button v-if="!showInjectiveGuide" @click="showInjectiveGuide = true" class="next-button">CLICK TO SHOW</button>
                  <div v-if="showInjectiveGuide" class="guide-container">
                    <button @click="showInjectiveGuide = false" class="next-button">CLICK TO HIDE</button>
                    <div class="guide-title">📘 Your Guide</div>
                    <p>Goal: Show that f(x) = 2x + 1 is injective.</p>
                    <div v-for="(step, index) in injectiveSteps" :key="index" class="step-box">
                      <button @click="toggleInjectiveStep(index)" class="step-button">Step {{ index + 1 }}</button>
                      <span v-if="injectiveRevealedSteps.includes(index)" class="step-arrow">→</span>
                      <span v-if="injectiveRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Injective Function Exercise -->
              <div class="content-box">
                <h4> Mastery Quiz 1</h4>
                <p><strong>Q1. Identify if the function f(x) = 3x - 4, where f: ℝ → ℝ, is injective or not.</strong></p>
                <p>The function is:</p>
                <div class="option-box">
                  <button
                    class="option-button"
                    :class="{ selected: injectiveExerciseAnswer === 'injective' }"
                    @click="injectiveExerciseAnswer = 'injective'; checkInjectiveExerciseAnswer()"
                  >
                    Injective
                  </button>
                  <button
                    class="option-button"
                    :class="{ selected: injectiveExerciseAnswer === 'surjective' }"
                    @click="injectiveExerciseAnswer = 'surjective'; checkInjectiveExerciseAnswer()"
                  >
                    Surjective
                  </button>
                </div>
                <div v-if="injectiveExerciseFeedback" class="result-box">
                  <p>{{ injectiveExerciseFeedback }}</p>
                </div>
              </div>
              <!-- Surjective Function Example -->
              <div class="content-box">
                <h4>📘 Onto Function (Surjective)</h4>
                <div class="definition-box">
                  <p>
                    A function is onto (or surjective) if every element in the codomain is mapped by some input from the domain.
For every b ∈ B, there exists an a ∈ A such that f(a)=b.
                  </p>
                </div>
                <div class="guide-box">
                  <button v-if="!showSurjectiveGuide" @click="showSurjectiveGuide = true" class="next-button">CLICK TO SHOW</button>
                  <div v-if="showSurjectiveGuide" class="guide-container">
                    <button @click="showSurjectiveGuide = false" class="next-button">CLICK TO HIDE</button>
                    <div class="guide-title">📘 Your Guide</div>
                    <p>Goal: Show that f(x) = x³ is surjective from ℝ to ℝ.</p>
                    <div v-for="(step, index) in surjectiveSteps" :key="index" class="step-box">
                      <button @click="toggleSurjectiveStep(index)" class="step-button">Step {{ index + 1 }}</button>
                      <span v-if="surjectiveRevealedSteps.includes(index)" class="step-arrow">→</span>
                      <span v-if="surjectiveRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- LET'S TRY Card -->
              <div class="problem-box">
                <h4> Mastery Quiz 2</h4>
                <p><strong>QUESTION: Identify if the function f(x) = 2x + 1, where f: ℝ → ℝ, is surjective or not.</strong></p>
                <p>The function is:</p>
                <div class="option-box">
                  <button
                    class="option-button"
                    :class="{ selected: surjectiveAnswer === 'injective' }"
                    @click="surjectiveAnswer = 'injective'; checkSurjectiveAnswer()"
                  >
                    Injective
                  </button>
                  <button
                    class="option-button"
                    :class="{ selected: surjectiveAnswer === 'surjective' }"
                    @click="surjectiveAnswer = 'surjective'; checkSurjectiveAnswer()"
                  >
                    Surjective
                  </button>
                </div>
                <div v-if="surjectiveFeedback" class="result-box">
                  <p>{{ surjectiveFeedback }}</p>
                </div>
              </div>
              <!-- Bijective Function Example -->
              <div class="content-box">
                <h4>📘 Bijective Function (One-to-One and Onto)</h4>
                <div class="definition-box">
                  <p>
                    A function is bijective if it is both one-to-one and onto.
                    This means that every input maps to a unique output, and every output has a preimage.
                  </p>
                </div>
                <div class="guide-box">
                  <button v-if="!showBijectiveGuide" @click="showBijectiveGuide = true" class="next-button">CLICK TO SHOW</button>
                  <div v-if="showBijectiveGuide" class="guide-container">
                    <button @click="showBijectiveGuide = false" class="next-button">CLICK TO HIDE</button>
                    <div class="guide-title">📘 Your Guide</div>
                    <p>Goal: Show that f(x) = x + 5 is bijective from ℝ to ℝ.</p>
                    <div v-for="(step, index) in bijectiveSteps" :key="index" class="step-box">
                      <button @click="toggleBijectiveStep(index)" class="step-button">Step {{ index + 1 }}</button>
                      <span v-if="bijectiveRevealedSteps.includes(index)" class="step-arrow">→</span>
                      <span v-if="bijectiveRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Bijective Function Exercise -->
              <div class="problem-box">
                <h4> Mastery Quiz 3</h4>
                <p><strong>QUESTION: Identify if the function f(x) = x + 5, where f: ℝ → ℝ, is bijective or not.</strong></p>
                <p>The function is:</p>
                <div class="option-box">
                  <button
                    class="option-button"
                    :class="{ selected: bijectiveExerciseAnswer === 'bijective' }"
                    @click="bijectiveExerciseAnswer = 'bijective'; checkBijectiveExerciseAnswer()"
                  >
                    Bijective
                  </button>
                  <button
                    class="option-button"
                    :class="{ selected: bijectiveExerciseAnswer === 'not bijective' }"
                    @click="bijectiveExerciseAnswer = 'not bijective'; checkBijectiveExerciseAnswer()"
                  >
                    Not Bijective
                  </button>
                </div>
                <div v-if="bijectiveExerciseFeedback" class="result-box">
                  <p>{{ bijectiveExerciseFeedback }}</p>
                </div>
              </div>
              <button @click="operationsOnFunctionsPageActive = true" class="next-button">➡️ Next</button>
            </div>
            <!-- Function Composition Special Content -->
            <div v-if="topics[selectedTopic].type === 'function-composition'">
              <div class="content-box">
                <h4>📘 Function Composition</h4>
                <div class="definition-box">
                  <p>
                    Function composition is the process of applying one function to the result of another function.<br>
                    If you have two functions:<br>
                    • f : A → B<br>
                    • g : B → C<br>
                    Then the composition of g with f, written as:<br>
                    ( g ∘ f ) (x) = g (f(x))
                  </p>
                </div>
                <div class="guide-box">
                  <button v-if="!showCompositionGuide" @click="showCompositionGuide = true" class="next-button">CLICK TO SHOW</button>
                  <div v-if="showCompositionGuide" class="guide-container">
                    <button @click="showCompositionGuide = false" class="next-button">CLICK TO HIDE</button>
                    <div class="guide-title">📘 Your Guide</div>
                    <p>Goal: Compute (g ∘ f)(2) where f(x) = x + 1 and g(x) = x².</p>
                    <div v-for="(step, index) in compositionSteps" :key="index" class="step-box">
                      <button @click="toggleCompositionStep(index)" class="step-button">Step {{ index + 1 }}</button>
                      <span v-if="compositionRevealedSteps.includes(index)" class="step-arrow">→</span>
                      <span v-if="compositionRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Properties of Composition of Functions -->
              <div class="content-box">
                <h4>📘 Properties of Composition of Functions</h4>
                <div class="definition-box">
                  <ol>
                    <li><strong>Associativity:</strong> h ∘ ( g ∘ f ) = ( h ∘ g ) ∘ f</li>
                    <li><strong>Identity Function:</strong> Let I ( x ) = x (identity function), then: f ∘ I = f and I ∘ f = f</li>
                  </ol>
                </div>
              </div>
              <!-- Inverse Function -->
              <div class="content-box">
                <h4>📘 Inverse Function</h4>
                <div class="definition-box">
                  <p>
                    The inverse function of a function f, denoted f<sup>-1</sup>, "reverses" the action of f.<br>
                    If f takes input x and gives output y, then f<sup>-1</sup> takes y and returns x.<br>
                    If f (x) = y, then f<sup>-1</sup> (y) = x
                  </p>
                </div>
                <div class="guide-box">
                  <button v-if="!showInverseGuide" @click="showInverseGuide = true" class="next-button">CLICK TO SHOW</button>
                  <div v-if="showInverseGuide" class="guide-container">
                    <button @click="showInverseGuide = false" class="next-button">CLICK TO HIDE</button>
                    <div class="guide-title">📘 Your Guide</div>
                    <p>Given a function f(x):</p>
                    <div v-for="(step, index) in inverseSteps" :key="index" class="step-box">
                      <button @click="toggleInverseStep(index)" class="step-button">Step {{ index + 1 }}</button>
                      <span v-if="inverseRevealedSteps.includes(index)" class="step-arrow">→</span>
                      <span v-if="inverseRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Inverse Function Exercise -->
              <div class="problem-box">
                <h4> Mastery Quiz 1</h4>
                <p><strong>Let f(x)=2x+3. Find the inverse function.</strong></p>
                <div class="guide-box">
                  <button v-if="!showInverseExerciseGuide" @click="showInverseExerciseGuide = true" class="next-button">CLICK TO SHOW</button>
                  <div v-if="showInverseExerciseGuide" class="guide-container">
                    <button @click="showInverseExerciseGuide = false" class="next-button">CLICK TO HIDE</button>
                    <div class="guide-title">📘 Your Guide</div>
                    <div v-for="(step, index) in inverseExerciseSteps" :key="index" class="step-box">
                      <button @click="toggleInverseExerciseStep(index)" class="step-button">Step {{ index + 1 }}</button>
                      <span v-if="inverseExerciseRevealedSteps.includes(index)" class="step-arrow">→</span>
                      <span v-if="inverseExerciseRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
                    </div>
                  </div>
                </div>
                <input
                  v-model="inverseExerciseAnswer"
                  placeholder="Type the inverse function here"
                  class="answer-input"
                />
                <button @click="checkInverseExerciseAnswer" class="submit-button" :disabled="!inverseExerciseAnswer.trim()">CHECK ANSWER</button>
                <div v-if="inverseExerciseFeedback" class="result-box">
                  <p>{{ inverseExerciseFeedback }}</p>
                </div>
              </div>
              <button @click="graphicalRelationshipPageActive = true" class="next-button">➡️ Next</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Graphical Relationship Page -->
      <div v-else-if="graphicalRelationshipPageActive" class="content-box">
        <h4>📘 Graphical Relationship</h4>
        <div class="definition-box">
          <p>• The graph of a function and its inverse are reflections of each other across the line y=x.</p>
        </div>
        <!-- How to Check if Two Functions are Inverses Card -->
        <div class="content-box">
          <h4>📘 How to Check if Two Functions are Inverses</h4>
          <div class="definition-box">
            <p>You can verify using:<br>
            f (f<sup>-1</sup> (x)) = x<br>
            f<sup>-1</sup> (f(x)) = x</p>
          </div>
        </div>
        <button @click="goBackToLesson" class="next-button">⬅️ Back to Lesson</button>
      </div>
      <!-- Binary Relations - Additional Practice -->
      <div v-else-if="subsetPageActive" class="content-box">
        <h4>📘 Binary Relations </h4>
        <div class="definition-box">
          <p>
            A binary relation formalizes the idea of a relationship between elements of two sets — or within a single set — using ordered pairs.<br>
            ➡️ A binary relation R from a set A to a set B is a subset of the Cartesian product <strong> A×B.</strong><br>
            R⊆A×B
          </p>
        </div>
        <!-- Special Case: Relation on One Set -->
        <div class="content-box">
          <h4>📘 Special Case: Relation on One Set</h4>
          <div class="definition-box">
            <p>
              If A=B, then R ⊆ A × A, and R is called a relation on set A.
            </p>
          </div>
          <img
            src="/images/binarysp.png"
            alt="Relation on One Set"
            class="lesson-image"
          />
        </div>
        <!-- Properties of Binary Relations -->
        <div class="content-box">
          <h4>📘 Properties of Binary Relations</h4>
          <table class="relation-properties-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Reflexive</td>
                <td>∀a∈A, (a,a)∈R</td>
              </tr>
              <tr>
                <td>Symmetric</td>
                <td>(a,b)∈R⇒(b,a)∈R</td>
              </tr>
              <tr>
                <td>Antisymmetric</td>
                <td>(a,b)∈R and (b,a)∈R⇒a=b</td>
              </tr>
              <tr>
                <td>Transitive</td>
                <td>(a,b)∈R and (b,c)∈R⇒(a,c)∈R</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Binary Relations - LET'S TRY -->
        <div class="content-box">
          <h4> Mastery Quiz</h4>
          <p>
            <strong>QUESTION 1: Which of the following describes a reflexive relation?</strong>
          </p>
          <div v-for="(option, optIndex) in reflexiveQuiz.options" :key="optIndex" class="option-box">
            <label class="option-label">
              <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
              <input type="radio" name="reflexiveQuiz" :value="option" v-model="secondCardAnswer" />
              <span class="option-text">{{ option }}</span>
            </label>
          </div>
          <button @click="checkSecondCardAnswer" class="submit-button" :disabled="!secondCardAnswer">CHECK ANSWER</button>
          <div v-if="secondCardFeedback" class="result-box">
            <p>{{ secondCardFeedback }}</p>
          </div>
          <!-- Back to Lesson button -->
          <button @click="goBackToLesson" class="next-button">⬅️ Back to Lesson</button>
        </div>
      </div>
      <!-- Hasse Diagram Lesson -->
      <div v-else-if="hasseDiagramPageActive" class="content-box">
        <h4>📘 Hasse Diagram</h4>
        <div class="definition-box">
          <p>
            A Hasse diagram is a type of graph used to represent a finite partially ordered set (poset). It helps visualize the ordering among elements without cluttering the diagram with all reflexive and transitive relations.
          </p>
        </div>
        <div class="content-box">
          <h4>📘 Features of a Hasse Diagram</h4>
          <div class="definition-box">
            <ul>
              <li><strong>Vertices:</strong> Elements of the set</li>
              <li><strong>Edges:</strong> Drawn upward from lower to higher elements</li>
              <li><strong>No arrows needed:</strong> Direction is implicitly "up"</li>
              <li><strong>Reflexive edges are omitted</strong></li>
              <li><strong>Transitive edges are also omitted to avoid redundancy</strong></li>
            </ul>
          </div>
        </div>
        <div class="content-box">
          <h6>Example: Divisibility on {1, 2, 4, 8}</h6>
          <div class="definition-box">
            <p>
              Define the partial order:<br>
              a≤b if a∣b<br>
              • Set: P={1,2,4,8}<br>
              • Relation: (divides)<br>
              Hasse Diagram:<br>
              8<br>
              |<br>
              4<br>
              |<br>
              2<br>
              |<br>
              1
            </p>
          </div>
        </div>
        <!-- Hasse Diagram Exercise 1 -->
        <div class="problem-box">
          <h4> Mastery Quiz 1</h4>
          <p><strong>QUESTION: Let P={1,2,4,8,16} with divisibility relation. Which elements appear on the top and bottom of the Hasse diagram?</strong></p>
          <div class="answer-container">
            <span>Top:</span>
            <input
              v-model="hasseTopAnswer"
              placeholder="Type the top element"
              class="answer-input"
            />
            <span>Bottom:</span>
            <input
              v-model="hasseBottomAnswer"
              placeholder="Type the bottom element"
              class="answer-input"
            />
          </div>
          <button @click="checkHasseAnswer" class="submit-button" :disabled="!hasseTopAnswer.trim() || !hasseBottomAnswer.trim()">CHECK ANSWER</button>
          <div v-if="hasseFeedback" class="result-box">
            <p>{{ hasseFeedback }}</p>
          </div>
        </div>
        <!-- Back and Next buttons -->
        <div class="button-group">
          <button @click="goBackToLesson" class="next-button">⬅️ Back</button>
          <button @click="hasseDiagramPageActive = false; equivalencePageActive = true" class="next-button">➡️ Next</button>
        </div>
      </div>
      <!-- Equivalence Relation Lesson -->
      <div v-else-if="equivalencePageActive" class="content-box">
        <h4>📘 Equivalence Relation</h4>
        <div class="definition-box">
          <p>
            An equivalence relation on a set is a binary relation that satisfies the following three properties:
          </p>
          <ol>
            <li><strong>Reflexive:</strong> Every element is related to itself. For all a∈A, a∼a.</li>
            <li><strong>Symmetric:</strong> If one element is related to another, then the second is related to the first. If a∼b, then b∼a.</li>
            <li><strong>Transitive:</strong> If one element is related to a second, and the second to a third, then the first is related to the third. If a∼b and b∼c, then a∼c.</li>
          </ol>
        </div>
        <!-- Equivalence Class Card -->
        <div class="content-box">
          <h4>📘 Equivalence Class</h4>
          <div class="definition-box">
            <p>
              Given an equivalence relation ∼ on a set A, the equivalence class of an element a∈A is the set of all elements in A that are equivalent to a:<br>
              [a]={x ∈ A ∣ x ∼ a}<br>
              This set [a] contains all elements that are considered "the same" as a under the equivalence relation.
            </p>
          </div>
        </div>
        <!-- Equivalence Relation Example Card -->
        <div class="content-box">
          <h4>📘 Example: </h4>
          <div class="definition-box">
            <p>
             <strong> Let A=ℤ (set of all integers), and define a∼b if a≡b (mod 3).</strong><br>
             <br><br> <strong>This relation is:</strong><br>
              ◦ <strong>Reflexive:</strong> a ≡ a mod 3<br>
              ◦ <strong>Symmetric:</strong> If a ≡ b mod 3, then b ≡ a mod 3<br>
              ◦ <strong>Transitive:</strong> If a ≡ b mod 3 and b ≡ c mod 3, then a ≡ c mod 3<br>
              <br><br>• The equivalence class of 1 under this relation is:<br>
              <strong>[1] = {x ∈ ℤ ∣ x ≡ 1 (mod 3)} = {…, −5, −2, 1, 4, 7, …}</strong>
            </p>
          </div>
        </div>
        <!-- Back to Lesson button -->
        <button @click="goBackToLesson" class="next-button">⬅️ Back to Lesson</button>
      </div>
      <!-- Examples of Functions Page -->
      <div v-else-if="examplesOfFunctionsPageActive" class="content-box">
        <h4>📘Examples of Functions</h4>
        <div class="definition-box">
          <p>
            <strong>1. Algebraic Function<br> </strong>
            • Let f(x)=2x+3<br>
            • Domain: All real numbers R<br>
            • Example: f(2)=2(2)+3=7
          </p>
        </div>
        <div class="guide-box">
          <button v-if="!showAlgebraicGuide" @click="showAlgebraicGuide = true" class="next-button">CLICK TO SHOW</button>
          <div v-if="showAlgebraicGuide" class="guide-container">
            <button @click="showAlgebraicGuide = false" class="next-button">CLICK TO HIDE</button>
            <div class="guide-title">📘 Your Guide</div>
            <p>Goal: Evaluate f(2) for f(x) = 2x + 3.</p>
            <div v-for="(step, index) in algebraicSteps" :key="index" class="step-box">
              <button @click="toggleAlgebraicStep(index)" class="step-button">Step {{ index + 1 }}</button>
              <span v-if="algebraicRevealedSteps.includes(index)" class="step-arrow">→</span>
              <span v-if="algebraicRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
            </div>
          </div>
        </div>
        <div class="definition-box">
          <p>
            <strong>2. Piecewise Function<br> </strong>
          </p>
        </div>
        <img
          src="/images/pricewise.png"
          alt="Piecewise Function"
          class="lesson-image"
        />
        <div class="guide-box">
          <button v-if="!showPiecewiseGuide" @click="showPiecewiseGuide = true" class="next-button">CLICK TO SHOW</button>
          <div v-if="showPiecewiseGuide" class="guide-container">
            <button @click="showPiecewiseGuide = false" class="next-button">CLICK TO HIDE</button>
            <div class="guide-title">📘 Your Guide</div>
            <p>Goal: Evaluate f(-1) and f(2) for the piecewise function f(x).</p>
            <div v-for="(step, index) in piecewiseSteps" :key="index" class="step-box">
              <button @click="togglePiecewiseStep(index)" class="step-button">Step {{ index + 1 }}</button>
              <span v-if="piecewiseRevealedSteps.includes(index)" class="step-arrow">→</span>
              <span v-if="piecewiseRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
            </div>
          </div>
        </div>
        <div class="definition-box">
          <p>
            <strong>3. Absolute Value Function<br> </strong>
            • \( f(x) = |x| \)<br>
            • Example: \( f(-3) = 3 \)
          </p>
        </div>
        <div class="guide-box">
          <button v-if="!showAbsoluteGuide" @click="showAbsoluteGuide = true" class="next-button">CLICK TO SHOW</button>
          <div v-if="showAbsoluteGuide" class="guide-container">
            <button @click="showAbsoluteGuide = false" class="next-button">CLICK TO HIDE</button>
            <div class="guide-title">📘 Your Guide</div>
            <p>Goal: Evaluate f(-3) for f(x) = |x|.</p>
            <div v-for="(step, index) in absoluteSteps" :key="index" class="step-box">
              <button @click="toggleAbsoluteStep(index)" class="step-button">Step {{ index + 1 }}</button>
              <span v-if="absoluteRevealedSteps.includes(index)" class="step-arrow">→</span>
              <span v-if="absoluteRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
            </div>
          </div>
        </div>
        <div class="definition-box">
          <p>
            <strong>4. Mapping Example<br> </strong>
            • Let A={1,2,3} and B={a,b,c},<br>
            • If f(1) =a, f(2) = b, f(3) =a,<br>
            • then f is a valid function.<br>
            • A function can assign the same output to different inputs, but one input cannot have more than one output.
          </p>
        </div>
        <div class="guide-box">
          <button v-if="!showMappingGuide" @click="showMappingGuide = true" class="next-button">CLICK TO SHOW</button>
          <div v-if="showMappingGuide" class="guide-container">
            <button @click="showMappingGuide = false" class="next-button">CLICK TO HIDE</button>
            <div class="guide-title">📘 Your Guide</div>
            <p>Goal: Verify if the mapping defines a valid function.</p>
            <div v-for="(step, index) in mappingSteps" :key="index" class="step-box">
              <button @click="toggleMappingStep(index)" class="step-button">Step {{ index + 1 }}</button>
              <span v-if="mappingRevealedSteps.includes(index)" class="step-arrow">→</span>
              <span v-if="mappingRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
            </div>
          </div>
        </div>
        <button @click="examplesOfFunctionsPageActive = false; functionQuizPageActive = true" class="next-button">➡️ Next</button>
        <button @click="goBackToLesson" class="next-button">⬅️ Back to Lesson</button>
      </div>
      <!-- Function Quiz Page -->
      <div v-else-if="functionQuizPageActive" class="content-box">
        <h4>📘 Function Quiz</h4>
        <div class="problem-box">
          <h4> Mastery Quiz 1</h4>
          <p><strong>QUESTION: Which of the following is a function?</strong></p>
          <div v-for="(option, optIndex) in functionQuiz.options" :key="optIndex" class="option-box">
            <label class="option-label">
              <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
              <input type="radio" name="functionQuiz" :value="option" v-model="functionQuizAnswer" />
              <span class="option-text">{{ option }}</span>
            </label>
          </div>
          <button @click="checkFunctionQuizAnswer" class="submit-button" :disabled="!functionQuizAnswer">CHECK ANSWER</button>
          <div v-if="functionQuizFeedback" class="result-box">
            <p>{{ functionQuizFeedback }}</p>
          </div>
        </div>
        <div class="problem-box">
          <h4> Mastery Quiz 2</h4>
          <p><strong>QUESTION: Which of the following is not a function?</strong></p>
          <div v-for="(option, optIndex) in functionQuiz2.options" :key="optIndex" class="option-box">
            <label class="option-label">
              <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
              <input type="radio" name="functionQuiz2" :value="option" v-model="functionQuiz2Answer" />
              <span class="option-text">{{ option }}</span>
            </label>
          </div>
          <button @click="checkFunctionQuiz2Answer" class="submit-button" :disabled="!functionQuiz2Answer">CHECK ANSWER</button>
          <div v-if="functionQuiz2Feedback" class="result-box">
            <p>{{ functionQuiz2Feedback }}</p>
          </div>
        </div>
        <div class="problem-box">
          <h4> Mastery Quiz 3</h4>
          <p><strong>QUESTION: Which of the following set is a function?</strong></p>
          <div v-for="(option, optIndex) in functionQuiz3.options" :key="optIndex" class="option-box">
            <label class="option-label">
              <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
              <input type="radio" name="functionQuiz3" :value="option" v-model="functionQuiz3Answer" />
              <span class="option-text">{{ option }}</span>
            </label>
          </div>
          <button @click="checkFunctionQuiz3Answer" class="submit-button" :disabled="!functionQuiz3Answer">CHECK ANSWER</button>
          <div v-if="functionQuiz3Feedback" class="result-box">
            <p>{{ functionQuiz3Feedback }}</p>
          </div>
        </div>
        <div class="problem-box">
          <h4> Mastery Quiz 4</h4>
          <p><strong>QUESTION: Given the absolute value function f(x)=|x|, what is the value of f(5)?</strong></p>
          <p>Step 1: ➡️ Check if 5≥0 → yes.</p>
          <p>Step 2: ➡️ For x≥0, |x|=x.</p>
          <p>Step 3: ➡️ So, |5| = ?</p>
          <input
            v-model="functionQuiz4Answer"
            placeholder="Type your answer here"
            class="answer-input"
          />
          <button @click="checkFunctionQuiz4Answer" class="submit-button" :disabled="!functionQuiz4Answer.trim()">CHECK ANSWER</button>
          <div v-if="functionQuiz4Feedback" class="result-box">
            <p>{{ functionQuiz4Feedback }}</p>
          </div>
        </div>
        <button @click="functionQuizPageActive = false; examplesOfFunctionsPageActive = true" class="next-button">⬅️ Back to Examples</button>
        <button @click="goBackToLesson" class="next-button">⬅️ Back to Lesson</button>
      </div>
      <!-- Operations on Functions Page -->
      <div v-else-if="operationsOnFunctionsPageActive" class="content-box">
        <h4>📘 Operations on Functions (NOT Composition)</h4>
        <div class="definition-box">
          <p>
            These operations are performed pointwise (at each input value) and are not the same as composition. Here's how they work:<br>
            Let f(x) and g(x) be two functions.
          </p>
        </div>
        <div class="content-box">
          <h4>Addition of Functions</h4>
          <div class="definition-box">
            <p>( f + g ) ( x ) = f (x) + g(x)</p>
          </div>
          <div class="guide-box">
            <button v-if="!showAdditionGuide" @click="showAdditionGuide = true" class="next-button">CLICK TO SHOW</button>
            <div v-if="showAdditionGuide" class="guide-container">
              <button @click="showAdditionGuide = false" class="next-button">CLICK TO HIDE</button>
              <div class="guide-title">📘 Your Guide</div>
              <p>Example: If f(x)=2x, and g(x)=x+3, then (f+g) (x) = 2x + (x+3) = 3x+3</p>
              <div v-for="(step, index) in additionSteps" :key="index" class="step-box">
                <button @click="toggleAdditionStep(index)" class="step-button">Step {{ index + 1 }}</button>
                <span v-if="additionRevealedSteps.includes(index)" class="step-arrow">→</span>
                <span v-if="additionRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-box">
          <h4>Subtraction of Functions</h4>
          <div class="definition-box">
            <p>( f – g ) (x) = f(x) − g(x)</p>
          </div>
          <div class="guide-box">
            <button v-if="!showSubtractionGuide" @click="showSubtractionGuide = true" class="next-button">CLICK TO SHOW</button>
            <div v-if="showSubtractionGuide" class="guide-container">
              <button @click="showSubtractionGuide = false" class="next-button">CLICK TO HIDE</button>
              <div class="guide-title">📘 Your Guide</div>
              <p>Example: If f(x)=2x, and g(x)=x+3, then ( f – g ) (x) = 2x − ( x + 3 ) = x − 3</p>
              <div v-for="(step, index) in subtractionSteps" :key="index" class="step-box">
                <button @click="toggleSubtractionStep(index)" class="step-button">Step {{ index + 1 }}</button>
                <span v-if="subtractionRevealedSteps.includes(index)" class="step-arrow">→</span>
                <span v-if="subtractionRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-box">
          <h4>Multiplication of Functions</h4>
          <div class="definition-box">
            <p>( f ⋅ g ) (x) = f(x) ⋅ g(x)</p>
          </div>
          <div class="guide-box">
            <button v-if="!showMultiplicationGuide" @click="showMultiplicationGuide = true" class="next-button">CLICK TO SHOW</button>
            <div v-if="showMultiplicationGuide" class="guide-container">
              <button @click="showMultiplicationGuide = false" class="next-button">CLICK TO HIDE</button>
              <div class="guide-title">📘 Your Guide</div>
              <p>Example: If f(x)=2x, and g(x)=x+3, then (f ⋅ g) (x) = 2x ⋅ (x+3) = 2x² + 6x</p>
              <div v-for="(step, index) in multiplicationSteps" :key="index" class="step-box">
                <button @click="toggleMultiplicationStep(index)" class="step-button">Step {{ index + 1 }}</button>
                <span v-if="multiplicationRevealedSteps.includes(index)" class="step-arrow">→</span>
                <span v-if="multiplicationRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-box">
          <h4>Division of Functions</h4>
          <div class="definition-box">
            <p>(f/g)(x) = f(x)/g(x), where g(x) ≠ 0.</p>
          </div>
          <div class="guide-box">
            <button v-if="!showDivisionGuide" @click="showDivisionGuide = true" class="next-button">CLICK TO SHOW</button>
            <div v-if="showDivisionGuide" class="guide-container">
              <button @click="showDivisionGuide = false" class="next-button">CLICK TO HIDE</button>
              <div class="guide-title">📘 Your Guide</div>
              <p>Example: If f(x)=2x, and g(x)=x+3, then (f/g)(x) = 2x/(x+3)</p>
              <div v-for="(step, index) in divisionSteps" :key="index" class="step-box">
                <button @click="toggleDivisionStep(index)" class="step-button">Step {{ index + 1 }}</button>
                <span v-if="divisionRevealedSteps.includes(index)" class="step-arrow">→</span>
                <span v-if="divisionRevealedSteps.includes(index)" class="step-description">{{ step }}</span>
              </div>
            </div>
          </div>
        </div>
        <button @click="goBackToLesson" class="next-button">⬅️ Back to Lesson</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LessonTopicThree",
  data() {
    return {
      preTestCompleted: false,
      showPreTestResult: false,
      score: 0,
      userAnswers: [],
      preTestQuestions: [
        { question: "Which of the following is a subset of {1, 2, 3}?", options: ["{1,2}", "{4}", "{1,4}", "{1,2,3,4}"], answer: "{1,2}", explanation: "A subset must contain only elements from the original set. {1,2} are both in {1,2,3}, while {4} and {1,4} introduce 4 which is not." },
        { question: "For the relation R = {(1, a), (2, b), (3, a)}, what is the domain?", options: ["{a, b}", "{1, 2, 3}", "{1, 3}", "{a}"], answer: "{1, 2, 3}", explanation: "The domain is the set of all first elements in the ordered pairs: 1,2,3." },
        { question: "Which of the following relations is a function?", options: ["{(1,2), (1,3)}", "{(1,2), (2,3), (3,4)}", "{(1,2), (3,2)}", "{(1,2), (1,3), (2,4)}"], answer: "{(1,2), (2,3), (3,4)}", explanation: "A function requires each input to map to exactly one output. The first has 1 mapping to both 2 and 3, invalid. The second has unique inputs each to one output." },
        { question: "Which property is NOT required for an equivalence relation?", options: ["Reflexive", "Symmetric", "Transitive", "Antisymmetric"], answer: "Antisymmetric", explanation: "Equivalence relations require reflexive, symmetric, transitive. Antisymmetric is for partial orders." },
        { question: "Is the function f(x) = x^2 from ℝ to ℝ injective?", options: ["Yes", "No", "Sometimes", "It depends on the domain"], answer: "No", explanation: "f(2)=4 and f(-2)=4, so different inputs same output, not injective." }
      ],
      selectedTopic: null,
      showSolution: Array(5).fill({ main: false, alt: false }),
      revealedSteps: Array(5).fill({ main: [], alt: [] }),
      viewedTopics: new Set(),
      examplesOfFunctionsPageActive: false,
      functionQuizPageActive: false,
      typesOfFunctionsPageActive: false,
      operationsOnFunctionsPageActive: false,
      graphicalRelationshipPageActive: false,
      subsetAnswer: "",
      subsetFeedback: "",
      subsetSteps: [
        "Example: A set of Even numbers E = {0, 2, 4, 6, 8, 10}",
        "Check if every element of A is in B: 1 ∈ B and 2 ∈ B.",
        "Therefore, A is a subset of B (A ⊆ B).",
        "A valid subset you can type is {1,2}."
      ],
      subsetRevealedSteps: [],
      showSubsetGuide: false,
      subsetQuiz: {
        options: ["{1, 3, 5, 7, 9}", "{0, 2, 4, 6, 8, 10}", "{2, 3, 5, 7}", "{4, 6, 8, 10, 12}"],
        answer: "{1, 2, 3}"
      },
      subsetQuizAnswer: "",
      subsetQuizFeedback: "",
      subsetPageActive: false,
      unionPageActive: false,
      unionAnswer: "",
      unionFeedback: "",
      unionSteps: [
        "Identify the odd numbers between 1 and 7: 1, 3, 5, 7.",
        "Write them in roster form by listing all elements inside curly braces.",
        "Ensure the spaces are separated by commas.",
        "Result: {1, 3, 5, 7}."
      ],
      unionRevealedSteps: [],
      showUnionGuide: false,
      representationQuiz: {
        options: ["{1, 3, 5, 7}", "{2, 4, 6}", "{1, 2, 3}", "{1, 3, 5}"],
        answer: "{1, 3, 5, 7}"
      },
      secondUnionAnswer: "",
      secondUnionFeedback: "",
      secondRepresentationQuiz: {
        options: [
          "{x | x is a vowel in the English alphabet}",
          "{x | x is a consonant in the English alphabet}",
          "{x | x is a letter in the English alphabet}",
          "{x | x is a vowel, x ∈ {a, b, c}}"
        ],
        answer: "{x | x is a vowel in the English alphabet}"
      },
      thirdUnionAnswer: "",
      thirdUnionFeedback: "",
      thirdRepresentationQuiz: {
        options: [
          "{2, 3, 5, 7}",
          "{1, 3, 5}",
          "{2, 4, 6, 8}",
          "{1, 2, 3, 4}"
        ],
        answer: "{2, 3, 5, 7}"
      },
      secondCardAnswer: "",
      secondCardFeedback: "",
      secondCardSteps: [],
      secondCardRevealedSteps: [],
      showSecondCardGuide: false,
      reflexiveQuiz: {
        options: [
          "(a,b)∈R⇒(b,a)∈R",
          "∀a∈A, (a,a)∈R",
          "(a,b)∈R and (b,c)∈R⇒(a,c)∈R",
          "(a,b)∈R and (b,a)∈R⇒a=b"
        ],
        answer: "∀a∈A, (a,a)∈R"
      },
      thirdCardAnswer: "",
      thirdCardFeedback: "",
      thirdCardRevealedSteps: [],
      showThirdCardGuide: false,
      equivalenceAnswer: "",
      equivalenceFeedback: "",
      equivalenceQuiz: {
        options: [
          "Reflexive, Antisymmetric, Transitive",
          "Reflexive, Symmetric, Transitive",
          "Symmetric, Antisymmetric, Transitive",
          "Reflexive, Symmetric, Antisymmetric"
        ],
        answer: "Reflexive, Symmetric, Transitive"
      },
      partialOrderAnswer: "",
      partialOrderFeedback: "",
      posetAnswer: "",
      posetFeedback: "",
      hasseDiagramPageActive: false,
      hasseTopAnswer: "",
      hasseBottomAnswer: "",
      hasseFeedback: "",
      equivalencePageActive: false,
      injectiveAnswer: "",
      injectiveFeedback: "",
      surjectiveAnswer: "",
      surjectiveFeedback: "",
      bijectiveTermAnswer: "",
      bijectiveTermFeedback: "",
      showInjectiveGuide: false,
      injectiveSteps: [
        "Assume f(a) = f(b)",
        "Substitute the function: 2a + 1 = 2b + 1",
        "Subtract 1 from both sides: 2a = 2b",
        "Divide both sides by 2: a = b",
        "Since f(a) = f(b) implies a = b, the function is injective."
      ],
      injectiveRevealedSteps: [],
      injectiveExerciseAnswer: "",
      injectiveExerciseFeedback: "",
      showSurjectiveGuide: false,
      surjectiveSteps: [
        "Define the function f: ℝ → ℝ, f(x) = x³.",
        "For every y in ℝ, there exists x = y^(1/3) such that f(x) = y.",
        "Therefore, the function is surjective."
      ],
      surjectiveRevealedSteps: [],
      showBijectiveGuide: false,
      bijectiveSteps: [
        "Define the function f: ℝ → ℝ, f(x) = x + 5.",
        "Show injectivity: Assume f(a) = f(b) ⇒ a + 5 = b + 5 ⇒ a = b.",
        "Show surjectivity: For any y ∈ ℝ, let x = y - 5, then f(x) = (y - 5) + 5 = y.",
        "Since it is both injective and surjective, f is bijective."
      ],
      bijectiveRevealedSteps: [],
      bijectiveExerciseAnswer: "",
      bijectiveExerciseFeedback: "",
      // POST TEST DATA
      showPostTest: false,
      showPostTestResult: false,
      postUserAnswers: [],
      postScore: 0,
      postTestQuestions: [
        { question: "Which of the following is a subset of {a,b,c}?", options: ["{a}", "{d}", "{e}"], answer: "{a}" }
      ],
      topics: [
        {
          title: "Relations",
          type: "subset",
          content: "A Relations in mathematics defines the relationship between two different sets of information.</strong>"
        },
        {
          title: "Types of Relations",
          type: "types-of-relations",
          content: "Different types of relations have specific properties that define their behavior."
        },
        {
          title: "Function",
          type: "function",
          content: "A function is a special type of relation between two sets, where each input has exactly one output. <br></br> A function <strong>f </strong> from a set A (domain) to a set B (codomain) is a rule that assigns to each element a ∈ A exactly one element b ∈ B.."
        },
        {
          title: "Types of Functions",
          type: "types-of-functions",
          content: "Functions can be classified based on their mapping properties, such as injective, surjective, and bijective."
        },
        {
          title: "Function Composition",
          type: "function-composition",
          content: "Function composition is the process of applying one function to the result of another function."
        }
      ],
      showAlgebraicGuide: false,
      algebraicSteps: [
        "Write the function: f(x) = 2x + 3.",
        "Substitute the value: f(2) = 2*2 + 3.",
        "Perform the operations: 4 + 3 = 7.",
        "Final Answer: f(2) = 7."
      ],
      algebraicRevealedSteps: [],
      showPiecewiseGuide: false,
      piecewiseSteps: [
        "Identify the condition for x: check if x < 0 or x ≥ 0.",
        "For f(-1): Since -1 < 0, use f(x) = x². Compute (-1)² = 1.",
        "For f(2): Since 2 ≥ 0, use f(x) = x + 1. Compute 2 + 1 = 3.",
        "Final Answers: f(-1) = 1, f(2) = 3."
      ],
      piecewiseRevealedSteps: [],
      showAbsoluteGuide: false,
      absoluteSteps: [
        "The absolute value function f(x) = |x| returns the non-negative value of x.",
        "For x = -3, since -3 is negative, | -3 | = -(-3) = 3.",
        "Final Answer: f(-3) = 3."
      ],
      absoluteRevealedSteps: [],
      showMappingGuide: false,
      mappingSteps: [
        "Identify the domain A = {1, 2, 3} and codomain B = {a, b, c}.",
        "Check mappings: f(1) = a, f(2) = b, f(3) = a.",
        "Verify each input has exactly one output: Yes, all inputs map to one output.",
        "Note that outputs can repeat (a for 1 and 3), which is allowed.",
        "Confirm no input has multiple outputs.",
        "Conclusion: This mapping defines a valid function."
      ],
      mappingRevealedSteps: [],
      functionQuiz: {
        options: [
          "y = x²2",
          "x²2 + y²2 = 1",
          "y²2 = x + 2",
          "x + y²2 = 3"
        ],
        answer: "y = x²2"
      },
      functionQuizAnswer: "",
      functionQuizFeedback: "",
      functionQuiz2: {
        options: [
          "x + y = 6",
          "x² + y = 15",
          "x³ + 2y = 5",
          "x + 3y² = 4"
        ],
        answer: "x + 3y² = 4"
      },
      functionQuiz2Answer: "",
      functionQuiz2Feedback: "",
      functionQuiz3: {
        options: [
          "A = {(2,3), (4,2), (1,5)}",
          "B = {(2,3), (3,2), (3,1)}",
          "C = {(1,1), (1,5), (1,6)}",
          "D = {(0,3), (0,4), (0,5)}"
        ],
        answer: "A = {(2,3), (4,2), (1,5)}"
      },
      functionQuiz3Answer: "",
      functionQuiz3Feedback: "",
      functionQuiz4Answer: "",
      functionQuiz4Feedback: "",
      showAdditionGuide: false,
      additionSteps: [
        "Identify the functions: f(x) = 2x, g(x) = x + 3.",
        "Apply the addition formula: (f + g)(x) = f(x) + g(x).",
        "Substitute: 2x + (x + 3).",
        "Final Answer: 3x + 3."
      ],
      additionRevealedSteps: [],
      showSubtractionGuide: false,
      subtractionSteps: [
        "Identify the functions: f(x) = 2x, g(x) = x + 3.",
        "Apply the subtraction formula: (f - g)(x) = f(x) - g(x).",
        "Substitute: 2x - (x + 3).",
        "Final Answer: 2x - x - 3 = x - 3."
      ],
      subtractionRevealedSteps: [],
      showMultiplicationGuide: false,
      multiplicationSteps: [
        "Identify the functions: f(x) = 2x, g(x) = x + 3.",
        "Apply the multiplication formula: (f ⋅ g)(x) = f(x) ⋅ g(x).",
        "Substitute: 2x ⋅ (x + 3).",
        "Simplify: 2x * x + 2x * 3 = 2x² + 6x.",
        "Final Answer: 2x² + 6x"
      ],
      multiplicationRevealedSteps: [],
      showDivisionGuide: false,
      divisionSteps: [
        "Identify the functions: f(x) = 2x, g(x) = x + 3.",
        "Apply the division formula: (f / g)(x) = f(x) / g(x), where g(x) ≠ 0.",
        "Substitute: 2x / (x + 3).",
        "Note: The domain excludes values where g(x) = 0, i.e., x ≠ -3.",
        "Final Answer: 2x / (x + 3)"
      ],
      divisionRevealedSteps: [],
      showCompositionGuide: false,
      compositionSteps: [
        "Compute the inner function f(2) = 2 + 1 = 3.",
        "Then apply the outer function g(3) = 3² = 9.",
        "Thus (g ∘ f)(2) = 9."
      ],
      compositionRevealedSteps: [],
      showInverseGuide: false,
      inverseSteps: [
        "Replace f(x) with y: y = f(x)",
        "Swap x and y: x = f(y)",
        "Solve for y",
        "Replace y with f^{-1}(x)"
      ],
      inverseRevealedSteps: [],
      showInverseExerciseGuide: false,
      inverseExerciseSteps: [
        "Replace f(x) with y: y = 2x + 3",
        "Swap x and y: x = 2y + 3",
        "Solve for y: x – 3 = 2y ⇒ y = (x-3)/2",
        "Replace y with f^{-1}(x): f^{-1}(x) = (x-3)/2"
      ],
      inverseExerciseRevealedSteps: [],
      inverseExerciseAnswer: "",
      inverseExerciseFeedback: ""
    };
  },
  computed: {
    preTestAllAnswered() {
      return this.userAnswers.length === this.preTestQuestions.length &&
             this.userAnswers.every(answer => answer !== undefined && answer !== '');
    },
    postTestAllAnswered() {
      return this.postUserAnswers.length === this.postTestQuestions.length &&
             this.postUserAnswers.every(answer => answer !== undefined && answer !== '');
    }
  },
  created() {
    // Shuffle questions on load
    this.preTestQuestions = this.shuffleArray(this.preTestQuestions);
    this.postTestQuestions = this.shuffleArray(this.postTestQuestions);
  },
  methods: {
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    submitPreTest() {
      this.score = this.preTestQuestions.reduce((acc, q, i) => acc + (this.userAnswers[i] === q.answer ? 1 : 0), 0);
      this.showPreTestResult = true;
    },
    toggleTopic(index) {
      this.selectedTopic = this.selectedTopic === index ? null : index;
      this.showSolution = this.showSolution.map(() => ({ main: false, alt: false }));
      this.revealedSteps = this.revealedSteps.map(() => ({ main: [], alt: [] }));
      this.viewedTopics.add(index);
      this.subsetRevealedSteps = [];
      this.showSubsetGuide = false;
      this.subsetPageActive = false;
      this.unionPageActive = false;
      this.hasseDiagramPageActive = false;
      this.equivalencePageActive = false;
      this.examplesOfFunctionsPageActive = false;
      this.functionQuizPageActive = false;
      this.typesOfFunctionsPageActive = false;
      this.operationsOnFunctionsPageActive = false;
      this.graphicalRelationshipPageActive = false;
      this.compositionRevealedSteps = [];
      this.showCompositionGuide = false;
      this.inverseRevealedSteps = [];
      this.showInverseGuide = false;
      this.showInverseExerciseGuide = false;
      this.inverseExerciseRevealedSteps = [];
      this.inverseExerciseAnswer = "";
      this.inverseExerciseFeedback = "";
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
    checkSubsetAnswer() {
      const correctAnswers = ["{p, r, s, q}", "{p,r,s,q}"];
      this.subsetFeedback = correctAnswers.includes(this.subsetAnswer.trim()) ? "✅ Correct! {p, r, s, q} is the Range." : "❌ Try Again. Hint: All second elements";
      this.subsetAnswer = "";
    },
    toggleSubsetStep(stepIndex) {
      if (stepIndex === 0 || this.subsetRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.subsetRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.subsetRevealedSteps.push(stepIndex) : this.subsetRevealedSteps.splice(pos, 1);
      }
    },
    checkSubsetQuiz() {
      const correctAnswers = ["{1, 2, 3}", "{1,2,3}"];
      this.subsetQuizFeedback = correctAnswers.includes(this.subsetQuizAnswer.trim()) ? "✅ Correct! {1, 2, 3} is the Domain." : "❌ Try Again. Hint: All first elements";
      this.subsetQuizAnswer = "";
    },
    checkSecondCardAnswer() {
      if (!this.secondCardAnswer) {
        this.secondCardFeedback = "⚠️ Please select an answer.";
        return;
      }
      this.secondCardFeedback = this.secondCardAnswer === this.reflexiveQuiz.answer ?
        "✅ Correct! ∀a∈A, (a,a)∈R describes a reflexive relation." :
        "❌ Try Again. Hint: A reflexive relation requires every element to be related to itself.";
      this.secondCardAnswer = "";
    },
    toggleSecondCardStep(stepIndex) {
      if (stepIndex === 0 || this.secondCardRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.secondCardRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.secondCardRevealedSteps.push(stepIndex) : this.secondCardRevealedSteps.splice(pos, 1);
      }
    },
    checkThirdCardAnswer() {
      const correctAnswer = "Each number in A is paired with a letter in B.";
      this.thirdCardFeedback = this.thirdCardAnswer.trim() === correctAnswer ? "✅ Correct! The verbal description is accurate." : "❌ Try Again. Hint: Describe the pairing between elements of A and B.";
      this.thirdCardAnswer = "";
    },
    checkEquivalenceAnswer() {
      if (!this.equivalenceAnswer) {
        this.equivalenceFeedback = "⚠️ Please select an answer.";
        return;
      }
      this.equivalenceFeedback = this.equivalenceAnswer === this.equivalenceQuiz.answer ?
        "✅ Correct! An equivalence relation is Reflexive, Symmetric, and Transitive." :
        "❌ Try Again. Hint: An equivalence relation requires all three properties: Reflexive, Symmetric, and Transitive.";
      this.equivalenceAnswer = "";
    },
    checkPartialOrderAnswer() {
      if (!this.partialOrderAnswer) {
        this.partialOrderFeedback = "⚠️ Please type an answer (True or False).";
        return;
      }
      const normalizedAnswer = this.partialOrderAnswer.trim().toLowerCase();
      this.partialOrderFeedback = normalizedAnswer === "true" ?
        "✅ Correct! The relation 'is a subset of' (⊆) on the power set of {1,2,3} is a partial order because it is reflexive, antisymmetric, and transitive." :
        "❌ Try Again. Hint: Check if the relation 'is a subset of' satisfies reflexive, antisymmetric, and transitive properties.";
      this.partialOrderAnswer = "";
    },
    checkPosetAnswer() {
      if (!this.posetAnswer) {
        this.posetFeedback = "⚠️ Please type an answer.";
        return;
      }
      const normalizedAnswer = this.posetAnswer.trim().toLowerCase();
      this.posetFeedback = normalizedAnswer === "poset" || normalizedAnswer === "partially ordered set" ?
        "✅ Correct! The pair (P,≤), where P is a set and ≤ is a partial order, is called a poset (partially ordered set)." :
        "❌ Try Again. Hint: The term describes a set with a partial order relation.";
      this.posetAnswer = "";
    },
    checkHasseAnswer() {
      if (!this.hasseTopAnswer || !this.hasseBottomAnswer) {
        this.hasseFeedback = "⚠️ Please type answers for both top and bottom elements.";
        return;
      }
      const normalizedTop = this.hasseTopAnswer.trim();
      const normalizedBottom = this.hasseBottomAnswer.trim();
      this.hasseFeedback = normalizedTop === "16" && normalizedBottom === "1" ?
        "✅ Correct! In the Hasse diagram for P={1,2,4,8,16} with divisibility, 16 is at the top (divisible by all) and 1 is at the bottom (divides all)." :
        "❌ Try Again. Hint: The top element is divisible by all others, and the bottom element divides all others.";
      this.hasseTopAnswer = "";
      this.hasseBottomAnswer = "";
    },
    checkInjectiveAnswer() {
      if (!this.injectiveAnswer) {
        this.injectiveFeedback = "⚠️ Please type an answer (True or False).";
        return;
      }
      const normalizedAnswer = this.injectiveAnswer.trim().toLowerCase();
      this.injectiveFeedback = normalizedAnswer === "true" ?
        "✅ Correct! For f(x) = 3x + 1, if f(a) = f(b), then 3a + 1 = 3b + 1, so 3a = 3b, and a = b, making it injective." :
        "❌ Try Again. Hint: A function is injective if f(a) = f(b) implies a = b.";
      this.injectiveAnswer = "";
    },
    checkSurjectiveAnswer() {
      if (!this.surjectiveAnswer) {
        this.surjectiveFeedback = "⚠️ Please select an answer.";
        return;
      }
      this.surjectiveFeedback = this.surjectiveAnswer === "surjective" ?
        "✅ Correct! For f(x) = 2x + 1 (from ℝ to ℝ), for any y in ℝ, there exists x = (y - 1)/2 such that f(x) = y, making it surjective." :
        "❌ Try Again. Hint: A function is surjective if every element in the codomain has at least one preimage in the domain.";
      this.surjectiveAnswer = "";
    },
    checkBijectiveTermAnswer() {
      if (!this.bijectiveTermAnswer) {
        this.bijectiveTermFeedback = "⚠️ Please type an answer.";
        return;
      }
      const normalizedAnswer = this.bijectiveTermAnswer.trim().toLowerCase();
      this.bijectiveTermFeedback = normalizedAnswer === "bijective" ?
        "✅ Correct! A function that is both injective and surjective is called bijective." :
        "❌ Try Again. Hint: The term describes a function that is both one-to-one and onto.";
      this.bijectiveTermAnswer = "";
    },
    checkInjectiveExerciseAnswer() {
      if (!this.injectiveExerciseAnswer) {
        this.injectiveExerciseFeedback = "⚠️ Please select an answer.";
        return;
      }
      this.injectiveExerciseFeedback = this.injectiveExerciseAnswer === "injective" ?
        "✅ Correct! For f(x) = 3x - 4, if f(a) = f(b), then 3a - 4 = 3b - 4, so 3a = 3b, and a = b, making it injective." :
        "❌ Incorrect! Hint: A function is injective if f(a) = f(b) implies a = b.";
      this.injectiveExerciseAnswer = "";
    },
    checkBijectiveExerciseAnswer() {
      if (!this.bijectiveExerciseAnswer) {
        this.bijectiveExerciseFeedback = "⚠️ Please select an answer.";
        return;
      }
      this.bijectiveExerciseFeedback = this.bijectiveExerciseAnswer === "bijective" ?
        "✅ Correct! For f(x) = x + 5, it is injective (f(a) = f(b) ⇒ a + 5 = b + 5 ⇒ a = b) and surjective (for any y, x = y - 5 gives f(x) = y), so it is bijective." :
        "❌ Incorrect! Hint: A function is bijective if it is both injective and surjective.";
      this.bijectiveExerciseAnswer = "";
    },
    goBackToLesson() {
      this.equivalencePageActive = false;
      this.subsetPageActive = false;
      this.hasseDiagramPageActive = false;
      this.examplesOfFunctionsPageActive = false;
      this.functionQuizPageActive = false;
      this.typesOfFunctionsPageActive = false;
      this.operationsOnFunctionsPageActive = false;
      this.graphicalRelationshipPageActive = false;
      this.selectedTopic = null;
    },
    toggleAlgebraicStep(stepIndex) {
      if (stepIndex === 0 || this.algebraicRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.algebraicRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.algebraicRevealedSteps.push(stepIndex) : this.algebraicRevealedSteps.splice(pos, 1);
      }
    },
    togglePiecewiseStep(stepIndex) {
      if (stepIndex === 0 || this.piecewiseRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.piecewiseRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.piecewiseRevealedSteps.push(stepIndex) : this.piecewiseRevealedSteps.splice(pos, 1);
      }
    },
    toggleAbsoluteStep(stepIndex) {
      if (stepIndex === 0 || this.absoluteRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.absoluteRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.absoluteRevealedSteps.push(stepIndex) : this.absoluteRevealedSteps.splice(pos, 1);
      }
    },
    toggleMappingStep(stepIndex) {
      if (stepIndex === 0 || this.mappingRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.mappingRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.mappingRevealedSteps.push(stepIndex) : this.mappingRevealedSteps.splice(pos, 1);
      }
    },
    toggleInjectiveStep(stepIndex) {
      if (stepIndex === 0 || this.injectiveRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.injectiveRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.injectiveRevealedSteps.push(stepIndex) : this.injectiveRevealedSteps.splice(pos, 1);
      }
    },
    toggleSurjectiveStep(stepIndex) {
      if (stepIndex === 0 || this.surjectiveRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.surjectiveRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.surjectiveRevealedSteps.push(stepIndex) : this.surjectiveRevealedSteps.splice(pos, 1);
      }
    },
    toggleBijectiveStep(stepIndex) {
      if (stepIndex === 0 || this.bijectiveRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.bijectiveRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.bijectiveRevealedSteps.push(stepIndex) : this.bijectiveRevealedSteps.splice(pos, 1);
      }
    },
    checkFunctionQuizAnswer() {
      if (!this.functionQuizAnswer) {
        this.functionQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      this.functionQuizFeedback = this.functionQuizAnswer === this.functionQuiz.answer ?
        "✅ Correct! y = x²2 is a function because each input x has exactly one output y." :
        "❌ Try Again. Hint: A function must assign exactly one output to each input.";
      this.functionQuizAnswer = "";
    },
    checkFunctionQuiz2Answer() {
      if (!this.functionQuiz2Answer) {
        this.functionQuiz2Feedback = "⚠️ Please select an answer.";
        return;
      }
      this.functionQuiz2Feedback = this.functionQuiz2Answer === this.functionQuiz2.answer ?
        "✅ Correct! x + 3y² = 4 is not a function because for a given x, there can be multiple y values (due to y²)." :
        "❌ Try Again. Hint: A function must assign exactly one output to each input; check for equations where y² appears.";
      this.functionQuiz2Answer = "";
    },
    checkFunctionQuiz3Answer() {
      if (!this.functionQuiz3Answer) {
        this.functionQuiz3Feedback = "⚠️ Please select an answer.";
        return;
      }
      this.functionQuiz3Feedback = this.functionQuiz3Answer === this.functionQuiz3.answer ?
        "✅ Correct! A = {(2,3), (4,2), (1,5)} is a function because each input maps to exactly one output." :
        "❌ Try Again. Hint: A function requires each input (first element) to have exactly one output; check for repeated first elements in the pairs.";
      this.functionQuiz3Answer = "";
    },
    checkFunctionQuiz4Answer() {
      if (!this.functionQuiz4Answer) {
        this.functionQuiz4Feedback = "⚠️ Please type an answer.";
        return;
      }
      const normalizedAnswer = this.functionQuiz4Answer.trim();
      this.functionQuiz4Feedback = normalizedAnswer === "5" ?
        "✅ Correct! For f(x) = |x|, f(5) = |5| = 5." :
        "❌ Try Again. Hint: The absolute value function |x| returns the non-negative value of x.";
      this.functionQuiz4Answer = "";
    },
    toggleAdditionStep(stepIndex) {
      if (stepIndex === 0 || this.additionRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.additionRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.additionRevealedSteps.push(stepIndex) : this.additionRevealedSteps.splice(pos, 1);
      }
    },
    toggleSubtractionStep(stepIndex) {
      if (stepIndex === 0 || this.subtractionRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.subtractionRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.subtractionRevealedSteps.push(stepIndex) : this.subtractionRevealedSteps.splice(pos, 1);
      }
    },
    toggleMultiplicationStep(stepIndex) {
      if (stepIndex === 0 || this.multiplicationRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.multiplicationRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.multiplicationRevealedSteps.push(stepIndex) : this.multiplicationRevealedSteps.splice(pos, 1);
      }
    },
    toggleDivisionStep(stepIndex) {
      if (stepIndex === 0 || this.divisionRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.divisionRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.divisionRevealedSteps.push(stepIndex) : this.divisionRevealedSteps.splice(pos, 1);
      }
    },
    toggleCompositionStep(stepIndex) {
      if (stepIndex === 0 || this.compositionRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.compositionRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.compositionRevealedSteps.push(stepIndex) : this.compositionRevealedSteps.splice(pos, 1);
      }
    },
    toggleInverseStep(stepIndex) {
      if (stepIndex === 0 || this.inverseRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.inverseRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.inverseRevealedSteps.push(stepIndex) : this.inverseRevealedSteps.splice(pos, 1);
      }
    },
    toggleInverseExerciseStep(stepIndex) {
      if (stepIndex === 0 || this.inverseExerciseRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.inverseExerciseRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.inverseExerciseRevealedSteps.push(stepIndex) : this.inverseExerciseRevealedSteps.splice(pos, 1);
      }
    },
    checkInverseExerciseAnswer() {
      if (!this.inverseExerciseAnswer) {
        this.inverseExerciseFeedback = "⚠️ Please type an answer.";
        return;
      }
      const normalizedAnswer = this.inverseExerciseAnswer.trim().replace(/\s+/g, '');
      const correctAnswer = "(x-3)/2";
      this.inverseExerciseFeedback = normalizedAnswer === correctAnswer ?
        "✅ Correct! The inverse function is f^{-1}(x) = (x - 3)/2." :
        "❌ Try Again. Hint: Follow the steps to solve for the inverse.";
      this.inverseExerciseAnswer = "";
    }
  }
};
</script>
<style scoped>
.lesson-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 10px;
  box-sizing: border-box;
  background: url('/src/assets/images/bac.webp') no-repeat center center;
  background-size: cover;
  background-position: center center;
  background-attachment: scroll;
  overflow-y: auto;
  font-family: 'Arial', sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
}
.content-box {
  padding: 10px;
  background: rgba(217, 230, 239, 0.8);
  border-radius: 10px;
  margin-bottom: 10px;
}
.definition-box {
  background: #FFFFE0;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
}
.problem-box {
  background: rgb(221, 231, 238);
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  text-align: left;
  font-size: 14px;
}
.answer-input {
  width: 100%;
  max-width: none;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #aaa;
  margin: 5px 0;
  box-sizing: border-box;
}
.submit-button, .next-button, .step-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 5px;
  margin: 3px;
}
.submit-button:hover, .next-button:hover, .step-button:hover {
  background: #388E3C;
}
.result-box {
  margin-top: 5px;
  padding: 8px;
  background: #e3f2fd;
  border-radius: 8px;
}
/* ✅ Restored Pre-Test Style */
.pretest-box {
  background: rgba(217, 230, 239, 0.73);
  padding: 1px;
  border-radius: 10px;
  margin-bottom: 10px;
  text-align: left;
}
.option-box {
  margin: 4px 0;
  display: flex;
  align-items: center;
}
.option-label {
  display: flex;
  align-items: center;
  gap: 3px;
}
.option-letter {
  font-weight: bold;
  margin-right: 1px;
}
.option-text {
  margin-left: 0px;
}
/* 🔰 NEW: Step-by-step guide card */
.guide-box {
  background: #fff7d6;
  padding: 10px;
  border-radius: 8px;
  text-align: left;
  font-size: 14px;
  margin-bottom: 8px;
  border: 1px solid #f1e2a3;
}
.practice-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  flex-direction: column;
}
.additional-card {
  flex: 1;
}
.lesson-image {
  max-width: 100%;
  width: auto;
  height: auto;
  display: block;
  margin: 10px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 3px;
}
.guide-container {
  position: relative;
}
.guide-title {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}
.step-box {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}
.step-arrow {
  background: #2196f3;
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 10px;
}
.step-description {
  color: black;
}
/* injective & surjective buttons */
.option-button {
  padding: 8px 12px;
  margin: 3px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #4CAF50;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 12px;
}
.option-button:hover {
  background-color: #4CAF50;
}
.option-button.selected {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}
.clickable-title {
  cursor: pointer;
  font-size: 16px;
}
.relation-properties-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
}
.relation-properties-table th,
.relation-properties-table td {
  border: 1px solid #ddd;
  padding: 4px;
  text-align: left;
  font-size: 12px;
}
.answer-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
@media (max-width: 480px) {
  .lesson-container {
    padding: 5px;
  }
  .title {
    font-size: 20px;
  }
  .content-box, .problem-box {
    padding: 8px;
  }
  .lesson-image {
    max-width: 250px;
  }
  .pretest-container .submit-button {
    width: 100%;
    padding: 15px;
    font-size: 16px;
  }
}
</style>
```