```vue
<template>
  <div class="lesson-container">
    <!-- ✅ Pre-Test Section -->
    <div v-if="!preTestCompleted" class="pretest-container">
      <h3 class="title">📝 Pre-Test: Propositional Logic</h3>
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
      <button @click="submitPreTest" :disabled="!isPreTestComplete" class="submit-button">✅ Submit Pre-Test</button>
      <div v-if="showPreTestResult" class="modal-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 999; display: flex; justify-content: center; align-items: center;">
        <div class="result-box" style="background: white; padding: 20px; border-radius: 8px; max-width: 400px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div class="score-container">
            <h4>Your Score: {{ score }}/{{ preTestQuestions.length }}</h4>
          </div>
          <p v-if="score === preTestQuestions.length">🎉 Excellent! You mastered this topic.</p>
          <p v-else-if="score >= Math.ceil(preTestQuestions.length/2)">👍 Good job! Let's review some concepts.</p>
          <p v-else>💡 Don’t worry! The lesson will help you understand better.</p>
          <button @click="preTestCompleted = true; showPreTestResult = false" class="next-button">➡️ Continue to Lesson</button>
        </div>
      </div>
    </div>
    <!-- ✅ Lesson AFTER Pre-Test -->
    <div v-else>
      <h5 class="title">📚 Propositional Logic</h5>
      <!-- Normal Lesson View -->
      <div v-if="!showImplication && !showTruthMastery && !showDerivedMastery && !showConditionalExample && !showLawMastery">
        <div v-for="(topic, index) in topics" :key="index" class="content-box" v-show="selectedTopic === null || selectedTopic === index">
          <h5 @click="toggleTopic(index)" class="clickable-title">
            {{ topic.title }} {{ selectedTopic === index ? "" : "" }}
          </h5>
          <div v-if="selectedTopic === index">
            <div class="guide-box">
              <p v-html="formatContent(topic.content)"></p>
            </div>
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
            <div v-if="index === 0" class="problem-box">
              <h4 style="text-align: center;">Logical Connectives</h4>
              <div class="guide-box">
                1. ¬p: the negation of statement p.
              </div>
              <div class="guide-box">
                2. p ∧ q: the conjunction of statements p and q. – “p and q.”
              </div>
              <div class="guide-box">
                3. p ∨ q: the disjunction of statements p and q. – “p or q.”
              </div>
              <div class="guide-box">
                4. p → q: the (material) implication of q by p. – “Hypothesis p implies conclusion q”; “if p, then q”.
              </div>
              <div class="guide-box">
                5. p ↔ q: the biconditional of p and q. – “p if and only if q.”
              </div>
            </div>
            <div v-if="index === 0" class="problem-box">
              <h5 style="text-align: center;">4 Logical connectives </h5>
              <ol>
                <li>
                  <strong> Conjunction (AND)</strong><br>
                  <div class="guide-box">
                    Symbol: ∧
                  </div>
                  <div class="guide-box">
                    Meaning: The statement p ∧ q is read as “p and q.” Only if both the values of p and q are true does this expression evaluate to true. Otherwise it is false.
                  </div>
                  <button @click="showConjunctionExample = !showConjunctionExample" class="step-button">
                    {{ showConjunctionExample ? "🔽 Hide Example" : "📘 Show Example" }}
                  </button>
                  <div v-if="showConjunctionExample" class="guide-box">
                    Example:<br>
                    ➡️ p: “It is raining.”<br>
                    ➡️ q: “I have an umbrella.”<br>
                    ➡️ p ∧ q: “It is raining and I have an umbrella.” <strong> → True only if both statements are true.</strong>
                  </div>
                  <div class="problem-box">
                    <h4>Conjunction Truth Table</h4>
                    <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                      <thead>
                        <tr style="background-color: #3b9cccff;">
                          <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                          <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                          <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P ∧ Q</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                        </tr>
                        <tr>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                        </tr>
                        <tr>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                          <td style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">T</td>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                        </tr>
                        <tr>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                          <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                        </tr>
                      </tbody>
                    </table>
                    <p>P ∧ Q should be true when both P and Q are true, and false otherwise.</p>
                  </div>
                </li>
              </ol>
            </div>
            <div v-if="index === 0" class="problem-box">
              <h5 style="text-align: center;">2. Disjunction (OR)</h5>
              <div class="guide-box">
                Symbol: ∨
              </div>
              <div class="guide-box">
                Meaning: If at least one of the values of p or q is true, the entire expression is true
              </div>
              <button @click="showDisjunctionExample = !showDisjunctionExample" class="step-button">
                {{ showDisjunctionExample ? "🔽 Hide Example" : "📘 Show Example" }}
              </button>
              <div v-if="showDisjunctionExample" class="guide-box">
                Example:<br>
                ➡️ p: “I will study.”<br>
                ➡️ q: “I will play.”<br>
                ➡️ p ∨ q: “I will study or play.” <strong>→ True if one or both are true.</strong>
              </div>
              <div class="problem-box">
                <h4>Disjunction Truth Table</h4>
                <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                  <thead>
                    <tr style="background-color: #3b9cccff;">
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P ∨ Q</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    </tr>
                  </tbody>
                </table>
                <p>P ∨ Q is true if either P is true or Q is true (or both --- remember that we're using "or" in the inclusive sense). It's only false if both P and Q are false.</p>
              </div>
            </div>
            <div v-if="index === 0" class="problem-box">
              <h5 style="text-align: center;">3) Implication (IF…THEN)</h5>
              <div class="guide-box">
                Symbol: →
              </div>
              <div class="guide-box">
                Meaning: If p is true, then q must be true. However, if p is not true, there is no guarantee of the truth of q. An important observation to note: when statements are combined with an implication, there is no need for there to be a causal relationship between the two for the implication to be true.
              </div>
              <button @click="showImplicationExample = !showImplicationExample" class="step-button">
                {{ showImplicationExample ? "🔽 Hide Example" : "📘 Show Example" }}
              </button>
              <div v-if="showImplicationExample" class="guide-box">
                Example:<br>
                ➡️ p: “If it rains,”<br>
                ➡️ q: “then the ground will be wet.”<br>
                ➡️ p → q: True unless it rains and the ground is not wet.
              </div>
              <div class="problem-box">
                <h4>Logical Implication</h4>
                <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                  <thead>
                    <tr style="background-color: #3b9cccff;">
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P → Q</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    </tr>
                  </tbody>
                </table>
                <p>p → q the statement is true when the promise is kept and false when the promise is broken. So, if you get an A (p) and I give you a dollar (q), the statement is true. But if you get an A (p) and I don’t give you a dollar (not q), the statement is false because the promise was not kept.</p>
              </div>
            </div>
            <div v-if="index === 0" class="problem-box">
              <h5 style="text-align: center;">4) Biconditional (IF AND ONLY IF)</h5>
              <div class="guide-box">
                Symbol: ↔
              </div>
              <div class="guide-box">
                Meaning: When p is true, q is true and if p is false, q must be false as well.
              </div>
              <button @click="showBiconditionalExample = !showBiconditionalExample" class="step-button">
                {{ showBiconditionalExample ? "🔽 Hide Example" : "📘 Show Example" }}
              </button>
              <div v-if="showBiconditionalExample" class="guide-box">
                Example:<br>
                ➡️ p: “You pass the exam.”<br>
                ➡️ q: “You studied.”<br>
                ➡️ p ↔ q: “You pass the exam if and only if you studied.” → Both must be true or both false.
              </div>
              <div class="problem-box">
                <h4>Biconditional Truth Table</h4>
                <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                  <thead>
                    <tr style="background-color: #3b9cccff;">
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P ↔ Q</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                      <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    </tr>
                  </tbody>
                </table>
                <p>P ↔ Q means that P and Q are equivalent. So the double implication is true if P and Q are both true or if P and Q are both false; otherwise, the double implication is false.</p>
              </div>
            </div>
            <button v-if="index === 0" @click="showImplication = true; scrollToTop()" class="next-button">➡️ Next</button>
            <div v-if="index === 1" class="problem-box">
              <h4>Negation Truth Table</h4>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">¬P</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                </tbody>
              </table>
              <p>This table is easy to understand. If P is true, its negation ¬P is false. If P is false, then ¬P is true.</p>
            </div>
            <div v-if="index === 1" class="problem-box">
              <h4>Conjunction Truth Table</h4>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P ∧ Q</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                </tbody>
              </table>
              <p>P ∧ Q should be true when both P and Q are true, and false otherwise.</p>
            </div>
            <div v-if="index === 1" class="problem-box">
              <h4>Disjunction Truth Table</h4>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P ∨ Q</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                </tbody>
              </table>
              <p>P ∨ Q is true if either P is true or Q is true (or both --- remember that we're using "or" in the inclusive sense). It's only false if both P and Q are false.</p>
            </div>
            <div v-if="index === 1" class="problem-box">
              <h4>Logical Implication</h4>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P → Q</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                </tbody>
              </table>
              <p>p → q the statement is true when the promise is kept and false when the promise is broken. So, if you get an A (p) and I give you a dollar (q), the statement is true. But if you get an A (p) and I don’t give you a dollar (not q), the statement is false because the promise was not kept.</p>
            </div>
            <div v-if="index === 1" class="problem-box">
              <h4>Biconditional Truth Table</h4>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P ↔ Q</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                </tbody>
              </table>
              <p>P ↔ Q means that P and Q are equivalent. So the double implication is true if P and Q are both true or if P and Q are both false; otherwise, the double implication is false.</p>
            </div>
            <button v-if="index === 1" @click="goToMasteryQuiz" class="next-button">➡️ Next</button>
            <div v-if="index === 2" class="problem-box">
              <h4>NAND Truth Table</h4>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P ↑ Q</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                </tbody>
              </table>
              <div class="guide-box">
                <p>The NAND connective (p ↑ q) is the negation of the conjunction (p ∧ q). It is true unless both p and q are true.</p>
              </div>
            </div>
            <div v-if="index === 2" class="problem-box">
              <h4>NOR Truth Table</h4>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P ↓ Q</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                </tbody>
              </table>
              <div class="guide-box">
                <p>The NOR connective (p ↓ q) is the negation of the disjunction (p ∨ q). It is true only when both p and q are false.</p>
              </div>
            </div>
            <div v-if="index === 2" class="problem-box">
              <h4>XOR Truth Table</h4>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P ⨁ Q</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                </tbody>
              </table>
              <div class="guide-box">
                <p>The XOR connective (p ⨁ q) is true only if p and q have different truth values.</p>
              </div>
            </div>
            <button v-if="index === 2" @click="goToDerivedMasteryQuiz" class="next-button">➡️ Next</button>
            <div v-if="index === 3" class="problem-box">
              <h4>Converse Statements</h4>
              <div class="guide-box">
                <p>a new statement formed by interchanging the hypothesis (p) and the conclusion (q) of the given conditional statement.</p>
              </div>
              <h5> Converse Truth Table (q → p)</h5>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">p</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">p → q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">q → p</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                </tbody>
              </table>
              <p>The truth table for the converse (q → p) shows the truth values when the hypothesis and conclusion are interchanged.</p>
            </div>
            <div v-if="index === 3" class="problem-box">
              <h4>Inverse Statements</h4>
              <div class="guide-box">
                <p>the negation of the original hypothesis and the conclusion of a given conditional statements.</p>
              </div>
              <h5> Inverse Truth Table for (~p → ~q)</h5>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">~p</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">~q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">~p → ~q</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                </tbody>
              </table>
              <p>The truth table for the inverse (~p → ~q) shows the truth values when both the hypothesis and conclusion are negated.</p>
            </div>
            <div v-if="index === 3" class="problem-box">
              <h4>Contrapositive Statements</h4>
              <div class="guide-box">
                <p>a new statement whose conclusion is the negation of the original hypothesis of a given conditional statements.</p>
              </div>
              <h5>Contrapositive Truth Table for (~q → ~p)</h5>
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #3b9cccff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">~p</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">~q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">~q → ~p</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  </tr>
                </tbody>
              </table>
              <p>The truth table for the contrapositive (~q → ~p) shows the truth values when both the hypothesis and conclusion are negated and interchanged.</p>
            </div>
            <button v-if="index === 3" @click="initConditionalQuiz(); showConditionalExample = true; scrollToTop()" class="next-button">➡️ Next</button>
          </div>
        </div>
      </div>
      <div v-else-if="showImplication" class="content-box">
        <div class="problem-box">
          <h5 style="text-align: center;">Laws to Simplify Logical Expressions</h5>
          <div class="guide-box">
            <strong>1️⃣ Law of Double Negation</strong><br>
            ¬¬p ⇔ p<br>
            ➡️ Negating a statement twice gives back the original statement.<br>
            Example: ¬¬True = True
          </div>
          <div class="guide-box">
            <strong>2️⃣ De Morgan’s Laws</strong><br>
            ¬(p ∨ q) ⇔ ¬p ∧ ¬q<br>
            ¬(p ∧ q) ⇔ ¬p ∨ ¬q<br>
            ➡️ The negation of “or” becomes “and,” and vice versa.<br>
            Example: ¬(Rain ∨ Cold) = ¬Rain ∧ ¬Cold
          </div>
          <div class="guide-box">
            <strong>3️⃣ Commutative Laws</strong><br>
            p ∨ q ⇔ q ∨ p<br>
            p ∧ q ⇔ q ∧ p<br>
            ➡️ Order doesn’t matter in “and” or “or” operations.<br>
            Example: (A ∧ B) = (B ∧ A)
          </div>
          <div class="guide-box">
            <strong>4️⃣ Associative Laws</strong><br>
            (p ∨ q) ∨ r ⇔ p ∨ (q ∨ r)<br>
            (p ∧ q) ∧ r ⇔ p ∧ (q ∧ r)<br>
            ➡️ The way statements are grouped doesn’t change the result.<br>
            Example: ((A ∨ B) ∨ C) = (A ∨ (B ∨ C))
          </div>
          <div class="guide-box">
            <strong>5️⃣ Distributive Laws</strong><br>
            p ∨ (q ∧ r) ⇔ (p ∨ q) ∧ (p ∨ r)<br>
            p ∧ (q ∨ r) ⇔ (p ∧ q) ∨ (p ∧ r)<br>
            ➡️ Similar to multiplication and addition in math — distribute across.<br>
            Example: A ∨ (B ∧ C) = (A ∨ B) ∧ (A ∨ C)
          </div>
        </div>
        <div class="problem-box">
          <h5 style="text-align: center;"></h5>
          <div class="guide-box">
            <strong>6️⃣ Idempotent Laws</strong><br>
            p ∨ p ⇔ p<br>
            p ∧ p ⇔ p<br>
            ➡️ Repeating the same statement doesn’t change its meaning.<br>
            Example: A ∨ A = A
          </div>
          <div class="guide-box">
            <strong>7️⃣ Identity Laws</strong><br>
            p ∨ F ⇔ p<br>
            p ∧ T ⇔ p<br>
            ➡️ Combining with false or true keeps the same value.<br>
            Example: A ∨ False = A
          </div>
          <div class="guide-box">
            <strong>8️⃣ Inverse (Negation) Laws</strong><br>
            p ∨ ¬p ⇔ T<br>
            p ∧ ¬p ⇔ F<br>
            ➡️ A statement or its opposite is always true; both together are always false.<br>
            Example: It’s raining or not raining = Always True
          </div>
          <div class="guide-box">
            <strong>9️⃣ Domination Laws</strong><br>
            p ∨ T ⇔ T<br>
            p ∧ F ⇔ F<br>
            ➡️ Anything “or True” is True; anything “and False” is False.<br>
            Example: A ∨ True = True
          </div>
          <div class="guide-box">
            <strong>🔟 Absorption Laws</strong><br>
            p ∨ (p ∧ q) ⇔ p<br>
            p ∧ (p ∨ q) ⇔ p<br>
            ➡️ Adding extra conditions that include “p” doesn’t change the result.<br>
            Example: A ∨ (A ∧ B) = A
          </div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <button @click="goToLawMastery" class="next-button">➡️ Next: Identify the Law</button>
        </div>
      </div>
      <!-- ✅ Law Mastery Quiz -->
      <div v-else-if="showLawMastery" class="content-box">
        <h3>Laws Mastery Quiz</h3>
        <div class="score-container">
          <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ lawScore }}/{{ lawQuizzes.length }}</p>
        </div>
        <div v-for="(quiz, index) in lawQuizzes" :key="index" class="problem-box">
          <h4>Mastery Quiz {{ index + 1 }}</h4>
          <p><strong>Identify the law used in the following statement:</strong></p>
          <div v-html="quiz.statement"></div>
          <input
            v-model="lawAnswers[index]"
            placeholder="Type the name of the law here"
            class="answer-input"
          />
          <button @click="checkLaw(index)" :disabled="lawChecked[index] >= 2" class="submit-button">CHECK ANSWER</button>
          <div v-if="lawFeedbacks[index]" class="result-box">
            <p>{{ lawFeedbacks[index] }}</p>
          </div>
          <div v-if="currentLawMessage" class="fade-message">{{ currentLawMessage }}</div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <button @click="backToMainLesson" class="next-button">⬅️ Back to Lesson</button>
        </div>
      </div>
      <!-- ✅ Conditional Example -->
      <div v-else-if="showConditionalExample" class="content-box">
        <h3>Conditional Mastery Quiz</h3>
        <div class="score-container">
          <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ conditionalScore }} / {{ conditionalQuizzes.length }}</p>
        </div>
        <div class="problem-box" style="background-color: #ffffe0; border: 1px solid #ddd; padding: 15px;">
          <h4>Example</h4>
          <p><strong>p:</strong> “You will pass the examination.”</p>
          <p><strong>q:</strong> “You will get the job.”</p>
          <p><strong>p → q:</strong> “If you will pass the examination, then you will get the job.”</p>
        </div>
        <div class="problem-box" style="background-color: #ffffe0; border: 1px solid #ddd; padding: 15px;">
          <h4>Converse, Inverse, and Contrapositive</h4>
          <p><strong>Converse Statements (q → p):</strong> “If you will get the job then you have passed the examination.”</p>
          <p><strong>Inverse Statements (~p → ~q):</strong> “If you will not pass the examination, then you will not get the job.”</p>
          <p><strong>Contrapositive Statements (~q → ~p):</strong> “If you will not get the job, then you have not passed the examination.”</p>
        </div>
        <div v-for="(quiz, index) in conditionalQuizzes" :key="index" class="problem-box">
          <h4>Quiz {{ index + 1 }}: Write the {{ quiz.type }} of the following statement:</h4>
          <p><strong>{{ quiz.question }}</strong></p>
          <div v-if="quiz.converse || quiz.inverse || quiz.contrapositive" class="guide-box">
            <p v-if="quiz.type !== 'converse'"><strong>Converse (q → p):</strong> {{ quiz.converse }}</p>
            <p v-if="quiz.type !== 'inverse'"><strong>Inverse (~p → ~q):</strong> {{ quiz.inverse }}</p>
            <p v-if="quiz.type !== 'contrapositive'"><strong>Contrapositive (~q → ~p):</strong> {{ quiz.contrapositive }}</p>
          </div>
          <input
            v-model="conditionalAnswers[index]"
            placeholder="Type your answer here"
            class="answer-input"
          />
          <button @click="checkConditional(index)" :disabled="conditionalChecked[index] >= 2" class="submit-button">CHECK ANSWER</button>
          <div v-if="conditionalFeedbacks[index]" class="result-box">
            <p>{{ conditionalFeedbacks[index] }}</p>
          </div>
          <div v-if="currentConditionalMessage" class="fade-message">{{ currentConditionalMessage }}</div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <button @click="showConditionalExample = false" class="next-button">⬅️ Back</button>
          <button @click="selectedTopic = null; showConditionalExample = false" class="next-button">⬅️ Back to Lesson</button>
        </div>
      </div>
      <!-- ✅ Truth Tables Mastery Quiz -->
      <div v-else-if="showTruthMastery" class="content-box">
        <h3>Truth Tables Mastery Quiz</h3>
        <div class="score-container">
          <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ truthScore }} / {{ masteryQuizzes.length }}</p>
        </div>
        <div v-for="(quiz, index) in masteryQuizzes" :key="index" class="problem-box">
          <h4>Mastery Quiz {{ index + 1 }}</h4>
          <p><strong>Which connective symbol represents this truth table?</strong></p>
          <div class="truth-table">
            <div v-html="quiz.table"></div>
          </div>
          <div v-for="(option, optIndex) in masteryOptions" :key="optIndex" class="option-box">
            <label class="option-label">
              <input type="radio" :name="'m' + index" :value="option" v-model="masteryAnswers[index]" />
              <span class="option-text">{{ option }}</span>
            </label>
          </div>
          <button @click="checkMastery(index)" :disabled="truthChecked[index] >= 2" class="submit-button">CHECK ANSWER</button>
          <div v-if="masteryFeedbacks[index]" class="result-box">
            <p>{{ masteryFeedbacks[index] }}</p>
          </div>
          <div v-if="currentTruthMessage" class="fade-message">{{ currentTruthMessage }}</div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <button @click="backToMainLesson" class="next-button">⬅️ Back to Lesson</button>
        </div>
      </div>
      <!-- ✅ Derived Connectives Mastery Quiz -->
      <div v-else-if="showDerivedMastery" class="content-box">
        <h3>Derived Connectives Mastery Quiz</h3>
        <div class="score-container">
          <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ derivedScore }} / {{ derivedQuizzes.length * 4 }}</p>
        </div>
        <div v-for="(quiz, index) in derivedQuizzes" :key="index" class="problem-box">
          <h4>Quiz {{ index + 1 }}</h4>
          <p><strong>Fill in the {{ quiz.fillColumn === 'result' ? 'Result' : quiz.fillColumn.toUpperCase() }} column for the {{ quiz.name }} truth table.</strong></p>
          <div class="truth-table">
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
              <thead>
                <tr style="background-color: #44cd9dff;">
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">{{ getConnectiveSymbol(quiz.name) }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in 4" :key="r">
                  <td style="border: 1px solid #544f4fff; padding: 8px;">
                    <input v-if="quiz.fillColumn === 'p' && derivedChecked[index] < 2"
                      type="text"
                      v-model="derivedAnswers[index][r-1]"
                      @input="$event.target.value = $event.target.value.toUpperCase().slice(-1)"
                      maxlength="1"
                      style="text-align: center; width: 30px; border: none; background: transparent;"
                    />
                    <span v-else-if="quiz.fillColumn === 'p' && derivedChecked[index] >= 2"
                      :style="{ color: derivedAnswers[index][r-1] === getCorrectValue(quiz, r-1) ? 'green' : 'red' }"
                    >{{ derivedAnswers[index][r-1] || getCorrectValue(quiz, r-1) }}</span>
                    <span v-else>{{ quiz.pValues ? quiz.pValues[r-1] : '' }}</span>
                  </td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">
                    <input v-if="quiz.fillColumn === 'q' && derivedChecked[index] < 2"
                      type="text"
                      v-model="derivedAnswers[index][r-1]"
                      @input="$event.target.value = $event.target.value.toUpperCase().slice(-1)"
                      maxlength="1"
                      style="text-align: center; width: 30px; border: none; background: transparent;"
                    />
                    <span v-else-if="quiz.fillColumn === 'q' && derivedChecked[index] >= 2"
                      :style="{ color: derivedAnswers[index][r-1] === getCorrectValue(quiz, r-1) ? 'green' : 'red' }"
                    >{{ derivedAnswers[index][r-1] || getCorrectValue(quiz, r-1) }}</span>
                    <span v-else>{{ quiz.qValues ? quiz.qValues[r-1] : '' }}</span>
                  </td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">
                    <input v-if="quiz.fillColumn === 'result' && derivedChecked[index] < 2"
                      type="text"
                      v-model="derivedAnswers[index][r-1]"
                      @input="$event.target.value = $event.target.value.toUpperCase().slice(-1)"
                      maxlength="1"
                      style="text-align: center; width: 30px; border: none; background: transparent;"
                    />
                    <span v-else-if="quiz.fillColumn === 'result' && derivedChecked[index] >= 2"
                      :style="{ color: derivedAnswers[index][r-1] === getCorrectValue(quiz, r-1) ? 'green' : 'red' }"
                    >{{ derivedAnswers[index][r-1] || getCorrectValue(quiz, r-1) }}</span>
                    <span v-else>{{ quiz.correctResults[r-1] }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button @click="checkDerived(index)" :disabled="derivedChecked[index] >= 2" class="submit-button">CHECK ANSWER</button>
          <div v-if="derivedFeedbacks[index]" class="result-box">
            <p v-html="derivedFeedbacks[index]"></p>
          </div>
          <div v-if="currentDerivedMessage" class="fade-message">{{ currentDerivedMessage }}</div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <button @click="backToDerivedMastery" class="next-button">⬅️ Back to Lesson</button>
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
      preTestCompleted: false,
      showPreTestResult: false,
      score: 0,
      userAnswers: [],
      preTestQuestions: [
        { question: "Which of the following is a tautology?", options: ["p ^ ~p", "p v ~p", "p → p", "~p v q"], answer: "p v ~p", explanation: "A tautology is a statement that is always true. p ∨ ¬p (law of excluded middle) is always true." },
        { question: "Which type of statement represents “if-then”?", options: ["Conjunction", "Disjunction", "Conditional", "Equivalence"], answer: "Conditional", explanation: "The conditional statement is represented by 'if p, then q' or p → q." },
        { question: "Which of the following is a characteristic of a bijective function?", options: ["The function is both injective (one-to-one) and surjective (onto).", "The function is only surjective.", "The function is only injective.", "The function has at least one element in the domain that maps to multiple elements in the range."], answer: "The function is both injective (one-to-one) and surjective (onto).", explanation: "A bijective function is one-to-one (injective) and onto (surjective)." },
        { question: "Which of the following is the derived connective for \"if and only if\" (denoted by ↔)?", options: ["p ∧ q", "(p → q) ∧ (q → p)", "p ∨ q", "¬(p → ¬q)"], answer: "(p → q) ∧ (q → p)", explanation: "The biconditional p ↔ q is equivalent to (p → q) ∧ (q → p)." },
        { question: "Symbolize: “If it rains, the streets will be wet.”", options: ["R → W", "R ^ W", "R v W", "~R → ~W"], answer: "R → W", explanation: "The statement is a conditional: if R then W, so R → W." }
      ],
      selectedTopic: null,
      showSolution: Array(4).fill({ main: false, alt: false }),
      revealedSteps: Array(4).fill({ main: [], alt: [] }),
      viewedTopics: new Set(),
      showConjunctionExample: false,
      showDisjunctionExample: false,
      showImplication: false,
      showImplicationExample: false,
      showBiconditionalExample: false,
      showConditionalExample: false,
      showLawMastery: false,
      lawQuizzes: [
        {
          statement: "¬(p ∨ q) ⇔ ¬p ∧ ¬q<br>¬(p ∧ q) ⇔ ¬p ∨ ¬q",
          answer: "De Morgan’s Laws",
          explanation: "The negation of “or” becomes “and,” and vice versa."
        },
        {
          statement: "¬¬p ⇔ p",
          answer: "Law of Double Negation",
          explanation: "Negating a statement twice gives back the original statement."
        },
        {
          statement: "p ∨ (q ∧ r) ⇔ (p ∨ q) ∧ (p ∨ r)<br>p ∧ (q ∨ r) ⇔ (p ∧ q) ∨ (p ∧ r)",
          answer: "Distributive Laws",
          explanation: "Similar to multiplication and addition in math — distribute across."
        },
        {
          statement: "(p ∨ q) ∨ r ⇔ p ∨ (q ∨ r)<br>(p ∧ q) ∧ r ⇔ p ∧ (q ∧ r)",
          answer: "Associative Laws",
          explanation: "The way statements are grouped doesn’t change the result."
        },
        {
          statement: "p ∨ T ⇔ T<br>p ∧ F ⇔ F",
          answer: "Domination Laws",
          explanation: "Anything “or True” is True; anything “and False” is False."
        }
      ],
      lawAnswers: [],
      lawFeedbacks: [],
      lawScore: 0,
      lawChecked: [],
      currentLawMessage: '',
      conditionalQuizzes: [
        {
          type: 'contrapositive',
          question: "If it rains, then the ground is wet.",
          converse: "If the ground is wet, then it rains.",
          inverse: "If it does not rain, then the ground is not wet.",
          contrapositive: "If the ground is not wet, then it does not rain.",
          answer: "If the ground is not wet, then it does not rain.",
          explanation: "The contrapositive is formed by switching and negating both parts of the conditional, and it is logically equivalent to the original."
        },
        {
          type: 'contrapositive',
          question: "If you study, then you pass the exam.",
          converse: "If you pass the exam, then you study.",
          inverse: "If you do not study, then you do not pass the exam.",
          contrapositive: "If you do not pass the exam, then you did not study.",
          answer: "If you do not pass the exam, then you did not study.",
          explanation: "The contrapositive is formed by switching and negating both parts of the conditional, and it is logically equivalent to the original."
        },
        {
          type: 'inverse',
          question: "If it rains, then the ground is wet.",
          converse: "If the ground is wet, then it rains.",
          inverse: "If it does not rain, then the ground is not wet.",
          contrapositive: "If the ground is not wet, then it does not rain.",
          answer: "If it does not rain, then the ground is not wet.",
          explanation: "The inverse is formed by negating both the hypothesis and conclusion of the original conditional."
        },
        {
          type: 'inverse',
          question: "If you study, then you pass the exam.",
          converse: "If you pass the exam, then you study.",
          inverse: "If you do not study, then you do not pass the exam.",
          contrapositive: "If you do not pass the exam, then you did not study.",
          answer: "If you do not study, then you do not pass the exam.",
          explanation: "The inverse is formed by negating both the hypothesis and conclusion of the original conditional."
        },
        {
          type: 'converse',
          question: "If it rains, then the ground is wet.",
          converse: "If the ground is wet, then it rains.",
          inverse: "If it does not rain, then the ground is not wet.",
          contrapositive: "If the ground is not wet, then it does not rain.",
          answer: "If the ground is wet, then it rains.",
          explanation: "The converse is formed by switching the hypothesis and conclusion of the original conditional."
        }
      ],
      conditionalAnswers: [],
      conditionalFeedbacks: [],
      conditionalScore: 0,
      conditionalChecked: [],
      currentConditionalMessage: '',
      // ✅ MASTERY QUIZ DATA
      showTruthMastery: false,
      masteryAnswers: [],
      masteryFeedbacks: [],
      truthScore: 0,
      truthChecked: [],
      currentTruthMessage: '',
      masteryOptions: ["¬", "∧", "∨", "→", "↔"],
      masteryQuizzes: [
        {
          table: `
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
              <thead>
                <tr style="background-color: #44cd9dff;">
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                </tr>
              </tbody>
            </table>
          `,
          correct: "¬"
        },
        {
          table: `
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
              <thead>
                <tr style="background-color: #44cd9dff;">
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                </tr>
              </tbody>
            </table>
          `,
          correct: "∧"
        },
        {
          table: `
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
              <thead>
                <tr style="background-color: #44cd9dff;">
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                </tr>
              </tbody>
            </table>
          `,
          correct: "∨"
        },
        {
          table: `
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
              <thead>
                <tr style="background-color: #44cd9dff;">
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                </tr>
              </tbody>
            </table>
          `,
          correct: "→"
        },
        {
          table: `
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
              <thead>
                <tr style="background-color: #44cd9dff;">
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                  <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">F</td>
                  <td style="border: 1px solid #544f4fff; padding: 8px;">T</td>
                </tr>
              </tbody>
            </table>
          `,
          correct: "↔"
        }
      ],
      // ✅ DERIVED MASTERY QUIZ DATA
      showDerivedMastery: false,
      derivedQuizzes: [
        {
          name: 'NAND',
          fillColumn: 'result',
          pValues: ['T', 'T', 'F', 'F'],
          qValues: ['T', 'F', 'T', 'F'],
          correctResults: ['F', 'T', 'T', 'T'],
          explanation: 'The NAND connective (p ↑ q) is the negation of the conjunction (p ∧ q). It is true unless both p and q are true.'
        },
        {
          name: 'NOR',
          fillColumn: 'result',
          pValues: ['T', 'T', 'F', 'F'],
          qValues: ['T', 'F', 'T', 'F'],
          correctResults: ['F', 'F', 'F', 'T'],
          explanation: 'The NOR connective (p ↓ q) is the negation of the disjunction (p ∨ q). It is true only when both p and q are false.'
        },
        {
          name: 'XOR',
          fillColumn: 'result',
          pValues: ['T', 'T', 'F', 'F'],
          qValues: ['T', 'F', 'T', 'F'],
          correctResults: ['F', 'T', 'T', 'F'],
          explanation: 'The XOR connective (p ⨁ q) is true only if p and q have different truth values.'
        },
        {
          name: 'NAND',
          fillColumn: 'p',
          correctP: ['T', 'T', 'F', 'F'],
          qValues: ['T', 'F', 'T', 'F'],
          correctResults: ['F', 'T', 'T', 'T'],
          explanation: 'The NAND connective (p ↑ q) is the negation of the conjunction (p ∧ q). It is true unless both p and q are true.'
        },
        {
          name: 'NOR',
          fillColumn: 'q',
          pValues: ['T', 'T', 'F', 'F'],
          correctQ: ['T', 'F', 'T', 'F'],
          correctResults: ['F', 'F', 'F', 'T'],
          explanation: 'The NOR connective (p ↓ q) is the negation of the disjunction (p ∨ q). It is true only when both p and q are false.'
        }
      ],
      derivedAnswers: [],
      derivedFeedbacks: [],
      derivedChecked: [],
      derivedScore: 0,
      currentDerivedMessage: '',
      topics: [
        { title: "Propositional Logic", content: "Propositional logic studies how statements can be combined or changed to form more complex statements.<br><br>proposition - is a declarative sentence that can be either true or false." },
        { title: "Truth Tables", content: "A truth table shows how the truth or falsity of a compound statement depends on the truth or falsity of the simple statements from which it's constructed.<table style=\"border-collapse: collapse; width: 100%; margin-bottom: 10px;\"><thead><tr style=\"background-color: #3b9cccff;\"><th style=\"border: 1px solid #ddd; padding: 8px; text-align: left;\">p</th><th style=\"border: 1px solid #ddd; padding: 8px; text-align: left;\">q</th></tr></thead><tbody><tr><td style=\"border: 1px solid #ddd; padding: 8px;\">T</td><td style=\"border: 1px solid #ddd; padding: 8px;\">T</td></tr><tr><td style=\"border: 1px solid #ddd; padding: 8px;\">T</td><td style=\"border: 1px solid #ddd; padding: 8px;\">F</td></tr><tr><td style=\"border: 1px solid #ddd; padding: 8px;\">F</td><td style=\"border: 1px solid #ddd; padding: 8px;\">T</td></tr><tr><td style=\"border: 1px solid #ddd; padding: 8px;\">F</td><td style=\"border: 1px solid #ddd; padding: 8px;\">F</td></tr></tbody></table>" },
        { title: "Derived Connectives", content: "Derived connectives are combinations of the three basic logic functions — AND, OR, and NOT — that are used so commonly they have been given their own names and logic symbols." },
        { title: "Converse, Inverse, and Contrapositive", content: "Converse, Inverse, and Contrapositive - are related forms of a conditional statement. The converse switches the hypothesis and conclusion, the inverse negates both parts, and the contrapositive both switches and negates them." }
      ]
    };
  },
  computed: {
    isPreTestComplete() {
      return this.userAnswers.length === this.preTestQuestions.length && this.userAnswers.every(answer => answer !== null && answer !== undefined);
    }
  },
  created() {
    // ✅ Shuffle questions on load
    this.preTestQuestions = this.shuffleArray(this.preTestQuestions);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
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
      this.showConjunctionExample = false;
      this.showDisjunctionExample = false;
      this.showImplication = false;
      this.showImplicationExample = false;
      this.showBiconditionalExample = false;
      this.showConditionalExample = false;
      this.showLawMastery = false;
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
    initConditionalQuiz() {
      this.conditionalAnswers = new Array(5).fill("");
      this.conditionalFeedbacks = new Array(5).fill("");
      this.conditionalChecked = new Array(5).fill(0);
      this.conditionalScore = 0;
    },
    checkConditional(index) {
      const userAnswer = this.conditionalAnswers[index].trim();
      if (!userAnswer) {
        this.conditionalFeedbacks[index] = "Please type your answer";
        return;
      }
      const correct = this.conditionalQuizzes[index].answer;
      const isCorrect = userAnswer === correct;
      const currentChecked = this.conditionalChecked[index];
      if (isCorrect) {
        this.conditionalScore++;
        this.conditionalFeedbacks[index] = `✅ Correct! ${this.conditionalQuizzes[index].explanation}`;
        this.currentConditionalMessage = `You have ${this.conditionalScore} point${this.conditionalScore > 1 ? 's' : ''}!`;
        setTimeout(() => { this.currentConditionalMessage = ''; }, 3000);
        this.conditionalChecked[index] = 2;
      } else {
        if (currentChecked === 0) {
          this.conditionalFeedbacks[index] = "❌ Incorrect. Try again.";
          this.conditionalChecked[index] = 1;
        } else if (currentChecked === 1) {
          this.conditionalFeedbacks[index] = `❌ Incorrect. The correct ${this.conditionalQuizzes[index].type} is: ${correct}. ${this.conditionalQuizzes[index].explanation}`;
          this.conditionalChecked[index] = 2;
        }
      }
    },
    goToMasteryQuiz() {
      this.showImplication = false;
      this.masteryQuizzes = this.shuffleArray([...this.masteryQuizzes]);
      this.masteryAnswers = new Array(5).fill(null);
      this.masteryFeedbacks = new Array(5).fill("");
      this.truthChecked = new Array(5).fill(0);
      this.truthScore = 0;
      this.showTruthMastery = true;
      this.scrollToTop();
    },
    checkMastery(index) {
      const answer = this.masteryAnswers[index];
      if (!answer) {
        this.masteryFeedbacks[index] = "Please select an answer";
        return;
      }
      const correct = this.masteryQuizzes[index].correct;
      const currentChecked = this.truthChecked[index];
      if (answer === correct) {
        this.truthScore++;
        this.masteryFeedbacks[index] = `✅ Correct! This is the truth table for ${correct}.`;
        this.currentTruthMessage = `You have ${this.truthScore} point${this.truthScore > 1 ? 's' : ''}!`;
        setTimeout(() => { this.currentTruthMessage = ''; }, 3000);
        this.truthChecked[index] = 2;
      } else {
        if (currentChecked === 0) {
          this.masteryFeedbacks[index] = "❌ Incorrect. Try again.";
          this.truthChecked[index] = 1;
        } else if (currentChecked === 1) {
          this.masteryFeedbacks[index] = `❌ Incorrect. This is the truth table for ${correct}.`;
          this.truthChecked[index] = 2;
        }
      }
    },
    backToMainLesson() {
      this.showTruthMastery = false;
      this.showImplication = false;
      this.showLawMastery = false;
      this.showDerivedMastery = false;
      this.masteryAnswers = [];
      this.masteryFeedbacks = [];
      this.selectedTopic = null;
    },
    goToLawMastery() {
      this.showImplication = false;
      this.lawAnswers = new Array(this.lawQuizzes.length).fill("");
      this.lawFeedbacks = new Array(this.lawQuizzes.length).fill("");
      this.lawChecked = new Array(this.lawQuizzes.length).fill(0);
      this.lawScore = 0;
      this.showLawMastery = true;
      this.scrollToTop();
    },
    checkLaw(index) {
      const userAnswer = this.lawAnswers[index].trim();
      if (!userAnswer) {
        this.lawFeedbacks[index] = "Please type your answer";
        return;
      }
      const correct = this.lawQuizzes[index].answer;
      const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 0);
      const correctWords = normalize(correct);
      const userWords = normalize(userAnswer);
      const isCorrect = userWords.length > 0 && correctWords.every(cw => userWords.some(uw => uw === cw || uw.includes(cw) || cw.includes(uw)));
      const currentChecked = this.lawChecked[index];
      if (isCorrect) {
        this.lawScore++;
        this.lawFeedbacks[index] = `✅ Correct! This is ${correct}. ${this.lawQuizzes[index].explanation}`;
        this.currentLawMessage = `You have ${this.lawScore} point${this.lawScore > 1 ? 's' : ''}!`;
        setTimeout(() => { this.currentLawMessage = ''; }, 3000);
        this.lawChecked[index] = 2;
      } else {
        if (currentChecked === 0) {
          this.lawFeedbacks[index] = "❌ Incorrect. Try again.";
          this.lawChecked[index] = 1;
        } else if (currentChecked === 1) {
          this.lawFeedbacks[index] = `❌ Incorrect. This is ${correct}. ${this.lawQuizzes[index].explanation}`;
          this.lawChecked[index] = 2;
        }
      }
    },
    goToDerivedMasteryQuiz() {
      this.showDerivedMastery = true;
      this.derivedQuizzes = this.shuffleArray([...this.derivedQuizzes]);
      this.derivedAnswers = this.derivedQuizzes.map(() => new Array(4).fill(""));
      this.derivedFeedbacks = new Array(this.derivedQuizzes.length).fill("");
      this.derivedChecked = new Array(this.derivedQuizzes.length).fill(0);
      this.derivedScore = 0;
      this.scrollToTop();
    },
    getConnectiveSymbol(name) {
      if (name === 'NAND') return 'P ↑ Q';
      if (name === 'NOR') return 'P ↓ Q';
      if (name === 'XOR') return 'P ⨁ Q';
      return 'Result';
    },
    getCorrectValue(quiz, row) {
      const col = quiz.fillColumn;
      if (col === 'result') return quiz.correctResults[row];
      if (col === 'p') return quiz.correctP ? quiz.correctP[row] : quiz.pValues[row];
      if (col === 'q') return quiz.correctQ ? quiz.correctQ[row] : quiz.qValues[row];
      return '';
    },
    checkDerived(index) {
      const allEmpty = this.derivedAnswers[index].every(a => !a.trim());
      if (allEmpty) {
        this.derivedFeedbacks[index] = "Please type your answer";
        return;
      }
      const quiz = this.derivedQuizzes[index];
      const fillColumn = quiz.fillColumn;
      let correct = [];
      if (fillColumn === 'result') {
        correct = quiz.correctResults;
      } else if (fillColumn === 'p') {
        correct = quiz.correctP || quiz.pValues;
      } else if (fillColumn === 'q') {
        correct = quiz.correctQ || quiz.qValues;
      }
      const user = this.derivedAnswers[index].map(a => (a || '').toUpperCase().trim());
      let score = 0;
      for (let i = 0; i < 4; i++) {
        if (user[i] === correct[i]) score++;
      }
      const currentChecked = this.derivedChecked[index];
      if (score === 4) {
        this.derivedScore += 4;
        this.derivedFeedbacks[index] = `✅ Perfect! You understand the ${quiz.name} connective. ${quiz.explanation}`;
        this.currentDerivedMessage = `You got 4 points! Total: ${this.derivedScore}`;
        setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
        this.derivedChecked[index] = 2;
      } else {
        if (currentChecked === 0) {
          this.derivedFeedbacks[index] = "❌ Incorrect. Try again.";
          this.derivedChecked[index] = 1;
        } else if (currentChecked === 1) {
          this.derivedScore += score;
          let getRowDesc = (i) => {
            if (fillColumn === 'result') {
              return `P=${quiz.pValues[i]}, Q=${quiz.qValues[i]}`;
            } else if (fillColumn === 'p') {
              return `Row ${i+1} (Q=${quiz.qValues[i]}): should be ${correct[i]}`;
            } else {
              return `Row ${i+1} (P=${quiz.pValues[i]}): should be ${correct[i]}`;
            }
          };
          let feedback = `You got ${score} out of 4 correct!<br><br>`;
          if (score < 4) {
            let errors = [];
            for (let i = 0; i < 4; i++) {
              if (user[i] !== correct[i]) {
                errors.push(`${getRowDesc(i)}, you put ${user[i] || '?'}<br>`);
              }
            }
            feedback += `Errors:<br>` + errors.join('');
          }
          feedback += `<br><strong>Explanation:</strong> ${quiz.explanation}`;
          this.derivedFeedbacks[index] = feedback;
          this.currentDerivedMessage = `You got ${score} point${score > 1 ? 's' : ''}! Total: ${this.derivedScore}`;
          setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
          this.derivedChecked[index] = 2;
        }
      }
    },
    backToDerivedMastery() {
      this.showDerivedMastery = false;
      this.selectedTopic = null;
    },
    goToPowerSet() {
      this.showTruthMastery = false;
      this.selectedTopic = 2;
    },
    goToImplicationFromMastery() {
      this.showTruthMastery = false;
      this.showImplication = true;
    }
  }
};
</script>
```
<style scoped>
.lesson-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: url('/src/assets/images/bac.webp') no-repeat center center fixed;
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
  color:white;
}
.content-box {
  padding: 5px;
  background:rgba(217, 230, 239, 0.62);
  border-radius: 15px;
  margin-bottom: 20px;
}
.problem-box {
  background:rgb(221, 231, 238);
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  text-align: left;
  font-size:15px;
}
.answer-input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #aaa;
  margin: 10px 0;
}
.submit-button, .solve-button, .next-button, .step-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
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
.result-box {
  margin-top: 10px;
  padding: 10px;
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
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  font-size: 15px;
  margin-bottom: 12px;
  border: 1px solid #f1e2a3;
}
.practice-row {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.additional-card {
  flex: 1;
}
.pretest-container .submit-button {
    width: 100%;
    padding: 15px;
    font-size: 16px;
  }
.score-container {
  background-color: #e3f2fd;
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
  animation: fadeSlideUp 0.5s ease-out;
}
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.fade-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 5px;
  margin: 10px auto;
  text-align: center;
  width: fit-content;
  display: block;
  font-size: 24px;
  font-weight: bold;
  animation: fadeSlideUpInOut 3s ease-in-out;
}
@keyframes fadeSlideUpInOut {
  0% { opacity: 0; transform: translateY(20px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(0); }
}
</style>
```