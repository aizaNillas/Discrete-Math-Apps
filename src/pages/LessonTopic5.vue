<template>
  <div class="lesson-container">
    <!-- ✅ Pre-Test Section - Only show if not completed in this session -->
    <div v-if="!preTestCompleted && !hasTakenPreTestInSession" class="pretest-container">
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
        <h5 class="title">📚 Algorithm</h5>
        
        <!-- Normal Lesson View -->
        <div v-if="!showImplication && !showDerivedMastery && !showLawMastery && !showSearchMastery">
          <div v-for="(topic, index) in topics" :key="index" class="content-box" v-show="selectedTopic === null || selectedTopic === index">
            <h5 @click="toggleTopic(index)" class="clickable-title">
              {{ topic.title }} {{ selectedTopic === index ? "" : "" }}
            </h5>
            <div v-if="selectedTopic === index">
              <div class="guide-box definition-box">
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
              
              <!-- Topic 0: Algorithm Basics -->
              <div v-if="index === 0" class="problem-box">
                <h4 style="text-align: center;">Key Aspects of an Algorithm</h4>
                <div class="guide-box definition-box">
                  1. Input: The data you provide to the algorithm for processing.
                </div>
                <div class="guide-box definition-box">
                  2. Output: The result produced by the algorithm after processing the input.
                </div>
                <div class="guide-box definition-box">
                  3. Finiteness: An algorithm must eventually halt after a finite number of steps.
                </div>
                <div class="guide-box definition-box">
                  4. Unambiguity: Each step should be clear and precise.
                </div>
                <div class="guide-box definition-box">
                  5. Effectiveness: The steps should be basic enough to be carried out, in principle, by a human or computer.
                </div>
                <img src="/images/algo.png" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
              </div>
              <button v-if="index === 0" @click="showImplication = true; scrollToTop()" class="next-button">➡️ Next</button>
              
              <!-- Topic 1: Simple Algorithm -->
              <div v-if="index === 1" class="problem-box">
                <h4>Examples of Simple Algorithms</h4>
                <div class="guide-box definition-box">
                  <p>1. Linear Search: a searching method where each item in a list is checked one by one from the beginning until the target value is found or the list ends.</p>
                </div>
                <div class="guide-box definition-box">
                  <h5>Steps of the Linear Search Algorithm:</h5>
                  <ol>
                    <li>Start from the first element of the array.</li>
                    <li>Compare the current element with the target element.</li>
                    <li>If they match, return the index of the current element.</li>
                    <li>If not, move to the next element and repeat the comparison.</li>
                    <li>If you reach the end of the array without finding the target, return "not found".</li>
                  </ol>
                </div>
                <div class="guide-box definition-box">
                  <h5>Pseudocode with Output:</h5>
                  <div class="pseudocode-container">
                    <pre><code>function linearSearch(arr, target):
    for i = 0 to length(arr) - 1:
        if arr[i] == target:
            return i          # Output: Index where target found
    return "Not found"        # Output: Target not found

# Example Input: arr = [10, 20, 30, 40, 50], target = 30
# Expected Output: 2 (index of 30)</code></pre>
                  </div>
                </div>
                
                <!-- Interactive Demo for Simple Algorithm -->
                <div class="problem-box">
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
                
                <div class="guide-box definition-box">
                  <p>2. Computer Algorithm: A computer algorithm is a step-by-step procedure or set of rules that are followed to solve a specific problem or task.</p>
                </div>
                <div class="guide-box definition-box">
                  <h5>What makes an algorithm:</h5>
                  <ol>
                    <li>Input: The data or information provided to the algorithm.</li>
                    <li>Process: The series of steps or rules that transform the input into output.</li>
                    <li>Output: The final result produced after the algorithm has been applied to the input.</li>
                  </ol>
                </div>
                <img src="/images/inputp.webp" alt="What makes an algorithm" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                
                <div class="guide-box definition-box">
                  <h5>Characteristics of a Good Algorithm:</h5>
                  <ul>
                    <li>Correctness: It should provide the correct solution for all possible inputs.</li>
                    <li>Efficiency: The algorithm should use the least amount of resources (time, space) necessary to complete the task.</li>
                    <li>Clarity: The steps should be easy to understand and follow.</li>
                    <li>Finiteness: It should terminate after a finite number of steps.</li>
                  </ul>
                </div>
                
                <div class="guide-box definition-box">
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
              
              <!-- Topic 2: Classes of Search Algorithm -->
              <div v-if="index === 2" class="problem-box">
                <h4>Classes of Search Algorithm</h4>
                <div class="guide-box definition-box">
                  <p>Search algorithms are techniques used to find specific elements or solutions within data structures, such as arrays, lists, graphs, or trees.</p>
                </div>
                
                <!-- 1. Linear Search -->
                <div class="guide-box definition-box">
                  <h5>1. Linear Search</h5>
                  <p><strong>Type:</strong> Unstructured search</p>
                  <p><strong>Data Structure:</strong> Arrays, Lists (can be unsorted)</p>
                  <p><strong>Example Use Case:</strong> Searching for a specific item in an unsorted list.</p>
                  <div class="pseudocode-container">
                    <h6>Pseudocode with Output:</h6>
                    <pre><code>def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i          # Output: Index of found element
    return -1                # Output: -1 if not found

# Example Input: arr = [4, 2, 7, 1, 9], target = 7
# Expected Output: 2 (index of 7)</code></pre>
                  </div>
                </div>
                
                <!-- 2. Binary Search -->
                <div class="guide-box definition-box">
                  <h5>2. Binary Search:</h5>
                  <p><strong>Type:</strong> Efficient search for sorted data</p>
                  <p><strong>Data Structure:</strong> Sorted Arrays or Lists</p>
                  <p><strong>Example Use Case:</strong> Searching for an element in a sorted array or list.</p>
                  <div class="pseudocode-container">
                    <h6>Pseudocode with Output:</h6>
                    <pre><code>def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid        # Output: Index of found element
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1                # Output: -1 if not found

# Example Input: arr = [1, 3, 5, 7, 9], target = 5
# Expected Output: 2 (index of 5)</code></pre>
                  </div>
                </div>
                
                <!-- 3. Depth-First Search (DFS) -->
                <div class="guide-box definition-box">
                  <h5>3. Depth-First Search (DFS):</h5>
                  <p><strong>Type:</strong> Graph and Tree Search</p>
                  <p><strong>Data Structure:</strong> Graphs, Trees</p>
                  <p><strong>• Approach: </strong> DFS explores as far down a branch of the graph or tree as possible before backtracking.</p>
                  <p><strong>Example Use Case:</strong> Traversing a tree or graph to find a path or solve a puzzle (like a maze).</p>
                  <div class="pseudocode-container">
                    <h6>Pseudocode (recursive version) with Output:</h6>
                    <pre><code>def dfs(graph, node, visited):
    if node not in visited:
        print(node)          # Output: Node being visited
        visited.add(node)
        for neighbor in graph[node]:
            dfs(graph, neighbor, visited)

# Example Input: graph = {0: [1, 2], 1: [2], 2: [0, 3], 3: [3]}, start = 2
# Expected Output: 2 0 1 3 (DFS traversal order)</code></pre>
                  </div>
                </div>
                
                <!-- 4. Breadth-First Search (BFS) -->
                <div class="guide-box definition-box">
                  <h5>4. Breadth-First Search (BFS):</h5>
                  <p><strong>Type:</strong> Graph and Tree Search</p>
                  <p><strong>Data Structure:</strong> Graphs, Trees</p>
                  <p><strong>Approach: </strong> BFS explores the graph level by level, starting from the root (or a given node).</p>
                  <p><strong>Example Use Case:</strong> Finding the shortest path in an unweighted graph.</p>
                  <div class="pseudocode-container">
                    <h6>Pseudocode with Output:</h6>
                    <pre><code>from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node not in visited:
            print(node)          # Output: Node being visited
            visited.add(node)
            for neighbor in graph[node]:
                queue.append(neighbor)

# Example Input: graph = {0: [1, 2], 1: [2], 2: [0, 3], 3: [3]}, start = 2
# Expected Output: 2 0 3 1 (BFS traversal order)</code></pre>
                  </div>
                </div>
              </div>
              <button v-if="index === 2" @click="selectedTopic = 3; scrollToTop()" class="next-button">➡️ Next</button>
            </div>
          </div>
          
          <!-- Topic 3: More Search Algorithms -->
          <div v-if="selectedTopic === 3" class="content-box" v-show="selectedTopic === 3">
            <h5 @click="toggleTopic(3)" class="clickable-title">
             {{ selectedTopic === 3 ? "" : "" }}
            </h5>
            <div v-if="selectedTopic === 3">
              <div class="problem-box">
                <!-- 5. A* Search Algorithm -->
                <div class="guide-box definition-box">
                  <h5>5. A* Search Algorithm:</h5>
                  <p><strong>Type:</strong> Heuristic-based search</p>
                  <p><strong>Data Structure:</strong> Graphs, Trees</p>
                  <p><strong>Approach: </strong> It uses both the actual cost from the start node to the current node (g(n)) and a heuristic estimate of the cost to the goal node (h(n)) to guide its search.</p>
                  <p><strong>Example Use Case:</strong> Pathfinding in games, navigation systems.</p>
                  <div class="pseudocode-container">
                    <h6>Pseudocode with Output:</h6>
                    <pre><code>def a_star(start, goal):
    open_list = [start]
    closed_list = set()
    g_costs = {start: 0}
    f_costs = {start: heuristic(start, goal)}
    
    while open_list:
        current = min(open_list, key=lambda x: f_costs[x])
        if current == goal:
            return reconstruct_path(current)  # Output: Path from start to goal
        
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
    
    return None  # Output: None if no path found

# Example Input: Grid with obstacles, start = (0,0), goal = (4,4)
# Expected Output: [(0,0), (1,1), (2,2), (3,3), (4,4)] (shortest path)</code></pre>
                  </div>
                </div>
                
                <!-- 6. Jump Search -->
                <div class="guide-box definition-box">
                  <h5>6. Jump Search:</h5>
                  <p><strong>Type:</strong> Search for sorted data</p>
                  <p><strong>Data Structure:</strong> Sorted Arrays</p>
                  <p><strong>Approach:</strong> Jump search works by jumping ahead by a fixed number of elements, then performing a linear search between the last jump and the current position.</p>
                  <div class="pseudocode-container">
                    <h6>Pseudocode with Output:</h6>
                    <pre><code>def jump_search(arr, target):
    n = len(arr)
    block_size = int(n ** 0.5)
    i = 0
    while i * block_size < n and arr[min(i * block_size, n-1)] < target:
        i += 1
    start = i * block_size
    end = min((i + 1) * block_size, n)
    for j in range(start, end):
        if arr[j] == target:
            return j          # Output: Index of found element
    return -1                # Output: -1 if not found

# Example Input: arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], target = 5
# Expected Output: 5 (index of 5)</code></pre>
                  </div>
                </div>
                
                <!-- 7. Exponential Search -->
                <div class="guide-box definition-box">
                  <h5>7. Exponential Search:</h5>
                  <p><strong>Type:</strong> Search for sorted data</p>
                  <p><strong>Data Structure:</strong> Sorted Arrays</p>
                  <p><strong>Approach:</strong> Exponential search is used to find the range in which the target value lies, and then it applies binary search to the range. This is useful when the size of the array is unknown or very large.</p>
                  <div class="pseudocode-container">
                    <h6>Pseudocode with Output:</h6>
                    <pre><code>def exponential_search(arr, target):
    if arr[0] == target:
        return 0              # Output: 0 if first element matches
    i = 1
    n = len(arr)
    while i < n and arr[i] <= target:
        i *= 2
    return binary_search(arr, target, i//2, min(i, n))
    # Output: Index from binary search or -1

def binary_search(arr, target, low, high):
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid        # Output: Index of found element
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1                # Output: -1 if not found

# Example Input: arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 7
# Expected Output: 6 (index of 7)</code></pre>
                  </div>
                </div>
                
                <!-- 8. Interpolation Search -->
                <div class="guide-box definition-box">
                  <h5>8. Interpolation Search:</h5>
                  <p><strong>Type:</strong> Search for sorted data</p>
                  <p><strong>Data Structure:</strong> Sorted Arrays</p>
                  <p><strong>Approach:</strong> Interpolation search improves upon binary search by trying to estimate where the target might be located based on the values of the elements.</p>
                  <div class="pseudocode-container">
                    <h6>Pseudocode with Output:</h6>
                    <pre><code>def interpolation_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high and target >= arr[low] and target <= arr[high]:
        if low == high:
            if arr[low] == target:
                return low    # Output: Index if found
            return -1         # Output: -1 if not found
        pos = low + ((target - arr[low]) * (high - low)) // (arr[high] - arr[low])
        if arr[pos] == target:
            return pos        # Output: Index of found element
        if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1                # Output: -1 if not found

# Example Input: arr = [10, 20, 30, 40, 50, 60, 70, 80, 90], target = 50
# Expected Output: 4 (index of 50)</code></pre>
                  </div>
                </div>
              </div>
              <button @click="goToSearchMasteryQuiz" class="next-button">➡️ Next</button>
            </div>
          </div>
        </div>
        
        <!-- Types of Algorithms Section -->
        <div v-else-if="showImplication" class="content-box">
          <div class="problem-box">
            <h5 style="text-align: center;">Types of Algorithms</h5>
            <div class="guide-box definition-box">
              <strong>1. Sorting Algorithms:</strong> These algorithms arrange a collection of items in a specific order (e.g., ascending or descending).<br>
              Example: Bubble Sort, Quick Sort, Merge Sort.
              <img src="/images/bubblesort.webp" alt="Bubble Sort" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
              <img src="/images/Quicksort.png" alt="Quick Sort" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
              <img src="/images/merge.png" alt="Merge Sort" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            </div>
            <div class="guide-box definition-box">
              <strong>2. Search Algorithms:</strong> These are designed to find specific items in a collection of data.<br>
              Example: Linear Search, Binary Search.
              <img src="/images/Linears.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
              <img src="/images/binnarys.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            </div>
            <div class="guide-box definition-box">
              <strong>3. Graph Algorithms:</strong> These algorithms work with graphs, which consist of nodes (vertices) connected by edges. They are used to solve problems related to networks, such as finding the shortest path between two nodes.<br>
              Example: Dijkstra's Algorithm, A* Algorithm, Depth-First Search (DFS), Breadth-First Search (BFS).
              <img src="/images/dij.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;"><br>
              <strong>Depth-First Search (DFS), Breadth-First Search (BFS).</strong>
              <img src="/images/bfsdfss.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            </div>
            <div class="guide-box definition-box">
              <strong>4. Dynamic Programming Algorithms:</strong> These break down complex problems into smaller overlapping subproblems, solving each subproblem once and storing the solution for reuse.<br>
              Example: Fibonacci Sequence, Longest Common Subsequence (LCS).
              <img src="/images/fibu.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            </div>
            <div class="guide-box definition-box">
              <strong>5. Greedy Algorithms:</strong> These make the best possible choice at each step, hoping that these local solutions will lead to a global optimum.<br>
              Example: Dijkstra's Algorithm (for shortest paths), Knapsack Problem.
              <img src="/images/dij.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
              <img src="/images/Knapsack.jpg" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            </div>
            <div class="guide-box definition-box">
              <strong>6. Divide and Conquer Algorithms:</strong> These solve problems by breaking them into smaller subproblems, solving each subproblem, and then combining the results.<br>
              Example: Merge Sort, Quick Sort.<br>
              <strong>Merge Sort</strong>
              <img src="/images/mergesort.png" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
              <strong>Quick Sort</strong>
              <img src="/images/Quickkkk.png" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            </div>
            <div class="guide-box definition-box">
              <strong>7. Backtracking Algorithms:</strong> These explore all possible solutions to a problem by building a solution incrementally and abandoning the path when it is determined to be unfeasible.<br>
              Example: N-Queens Problem, Sudoku Solver.
              <img src="/images/nqueen.png" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;"><br>
              <strong> Sudoku Solver</strong>
              <img src="/images/Suduko.webp" alt="Algorithm Diagram" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            </div>
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <button @click="goToLawMastery" class="next-button">➡️ Next: Mastery Quiz</button>
          </div>
        </div>
        
        <!-- ✅ CAROUSEL: Algorithm Identification Quiz -->
        <div v-else-if="showLawMastery" class="content-box">
          <h5>Algorithm Identification Quiz</h5>
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
            <p><strong>Identify the algorithm shown in the image:</strong></p>
            <img :src="lawQuizzes[currentLawQuizIndex].image" alt="Algorithm Image" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            <input
              v-model="lawAnswers[currentLawQuizIndex]"
              placeholder="Type the name of the algorithm here"
              class="answer-input"
              @input="lawChecked[currentLawQuizIndex] = 0"
            />
            <button @click="checkLaw(currentLawQuizIndex)" :disabled="lawChecked[currentLawQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
            <div v-if="lawFeedbacks[currentLawQuizIndex]" class="result-box">
              <p>{{ lawFeedbacks[currentLawQuizIndex] }}</p>
            </div>
            <div v-if="currentLawMessage && currentLawQuizIndex === lastLawQuizWithMessage" class="fade-message">{{ currentLawMessage }}</div>
            
            <!-- Next Button - Only show if not on question 5 (index 4) -->
            <div class="carousel-controls" style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 20px;">
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
        
        <!-- ✅ CAROUSEL: Simple Algorithm Mastery Quiz -->
        <div v-else-if="showDerivedMastery" class="content-box">
          <h5>Simple Algorithm Mastery Quiz</h5>
          <div class="score-container">
            <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ derivedScore }} / 10</p>
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
            <p><strong>{{ derivedQuizzes[currentDerivedQuizIndex].question }}</strong></p>
            <input
              v-model="derivedAnswers[currentDerivedQuizIndex]"
              placeholder="Type your answer here"
              class="answer-input"
              @input="derivedChecked[currentDerivedQuizIndex] = 0"
            />
            <button @click="checkDerived(currentDerivedQuizIndex)" :disabled="derivedChecked[currentDerivedQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
            <div v-if="derivedFeedbacks[currentDerivedQuizIndex]" class="result-box">
              <p>{{ derivedFeedbacks[currentDerivedQuizIndex] }}</p>
            </div>
            <div v-if="currentDerivedMessage && currentDerivedQuizIndex === lastDerivedQuizWithMessage" class="fade-message">{{ currentDerivedMessage }}</div>
            
            <!-- Next Button - Only show if not on question 10 (index 9) but we only have 5 questions, so show only if not last -->
            <div class="carousel-controls" style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 20px;">
              <button v-if="currentDerivedQuizIndex !== 4" @click="nextDerivedQuiz" :disabled="!canProceedToNextDerivedQuiz" class="carousel-nav-btn">
                Next ➡️
              </button>
            </div>
            
            <!-- Completion Message -->
            <div v-if="isDerivedQuizComplete" class="completion-box" style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 10px; text-align: center;">
              <h4>🎉 Quiz Completed!</h4>
              <p>You scored {{ derivedScore }} out of 10.</p>
              <p v-if="derivedScore < 6" style="color: #dc3545; font-weight: bold;">
                ⚠️ You need a minimum score of 6/10 to proceed!
              </p>
              <button 
                @click="backToMainLesson" 
                :disabled="derivedScore < 6"
                class="next-button" 
                :style="derivedScore < 6 ? 'background: #cccccc; cursor: not-allowed;' : ''"
                style="margin-top: 10px;"
              >
                ⬅️ Back to Lesson
              </button>
              <p v-if="derivedScore < 6" style="color: #666; font-size: 14px; margin-top: 10px;">
                Please achieve at least 6 points to continue.
              </p>
            </div>
          </div>
        </div>
        
        <!-- ✅ CAROUSEL: Classes of Search Algorithm Mastery Quiz -->
        <div v-else-if="showSearchMastery" class="content-box">
          <h5>Classes of Search Algorithm Mastery Quiz</h5>
          <div class="score-container">
            <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ searchScore }} / {{ searchQuizzes.length }}</p>
          </div>
          
          <!-- Question Counter -->
          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
            <span style="margin: 0 20px; font-weight: bold; font-size: 18px;">
              Question {{ currentSearchQuizIndex + 1 }} of {{ searchQuizzes.length }}
            </span>
          </div>
          
          <!-- Current Quiz Display -->
          <div class="problem-box">
            <h4>Quiz {{ currentSearchQuizIndex + 1 }}</h4>
            <p><strong>{{ searchQuizzes[currentSearchQuizIndex].question }}</strong></p>
            <input
              v-model="searchAnswers[currentSearchQuizIndex]"
              placeholder="Type your answer here"
              class="answer-input"
              @input="searchChecked[currentSearchQuizIndex] = 0"
            />
            <button @click="checkSearch(currentSearchQuizIndex)" :disabled="searchChecked[currentSearchQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
            <div v-if="searchFeedbacks[currentSearchQuizIndex]" class="result-box">
              <p>{{ searchFeedbacks[currentSearchQuizIndex] }}</p>
            </div>
            <div v-if="currentSearchMessage && currentSearchQuizIndex === lastSearchQuizWithMessage" class="fade-message">{{ currentSearchMessage }}</div>
            
            <!-- Next Button - Only show if not on question 5 (index 4) -->
            <div class="carousel-controls" style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 20px;">
              <button v-if="currentSearchQuizIndex !== 4" @click="nextSearchQuiz" :disabled="!canProceedToNextSearchQuiz" class="carousel-nav-btn">
                Next ➡️
              </button>
            </div>
            
            <!-- Completion Message -->
            <div v-if="isSearchQuizComplete" class="completion-box" style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 10px; text-align: center;">
              <h4>🎉 Quiz Completed!</h4>
              <p>You scored {{ searchScore }} out of {{ searchQuizzes.length }}.</p>
              <p v-if="searchScore < searchQuizzes.length" style="color: #dc3545; font-weight: bold;">
                ⚠️ You need a perfect score ({{ searchQuizzes.length }}/{{ searchQuizzes.length }}) to proceed!
              </p>
              <button 
                @click="backToMainLesson" 
                :disabled="searchScore < searchQuizzes.length"
                class="next-button" 
                :style="searchScore < searchQuizzes.length ? 'background: #cccccc; cursor: not-allowed;' : ''"
                style="margin-top: 10px;"
              >
                ⬅️ Back to Lesson
              </button>
              <p v-if="searchScore < searchQuizzes.length" style="color: #666; font-size: 14px; margin-top: 10px;">
                Please achieve a perfect score ({{ searchQuizzes.length }}/{{ searchQuizzes.length }}) to continue.
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
        { question: "Which of the following is a graph traversal algorithm?", options: ["Linear Search", "DFS (Depth-First Search)", "Bubble Sort", "Merge Sort"], answer: "DFS (Depth-First Search)", explanation: "DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking." },
        { question: "In an undirected graph, edges have:", options: ["A specific direction", "No direction", "Weights only", "Multiple directions"], answer: "No direction", explanation: "Undirected graphs have edges without direction, meaning they can be traversed in both ways." },
        { question: "Which data structure does BFS (Breadth-First Search) primarily use?", options: ["Stack", "Queue", "Tree", "Array"], answer: "Queue", explanation: "BFS uses a queue to explore nodes level by level, ensuring shortest path in unweighted graphs." },
        { question: "What does the A* search algorithm use to guide its search?", options: ["Only the path cost g(n)", "Only the heuristic estimate h(n)", "Both g(n) and h(n)", "Random selection"], answer: "Both g(n) and h(n)", explanation: "A* combines the actual cost from start (g(n)) with the estimated cost to goal (h(n)) for efficient pathfinding." },
        { question: "Which search algorithm explores the graph level by level?", options: ["DFS", "BFS", "Linear Search", "Binary Search"], answer: "BFS", explanation: "BFS (Breadth-First Search) explores nodes level by level, starting from the source node." }
      ],
      selectedTopic: null,
      showSolution: Array(4).fill({ main: false, alt: false }),
      revealedSteps: Array(4).fill({ main: [], alt: [] }),
      viewedTopics: new Set(),
      showImplication: false,
      showLawMastery: false,
      currentLawQuizIndex: 0,
      lastLawQuizWithMessage: -1,
      currentDerivedQuizIndex: 0,
      lastDerivedQuizWithMessage: -1,
      currentSearchQuizIndex: 0,
      lastSearchQuizWithMessage: -1,
      demoArrayInput: '',
      demoTarget: '',
      demoResults: [],
      demoFound: false,
      demoFoundIndex: -1,
      lawQuizzes: [
        {
          question: "1. These algorithms arrange a collection of items in a specific order.",
          image: "/images/bubblesortquiz.jpg",
          answer: "Bubble Sort",
          explanation: "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
        },
        {
          question: "2. One example of Sorting Algorithms that also arrange a collection of items in a specific order.",
          image: "/images/Quicksortquiz.png",
          answer: "Quick Sort",
          explanation: "Quick Sort is a divide-and-conquer algorithm that selects a pivot and partitions the array around it."
        },
        {
          question: "3. These are designed to find specific items in a collection of data.",
          image: "/images/Linearquiz.jpg",
          answer: "Linear Search",
          explanation: "Linear Search sequentially checks each element of the list until a match is found."
        },
        {
          question: "4. An example of Search Algorithms that are designed to find specific items in a collection of data.",
          image: "/images/binnaryquiz.jpg",
          answer: "Binary Search",
          explanation: "Binary Search works on sorted arrays by repeatedly dividing the search interval in half."
        },
        {
          question: "5. An example of Divide and Conquer Algorithms that solve problems by breaking them into smaller subproblems, solving each subproblem, and then combining the results.",
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
    },
    canProceedToNextLawQuiz() {
      return this.lawChecked[this.currentLawQuizIndex] >= 2 || 
             (this.lawAnswers[this.currentLawQuizIndex] && this.lawAnswers[this.currentLawQuizIndex].trim() && this.lawChecked[this.currentLawQuizIndex] > 0);
    },
    isLawQuizComplete() {
      return this.currentLawQuizIndex === this.lawQuizzes.length - 1 && this.lawChecked[this.currentLawQuizIndex] >= 2;
    },
    canProceedToNextDerivedQuiz() {
      return this.derivedChecked[this.currentDerivedQuizIndex] >= 2 || 
             (this.derivedAnswers[this.currentDerivedQuizIndex] && this.derivedAnswers[this.currentDerivedQuizIndex].trim() && this.derivedChecked[this.currentDerivedQuizIndex] > 0);
    },
    isDerivedQuizComplete() {
      return this.currentDerivedQuizIndex === this.derivedQuizzes.length - 1 && this.derivedChecked[this.currentDerivedQuizIndex] >= 2;
    },
    canProceedToNextSearchQuiz() {
      return this.searchChecked[this.currentSearchQuizIndex] >= 2 || 
             (this.searchAnswers[this.currentSearchQuizIndex] && this.searchAnswers[this.currentSearchQuizIndex].trim() && this.searchChecked[this.currentSearchQuizIndex] > 0);
    },
    isSearchQuizComplete() {
      return this.currentSearchQuizIndex === this.searchQuizzes.length - 1 && this.searchChecked[this.currentSearchQuizIndex] >= 2;
    }
  },
  created() {
    this.preTestQuestions = this.shuffleArray(this.preTestQuestions);
    this.checkPreTestSessionStatus();
    this.loadProgress();
  },
  methods: {
    checkPreTestSessionStatus() {
      const hasTakenPreTest = sessionStorage.getItem('algorithm_preTest_completed');
      if (hasTakenPreTest === 'true') {
        this.hasTakenPreTestInSession = true;
      }
    },
    completePreTest() {
      sessionStorage.setItem('algorithm_preTest_completed', 'true');
      this.hasTakenPreTestInSession = true;
      this.preTestCompleted = true;
      this.showPreTestResult = false;
    },
    proceedToLesson() {
      this.preTestCompleted = true;
    },
    saveProgress() {
      const progress = {
        preTestScore: this.score,
        preTestMax: this.preTestQuestions.length,
        derivedScore: this.derivedScore,
        derivedMax: 10,
        lawScore: this.lawScore,
        lawMax: this.lawQuizzes.length,
        searchScore: this.searchScore,
        searchMax: this.searchQuizzes.length,
        completedAt: new Date().toISOString(),
        lesson: 'Algorithm'
      };
      localStorage.setItem('algorithmProgress', JSON.stringify(progress));
      this.$emit('progress-updated', progress);
    },
    loadProgress() {
      const saved = localStorage.getItem('algorithmProgress');
      if (saved) {
        const progress = JSON.parse(saved);
        if (this.score === 0 && progress.preTestScore !== undefined) this.score = progress.preTestScore;
        if (this.derivedScore === 0 && progress.derivedScore !== undefined) this.derivedScore = progress.derivedScore;
        if (this.lawScore === 0 && progress.lawScore !== undefined) this.lawScore = progress.lawScore;
        if (this.searchScore === 0 && progress.searchScore !== undefined) this.searchScore = progress.searchScore;
      }
    },
    nextLawQuiz() {
      if (this.currentLawQuizIndex < this.lawQuizzes.length - 1 && this.canProceedToNextLawQuiz) {
        this.currentLawQuizIndex++;
      }
    },
    nextDerivedQuiz() {
      if (this.currentDerivedQuizIndex < this.derivedQuizzes.length - 1 && this.canProceedToNextDerivedQuiz) {
        this.currentDerivedQuizIndex++;
      }
    },
    nextSearchQuiz() {
      if (this.currentSearchQuizIndex < this.searchQuizzes.length - 1 && this.canProceedToNextSearchQuiz) {
        this.currentSearchQuizIndex++;
      }
    },
    submitPreTest() {
      this.score = this.preTestQuestions.reduce((acc, q, i) => acc + (this.userAnswers[i] === q.answer ? 1 : 0), 0);
      this.showPreTestResult = true;
      this.$nextTick(() => {
        this.saveProgress();
      });
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
        if (this.lawChecked[index] < 2) {
          this.lawScore++;
        }
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
      this.$nextTick(() => {
        this.saveProgress();
      });
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
            this.lastDerivedQuizWithMessage = index;
            setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
          } else {
            feedback = `👍 You got ${points}/3 correct. Try again for full credit!`;
          }
          this.derivedChecked[index] = 1;
        } else {
          if (points === 3) {
            feedback = `✅ Correct! ${explanation}`;
            this.currentDerivedMessage = `Great! You earned 3 points for this question.`;
            this.lastDerivedQuizWithMessage = index;
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
            this.lastDerivedQuizWithMessage = index;
            setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
          } else {
            feedback = `👍 You got ${points}/4 correct. Try again for full credit!`;
          }
          this.derivedChecked[index] = 1;
        } else {
          if (points === 4) {
            feedback = `✅ Correct! ${explanation}`;
            this.currentDerivedMessage = `Great! You earned 4 points for this question.`;
            this.lastDerivedQuizWithMessage = index;
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
          this.lastDerivedQuizWithMessage = index;
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
      this.$nextTick(() => {
        this.saveProgress();
      });
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
        this.lastSearchQuizWithMessage = index;
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
      this.$nextTick(() => {
        this.saveProgress();
      });
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
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
      this.showSearchMastery = false;
      this.lawAnswers = [];
      this.lawFeedbacks = [];
      this.selectedTopic = null;
      this.currentLawQuizIndex = 0;
      this.currentDerivedQuizIndex = 0;
      this.currentSearchQuizIndex = 0;
      this.saveProgress();
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
    goToDerivedMasteryQuiz() {
      this.showDerivedMastery = true;
      this.derivedAnswers = new Array(this.derivedQuizzes.length).fill("");
      this.derivedFeedbacks = new Array(this.derivedQuizzes.length).fill("");
      this.derivedChecked = new Array(this.derivedQuizzes.length).fill(0);
      this.derivedQuestionScores = new Array(this.derivedQuizzes.length).fill(0);
      this.derivedScore = 0;
      this.currentDerivedQuizIndex = 0;
      this.lastDerivedQuizWithMessage = -1;
      this.scrollToTop();
    },
    backToDerivedMastery() {
      this.showDerivedMastery = false;
      this.selectedTopic = null;
      this.saveProgress();
    },
    goToSearchMasteryQuiz() {
      this.showSearchMastery = true;
      this.searchAnswers = new Array(this.searchQuizzes.length).fill("");
      this.searchFeedbacks = new Array(this.searchQuizzes.length).fill("");
      this.searchChecked = new Array(this.searchQuizzes.length).fill(0);
      this.searchScore = 0;
      this.currentSearchQuizIndex = 0;
      this.lastSearchQuizWithMessage = -1;
      this.scrollToTop();
    },
    backToSearchMastery() {
      this.showSearchMastery = false;
      this.selectedTopic = null;
      this.saveProgress();
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

.guide-box.definition-box {
  background: #eeede9 !important;
  border: 1px solid #efd56d !important;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  font-size: 15px;
  margin-bottom: 12px;
}

.guide-box {
  background: #fff7d6;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  font-size: 15px;
  margin-bottom: 12px;
  border: 1px solid #f1e2a3;
}

.instruction-box {
  background: #e8f5e9;
  border: 1px solid #4caf50;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
  font-size: 14px;
  text-align: center;
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

/* 🔰 NEW: Pseudocode container styling - FIXED */
.pseudocode-container {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  max-height: 350px;
  overflow-y: auto;
  overflow-x: auto;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}

.pseudocode-container h6 {
  margin: 0 0 8px 0;
  color: #495057;
  font-size: 14px;
  font-weight: bold;
}

.pseudocode-container pre {
  margin: 0;
  padding: 0;
  background: transparent;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: auto;
}

.pseudocode-container code {
  display: block;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.4;
  color: #212529;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;
}

/* Comment styling for output examples */
.pseudocode-container code .comment {
  color: #6c757d;
  font-style: italic;
}

/* Ensure definition boxes handle content properly */
.guide-box.definition-box {
  background: #eeede9 !important;
  border: 1px solid #efd56d !important;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  font-size: 15px;
  margin-bottom: 15px;
  overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .pseudocode-container {
    max-height: 300px;
    font-size: 12px;
    padding: 8px;
  }
  
  .pseudocode-container code {
    font-size: 12px;
    line-height: 1.3;
  }
  
  .pseudocode-container h6 {
    font-size: 13px;
  }
}

/* Scrollbar styling for pseudocode containers */
.pseudocode-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.pseudocode-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.pseudocode-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.pseudocode-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Syntax highlighting */
.pseudocode-container code .keyword {
  color: #d73a49;
  font-weight: bold;
}

.pseudocode-container code .function {
  color: #6f42c1;
}

.pseudocode-container code .string {
  color: #032f62;
}

.pseudocode-container code .comment {
  color: #6a737d;
  font-style: italic;
}

.pseudocode-container code .output-comment {
  color: #22863a;
  font-weight: bold;
}
</style>