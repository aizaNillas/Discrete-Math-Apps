<template>
  <div class="lesson-container">

    <!-- ✅ Pre-Test Section -->
    <div v-if="!preTestCompleted" class="pretest-container">
      <h3 class="title">📝 Pre-Test:	Graph Theory: Fundamentals and Basic Properties</h3>
      <div v-for="(question, index) in preTestQuestions" :key="index" class="pretest-box">
        <p><strong>{{ index + 1 }}. {{ question.question }}</strong></p>

        <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-box">
          <label class="option-label">
            <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
            <input type="radio" :name="'q' + index" :value="option" v-model="userAnswers[index]" />
            <span class="option-text">{{ option }}</span>
          </label>
        </div>
      </div>

      <button @click="submitPreTest" class="submit-button">✅ Submit Pre-Test</button>

      <div v-if="showPreTestResult" class="result-box">
        <h4>Your Score: {{ score }}/{{ preTestQuestions.length }}</h4>
        <p v-if="score === preTestQuestions.length">🎉 Excellent! You mastered this topic.</p>
        <p v-else-if="score >= Math.ceil(preTestQuestions.length/2)">👍 Good job! Let's review some concepts.</p>
        <p v-else>💡 Don’t worry! The lesson will help you understand better.</p>
        <button @click="preTestCompleted = true" class="next-button">➡️ Continue to Lesson</button>
      </div>
    </div>

    <!-- ✅ Lesson AFTER Pre-Test -->
    <div v-else-if="!showPostTest">
      <h5 class="title">📚 Graph Theory: Fundamentals and Basic Properties</h5>

      <!-- Normal Lesson View -->
      <div v-if="!subsetPageActive">
        <div v-for="(topic, index) in topics" :key="index" class="content-box">
          <h4 @click="toggleTopic(index)" class="clickable-title">
            {{ topic.title }} {{ selectedTopic === index ? "⬇️" : "➡️" }}
          </h4>

          <div v-if="selectedTopic === index">
            <p v-html="formatContent(topic.content)"></p>

            <!-- ✅ SUBSET TOPIC SPECIAL CONTENT -->
            <div v-if="topic.type === 'subset'">

              <!-- 🔰 Toggle button for Step-by-step guide -->
              <button @click="showSubsetGuide = !showSubsetGuide" class="solve-button">
                {{ showSubsetGuide ? "🔽 Hide Step-by-step Guide" : "📘 Show Step-by-step Guide" }}
              </button>

              <!-- 🔰 Step-by-step card ABOVE Try This -->
              <div v-if="showSubsetGuide" class="guide-box">
                <h4>📘 Step-by-step Guide</h4>
                <p><strong>Goal:</strong> Provide a subset of <em>B = {1,2,3,4}</em> where <em>A = {1,2}</em>.</p>

                <p v-for="(step, sIdx) in subsetSteps" :key="sIdx">
                  <button @click="toggleSubsetStep(sIdx)" class="step-button">
                    Step {{ sIdx + 1 }}
                  </button>
                  <span v-if="subsetRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                </p>
              </div>

              <!-- 🔍 Try This Card -->
              <div class="problem-box">
                <h4>🔍 Try This</h4>
                <p><strong>Provide a subset of B = {1, 2, 3, 4} where A = {1, 2}</strong></p>

                <input 
                  v-model="subsetAnswer" 
                  placeholder="Type your answer here" 
                  class="answer-input"
                />

                <button @click="checkSubsetAnswer" class="submit-button">CHECK ANSWER</button>

                <div v-if="subsetFeedback" class="result-box">
                  <p>{{ subsetFeedback }}</p>
                </div>
              </div>

              <!-- 🔰 Quick Check Card -->
              <div class="problem-box">
                <h4>📝 Quick Check</h4>
                <p><strong>Which of the following is a subset of B = {1,2,3,4}?</strong></p>

                <div v-for="(option, idx) in subsetQuiz.options" :key="idx" class="option-box">
                  <label class="option-label">
                    <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                    <input type="radio" name="subsetQuiz" :value="option" v-model="subsetQuizAnswer" />
                    <span class="option-text">{{ option }}</span>
                  </label>
                </div>

                <button @click="checkSubsetQuiz" class="submit-button">SUBMIT ANSWER</button>

                <div v-if="subsetQuizFeedback" class="result-box">
                  <p>{{ subsetQuizFeedback }}</p>
                </div>

                <!-- 🔰 Next Button (goes to Subset Page) -->
                <button @click="subsetPageActive = true" class="next-button">➡️ Next</button>
              </div>
            </div>

            <!-- ✅ Other Topics (Singleton, Power Set) -->
            <div v-else>
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
            </div>

          </div>
        </div>
      </div>

      <!-- ✅ Subset NEXT PAGE -->
      <div v-else class="content-box">
        <h4>📘 Subset - Additional Practice</h4>
        <p><strong>Provide another subset of B = {1,2,3,4}.</strong></p>

        <input 
          v-model="nextCardAnswer" 
          placeholder="Type your answer here" 
          class="answer-input"
        />

        <button @click="checkNextCardAnswer" class="submit-button">CHECK ANSWER</button>

        <div v-if="nextCardFeedback" class="result-box">
          <p>{{ nextCardFeedback }}</p>
        </div>

        <!-- 🔙 Back button -->
        <button @click="subsetPageActive = false" class="next-button">⬅️ Back</button>

        <!-- 🔜 NEW NEXT BUTTON -->
        <button @click="goToNextLesson" class="next-button">➡️ Next</button>
      </div>
    </div>

    <!-- ✅ POST-TEST SECTION -->
    <div v-else class="posttest-container">
      <h3 class="title">📝 Post-Test: Set Theory</h3>

      <div v-for="(question, index) in postTestQuestions" :key="index" class="pretest-box">
        <p><strong>{{ index + 1 }}. {{ question.question }}</strong></p>

        <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-box">
          <label class="option-label">
            <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
            <input type="radio" :name="'pq' + index" :value="option" v-model="postUserAnswers[index]" />
            <span class="option-text">{{ option }}</span>
          </label>
        </div>
      </div>

      <button @click="submitPostTest" class="submit-button">✅ Submit Post-Test</button>

      <div v-if="showPostTestResult" class="result-box">
        <h4>Your Score: {{ postScore }}/{{ postTestQuestions.length }}</h4>
        <p v-if="postScore === postTestQuestions.length">🎉 Excellent! You mastered this topic.</p>
        <p v-else-if="postScore >= Math.ceil(postTestQuestions.length/2)">👍 Good job! You improved a lot!</p>
        <p v-else>💡 Keep practicing! Review the lesson again if needed.</p>

        <!-- 🔙 Back to Lesson Button -->
        <button @click="backToLesson" class="next-button">⬅️ Back to Lesson</button>
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
        { question: "Which of the following is a subset of {1, 2, 3}?", options: ["{1,2}", "{4}", "{5,6}"], answer: "{1,2}" },
        { question: "What is a singleton set?", options: ["A set with one element", "A set with two elements", "An empty set"], answer: "A set with one element" },
        { question: "How many subsets does the set {a, b} have?", options: ["2", "3", "4"], answer: "4" }
      ],

      selectedTopic: null,
      showSolution: Array(3).fill({ main: false, alt: false }),
      revealedSteps: Array(3).fill({ main: [], alt: [] }),
      viewedTopics: new Set(),

      subsetAnswer: "",
      subsetFeedback: "",
      subsetSteps: [
        "Write the sets: B = {1,2,3,4} and A = {1,2}.",
        "Check if every element of A is in B: 1 ∈ B and 2 ∈ B.",
        "Therefore, A is a subset of B (A ⊆ B).",
        "A valid subset you can type is {1,2}."
      ],
      subsetRevealedSteps: [],
      showSubsetGuide: false,
      subsetQuiz: { options: ["{1,2}", "{5}", "{2,6}", "{3,4,5}"], answer: "{1,2}" },
      subsetQuizAnswer: "",
      subsetQuizFeedback: "",
      subsetPageActive: false,
      nextCardAnswer: "",
      nextCardFeedback: "",

      // ✅ POST TEST DATA
      showPostTest: false,
      showPostTestResult: false,
      postUserAnswers: [],
      postScore: 0,
      postTestQuestions: [
        { question: "Which is a singleton set?", options: ["{5}", "{a,b}", "{ }"], answer: "{5}" },
        { question: "Power set of {1} is?", options: ["{{}, {1}}", "{{1}}", "{{}}"], answer: "{{}, {1}}" },
        { question: "Which of the following is a subset of {a,b,c}?", options: ["{a}", "{d}", "{e}"], answer: "{a}" }
      ],

      topics: [
        { title: "Subset", type: "subset", content: "A subset is a set that contains some or all elements of another set.<br><br> A set A is a subset of a set B if all elements of A are also in B." },
        { title: "Singleton Set", content: "A <strong>Singleton Set</strong> is a set that contains exactly one element.", problem: { question: "Identify if A = {5} is a singleton set.", steps: ["List the elements of set A.", "Check the number of elements in A.", "Since A contains only one element (5), it is a singleton set."] }, altProblem: { question: "Determine if B = {a, b} is a singleton set.", steps: ["List the elements of set B.", "Check the number of elements in B.", "Since B contains two elements (a and b).", "Final Answer: A and B is not a singleton set."] } },
        { title: "Power Set", content: "The power set of a set A is the set of all subsets of A, including the empty set and A itself.", problem: { question: "Find the power set of A = {1, 2}.", steps: ["List all possible subsets of A.", "Include the empty set {}.", "Include subsets with one element: {1}, {2}.", "Include the subset with all elements: {1,2}.", "Final Answer: P(A) = {{}, {1}, {2}, {1,2}}."] }, altProblem: { question: "Find the power set of B = {a, b, c}.", steps: ["List all possible subsets of B.", "Include the empty set {}.", "Include subsets with one element: {a}, {b}, {c}.", "Include subsets with two elements: {a,b}, {a,c}, {b,c}.", "Include the subset with all elements: {a,b,c}.", "Power set: P(B) = {{}, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}}."] } }
      ]
    };
  },
  created() {
    // ✅ Shuffle questions on load
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
      const correctAnswers = ["{1,2}", "{ 1,2 }", "{1, 2}"];
      this.subsetFeedback = correctAnswers.includes(this.subsetAnswer.trim()) ? "✅ Correct! A = {1,2} is a subset of B = {1,2,3,4}." : "❌ Try Again. Hint: Include only elements that are inside B.";
    },
    toggleSubsetStep(stepIndex) {
      if (stepIndex === 0 || this.subsetRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.subsetRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.subsetRevealedSteps.push(stepIndex) : this.subsetRevealedSteps.splice(pos, 1);
      }
    },
    checkSubsetQuiz() {
      if (!this.subsetQuizAnswer) {
        this.subsetQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      this.subsetQuizFeedback = this.subsetQuizAnswer === this.subsetQuiz.answer ? "✅ Correct! That is a valid subset." : "❌ Incorrect. Review subsets carefully.";
    },
    checkNextCardAnswer() {
      const correctAnswers = ["{1,3}", "{1, 3}", "{ 1,3 }"];
      this.nextCardFeedback = correctAnswers.includes(this.nextCardAnswer.trim()) ? "✅ Correct! This is a valid subset of B." : "❌ Try Again.";
    },
    goToNextLesson() {
      this.showPostTest = true; // ✅ show Post-Test instead of alert
    },
    submitPostTest() {
      this.postScore = this.postTestQuestions.reduce(
        (acc, q, i) => acc + (this.postUserAnswers[i] === q.answer ? 1 : 0),
        0
      );
      this.showPostTestResult = true;
    },
    backToLesson() {
      this.showPostTest = false; // Hide post-test section to show lesson
      this.showPostTestResult = false; // Reset post-test result
      this.postUserAnswers = []; // Clear post-test answers
      this.postScore = 0; // Reset post-test score
      this.subsetPageActive = false; // Show main lesson page, not subset practice
      this.selectedTopic = null; // Ensure no topic is expanded
    }
  }
};
</script>

<style scoped>
.lesson-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: url('/src/assets/images/bac.webp') no-repeat center center fixed;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  text-align: center;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
}
.title {
  font-size: 33px;
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
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: left;
}
.option-box {
  margin: 6px 0;
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
</style>
