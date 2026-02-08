<template>
  <div class="lesson-container">
    <!-- ✅ Pre-Test Section - Only show if not completed in this session -->
    <div v-if="!preTestCompleted && !hasTakenPreTestInSession" class="pretest-container">
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
          <p v-else>💡 Don't worry! The lesson will help you understand better.</p>
          <button @click="completePreTest" class="next-button">➡️ Continue to Lesson</button>
        </div>
      </div>
    </div>
    
    <!-- ✅ Lesson Content - Show if pre-test completed OR already taken in this session -->
    <div v-else>
      <div v-if="!hasTakenPreTestInSession && !preTestCompleted" style="text-align: center; padding: 20px;">
        <h4>Welcome Back!</h4>
        <p>You've already completed the pre-test in this session. Proceeding to lesson content...</p>
        <button @click="proceedToLesson" class="next-button" style="margin-top: 20px;">
          ➡️ Continue to Lesson
        </button>
      </div>
      <div v-else>
        <h5 class="title">📚 Propositional Logic</h5>
        <!-- Normal Lesson View -->
        <div v-if="!showImplication && !showTruthMastery && !showDerivedMastery && !showLawMastery">
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
                  2. p ∧ q: the conjunction of statements p and q. – "p and q."
                </div>
                <div class="guide-box">
                  3. p ∨ q: the disjunction of statements p and q. – "p or q."
                </div>
                <div class="guide-box">
                  4. p → q: the (material) implication of q by p. – "Hypothesis p implies conclusion q"; "if p, then q".
                </div>
                <div class="guide-box">
                  5. p ↔ q: the biconditional of p and q. – "p if and only if q."
                </div>
              </div>
              <div v-if="index === 0" class="problem-box" style="text-align: left;">
                <h5 style="text-align: left;"><strong>1. Conjunction (AND)</strong></h5>
                <div class="guide-box">
                  <strong>Symbol: ∧</strong>
                </div>
                <div class="guide-box">
                  Meaning: The statement p ∧ q is read as "p and q." Only if both the values of p and q are true does this expression evaluate to true. Otherwise it is false.
                </div>
                <div style="display: flex; justify-content: center; align-items: center; margin: 10px 0;">
                  <button
                    @click="showConjunctionExample = !showConjunctionExample"
                    class="step-button big-step-button"
                  >
                    {{ showConjunctionExample ? "🔽 Hide Example" : "📘 Show Example" }}
                  </button>
                </div>
                <div v-if="showConjunctionExample" class="guide-box">
                  <strong>Example:</strong><br>
                  ➡️ p: "It is raining."<br>
                  ➡️ q: "I have an umbrella."<br>
                  ➡️ p ∧ q: "It is raining and I have an umbrella." <strong> → True only if both statements are true.</strong>
                </div>
                <div class="problem-box">
                  <h7 class="conjunction-title"><strong>Conjunction Truth Table</strong></h7>
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
                  <p>P ∧ Q is true if both P and Q are true. It's only false if either P is false or Q is false (or both).</p>
                </div>
              </div>
              <div v-if="index === 0" class="problem-box" style="text-align: left;">
                <h5 style="text-align: left;"><strong>2. Disjunction (OR)</strong></h5>
                <div class="guide-box">
                  <strong>Symbol: ∨</strong>
                </div>
                <div class="guide-box">
                  Meaning: If at least one of the values of p or q is true, the entire expression is true
                </div>
                <div style="display: flex; justify-content: center; align-items: center; margin: 10px 0;">
                  <button
                    @click="showDisjunctionExample = !showDisjunctionExample"
                    class="step-button big-step-button"
                  >
                    {{ showDisjunctionExample ? "🔽 Hide Example" : "📘 Show Example" }}
                  </button>
                </div>
                <div v-if="showDisjunctionExample" class="guide-box">
                  Example:<br>
                  ➡️ p: "I will study."<br>
                  ➡️ q: "I will play."<br>
                  ➡️ p ∨ q: "I will study or play." <strong>→ True if one or both are true.</strong>
                </div>
                <div class="problem-box">
                  <h7 class="conjunction-title"><strong>Disjunction Truth Table</strong></h7>
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
              <div v-if="index === 0" class="problem-box" style="text-align: left;">
                <h5 style="text-align: left;"><strong>3. Implication (IF…THEN)</strong></h5>
                <div class="guide-box">
                  <strong>Symbol: →</strong>
                </div>
                <div class="guide-box">
                  Meaning: If p is true, then q must be true. However, if p is not true, there is no guarantee of the truth of q. An important observation to note: when statements are combined with an implication, there is no need for there to be a causal relationship between the two for the implication to be true.
                </div>
                <button
                  @click="showImplicationExample = !showImplicationExample"
                  class="step-button"
                  style="display: block; margin: 10px auto; padding: 10px 15px; font-size: 16px; border-radius: 8px;"
                >
                  {{ showImplicationExample ? "🔽 Hide Example" : "📘 Show Example" }}
                </button>
                <div v-if="showImplicationExample" class="guide-box">
                  <strong>Example:<br> </strong>
                  ➡️ p: "If it rains,"<br>
                  ➡️ q: "then the ground will be wet."<br>
                  ➡️ p → q: True unless it rains and the ground is not wet.
                </div>
                <div class="problem-box">
                  <h7 class="conjunction-title"><strong>Logical Implication Table</strong></h7>
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
                  <p>p → q the statement is true when the promise is kept and false when the promise is broken. So, if you get an A (p) and I give you a dollar (q), the statement is true. But if you get an A (p) and I don't give you a dollar (not q), the statement is false because the promise was not kept.</p>
                </div>
              </div>
              <div v-if="index === 0" class="problem-box" style="text-align: left;">
                <h5 style="text-align: left;"><strong>4.Biconditional (IF AND ONLY IF)</strong></h5>
                <div class="guide-box">
                  <strong>Symbol: ↔ </strong>
                </div>
                <div class="guide-box">
                  Meaning: When p is true, q is true and if p is false, q must be false as well.
                </div>
                <button
                  @click="showBiconditionalExample = !showBiconditionalExample"
                  class="step-button"
                  style="display: block; margin: 10px auto; padding: 10px 15px; font-size: 16px; border-radius: 8px;"
                >
                  {{ showBiconditionalExample ? "🔽 Hide Example" : "📘 Show Example" }}
                </button>
                <div v-if="showBiconditionalExample" class="guide-box">
                  <strong>Example:</strong><br>
                  ➡️ p: "You pass the exam."<br>
                  ➡️ q: "You studied."<br>
                  ➡️ p ↔ q: "You pass the exam if and only if you studied." → Both must be true or both false.
                </div>
                <div class="problem-box">
                  <h7 class="conjunction-title"><strong>Biconditional Truth Table</strong></h7>
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
              <button
                v-if="index === 0"
                @click="showImplication = true; scrollToTop()"
                class="next-button"
                style="padding: 16px 40px; font-size: 15px; border-radius: 10px;"
              >
                ➡️ Next
              </button>
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
                <h4>Conjunction Table</h4>
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
                <h4>Disjunction Table</h4>
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
                <p>p → q the statement is true when the promise is kept and false when the promise is broken. So, if you get an A (p) and I give you a dollar (q), the statement is true. But if you get an A (p) and I don't give you a dollar (not q), the statement is false because the promise was not kept.</p>
              </div>
              <div v-if="index === 1" class="problem-box">
                <h4>Biconditional Table</h4>
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
              <button
                v-if="index === 1"
                @click="goToMasteryQuiz"
                class="next-button"
                style="padding: 16px 40px; font-size: 18px; border-radius: 10px;"
              >
                ➡️ Next
              </button>
              <div v-if="index === 2" class="problem-box">
                <h4>Implication Table</h4>
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
                <div class="guide-box">
                  <p>The implication connective (p → q) is true unless p is true and q is false.</p>
                </div>
              </div>
              <div v-if="index === 2" class="problem-box">
                <h4>Biconditional Table</h4>
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
                <div class="guide-box">
                  <p>The biconditional connective (p ↔ q) is true when p and q have the same truth value.</p>
                </div>
              </div>
              <div v-if="index === 2" class="problem-box">
                <h4>Exclusive OR (XOR)</h4>
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
                  <p>The Exclusive OR (XOR) connective (p ⨁ q) is true only if p and q have different truth values.</p>
                </div>
              </div>
              <div v-if="index === 2" class="problem-box">
                <h4>NAND (Not And) </h4>
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
                <h4>NOR (Not Or) Table</h4>
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
                <h4>Sheffer Stroke Table</h4>
                <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                  <thead>
                    <tr style="background-color: #3b9cccff;">
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                      <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P ∣ Q</th>
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
                  <p>The Sheffer Stroke connective (p ∣ q) is the negation of the conjunction (p ∧ q). It is true unless both p and q are true.</p>
                </div>
              </div>
              <div v-if="index === 2" class="problem-box">
                <h4>Peirce Arrow Table</h4>
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
                  <p>The Peirce Arrow connective (p ↓ q) is the negation of the disjunction (p ∨ q). It is true only when both p and q are false.</p>
                </div>
              </div>
              <button
                v-if="index === 2"
                @click="goToDerivedMasteryQuiz"
                class="next-button"
                style="padding: 16px 40px; font-size: 18px; border-radius: 10px;"
              >
                ➡️ Next
              </button>
              <div v-if="index === 3" class="problem-box">
                <h4>Contradiction</h4>
                <div class="guide-box">
                  <p>The opposite of a tautology is a contradiction, a formula which is "always false". In other words, a contradiction is false for every assignment of truth values to its simple components.</p>
                </div>
               
                <img src="/images/tautology.png" alt="tautology" style="width: 100%; max-width: 300px; display: block; margin: 0 auto;">
                <p>The image above with the red text is an example of a contradiction, which is always false. .</p>
              </div>
              <div v-if="index === 3" class="problem-box">
                <h4>Logically equivalent </h4>
                <div class="guide-box">
                  <p>Two statements X and Y are logically equivalent if is a tautology. Another way to say this is: For each assignment of truth values to the simple statements which make up X and Y, the statements X and Y have identical truth values.</p>
                </div>
                 <img src="/images/equivalent.png" alt="tautology" style="width: 100%; max-width: 300px; display: block; margin: 0 auto;">
                <p>The image shows two logical expressions that always give the same result. The expression p ∨ ¬p is always true, no matter the value of p. Because of this, it is logically equivalent to T (true).</p>
              </div>
              <!-- ✅ ADDED: Back to Lesson Button in Tautology Section -->
              <div v-if="index === 3" style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
                <button
                  @click="selectedTopic = null"
                  class="next-button"
                  style="padding: 16px 40px; font-size: 18px; border-radius: 10px;"
                >
                  ⬅️ Back to Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="showImplication" class="content-box">
          <div class="problem-box">
            <h5 style="text-align: center;">Laws to Simplify Logical Expressions</h5>
            <div class="guide-box">
              <strong>1. Law of Double Negation</strong><br>
              <strong>¬¬p ⇔ p</strong><br>
              ➡️ Negating a statement twice gives back the original statement.<br>
              Example: ¬¬True = True
            </div>
            <div class="guide-box">
              <strong>2. De Morgan's Laws</strong><br>
              <strong>¬(p ∨ q) ⇔ ¬p ∧ ¬q</strong><br>
              <strong>¬(p ∧ q) ⇔ ¬p ∨ ¬q</strong><br>
              ➡️ The negation of "or" becomes "and," and vice versa.<br>
              Example: ¬(Rain ∨ Cold) = ¬Rain ∧ ¬Cold
            </div>
            <div class="guide-box">
              <strong>3. Commutative Laws</strong><br>
             <strong> p ∨ q ⇔ q ∨ p</strong><br>
              <strong>p ∧ q ⇔ q ∧ p</strong><br>
              ➡️ Order doesn't matter in "and" or "or" operations.<br>
              Example: (A ∧ B) = (B ∧ A)
            </div>
            <div class="guide-box">
              <strong>4. Associative Laws</strong><br>
              <strong>(p ∨ q) ∨ r ⇔ p ∨ (q ∨ r)</strong><br>
              <strong>(p ∧ q) ∧ r ⇔ p ∧ (q ∧ r)</strong><br>
              ➡️ The way statements are grouped doesn't change the result.<br>
              Example: ((A ∨ B) ∨ C) = (A ∨ (B ∨ C))
            </div>
            <div class="guide-box">
              <strong>5. Distributive Laws</strong><br>
              <strong>p ∨ (q ∧ r) ⇔ (p ∨ q) ∧ (p ∨ r)</strong><br>
              <strong>p ∧ (q ∨ r) ⇔ (p ∧ q) ∨ (p ∧ r)</strong><br>
              ➡️ Similar to multiplication and addition in math — distribute across.<br>
              Example: A ∨ (B ∧ C) = (A ∨ B) ∧ (A ∨ C)
            </div>
          </div>
          <div class="problem-box">
            <h5 style="text-align: center;"></h5>
            <div class="guide-box">
              <strong>6. Idempotent Laws</strong><br>
              <strong>p ∨ p ⇔ p</strong><br>
              <strong>p ∧ p ⇔ p</strong><br>
              ➡️ Repeating the same statement doesn't change its meaning.<br>
              Example: A ∨ A = A
            </div>
            <div class="guide-box">
              <strong>7. Identity Laws</strong><br>
              <strong>p ∨ F ⇔ p</strong><br>
              <strong>p ∧ T ⇔ p</strong><br>
              ➡️ Combining with false or true keeps the same value.<br>
              Example: A ∨ False = A
            </div>
            <div class="guide-box">
              <strong>8. Inverse (Negation) Laws</strong><br>
              <strong>p ∨ ¬p ⇔ T</strong><br>
              <strong>p ∧ ¬p ⇔ F</strong><br>
              ➡️ A statement or its opposite is always true; both together are always false.<br>
              Example: It's raining or not raining = Always True
            </div>
            <div class="guide-box">
              <strong>9. Domination Laws</strong><br>
             <strong> p ∨ T ⇔ T</strong><br>
              <strong>p ∧ F ⇔ F</strong><br>
              ➡️ Anything "or True" is True; anything "and False" is False.<br>
              Example: A ∨ True = True
            </div>
            <div class="guide-box">
              <strong>10.Absorption Laws</strong><br>
              <strong>p ∨ (p ∧ q) ⇔ p</strong><br>
              <strong>p ∧ (p ∨ q) ⇔ p</strong><br>
              ➡️ Adding extra conditions that include "p" doesn't change the result.<br>
              Example: A ∨ (A ∧ B) = A
            </div>
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <button
              @click="goToLawMastery"
              class="next-button"
              style="padding: 16px 40px; font-size: 18px; border-radius: 10px;"
            >
              ➡️ Next: Mastery Quiz
            </button>
          </div>
        </div>
        <!-- ✅ Law Mastery Quiz (Carousel Version) -->
        <div v-else-if="showLawMastery" class="content-box">
          <h5>Laws Mastery Quiz</h5>
          <div class="score-container">
            <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ lawScore }}/{{ lawQuizzes.length }}</p>
          </div>
          
          <!-- Question Counter -->
          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
            <span style="margin: 0 20px; font-weight: bold; font-size: 18px;">
              Question {{ currentLawQuizIndex + 1 }} of {{ lawQuizzes.length }}
            </span>
          </div>
          
          <!-- Current Quiz Display -->
          <div class="problem-box">
            <h4>Mastery Quiz {{ currentLawQuizIndex + 1 }}</h4>
            <p><strong>Identify the law used in the following statement:</strong></p>
            <div v-html="lawQuizzes[currentLawQuizIndex].statement"></div>
            <input
              v-model="lawAnswers[currentLawQuizIndex]"
              placeholder="Type the name of the law here"
              class="answer-input"
              @input="lawChecked[currentLawQuizIndex] = 0"
            />
            <button @click="checkLaw(currentLawQuizIndex)" :disabled="lawChecked[currentLawQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
            <div v-if="lawFeedbacks[currentLawQuizIndex]" class="result-box">
              <p>{{ lawFeedbacks[currentLawQuizIndex] }}</p>
            </div>
            <div v-if="currentLawMessage && currentLawQuizIndex === lastLawQuizWithMessage" class="fade-message">{{ currentLawMessage }}</div>
            
            <!-- Previous/Next Buttons (below LET'S CHECK) -->
            <div class="carousel-controls" style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 20px;">
              <!-- Only show Next button if not on question 5 (index 4) -->
              <button v-if="currentLawQuizIndex !== 4" @click="nextLawQuiz" :disabled="!canProceedToNextLawQuiz" class="carousel-nav-btn">
                Next ➡️
              </button>
            </div>
            
            <!-- Completion Message -->
            <div v-if="isLawQuizComplete" class="completion-box" style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 10px; text-align: center;">
              <h4>🎉 Quiz Completed!</h4>
              <p>You scored {{ lawScore }} out of {{ lawQuizzes.length }}.</p>
              <p v-if="lawScore < lawQuizzes.length" style="color: #dc3545; font-weight: bold;">
                ⚠️ You need a perfect score ({{ lawQuizzes.length }}/{{ lawQuizzes.length }}) to proceed!
              </p>
              <button 
                @click="backToMainLesson" 
                :disabled="lawScore < lawQuizzes.length"
                class="next-button" 
                :style="lawScore < lawQuizzes.length ? 'background: #cccccc; cursor: not-allowed;' : ''"
                style="margin-top: 10px;"
              >
                ⬅️ Back to Lesson
              </button>
              <p v-if="lawScore < lawQuizzes.length" style="color: #666; font-size: 14px; margin-top: 10px;">
                Please achieve a perfect score ({{ lawQuizzes.length }}/{{ lawQuizzes.length }}) to continue.
              </p>
            </div>
          </div>
        </div>
        
        <!-- ✅ Truth Tables Mastery Quiz (Carousel Version) -->
        <div v-else-if="showTruthMastery" class="content-box">
          <h5>Truth Tables Mastery Quiz</h5>
          <div class="score-container">
            <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ truthScore }} / {{ masteryQuizzes.length }}</p>
          </div>
          
          <!-- Question Counter -->
          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
            <span style="margin: 0 20px; font-weight: bold; font-size: 18px;">
              Question {{ currentTruthQuizIndex + 1 }} of {{ masteryQuizzes.length }}
            </span>
          </div>
          
          <!-- Current Quiz Display -->
          <div class="problem-box">
            <h4>Mastery Quiz {{ currentTruthQuizIndex + 1 }}</h4>
            <p><strong>Which connective symbol represents this truth table?</strong></p>
            <div class="truth-table">
              <div v-html="masteryQuizzes[currentTruthQuizIndex].table"></div>
            </div>
            <div v-for="(option, optIndex) in masteryOptions" :key="optIndex" class="option-box">
              <label class="option-label">
                <input 
                  type="radio" 
                  :name="'m' + currentTruthQuizIndex" 
                  :value="option" 
                  v-model="masteryAnswers[currentTruthQuizIndex]"
                  @change="truthChecked[currentTruthQuizIndex] = 0"
                />
                <span class="option-text">{{ option }}</span>
              </label>
            </div>
            <button @click="checkMastery(currentTruthQuizIndex)" :disabled="truthChecked[currentTruthQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
            <div v-if="masteryFeedbacks[currentTruthQuizIndex]" class="result-box">
              <p>{{ masteryFeedbacks[currentTruthQuizIndex] }}</p>
            </div>
            <div v-if="currentTruthMessage && currentTruthQuizIndex === lastTruthQuizWithMessage" class="fade-message">{{ currentTruthMessage }}</div>
            
            <!-- Previous/Next Buttons (below LET'S CHECK) -->
            <div class="carousel-controls" style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 20px;">
              <!-- Only show Next button if not on question 5 (index 4) -->
              <button v-if="currentTruthQuizIndex !== 4" @click="nextTruthQuiz" :disabled="!canProceedToNextTruthQuiz" class="carousel-nav-btn">
                Next ➡️
              </button>
            </div>
            
            <!-- Completion Message -->
            <div v-if="isTruthQuizComplete" class="completion-box" style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 10px; text-align: center;">
              <h4>🎉 Quiz Completed!</h4>
              <p>You scored {{ truthScore }} out of {{ masteryQuizzes.length }}.</p>
              <p v-if="truthScore < masteryQuizzes.length" style="color: #dc3545; font-weight: bold;">
                ⚠️ You need a perfect score ({{ masteryQuizzes.length }}/{{ masteryQuizzes.length }}) to proceed!
              </p>
              <button 
                @click="backToMainLesson" 
                :disabled="truthScore < masteryQuizzes.length"
                class="next-button" 
                :style="truthScore < masteryQuizzes.length ? 'background: #cccccc; cursor: not-allowed;' : ''"
                style="margin-top: 10px;"
              >
                ⬅️ Back to Lesson
              </button>
              <p v-if="truthScore < masteryQuizzes.length" style="color: #666; font-size: 14px; margin-top: 10px;">
                Please achieve a perfect score ({{ masteryQuizzes.length }}/{{ masteryQuizzes.length }}) to continue.
              </p>
            </div>
          </div>
        </div>
        
        <!-- ✅ Derived Connectives Mastery Quiz (Carousel Version) -->
        <div v-else-if="showDerivedMastery" class="content-box">
          <h5>Derived Connectives Mastery Quiz</h5>
          <div class="score-container">
            <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ derivedScore }} / {{ derivedQuizzes.length * 4 }}</p>
          </div>
          
          <!-- Question Counter -->
          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
            <span style="margin: 0 20px; font-weight: bold; font-size: 18px;">
              Question {{ currentDerivedQuizIndex + 1 }} of {{ derivedQuizzes.length }}
            </span>
          </div>
          
          <!-- Current Quiz Display -->
          <div class="problem-box">
            <h4>Quiz {{ currentDerivedQuizIndex + 1 }}</h4>
            <p><strong>Fill in the {{ derivedQuizzes[currentDerivedQuizIndex].fillColumn === 'result' ? 'Result' : derivedQuizzes[currentDerivedQuizIndex].fillColumn.toUpperCase() }} column for the {{ derivedQuizzes[currentDerivedQuizIndex].name }} truth table.</strong></p>
            <div class="truth-table">
              <table style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">
                <thead>
                  <tr style="background-color: #44cd9dff;">
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">P</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">Q</th>
                    <th style="border: 1px solid #544f4fff; padding: 8px; text-align: left;">{{ getConnectiveSymbol(derivedQuizzes[currentDerivedQuizIndex].name) }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in 4" :key="r">
                    <td style="border: 1px solid #544f4fff; padding: 8px;">
                      <input v-if="derivedQuizzes[currentDerivedQuizIndex].fillColumn === 'p' && derivedChecked[currentDerivedQuizIndex] < 2"
                        type="text"
                        v-model="derivedAnswers[currentDerivedQuizIndex][r-1]"
                        @input="handleDerivedInput(currentDerivedQuizIndex, r-1, $event)"
                        maxlength="1"
                        style="text-align: center; width: 30px; border: none; background: transparent;"
                      />
                      <span v-else-if="derivedQuizzes[currentDerivedQuizIndex].fillColumn === 'p' && derivedChecked[currentDerivedQuizIndex] >= 2"
                        :style="{ color: derivedAnswers[currentDerivedQuizIndex][r-1] === getCorrectValue(derivedQuizzes[currentDerivedQuizIndex], r-1) ? 'green' : 'red' }"
                      >{{ derivedAnswers[currentDerivedQuizIndex][r-1] || getCorrectValue(derivedQuizzes[currentDerivedQuizIndex], r-1) }}</span>
                      <span v-else>{{ derivedQuizzes[currentDerivedQuizIndex].pValues ? derivedQuizzes[currentDerivedQuizIndex].pValues[r-1] : '' }}</span>
                    </td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">
                      <input v-if="derivedQuizzes[currentDerivedQuizIndex].fillColumn === 'q' && derivedChecked[currentDerivedQuizIndex] < 2"
                        type="text"
                        v-model="derivedAnswers[currentDerivedQuizIndex][r-1]"
                        @input="handleDerivedInput(currentDerivedQuizIndex, r-1, $event)"
                        maxlength="1"
                        style="text-align: center; width: 30px; border: none; background: transparent;"
                      />
                      <span v-else-if="derivedQuizzes[currentDerivedQuizIndex].fillColumn === 'q' && derivedChecked[currentDerivedQuizIndex] >= 2"
                        :style="{ color: derivedAnswers[currentDerivedQuizIndex][r-1] === getCorrectValue(derivedQuizzes[currentDerivedQuizIndex], r-1) ? 'green' : 'red' }"
                      >{{ derivedAnswers[currentDerivedQuizIndex][r-1] || getCorrectValue(derivedQuizzes[currentDerivedQuizIndex], r-1) }}</span>
                      <span v-else>{{ derivedQuizzes[currentDerivedQuizIndex].qValues ? derivedQuizzes[currentDerivedQuizIndex].qValues[r-1] : '' }}</span>
                    </td>
                    <td style="border: 1px solid #544f4fff; padding: 8px;">
                      <input v-if="derivedQuizzes[currentDerivedQuizIndex].fillColumn === 'result' && derivedChecked[currentDerivedQuizIndex] < 2"
                        type="text"
                        v-model="derivedAnswers[currentDerivedQuizIndex][r-1]"
                        @input="handleDerivedInput(currentDerivedQuizIndex, r-1, $event)"
                        maxlength="1"
                        style="text-align: center; width: 30px; border: none; background: transparent;"
                      />
                      <span v-else-if="derivedQuizzes[currentDerivedQuizIndex].fillColumn === 'result' && derivedChecked[currentDerivedQuizIndex] >= 2"
                        :style="{ color: derivedAnswers[currentDerivedQuizIndex][r-1] === getCorrectValue(derivedQuizzes[currentDerivedQuizIndex], r-1) ? 'green' : 'red' }"
                      >{{ derivedAnswers[currentDerivedQuizIndex][r-1] || getCorrectValue(derivedQuizzes[currentDerivedQuizIndex], r-1) }}</span>
                      <span v-else>{{ derivedQuizzes[currentDerivedQuizIndex].correctResults[r-1] }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button @click="checkDerived(currentDerivedQuizIndex)" :disabled="derivedChecked[currentDerivedQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
            <div v-if="derivedFeedbacks[currentDerivedQuizIndex]" class="result-box">
              <p v-html="derivedFeedbacks[currentDerivedQuizIndex]"></p>
            </div>
            <div v-if="currentDerivedMessage && currentDerivedQuizIndex === lastDerivedQuizWithMessage" class="fade-message">{{ currentDerivedMessage }}</div>
            
            <!-- Previous/Next Buttons (below LET'S CHECK) -->
            <div class="carousel-controls" style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 20px;">
              <!-- Only show Next button if not on question 20 (we have 5 questions, so remove from last one) -->
              <button v-if="currentDerivedQuizIndex !== 4" @click="nextDerivedQuiz" :disabled="!canProceedToNextDerivedQuiz" class="carousel-nav-btn">
                Next ➡️
              </button>
            </div>
            
            <!-- Completion Message -->
            <div v-if="isDerivedQuizComplete" class="completion-box" style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 10px; text-align: center;">
              <h4>🎉 Quiz Completed!</h4>
              <p>You scored {{ derivedScore }} out of {{ derivedQuizzes.length * 4 }}.</p>
              <p v-if="derivedScore < 15" style="color: #dc3545; font-weight: bold;">
                ⚠️ You need a minimum score of 15 points to proceed!
              </p>
              <p v-if="derivedScore >= 15" style="color: #4CAF50; font-weight: bold;">
                ✅ Great! You've reached the minimum required score of 15!
              </p>
              <button 
                @click="backToMainLesson" 
                :disabled="derivedScore < 15"
                class="next-button" 
                :style="derivedScore < 15 ? 'background: #cccccc; cursor: not-allowed;' : ''"
                style="margin-top: 10px;"
              >
                ⬅️ Back to Lesson
              </button>
              <p v-if="derivedScore < 15" style="color: #666; font-size: 14px; margin-top: 10px;">
                You need at least 15 points to proceed. Current score: {{ derivedScore }}
              </p>
            </div>
          </div>
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
      hasTakenPreTestInSession: false,
      preTestQuestions: [
        { question: "What is a tautology?", options: ["A statement that is always false", "A statement that is always true", "A statement that depends on the situation", "A statement with no meaning"], answer: "A statement that is always true", explanation: "A tautology is a statement that is always true. p ∨ ¬p (law of excluded middle) is always true." },
        { question: "Which type of statement represents 'if-then'?", options: ["Conjunction", "Disjunction", "Conditional", "Equivalence"], answer: "Conditional", explanation: "The conditional statement is represented by 'if p, then q' or p → q." },
        { question: "Which of the following is a characteristic of a bijective function?", options: ["The function is both injective (one-to-one) and surjective (onto).", "The function is only surjective.", "The function is only injective.", "The function has at least one element in the domain that maps to multiple elements in the range."], answer: "The function is both injective (one-to-one) and surjective (onto).", explanation: "A bijective function is one-to-one (injective) and onto (surjective)." },
        { question: "Which of the following is the derived connective for 'if and only if' (denoted by ↔)?", options: ["p ∧ q", "(p → q) ∧ (q → p)", "p ∨ q", "¬(p → ¬q)"], answer: "(p → q) ∧ (q → p)", explanation: "The biconditional p ↔ q is equivalent to (p → q) ∧ (q → p)." },
        { question: "Symbolize: 'If it rains, the streets will be wet.'", options: ["R → W", "R ^ W", "R v W", "~R → ~W"], answer: "R → W", explanation: "The statement is a conditional: if R then W, so R → W." }
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
      showLawMastery: false,
      lawQuizzes: [
        {
          statement: "¬(p ∨ q) ⇔ ¬p ∧ ¬q<br>¬(p ∧ q) ⇔ ¬p ∨ ¬q",
          answer: "De Morgan's Laws",
          explanation: "The negation of 'or' becomes 'and,' and vice versa."
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
          explanation: "The way statements are grouped doesn't change the result."
        },
        {
          statement: "p ∨ T ⇔ T<br>p ∧ F ⇔ F",
          answer: "Domination Laws",
          explanation: "Anything 'or True' is True; anything 'and False' is False."
        }
      ],
      lawAnswers: [],
      lawFeedbacks: [],
      lawScore: 0,
      lawChecked: [],
      currentLawMessage: '',
      currentLawQuizIndex: 0,
      lastLawQuizWithMessage: -1,
      // ✅ MASTERY QUIZ DATA
      showTruthMastery: false,
      masteryAnswers: [],
      masteryFeedbacks: [],
      truthScore: 0,
      truthChecked: [],
      currentTruthMessage: '',
      currentTruthQuizIndex: 0,
      lastTruthQuizWithMessage: -1,
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
        currentDerivedQuizIndex: 0,
        lastDerivedQuizWithMessage: -1,
        topics: [
          { title: "PROPOSITIONAL LOGIC", content: "<strong>Propositional logic,</strong> also known as sentential logic and statement logic, is the branch of logic that studies ways of joining and or modifying entire propositions, statements or sentences to form more complicated propositions, statements or sentences, as well as the logical relationships and properties that are derived from these methods of combining or altering statements.<br><br> <strong>Propositions </strong> A statement can be defined as a declarative sentence, or part of a sentence, that is capable of having a truth-value, such as being true or false. " },
          { title: "TRUTH TABLES", content: "A truth table shows how the truth or falsity of a compound statement depends on the truth or falsity of the simple statements from which it's constructed.<table style=\"border-collapse: collapse; width: 100%; margin-bottom: 10px;\"><thead><tr style=\"background-color: #3b9cccff;\"><th style=\"border: 1px solid #ddd; padding: 8px; text-align: left;\">p</th><th style=\"border: 1px solid #ddd; padding: 8px; text-align: left;\">q</th></tr></thead><tbody><tr><td style=\"border: 1px solid #ddd; padding: 8px;\">T</td><td style=\"border: 1px solid #ddd; padding: 8px;\">T</td></tr><tr><td style=\"border: 1px solid #ddd; padding: 8px;\">T</td><td style=\"border: 1px solid #ddd; padding: 8px;\">F</td></tr><tr><td style=\"border: 1px solid #ddd; padding: 8px;\">F</td><td style=\"border: 1px solid #ddd; padding: 8px;\">T</td></tr><tr><td style=\"border: 1px solid #ddd; padding: 8px;\">F</td><td style=\"border: 1px solid #ddd; padding: 8px;\">F</td></tr></tbody></table>" },
          { title: "DERIVED CONNECTIVES", content: "<strong>Derived connectives </strong> are combinations of the three basic logic functions — AND, OR, and NOT — that are used so commonly they have been given their own names and logic symbols." },
          { title: "TAUTOLOGY", content: "<strong>A tautology </strong> is a formula which is \"always true\" that is, it is true for every assignment of truth values to its simple components.\nYou can think of a tautology as a rule of logic." }
        ]
      };
    },
    computed: {
      isPreTestComplete() {
        return this.userAnswers.length === this.preTestQuestions.length && this.userAnswers.every(answer => answer !== null && answer !== undefined);
      },
      canProceedToNextLawQuiz() {
        return this.lawChecked[this.currentLawQuizIndex] >= 2 || 
               (this.lawAnswers[this.currentLawQuizIndex] && this.lawAnswers[this.currentLawQuizIndex].trim() && this.lawChecked[this.currentLawQuizIndex] > 0);
      },
      canProceedToNextTruthQuiz() {
        return this.truthChecked[this.currentTruthQuizIndex] >= 2 || 
               (this.masteryAnswers[this.currentTruthQuizIndex] && this.truthChecked[this.currentTruthQuizIndex] > 0);
      },
      canProceedToNextDerivedQuiz() {
        return this.derivedChecked[this.currentDerivedQuizIndex] >= 2 || 
               (this.derivedAnswers[this.currentDerivedQuizIndex] && 
                this.derivedAnswers[this.currentDerivedQuizIndex].some(a => a && a.trim()) && 
                this.derivedChecked[this.currentDerivedQuizIndex] > 0);
      },
      isLawQuizComplete() {
        return this.currentLawQuizIndex === this.lawQuizzes.length - 1 && this.lawChecked[this.currentLawQuizIndex] >= 2;
      },
      isTruthQuizComplete() {
        return this.currentTruthQuizIndex === this.masteryQuizzes.length - 1 && this.truthChecked[this.currentTruthQuizIndex] >= 2;
      },
      isDerivedQuizComplete() {
        return this.currentDerivedQuizIndex === this.derivedQuizzes.length - 1 && this.derivedChecked[this.currentDerivedQuizIndex] >= 2;
      }
    },
    created() {
      // ✅ Shuffle questions on load
      this.preTestQuestions = this.shuffleArray(this.preTestQuestions);
      
      // ✅ Check if user has already taken pre-test in this session
      this.checkPreTestSessionStatus();
    },
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      
      // ✅ Check sessionStorage for pre-test completion
      checkPreTestSessionStatus() {
        const hasTakenPreTest = sessionStorage.getItem('lesson3_preTest_completed');
        if (hasTakenPreTest === 'true') {
          this.hasTakenPreTestInSession = true;
        }
      },
      
      // ✅ UPDATED: Auto-save Pre-Test Score to localStorage
      submitPreTest() {
        this.score = this.preTestQuestions.reduce((acc, q, i) => acc + (this.userAnswers[i] === q.answer ? 1 : 0), 0);
        this.showPreTestResult = true;
        
        // Auto-save to localStorage
        this.saveScoreToLocalStorage('preTest-lesson3', this.score);
      },
      
      // ✅ Helper method to save scores
      saveScoreToLocalStorage(key, score) {
        let existingAssessments = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
        existingAssessments[key] = score.toString();
        localStorage.setItem('assessmentScores', JSON.stringify(existingAssessments));
        console.log(`Score saved: ${key} = ${score}`);
      },
      
      // ✅ Complete pre-test and mark as taken in session
      completePreTest() {
        sessionStorage.setItem('lesson3_preTest_completed', 'true');
        this.hasTakenPreTestInSession = true;
        this.preTestCompleted = true;
        this.showPreTestResult = false;
      },
      
      // ✅ Proceed directly to lesson if pre-test already taken
      proceedToLesson() {
        this.preTestCompleted = true;
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
      goToMasteryQuiz() {
        this.showImplication = false;
        this.masteryQuizzes = this.shuffleArray([...this.masteryQuizzes]);
        this.masteryAnswers = new Array(5).fill(null);
        this.masteryFeedbacks = new Array(5).fill("");
        this.truthChecked = new Array(5).fill(0);
        this.truthScore = 0;
        this.currentTruthQuizIndex = 0;
        this.lastTruthQuizWithMessage = -1;
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
          this.lastTruthQuizWithMessage = index;
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
        // ✅ Auto-save score after each check
        this.saveScoreToLocalStorage('truthMastery-lesson3', this.truthScore);
      },
      prevTruthQuiz() {
        if (this.currentTruthQuizIndex > 0) {
          this.currentTruthQuizIndex--;
        }
      },
      nextTruthQuiz() {
        if (this.currentTruthQuizIndex < this.masteryQuizzes.length - 1 && this.canProceedToNextTruthQuiz) {
          this.currentTruthQuizIndex++;
        }
      },
      // ✅ UPDATED: Auto-save all scores when going back to lesson
      backToMainLesson() {
        // Save all scores automatically
        if (this.showTruthMastery) {
          this.saveScoreToLocalStorage('truthMastery-lesson3', this.truthScore);
        }
        
        if (this.showLawMastery) {
          this.saveScoreToLocalStorage('lawMastery-lesson3', this.lawScore);
        }
        
        if (this.showDerivedMastery) {
          this.saveScoreToLocalStorage('derivedMastery-lesson3', this.derivedScore);
        }
        
        // Reset UI states
        this.showTruthMastery = false;
        this.showImplication = false;
        this.showLawMastery = false;
        this.showDerivedMastery = false;
        this.masteryAnswers = [];
        this.masteryFeedbacks = [];
        this.selectedTopic = null;
        
        // Reset carousel indices
        this.currentLawQuizIndex = 0;
        this.currentTruthQuizIndex = 0;
        this.currentDerivedQuizIndex = 0;
      },
      goToLawMastery() {
        this.showImplication = false;
        this.lawAnswers = new Array(this.lawQuizzes.length).fill("");
        this.lawFeedbacks = new Array(this.lawQuizzes.length).fill("");
        this.lawChecked = new Array(this.lawQuizzes.length).fill(0);
        this.lawScore = 0;
        this.currentLawQuizIndex = 0;
        this.lastLawQuizWithMessage = -1;
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
          this.lastLawQuizWithMessage = index;
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
        // ✅ Auto-save score after each check
        this.saveScoreToLocalStorage('lawMastery-lesson3', this.lawScore);
      },
      prevLawQuiz() {
        if (this.currentLawQuizIndex > 0) {
          this.currentLawQuizIndex--;
        }
      },
      nextLawQuiz() {
        if (this.currentLawQuizIndex < this.lawQuizzes.length - 1 && this.canProceedToNextLawQuiz) {
          this.currentLawQuizIndex++;
        }
      },
      goToDerivedMasteryQuiz() {
        this.showDerivedMastery = true;
        this.derivedQuizzes = this.shuffleArray([...this.derivedQuizzes]);
        this.derivedAnswers = this.derivedQuizzes.map(() => new Array(4).fill(""));
        this.derivedFeedbacks = new Array(this.derivedQuizzes.length).fill("");
        this.derivedChecked = new Array(this.derivedQuizzes.length).fill(0);
        this.derivedScore = 0;
        this.currentDerivedQuizIndex = 0;
        this.lastDerivedQuizWithMessage = -1;
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
      handleDerivedInput(quizIndex, rowIndex, event) {
        event.target.value = event.target.value.toUpperCase().slice(-1);
        // Reset checked status when user modifies answer
        if (this.derivedChecked[quizIndex] > 0) {
          this.derivedChecked[quizIndex] = 0;
          this.derivedFeedbacks[quizIndex] = "";
        }
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
          this.lastDerivedQuizWithMessage = index;
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
            this.lastDerivedQuizWithMessage = index;
            setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
            this.derivedChecked[index] = 2;
          }
        }
        // ✅ Auto-save score after each check
        this.saveScoreToLocalStorage('derivedMastery-lesson3', this.derivedScore);
      },
      prevDerivedQuiz() {
        if (this.currentDerivedQuizIndex > 0) {
          this.currentDerivedQuizIndex--;
        }
      },
      nextDerivedQuiz() {
        if (this.currentDerivedQuizIndex < this.derivedQuizzes.length - 1 && this.canProceedToNextDerivedQuiz) {
          this.currentDerivedQuizIndex++;
        }
      },
    }
  };
</script>

<style scoped>
/* ✅ UPDATED CSS - Removed scrolling */
.lesson-container {
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: url('/images/bac.webp') no-repeat center center fixed;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  font-family: 'Arial', sans-serif;
  text-align: center;
  overflow-y: visible; /* Changed from auto to visible */
  overflow-x: hidden; /* Prevent horizontal scroll if any */
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-top: 10px;
}

.content-box {
  padding: 5px;
  background: rgba(217, 230, 239, 0.62);
  border-radius: 15px;
  margin-bottom: 20px;
}

.problem-box {
  background: rgb(221, 231, 238);
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  text-align: left;
  font-size: 15px;
}

.answer-input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #aaa;
  margin: 10px 0;
}

.submit-button, .solve-button, .next-button, .step-button, .carousel-nav-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
  transition: background-color 0.3s;
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

.submit-button:hover, .solve-button:hover, .next-button:hover, .step-button:hover, .carousel-nav-btn:hover {
  background: #388E3C;
}

.carousel-nav-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.next-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
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
  background:  #eeede9;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  font-size: 15px;
  margin-bottom: 12px;
  border: 1px solid #efd56d;
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

.conjunction-title {
  font-size: 25px;
}

.completion-box {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.carousel-controls {
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>