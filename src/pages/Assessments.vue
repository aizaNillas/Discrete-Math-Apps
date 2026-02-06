<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md centered-row">
      <div class="col-6" v-for="(assessment, index) in assessments" :key="index">
        <q-btn :color="assessment.color" :label="assessment.title" class="full-width" @click="selectAssessment(assessment)" />
      </div>
    </div>
    <q-dialog v-model="showQuiz" persistent maximized>
      <q-card>
        <q-card-section class="q-pa-md q-dialog-content">
          
          <div v-if="selectedAssessment">
            <div v-if="showResults">
              <h3 class="text-h6"> SEE RESULTS</h3>
              <p>Your score: {{ calculateScore() }} / {{ calculateTotal() }} ({{ calculatePercentage() }}%)</p>
              <div v-if="wrongAnswers.length > 0" class="q-mt-md">
                <h4 class="text-h6 q-mb-md">Incorrect Answers:</h4>
                <div v-for="(wrong, index) in wrongAnswers" :key="index" class="q-mb-md">
                  <q-card class="bg-teal text-white">
                    <q-card-section>
                      <div class="text-h6">{{ wrong.question.text }}</div>
                      <p class="q-mb-none">Your answer: {{ wrong.userAnswer }}</p>
                      <p class="q-mb-none">Correct answer: {{ wrong.question.correctAnswer }}</p>
                      <p class="q-mt-sm" v-if="wrong.question.explanation">{{ wrong.question.explanation }}</p>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
              <div class="flex justify-center q-mt-md q-gutter-md">
                <q-btn v-if="(selectedAssessment.id === 1 || selectedAssessment.id === 2 || selectedAssessment.id === 3 || selectedAssessment.id === 4 || selectedAssessment.id === 5 || selectedAssessment.id === 6) && difficulty === 'Easy' && calculateScore() === calculateTotal()" color="green" label="Continue to Hard Level" @click="continueToHard" class="small-btn" />
                <q-btn v-if="(selectedAssessment.id === 1 || selectedAssessment.id === 2 || selectedAssessment.id === 3 || selectedAssessment.id === 4 || selectedAssessment.id === 5 || selectedAssessment.id === 6) && difficulty === 'Easy' && calculateScore() !== calculateTotal()" color="blue" label="Back to Easy Mode" @click="backToEasyMode" class="small-btn" />
                <q-btn v-if="difficulty !== 'Easy' || (selectedAssessment.id !== 1 && selectedAssessment.id !== 2 && selectedAssessment.id !== 3 && selectedAssessment.id !== 4 && selectedAssessment.id !== 5 && selectedAssessment.id !== 6)" color="green" label="Back to Assessments" @click="selectAssessment(null)" class="small-btn" />
              </div>
              <div v-if="difficulty === 'Easy' && calculateScore() !== calculateTotal()" class="q-mt-md">
                <q-card class="message-card bg-blue">
                  <q-card-section class="text-center">
                    You need a perfect score to unlock the hard level.
                  </q-card-section>
                </q-card>
              </div>
              <div v-else-if="difficulty === 'Hard'" class="q-mt-md">
                <q-card :class="['message-card', (calculateTotal() - calculateScore() <= 2 ? 'correct-card' : 'incorrect-card')]">
                  <q-card-section class="text-center">
                    <span v-if="calculateTotal() - calculateScore() <= 2">Congratulations! You passed the hard level.</span>
                    <span v-else>You can have at most 2 mistakes to pass. Try again!</span>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div v-else>
              <h3 class="text-h6">{{ selectedAssessment.title }}</h3>
              <div v-if="currentQuestion === -1 && (selectedAssessment.id ===1 || selectedAssessment.id ===2 || selectedAssessment.id ===3 || selectedAssessment.id ===4 || selectedAssessment.id ===5 || selectedAssessment.id ===6)" class="difficulty-selection">
                <p>Select Difficulty Level</p>
                <div class="flex justify-center q-mt-md q-col-gutter-sm">
                  <q-btn color="teal" label="Easy" @click="selectDifficulty('Easy')" class="q-mr-sm" />
                  <q-btn 
                    :color="hasPassedEasy ? 'teal' : 'grey'" 
                    label="Hard" 
                    @click="hasPassedEasy ? selectDifficulty('Hard') : null" 
                    class="q-mr-sm"
                    :disable="!hasPassedEasy"
                  />
                </div>
                <div v-if="!hasPassedEasy" class="q-mt-sm">
                  <q-card class="message-card bg-blue">
                    <q-card-section class="text-center">
                      Complete Easy mode with a perfect score to unlock Hard level.
                    </q-card-section>
                  </q-card>
                </div>
              </div>
              <div v-else>
                <p>Question {{ currentQuestion + 1 }} of {{ selectedAssessment.questions.length }}</p>
                <p class="q-mb-md question-text">{{ selectedAssessment.questions[currentQuestion].text }}</p>
                <div v-if="selectedAssessment.questions[currentQuestion].type === 'multiple-choice'" class="q-mt-md column q-col-gutter-sm q-mx-auto" style="max-width: 400px;">
                  <q-btn
                    v-for="(option, index) in selectedAssessment.questions[currentQuestion].options"
                    :key="index"
                    :label="option"
                    color="blue-3"
                    unelevated
                    full-width
                    v-ripple
                    @click="answerQuestion(option)"
                    class="option-btn"
                  />
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
import { defineComponent, ref, watch, computed, onMounted, onUnmounted } from 'vue';

const truthTableData = [
  { p: 'T', q: 'T' },
  { p: 'T', q: 'F' },
  { p: 'F', q: 'T' },
  { p: 'F', q: 'F' }
];

const fullFunctionQuestions = [
  { type: 'multiple-choice', text: 'What do you call a relation such that no two ordered pairs have the same first element?', options: ['a. Ordered pair', 'b. Function', 'c. Notation', 'd. Binary operations'], correctAnswer: 'b. Function', explanation: 'A function is a relation where each input (first element) maps to exactly one output (second element), ensuring no two ordered pairs share the same first element.' },
  { type: 'multiple-choice', text: 'Which of the following set is a function?', options: ['a. A = {(2,3), (4,2), (1,5)}', 'b. B = { (2,3), (3,2), (3,1)}', 'c. C = {(1,1), (1,5),(1,6)}', 'd. D = {(0,3), (0,4), (0,5)}'], correctAnswer: 'a. A = {(2,3), (4,2), (1,5)}', explanation: 'Set A has unique first elements (2,4,1), while others have duplicates: B has two 3s, C and D have multiple for 1 and 0 respectively.' },
  { type: 'multiple-choice', text: 'The set of values of x.', options: ['a. Domain', 'b. Range', 'c. Ordinate', 'd. Origin'], correctAnswer: 'a. Domain', explanation: 'The domain is the set of all possible input values (x-values) for the function.' },
  { type: 'multiple-choice', text: 'Which of the following is a function?', options: ['a. A parabola facing right', 'b. A parabola facing left', 'c. A parabola facing upward', 'd. A circle'], correctAnswer: 'c. A parabola facing upward', explanation: 'A parabola facing upward (y = x²) passes the vertical line test, unlike a circle or side-facing parabolas which fail it.' },
  { type: 'multiple-choice', text: 'Which statement best describes a function that covers all values in the range?', options: ['a. Each input has only one output', 'b. Every output has at least one input', 'c. Some outputs share multiple inputs', 'd. Some outputs have no input'], correctAnswer: 'b. Every output has at least one input', explanation: 'A surjective (onto) function means every element in the range is mapped to by at least one input.' },
  { type: 'multiple-choice', text: 'How many values of y does a function have?', options: ['a. 3', 'b. 2', 'c. 0', 'd. 1'], correctAnswer: 'd. 1', explanation: 'By definition, a function assigns exactly one output (y-value) to each input (x-value).' },
  { type: 'multiple-choice', text: 'Which of the following is a function?', options: ['a. y = x²', 'b. x² + y = 15', 'c. y² = x + 2', 'd. x + y² = 3'], correctAnswer: 'a. y = x²', explanation: 'y = x² solves for y explicitly as a function of x; the others fail the vertical line test.' },
  { type: 'multiple-choice', text: 'What is the inverse of the function f(x) = 2x + 3?', options: ['a. f⁻¹(x) = (x − 3)/2', 'b. f⁻¹(x) = 2x − 3', 'c. f⁻¹(x) = (x + 3)/2', 'd. f⁻¹(x) = 3x − 2'], correctAnswer: 'a. f⁻¹(x) = (x − 3)/2', explanation: 'To find the inverse, swap x and y: y = 2x + 3 → x = 2y + 3 → 2y = x - 3 → y = (x - 3)/2.' },
  { type: 'multiple-choice', text: 'Which of the following is not a function?', options: ['a. x + y = 6', 'b. x² + y = 15', 'c. x³ + 2y = 5', 'd. x + 3y² = 4'], correctAnswer: 'd. x + 3y² = 4', explanation: 'x + 3y² = 4 leads to two possible y values for some x, failing the vertical line test.' },
  { type: 'multiple-choice', text: 'Which statement best describes a function where each input goes to a unique output?', options: ['a. Some outputs may be shared by multiple inputs', 'b. Every input is paired with only one output', 'c. Some inputs go to multiple outputs', 'd. Each output must come from multiple inputs'], correctAnswer: 'b. Every input is paired with only one output', explanation: 'That is the fundamental definition of a function.' }
];

const fullTruthQuestions = [
  { type: 'truth-table', text: 'Complete the truth table for p → q:', correctAnswers: ['T', 'F', 'T', 'T'], operator: '→' },
  { type: 'truth-table', text: 'Complete the truth table for P ↔ Q:', correctAnswers: ['T', 'F', 'F', 'T'], operator: '↔' },
  { type: 'multiple-choice', text: 'Which of the following is a tautology?', options: ['p ∧ q', 'p ∨ q', 'p → p', 'p ∨ q'], correctAnswer: 'p → p', explanation: 'p → p is always true, regardless of the truth value of p, making it a tautology.' },
  { type: 'multiple-choice', text: 'Which of the following is the derived connective for "if and only if" (denoted by ↔)?', options: ['p∧q', '(p→q)∧(q→p)', 'p∨q', '¬(p→¬q)'], correctAnswer: '(p→q)∧(q→p)', explanation: 'The biconditional ↔ is equivalent to both implications: (p → q) and (q → p).' },
  { type: 'truth-table', text: 'Complete the truth table for P ∨ Q:', correctAnswers: ['T', 'T', 'T', 'F'], operator: '∨' },
  { type: 'multiple-choice', text: 'Symbolize: "If it rains, the streets will be wet."', options: ['R → W', 'R ∧ W', 'R ∨ W', 'W → R'], correctAnswer: 'R → W', explanation: 'This is a conditional statement: if R (rains), then W (wet streets).' },
  { type: 'multiple-choice', text: 'Which type of statement represents "if-then"?', options: ['Conjunction', 'Disjunction', 'Conditional', 'Equivalence'], correctAnswer: 'Conditional', explanation: 'The "if-then" structure is represented by the conditional connective.' },
  { type: 'truth-table', text: 'Complete the truth table for P ∧ Q:', correctAnswers: ['T', 'F', 'F', 'F'], operator: '∧' },
  { type: 'truth-table', text: 'Complete the truth table for ¬P:', correctAnswers: ['F', 'F', 'T', 'T'], operator: '¬' },
  { type: 'truth-table', text: 'Complete the truth table for P ↓ Q:', correctAnswers: ['F', 'T', 'T', 'T'], operator: '↓' }
];

const fullPropositionalQuestions = [
  { type: 'multiple-choice', text: 'Which symbol represents "not" in logic?', options: ['a. ¬', 'b. ^', 'c. ∨', 'd. →'], correctAnswer: 'a. ¬' },
  { type: 'multiple-choice', text: 'What is a tautology?', options: ['a. A statement that is always false.', 'b. A statement that is always true.', 'c. A statement that is sometimes true, sometimes false.', 'd. A statement with unknown truth value.'], correctAnswer: 'b. A statement that is always true.' },
  { type: 'multiple-choice', text: 'What does the conditional statement p → q represents?', options: ['a. p and q are both true', 'b. If p, then q', 'c. p or q is true', 'd. p implies not q'], correctAnswer: 'b. If p, then q' },
  { type: 'multiple-choice', text: 'What does the biconditional statement p ↔ q represent?', options: ['a. If p, then q', 'b. p or q', 'c. p if and only if q', 'd. p and q'], correctAnswer: 'c. p if and only if q' },
  { type: 'multiple-choice', text: 'Which of the following is a tautology?', options: ['a. p ∧ ¬p', 'b. p ∨ ¬p', 'c. p → p', 'd. p ∨ q'], correctAnswer: 'c. p → p' },
  { type: 'multiple-choice', text: 'Which type of statement represents "if-then"?', options: ['a. Conjunction', 'b. Disjunction', 'c. Conditional', 'd. Equivalence'], correctAnswer: 'c. Conditional' },
  { type: 'multiple-choice', text: 'Symbolize: "If it rains, the streets will be wet."', options: ['a. R → W', 'b. R ∧ W', 'c. R ∨ W', 'd. W → R'], correctAnswer: 'a. R → W' },
  { type: 'truth-table', text: 'Complete the truth table for p → q:', correctAnswers: ['T', 'F', 'T', 'T'], operator: '→' },
  { type: 'multiple-choice', text: 'Which of the following is the derived connective for "if and only if" (denoted by ↔)?', options: ['a. p∧q', 'b. (p→q)∧(q→p)', 'c. p∨q', 'd. ¬(p→¬q)'], correctAnswer: 'b. (p→q)∧(q→p)' },
  { type: 'truth-table', text: 'Complete the truth table for p ↔ q:', correctAnswers: ['T', 'F', 'F', 'T'], operator: '↔' },
  { type: 'multiple-choice', text: 'Which of the following is the derived connective for NOR?', options: ['a. ¬(p∨q)', 'b. p∨q', 'c. ¬(p∧q)', 'd. ¬p∨¬q'], correctAnswer: 'a. ¬(p∨q)' },
  { type: 'multiple-choice', text: 'Which of the following is the derived connective for NAND?', options: ['a. ¬(p∧q)', 'b. p→q', 'c. ¬(p∨q)', 'd. p∨¬q'], correctAnswer: 'a. ¬(p∧q)' },
  { type: 'multiple-choice', text: 'Which of the following is the derived connective for XOR (exclusive or)?', options: ['a. (p∧¬q)∨(¬p∧q)', 'b. p∨q', 'c. (p∨q)∧¬(p∧q)', 'd. p→q'], correctAnswer: 'c. (p∨q)∧¬(p∧q)' }
];

const fullAlgorithmQuestions = [
  { type: 'multiple-choice', text: 'What is an algorithm?', options: ['A. A sequence of steps for solving a problem', 'B. A type of programming language', 'C. A set of random numbers', 'D. A collection of graphs'], correctAnswer: 'A. A sequence of steps for solving a problem', explanation: 'An algorithm is a finite sequence of well-defined instructions to solve a problem.' },
  { type: 'multiple-choice', text: 'Which of the following is the first step in designing an algorithm?', options: ['A. Writing the code in a programming language', 'B. Understanding the problem', 'C. Debugging the program', 'D. Running test cases'], correctAnswer: 'B. Understanding the problem', explanation: 'The first step is always to understand the problem clearly.' },
  { type: 'multiple-choice', text: 'What is the output of an algorithm?', options: ['A. The steps of the algorithm', 'B. The problem description', 'C. The solution to the problem', 'D. The programming language used'], correctAnswer: 'C. The solution to the problem', explanation: 'The output is the result or solution produced by following the steps.' },
  { type: 'multiple-choice', text: 'Which of these is an example of a searching algorithm?', options: ['A. Bubble Sort', 'B. Linear Search', 'C. Merge Sort', 'D. Selection Sort'], correctAnswer: 'B. Linear Search', explanation: 'Linear Search is a searching algorithm that checks each element sequentially.' },
  { type: 'multiple-choice', text: 'Which of the following best describes a loop in an algorithm?', options: ['A. A set of instructions that are never executed', 'B. A step that repeats until a certain condition is met', 'C. A step that is skipped automatically', 'D. A conditional statement that is always false'], correctAnswer: 'B. A step that repeats until a certain condition is met', explanation: 'Loops allow repetition of instructions based on a condition.' },
  { type: 'multiple-choice', text: 'A graph has 10 vertices and 15 edges. If the graph is connected, what can you infer about its cycles?', options: ['A. It must be a tree', 'B. It must have at least 6 cycles', 'C. It has no cycles', 'D. It must be Eulerian'], correctAnswer: 'B. It must have at least 6 cycles', explanation: 'For a connected graph, the cyclomatic number is e - v + 1 = 15 - 10 + 1 = 6, which indicates the minimum number of independent cycles.' },
  { type: 'multiple-choice', text: 'Which of the following statements is always true for bipartite graphs?', options: ['A. They are complete graphs', 'B. They contain only even-degree vertices', 'C. They contain no odd cycles', 'D. They have equal-sized vertex partitions'], correctAnswer: 'C. They contain no odd cycles', explanation: 'Bipartite graphs have no odd-length cycles.' },
  { type: 'multiple-choice', text: 'Which type of graph contains the maximum number of edges among all bipartite graphs with vertex sets of size m and n?', options: ['A. Complete bipartite graph', 'B. Star graph', 'C. Directed acyclic graph', 'D. Complete graph'], correctAnswer: 'A. Complete bipartite graph', explanation: 'A complete bipartite graph has all possible edges between the two sets.' },
  { type: 'multiple-choice', text: 'If a graph has 10 vertices and each vertex is connected to every other vertex, how many edges does it have?', options: ['A. 10', 'B. 20', 'C. 45', 'D. 90'], correctAnswer: 'C. 45', explanation: 'Complete graph K_10 has \\binom{10}{2} = 45 edges.' },
  { type: 'multiple-choice', text: 'A Hamiltonian path in a graph is defined as:', options: ['A. A path that visits every edge exactly once', 'B. A path that visits every vertex exactly once', 'C. A path that repeats no edge', 'D. A closed walk with repeated edges'], correctAnswer: 'B. A path that visits every vertex exactly once', explanation: 'A Hamiltonian path visits each vertex exactly once.' }
];

const fullGraphQuestions = [
  { type: 'multiple-choice', text: 'What is the degree of a vertex in a graph?', options: ['A. The number of vertices in the graph', 'B. The number of edges connected to the vertex', 'C. The number of cycles the vertex is part of', 'D. The total weight of edges incident on the vertex'], correctAnswer: 'B. The number of edges connected to the vertex', explanation: 'The degree of a vertex is the number of edges incident to it.' },
  { type: 'multiple-choice', text: 'A tree with n vertices has how many edges?', options: ['A. n', 'B. n−1', 'C. n+1', 'D. 2n'], correctAnswer: 'B. n−1', explanation: 'A tree is an acyclic connected graph with n-1 edges.' },
  { type: 'multiple-choice', text: 'What is the chromatic number of a bipartite graph?', options: ['A. Always 1', 'B. Always 2', 'C. Depends on the number of vertices', 'D. Depends on the number of edges'], correctAnswer: 'B. Always 2', explanation: 'Bipartite graphs are 2-colorable.' },
  { type: 'multiple-choice', text: 'What is a simple graph?', options: ['A. A graph without any edges', 'B. A graph with multiple edges between the same pair of vertices', 'C. A graph with no loops or multiple edges', 'D. A graph with only one vertex'], correctAnswer: 'C. A graph with no loops or multiple edges', explanation: 'Simple graphs have no loops or multiple edges between the same pair of vertices.' },
  { type: 'multiple-choice', text: 'A graph where each edge has a direction is called a:', options: ['A. Undirected graph', 'B. Weighted graph', 'C. Directed graph (digraph)', 'D. Multigraph'], correctAnswer: 'C. Directed graph (digraph)', explanation: 'Directed graphs have edges with direction.' },
  { type: 'multiple-choice', text: 'Which of the following statements is always true for bipartite graphs?', options: ['A. They are complete graphs', 'B. They contain only even-degree vertices', 'C. They contain no odd cycles', 'D. They have equal-sized vertex partition'], correctAnswer: 'C. They contain no odd cycles', explanation: 'Bipartite graphs have no odd-length cycles.' },
  { type: 'multiple-choice', text: 'Which type of graph is best for representing a hierarchy, like an organization chart?', options: ['A. Multigraph', 'B. Directed tree', 'C. Bipartite graph', 'D. Star graph'], correctAnswer: 'B. Directed tree', explanation: 'Directed trees can represent hierarchies with a root and directed edges downward.' },
  { type: 'multiple-choice', text: 'Which type of graph has vertices that can be divided into two sets such that every edge connects a vertex in one set to the vertex in the other — and also contains the maximum number of edges?', options: ['A. Complete bipartite graph', 'B. Complete graph', 'C. Star graph', 'D. Directed acyclic graph'], correctAnswer: 'A. Complete bipartite graph', explanation: 'A complete bipartite graph has all possible edges between the two sets.' },
  { type: 'multiple-choice', text: 'If a graph has 10 vertices and each vertex is connected to every other vertex, how many edges are there?', options: ['A. 10', 'B. 45', 'C. 90', 'D. 20'], correctAnswer: 'B. 45', explanation: 'Complete graph K_10 has \\binom{10}{2} = 45 edges.' },
  { type: 'multiple-choice', text: 'Consider a graph with 10 vertices and 15 edges. If the graph is connected, what can you infer about its cycles?', options: ['A. It must be a tree', 'B. It must have at least 6 cycles', 'C. It has no cycles', 'D. It must be Eulerian'], correctAnswer: 'B. It must have at least 6 cycles', explanation: 'For a connected graph, the cyclomatic number is e - v + 1 = 15 - 10 + 1 = 6, which indicates the minimum number of independent cycles.' }
];

const fullSetsQuestions = [
  { type: 'multiple-choice', text: 'It is a distinct collection of objects.', options: ['a. set', 'b. sequence', 'c. order', 'd. ratio'], correctAnswer: 'a. set', explanation: 'A set is a well-defined collection of distinct objects.' },
  { type: 'multiple-choice', text: 'Which of the following is a subset to the set, A= {5,10,15,20}?', options: ['a. A= {25,30}', 'b. A = {1,2}', 'c. A= {3,5}', 'd. { }'], correctAnswer: 'd. { }', explanation: 'The empty set is a subset of every set.' },
  { type: 'multiple-choice', text: 'Which does not belong to the group?', options: ['a. Venn Diagram', 'b. Roster Method', 'c. Builder Notation', 'd. Sets'], correctAnswer: 'd. Sets', explanation: 'Venn Diagram, Roster Method, and Builder Notation are representations or tools for sets, while "Sets" is the concept itself.' },
  { type: 'multiple-choice', text: 'A collection of all elements regarding a particular subject.', options: ['a. power set', 'b. universal set', 'c. subset', 'd. singleton'], correctAnswer: 'b. universal set', explanation: 'The universal set contains all elements under consideration in a given context.' },
  { type: 'multiple-choice', text: 'A set that does not contain any element.', options: ['a. null set', 'b. equal set', 'c. finite set', 'd. power set'], correctAnswer: 'a. null set', explanation: 'The null set, denoted by {}, contains no elements.' },
  { type: 'multiple-choice', text: 'Elements that are common to both set A and set B.', options: ['a. Intersection of sets', 'b. Union of sets', 'c. Set Difference', 'd. Set Complement'], correctAnswer: 'a. Intersection of sets', explanation: 'The intersection A ∩ B consists of elements present in both A and B.' },
  { type: 'multiple-choice', text: 'What is the union of two sets A and B?', options: ['a. Elements common to both', 'b. Elements in A or B or both', 'c. Elements in A but not B', 'd. Elements not in A or B'], correctAnswer: 'b. Elements in A or B or both', explanation: 'The union A ∪ B includes all elements that are in A, in B, or in both.' },
  { type: 'multiple-choice', text: 'If A = {1,2,3}, B = {3,4,5}, what is A ∩ B?', options: ['a. {1,2,3,4,5}', 'b. {1,2}', 'c. {3}', 'd. {4,5}'], correctAnswer: 'c. {3}', explanation: 'The intersection contains only the common element 3.' },
  { type: 'multiple-choice', text: 'What is the cardinality of the power set of a set with 3 elements?', options: ['a. 3', 'b. 6', 'c. 8', 'd. 9'], correctAnswer: 'c. 8', explanation: 'The power set of a set with n elements has 2^n subsets; for n=3, 2^3=8.' },
  { type: 'multiple-choice', text: 'The complement of A with respect to U is:', options: ['a. Elements in A', 'b. Elements not in A', 'c. Union with A', 'd. Intersection with A'], correctAnswer: 'b. Elements not in A', explanation: 'The complement A^c = U - A consists of all elements in the universal set U that are not in A.' },
  { type: 'multiple-choice', text: 'If A ⊆ B and B ⊆ A, then A and B are:', options: ['a. Disjoint', 'b. Equal', 'c. Proper subsets', 'd. Complements'], correctAnswer: 'b. Equal', explanation: 'If each is a subset of the other, they contain exactly the same elements and are equal.' },
  { type: 'multiple-choice', text: 'What is A - B if A={1,2,3,4}, B={3,4}?', options: ['a. {1,2}', 'b. {3,4}', 'c. {1,2,3,4}', 'd. Empty'], correctAnswer: 'a. {1,2}', explanation: 'The set difference A - B contains elements in A that are not in B.' }
];

const assessments = [
  { id: 1, title: 'Function', color: 'teal', questions: fullFunctionQuestions },
  { id: 2, title: 'Truth Tables', color: 'teal', questions: fullTruthQuestions },
  { id: 3, title: 'Operation on sets', color: 'teal', questions: fullSetsQuestions },
  { id: 4, title: 'Propositional Logic', color: 'teal', questions: fullPropositionalQuestions },
  { id: 5, title: 'Algorithm', color: 'teal', questions: fullAlgorithmQuestions },
  { id: 6, title: 'Graph', color: 'teal', questions: fullGraphQuestions }
];

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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
    const difficulty = ref('');
    const hasPassedEasy = ref(false);
    
    // Load completion status from localStorage
    const loadCompletionStatus = () => {
      const status = JSON.parse(localStorage.getItem('assessmentCompletionStatus') || '{}');
      return status;
    };
    
    // Save completion status to localStorage
    const saveCompletionStatus = (assessmentId, passed) => {
      const status = loadCompletionStatus();
      if (!status[assessmentId]) {
        status[assessmentId] = { passedEasy: false };
      }
      status[assessmentId].passedEasy = passed;
      localStorage.setItem('assessmentCompletionStatus', JSON.stringify(status));
    };
    
    const isTruthTable = computed(() => {
      return selectedAssessment.value && selectedAssessment.value.questions[currentQuestion.value]?.type === 'truth-table';
    });
    
    const wrongAnswers = computed(() => {
      if (!selectedAssessment.value || userAnswers.value.length === 0) return [];
      return selectedAssessment.value.questions.map((q, i) => {
        const userAns = userAnswers.value[i];
        if (q.type === 'truth-table') {
          if (!Array.isArray(userAns) || !Array.isArray(q.correctAnswers)) return null;
          const correctCount = userAns.filter((a, j) => a === q.correctAnswers[j]).length;
          if (correctCount < 4) {
            return { question: q, userAnswer: userAns.join(', '), correctAnswer: q.correctAnswers.join(', ') };
          }
        } else {
          if (userAns !== q.correctAnswer) {
            return { question: q, userAnswer: userAns, correctAnswer: q.correctAnswer };
          }
        }
        return null;
      }).filter(Boolean);
    });
    
    // Handle phone back button
    const handlePhoneBack = (e) => {
      if (showQuiz.value && selectedAssessment.value) {
        e.preventDefault();
        e.stopPropagation();
        handleBack();
        return false;
      }
    };
    
    // Add event listener for phone back button
    onMounted(() => {
      window.addEventListener('popstate', handlePhoneBack);
    });
    
    onUnmounted(() => {
      window.removeEventListener('popstate', handlePhoneBack);
    });
    
    watch(showQuiz, (val) => {
      if (val) {
        document.body.style.overflow = 'hidden';
        // Push state to handle back button
        history.pushState({ showQuiz: true }, '');
      } else {
        document.body.style.overflow = '';
      }
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
        // Check if user has passed Easy mode for this assessment
        const status = loadCompletionStatus();
        hasPassedEasy.value = status[assessment.id]?.passedEasy || false;
        
        if (assessment.id === 1 || assessment.id === 2 || assessment.id === 3 || assessment.id === 4 || assessment.id === 5 || assessment.id === 6) {
          currentQuestion.value = -1;
          difficulty.value = '';
        } else {
          currentQuestion.value = 0;
        }
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
    
    const selectDifficulty = (diff) => {
      difficulty.value = diff;
      if (selectedAssessment.value.id === 1) { // Function assessment
        if (diff === 'Easy') {
          // For Easy mode: Take 5 random questions from the fullFunctionQuestions
          const shuffled = shuffleArray([...fullFunctionQuestions]);
          selectedAssessment.value.questions = shuffled.slice(0, 5);
        } else {
          // For Hard mode: Take the remaining 5 questions (not randomized)
          selectedAssessment.value.questions = fullFunctionQuestions.slice(5);
        }
      } else if (selectedAssessment.value.id === 2) { // Truth Tables assessment
        if (diff === 'Easy') {
          // For Easy mode: Take 5 random multiple-choice questions
          const multipleChoiceQuestions = fullTruthQuestions.filter(q => q.type === 'multiple-choice');
          const shuffled = shuffleArray([...multipleChoiceQuestions]);
          selectedAssessment.value.questions = shuffled.slice(0, 5);
        } else {
          // For Hard mode: Take all truth-table questions (not randomized)
          selectedAssessment.value.questions = fullTruthQuestions.filter(q => q.type === 'truth-table');
        }
      } else if (selectedAssessment.value.id === 3) { // Operation on sets assessment
        if (diff === 'Easy') {
          // For Easy mode: Take 6 random questions
          const shuffled = shuffleArray([...fullSetsQuestions]);
          selectedAssessment.value.questions = shuffled.slice(0, 6);
        } else {
          // For Hard mode: Take the remaining questions (not randomized)
          selectedAssessment.value.questions = fullSetsQuestions.slice(6);
        }
      } else if (selectedAssessment.value.id === 4) { // Propositional Logic assessment
        if (diff === 'Easy') {
          // For Easy mode: Take 7 random questions (excluding truth-table for easy)
          const easyQuestions = fullPropositionalQuestions.filter(q => q.type !== 'truth-table');
          const shuffled = shuffleArray([...easyQuestions]);
          selectedAssessment.value.questions = shuffled.slice(0, 7);
        } else {
          // For Hard mode: Take truth-table and remaining questions (not randomized)
          selectedAssessment.value.questions = fullPropositionalQuestions.slice(7);
        }
      } else if (selectedAssessment.value.id === 5) { // Algorithm assessment
        if (diff === 'Easy') {
          // For Easy mode: Take 5 random questions
          const shuffled = shuffleArray([...fullAlgorithmQuestions]);
          selectedAssessment.value.questions = shuffled.slice(0, 5);
        } else {
          // For Hard mode: Take the remaining 5 questions (not randomized)
          selectedAssessment.value.questions = fullAlgorithmQuestions.slice(5);
        }
      } else if (selectedAssessment.value.id === 6) { // Graph assessment
        if (diff === 'Easy') {
          // For Easy mode: Take 5 random questions
          const shuffled = shuffleArray([...fullGraphQuestions]);
          selectedAssessment.value.questions = shuffled.slice(0, 5);
        } else {
          // For Hard mode: Take the remaining 5 questions (not randomized)
          selectedAssessment.value.questions = fullGraphQuestions.slice(5);
        }
      }
      currentQuestion.value = 0;
    };
    
    const continueToHard = () => {
      // Update completion status when user passes Easy mode
      saveCompletionStatus(selectedAssessment.value.id, true);
      hasPassedEasy.value = true;
      
      difficulty.value = 'Hard';
      if (selectedAssessment.value.id === 1) {
        selectedAssessment.value.questions = fullFunctionQuestions.slice(5);
      } else if (selectedAssessment.value.id === 2) {
        selectedAssessment.value.questions = fullTruthQuestions.filter(q => q.type === 'truth-table');
      } else if (selectedAssessment.value.id === 3) {
        selectedAssessment.value.questions = fullSetsQuestions.slice(6);
      } else if (selectedAssessment.value.id === 4) {
        selectedAssessment.value.questions = fullPropositionalQuestions.slice(7);
      } else if (selectedAssessment.value.id === 5) {
        selectedAssessment.value.questions = fullAlgorithmQuestions.slice(5);
      } else if (selectedAssessment.value.id === 6) {
        selectedAssessment.value.questions = fullGraphQuestions.slice(5);
      }
      currentQuestion.value = 0;
      userAnswers.value = [];
      showResults.value = false;
      showCorrectMsg.value = false;
      showIncorrectMsg.value = false;
    };
    
    const backToEasyMode = () => {
      difficulty.value = 'Easy';
      // Reset to random Easy mode questions
      selectDifficulty('Easy');
      // Reset the quiz state
      currentQuestion.value = 0;
      userAnswers.value = [];
      showResults.value = false;
      showCorrectMsg.value = false;
      showIncorrectMsg.value = false;
    };
    
    const handleBack = () => {
      if (showResults.value) {
        // If showing results, go back to difficulty selection
        showResults.value = false;
        currentQuestion.value = -1;
        difficulty.value = '';
        userAnswers.value = [];
      } else if (currentQuestion.value >= 0 && difficulty.value) {
        // If answering questions, go back to difficulty selection
        currentQuestion.value = -1;
        difficulty.value = '';
        userAnswers.value = [];
        showCorrectMsg.value = false;
        showIncorrectMsg.value = false;
      } else {
        // If already at difficulty selection, close the dialog
        selectAssessment(null);
      }
    };
    
    const proceed = () => {
      if (currentQuestion.value < selectedAssessment.value.questions.length - 1) {
        currentQuestion.value++;
      } else {
        showResults.value = true;
        saveScore(selectedAssessment.value.id, calculateScore());
        
        // Check if user passed Easy mode with perfect score
        if (difficulty.value === 'Easy' && calculateScore() === calculateTotal()) {
          saveCompletionStatus(selectedAssessment.value.id, true);
          hasPassedEasy.value = true;
        }
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
      difficulty,
      hasPassedEasy,
      wrongAnswers,
      selectAssessment,
      selectDifficulty,
      continueToHard,
      backToEasyMode,
      handleBack,
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
/* 🔹 Overall Page Styling - Fixed to prevent movement */
.q-pa-md {
  display: flex;
  color: white;
  font-size: 18px;
  font-weight: bold;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
  /* Background settings */
  background: url('src/assets/images/bc.jpg') no-repeat center center fixed;
  background-size: cover;
  background-attachment: fixed; /* Keep background fixed */
  /* Ensure it takes the full viewport height */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  overflow-y: auto; /* Allow scrolling if needed */
}

/* 🔹 Container for assessment buttons - Fixed positioning */
.centered-row {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  position: relative; /* Keep buttons in place */
  z-index: 1;
}

/* 🔹 Individual assessment column - Prevent movement */
.col-6 {
  position: relative; /* Keep in flow */
  transform: none !important; /* Disable any transform movement */
  transition: transform 0s !important; /* Disable transition movement */
}

/* 🔹 Assessment Buttons - Fixed styling */
.q-btn.full-width {
  position: relative; /* Keep in place */
  transform: none !important;
  transition: all 0.3s ease-in-out !important;
  will-change: auto; /* Prevent hardware acceleration that might cause movement */
}

/* 🔹 Prevent button movement on hover */
.q-btn:hover {
  transform: scale(1.05) !important; /* Reduced scale to minimize movement */
  box-shadow: 0 4px 15px rgba(158, 152, 152, 0.3);
  position: relative; /* Stay in place */
  z-index: 2;
}

/* 🔹 Dialog content */
.q-dialog-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.question-text {
  background: transparent !important;
}

.difficulty-selection {
  text-align: center;
}

.difficulty-selection p {
  font-size: 18px;
  margin-bottom: 20px;
}

/* 🔹 Buttons Styling */
.q-btn {
  font-size: 15px;
  font-weight: bold;
  padding: 20px 30px;
  transition: all 0.3s ease-in-out !important;
  border-radius: 15px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Keep positioned */
}

.small-btn {
  height: 50px;
  padding: 10px 20px;
  font-size: 13px;
}

.option-btn {
  height: 50px !important;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white !important;
  border-radius: 8px;
  transform: none !important;
}

/* 🔹 Close button styling */
.close-btn {
  color: #666;
  font-size: 24px;
}

.close-btn:hover {
  color: #333;
  background-color: rgba(0, 0, 0, 0.1);
}

/* 🔹 Hover Effects for Buttons - Limited movement */
.option-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: scale(1.02) !important;
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

/* 🔹 List Item Hover Effect - No movement */
.q-item:hover {
  background: rgba(158, 11, 11, 0.05);
  transform: none !important; /* Disable scale transform */
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

/* 🔹 Additional fixes to prevent any layout shift */
body {
  overflow-x: hidden; /* Prevent horizontal scroll */
  margin: 0;
  padding: 0;
}

.q-dialog {
  position: fixed; /* Keep dialog fixed */
}

/* 🔹 Ensure assessment grid stays in place */
.row.q-col-gutter-md {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3); /* Slight background to make buttons stand out */
  border-radius: 15px;
  backdrop-filter: blur(5px);
}
</style>