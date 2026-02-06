<template>
  <div class="lesson-container">

    <!-- ✅ Pre-Test Section - Only show if not completed in this session -->
    <div v-if="!preTestCompleted && !hasTakenPreTestInSession" class="pretest-container">
      <h3 class="title">📝 Pre-Test: Operations on Sets</h3>
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

      <button @click="submitPreTest" class="submit-button" :disabled="!allPreTestAnswersFilled">✅ Submit Pre-Test</button>

      <div v-if="showPreTestResult" class="modal-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 999; display: flex; justify-content: center; align-items: center;">
        <div class="result-box" style="background: white; padding: 20px; border-radius: 8px; max-width: 400px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h4>Your Score: {{ score }}/{{ preTestQuestions.length }}</h4>
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
        <h5 class="title">📚 OPERATIONS ON SETS</h5>

        <!-- 🔰 ADDED: Score Button -->
        <div class="score-button-container">
          <button @click="showMasteryScore" class="score-button">
             Click to See Your Score
          </button>
        </div>

        <!-- Normal Lesson View -->
        <div v-if="!unionPageActive && !intersectionPageActive && !differencePageActive && !complementPageActive && !cartesianPageActive && !vennPageActive">
          <div v-for="(topic, index) in topics" :key="index" class="content-box" v-show="selectedTopic === null || index === selectedTopic">
            <h5 @click="toggleTopic(index)" class="clickable-title">
              {{ topic.title }} {{ selectedTopic === index ? "" : "" }}
            </h5>

            <div v-if="selectedTopic === index">
              <div class="definition-box">
                <p v-html="formatContent(topic.content)"></p>
              </div>

              <!-- ✅ UNION TOPIC SPECIAL CONTENT -->
              <div v-if="topic.type === 'union'">

                <!-- 🔰 Toggle button for Your Guide -->
                <button @click="showUnionGuide = !showUnionGuide" class="solve-button">
                  {{ showUnionGuide ? "CLICK TO HIDE" : "YOUR GUIDE CLICK TO SHOW" }}
                </button>

                <!-- 🔰 Your Guide card ABOVE Try This -->
                <div v-if="showUnionGuide" class="guide-box">
                  <h4>📘 Your Guide</h4>
                  <p><strong>Goal:</strong> Find the union of set  {1, 3} ∪ {1, 4}.</p>

                  <p v-for="(step, sIdx) in unionSteps" :key="sIdx">
                    <button @click="toggleUnionStep(sIdx)" class="step-button">
                      Step {{ sIdx + 1 }}
                    </button>
                    <span v-if="unionRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                  </p>
                </div>

                <!-- 🔍 Let's Try-->
                <div class="problem-box">
                  <h4> Mastery Quiz 1</h4>
                  <p><strong>Find A ∪ B where A = {1,2} and B = {2,3,4}</strong></p>

                  <input 
                    v-model="unionAnswer" 
                    placeholder="Type your answer here" 
                    class="answer-input"
                  />

                  <button @click="checkUnionAnswer" class="submit-button">LET'S CHECK</button>

                  <div v-if="unionFeedback" class="result-box">
                    <p>{{ unionFeedback }}</p>
                  </div>
                </div>

                <!-- 🔰 TRY THIS Card -->
                <div class="problem-box">
                  <h4> Mastery Quiz 2</h4>
                  <p><strong>Which of the following is A ∪ B if A = {a,b,c} and B = {b,c,d,e}?</strong></p>

                  <div v-for="(option, idx) in unionQuiz.options" :key="idx" class="option-box">
                    <label class="option-label">
                      <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                      <input type="radio" name="unionQuiz" :value="option" v-model="unionQuizAnswer" />
                      <span class="option-text">{{ option }}</span>
                    </label>
                  </div>

                  <button @click="checkUnionQuiz" class="submit-button">LET'S CHECK</button>

                  <div v-if="unionQuizFeedback" class="result-box">
                    <p>{{ unionQuizFeedback }}</p>
                  </div>

                  <!-- 🔰 Next Button (goes to Union Page) -->
                  <button @click="unionPageActive = true" class="next-button">➡️ Next</button>
                </div>
              </div>

              <!-- ✅ INTERSECTION TOPIC SPECIAL CONTENT -->
              <div v-if="topic.type === 'intersection'">

                <!-- 🔰 Toggle button for Your Guide -->
                <button @click="showIntersectionGuide = !showIntersectionGuide" class="solve-button">
                  {{ showIntersectionGuide ? "CLICK TO HIDE" : "YOUR GUIDE CLICK TO SHOW" }}
                </button>

                <!-- 🔰 Your Guide card ABOVE Try This -->
                <div v-if="showIntersectionGuide" class="guide-box">
                  <h4>📘 Your Guide</h4>
                  <p><strong>Goal:</strong> Find A ∩ B of <em>set A = {1, 2}  </em> and <em> set B = {2, 4}  </em>.</p>

                  <p v-for="(step, sIdx) in intersectionSteps" :key="sIdx">
                    <button @click="toggleIntersectionStep(sIdx)" class="step-button">
                      Step {{ sIdx + 1 }}
                    </button>
                    <span v-if="intersectionRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                  </p>
                </div>

                <!-- 🔍 Let's Try-->
                <div class="problem-box">
                  <h4> Mastery Quiz 1</h4>
                  <p><strong>Find V ∩ R where V = { a, e, i, o, u } and R = { l, e, m, o, n }</strong></p>

                  <input 
                    v-model="intersectionAnswer" 
                    placeholder="Type your answer here" 
                    class="answer-input"
                  />

                  <button @click="checkIntersectionAnswer" class="submit-button">LET'S CHECK</button>

                  <div v-if="intersectionFeedback" class="result-box">
                    <p>{{ intersectionFeedback }}</p>
                  </div>
                </div>

                <!-- 🔰 TRY THIS Card -->
                <div class="problem-box">
                  <h4> Mastery Quiz 2 </h4>
                  <p><strong>Find V ∩ S where V = { m, a, i, d } and S = { s, a, i, d }</strong></p>

                  <input 
                    v-model="intersectionQuizAnswer" 
                    placeholder="Type your answer here" 
                    class="answer-input"
                  />

                  <button @click="checkIntersectionQuiz" class="submit-button">LET'S CHECK</button>

                  <div v-if="intersectionQuizFeedback" class="result-box">
                    <p>{{ intersectionQuizFeedback }}</p>
                  </div>

                  <!-- 🔰 Next Button (goes to Intersection Page) -->
                  <button @click="intersectionPageActive = true" class="next-button">➡️ Next</button>
                </div>
              </div>

              <!-- ✅ SET DIFFERENCE TOPIC SPECIAL CONTENT -->
              <div v-if="topic.type === 'difference'">

                <!-- 🔰 Toggle button for Your Guide -->
                <button @click="showDifferenceGuide = !showDifferenceGuide" class="solve-button">
                  {{ showDifferenceGuide ? "CLICK TO HIDE" : "YOUR GUIDE CLICK TO SHOW" }}
                </button>

                <!-- 🔰 Your Guide card ABOVE Try This -->
                <div v-if="showDifferenceGuide" class="guide-box">
                  <h4>📘 Your Guide</h4>
                  <p><strong>Goal:</strong> Find the  A - B of <em>A = {2, 3, 4} </em> and <em>B = {4, 5, 6}</em>.</p>

                  <p v-for="(step, sIdx) in differenceSteps" :key="sIdx">
                    <button @click="toggleDifferenceStep(sIdx)" class="step-button">
                      Step {{ sIdx + 1 }}
                    </button>
                    <span v-if="differenceRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                  </p>
                </div>

                <!-- 🔍 Let's Try-->
                <div class="problem-box">
                  <h4> Mastery Quiz 1 </h4>
                  <p><strong>Find H - K where H = { s, w, i, m } and K = { b, i, k, e }</strong></p>

                  <input 
                    v-model="differenceAnswer" 
                    placeholder="Type your answer here" 
                    class="answer-input"
                  />

                  <button @click="checkDifferenceAnswer" class="submit-button">LET'S CHECK</button>

                  <div v-if="differenceFeedback" class="result-box">
                    <p>{{ differenceFeedback }}</p>
                  </div>
                </div>

                <!-- 🔰 TRY THIS Card -->
                <div class="problem-box">
                  <h4> Mastery Quiz 2 </h4>
                  <p><strong>Find A - B where A = {10,20,30,40} and B = {30,40,50,60}</strong></p>

                  <input 
                    v-model="differenceQuizAnswer" 
                    placeholder="Type your answer here" 
                    class="answer-input"
                  />

                  <button @click="checkDifferenceQuiz" class="submit-button">LET'S CHECK</button>

                  <div v-if="differenceQuizFeedback" class="result-box">
                    <p>{{ differenceQuizFeedback }}</p>
                  </div>

                  <!-- 🔰 Next Button (goes to Difference Page) -->
                  <button @click="differencePageActive = true" class="next-button">➡️ Next</button>
                </div>
              </div>

              <!-- ✅ SET COMPLEMENT TOPIC SPECIAL CONTENT -->
              <div v-if="topic.type === 'complement'">

                <!-- 🔰 Toggle button for Your Guide -->
                <button @click="showComplementGuide = !showComplementGuide" class="solve-button">
                  {{ showComplementGuide ? "CLICK TO HIDE" : "YOUR GUIDE CLICK TO SHOW" }}
                </button>

                <!-- 🔰 Your Guide card ABOVE Try This -->
                <div v-if="showComplementGuide" class="guide-box">
                  <h4>📘 Your Guide</h4>
                  <p><strong>Goal:</strong> Find A' Let U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10 },  A = {2, 4, 6, 8 }.</p>

                  <p v-for="(step, sIdx) in complementSteps" :key="sIdx">
                    <button @click="toggleComplementStep(sIdx)" class="step-button">
                      Step {{ sIdx + 1 }}
                    </button>
                    <span v-if="complementRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                  </p>
                </div>

                <!-- 🔍 Let's Try-->
                <div class="problem-box">
                  <h4> Mastery Quiz 1 </h4>
                  <p><strong>Find A' where U = {red,blue,green,yellow,black,white} and A = {red,green,black}</strong></p>

                  <input 
                    v-model="complementAnswer" 
                    placeholder="Type your answer here" 
                    class="answer-input"
                  />

                  <button @click="checkComplementAnswer" class="submit-button">LET'S CHECK</button>

                  <div v-if="complementFeedback" class="result-box">
                    <p>{{ complementFeedback }}</p>
                  </div>
                </div>

                <!-- 🔰 TRY THIS Card -->
                <div class="problem-box">
                  <h4> Mastery Quiz 2 </h4>
                  <p><strong>Which of the following is A' if A = {1,2,3} and U = {1,2,3,4,5}?</strong></p>

                  <div v-for="(option, idx) in complementQuiz.options" :key="idx" class="option-box">
                    <label class="option-label">
                      <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                      <input type="radio" name="complementQuiz" :value="option" v-model="complementQuizAnswer" />
                      <span class="option-text">{{ option }}</span>
                    </label>
                  </div>

                  <button @click="checkComplementQuiz" class="submit-button">LET'S CHECK</button>

                  <div v-if="complementQuizFeedback" class="result-box">
                    <p>{{ complementQuizFeedback }}</p>
                  </div>

                  <!-- 🔰 Next Button (goes to Complement Page) -->
                  <button @click="complementPageActive = true" class="next-button">➡️ Next</button>
                </div>
              </div>

              <!-- ✅ CARTESIAN PRODUCT TOPIC SPECIAL CONTENT -->
              <div v-if="topic.type === 'cartesian'">

                <!-- 🔰 Toggle button for Your Guide -->
                <button @click="showCartesianGuide = !showCartesianGuide" class="solve-button">
                  {{ showCartesianGuide ? "CLICK TO HIDE " : "YOUR GUIDE CLICK TO SHOW" }}
                </button>

                <!-- 🔰 Your Guide card ABOVE Try This -->
                <div v-if="showCartesianGuide" class="guide-box">
                  <h4>📘 Your Guide</h4>
                  <p><strong>Goal:</strong> Find the A × B of  {1, 3} × {1, 3} .</p>

                  <p v-for="(step, sIdx) in cartesianSteps" :key="sIdx">
                    <button @click="toggleCartesianStep(sIdx)" class="step-button">
                      Step {{ sIdx + 1 }}
                    </button>
                    <span v-if="cartesianRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                  </p>
                </div>

                <!-- 🔍 Let's Try-->
                <div class="problem-box">
                  <h4> Mastery Quiz 1</h4>
                  <p><strong>Find A × B where A = {x,y} and B = {1,2,3}</strong></p>

                  <input 
                    v-model="cartesianAnswer" 
                    placeholder="Type your answer here" 
                    class="answer-input"
                  />

                  <button @click="checkCartesianAnswer" class="submit-button">LET'S CHECK</button>

                  <div v-if="cartesianFeedback" class="result-box">
                    <p>{{ cartesianFeedback }}</p>
                  </div>
                </div>

                <!-- 🔰 TRY THIS Card -->
                <div class="problem-box">
                  <h4> Mastery Quiz 2 </h4>
                  <p><strong>Which of the following is A × B if A = {1,2} and B = {a,b}?</strong></p>

                  <div v-for="(option, idx) in cartesianQuiz.options" :key="idx" class="option-box">
                    <label class="option-label">
                      <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                      <input type="radio" name="cartesianQuiz" :value="option" v-model="cartesianQuizAnswer" />
                      <span class="option-text">{{ option }}</span>
                    </label>
                  </div>

                  <button @click="checkCartesianQuiz" class="submit-button">LET'S CHECK</button>

                  <div v-if="cartesianQuizFeedback" class="result-box">
                    <p>{{ cartesianQuizFeedback }}</p>
                  </div>

                  <!-- 🔰 Next Button (goes to Cartesian Page) -->
                  <button @click="cartesianPageActive = true" class="next-button">➡️ Next</button>
                </div>
              </div>

              <!-- ✅ VENN DIAGRAM TOPIC SPECIAL CONTENT -->
              <div v-if="topic.type === 'venn'">

                <img 
                  src="/images/venndiagram.png"  
                  alt="Venn Diagram Example" 
                  class="lesson-image"
                />

                <!-- 🔍 Let's Try-->
                <div class="problem-box">
                  <h5><strong> Problem Solving Using Venn Diagram </strong></h5>
                  
                  <p><strong>QUESTION:</strong>  According to a survey made among 200 students, 140 students like cold drinks, 120 students like milkshakes, and 80 like both. How many students like at least one of the drinks?</p>
                  <p><strong>Solution:</strong></p>
                  <p>➡️ Number of students who like cold drinks = n(A) = 140</p>
                  <p>➡️ Number of students who like milkshakes = n(B) = 120</p>
                  <p>➡️ Number of students who like both = n(A ∩ B) = 80</p>
                  <p>➡️ Number of students who like at least one of the drinks = n(A ∪ B) = n(A) + n(B) – n(A ∩ B)</p>
                  <p>= 140 + 120 – 80</p>
                  
                  <input 
                    v-model="vennAnswer" 
                    placeholder="Type your answer here" 
                    class="answer-input"
                  />

                  <button @click="checkVennAnswer" class="submit-button">LET'S CHECK</button>

                  <div v-if="vennFeedback" class="result-box">
                    <p>{{ vennFeedback }}</p>
                    <img 
                      v-if="vennFeedback === '✅ Correct! The number of students who like at least one of the drinks is 180.'" 
                      src="/images/excercise.png" 
                      alt="Venn Diagram Solution" 
                      class="lesson-image"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- ✅ Union NEXT PAGE (IMAGE DISPLAY) -->
        <div v-else-if="unionPageActive" class="content-box">
          <h5><strong>📘 Union - Venn diagram Representation</strong></h5>
          <div class="definition-box">
            <p><strong>Shaded region represents A U B:</strong></p>
          </div>

          <!-- IMAGE HERE -->
          <img 
            src="/images/setunion.png"  
            alt="Union of Sets Diagram" 
            class="lesson-image"
          />

          <!-- 🔙 Back button -->
          <button @click="unionPageActive = false; selectedTopic = null;" class="next-button">⬅️ Back to Lesson</button>
        </div>

        <!-- ✅ Intersection NEXT PAGE (IMAGE DISPLAY) -->
        <div v-else-if="intersectionPageActive" class="content-box">
          <h5><strong>📘 Intersection - Venn diagram Representation</strong></h5>
          <div class="definition-box">
            <p><strong>Shaded region represents A ∩ B :</strong></p>
          </div>

          <!-- IMAGE HERE -->
          <img 
            src="/images/intersection.png"  
            alt="Intersection of Sets Diagram" 
            class="lesson-image"
          />

          <!-- 🔙 Back button -->
          <button @click="intersectionPageActive = false; selectedTopic = null;" class="next-button">⬅️ Back to Lesson</button>
        </div>

        <!-- ✅ Set Difference NEXT PAGE (IMAGE DISPLAY) -->
        <div v-else-if="differencePageActive" class="content-box">
          <h5><strong>📘 Set Difference - Venn diagram Representation</strong></h5>
          <div class="definition-box">
            <p><strong> Shaded region represents A - B :</strong></p>
          </div>

          <!-- IMAGE HERE -->
          <img 
            src="/images/difference.jpg"  
            alt="Set Difference of Sets Diagram" 
            class="lesson-image"
          />

          <!-- 🔙 Back button -->
          <button @click="differencePageActive = false; selectedTopic = null;" class="next-button">⬅️ Back to Lesson</button>
        </div>

        <!-- ✅ Set Complement NEXT PAGE (IMAGE DISPLAY) -->
        <div v-else-if="complementPageActive" class="content-box">
          <h5><strong>📘 Set Complement - Visual Representation </strong></h5>
          <div class="definition-box">
            <p><strong>Here's how Set Complement looks like:</strong></p>
          </div>

          <!-- IMAGE HERE -->
          <img 
            src="/images/Complement.png"  
            alt="Set Complement Diagram" 
            class="lesson-image"
          />

          <!-- 🔙 Back button -->
          <button @click="complementPageActive = false; selectedTopic = null;" class="next-button">⬅️ Back to Lesson</button>
        </div>

        <!-- ✅ Cartesian Product NEXT PAGE (IMAGE DISPLAY) -->
        <div v-else-if="cartesianPageActive" class="content-box">
          <h5><strong>📘 Cartesian Product - Visual Representation</strong></h5>
          <div class="definition-box">
            <p><strong>Here's how Cartesian Product of Sets looks like:</strong></p>
          </div>

          <!-- IMAGE HERE -->
          <img 
            src="/images/cartesian product.png"  
            alt="Cartesian Product Diagram" 
            class="lesson-image"
          />

          <!-- 🔙 Back button -->
          <button @click="cartesianPageActive = false; selectedTopic = null;" class="next-button">⬅️ Back to Lesson</button>
        </div>

        <!-- ✅ Venn Diagram NEXT PAGE (IMAGE DISPLAY) -->
        <div v-else-if="vennPageActive" class="content-box">
          <h4>📘 Representation of Sets using Venn Diagram - Visual Representation</h4>
          <div class="definition-box">
            <p><strong>Here's how Representation of Sets using Venn Diagram looks like:</strong></p>
          </div>

          <!-- IMAGE HERE -->
          <img 
            src="/images/excercise.png"  
            alt="Venn Diagram Representation" 
            class="lesson-image"
          />

          <!-- 🔙 Back button -->
          <button @click="vennPageActive = false; selectedTopic = null;" class="next-button">⬅️ Back to Lesson</button>
        </div>
      </div>

      <!-- 🔰 ADDED: Score Modal -->
      <div v-if="showScoreModal" class="score-modal">
        <div class="modal-content">
          <h4> Your Mastery Score</h4>
          
          <div class="score-breakdown">
            <div class="score-summary">
              <h4>Overall Score: {{ totalMasteryScore }}/{{ totalMasteryQuizzes }}</h4>
              <p v-if="totalMasteryScore === totalMasteryQuizzes">
                🎉 Excellent! You mastered all quizzes!
              </p>
              <p v-else-if="totalMasteryScore >= Math.ceil(totalMasteryQuizzes / 2)">
                👍 Good job! You've grasped most concepts.
              </p>
              <p v-else>
                💡 Keep practicing! Review the lessons.
              </p>
            </div>

            <!-- Optional: Detailed breakdown -->
            <div class="detailed-scores" v-if="showDetailedScores">
              <h5>Quiz Breakdown:</h5>
              <div class="quiz-list">
                <div v-for="(score, index) in masteryScores" :key="index" 
                     class="quiz-item">
                  <span>Quiz {{ index + 1 }}:</span>
                  <span :class="score === 1 ? 'correct' : 'incorrect'">
                    {{ score === 1 ? '✓ Correct' : '✗ Not yet correct' }}
                  </span>
                </div>
              </div>
            </div>
            
            <button @click="toggleDetailedScores" class="detail-button">
              {{ showDetailedScores ? 'Hide Details' : 'Show Details' }}
            </button>
          </div>

          <div class="modal-actions">
            <button @click="closeScoreModal" class="close-button">
              Close
            </button>
            <button @click="saveAndContinue" class="continue-button">
              Save & Continue
            </button>
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
      // NEW: Flag to track if pre-test was taken in this session
      hasTakenPreTestInSession: false,
      preTestQuestions: [
        { question: "Which of the following is a union of {1, 2} and {2,3}?", options: ["{1,2,3}", "{2}", "{1,3}", "{1}"], answer: "{1,2,3}", explanation: "The union includes all unique elements from both sets: 1, 2 from first, and 3 from second." },
        { question: "What is the intersection of {1,2,3} and {2,3,4}?", options: ["{2,3}", "{1,4}", "{1,2,3,4}", "{1}"], answer: "{2,3}", explanation: "The intersection includes only the common elements: 2 and 3." },
        { question: "How many subsets does the set {a, b} have?", options: ["2", "3", "4", "1"], answer: "4", explanation: "A set with n elements has 2^n subsets. For n=2, 2^2=4 subsets: {}, {a}, {b}, {a,b}." },
        { question: "What is the set difference A - B where A = {a, b, c} and B = {b, d}?", options: ["{a, c}", "{b}", "{a, b, c, d}", "{d}"], answer: "{a, c}", explanation: "Set difference includes elements in A not in B: a and c are in A but not in B." },
        { question: "Find A' where U = {1, 2, 3, 4} and A = {1, 3}", options: ["{2, 4}", "{1, 3}", "{1, 2, 3, 4}", "{}"], answer: "{2, 4}", explanation: "The complement A' includes elements in U not in A: 2 and 4." },
        { question: "What is the Cartesian product of {a} and {1, 2}?", options: ["{(a,1), (a,2)}", "{(a,1), (a,2), (1,2)}", "{a, 1, 2}", "{(1,2)}"], answer: "{(a,1), (a,2)}", explanation: "Cartesian product pairs each element of first set with each of second: a with 1, a with 2." },
        { question: "In a Venn diagram, what does the shaded region of A ∪ B represent?", options: ["All elements in A or B", "Only elements in A", "Elements common to A and B", "Elements outside both"], answer: "All elements in A or B", explanation: "The union A ∪ B represents all elements that are in A, in B, or in both." },
        { question: "Find the intersection of {x, y, z} and {y, z, w}?", options: ["{y, z}", "{x, w}", "{x, y, z, w}", "{x}"], answer: "{y, z}", explanation: "Common elements are y and z." },
        { question: "What is the union of {p, q} and {q, r, s}?", options: ["{p, q, r, s}", "{q}", "{p, r, s}", "{r, s}"], answer: "{p, q, r, s}", explanation: "Union includes all unique elements: p, q, r, s." },
        { question: "If U = {a, b, c, d, e} and A = {b, d}, what is A'?", options: ["{a, c, e}", "{b, d}", "{a, b, c, d, e}", "{e}"], answer: "{a, c, e}", explanation: "Complement includes elements in U not in A: a, c, e." }
      ],

      selectedTopic: null,
      showSolution: Array(6).fill({ main: false, alt: false }),
      revealedSteps: Array(6).fill({ main: [], alt: [] }),
      viewedTopics: new Set(),

      // ✅ Union Data
      unionAnswer: "",
      unionFeedback: "",
      unionSteps: [
        "Write the sets: A = {1, 3}, B = {1, 4}.",
        "List all elements from both sets: 1, 3, 1, 4.",
        "Remove duplicates so each element appears once.",
        "Final Answer: A ∪ B = {1, 3, 4}."
      ],
      unionRevealedSteps: [],
      showUnionGuide: false,
      unionQuiz: { options: ["{a,b,c,d,e}", "{b,c}", "{a,d,e}", "{b,c,d}"], answer: "{a,b,c,d,e}" },
      unionQuizAnswer: "",
      unionQuizFeedback: "",
      unionPageActive: false,

      // ✅ Intersection Data
      intersectionAnswer: "",
      intersectionFeedback: "",
      intersectionSteps: [
        "Write the sets: A = {1, 2}, B = {2, 4}.",
        "List the elements of set A: {1, 2}.",
        "List the elements of set B: {2, 4}.",
        "Identify common elements in both sets: 2.",
        "Final Answer: A ∩ B = {2}."
      ],
      intersectionRevealedSteps: [],
      showIntersectionGuide: false,
      intersectionQuiz: { options: ["{a,i,d}", "{m,s}", "{a,i,d,s}", "{m,d}"], answer: "{a,i,d}" },
      intersectionQuizAnswer: "",
      intersectionQuizFeedback: "",
      intersectionPageActive: false,

      // ✅ Set Difference Data
      differenceAnswer: "",
      differenceFeedback: "",
      differenceSteps: [
        "Write the sets: A = {2, 3, 4}, B = {4, 5, 6}.",
        "Look at the first item in A: 2. Is 2 in B? No → keep 2.",
        "Next item in A: 3. Is 3 in B? No → keep 3.",
        "Next item in A: 4. Is 4 in B? Yes → remove 4.",
        "List what you kept: 2, 3.",
        "Final Answer: A - B = {2, 3}."
      ],
      differenceRevealedSteps: [],
      showDifferenceGuide: false,
      differenceQuiz: { options: ["{10,20}", "{30,40}", "{10,20,30,40}", "{50,60}"], answer: "{10,20}" },
      differenceQuizAnswer: "",
      differenceQuizFeedback: "",
      differencePageActive: false,

      // ✅ Set Complement Data
      complementAnswer: "",
      complementFeedback: "",
      complementSteps: [
        "Write the universal set and the set: U = {1,2,3,4,5,6,7,8,9,10}, A = {2,4,6,8}.",
        "List the elements of the universal set U: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
        "List the elements of set A: 2, 4, 6, 8.",
        "Identify elements in U that are not in A: 1, 3, 5, 7, 9, 10.",
        "Final Answer: A' = {1,3,5,7,9,10}."
      ],
      complementRevealedSteps: [],
      showComplementGuide: false,
      complementQuiz: { options: ["{4,5}", "{1,2,3}", "{1,2,3,4,5}", "{1}"], answer: "{4,5}" },
      complementQuizAnswer: "",
      complementQuizFeedback: "",
      complementPageActive: false,

      // ✅ Cartesian Product Data
      cartesianAnswer: "",
      cartesianFeedback: "",
      cartesianSteps: [
        "Write the sets: A = {1,3}, B = {1,3}.",
        "Take the first element of  A (which is 1). Pair it with every element of B.(1,1) (1,3).",
        "Take the next element of  A (which is 3). Pair it with every element of  B (3,1) (3,3).",
        "Put all ordered pairs together:A×B = {(1,1),(1,3),(3,1),(3,3)}.",
        "Final Answer: A × B = {(1, 1), (1, 3), (3, 1), (3, 3)}."
      ],
      cartesianRevealedSteps: [],
      showCartesianGuide: false,
      cartesianQuiz: { options: ["{(1,a), (1,b), (2,a), (2,b)}", "{(1,2), (a,b)}", "{(1,a), (2,b)}", "{(1,1), (2,2)}"], answer: "{(1,a), (1,b), (2,a), (2,b)}" },
      cartesianQuizAnswer: "",
      cartesianQuizFeedback: "",
      cartesianPageActive: false,

      // ✅ Venn Diagram Data
      vennAnswer: "",
      vennFeedback: "",
      showVennGuide: false,
      vennQuiz: { options: ["The entire diagram", "Only the overlapping region", "Only the left circle", "Outside the circles"], answer: "The entire diagram" },
      vennQuizAnswer: "",
      vennQuizFeedback: "",
      vennPageActive: false,

      topics: [
        { title: "UNION OF SETS", type: "union", content: "The <strong>Union of Sets</strong> is denoted as A U B,<br></br> lists the elements in set A and set B or the elements in both set A and set B." },
        { title: "INTERSECTION OF SETS", type: "intersection", content: "The <strong>Intersection of Sets</strong> is denoted by A ∩ B <br></br> lists the elements that are common to both set A and set B. " },
        { title: "SET DIFFERENCE", type: "difference", content: "The <strong>Set Difference</strong> which is denoted by A - B,<br></br> lists the elements in set A that are not present in set B." },
        { title: "SET COMPLEMENT", type: "complement", content: "The <strong>Set Complement</strong> is denoted by A', <br></br> is the set of all elements in the universal set that are not present in set A.<br></br> In other words, A' is denoted as U - A, which is the difference in the elements of the universal set and set A." },
        { title: "CARTESIAN PRODUCT", type: "cartesian", content: "The <strong>Cartesian Product of two sets</strong>  is denoted by A × B, <br></br>is the product of two non-empty sets, wherein ordered pairs of elements are obtained." },
        { title: "VENN DIAGRAM REPRESENTATION", type: "venn", content: "<strong>Venn Diagram </strong> is a pictorial representation of sets, with each set represented as a circle.<br></br> The Venn diagram represents how the given sets are related to each other.." }
      ],

      // 🔰 ADDED: Score tracking data
      showScoreModal: false,
      showDetailedScores: false,
      masteryScores: new Array(12).fill(0), // 12 quizzes total
      attempts: new Array(12).fill(0),
      // Track which quizzes have been attempted
      quizAttempted: new Array(12).fill(false)
    };
  },
  computed: {
    allPreTestAnswersFilled() {
      return this.userAnswers.length === this.preTestQuestions.length && this.userAnswers.every(answer => answer !== undefined && answer !== '');
    },
    totalMasteryScore() {
      return this.masteryScores.reduce((sum, score) => sum + score, 0);
    },
    totalMasteryQuizzes() {
      return this.masteryScores.length;
    },
    masteryPercentage() {
      return Math.round((this.totalMasteryScore / this.totalMasteryQuizzes) * 100);
    }
  },
  created() {
    // ✅ Shuffle questions on load
    this.preTestQuestions = this.shuffleArray(this.preTestQuestions);
    // ✅ NEW: Check if user has already taken pre-test in this session
    this.checkPreTestSessionStatus();
  },
  methods: {
    // ✅ NEW: Check sessionStorage for pre-test completion
    checkPreTestSessionStatus() {
      const hasTakenPreTest = sessionStorage.getItem('operationsOnSets_preTest_completed');
      if (hasTakenPreTest === 'true') {
        this.hasTakenPreTestInSession = true;
      }
    },
    
    // ✅ UPDATED: Save Pre-Test Score to localStorage for ProgressPage AND sessionStorage
    submitPreTest() {
      this.score = this.preTestQuestions.reduce((acc, q, i) => acc + (this.userAnswers[i] === q.answer ? 1 : 0), 0);
      this.showPreTestResult = true;
      // Load existing assessment scores from localStorage
      let existingAssessments = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
      // Save/update pre-test score (key: 'operationsPreTest' for specificity; value: raw score as string)
      existingAssessments['operationsPreTest'] = this.score.toString();
      localStorage.setItem('assessmentScores', JSON.stringify(existingAssessments));
    },
    
    // ✅ NEW: Complete pre-test and mark as taken in session
    completePreTest() {
      // Mark pre-test as completed in sessionStorage
      sessionStorage.setItem('operationsOnSets_preTest_completed', 'true');
      this.hasTakenPreTestInSession = true;
      this.preTestCompleted = true;
      this.showPreTestResult = false;
    },
    
    // ✅ NEW: Proceed directly to lesson if pre-test already taken
    proceedToLesson() {
      this.preTestCompleted = true;
    },
    
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    toggleTopic(index) {
      this.selectedTopic = this.selectedTopic === index ? null : index;
      this.showSolution = this.showSolution.map(() => ({ main: false, alt: false }));
      this.revealedSteps = this.revealedSteps.map(() => ({ main: [], alt: [] }));
      this.viewedTopics.add(index);
      this.unionRevealedSteps = [];
      this.showUnionGuide = false;
      this.intersectionRevealedSteps = [];
      this.showIntersectionGuide = false;
      this.differenceRevealedSteps = [];
      this.showDifferenceGuide = false;
      this.complementRevealedSteps = [];
      this.showComplementGuide = false;
      this.cartesianRevealedSteps = [];
      this.showCartesianGuide = false;
      this.showVennGuide = false;
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
    checkUnionAnswer() {
      const correctAnswers = ["{1,2,3,4}", "{ 1,2,3,4 }", "{1, 2,3,4}", "{1, 2, 3, 4}", "{ 1, 2, 3, 4 }"];
      const isCorrect = correctAnswers.includes(this.unionAnswer.trim());
      this.unionFeedback = isCorrect ? "✅ Correct! A ∪ B = {1,2,3,4}." : "❌ Try Again. Remember to combine all unique elements.";
      
      // 🔰 Update score for Quiz 1 (index 0)
      if (isCorrect && this.masteryScores[0] === 0) {
        this.masteryScores[0] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    toggleUnionStep(stepIndex) {
      if (stepIndex === 0 || this.unionRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.unionRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.unionRevealedSteps.push(stepIndex) : this.unionRevealedSteps.splice(pos, 1);
      }
    },
    checkUnionQuiz() {
      if (!this.unionQuizAnswer) {
        this.unionQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.unionQuizAnswer === this.unionQuiz.answer;
      this.unionQuizFeedback = isCorrect ? "✅ Correct! That is the correct union." : "❌ Incorrect. Review union carefully.";
      
      // 🔰 Update score for Quiz 2 (index 1)
      if (isCorrect && this.masteryScores[1] === 0) {
        this.masteryScores[1] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    checkIntersectionAnswer() {
      const correctAnswers = ["{e,o}", "{ e,o }", "{e, o}", "{ e, o }"];
      const isCorrect = correctAnswers.includes(this.intersectionAnswer.trim());
      this.intersectionFeedback = isCorrect ? "✅ Correct! V ∩ R = {e,o}." : "❌ Try Again. Remember to include only common elements.";
      
      // 🔰 Update score for Quiz 3 (index 2)
      if (isCorrect && this.masteryScores[2] === 0) {
        this.masteryScores[2] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    toggleIntersectionStep(stepIndex) {
      if (stepIndex === 0 || this.intersectionRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.intersectionRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.intersectionRevealedSteps.push(stepIndex) : this.intersectionRevealedSteps.splice(pos, 1);
      }
    },
    checkIntersectionQuiz() {
      const correctAnswers = ["{a,i,d}", "{ a,i,d }", "{a, i, d}", "{ a, i, d }"];
      const isCorrect = correctAnswers.includes(this.intersectionQuizAnswer.trim());
      this.intersectionQuizFeedback = isCorrect ? "✅ Correct! V ∩ S = {a,i,d}." : "❌ Try Again. Remember to include only common elements.";
      
      // 🔰 Update score for Quiz 4 (index 3)
      if (isCorrect && this.masteryScores[3] === 0) {
        this.masteryScores[3] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    checkDifferenceAnswer() {
      const correctAnswers = ["{s,w,m}", "{ s,w,m }", "{s, w, m}", "{ s, w, m }"];
      const isCorrect = correctAnswers.includes(this.differenceAnswer.trim());
      this.differenceFeedback = isCorrect ? "✅ Correct! H - K = {s,w,m}." : "❌ Try Again. Remember to include only elements in H that are not in K.";
      
      // 🔰 Update score for Quiz 5 (index 4)
      if (isCorrect && this.masteryScores[4] === 0) {
        this.masteryScores[4] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    toggleDifferenceStep(stepIndex) {
      if (stepIndex === 0 || this.differenceRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.differenceRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.differenceRevealedSteps.push(stepIndex) : this.differenceRevealedSteps.splice(pos, 1);
      }
    },
    checkDifferenceQuiz() {
      const correctAnswers = ["{10,20}", "{ 10,20 }", "{10, 20}", "{ 10, 20 }"];
      const isCorrect = correctAnswers.includes(this.differenceQuizAnswer.trim());
      this.differenceQuizFeedback = isCorrect ? "✅ Correct! A - B = {10,20}." : "❌ Try Again. Remember to include only elements in A that are not in B.";
      
      // 🔰 Update score for Quiz 6 (index 5)
      if (isCorrect && this.masteryScores[5] === 0) {
        this.masteryScores[5] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    checkComplementAnswer() {
      const correctAnswers = ["{blue,yellow,white}", "{ blue,yellow,white }", "{blue, yellow, white}", "{ blue, yellow, white }"];
      const isCorrect = correctAnswers.includes(this.complementAnswer.trim());
      this.complementFeedback = isCorrect ? "✅ Correct! A' = {blue,yellow,white}." : "❌ Try Again. Remember to include only elements in the universal set U that are not in A.";
      
      // 🔰 Update score for Quiz 7 (index 6)
      if (isCorrect && this.masteryScores[6] === 0) {
        this.masteryScores[6] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    toggleComplementStep(stepIndex) {
      if (stepIndex === 0 || this.complementRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.complementRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.complementRevealedSteps.push(stepIndex) : this.complementRevealedSteps.splice(pos, 1);
      }
    },
    checkComplementQuiz() {
      if (!this.complementQuizAnswer) {
        this.complementQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.complementQuizAnswer === this.complementQuiz.answer;
      this.complementQuizFeedback = isCorrect ? "✅ Correct! That is the correct set complement." : "❌ Incorrect. Review set complement carefully.";
      
      // 🔰 Update score for Quiz 8 (index 7)
      if (isCorrect && this.masteryScores[7] === 0) {
        this.masteryScores[7] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    checkCartesianAnswer() {
      const correctAnswers = ["{(x,1), (x,2), (x,3), (y,1), (y,2), (y,3)}", "{(x,1),(x,2),(x,3),(y,1),(y,2),(y,3)}", "{ (x,1), (x,2), (x,3), (y,1), (y,2), (y,3) }", "{(x, 1), (x, 2), (x, 3), (y, 1), (y, 2), (y, 3)}"];
      const isCorrect = correctAnswers.includes(this.cartesianAnswer.trim());
      this.cartesianFeedback = isCorrect ? "✅ Correct! A × B = {(x,1), (x,2), (x,3), (y,1), (y,2), (y,3)}." : "❌ Try Again. Remember to include all ordered pairs where the first element is from A and the second is from B.";
      
      // 🔰 Update score for Quiz 9 (index 8)
      if (isCorrect && this.masteryScores[8] === 0) {
        this.masteryScores[8] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    toggleCartesianStep(stepIndex) {
      if (stepIndex === 0 || this.cartesianRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.cartesianRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.cartesianRevealedSteps.push(stepIndex) : this.cartesianRevealedSteps.splice(pos, 1);
      }
    },
    checkCartesianQuiz() {
      if (!this.cartesianQuizAnswer) {
        this.cartesianQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.cartesianQuizAnswer === this.cartesianQuiz.answer;
      this.cartesianQuizFeedback = isCorrect ? "✅ Correct! That is the correct Cartesian product." : "❌ Incorrect. Review Cartesian product carefully.";
      
      // 🔰 Update score for Quiz 10 (index 9)
      if (isCorrect && this.masteryScores[9] === 0) {
        this.masteryScores[9] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    checkVennAnswer() {
      const correctAnswers = ["180"];
      const isCorrect = correctAnswers.includes(this.vennAnswer.trim());
      this.vennFeedback = isCorrect ? "✅ Correct! The number of students who like at least one of the drinks is 180." : "❌ Try Again. Use the formula n(A ∪ B) = n(A) + n(B) – n(A ∩ B) to find the answer.";
      
      // 🔰 Update score for Quiz 11 (index 10)
      if (isCorrect && this.masteryScores[10] === 0) {
        this.masteryScores[10] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    checkVennQuiz() {
      if (!this.vennQuizAnswer) {
        this.vennQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.vennQuizAnswer === this.vennQuiz.answer;
      this.vennQuizFeedback = isCorrect ? "✅ Correct! The union is the entire diagram." : "❌ Incorrect. Review Venn diagram regions carefully.";
      
      // 🔰 Update score for Quiz 12 (index 11)
      if (isCorrect && this.masteryScores[11] === 0) {
        this.masteryScores[11] = 1;
      }
      // ✅ Save mastery score after update
      this.saveMasteryScore();
    },
    
    // 🔰 ADDED: Score modal methods
    showMasteryScore() {
      this.showScoreModal = true;
      // Optional: Save to localStorage when viewing score
      this.saveMasteryScore();
    },
    
    closeScoreModal() {
      this.showScoreModal = false;
      this.showDetailedScores = false;
    },
    
    toggleDetailedScores() {
      this.showDetailedScores = !this.showDetailedScores;
    },
    
    // ✅ UPDATED: Save Mastery Score to localStorage for ProgressPage
    saveMasteryScore() {
      // Load existing assessment scores from localStorage
      let existingAssessments = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
      // Save/update mastery score (key: 'operationsOnSetsMastery' for specificity; value: raw score as string)
      existingAssessments['operationsOnSetsMastery'] = this.totalMasteryScore.toString();
      localStorage.setItem('assessmentScores', JSON.stringify(existingAssessments));
    },
    
    saveAndContinue() {
      this.saveMasteryScore();
      this.closeScoreModal();
      // Optional: Navigate to next section or post-test
    }
  }
};
</script>
```

<style scoped>
.lesson-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 10px;
  box-sizing: border-box;
  background: url('/images/bac.webp') no-repeat center center;
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
  background: #eeede9;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
  border: 1px solid #efd56d;
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
.submit-button, .solve-button, .next-button, .step-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 40px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin: 3px;
}
.post-test-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 20px 40px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  margin: 10px;
}
.submit-button:hover, .solve-button:hover, .next-button:hover, .step-button:hover, .post-test-button:hover {
  background: #4CAF50;
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
  background: #eeede9;
  padding: 10px;
  border-radius: 8px;
  text-align: left;
  font-size: 14px;
  margin-bottom: 8px;
  border: 1px solid #efd56d; 
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

.clickable-title {
  cursor: pointer;
  font-size: 16px;
}

.posttest-box {
  background: rgba(217, 230, 239, 0.73);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  text-align: left;
}

/* 🔰 ADDED: Score Button and Modal Styles */
.score-button-container {
  margin: 15px 0;
  text-align: center;
}

.score-button {
  background: linear-gradient(135deg, #0f821e 0%, #06592b 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  width: auto;
  display: inline-block;
}

.score-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Score Modal */
.score-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  overflow-y: auto;
}

.score-summary {
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.detailed-scores {
  margin-top: 15px;
  text-align: left;
}

.quiz-list {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
}

.quiz-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
}

.quiz-item:last-child {
  border-bottom: none;
}

.correct {
  color: #28a745;
  font-weight: bold;
}

.incorrect {
  color: #dc3545;
  font-weight: bold;
}

.detail-button {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
}

.detail-button:hover {
  background: #5a6268;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

.close-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
}

.continue-button {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
}

.close-button:hover {
  background: #c82333;
}

.continue-button:hover {
  background: #218838;
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
  .post-test-button {
    padding: 15px 30px;
    font-size: 14px;
  }
  .pretest-container .submit-button {
    width: 100%;
    padding: 15px;
    font-size: 16px;
  }
  .score-button {
    padding: 10px 20px;
    font-size: 14px;
  }
  .modal-content {
    padding: 15px;
    width: 95%;
  }
  .modal-actions {
    flex-direction: column;
  }
}
</style>