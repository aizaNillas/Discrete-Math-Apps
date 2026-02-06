<template>
  <div class="lesson-container">
    <!-- ✅ Pre-Test Section - Only show if not completed in this session -->
    <div v-if="!preTestCompleted && !hasTakenPreTestInSession" class="pretest-container">
      <h3 class="title">📝 Pre-Test: Graph Theory</h3>
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
    
    <!-- ✅ Lesson AFTER Pre-Test -->
    <div v-else>
      <div v-if="!hasTakenPreTestInSession && !preTestCompleted" style="text-align: center; padding: 20px;">
        <h4>Welcome Back!</h4>
        <p>You've already completed the pre-test in this session. Proceeding to lesson content...</p>
        <button @click="proceedToLesson" class="next-button" style="margin-top: 20px;">
          ➡️ Continue to Lesson
        </button>
      </div>
      <div v-else>
        <h5 class="title">📚 Graph Theory </h5>
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
                <strong><h5 style="text-align: center;">Types of Graphs in Graph Theory</h5></strong>
                <div class="definition-box">
                  <h5>A. Undirected Graph</h5>
                </div>
                <img src="/images/undirected.png" alt="Undirected Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                <div class="definition-box">
                  <h5>Characteristics of an Undirected Graph</h5>
                  <ul>
                    <li><strong>Edges have no direction</strong> – Connections are bidirectional (A↔B).</li>
                    <li><strong>Symmetric relationships</strong> – If node A is connected to B, B is connected to A.</li>
                    <li><strong>Edges represented as unordered pairs</strong> – Written as {A, B} instead of (A, B).</li>
                    <li><strong>Adjacency matrix is symmetric</strong> – Across the diagonal.</li>
                    <li><strong>Loops and multiple edges allowed</strong> – Possible in multigraphs.</li>
                    <li><strong>Vertex degree</strong> – Number of edges connected to a vertex.</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Undirected Graphs</h5>
                  <ul>
                  <img src="/images/Social networks.png" alt="Undirected Graph" style="display: block; margin: 5px auto; max-width: 100%; border-radius: 8px;">
                    <li><strong>Social networks</strong> – Friendships or mutual connections.</li>
                    <li><strong>Computer networks</strong> – Two-way communication networks like LANs.</li>
                    <li><strong>Maps and navigation</strong> – Roads or paths allowing travel in both directions.</li>
                    <li><strong>Biological networks</strong> – Protein interactions, neural connections.</li>
                    <li><strong>Recommendation systems</strong> – Relationships between users and items (e.g., collaborative filtering).</li>
                    <li><strong>Clustering and community detection</strong> – Finding strongly connected groups in data.</li>
                    <li><strong>Mathematical modeling and graph theory</strong> – Solving problems like Euler paths, Hamiltonian cycles, and graph coloring.</li>
                  </ul>
                </div>
                  <h5>B. Directed Graph (Digraph)</h5>
               
                <img src="/images/directed.png" alt="Directed Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                <div class="definition-box">
                  <h5>Characteristics of a Directed Graph</h5>
                  <ul>
                    <li><strong>Edges have direction</strong> – Connections are one-way (A→B).</li>
                    <li><strong>Asymmetric relationships</strong> – If node A is connected to B, B may not be connected to A.</li>
                    <li><strong>Edges represented as ordered pairs</strong> – Written as (A, B).</li>
                    <li><strong>Adjacency matrix may not be symmetric</strong> – Depends on edge directions.</li>
                    <li><strong>Loops and multiple edges allowed</strong> – Possible in multidigraphs.</li>
                    <li><strong>In-degree and out-degree</strong> – Number of incoming/outgoing edges to/from a vertex.</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Directed Graphs</h5>
                  <ul>
                    <li><strong>Web graphs</strong> – Hyperlinks between web pages (one-directional links).</li>
                    <li><strong>Task scheduling</strong> – Dependencies in project management (A must precede B).</li>
                    <li><strong>Flow networks</strong> – Modeling maximum flow or circulation problems.</li>
                    <li><strong>Neural networks</strong> – Directed signal propagation in brain models.</li>
                    <li><strong>Dependency graphs</strong> – Software package dependencies or code compilation order.</li>
                    <li><strong>Pathfinding with directions</strong> – One-way streets in navigation systems.</li>
                    <li><strong>Mathematical modeling</strong> – Solving problems like topological sorting or feedback arc sets.</li>
                  </ul>
                </div>
                 <h4>C. Weighted Graph </h4>
               
                <img src="/images/weightedd.png" alt="Weighted Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                <div class="definition-box">
                  <h5>Characteristics of a Weighted Graph</h5>
                  <ul>
                    <li><strong>Edges have weights</strong> – Represent cost, distance, time, capacity, etc.</li>
                    <li><strong>Directed or undirected</strong> – Can be one-way (A→B) or two-way (A↔B) with weights.</li>
                    <li><strong>Weight storage</strong> – Stored in weighted adjacency matrices or adjacency lists with weight pairs.</li>
                    <li><strong>Edge cost is significant</strong> – Important for problems involving shortest paths or minimal cost routes.</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Weighted Graphs</h5>
                  <ul>
                    <li><strong>Shortest path algorithms</strong> – Dijkstra, Bellman-Ford, A*.</li>
                    <li><strong>Transportation and road maps</strong> – Distances, travel time, or fuel costs.</li>
                    <li><strong>Network routing</strong> – Latency, bandwidth, reliability in Internet or telecom networks.</li>
                    <li><strong>Project management</strong> – Task durations and dependencies (PERT/CPM charts).</li>
                    <li><strong>Flight or delivery routes</strong> – Costs, flight times, or shipping fees.</li>
                    <li><strong>Social/recommendation networks</strong> – Strength of connections or similarity scores.</li>
                    <li><strong>Minimum spanning tree problems</strong> – Prim's and Kruskal's algorithms for minimal total connection cost.</li>
                  </ul>
                </div>
              </div>
              <button v-if="index === 0" @click="showImplication = true; scrollToTop()" class="next-button">➡️ Next</button>
              <div v-if="index === 1" class="problem-box">
                <h4>G. Complete Graph</h4>
               
                <img src="/images/complete.png" alt="Complete Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                <div class="definition-box">
                  <h5>Characteristics of a Complete Graph</h5>
                  <ul>
                    <li><strong>Every vertex is connected to every other vertex</strong> – Exactly one edge between each pair of distinct vertices.</li>
                    <li><strong>Simple graph</strong> – No loops and no multiple (parallel) edges.</li>
                    <li><strong>Undirected by default</strong> – Unless stated otherwise.</li>
                    <li><strong>Edge count formula</strong> – A complete graph with n vertices</li>
                    <li><strong>Notation</strong> – Denoted as Kₙ (e.g., K₃ is a triangle, K₄ is fully connected with 4 vertices).</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Complete Graphs</h5>
                  <img src="/images/cp.png" alt="Undirected Graph" style="display: block; margin: 5px auto; max-width: 100%; border-radius: 8px;">
                  <ul>
                    <li><strong>Benchmarking algorithms</strong> – Worst-case testing for traversal, shortest path, and MST algorithms.</li>
                    <li><strong>Theoretical computer science and mathematics</strong> – Used in proofs and theorems (e.g., graph coloring, Ramsey theory, Turán's theorem).</li>
                    <li><strong>Network design</strong> – Modeling fully connected systems like mesh or peer-to-peer networks.</li>
                    <li><strong>Tournament scheduling</strong> – Round-robin tournaments where every participant plays every other.</li>
                    <li><strong>Traveling Salesman Problem (TSP)</strong> – Modeled using a complete weighted graph.</li>
                    <li><strong>Communication systems</strong> – Ideal models where every device can directly communicate with others.</li>
                  </ul>
                </div>
              </div>
              <div v-if="index === 1" class="problem-box">
                <h4>H. Cyclic Graph</h4>
               
                <img src="/images/Cycliccc.png" alt="Cyclic Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                <div class="definition-box">
                  <h5>Characteristics of a Cyclic Graph</h5>
                  <ul>
                    <li><strong>Contains at least one cycle</strong> – A closed path where the start and end vertex are the same.</li>
                    <li><strong>Directed or undirected</strong> – Cycles may respect direction (directed) or be mutual (undirected).</li>
                    <li><strong>May have multiple cycles</strong> – Cycles can be independent or overlapping.</li>
                    <li><strong>Minimum of three vertices (simple graphs)</strong> – At least 3 vertices are needed to form a cycle.</li>
                    <li><strong>Cyclic subgraph is sufficient</strong> – Even one cycle makes the graph cyclic.</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Cyclic Graphs</h5>
                  <ul>
                    <li><strong>Deadlock detection</strong> – Identifying deadlocks in operating systems and databases.</li>
                    <li><strong>Circular dependency detection</strong> – In compilers, software projects, and spreadsheets.</li>
                    <li><strong>Network routing</strong> – Detecting routing loops and redundant paths.</li>
                    <li><strong>Electric circuits and flow systems</strong> – Analyzing loops using circuit laws.</li>
                    <li><strong>Graph theory applications</strong> – Cycle detection, minimum cycle basis, and related proofs.</li>
                  </ul>
                </div>
              </div>
              <div v-if="index === 1" class="problem-box">
                <h4> I. Acyclic Graph</h4>
               
                <img src="/images/acyclic.png" alt="Acyclic Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                <div class="definition-box">
                  <h5>Characteristics of an Acyclic Graph</h5>
                  <ul>
                    <li><strong>No cycles</strong> – No closed loops exist in the graph.</li>
                    <li><strong>Directed or undirected</strong> –
                      <ul>
                        <li>Undirected acyclic graphs form trees or forests.</li>
                        <li>Directed acyclic graphs are called DAGs.</li>
                      </ul>
                    </li>
                    <li><strong>DAG property</strong> – In a DAG, it is impossible to start at a node and return to it by following directed edges.</li>
                    <li><strong>Topological ordering possible</strong> – Nodes in a DAG can be linearly ordered to respect dependencies.</li>
                    <li><strong>Structure-limited</strong> – Typically less dense, often representing hierarchies or workflows.</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Acyclic Graphs (DAGs)</h5>
                  <ul>
                    <li><strong>Task scheduling and project planning</strong> – Modeling tasks and their dependencies.</li>
                    <li><strong>Topological sorting</strong> – Used in compilers, build systems, and dependency resolution.</li>
                    <li><strong>Version control systems</strong> – Managing commits and branches (e.g., Git).</li>
                    <li><strong>Data processing pipelines</strong> – Workflow execution in systems like Apache Airflow.</li>
                    <li><strong>Bayesian networks</strong> – Probabilistic modeling in AI and machine learning.</li>
                  </ul>
                </div>
              </div>
              <button v-if="index === 1" @click="goToDerivedMasteryQuiz" class="next-button">➡️ Next</button>
              <div v-if="index === 2" class="problem-box">
                <h4>Cycle Graph</h4>
                <img src="/images/cyclegraph.png" alt="Cycle Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                <div class="definition-box">
                  <h5>Characteristics of a Cycle Graph</h5>
                  <ul>
                    <li><strong>Exactly one cycle</strong> – All vertices form a single closed loop.</li>
                    <li><strong>Number of vertices</strong> – Requires n ≥ 3 vertices.</li>
                    <li><strong>Undirected by default</strong> – Can also be directed to form a directed cycle.</li>
                    <li><strong>Simple graph</strong> – No loops and no multiple edges.</li>
                    <li><strong>Equal degree</strong> – Each vertex has degree 2 in an undirected cycle graph.</li>
                    <li><strong>Edge count</strong> – A cycle graph with n vertices has exactly n edges.</li>
                    <li><strong>Notation</strong> – Denoted as Cₙ (e.g., C₃ = triangle, C₄ = square, C₅ = pentagon).</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Cycle Graphs</h5>
                  <ul>
                    <li><strong>Mathematical graph theory</strong> – Used in studying Hamiltonian and Eulerian cycles.</li>
                    <li><strong>Computer networks</strong> – Models ring network topologies (e.g., Token Ring).</li>
                    <li><strong>Topology and geometry</strong> – Represents polygons and closed loops.</li>
                    <li><strong>Circuit design and signal flow</strong> – Models feedback loops.</li>
                    <li><strong>Biology and chemistry</strong> – Represents ring structures in molecules.</li>
                    <li><strong>Scheduling and dependency checking</strong> – Detects circular dependencies.</li>
                  </ul>
                </div>
              </div>
              <div v-if="index === 2" class="problem-box">
                <h4>O. Subgraph</h4>
                <p>A subgraph must include only edges that connect the selected vertices. It cannot add new vertices or edges not present in the original graph.</p>
                <img src="/images/sub.png" alt="Subgraph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                <div class="definition-box">
                  <h5>Characteristics of a Subgraph</h5>
                  <ul>
                    <li><strong>Subset of vertices and edges</strong> – If G=(V,E), then a subgraph H=(V',E') where V' ⊆ V, E' ⊆ E, and edges connect only vertices in V'.</li>
                    <li><strong>Induced subgraph</strong> – Includes all edges between chosen vertices that exist in the original graph.</li>
                    <li><strong>Spanning subgraph</strong> – Contains all vertices of the original graph but only some edges.</li>
                    <li><strong>Proper subgraph</strong> – Not identical to the original graph (has fewer vertices or edges).</li>
                    <li><strong>Connected or disconnected</strong> – Depends on the selected vertices and edges.</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Subgraphs</h5>
                  <ul>
                    <li><strong>Graph algorithms</strong> – Solving problems like finding paths, cycles, and trees.</li>
                    <li><strong>Pattern recognition</strong> – Detecting specific structures via subgraph isomorphism.</li>
                    <li><strong>Data mining and network analysis</strong> – Finding frequent or important patterns in large networks.</li>
                    <li><strong>Shortest path and connectivity problems</strong> – Temporary subgraphs during algorithm execution.</li>
                    <li><strong>Graph decomposition</strong> – Simplifying analysis by breaking large graphs into smaller parts.</li>
                    <li><strong>Spanning trees and forests</strong> – Key subgraphs used in optimization problems (e.g., MST).</li>
                  </ul>
                </div>
              </div>
              <div v-if="index === 2" class="problem-box">
                <h4>Tree</h4>
                <p>A tree is like a hierarchy or branching structure — it connects all its nodes with no loops.</p>
                <img src="/images/tree.png" alt="Tree" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                <div class="definition-box">
                  <h5>Characteristics of a Tree</h5>
                  <ul>
                    <li><strong>Acyclic and connected</strong> – Contains no cycles and has exactly one unique path between every pair of vertices.</li>
                    <li><strong>Edge count</strong> – A tree with n vertices has exactly n − 1 edges.</li>
                    <li><strong>Single path between nodes</strong> – No redundant or alternative paths exist.</li>
                    <li><strong>All vertices are reachable</strong> – No isolated or disconnected nodes.</li>
                    <li><strong>Leaf nodes</strong> – Vertices with degree 1.</li>
                    <li><strong>Simple graph</strong> – No loops and no multiple edges.</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Trees</h5>
                  <ul>
                    <li><strong>Computer science and programming</strong> – File systems, syntax trees, decision trees, search trees (e.g., BST).</li>
                    <li><strong>Networks</strong> – Minimum spanning trees for efficient network wiring.</li>
                    <li><strong>Hierarchical structures</strong> – Organization charts, family trees, classification systems.</li>
                    <li><strong>Artificial intelligence</strong> – Game trees and decision-making algorithms.</li>
                    <li><strong>Database indexing</strong> – B-trees and AVL trees for fast data access.</li>
                    <li><strong>Routing algorithms</strong> – Efficient path finding in tree-structured data.</li>
                  </ul>
                </div>
              </div>
              <div v-if="index === 2" class="problem-box">
                <h4>L. Forest</h4>
                <p>A forest is a graph that consists of one or more disconnected trees.</p>
                <img src="/images/forest.png" alt="Forest" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                <div class="definition-box">
                  <h5>Characteristics of a Forest</h5>
                  <ul>
                    <li><strong>Acyclic</strong> – Contains no cycles, just like trees.</li>
                    <li><strong>Collection of trees</strong> – Each connected component is a tree; if connected, it becomes a single tree.</li>
                    <li><strong>Edge count</strong> – For n vertices and k components (trees), the number of edges is n − k.</li>
                    <li><strong>May be disconnected</strong> – A forest can consist of multiple separate components.</li>
                    <li><strong>Undirected and simple</strong> – No loops and no multiple edges.</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Forests</h5>
                  <ul>
                    <li><strong>Graph decomposition</strong> – Breaking graphs into cycle-free components.</li>
                    <li><strong>Spanning forests</strong> – Creating a spanning tree for each connected component.</li>
                    <li><strong>Data structures</strong> – Foundation of disjoint-set (union–find) structures.</li>
                    <li><strong>Hierarchical models with multiple roots</strong> – Representing multiple independent hierarchies.</li>
                    <li><strong>Parallel algorithms</strong> – Divide-and-conquer processing on disconnected components.</li>
                  </ul>
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
             
                  <h4>M. Bipartite Graph</h4>
                  <p>A bipartite graph is a graph whose vertices can be divided into two disjoint sets, U and V, such that every edge connects a vertex in set U to a vertex in set V and no edge connects two vertices within the same set.</p>
                  <img src="/images/bipartite.png" alt="Bipartite Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                   <div class="definition-box">
                  <h5>Characteristics of a Bipartite Graph</h5>
                  <ul>
                    <li><strong>Two distinct sets of vertices</strong> – Vertex set partitioned into two groups with no edges within a group.</li>
                    <li><strong>No odd-length cycles</strong> – A graph is bipartite if it contains no cycles of odd length.</li>
                    <li><strong>Undirected or directed</strong> – Usually undirected, but directed versions exist.</li>
                    <li><strong>Complete bipartite graph</strong> – Denoted Kₘ,ₙ, where every vertex in set U connects to every vertex in set V.</li>
                    <li><strong>2-colorable</strong> – Can assign two colors so no adjacent vertices share the same color.</li>
                  </ul>
                </div>
                <div class="definition-box">
                  <h5>Uses of Bipartite Graphs</h5>
                  <ul>
                    <li><strong>Matching problems</strong> – Worker–job assignments, student–school matching; algorithms include Hungarian and Hopcroft–Karp.</li>
                    <li><strong>Scheduling and assignment</strong> – Tasks vs. machines, teachers vs. classes.</li>
                    <li><strong>Recommendation systems</strong> – Users vs. items (e.g., movies, products).</li>
                    <li><strong>Social networks</strong> – People vs. groups, actors vs. movies.</li>
                    <li><strong>Network flow problems</strong> – Transportation and flow network modeling.</li>
                    <li><strong>Biological networks</strong> – Protein–gene interactions, species–habitat relationships.</li>
                  </ul>
                </div>
                <div class="problem-box">
                  <h4>N. Complete Bipartite Graph</h4>
                  <p>denoted by K_(m,n), is a special type of bipartite graph where every vertex in set U is connected to every vertex in set V and there are no edges within the same set.</p>
                  <img src="/images/combipartite.jpg" alt="Complete Bipartite Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
                  <div class="definition-box">
                    <h5>Characteristics of a Complete Bipartite Graph</h5>
                    <ul>
                      <li><strong>Two disjoint vertex sets</strong> – Set U with m vertices and set V with n vertices.</li>
                      <li><strong>All cross-set connections exist</strong> – Every vertex in U is connected to every vertex in V.</li>
                      <li><strong>No internal edges</strong> – No edges within the same set (no U–U or V–V connections).</li>
                      <li><strong>Edge count</strong> – Total number of edges is m × n.</li>
                      <li><strong>2-colorable</strong> – Vertices can be colored with two colors without adjacent vertices sharing a color.</li>
                      <li><strong>Acyclic for m = 1 or n = 1</strong> – Becomes a star graph with no cycles.</li>
                    </ul>
                  </div>
                  <div class="definition-box">
                    <h5>Uses of Complete Bipartite Graphs</h5>
                    <ul>
                      <li><strong>Modeling full relationships</strong> – Every entity in one group interacts with every entity in another.</li>
                      <li><strong>Job assignment and matching</strong> – Used in maximum bipartite matching problems.</li>
                      <li><strong>Network design</strong> – Task distribution or communication systems with full cross-group connectivity.</li>
                      <li><strong>Database relations</strong> – Representing full Cartesian joins.</li>
                      <li><strong>Social and biological networks</strong> – Fully linked interactions between two distinct node types.</li>
                      <li><strong>Graph theory and combinatorics</strong> – Used in proofs, counting problems, and complexity analysis.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <button @click="goToSearchMasteryQuiz" class="next-button">➡️ Next</button>
            </div>
          </div>
        </div>
        <div v-else-if="showImplication" class="content-box">
          <div class="problem-box">
            <h5 style="text-align: center;"></h5>
         
              <h4>D. Unweighted Graph</h4>
           
            <img src="/images/unweighted.png" alt="Unweighted Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            <div class="definition-box">
              <h5>Characteristics of an Unweighted Graph</h5>
              <ul>
                <li><strong>Edges have no weights</strong> – All edges are equal, no cost assigned.</li>
                <li><strong>Directed or undirected</strong> – Can have direction (directed) or be mutual (undirected).</li>
                <li><strong>Adjacency representation</strong> – Using adjacency matrices (0/1) or adjacency lists.</li>
                <li><strong>Equal edge cost assumption</strong> – Each edge is treated as having the same cost (often 1).</li>
                <li><strong>Simpler analysis</strong> – Easier for connectivity, traversal, and shortest path calculations.</li>
              </ul>
            </div>
            <div class="definition-box">
              <h5>Uses of Unweighted Graphs</h5>
              <ul>
                <li><strong>Social networks</strong> – Represent basic connections between people.</li>
                <li><strong>Basic routing</strong> – Step or hop-based routing in networks.</li>
                <li><strong>Graph traversal algorithms</strong> – BFS and DFS without edge priorities.</li>
                <li><strong>Maze or grid problems</strong> – Each move has the same cost.</li>
                <li><strong>Friendship and communication models</strong> – Connections exist or not, no weight.</li>
                <li><strong>Topological sort (in DAGs)</strong> – Task scheduling or prerequisite structures.</li>
              </ul>
            </div>
          
              <h4>E. Simple Graph</h4>
           
            <img src="/images/simple.png" alt="Simple Graph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            <div class="definition-box">
              <h5>Characteristics of a Simple Graph</h5>
              <ul>
                <li><strong>No loops</strong> – Vertices cannot connect to themselves.</li>
                <li><strong>No multiple edges</strong> – At most one edge between any two distinct vertices.</li>
                <li><strong>Edges are unweighted (usually)</strong> – Typically unweighted and undirected.</li>
                <li><strong>Undirected by default</strong> – Unless specified otherwise.</li>
                <li><strong>Adjacency matrix has 0s on the diagonal</strong> – No loops.</li>
                <li><strong>Defined as G = (V, E)</strong> – V = set of vertices, E = set of edges (unordered pairs).</li>
              </ul>
            </div>
            <div class="definition-box">
              <h5>Uses of Simple Graphs</h5>
              <ul>
                <li><strong>Basic network modeling</strong> – Friendships, collaborations, simple road maps.</li>
                <li><strong>Teaching graph theory</strong> – Introduces connectivity, vertex degree, paths, cycles, trees, and components.</li>
                <li><strong>Graph traversal practice</strong> – Clean structure ideal for BFS and DFS.</li>
                <li><strong>Mathematical proofs and theorems</strong> – Basis for Euler's theorem, graph coloring, etc.</li>
                <li><strong>Data structures</strong> – Foundation for trees, DAGs, multigraphs, and other structures.</li>
              </ul>
            </div>
           
              <h4>F. Multigraph </h4>
           
            <img src="/images/multi.png" alt="Multigraph" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            <div class="definition-box">
              <h5>Characteristics of a Multigraph</h5>
              <ul>
                <li><strong>Multiple edges allowed</strong> – Two vertices can be connected by more than one edge (parallel edges).</li>
                <li><strong>Loops may be allowed</strong> – Edges connecting a vertex to itself.</li>
                <li><strong>Directed or undirected</strong> – Can have direction (directed/pseudograph) or be mutual (undirected).</li>
                <li><strong>Edges are individually identified</strong> – Each edge is unique even if connecting the same nodes.</li>
                <li><strong>Weighted or unweighted</strong> – Each edge can have its own weight.</li>
              </ul>
            </div>
            <div class="definition-box">
              <h5>Uses of Multigraphs</h5>
              <ul>
                <li><strong>Transportation networks</strong> – Multiple routes between cities (bus lines, flights, roads).</li>
                <li><strong>Network routing and communication</strong> – Redundant links between devices.</li>
                <li><strong>Scheduling and workflow systems</strong> – Multiple processes or transitions between tasks.</li>
                <li><strong>Social networks with multiple relations</strong> – Different types of connections between the same users.</li>
                <li><strong>Railway or airline systems</strong> – Multiple trips or services between the same stations or airports.</li>
              </ul>
            </div>
          </div>
          <div style="display: flex; justify-content: center; align-items: center;">
            <button @click="goToLawMastery" class="next-button">➡️ Next: Graph Mastery Quiz</button>
          </div>
        </div>
        <!-- ✅ Graph Mastery Quiz - CAROUSEL VERSION -->
        <div v-else-if="showLawMastery" class="content-box">
          <h5>Graph Mastery Quiz</h5>
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
            <p><strong>{{ lawQuizzes[currentLawQuizIndex].question }}</strong></p>
            <img :src="lawQuizzes[currentLawQuizIndex].image" alt="Graph Image" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            <input
              v-model="lawAnswers[currentLawQuizIndex]"
              placeholder="Type the name of the graph type here"
              class="answer-input"
              @input="lawChecked[currentLawQuizIndex] = 0"
            />
            <button @click="checkLaw(currentLawQuizIndex)" :disabled="lawChecked[currentLawQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
            <div v-if="lawFeedbacks[currentLawQuizIndex]" class="result-box">
              <p>{{ lawFeedbacks[currentLawQuizIndex] }}</p>
            </div>
            <div v-if="currentLawMessage && currentLawQuizIndex === lastLawQuizWithMessage" class="fade-message">{{ currentLawMessage }}</div>
            
            <!-- Previous/Next Buttons -->
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
        
        <!-- ✅ Types of Graph Mastery Quiz - CAROUSEL VERSION -->
        <div v-else-if="showDerivedMastery" class="content-box">
          <h5>Types of Graph Mastery Quiz</h5>
          <div class="score-container">
            <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ derivedScore }}/{{ derivedQuizzes.length }}</p>
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
            <div v-if="derivedQuizzes[currentDerivedQuizIndex].image" class="image-container">
              <img :src="derivedQuizzes[currentDerivedQuizIndex].image" alt="Graph Image" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            </div>
            <input
              v-model="derivedAnswers[currentDerivedQuizIndex]"
              placeholder="Type the name of the graph type here"
              class="answer-input"
              @input="derivedChecked[currentDerivedQuizIndex] = 0"
            />
            <button @click="checkDerived(currentDerivedQuizIndex)" :disabled="derivedChecked[currentDerivedQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
            <div v-if="derivedFeedbacks[currentDerivedQuizIndex]" class="result-box">
              <p>{{ derivedFeedbacks[currentDerivedQuizIndex] }}</p>
            </div>
            <div v-if="currentDerivedMessage && currentDerivedQuizIndex === lastDerivedQuizWithMessage" class="fade-message">{{ currentDerivedMessage }}</div>
            
            <!-- Previous/Next Buttons -->
            <div class="carousel-controls" style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 20px;">
              <!-- Only show Next button if not on question 5 (index 4) -->
              <button v-if="currentDerivedQuizIndex !== 4" @click="nextDerivedQuiz" :disabled="!canProceedToNextDerivedQuiz" class="carousel-nav-btn">
                Next ➡️
              </button>
            </div>
            
            <!-- Completion Message -->
            <div v-if="isDerivedQuizComplete" class="completion-box" style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 10px; text-align: center;">
              <h4>🎉 Quiz Completed!</h4>
              <p>You scored {{ derivedScore }} out of {{ derivedQuizzes.length }}.</p>
              <p v-if="derivedScore < derivedQuizzes.length" style="color: #dc3545; font-weight: bold;">
                ⚠️ You need a perfect score ({{ derivedQuizzes.length }}/{{ derivedQuizzes.length }}) to proceed!
              </p>
              <button 
                @click="backToDerivedMastery" 
                :disabled="derivedScore < derivedQuizzes.length"
                class="next-button" 
                :style="derivedScore < derivedQuizzes.length ? 'background: #cccccc; cursor: not-allowed;' : ''"
                style="margin-top: 10px;"
              >
                ⬅️ Back to Lesson
              </button>
              <p v-if="derivedScore < derivedQuizzes.length" style="color: #666; font-size: 14px; margin-top: 10px;">
                Please achieve a perfect score ({{ derivedQuizzes.length }}/{{ derivedQuizzes.length }}) to continue.
              </p>
            </div>
          </div>
        </div>
        
        <!-- ✅ Special Graph Types Mastery Quiz - CAROUSEL VERSION -->
        <div v-else-if="showSearchMastery" class="content-box">
          <h5>Special Graph Types Mastery Quiz</h5>
          <div class="score-container">
            <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ searchScore }}/{{ searchQuizzes.length }}</p>
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
            <div v-if="searchQuizzes[currentSearchQuizIndex].image" class="image-container">
              <img :src="searchQuizzes[currentSearchQuizIndex].image" alt="Graph Image" style="display: block; margin: 10px auto; max-width: 100%; border-radius: 8px;">
            </div>
            <input
              v-model="searchAnswers[currentSearchQuizIndex]"
              placeholder="Type the name of the graph type here"
              class="answer-input"
              @input="searchChecked[currentSearchQuizIndex] = 0"
            />
            <button @click="checkSearch(currentSearchQuizIndex)" :disabled="searchChecked[currentSearchQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
            <div v-if="searchFeedbacks[currentSearchQuizIndex]" class="result-box">
              <p>{{ searchFeedbacks[currentSearchQuizIndex] }}</p>
            </div>
            <div v-if="currentSearchMessage && currentSearchQuizIndex === lastSearchQuizWithMessage" class="fade-message">{{ currentSearchMessage }}</div>
            
            <!-- Previous/Next Buttons -->
            <div class="carousel-controls" style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 20px;">
              <!-- Only show Next button if not on question 5 (index 4) -->
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
                @click="backToSearchMastery" 
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
      hasTakenPreTestInSession: false, // New flag to track pre-test completion in session
      preTestQuestions: [
        { 
          question: "What is the degree of a vertex in a graph?", 
          options: [
            "The number of vertices in the graph", 
            "The number of edges connected to the vertex", 
            "The number of cycles the vertex is part of", 
            "The total weight of edges incident on the vertex"
          ], 
          answer: "The number of edges connected to the vertex", 
          explanation: "The degree of a vertex is the number of edges incident to (connected with) the vertex." 
        },
        { 
          question: "Which of the following graphs contains no direction on edges?", 
          options: [
            "Directed graph", 
            "Undirected graph", 
            "Multigraph", 
            "Weighted graph"
          ], 
          answer: "Undirected graph", 
          explanation: "Undirected graphs have edges without direction, meaning connections are bidirectional (A↔B)." 
        },
        { 
          question: "A sequence of vertices where each adjacent pair is connected by an edge is called a:", 
          options: [
            "Tree", 
            "Path", 
            "Component", 
            "Degree sequence"
          ], 
          answer: "Path", 
          explanation: "A path is a sequence of vertices where each adjacent pair is connected by an edge, with no repeated vertices." 
        },
        { 
          question: "What is a vertex in a graph?", 
          options: [
            "A connection between two nodes", 
            "A point where two edges cross", 
            "A fundamental unit or node in the graph", 
            "A closed path"
          ], 
          answer: "A fundamental unit or node in the graph", 
          explanation: "A vertex (or node) is a fundamental unit in a graph that represents an entity or point." 
        },
        { 
          question: "Which type of graph has vertices that can be divided into two sets such that every edge connects a vertex in one set to a vertex in the other — and also contains the maximum number of edges?", 
          options: [
            "Complete bipartite graph", 
            "Complete graph", 
            "Star graph", 
            "Directed acyclic graph"
          ], 
          answer: "Complete bipartite graph", 
          explanation: "A complete bipartite graph (Kₘ,ₙ) has two disjoint vertex sets with every vertex in one set connected to every vertex in the other set, containing the maximum possible edges for a bipartite structure." 
        }
      ],
      selectedTopic: null,
      showSolution: Array(3).fill({ main: false, alt: false }),
      revealedSteps: Array(3).fill({ main: [], alt: [] }),
      viewedTopics: new Set(),
      showImplication: false,
      showLawMastery: false,
      // Interactive Demo Data
      demoArrayInput: '',
      demoTarget: '',
      demoResults: [],
      demoFound: false,
      demoFoundIndex: -1,
      // Updated Graph Mastery Quiz Data - CAROUSEL VERSION
      lawQuizzes: [
        {
          question: "Edges Have No Direction: An edge between vertex A and vertex B is the same as between B and A (i.e., A↔B).",
          image: "/images/undirected.png",
          answer: "Undirected Graph",
          explanation: "An undirected graph has edges without direction. Connections are bidirectional (A↔B)."
        },
        {
          question: "Edges have weights – Represent cost, distance, time, capacity, etc.",
          image: "/images/weightedd.png",
          answer: "Weighted Graph",
          explanation: "A weighted graph has edges with assigned weights representing cost, distance, time, or capacity."
        },
        {
          question: "Multiple edges allowed – Two vertices can be connected by more than one edge (parallel edges).",
          image: "/images/multi.png",
          answer: "Multigraph",
          explanation: "A multigraph allows multiple edges (parallel edges) between the same pair of vertices."
        },
        {
          question: "Edges have direction: Connections are one-way (A→B).",
          image: "/images/directed.png",
          answer: "Directed Graph",
          explanation: "A directed graph (digraph) has edges with direction. Connections are one-way from source to destination."
        },
        {
          question: "Edges have no weights: All edges are equal, no cost assigned.",
          image: "/images/unweighted.png",
          answer: "Unweighted Graph",
          explanation: "An unweighted graph has edges without any assigned weights. All connections are treated equally."
        }
      ],
      lawAnswers: [],
      lawFeedbacks: [],
      lawScore: 0,
      lawChecked: [],
      currentLawMessage: '',
      currentLawQuizIndex: 0,
      lastLawQuizWithMessage: -1,
      // ✅ UPDATED Types of Graph Mastery Quiz DATA - CAROUSEL VERSION
      showDerivedMastery: false,
      derivedQuizzes: [
        {
          question: "Every vertex is connected to every other vertex – Exactly one edge between each pair of distinct vertices.",
          answer: "Complete Graph",
          explanation: "A complete graph is where every vertex is connected to every other vertex with exactly one edge between each pair."
        },
        {
          question: "Contains at least one cycle – A closed path where the start and end vertex are the same.",
          answer: "Cyclic Graph",
          explanation: "A cyclic graph contains at least one cycle, which is a closed path where you can start at a vertex and return to it."
        },
        {
          question: "No cycles – No closed loops exist in the graph.",
          answer: "Acyclic Graph",
          explanation: "An acyclic graph contains no cycles. Directed acyclic graphs are called DAGs."
        },
        {
          question: "Identify what type of graph in the image:",
          image: "/images/complete.png",
          answer: "Complete Graph",
          explanation: "This is a complete graph (K₄) where every vertex is connected to every other vertex."
        },
        {
          question: "Identify what type of graph in the image:",
          image: "/images/Cycliccc.png",
          answer: "Cyclic Graph",
          explanation: "This is a cyclic graph containing cycles (closed loops)."
        }
      ],
      derivedAnswers: [],
      derivedFeedbacks: [],
      derivedChecked: [],
      derivedScore: 0,
      derivedQuestionScores: [],
      currentDerivedMessage: '',
      currentDerivedQuizIndex: 0,
      lastDerivedQuizWithMessage: -1,
      // ✅ UPDATED Special Graph Types Mastery Quiz DATA - CAROUSEL VERSION
      showSearchMastery: false,
      searchQuizzes: [
        {
          question: "A special type of graph where all the vertices are connected in a closed loop, forming exactly one cycle.",
          image: "/images/cyclegraph.png",
          answer: "Cycle Graph",
          explanation: "A cycle graph (Cₙ) is a special type of graph where all vertices form exactly one closed loop or cycle."
        },
        {
          question: "It is like a hierarchy or branching structure — it connects all its nodes with no loops.",
          image: "/images/tree.png",
          answer: "Tree",
          explanation: "A tree is an acyclic connected graph that resembles a branching hierarchy with no loops."
        },
        {
          question: "A graph whose vertices can be divided into two disjoint sets, U and V, such that every edge connects a vertex in set U to a vertex in set V and no edge connects two vertices within the same set.",
          image: "/images/bipartite.png",
          answer: "Bipartite Graph",
          explanation: "A bipartite graph has vertices partitioned into two sets with edges only connecting vertices from different sets."
        },
        {
          question: "A graph that consists of one or more disconnected trees.",
          image: "/images/forestquiz.png",
          answer: "Forest",
          explanation: "A forest is a collection of disconnected trees (an acyclic graph that may be disconnected)."
        },
        {
          question: "It must include only edges that connect the selected vertices. It cannot add new vertices or edges not present in the original graph.",
          image: "/images/sub.png",
          answer: "Subgraph",
          explanation: "A subgraph is a graph formed from a subset of vertices and edges of the original graph."
        }
      ],
      searchAnswers: [],
      searchFeedbacks: [],
      searchChecked: [],
      searchScore: 0,
      currentSearchMessage: '',
      currentSearchQuizIndex: 0,
      lastSearchQuizWithMessage: -1,
      topics: [
        { title: "Graph Theory ", content: "is a branch of mathematics that studies graphs, which are structures used to model pairwise relations between objects." },
        { title: "Types of graph", content: "Graphs can vary based on the nature of their edges, direction, weights, loops, and other properties." },
        { title: "More types of Graph", content: "denoted by C_n, is a special type of graph where all the vertices are connected in a closed loop, forming exactly one cycle." }
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
    canProceedToNextDerivedQuiz() {
      return this.derivedChecked[this.currentDerivedQuizIndex] >= 2 || 
             (this.derivedAnswers[this.currentDerivedQuizIndex] && this.derivedAnswers[this.currentDerivedQuizIndex].trim() && this.derivedChecked[this.currentDerivedQuizIndex] > 0);
    },
    canProceedToNextSearchQuiz() {
      return this.searchChecked[this.currentSearchQuizIndex] >= 2 || 
             (this.searchAnswers[this.currentSearchQuizIndex] && this.searchAnswers[this.currentSearchQuizIndex].trim() && this.searchChecked[this.currentSearchQuizIndex] > 0);
    },
    isLawQuizComplete() {
      return this.currentLawQuizIndex === this.lawQuizzes.length - 1 && this.lawChecked[this.currentLawQuizIndex] >= 2;
    },
    isDerivedQuizComplete() {
      return this.currentDerivedQuizIndex === this.derivedQuizzes.length - 1 && this.derivedChecked[this.currentDerivedQuizIndex] >= 2;
    },
    isSearchQuizComplete() {
      return this.currentSearchQuizIndex === this.searchQuizzes.length - 1 && this.searchChecked[this.currentSearchQuizIndex] >= 2;
    }
  },
  created() {
    // ✅ Shuffle questions on load
    this.preTestQuestions = this.shuffleArray(this.preTestQuestions);
    
    // ✅ Check if user has already taken pre-test in this session
    this.checkPreTestSessionStatus();
    
    // Load existing progress if available
    this.loadProgress();
  },
  methods: {
    // ✅ NEW: Check sessionStorage for pre-test completion
    checkPreTestSessionStatus() {
      const hasTakenPreTest = sessionStorage.getItem('graphTheory_preTest_completed');
      if (hasTakenPreTest === 'true') {
        this.hasTakenPreTestInSession = true;
      }
    },
    
    // ✅ NEW: Save Pre-Test Score to localStorage for ProgressPage AND sessionStorage
    submitPreTest() {
      this.score = this.preTestQuestions.reduce((acc, q, i) => acc + (this.userAnswers[i] === q.answer ? 1 : 0), 0);
      this.showPreTestResult = true;
      
      // Load existing assessment scores from localStorage
      let existingAssessments = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
      // Save/update pre-test score (key: 'preTest-graphTheory' for specificity; value: raw score as string)
      existingAssessments['preTest-graphTheory'] = this.score.toString();
      localStorage.setItem('assessmentScores', JSON.stringify(existingAssessments));
    },
    
    // ✅ NEW: Complete pre-test and mark as taken in session
    completePreTest() {
      // Mark pre-test as completed in sessionStorage
      sessionStorage.setItem('graphTheory_preTest_completed', 'true');
      this.hasTakenPreTestInSession = true;
      this.preTestCompleted = true;
      this.showPreTestResult = false;
    },
    
    // ✅ NEW: Proceed directly to lesson if pre-test already taken
    proceedToLesson() {
      this.preTestCompleted = true;
    },
    
    // ✅ Progress Recording Methods
    saveProgress() {
      const progress = {
        preTestScore: this.score,
        preTestMax: this.preTestQuestions.length,
        derivedScore: this.derivedScore,
        derivedMax: this.derivedQuizzes.length,
        lawScore: this.lawScore,
        lawMax: this.lawQuizzes.length,
        searchScore: this.searchScore,
        searchMax: this.searchQuizzes.length,
        completedAt: new Date().toISOString(),
        lesson: 'Graph Theory' // Identifier for this lesson
      };
      localStorage.setItem('graphTheoryProgress', JSON.stringify(progress));
      this.$emit('progress-updated', progress);
    },
    loadProgress() {
      const saved = localStorage.getItem('graphTheoryProgress');
      if (saved) {
        const progress = JSON.parse(saved);
        if (this.score === 0 && progress.preTestScore !== undefined) this.score = progress.preTestScore;
        if (this.derivedScore === 0 && progress.derivedScore !== undefined) this.derivedScore = progress.derivedScore;
        if (this.lawScore === 0 && progress.lawScore !== undefined) this.lawScore = progress.lawScore;
        if (this.searchScore === 0 && progress.searchScore !== undefined) this.searchScore = progress.searchScore;
      }
    },
    // ✅ LAW MASTERY QUIZ - CAROUSEL METHODS
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
      this.$nextTick(() => {
        this.saveProgress();
      });
    },
    nextLawQuiz() {
      if (this.currentLawQuizIndex < this.lawQuizzes.length - 1 && this.canProceedToNextLawQuiz) {
        this.currentLawQuizIndex++;
      }
    },
    // ✅ DERIVED MASTERY QUIZ - CAROUSEL METHODS
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
      this.derivedFeedbacks[index] = feedback;
      this.$nextTick(() => {
        this.saveProgress();
      });
    },
    nextDerivedQuiz() {
      if (this.currentDerivedQuizIndex < this.derivedQuizzes.length - 1 && this.canProceedToNextDerivedQuiz) {
        this.currentDerivedQuizIndex++;
      }
    },
    // ✅ SEARCH MASTERY QUIZ - CAROUSEL METHODS
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
    nextSearchQuiz() {
      if (this.currentSearchQuizIndex < this.searchQuizzes.length - 1 && this.canProceedToNextSearchQuiz) {
        this.currentSearchQuizIndex++;
      }
    },
    // ✅ Enhanced scrollToTop Method
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const container = document.querySelector('.lesson-container');
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setTimeout(() => {
        window.scrollTo(0, 0);
        if (container) container.scrollTop = 0;
      }, 100);
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
      this.scrollToTop();
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
    // ✅ UPDATED: Save Mastery Scores on back to lesson
    backToMainLesson() {
      // Load existing assessment scores from localStorage
      let existingAssessments = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
      
      // Save graph mastery score
      if (this.showLawMastery) {
        existingAssessments['graphMastery'] = this.lawScore.toString();
      }
      
      localStorage.setItem('assessmentScores', JSON.stringify(existingAssessments));
      
      this.showLawMastery = false;
      this.lawAnswers = [];
      this.lawFeedbacks = [];
      this.selectedTopic = null;
      this.currentLawQuizIndex = 0;
      this.lastLawQuizWithMessage = -1;
      this.saveProgress();
      this.scrollToTop();
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
      // Save derived mastery score
      let existingAssessments = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
      existingAssessments['typesGraphMastery'] = this.derivedScore.toString();
      localStorage.setItem('assessmentScores', JSON.stringify(existingAssessments));
      
      this.showDerivedMastery = false;
      this.selectedTopic = null;
      this.currentDerivedQuizIndex = 0;
      this.lastDerivedQuizWithMessage = -1;
      this.saveProgress();
      this.scrollToTop();
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
      // Save special graph types mastery score
      let existingAssessments = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
      existingAssessments['specialGraphMastery'] = this.searchScore.toString();
      localStorage.setItem('assessmentScores', JSON.stringify(existingAssessments));
      
      this.showSearchMastery = false;
      this.selectedTopic = null;
      this.currentSearchQuizIndex = 0;
      this.lastSearchQuizWithMessage = -1;
      this.saveProgress();
      this.scrollToTop();
    }
  }
};
</script>

<style scoped>
/* ✅ UPDATED CSS - Removed height restrictions */
.lesson-container {
  width: 100%;
  min-height: 100vh; /* Changed from height: 100vh */
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
  scroll-behavior: smooth;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-top: 0;
  padding-top: 10px;
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

.submit-button:hover, .solve-button:hover, .next-button:hover, .step-button:hover, .carousel-nav-btn:hover {
  background: #388E3C;
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

/* ✅ UPDATED: Definition Box Style */
.definition-box {
  background: #eeede9;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  font-size: 15px;
  margin-bottom: 12px;
  border: 1px solid #efd56d;
}

/* ✅ UPDATED: Guide Box Style (if still used elsewhere) */
.guide-box {
  background: #eeede9;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  font-size: 15px;
  margin-bottom: 12px;
  border: 1px solid #efd56d;
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

.image-container {
  margin: 15px 0;
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