```vue
<template>
  <div class="lesson-container">
    <!-- ✅ Pre-Test Section -->
    <div v-if="!preTestCompleted" class="pretest-container">
      <h3 class="title">📝 Pre-Test: Algorithm</h3>
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
      <h5 class="title">📚 Algorithm</h5>
      <!-- Normal Lesson View -->
      <div v-if="!showImplication && !showDerivedMastery && !showLawMastery && !showSearchMastery">
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
              <h4 style="text-align: center;">Key Aspects of an Algorithm</h4>
              <div class="guide-box">
                1. Input: The data you provide to the algorithm for processing.
              </div>
              <div class="guide-box">
                2. Output: The result produced by the algorithm after processing the input.
              </div>
              <div class="guide-box">
                3. Finiteness: An algorithm must eventually halt after a finite number of steps.
              </div>
              <div class="guide-box">
                4. Unambiguity: Each step should be clear and precise.
              </div>
              <div class="guide-box">
                5. Effectiveness: The steps should be basic enough to be carried out, in principle, by a human or computer.
              </div>
              <img src="/images/algo.png" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            </div>
            <button v-if="index === 0" @click="showImplication = true; scrollToTop()" class="next-button">➡️ Next</button>
            <div v-if="index === 1" class="problem-box">
              <h4>Examples of Simple Algorithms</h4>
              <div class="guide-box">
                <p>1. Linear Search: a searching method where each item in a list is checked one by one from the beginning until the target value is found or the list ends.</p>
              </div>
              <div class="guide-box">
                <h5>Steps of the Linear Search Algorithm:</h5>
                <ol>
                  <li>Start from the first element of the array.</li>
                  <li>Compare the current element with the target element.</li>
                  <li>If they match, return the index of the current element.</li>
                  <li>If not, move to the next element and repeat the comparison.</li>
                  <li>If you reach the end of the array without finding the target, return "not found".</li>
                </ol>
              </div>
              <div class="guide-box">
                <h5>Pseudocode:</h5>
                <pre><code>function linearSearch(arr, target):
    for i = 0 to length(arr) - 1:
        if arr[i] == target:
            return i
    return "Not found"</code></pre>
              </div>
              <!-- Interactive Demo for Simple Algorithm -->
              <div v-if="index === 1" class="problem-box">
                <h4>🖥️ DEMONSTRATIONS: Simulate Linear Search</h4>
                <div class="guide-box">
                  <p>Enter a comma-separated array of numbers and a target to see the linear search in action!</p>
                  <input
                    v-model="demoArrayInput"
                    placeholder="e.g., 1,3,5,7,9"
                    class="answer-input"
                    style="margin-bottom: 10px;"
                  />
                  <input
                    v-model="demoTarget"
                    type="number"
                    placeholder="Target (e.g., 5)"
                    class="answer-input"
                    style="margin-bottom: 10px;"
                  />
                  <button @click="runLinearSearchDemo" class="solve-button">Run Simulation</button>
                </div>
                <div v-if="demoResults.length > 0" class="guide-box">
                  <h5>Simulation Steps:</h5>
                  <ol>
                    <li v-for="(result, stepIndex) in demoResults" :key="stepIndex">
                      Step {{ stepIndex + 1 }}: Check index {{ result.index }} (value: {{ result.value }}). {{ result.message }}
                    </li>
                  </ol>
                  <p v-if="demoFound"><strong>Found at index: {{ demoFoundIndex }}</strong></p>
                  <p v-else><strong>Not found!</strong></p>
                  <button @click="resetDemo" class="next-button" style="margin-top: 10px;">Reset Demo</button>
                </div>
              </div>
              <div class="guide-box">
                <p>2. Computer Algorithm: A computer algorithm is a step-by-step procedure or set of rules that are followed to solve a specific problem or task.</p>
              </div>
              <div class="guide-box">
                <h5>What makes an algorithm:</h5>
                <ol>
                  <li>Input: The data or information provided to the algorithm.</li>
                  <li>Process: The series of steps or rules that transform the input into output.</li>
                  <li>Output: The final result produced after the algorithm has been applied to the input.</li>
                </ol>
              </div>
              <img src="/images/inputp.webp" alt="What makes an algorithm" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
              <div class="guide-box">
                <h5>Characteristics of a Good Algorithm:</h5>
                <ul>
                  <li>Correctness: It should provide the correct solution for all possible inputs.</li>
                  <li>Efficiency: The algorithm should use the least amount of resources (time, space) necessary to complete the task.</li>
                  <li>Clarity: The steps should be easy to understand and follow.</li>
                  <li>Finiteness: It should terminate after a finite number of steps.</li>
                </ul>
              </div>
              <div class="guide-box">
                <p>3. Common Algorithms:</p>
                <ol>
                  <li>Sorting Algorithms: These are used to arrange data in a particular order.
                    <ul>
                      <li>Example: QuickSort, MergeSort, BubbleSort</li>
                    </ul>
                  </li>
                  <li>Search Algorithms: These help to find a specific item in a dataset.
                    <ul>
                      <li>Example: Binary Search, Linear Search</li>
                    </ul>
                  </li>
                  <li>Graph Algorithms: These work with graph structures (nodes and edges).
                    <ul>
                      <li>Example: Dijkstra's Algorithm (for shortest paths), Breadth-First Search (BFS)</li>
                    </ul>
                  </li>
                  <li>Machine Learning Algorithms: These are used to create models that can make predictions or decisions.
                    <ul>
                      <li>Example: Linear Regression, Decision Trees, Neural Networks</li>
                    </ul>
                  </li>
                </ol>
              </div>
              
            </div>
            <button v-if="index === 1" @click="goToDerivedMasteryQuiz" class="next-button">➡️ Next</button>
            <div v-if="index === 2" class="problem-box">
              <h4>Classes of Search Algorithm</h4>
              <div class="guide-box">
                <p>Search algorithms are techniques used to find specific elements or solutions within data structures, such as arrays, lists, graphs, or trees.</p>
              </div>
              <div class="guide-box">
                <h5>1. Linear Search</h5>
                <p><strong>Type:</strong> Unstructured search</p>
                <p><strong>Data Structure:</strong> Arrays, Lists (can be unsorted)</p>
                <p><strong>Example Use Case:</strong> Searching for a specific item in an unsorted list.</p>
              </div>
              <div class="guide-box">
                <h5>Pseudocode:</h5>
                <pre><code>def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1  # Target not found</code></pre>
              </div>
              <div class="guide-box">
                <h5>2. Binary Search:</h5>
                <p><strong>Type:</strong> Efficient search for sorted data</p>
                <p><strong>Data Structure:</strong> Sorted Arrays or Lists</p>
                <p><strong>Example Use Case:</strong> Searching for an element in a sorted array or list.</p>
              </div>
              <div class="guide-box">
                <h5>Pseudocode:</h5>
                <pre><code>def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low &lt;= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] &lt; target:
            low = mid + 1
        else:
            high = mid - 1
    return -1  # Target not found</code></pre>
              </div>
              <div class="guide-box">
                <h5>3. Depth-First Search (DFS):</h5>
                <p><strong>Type:</strong> Graph and Tree Search</p>
                <p><strong>Data Structure:</strong> Graphs, Trees</p>
                <p><strong>•	Approach: </strong> DFS explores as far down a branch of the graph or tree as possible before backtracking.</p>
                <p><strong>Example Use Case:</strong> Traversing a tree or graph to find a path or solve a puzzle (like a maze).</p>
              </div>
              <div class="guide-box">
                <h5>Pseudocode (recursive version):</h5>
                <pre><code>def dfs(graph, node, visited):
    if node not in visited:
        print(node)  # Process the node
        visited.add(node)
        for neighbor in graph[node]:
            dfs(graph, neighbor, visited)</code></pre>
              </div>
              <div class="guide-box">
                <h5>4. Breadth-First Search (BFS):</h5>
               <p><strong>Type:</strong> Graph and Tree Search</p>
                <p><strong>Data Structure:</strong> Graphs, Trees</p>
                <p><strong>Approach: </strong> BFS explores the graph level by level, starting from the root (or a given node).</p>
                <p><strong>Example Use Case:</strong> Finding the shortest path in an unweighted graph.</p>
              </div>
              <div class="guide-box">
                <h5>Pseudocode:</h5>
                <pre><code>from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node not in visited:
            print(node)  # Process the node
            visited.add(node)
            for neighbor in graph[node]:
                queue.append(neighbor)</code></pre>
              </div>
            </div>
            <button v-if="index === 2" @click="selectedTopic = 3; scrollToTop()" class="next-button">➡️ Next</button>
          </div>
        </div>
        <div v-if="selectedTopic === 3" class="content-box" v-show="selectedTopic === 3">
          <h5 @click="toggleTopic(3)" class="clickable-title">
           {{ selectedTopic === 3 ? "" : "" }}
          </h5>
          <div v-if="selectedTopic === 3">
            <div class="problem-box">
             <div class="guide-box">
                <h5>5. A Search Algorithm:</h5>
               <p><strong>Type:</strong> Heuristic-based search</p>
                <p><strong>Data Structure:</strong> Graphs, Trees</p>
                <p><strong>Approach: </strong> It uses both the actual cost from the start node to the current node (g(n)) and a heuristic estimate of the cost to the goal node (h(n)) to guide its search..</p>
                <p><strong>Example Use Case:</strong> Pathfinding in games, navigation systems.</p>
              </div>
              
              <div class="guide-box">
                <h5>Pseudocode:</h5>
                <pre><code>def a_star(start, goal):
    open_list = [start]
    closed_list = set()
    g_costs = {start: 0}
    f_costs = {start: heuristic(start, goal)}
    
    while open_list:
    current = min(open_list, key=lambda x: f_costs[x])
    if current == goal:
        return reconstruct_path(current)
        
        open_list.remove(current)
        closed_list.add(current)
        
        for neighbor in neighbors(current):
            if neighbor in closed_list:
                continue
tentative_g_cost = g_costs[current] + distance(current, neighbor)
            if neighbor not in open_list:
                open_list.append(neighbor)
elif tentative_g_cost >= g_costs.get(neighbor, float('inf')):
                continue
            
            g_costs[neighbor] = tentative_g_cost
f_costs[neighbor] = g_costs[neighbor] + heuristic(neighbor, goal)
</code></pre>

              </div>
              <div class="guide-box">
                <h5>6. Jump Search:</h5>
                <p><strong>Type:</strong> Search for sorted data</p>
                <p><strong>Data Structure:</strong> Sorted Arrays</p>
                <p><strong>Approach:</strong> Jump search works by jumping ahead by a fixed number of elements, then performing a linear search between the last jump and the current position.</p>
              </div>
              <div class="guide-box">
                <h5>Pseudocode:</h5>
                <pre><code>def jump_search(arr, target):
    n = len(arr)
    block_size = int(n ** 0.5)
    i = 0
    while i * block_size &lt; n and arr[min(i * block_size, n-1)] &lt; target:
        i += 1
    start = i * block_size
    end = min((i + 1) * block_size, n)
    for j in range(start, end):
        if arr[j] == target:
            return j
    return -1  # Target not found</code></pre>
              </div>
              <div class="guide-box">
                <h5>7. Exponential Search:</h5>
                <p><strong>Type:</strong> Search for sorted data</p>
                <p><strong>Data Structure:</strong> Sorted Arrays</p>
                <p><strong>Approach:</strong> Exponential search is used to find the range in which the target value lies, and then it applies binary search to the range. This is useful when the size of the array is unknown or very large.</p>
              </div>
              <div class="guide-box">
                <h5>Pseudocode:</h5>
                <pre><code>def exponential_search(arr, target):
    if arr[0] == target:
        return 0
    i = 1
    n = len(arr)
    while i &lt; n and arr[i] &lt;= target:
        i *= 2
    return binary_search(arr, target, i//2, min(i, n))</code></pre>
              </div>
              <div class="guide-box">
                <h5>8. Interpolation Search:</h5>
                <p><strong>Type:</strong> Search for sorted data</p>
                <p><strong>Data Structure:</strong> Sorted Arrays</p>
                <p><strong>Approach:</strong> Interpolation search improves upon binary search by trying to estimate where the target might be located based on the values of the elements.</p>
              </div>
              <div class="guide-box">
                <h5>Pseudocode:</h5>
                <pre><code>def interpolation_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low &lt;= high and target >= arr[low] and target &lt;= arr[high]:
        if low == high:
            if arr[low] == target:
                return low
            return -1
        pos = low + ((target - arr[low]) * (high - low)) // (arr[high] - arr[low])
        if arr[pos] == target:
            return pos
        if arr[pos] &lt; target:
            low = pos + 1
        else:
            high = pos - 1
    return -1  # Target not found</code></pre>
              </div>
            </div>
            <button @click="goToSearchMasteryQuiz" class="next-button">➡️ Next</button>
          </div>
        </div>
      </div>
      <div v-else-if="showImplication" class="content-box">
        <div class="problem-box">
          <h5 style="text-align: center;">Types of Algorithms</h5>
          <div class="guide-box">
            <strong>1. Sorting Algorithms:</strong> These algorithms arrange a collection of items in a specific order (e.g., ascending or descending).<br>
            Example: Bubble Sort, Quick Sort, Merge Sort.
            <img src="/images/bubblesort.webp" alt="Bubble Sort" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            <img src="/images/Quicksort.png" alt="Quick Sort" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            <img src="/images/merge.png" alt="Merge Sort" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
          
          </div>
          <div class="guide-box">
            <strong>2. Search Algorithms:</strong> These are designed to find specific items in a collection of data.<br>
            Example: Linear Search, Binary Search.
            <img src="/images/Linears.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            <img src="/images/binnarys.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
          </div>
          <div class="guide-box">
            <strong>3. Graph Algorithms:</strong> These algorithms work with graphs, which consist of nodes (vertices) connected by edges. They are used to solve problems related to networks, such as finding the shortest path between two nodes.<br>
            Example: Dijkstra's Algorithm, A* Algorithm, Depth-First Search (DFS), Breadth-First Search (BFS).
            <img src="/images/dij.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;"><br>
            <strong>Depth-First Search (DFS), Breadth-First Search (BFS).</strong>
            <img src="/images/bfsdfss.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
          
          </div>
          <div class="guide-box">
            <strong>4. Dynamic Programming Algorithms:</strong> These break down complex problems into smaller overlapping subproblems, solving each subproblem once and storing the solution for reuse.<br>
            Example: Fibonacci Sequence, Longest Common Subsequence (LCS).
            <img src="/images/fibu.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
          
          </div>
          <div class="guide-box">
            <strong>5. Greedy Algorithms:</strong> These make the best possible choice at each step, hoping that these local solutions will lead to a global optimum.<br>
            Example: Dijkstra's Algorithm (for shortest paths), Knapsack Problem.
            <img src="/images/dij.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            <img src="/images/Knapsack.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
          </div>
          <div class="guide-box">
            <strong>6. Divide and Conquer Algorithms:</strong> These solve problems by breaking them into smaller subproblems, solving each subproblem, and then combining the results.<br>
            Example: Merge Sort, Quick Sort.<br>
             <strong>Merge Sort</strong>
            <img src="/images/mergesort.png" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            <strong>Quick Sort</strong>
            <img src="/images/Quickkkk.png" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
          </div>
          <div class="guide-box">
            <strong>7. Backtracking Algorithms:</strong> These explore all possible solutions to a problem by building a solution incrementally and abandoning the path when it is determined to be unfeasible.<br>
            Example: N-Queens Problem, Sudoku Solver.
            <img src="/images/nqueen.png" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;"><br>
            <strong> Sudoku Solver</strong>
            <img src="/images/Suduko.webp" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
          </div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <button @click="goToLawMastery" class="next-button">➡️ Next: Identify the Algorithm</button>
        </div>
      </div>
      <!-- ✅ Algorithm Identification Quiz -->
      <div v-else-if="showLawMastery" class="content-box">
        <h3>Algorithm Identification Quiz</h3>
        <div class="score-container">
          <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ lawScore }}/{{ lawQuizzes.length }}</p>
        </div>
        <div v-for="(quiz, index) in lawQuizzes" :key="index" class="problem-box">
          <h4>Mastery Quiz {{ index + 1 }}</h4>
          <p><strong>Identify the algorithm shown in the image:</strong></p>
          <img :src="quiz.image" alt="Algorithm Image" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
          <input
            v-model="lawAnswers[index]"
            placeholder="Type the name of the algorithm here"
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
      <!-- ✅ Simple Algorithm Mastery Quiz -->
      <div v-else-if="showDerivedMastery" class="content-box">
        <h3>Simple Algorithm Mastery Quiz</h3>
        <div class="score-container">
          <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ derivedScore }} / 10</p>
        </div>
        <div v-for="(quiz, index) in derivedQuizzes" :key="index" class="problem-box">
          <h4>Quiz {{ index + 1 }}</h4>
          <p><strong>{{ quiz.question }}</strong></p>
          <input
            v-model="derivedAnswers[index]"
            placeholder="Type your answer here"
            class="answer-input"
          />
          <button @click="checkDerived(index)" :disabled="derivedChecked[index] >= 2" class="submit-button">CHECK ANSWER</button>
          <div v-if="derivedFeedbacks[index]" class="result-box">
            <p>{{ derivedFeedbacks[index] }}</p>
          </div>
          <div v-if="currentDerivedMessage" class="fade-message">{{ currentDerivedMessage }}</div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <button @click="backToDerivedMastery" class="next-button">⬅️ Back to Lesson</button>
        </div>
      </div>
      <!-- ✅ Classes of Search Algorithm Mastery Quiz -->
      <div v-else-if="showSearchMastery" class="content-box">
        <h3>Classes of Search Algorithm Mastery Quiz</h3>
        <div class="score-container">
          <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ searchScore }} / {{ searchQuizzes.length }}</p>
        </div>
        <div v-for="(quiz, index) in searchQuizzes" :key="index" class="problem-box">
          <h4>Quiz {{ index + 1 }}</h4>
          <p><strong>{{ quiz.question }}</strong></p>
          <input
            v-model="searchAnswers[index]"
            placeholder="Type your answer here"
            class="answer-input"
          />
          <button @click="checkSearch(index)" :disabled="searchChecked[index] >= 2" class="submit-button">CHECK ANSWER</button>
          <div v-if="searchFeedbacks[index]" class="result-box">
            <p>{{ searchFeedbacks[index] }}</p>
          </div>
          <div v-if="currentSearchMessage" class="fade-message">{{ currentSearchMessage }}</div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <button @click="backToSearchMastery" class="next-button">⬅️ Back to Lesson</button>
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
      showImplication: false,
      showLawMastery: false,
      // Interactive Demo Data
      demoArrayInput: '',
      demoTarget: '',
      demoResults: [],
      demoFound: false,
      demoFoundIndex: -1,
      lawQuizzes: [
        {
          image: "/images/bubblesortquiz.jpg",
          answer: "Bubble Sort",
          explanation: "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
        },
        {
          image: "/images/Quicksortquiz.png",
          answer: "Quick Sort",
          explanation: "Quick Sort is a divide-and-conquer algorithm that selects a pivot and partitions the array around it."
        },
        {
          image: "/images/Linearquiz.jpg",
          answer: "Linear Search",
          explanation: "Linear Search sequentially checks each element of the list until a match is found."
        },
        {
          image: "/images/binnaryquiz.jpg",
          answer: "Binary Search",
          explanation: "Binary Search works on sorted arrays by repeatedly dividing the search interval in half."
        },
        {
          image: "/images/mergesortquiz.png",
          answer: "Merge Sort",
          explanation: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves."
        }
      ],
      lawAnswers: [],
      lawFeedbacks: [],
      lawScore: 0,
      lawChecked: [],
      currentLawMessage: '',
      // ✅ SIMPLE ALGORITHM MASTERY QUIZ DATA
      showDerivedMastery: false,
      derivedQuizzes: [
        {
          question: "Enumerate What makes an algorithm:",
          answer: "Input, Process, Output",
          explanation: "The three main components are Input (data provided), Process (steps to transform), Output (result produced)."
        },
        {
          question: "Enumerate 4 common types of algorithms.",
          answer: "Sorting, Search, Graph, Machine Learning",
          explanation: "Common types include Sorting Algorithms, Search Algorithms, Graph Algorithms, and Machine Learning Algorithms."
        },
        {
          question: "The data or information provided to the algorithm.",
          answer: "input",
          explanation: "This is the definition of Input."
        },
        {
          question: "The final result produced after the algorithm has been applied to the input.",
          answer: "output",
          explanation: "This is the definition of Output."
        },
        {
          question: "The series of steps or rules that transform the input into output.",
          answer: "process",
          explanation: "This is the definition of Process."
        }
      ],
      derivedAnswers: [],
      derivedFeedbacks: [],
      derivedChecked: [],
      derivedScore: 0,
      derivedQuestionScores: [],
      currentDerivedMessage: '',
      // ✅ CLASSES OF SEARCH ALGORITHM MASTERY QUIZ DATA
      showSearchMastery: false,
      searchQuizzes: [
        {
          question: "Which search algorithm is the unstructured search?",
          answer: "Linear Search",
          explanation: "Linear Search is an unstructured search that checks each element sequentially in an unsorted list."
        },
        {
          question: "Which search algorithm explores as far down a branch of the graph or tree as possible before backtracking?",
          answer: "Depth-First Search (DFS)",
          explanation: "DFS explores as far down a branch of the graph or tree as possible before backtracking."
        },
        {
          question: "Which search algorithm is used to find the range in which the target value lies, and then it applies binary search to the range?",
          answer: "Exponential Search",
          explanation: "Exponential search is used to find the range in which the target value lies, and then it applies binary search to the range."
        },
        {
          question: "Which search algorithm works by jumping ahead by a fixed number of elements, then performing a linear search between the last jump and the current position?",
          answer: "Jump Search",
          explanation: "Jump search works by jumping ahead by a fixed number of elements, then performing a linear search between the last jump and the current position."
        },
        {
          question: "Which search algorithm uses both the actual cost from the start node to the current node (g(n)) and a heuristic estimate of the cost to the goal node (h(n)) to guide its search?",
          answer: "A* Search",
          explanation: "A* Search uses both the actual cost g(n) and heuristic h(n) to guide its search."
        }
      ],
      searchAnswers: [],
      searchFeedbacks: [],
      searchChecked: [],
      searchScore: 0,
      currentSearchMessage: '',
      topics: [
        { title: "Algorithm", content: "Algorithm is a sequence of steps or instructions designed to perform a task or solve a problem..<br><br>It's essentially a blueprint for how to approach a specific challenge, and it can be implemented in various programming languages.." },
        { title: "Simple Algorithm", content: "Simple algorithms form the foundation of computational thinking, involving clear, sequential steps to achieve a goal." },
        { title: "Classes of Search Algorithm", content: "Search algorithms are techniques used to find specific elements or solutions within data structures, such as arrays, lists, graphs, or trees.<br><br>They are essential for efficient data retrieval and problem-solving in computing." }
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
      this.showImplication = false;
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
    // Interactive Demo Methods
    runLinearSearchDemo() {
      const arrayStr = this.demoArrayInput.trim();
      if (!arrayStr || !this.demoTarget) {
        alert('Please enter both array and target.');
        return;
      }
      const arr = arrayStr.split(',').map(num => parseInt(num.trim())).filter(n => !isNaN(n));
      if (arr.length === 0) {
        alert('Please enter a valid array of numbers.');
        return;
      }
      const target = parseInt(this.demoTarget);
      this.demoResults = [];
      let found = false;
      let foundIndex = -1;
      for (let i = 0; i < arr.length; i++) {
        const message = arr[i] === target ? 'Match found!' : 'No match, continue.';
        this.demoResults.push({ index: i, value: arr[i], message });
        if (arr[i] === target) {
          found = true;
          foundIndex = i;
          break;
        }
      }
      if (!found) {
        this.demoResults.push({ index: arr.length, value: null, message: 'End of array reached.' });
      }
      this.demoFound = found;
      this.demoFoundIndex = foundIndex;
    },
    resetDemo() {
      this.demoArrayInput = '';
      this.demoTarget = '';
      this.demoResults = [];
      this.demoFound = false;
      this.demoFoundIndex = -1;
    },
    backToMainLesson() {
      this.showLawMastery = false;
      this.showDerivedMastery = false;
      this.lawAnswers = [];
      this.lawFeedbacks = [];
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
      this.derivedAnswers = new Array(this.derivedQuizzes.length).fill("");
      this.derivedFeedbacks = new Array(this.derivedQuizzes.length).fill("");
      this.derivedChecked = new Array(this.derivedQuizzes.length).fill(0);
      this.derivedQuestionScores = new Array(this.derivedQuizzes.length).fill(0);
      this.derivedScore = 0;
      this.scrollToTop();
    },
    checkDerived(index) {
      const userAnswer = this.derivedAnswers[index].trim();
      if (!userAnswer) {
        this.derivedFeedbacks[index] = "Please type your answer";
        return;
      }
      const currentChecked = this.derivedChecked[index] || 0;
      const explanation = this.derivedQuizzes[index].explanation;
      let points = 0;
      let feedback = '';
      const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 0);
      const oldPoints = this.derivedQuestionScores[index] || 0;
      if (index === 0) {
        const correctParts = ["input", "process", "output"];
        const userWords = normalize(userAnswer);
        let matchedCount = 0;
        correctParts.forEach(part => {
          if (userWords.some(word => word.includes(part) || part.includes(word))) {
            matchedCount++;
          }
        });
        points = matchedCount;
        if (points > oldPoints) {
          this.derivedScore += (points - oldPoints);
          this.derivedQuestionScores[index] = points;
        }
        if (currentChecked === 0) {
          if (points === 3) {
            feedback = `✅ Correct! ${explanation}`;
            this.currentDerivedMessage = `Great! You earned 3 points for this question.`;
            setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
          } else {
            feedback = `👍 You got ${points}/3 correct. Try again for full credit!`;
          }
          this.derivedChecked[index] = 1;
        } else {
          if (points === 3) {
            feedback = `✅ Correct! ${explanation}`;
            this.currentDerivedMessage = `Great! You earned 3 points for this question.`;
            setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
          } else {
            feedback = `You got ${points}/3. Full answer: Input, Process, Output. ${explanation}`;
          }
          this.derivedChecked[index] = 2;
        }
      } else if (index === 1) {
        const correctParts = ["sorting", "search", "graph", "machine learning"];
        const userWords = normalize(userAnswer);
        let matchedCount = 0;
        correctParts.forEach(part => {
          const partWords = part.split(' ');
          const allMatched = partWords.every(pw => userWords.some(uw => uw === pw || uw.includes(pw) || pw.includes(uw)));
          if (allMatched) {
            matchedCount++;
          }
        });
        points = matchedCount;
        if (points > oldPoints) {
          this.derivedScore += (points - oldPoints);
          this.derivedQuestionScores[index] = points;
        }
        if (currentChecked === 0) {
          if (points === 4) {
            feedback = `✅ Correct! ${explanation}`;
            this.currentDerivedMessage = `Great! You earned 4 points for this question.`;
            setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
          } else {
            feedback = `👍 You got ${points}/4 correct. Try again for full credit!`;
          }
          this.derivedChecked[index] = 1;
        } else {
          if (points === 4) {
            feedback = `✅ Correct! ${explanation}`;
            this.currentDerivedMessage = `Great! You earned 4 points for this question.`;
            setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
          } else {
            feedback = `You got ${points}/4. Full answer: Sorting, Search, Graph, Machine Learning. ${explanation}`;
          }
          this.derivedChecked[index] = 2;
        }
      } else {
        const correct = this.derivedQuizzes[index].answer;
        const correctWords = normalize(correct);
        const userWords = normalize(userAnswer);
        const isCorrect = userWords.length > 0 && correctWords.every(cw => userWords.some(uw => uw === cw || uw.includes(cw) || cw.includes(uw)));
        points = isCorrect ? 1 : 0;
        if (points > oldPoints) {
          this.derivedScore += (points - oldPoints);
          this.derivedQuestionScores[index] = points;
        }
        if (isCorrect) {
          feedback = `✅ Correct! ${explanation}`;
          this.currentDerivedMessage = `You have ${this.derivedScore} point${this.derivedScore > 1 ? 's' : ''}!`;
          setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
          this.derivedChecked[index] = 2;
        } else {
          if (currentChecked === 0) {
            feedback = "❌ Incorrect. Try again.";
            this.derivedChecked[index] = 1;
          } else {
            feedback = `❌ Incorrect. The correct answer is: ${correct}. ${explanation}`;
            this.derivedChecked[index] = 2;
          }
        }
      }
      this.derivedFeedbacks[index] = feedback;
    },
    backToDerivedMastery() {
      this.showDerivedMastery = false;
      this.selectedTopic = null;
    },
    // ✅ SEARCH MASTERY QUIZ METHODS
    goToSearchMasteryQuiz() {
      this.showSearchMastery = true;
      this.searchAnswers = new Array(this.searchQuizzes.length).fill("");
      this.searchFeedbacks = new Array(this.searchQuizzes.length).fill("");
      this.searchChecked = new Array(this.searchQuizzes.length).fill(0);
      this.searchScore = 0;
      this.scrollToTop();
    },
    checkSearch(index) {
      const userAnswer = this.searchAnswers[index].trim();
      if (!userAnswer) {
        this.searchFeedbacks[index] = "Please type your answer";
        return;
      }
      const currentChecked = this.searchChecked[index] || 0;
      const correct = this.searchQuizzes[index].answer;
      const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 0);
      const correctWords = normalize(correct);
      const userWords = normalize(userAnswer);
      const isCorrect = userWords.length > 0 && correctWords.every(cw => userWords.some(uw => uw === cw || uw.includes(cw) || cw.includes(uw)));
      if (isCorrect) {
        if (this.searchChecked[index] < 2) {
          this.searchScore++;
        }
        this.searchFeedbacks[index] = `✅ Correct! ${this.searchQuizzes[index].explanation}`;
        this.currentSearchMessage = `You have ${this.searchScore} point${this.searchScore > 1 ? 's' : ''}!`;
        setTimeout(() => { this.currentSearchMessage = ''; }, 3000);
        this.searchChecked[index] = 2;
      } else {
        if (currentChecked === 0) {
          this.searchFeedbacks[index] = "❌ Incorrect. Try again.";
          this.searchChecked[index] = 1;
        } else {
          this.searchFeedbacks[index] = `❌ Incorrect. The correct answer is: ${correct}. ${this.searchQuizzes[index].explanation}`;
          this.searchChecked[index] = 2;
        }
      }
    },
    backToSearchMastery() {
      this.showSearchMastery = false;
      this.selectedTopic = null;
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