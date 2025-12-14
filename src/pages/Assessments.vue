```vue
<template>
  <div class="q-pa-md">
    <h2 class="text-h5 q-mb-md">Assessments</h2>
    <div class="row q-col-gutter-md">
      <div class="col-6" v-for="(assessment, index) in assessments" :key="index">
        <q-btn :color="assessment.color" :label="assessment.title" class="full-width" @click="selectAssessment(assessment)" />
      </div>
    </div>
    <q-dialog v-model="showQuiz" persistent maximized>
      <q-card>
        <q-card-section class="q-pa-md q-dialog-content">
          <div v-if="selectedAssessment">
            <div v-if="showResults">
              <h3 class="text-h6">{{ selectedAssessment.title }} - Results</h3>
              <p>Your score: {{ calculateScore() }} / {{ calculateTotal() }} ({{ calculatePercentage() }}%)</p>
              <div class="flex justify-center q-mt-md">
                <q-btn color="primary" label="Back to Assessments" @click="selectAssessment(null)" />
              </div>
            </div>
            <div v-else>
              <h3 class="text-h6">{{ selectedAssessment.title }}</h3>
              <p>Question {{ currentQuestion + 1 }} of {{ selectedAssessment.questions.length }}</p>
              <p class="q-mb-md">{{ selectedAssessment.questions[currentQuestion].text }}</p>
              <div v-if="selectedAssessment.questions[currentQuestion].type === 'multiple-choice'">
                <q-list bordered class="q-mx-auto">
                  <q-item v-for="(option, index) in selectedAssessment.questions[currentQuestion].options" :key="index" clickable v-ripple @click="answerQuestion(option)">
                    <q-item-section>{{ String.fromCharCode(65 + index) }}. {{ option }}</q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div v-else-if="selectedAssessment.questions[currentQuestion].type === 'true-false'" class="flex justify-center q-mt-md">
                <q-btn color="positive" label="True" @click="answerQuestion(true)" class="q-mr-sm" />
                <q-btn color="negative" label="False" @click="answerQuestion(false)" />
              </div>
              <div v-else-if="selectedAssessment.questions[currentQuestion].type === 'truth-table'" class="q-mt-md">
                <p>Complete the p {{ selectedAssessment.questions[currentQuestion].operator }} q column:</p>
                <div class="truth-table">
                  <div class="table-header row">
                    <div class="col-4 q-pa-xs">p</div>
                    <div class="col-4 q-pa-xs">q</div>
                    <div class="col-4 q-pa-xs">p {{ selectedAssessment.questions[currentQuestion].operator }} q</div>
                  </div>
                  <div v-for="(row, index) in truthTableData" :key="index" class="table-row row">
                    <div class="col-4 q-pa-xs">{{ row.p }}</div>
                    <div class="col-4 q-pa-xs">{{ row.q }}</div>
                    <div class="col-4 q-pa-xs">
                      <q-input
                        v-model="tempTruthAnswers[index]"
                        dense
                        placeholder="T/F"
                        style="width: 60px;"
                        @keyup.enter="submitTruthTable"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex justify-center q-mt-md">
                  <q-btn color="primary" label="Submit" @click="submitTruthTable" />
                </div>
              </div>
              <div v-if="showCorrectMsg" class="flex justify-center q-mt-md">
                <q-card class="message-card correct-card">
                  <q-card-section class="text-center">
                    Good job, you got {{ calculateScore() }} point{{ calculateScore() !== 1 ? 's' : '' }}!
                  </q-card-section>
                </q-card>
              </div>
              <div v-if="showIncorrectMsg" class="flex justify-center q-mt-md">
                <q-card class="message-card incorrect-card">
                  <q-card-section class="text-center">
                    <span v-if="!isTruthTable">Incorrect! The correct answer is {{ currentCorrectAnswer }}</span>
                    <span v-else>{{ currentCorrectAnswer }}</span>
                  </q-card-section>
                </q-card>
              </div>
             </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { defineComponent, ref, watch, computed } from 'vue';
const truthTableData = [
  { p: 'T', q: 'T' },
  { p: 'T', q: 'F' },
  { p: 'F', q: 'T' },
  { p: 'F', q: 'F' }
];
const assessments = [
  { id: 1, title: 'Function', color: 'primary', questions: [
      { type: 'multiple-choice', text: 'What do you call a relation such that no two ordered pairs have the same first element?', options: ['Ordered pair', 'function', 'notation', 'binary operations'], correctAnswer: 'function' },
      { type: 'multiple-choice', text: 'Evaluate f(x) * g(x); f(x)= 2x+y and g(x) = x + y', options: ['2x + 2xy + y^2', '2x^2 + 3xy + y^2', '2xy + 3y^2 + 2x', '2y^2 + 3xy + 2'], correctAnswer: '2x^2 + 3xy + y^2' },
      { type: 'multiple-choice', text: 'What type of test can be used to check whether an equation is a function using graphs?', options: ['Diagonal line test', 'Horizontal line test', 'Vertical line test', 'Both A and B'], correctAnswer: 'Vertical line test' },
      { type: 'multiple-choice', text: 'Evaluate f(x) + g(x); f(x)= 2x+y and g(x) = x + y', options: ['3x + 2y', '3y + 2x', '2x + 2y', '3x-2y'], correctAnswer: '3x + 2y' },
      { type: 'multiple-choice', text: 'If f(x)=2x+3 and g(x)=x^2+1, what is (f∘g)(x)?', options: ['2x+1', '2x²+5', '2x²+6', '2x²+3'], correctAnswer: '2x²+5' },
      { type: 'multiple-choice', text: 'Which of the following set is a function?', options: ['A = {(2,3), (4,2), (1,5)}', 'B = { (2,3), (3,2), (3,1)}', 'C = {(1,1), (1,5),(1,6)}', 'D = {(0,3), (0,4), (0,5)}'], correctAnswer: 'A = {(2,3), (4,2), (1,5)}' },
      { type: 'multiple-choice', text: 'The set of values of x.', options: ['domain', 'range', 'ordinate', 'origin'], correctAnswer: 'domain' },
      { type: 'multiple-choice', text: 'If f(x)=x+4 and g(x)=3x−5, what is (g∘f)(x)?', options: ['3x+7', '3x+13', '3x+9', '3x+3'], correctAnswer: '3x+7' },
      { type: 'multiple-choice', text: 'Which of the following is a function?', options: ['A parabola facing right.', 'A parabola facing left.', 'A parabola facing upward.', 'A circle.'], correctAnswer: 'A parabola facing upward.' },
      { type: 'multiple-choice', text: 'Which of the following is a characteristic of a bijective function?', options: ['The function is both injective (one-to-one) and surjective (onto).', 'The function is only surjective.', 'The function is only injective.', 'The function has at least one element in the domain that maps to multiple elements in the range'], correctAnswer: 'The function is both injective (one-to-one) and surjective (onto).' },
      { type: 'multiple-choice', text: 'How many values of y does a function have?', options: ['3', '2', '0', '1'], correctAnswer: '1' },
      { type: 'multiple-choice', text: 'Which of the following is a function?', options: ['y = x^2', 'x + y = 1', 'y = x + 2', 'x + y = 3'], correctAnswer: 'y = x + 2' },
      { type: 'multiple-choice', text: 'What is the inverse of the function f(x)=2x+3?', options: ['f^{-1}(x)=(x-3)/2', 'f^{-1}(x)=2x−3', 'f^{-1}(x)=x/2', 'f^{-1}(x)=3x−2'], correctAnswer: 'f^{-1}(x)=(x-3)/2' },
      { type: 'multiple-choice', text: 'Which of the following is the derived connective for NAND?', options: ['¬(p∧q)', 'p→q', '¬(p∨q)', 'p∨¬q'], correctAnswer: '¬(p∧q)' },
      { type: 'multiple-choice', text: 'Which of the following is not a function?', options: ['x + y = 6', 'x + y = 15', 'x + 2y = 5', 'x + 3 = 4'], correctAnswer: 'x + 3 = 4' }
    ] },
  { id: 2, title: 'Truth Tables', color: 'secondary',questions: [
      { type: 'truth-table', text: 'Complete the truth table for p → q:', correctAnswers: ['T', 'F', 'T', 'T'], operator: '→' },
      { type: 'truth-table', text: 'Complete the truth table for P ↔ Q:', correctAnswers: ['T', 'F', 'F', 'T'], operator: '↔' },
      { type: 'multiple-choice', text: 'Which of the following is a tautology?', options: ['p ∧ q', 'p ∨ q', 'p → p', 'p ∨ q'], correctAnswer: 'p → p' },
      { type: 'multiple-choice', text: 'Which of the following is the derived connective for "if and only if" (denoted by ↔)?', options: ['p∧q', '(p→q)∧(q→p)', 'p∨q', '¬(p→¬q)'], correctAnswer: '(p→q)∧(q→p)' },
      { type: 'truth-table', text: 'Complete the truth table for P ∨ Q:', correctAnswers: ['T', 'T', 'T', 'F'], operator: '∨' },
      { type: 'multiple-choice', text: 'Symbolize: “If it rains, the streets will be wet.”', options: ['R → W', 'R ∧ W', 'R ∨ W', 'W → R'], correctAnswer: 'R → W' },
      { type: 'multiple-choice', text: 'Which type of statement represents “if-then”?', options: ['Conjunction', 'Disjunction', 'Conditional', 'Equivalence'], correctAnswer: 'Conditional' },
      { type: 'truth-table', text: 'Complete the truth table for P ∧ Q:', correctAnswers: ['T', 'F', 'F', 'F'], operator: '∧' },
      { type: 'truth-table', text: 'Complete the truth table for ¬P:', correctAnswers: ['F', 'F', 'T', 'T'], operator: '¬' },
      { type: 'truth-table', text: 'Complete the truth table for P ↓ Q:', correctAnswers: ['F', 'T', 'T', 'T'], operator: '↓' }
   ] },
  { id: 3, title: 'Operation on sets', color: 'negative', questions: [
     { type: 'multiple-choice', text: 'What is the result of A ∪ B if A = {1, 2} and B = {2, 3}?', options: ['{1, 2}', '{1, 2, 3}', '{2}', '{1, 3}'], correctAnswer: '{1, 2, 3}' },
     { type: 'multiple-choice', text: 'What is the result of A ∩ B if A = {a, b, c} and B = {b, c, d}?', options: ['{a, b}', '{b, c}', '{c, d}', '{a, c}'], correctAnswer: '{b, c}' },
     { type: 'multiple-choice', text: 'What is A - B if A = {1, 2, 3} and B = {2, 3}?', options: ['{1}', '{2}', '{3}', '{1, 2, 3}'], correctAnswer: '{1}' },
     { type: 'multiple-choice', text: 'What is the union of A = {x, y} and B = {y, z}?', options: ['{x, y}', '{y, z}', '{x, y, z}', '{x, z}'], correctAnswer: '{x, y, z}' },
     { type: 'multiple-choice', text: 'What is the result of A ∩ B if A = {1, 2, 3} and B = {4, 5, 6}?', options: ['{1, 2, 3}', '{}', '{4, 5, 6}', '{1, 4}'], correctAnswer: '{}' },
     { type: 'multiple-choice', text: 'What is the complement of A if U = {1, 2, 3, 4, 5} and A = {1, 3}?', options: ['{2, 4, 5}', '{1, 3}', '{}', '{1, 2, 3, 4, 5}'], correctAnswer: '{2, 4, 5}' },
     { type: 'multiple-choice', text: 'If A ∩ B = {}, what does it mean?', options: ['A and B are disjoint', 'A is a subset of B', 'A and B are equal', 'A and B are complements'], correctAnswer: 'A and B are disjoint' },
     { type: 'multiple-choice', text: 'What is A - B if A = {a, b, c} and B = {c}?', options: ['{a, b}', '{c}', '{a}', '{b, c}'], correctAnswer: '{a, b}' },
     { type: 'multiple-choice', text: 'What is the power set of A = {1, 2}?', options: ['{ {}, {1}, {2}, {1, 2} }', '{1, 2}', '{1, 2, 3}', '{}'], correctAnswer: '{ {}, {1}, {2}, {1, 2} }' },
     { type: 'multiple-choice', text: 'Which of the following is a subset of A = {a, b, c}?', options: ['{a, b}', '{a, d}', '{b, e}', '{c, d}'], correctAnswer: '{a, b}' },
     { type: 'true-false', text: 'The union of two sets contains all the elements of both sets.', correctAnswer: true },
     { type: 'true-false', text: 'The intersection of two sets includes elements that are not in both sets.', correctAnswer: false },
     { type: 'true-false', text: 'A - B contains elements that are in B but not in A.', correctAnswer: false },
     { type: 'true-false', text: 'If A and B have no elements in common, they are disjoint sets.', correctAnswer: true },
     { type: 'true-false', text: 'The complement of a set A contains all the elements that are not in A.', correctAnswer: true }
    ] },
     { id: 4, title: 'Propositional Logic', color: 'positive', questions: [
       { type: 'multiple-choice', text: 'A relation R on set A is a subset of:', options: ['A × A', 'A ∪ A', 'A - A', 'Power set of A'], correctAnswer: 'A × A' },
       { type: 'multiple-choice', text: 'The domain of a relation R ⊆ A × B is:', options: ['B', 'A', 'A ∪ B', 'A ∩ B'], correctAnswer: 'A' },
       { type: 'multiple-choice', text: 'The range of a relation R ⊆ A × B is:', options: ['A', 'B', 'A ∪ B', 'A ∩ B'], correctAnswer: 'B' },
       { type: 'multiple-choice', text: 'A relation R on A is reflexive if:', options: ['For all a in A, (a, b) in R', 'For all a in A, (a, a) in R', 'For all a, b in A, if (a, b) in R then (b, a) in R', 'For all a, b, c in A, if (a, b) and (b, c) in R then (a, c) in R'], correctAnswer: 'For all a in A, (a, a) in R' },
       { type: 'multiple-choice', text: 'A relation R on A is symmetric if:', options: ['For all a in A, (a, a) in R', 'For all a, b in A, if (a, b) in R then (b, a) in R', 'For all a, b, c in A, if (a, b) and (b, c) in R then (a, c) in R', 'For all a, b in A, (a, b) in R or (b, a) in R'], correctAnswer: 'For all a, b in A, if (a, b) in R then (b, a) in R' },
       { type: 'multiple-choice', text: 'A relation R on A is transitive if:', options: ['For all a in A, (a, a) in R', 'For all a, b in A, if (a, b) in R then (b, a) in R', 'For all a, b, c in A, if (a, b) and (b, c) in R then (a, c) in R', 'For all a, b in A, exactly one of (a, b) or (b, a) in R'], correctAnswer: 'For all a, b, c in A, if (a, b) and (b, c) in R then (a, c) in R' },
       { type: 'multiple-choice', text: 'Which of the following is an equivalence relation on integers?', options: ['Equality relation', 'Less than relation', 'Greater than relation', 'Divisibility relation'], correctAnswer: 'Equality relation' },
       { type: 'multiple-choice', text: 'The relation "is congruent to modulo n" is:', options: ['Reflexive but not symmetric', 'Symmetric but not transitive', 'Reflexive, symmetric, and transitive', 'Irreflexive'], correctAnswer: 'Reflexive, symmetric, and transitive' },
       { type: 'multiple-choice', text: 'A partial order relation is:', options: ['Reflexive and symmetric', 'Reflexive, antisymmetric, and transitive', 'Symmetric and transitive', 'Irreflexive and symmetric'], correctAnswer: 'Reflexive, antisymmetric, and transitive' },
       { type: 'multiple-choice', text: 'The relation ≤ on real numbers is:', options: ['Equivalence relation', 'Partial order', 'Total order', 'Strict order'], correctAnswer: 'Total order' },
       { type: 'true-false', text: 'Every relation is a function.', correctAnswer: false },
       { type: 'true-false', text: 'The empty relation is reflexive.', correctAnswer: true },
       { type: 'true-false', text: 'If R is symmetric, then R inverse is also symmetric.', correctAnswer: true },
       { type: 'true-false', text: 'The union of two equivalence relations is an equivalence relation.', correctAnswer: false },
       { type: 'true-false', text: 'A strict partial order is irreflexive and transitive.', correctAnswer: true },
       { type: 'true-false', text: 'The relation of parallelism on lines is an equivalence relation.', correctAnswer: true }
    ] }
];
export default defineComponent({
  name: 'AssessmentsPage',
  setup() {
    const selectedAssessment = ref(null);
    const currentQuestion = ref(0);
    const userAnswers = ref([]);
    const showResults = ref(false);
    const showQuiz = ref(false);
    const showCorrectMsg = ref(false);
    const showIncorrectMsg = ref(false);
    const currentCorrectAnswer = ref('');
    const tempTruthAnswers = ref([]);
    const isTruthTable = computed(() => {
      return selectedAssessment.value && selectedAssessment.value.questions[currentQuestion.value]?.type === 'truth-table';
    });
    watch(() => currentQuestion.value, () => {
      const q = selectedAssessment.value?.questions[currentQuestion.value];
      if (q?.type === 'truth-table') {
        tempTruthAnswers.value = ['', '', '', ''];
      }
    });
    const selectAssessment = (assessment) => {
      if (assessment) {
        selectedAssessment.value = assessment;
        currentQuestion.value = 0;
        userAnswers.value = [];
        showResults.value = false;
        showQuiz.value = true;
        showCorrectMsg.value = false;
        showIncorrectMsg.value = false;
        currentCorrectAnswer.value = '';
      } else {
        showQuiz.value = false;
        selectedAssessment.value = null;
      }
    };
    const proceed = () => {
      if (currentQuestion.value < selectedAssessment.value.questions.length - 1) {
        currentQuestion.value++;
      } else {
        showResults.value = true;
        saveScore(selectedAssessment.value.id, calculateScore());
      }
    };
    const answerQuestion = (answer) => {
      userAnswers.value[currentQuestion.value] = answer;
      const question = selectedAssessment.value.questions[currentQuestion.value];
      const isCorrect = answer === question.correctAnswer;
      if (isCorrect) {
        showCorrectMsg.value = true;
        setTimeout(() => {
          showCorrectMsg.value = false;
          proceed();
        }, 2000);
      } else {
        showIncorrectMsg.value = true;
        currentCorrectAnswer.value = question.correctAnswer === true ? 'True' : question.correctAnswer === false ? 'False' : question.correctAnswer;
        setTimeout(() => {
          showIncorrectMsg.value = false;
          proceed();
        }, 3000);
      }
    };
    const submitTruthTable = () => {
      const answers = tempTruthAnswers.value.map(a => a.toUpperCase().trim());
      const question = selectedAssessment.value.questions[currentQuestion.value];
      const correctCount = answers.reduce((count, ans, i) => (ans === question.correctAnswers[i] ? count + 1 : count), 0);
      userAnswers.value[currentQuestion.value] = answers;
      const isAllCorrect = correctCount === 4;
      if (isAllCorrect) {
        showCorrectMsg.value = true;
        setTimeout(() => {
          showCorrectMsg.value = false;
          proceed();
        }, 2000);
      } else {
        showIncorrectMsg.value = true;
        currentCorrectAnswer.value = `You got ${correctCount} out of 4 correct! The correct answers are: ${question.correctAnswers.join(', ')}`;
        setTimeout(() => {
          showIncorrectMsg.value = false;
          proceed();
        }, 3000);
      }
    };
    const calculateScore = () => {
      return userAnswers.value.reduce((score, answer, index) => {
        const question = selectedAssessment.value.questions[index];
        if (question.type === 'truth-table') {
          if (!Array.isArray(answer) || !Array.isArray(question.correctAnswers)) return score;
          return score + answer.filter((a, i) => a === question.correctAnswers[i]).length;
        } else {
          return answer === question.correctAnswer ? score + 1 : score;
        }
      }, 0);
    };
    const calculateTotal = () => {
      return selectedAssessment.value ? selectedAssessment.value.questions.reduce((total, q) => {
        return total + (q.type === 'truth-table' ? 4 : 1);
      }, 0) : 0;
    };
    const calculatePercentage = () => {
      return selectedAssessment.value ? ((calculateScore() / calculateTotal()) * 100).toFixed(2) : '0.00';
    };
    const saveScore = (assessmentId, score) => {
      const scores = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
      scores[assessmentId] = score;
      localStorage.setItem('assessmentScores', JSON.stringify(scores));
    };
    return {
      assessments,
      selectedAssessment,
      currentQuestion,
      showResults,
      showQuiz,
      showCorrectMsg,
      showIncorrectMsg,
      currentCorrectAnswer,
      tempTruthAnswers,
      truthTableData,
      isTruthTable,
      selectAssessment,
      answerQuestion,
      submitTruthTable,
      calculateScore,
      calculateTotal,
      calculatePercentage
    };
  }
});
</script>
<style>
/* 🔹 Overall Page Styling */
.q-pa-md {
  display: flex;
  color: white; /* Make problems text white */
   font-size: 18px;
  font-weight: bold;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
  /* Background settings */
  background: url('src/assets/images/bc.jpg') no-repeat center center fixed;
  background-size: cover;
  /* Ensure it takes the full viewport height */
  width: 100%;
  min-height: 100vh;
}
.q-dialog-content {
  text-align: center;
}
/* 🔹 Buttons Styling */
.q-btn {
  font-size: 15px;
  font-weight: bold;
  padding: 20px 30px;
  transition: all 0.3s ease-in-out;
  border-radius: 15px;
}
/* 🔹 Hover Effects for Buttons */
.q-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(158, 152, 152, 0.3);
}
/* 🔹 Assessment List Styling */
.q-list {
  width: 100%;
  max-width: 400px;
  background:hsla(0, 49.70%, 33.50%, 0.77);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  margin: 0 auto;
}
/* 🔹 List Item Styling */
.q-item {
  transition: background 0.3s ease-in-out;
}
/* 🔹 List Item Hover Effect */
.q-item:hover {
  background: rgba(158, 11, 11, 0.05);
  transform: scale(1.02);
}
/* 🔹 Question Card Styling */
h3.text-h6 {
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  color: white;
  padding: 12px;
  border-radius: 8px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}
/* 🔹 Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* 🔹 Results Section Styling */
h3.text-h6 + p {
  font-size: 20px;
  font-weight: bold;
  color: rgba(233, 225, 225, 0.85);
  animation: fadeIn 0.8s ease-in-out;
}
.message-card {
  max-width: 400px;
  animation: fadeIn 0.5s ease-in-out;
}
.correct-card {
  background-color: rgba(15, 209, 183, 0.77);
  border: 2px solid #4caf50;
}
.incorrect-card {
  background-color: rgba(54, 244, 146, 0.69);
  border: 2px solid #f44336;
}
.truth-table {
  max-width: 300px;
  margin: 0 auto;
  background: hsla(0, 0%, 100%, 0.1);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.92);
}
.table-header {
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  color: white;
  font-weight: bold;
}
.table-row {
  background: hsla(189, 70%, 56%, 0.89);
}
.table-row:hover {
  background: hsla(120, 11%, 93%, 0.86);
}
.col-4 {
  text-align: center;
  padding: 8px;
  border-right: 1px solid rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid rgba(255, 255, 255, 0.91);
}
.col-4:last-child {
  border-right: none;
}
</style>
```