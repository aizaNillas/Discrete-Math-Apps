<template>
  <div class="lesson-container">
    <!-- ✅ Pre-Test Section -->
    <div v-if="!preTestCompleted && !hasTakenPreTestInSession" class="pretest-container">
      <h3 class="title">📝 Pre-Test: Matrices</h3>
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

    <!-- ✅ Main Lesson Content AFTER Pre-Test -->
    <div v-else>
      <!-- Welcome back message if already taken pre-test -->
      <div v-if="!hasTakenPreTestInSession && !preTestCompleted" style="text-align: center; padding: 20px;">
        <h4>Welcome Back!</h4>
        <p>You've already completed the pre-test in this session. Proceeding to lesson content...</p>
        <button @click="proceedToLesson" class="next-button" style="margin-top: 20px;">
          ➡️ Continue to Lesson
        </button>
      </div>
      
      <div v-else>
        <!-- Topic Selection Menu -->
        <div v-if="!selectedTopic" class="topic-selection">
          <h4 class="title">📚 Matrices Topics</h4>
          <div class="topic-menu">
            <div class="topic-card" @click="selectTopic('matrixFundamentals')">
              <h5>Matrix Fundamentals</h5>
              <p>Definition, Dimensions, Coefficients, Special Matrices</p>
            </div>
            <div class="topic-card" @click="selectTopic('matrixOperations')">
              <h5>Basic Matrix Operations</h5>
              <p>Addition, Subtraction, Multiplication, Transpose</p>
            </div>
          </div>
        </div>

        <!-- ✅ MATRIX FUNDAMENTALS TOPIC -->
        <div v-else-if="selectedTopic === 'matrixFundamentals'">
          <h5 class="title">📚 Matrix Fundamentals</h5>
          
          <!-- Progress Tracker -->
          
          <!-- Matrix Definition Section -->
          <div v-if="currentFundamentalsSection === 'definition'" class="content-box" ref="definitionSection">
            <div class="problem-box">
              <h4 style="text-align: center; color: #2c3e50; margin-bottom: 20px;">What is a Matrix?</h4>
              
              <div class="guide-box">
                <h5><strong>Definition:</strong></h5>
                <p>A <strong>matrix</strong> is a rectangular array of numbers, symbols, or expressions arranged in <strong>rows</strong> and <strong>columns</strong>.</p>
                
                <div style="display: flex; align-items: center; justify-content: center; gap: 30px; flex-wrap: wrap; margin: 20px 0;">
                  <div style="text-align: center;">
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #3498db;">
                      <p><strong>Example Matrix A:</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(3, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [2, 5, 7]" :key="idx" class="matrix-cell"
                             :style="{
                               width: '60px',
                               height: '60px',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               background: 'white',
                               border: '2px solid #3498db',
                               borderRadius: '5px',
                               fontSize: '20px',
                               fontWeight: 'bold'
                             }">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [1, 3, 9]" :key="idx+3" class="matrix-cell"
                             :style="{
                               width: '60px',
                               height: '60px',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               background: 'white',
                               border: '2px solid #3498db',
                               borderRadius: '5px',
                               fontSize: '20px',
                               fontWeight: 'bold'
                             }">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                    <p><small>2 rows × 3 columns</small></p>
                  </div>
                </div>

                <div style="background: #e8f4fc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <h5><strong>Key Concepts:</strong></h5>
                  <ul>
                    <li><strong>Rows:</strong> Horizontal lines (left to right)</li>
                    <li><strong>Columns:</strong> Vertical lines (top to bottom)</li>
                    <li><strong>Element/Entry:</strong> Each individual number in the matrix</li>
                    <li><strong>Dimensions:</strong> Number of rows × Number of columns (e.g., 2×3)</li>
                  </ul>
                </div>

                <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <h5><strong>Matrix Notation:</strong></h5>
                  <div style="text-align: center; font-size: 20px; margin: 10px 0;">
                    <strong>A = [a<sub>ij</sub>]</strong>
                  </div>
                  <p>Where:</p>
                  <ul>
                    <li><strong>A</strong> is the matrix name (usually uppercase)</li>
                    <li><strong>a<sub>ij</sub></strong> represents the element at row i, column j</li>
                    <li><strong>i</strong> = row number (starts from 1)</li>
                    <li><strong>j</strong> = column number (starts from 1)</li>
                  </ul>
                </div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <button @click="nextFundamentalsSection('dimensions')" class="next-button">
                  Next: Matrix Dimensions ➡️
                </button>
              </div>
            </div>
          </div>

          <!-- Matrix Dimensions Section -->
          <div v-else-if="currentFundamentalsSection === 'dimensions'" class="content-box" ref="dimensionsSection">
            <div class="problem-box">
              <h4 style="text-align: center; color: #2c3e50; margin-bottom: 20px;">Matrix Dimensions</h4>
              
              <div class="guide-box">
                <h5><strong>What are Matrix Dimensions?</strong></h5>
                <p>A matrix's dimensions describe its size, specifically:</p>
                <ul>
                  <li><strong>m × n</strong> (read as "m by n")</li>
                  <li><strong>m</strong>: number of rows (horizontal lines)</li>
                  <li><strong>n</strong>: number of columns (vertical lines)</li>
                </ul>
              </div>
              
              <div class="matrix-example">
                <h5><strong> Example: Find the dimensions of this matrix</strong></h5>
                <div class="matrix-display" style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px auto; max-width: 400px;">
                  <p><strong>Matrix A:</strong></p>
                  <div style="display: inline-grid; grid-template-columns: repeat(3, 60px); gap: 10px;">
                    <div v-for="(num, idx) in [2, 5, 7]" :key="idx" class="matrix-cell" 
                         :style="{
                           width: '60px',
                           height: '60px',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           background: stepDimensions >= 1 ? '#ffebee' : 'white',
                           border: stepDimensions >= 1 ? '3px solid #e74c3c' : '2px solid #3498db',
                           borderRadius: '5px',
                           fontSize: '20px',
                           fontWeight: 'bold'
                         }">
                      {{ num }}
                    </div>
                    <div v-for="(num, idx) in [1, 3, 9]" :key="idx+3" class="matrix-cell"
                         :style="{
                           width: '60px',
                           height: '60px',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           background: stepDimensions >= 1 ? '#ffeaa4' : 'white',
                           border: stepDimensions >= 1 ? '3px solid #e67e22' : '2px solid #3498db',
                           borderRadius: '5px',
                           fontSize: '20px',
                           fontWeight: 'bold'
                         }">
                      {{ num }}
                    </div>
                  </div>
                </div>
                
                <div class="step-by-step">
                  <!-- Step 1 Button -->
                  <button @click="stepDimensions = 1" class="step-button" 
                          :style="{
                            background: stepDimensions >= 1 ? '#098062' : '#078633',
                            display: 'block',
                            margin: '10px auto',
                            width: '200px'
                          }">
                    CLICK Step 1: Count the Rows
                  </button>
                  
                  <!-- Step 1 Content -->
                  <div v-if="stepDimensions >= 1" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #ffebee; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 1: Count the Rows</h5>
                    <p>Rows go horizontally (left to right). Let's count them:</p>
                    <div style="display: flex; gap: 20px; align-items: center; justify-content: center; flex-wrap: wrap;">
                      <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: #06582d; color: white; display: flex; align-items: center; justify-content: center; border-radius: 5px; margin: 0 auto 5px;">
                          Row 1
                        </div>
                        <small>First row: 2, 5, 7</small>
                      </div>
                      <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: #e67e22; color: white; display: flex; align-items: center; justify-content: center; border-radius: 5px; margin: 0 auto 5px;">
                          Row 2
                        </div>
                        <small>Second row: 1, 3, 9</small>
                      </div>
                    </div>
                    <p style="margin-top: 10px;"><strong>✅ We have counted: 2 rows</strong></p>
                    <p><strong>So m = 2</strong></p>
                  </div>
                  
                  <!-- Step 2 Button -->
                  <button @click="stepDimensions = 2" class="step-button" 
                          :disabled="stepDimensions < 1"
                          :style="{
                            background: stepDimensions >= 2 ? '#078633' : (stepDimensions >= 1 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '200px'
                          }">
                    CLICK Step 2: Count the Columns
                  </button>
                  
                  <!-- Step 2 Content -->
                  <div v-if="stepDimensions >= 2" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #e8f4fc; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 2: Count the Columns</h5>
                    <p>Columns go vertically (top to bottom). Let's count them:</p>
                    <div style="display: flex; gap: 10px; justify-content: center; margin: 10px 0; flex-wrap: wrap;">
                      <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: #086f3d; color: white; display: flex; align-items: center; justify-content: center; border-radius: 5px; margin: 0 auto 5px;">
                          Col 1
                        </div>
                        <small>Column 1: 2, 1</small>
                      </div>
                      <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: #0c9597; color: white; display: flex; align-items: center; justify-content: center; border-radius: 5px; margin: 0 auto 5px;">
                          Col 2
                        </div>
                        <small>Column 2: 5, 3</small>
                      </div>
                      <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: #0bbb43; color: white; display: flex; align-items: center; justify-content: center; border-radius: 5px; margin: 0 auto 5px;">
                          Col 3
                        </div>
                        <small>Column 3: 7, 9</small>
                      </div>
                    </div>
                    <p><strong>✅ We have counted: 3 columns</strong></p>
                    <p><strong>So n = 3</strong></p>
                  </div>
                  
                  <!-- Step 3 Button -->
                  <button @click="stepDimensions = 3" class="step-button" 
                          :disabled="stepDimensions < 2"
                          :style="{
                            background: stepDimensions >= 3 ? '#055d31' : (stepDimensions >= 2 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '200px'
                          }">
                    CLICK Step 3: Write the Dimensions
                  </button>
                  
                  <!-- Step 3 Content -->
                  <div v-if="stepDimensions >= 3" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #d5f4e6; border-radius: 8px; animation: pulse 2s infinite;">
                    <h5>Step 3: Write the Dimensions</h5>
                    <p>Now we combine our findings:</p>
                    <div style="text-align: center; font-size: 24px; font-weight: bold; color: #2c3e50; padding: 15px; background: white; border-radius: 8px; margin: 10px auto; max-width: 200px;">
                      m × n = 2 × 3
                    </div>
                    <p><strong>✅ Final Answer:</strong> This is a <strong>2×3 matrix</strong> (2 rows by 3 columns).</p>
                    <p><strong>✅ Notation:</strong> We write dimensions as <strong>rows × columns</strong></p>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <button @click="resetDimensionsSteps" class="solve-button" style="margin-right: 20px;">
                  🔄 Reset Steps
                </button>
                <button @click="nextFundamentalsSection('coefficients')" class="next-button">
                  ➡️ Next Topic
                </button>
              </div>
            </div>
          </div>

          <!-- Matrix Coefficients Section -->
          <div v-else-if="currentFundamentalsSection === 'coefficients'" class="content-box" ref="coefficientsSection">
            <div class="problem-box">
              <h4 style="text-align: center; color: #2c3e50; margin-bottom: 20px;"> <strong>Matrix Coefficients </strong></h4>
              
              <div class="guide-box">
                <h5><strong>Understanding Matrix Entry</strong> </h5>
                <p>Each element in a matrix is called an <strong>entry</strong>, <strong>element</strong>, or <strong>coefficient</strong>.</p>
                <p>We use <strong>double subscript notation</strong> to identify them:</p>
                <div style="text-align: center; font-size: 24px; font-weight: bold; color: #e74c3c; margin: 15px;">
                  a<sub>ij</sub>
                </div>
                <ul>
                  <li><strong>i</strong> = Row number (starts from 1)</li>
                  <li><strong>j</strong> = Column number (starts from 1)</li>
                  <li><strong>a<sub>ij</sub></strong> = Element at row i, column j</li>
                </ul>
              </div>
              
              <div class="matrix-example">
                <h5><strong> Example: Find a<sub>23</sub> in this matrix</strong></h5>
                <div class="matrix-display" style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px auto; max-width: 400px;">
                  <p><strong>Matrix B:</strong></p>
                  <div style="display: inline-grid; grid-template-columns: repeat(3, 70px); gap: 12px;">
                    <div v-for="(num, idx) in [8, 4, 2]" :key="idx" 
                         :style="{
                           width: '70px',
                           height: '70px',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           background: stepCoefficients >= 2 && idx === 2 ? '#ffeb3b' : 'white',
                           border: stepCoefficients >= 2 && idx === 2 ? '3px solid #ff9800' : '2px solid #3498db',
                           borderRadius: '8px',
                           fontSize: '22px',
                           fontWeight: 'bold'
                         }">
                      {{ num }}
                    </div>
                    <div v-for="(num, idx) in [3, 7, 5]" :key="idx+3"
                         :style="{
                           width: '70px',
                           height: '70px',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           background: stepCoefficients >= 2 && idx === 2 ? '#ff9800' : 'white',
                           border: stepCoefficients >= 2 && idx === 2 ? '3px solid #ff9800' : '2px solid #3498db',
                           borderRadius: '8px',
                           fontSize: '22px',
                           fontWeight: 'bold'
                         }">
                      {{ num }}
                    </div>
                  </div>
                </div>
                
                <div class="step-by-step">
                  <!-- Step 1 Button -->
                  <button @click="stepCoefficients = 1" class="step-button" 
                          :style="{
                            background: stepCoefficients >= 1 ? '#0b6405d6' : '#0b6405d6',
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 1: Understand the Subscript
                  </button>
                  
                  <!-- Step 1 Content -->
                  <div v-if="stepCoefficients >= 1" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #ede6e7; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 1: Understand the Subscript a<sub>23</sub></h5>
                    <p>The subscript tells us which element to find:</p>
                    <div style="display: flex; justify-content: center; gap: 30px; margin: 15px 0; flex-wrap: wrap;">
                      <div style="text-align: center; padding: 10px; background: white; border-radius: 8px; border: 2px solid #e74c3c;">
                        <div style="font-size: 36px; font-weight: bold; color: #e74c3c;">a<sub>23</sub></div>
                        <p style="margin: 5px 0;"><strong>First number (2)</strong></p>
                        <div style="background: #e74c3c; color: white; padding: 5px; border-radius: 5px;">
                          Row = 2
                        </div>
                      </div>
                      <div style="text-align: center; padding: 10px; background: white; border-radius: 8px; border: 2px solid #3498db;">
                        <div style="font-size: 36px; font-weight: bold; color: #3498db;">a<sub>23</sub></div>
                        <p style="margin: 5px 0;"><strong>Second number (3)</strong></p>
                        <div style="background: #3498db; color: white; padding: 5px; border-radius: 5px;">
                          Column = 3
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ So we need: Row 2, Column 3</strong></p>
                  </div>
                  
                  <!-- Step 2 Button -->
                  <button @click="stepCoefficients = 2" class="step-button" 
                          :disabled="stepCoefficients < 1"
                          :style="{
                            background: stepCoefficients >= 2 ? '#0b6405d6' : (stepCoefficients >= 1 ? '#0b6405d6' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 2: Locate the Position
                  </button>
                  
                  <!-- Step 2 Content -->
                  <div v-if="stepCoefficients >= 2" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #e8f4fc; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 2: Locate Row 2, Column 3</h5>
                    <p>Let's find this position in Matrix B:</p>
                    <div style="display: flex; align-items: center; gap: 20px; justify-content: center; flex-wrap: wrap; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>Step 2a: Go to Row 2</strong></p>
                        <div style="display: inline-grid; grid-template-columns: repeat(3, 50px); gap: 8px;">
                          <div v-for="(num, idx) in [8, 4, 2]" :key="idx" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: '#f5f5f5'; border: 1px solid #ddd; border-radius: 5px;">{{ num }}</div>
                          <div v-for="(num, idx) in [3, 7, 5]" :key="idx+3" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: idx === 2 ? '#ff9800' : '#f5f5f5'; border: idx === 2 ? '2px solid #ff9800' : '1px solid #ddd'; border-radius: 5px;">{{ num }}</div>
                        </div>
                        <p style="margin-top: 5px; color: #e67e22;"><strong>Row 2 is highlighted</strong></p>
                      </div>
                      <div style="text-align: center;">
                        <p><strong>Step 2b: Find Column 3 in Row 2</strong></p>
                        <div style="display: flex; flex-direction: column; gap: 5px;">
                          <div style="display: flex; gap: 8px; justify-content: center;">
                            <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: '#f5f5f5'; border: 1px solid #ddd; border-radius: 5px;">Col 1</div>
                            <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: '#f5f5f5'; border: 1px solid #ddd; border-radius: 5px;">Col 2</div>
                            <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: '#ff9800'; border: 2px solid #ff9800; border-radius: 5px; font-weight: bold;">Col 3</div>
                          </div>
                          <div style="display: flex; gap: 8px; justify-content: center;">
                            <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: '#f5f5f5'; border: 1px solid #ddd; border-radius: 5px;">3</div>
                            <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: '#f5f5f5'; border: 1px solid #ddd; border-radius: 5px;">7</div>
                            <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: '#ff9800'; border: 2px solid #ff9800; border-radius: 5px; font-weight: bold;">5</div>
                          </div>
                        </div>
                        <p style="margin-top: 5px; color: #e67e22;"><strong>Column 3 has value 5</strong></p>
                      </div>
                    </div>
                    <p><strong>✅ Position found: Row 2, Column 3 contains the number 5</strong></p>
                  </div>
                  
                  <!-- Step 3 Button -->
                  <button @click="stepCoefficients = 3" class="step-button" 
                          :disabled="stepCoefficients < 2"
                          :style="{
                            background: stepCoefficients >= 3 ? '#0b6405d6' : (stepCoefficients >= 2 ? '#0b6405d6' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 3: Write the Answer
                  </button>
                  
                  <!-- Step 3 Content -->
                  <div v-if="stepCoefficients >= 3" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #d5f4e6; border-radius: 8px; animation: pulse 2s infinite;">
                    <h5>Step 3: Write the Final Answer</h5>
                    <p>Now we can write our answer in proper notation:</p>
                    <div style="text-align: center; padding: 20px; background: white; border-radius: 10px; margin: 15px auto; max-width: 300px; border: 3px solid #2ecc71;">
                      <div style="font-size: 36px; font-weight: bold; color: #2c3e50; margin-bottom: 10px;">
                        a<sub>23</sub> = 5
                      </div>
                      <p style="color: #666;">Read as: "a sub two three equals five"</p>
                    </div>
                    <p><strong>✅ Final Answer:</strong> The element at row 2, column 3 is <strong>5</strong></p>
                    <p><strong>✅  Remember:</strong> Always write coefficients as a<sub>ij</sub> where i=row, j=column</p>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <button @click="resetCoefficientsSteps" class="solve-button" style="margin-right: 10px;">
                  🔄 Reset Steps
                </button>
                <button @click="nextFundamentalsSection('specialMatrices')" class="next-button">
                  ➡️ Next Topic
                </button>
              </div>
            </div>
          </div>

          <!-- Zero and Identity Matrices Section -->
          <div v-else-if="currentFundamentalsSection === 'specialMatrices'" class="content-box" ref="specialMatricesSection">
            <div class="problem-box">
              <h4 style="text-align: center; color: #0f151c; margin-bottom: 20px;"><strong>Special Matrices: Zero & Identity</strong></h4>
              
              <div class="guide-box">
                <h5><strong>Special Types of Matrices</strong></h5>
                <p>Let's explore two important special matrices and their properties.</p>
              </div>
              
              <!-- Zero Matrix Section -->
              <div style="margin: 30px 0;">
                <h4 style="color: #191413; text-align: center;">1. Zero Matrix (O)</h4>
                <p style="text-align: center;"><strong>Definition:</strong> All elements are 0</p>
                
                <div class="matrix-example">
                  <h5><strong> Example: 2×3 Zero Matrix</strong></h5>
                  <div class="matrix-display" style="background: #ffeaea; padding: 20px; border-radius: 10px; margin: 15px auto; max-width: 350px;">
                    <div style="display: inline-grid; grid-template-columns: repeat(3, 60px); gap: 10px;">
                      <div v-for="n in 6" :key="n" 
                           :style="{
                             width: '60px',
                             height: '60px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             background: 'white',
                             border: '2px solid #e74c3c',
                             borderRadius: '5px',
                             fontSize: '24px',
                             fontWeight: 'bold',
                             color: '#e74c3c'
                           }">
                        0
                      </div>
                    </div>
                  </div>
                  
                  <div class="step-by-step">
                    <!-- Step 1 Button -->
                    <button @click="stepZeroIdentity = 1" class="step-button" 
                            :style="{
                              background: stepZeroIdentity >= 1 ? '#0b6405d6' : '#0b6405d6',
                              display: 'block',
                              margin: '10px auto',
                              width: '250px'
                            }">
                      CLICK Step 1: Recognize Zero Matrix
                    </button>
                    
                    <!-- Step 1 Content -->
                    <div v-if="stepZeroIdentity >= 1" class="step-content" 
                         style="margin: 15px 0; padding: 15px; background: #ffebee; border-radius: 8px; animation: fadeIn 0.5s;">
                      <h5>Step 1: Recognize Zero Matrix Pattern</h5>
                      <p>A Zero Matrix has a very simple pattern:</p>
                      <div style="text-align: center; padding: 15px; background: white; border-radius: 8px; margin: 10px 0;">
                        <div style="font-size: 24px; font-weight: bold; color: #e74c3c;">
                          Every element = 0
                        </div>
                        <p style="margin-top: 10px;">No matter what size, all entries are zero.</p>
                      </div>
                      <p><strong>✅ Key Feature:</strong> All elements are 0</p>
                    </div>
                    
                    <!-- Step 2 Button -->
                    <button @click="stepZeroIdentity = 2" class="step-button" 
                            :disabled="stepZeroIdentity < 1"
                            :style="{
                              background: stepZeroIdentity >= 2 ? '#0b6405d6' : (stepZeroIdentity >= 1 ? '#0b6405d6' : '#cccccc'),
                              display: 'block',
                              margin: '10px auto',
                              width: '250px'
                            }">
                      CLICK Step 2: Additive Identity Property
                    </button>
                    
                    <!-- Step 2 Content -->
                    <div v-if="stepZeroIdentity >= 2" class="step-content" 
                         style="margin: 15px 0; padding: 15px; background: #e8f4fc; border-radius: 8px; animation: fadeIn 0.5s;">
                      <h5>Step 2: Zero Matrix as Additive Identity</h5>
                      <p>When you add a Zero Matrix to any matrix A:</p>
                      <div style="text-align: center; padding: 15px; background: white; border-radius: 8px; margin: 10px 0;">
                        <div style="font-size: 24px; font-weight: bold; color: #2c3e50;">
                          A + O = A
                        </div>
                        <p style="margin-top: 10px;">Just like adding zero to a number!</p>
                      </div>
                      
                      <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 15px 0;">
                        <div style="text-align: center;">
                          <div style="display: grid; grid-template-columns: repeat(2, 40px); gap: 5px;">
                            <div v-for="(num, idx) in [4, 2]" :key="idx" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #bbdefb; border: 2px solid #1976d2;">{{ num }}</div>
                            <div v-for="(num, idx) in [1, 5]" :key="idx+2" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #bbdefb; border: 2px solid #1976d2;">{{ num }}</div>
                          </div>
                          <small>Matrix A</small>
                        </div>
                        <div style="font-size: 20px;">+</div>
                        <div style="text-align: center;">
                          <div style="display: grid; grid-template-columns: repeat(2, 40px); gap: 5px;">
                            <div v-for="n in 4" :key="n" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #ffcdd2; border: 2px solid #d32f2f;">0</div>
                          </div>
                          <small>Zero Matrix O</small>
                        </div>
                        <div style="font-size: 20px;">=</div>
                        <div style="text-align: center;">
                          <div style="display: grid; grid-template-columns: repeat(2, 40px); gap: 5px;">
                            <div v-for="(num, idx) in [4, 2]" :key="idx" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #c8e6c9; border: 2px solid #388e3c;">{{ num }}</div>
                            <div v-for="(num, idx) in [1, 5]" :key="idx+2" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #c8e6c9; border: 2px solid #388e3c;">{{ num }}</div>
                          </div>
                          <small>Result = A</small>
                        </div>
                      </div>
                      
                      <p><strong>✅ Property:</strong> Zero Matrix doesn't change other matrices when added</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Identity Matrix Section -->
              <div style="margin: 30px 0;">
                <h4 style="color: #0c0d0c; text-align: center;">2. Identity Matrix (I)</h4>
                <p style="text-align: center;"><strong>Definition:</strong> Square matrix with 1's on diagonal, 0's elsewhere</p>
                
                <div class="matrix-example">
                  <h5><strong> Example: 3×3 Identity Matrix</strong></h5>
                  <div class="matrix-display" style="background: #e8f5e9; padding: 20px; border-radius: 10px; margin: 15px auto; max-width: 350px;">
                    <div style="display: inline-grid; grid-template-columns: repeat(3, 60px); gap: 10px;">
                      <div v-for="n in 9" :key="n"
                           :style="{
                             width: '60px',
                             height: '60px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             background: (n-1) % 4 === 0 ? '#c8e6c9' : 'white',
                             border: '2px solid #2ecc71',
                             borderRadius: '5px',
                             fontSize: '24px',
                             fontWeight: 'bold',
                             color: '#2ecc71'
                           }">
                        {{ (n-1) % 4 === 0 ? '1' : '0' }}
                      </div>
                    </div>
                  </div>
                  
                  <div class="step-by-step">
                    <!-- Step 3 Button -->
                    <button @click="stepZeroIdentity = 3" class="step-button" 
                            :disabled="stepZeroIdentity < 2"
                            :style="{
                              background: stepZeroIdentity >= 3 ? '#0b6405d6' : (stepZeroIdentity >= 2 ? '#0b6405d6' : '#cccccc'),
                              display: 'block',
                              margin: '10px auto',
                              width: '250px'
                            }">
                      CLICK Step 3: Recognize Identity Matrix
                    </button>
                    
                    <!-- Step 3 Content -->
                    <div v-if="stepZeroIdentity >= 3" class="step-content" 
                         style="margin: 15px 0; padding: 15px; background: #e8f4fc; border-radius: 8px; animation: fadeIn 0.5s;">
                      <h5>Step 3: Recognize Identity Matrix Pattern</h5>
                      <p>An Identity Matrix has a specific pattern:</p>
                      <div style="text-align: center; padding: 15px; background: white; border-radius: 8px; margin: 10px 0;">
                        <div style="display: inline-block; padding: 10px;">
                          <div style="font-size: 20px; font-weight: bold; color: #2ecc71;">Main Diagonal:</div>
                          <div style="font-size: 24px; margin: 5px 0;">1's only</div>
                        </div>
                        <div style="display: inline-block; padding: 10px; margin-left: 20px;">
                          <div style="font-size: 20px; font-weight: bold; color: #666;">Everywhere else:</div>
                          <div style="font-size: 24px; margin: 5px 0;">0's</div>
                        </div>
                      </div>
                      <p><strong>✅ Key Features:</strong></p>
                      <ul>
                        <li>Must be square (same rows and columns)</li>
                        <li>1's on main diagonal (top-left to bottom-right)</li>
                        <li>0's everywhere else</li>
                      </ul>
                    </div>
                    
                    <!-- Step 4 Button -->
                    <button @click="stepZeroIdentity = 4" class="step-button" 
                            :disabled="stepZeroIdentity < 3"
                            :style="{
                              background: stepZeroIdentity >= 4 ? '#0b6405d6' : (stepZeroIdentity >= 3 ? '#0b6405d6' : '#cccccc'),
                              display: 'block',
                              margin: '10px auto',
                              width: '250px'
                            }">
                      CLICK Step 4: Multiplicative Identity Property
                    </button>
                    
                    <!-- Step 4 Content -->
                    <div v-if="stepZeroIdentity >= 4" class="step-content" 
                         style="margin: 15px 0; padding: 15px; background: #a2a19f74; border-radius: 8px; animation: fadeIn 0.5s;">
                      <h5>Step 4: Identity Matrix as Multiplicative Identity</h5>
                      <p>When you multiply any matrix A by an Identity Matrix:</p>
                      <div style="text-align: center; padding: 15px; background: white; border-radius: 8px; margin: 10px 0;">
                        <div style="font-size: 24px; font-weight: bold; color: #2c3e50;">
                          A × I = A
                        </div>
                        <p style="margin-top: 10px;">Just like multiplying by 1!</p>
                      </div>
                      
                      <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 15px 0;">
                        <div style="text-align: center;">
                          <div style="display: grid; grid-template-columns: repeat(2, 40px); gap: 5px;">
                            <div v-for="(num, idx) in [3, 6]" :key="idx" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #e1bee7; border: 2px solid #7b1fa2;">{{ num }}</div>
                            <div v-for="(num, idx) in [2, 4]" :key="idx+2" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #e1bee7; border: 2px solid #7b1fa2;">{{ num }}</div>
                          </div>
                          <small>Matrix A</small>
                        </div>
                        <div style="font-size: 20px;">×</div>
                        <div style="text-align: center;">
                          <div style="display: grid; grid-template-columns: repeat(2, 40px); gap: 5px;">
                            <div v-for="(num, idx) in [1, 0]" :key="idx" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: idx === 0 ? '#c8e6c9' : 'white'; border: '2px solid #2ecc71';">{{ num }}</div>
                            <div v-for="(num, idx) in [0, 1]" :key="idx+2" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: idx === 1 ? '#c8e6c9' : 'white'; border: '2px solid #2ecc71';">{{ num }}</div>
                          </div>
                          <small>Identity I₂</small>
                        </div>
                        <div style="font-size: 20px;">=</div>
                        <div style="text-align: center;">
                          <div style="display: grid; grid-template-columns: repeat(2, 40px); gap: 5px;">
                            <div v-for="(num, idx) in [3, 6]" :key="idx" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #fff9c4; border: 2px solid #f57f17;">{{ num }}</div>
                            <div v-for="(num, idx) in [2, 4]" :key="idx+2" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #fff9c4; border: 2px solid #f57f17;">{{ num }}</div>
                          </div>
                          <small>Result = A</small>
                        </div>
                      </div>
                      
                      <p><strong>✅ Property:</strong> Identity Matrix doesn't change other matrices when multiplied</p>
                    </div>
                    
                    <!-- Step 5 Button -->
                    <button @click="stepZeroIdentity = 5" class="step-button" 
                            :disabled="stepZeroIdentity < 4"
                            :style="{
                              background: stepZeroIdentity >= 5 ? '#0b6405d6' : (stepZeroIdentity >= 4 ? '#0b6405d6' : '#cccccc'),
                              display: 'block',
                              margin: '10px auto',
                              width: '250px'
                            }">
                      CLICK Step 5: Comparison Summary
                    </button>
                    
                    <!-- Step 5 Content -->
                    <div v-if="stepZeroIdentity >= 5" class="step-content" 
                         style="margin: 15px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; animation: fadeIn 0.5s;">
                      <h5>Step 5: Quick Comparison</h5>
                      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                          <tr style="background: #053556; color: white;">
                            <th style="padding: 10px; border: 1px solid #edd69a; text-align: center;">Feature</th>
                            <th style="padding: 10px; border: 1px solid #edd69a; text-align: center;">Zero Matrix (O)</th>
                            <th style="padding: 10px; border: 1px solid #edd69a; text-align: center;">Identity Matrix (I)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style="background: white;">
                            <td style="padding: 10px; border: 1px solid #edd69a;"><strong>Elements</strong></td>
                            <td style="padding: 10px; border: 1px solid #edd69a; text-align: center;">All 0's</td>
                            <td style="padding: 10px; border: 1px solid #edd69a; text-align: center;">Diagonal: 1's<br>Others: 0's</td>
                          </tr>
                          <tr style="background: #f9f9f9;">
                            <td style="padding: 10px; border: 1px solid #edd69a;"><strong>Shape</strong></td>
                            <td style="padding: 10px; border: 1px solid #edd69a; text-align: center;">Any m×n</td>
                            <td style="padding: 10px; border: 1px solid #edd69a; text-align: center;">Square only (n×n)</td>
                          </tr>
                          <tr style="background: white;">
                            <td style="padding: 10px; border: 1px solid #edd69a;"><strong>Property</strong></td>
                            <td style="padding: 10px; border: 1px solid #edd69a; text-align: center;">A + O = A<br>(Additive Identity)</td>
                            <td style="padding: 10px; border: 1px solid #edd69a; text-align: center;">A × I = A<br>(Multiplicative Identity)</td>
                          </tr>
                        </tbody>
                      </table>
                      <p style="margin-top: 15px;"><strong>✅ Summary:</strong></p>
                      <ul>
                        <li><strong>Zero Matrix:</strong> Like adding 0 to a number</li>
                        <li><strong>Identity Matrix:</strong> Like multiplying by 1</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <button @click="resetZeroIdentitySteps" class="solve-button" style="margin-right: 10px;">
                  🔄 Reset Steps
                </button>
                <button @click="nextFundamentalsSection('unitVectors')" class="next-button">
                  ➡️ Next Topic
                </button>
              </div>
            </div>
          </div>

          <!-- Unit Vectors Section -->
          <div v-else-if="currentFundamentalsSection === 'unitVectors'" class="content-box" ref="unitVectorsSection">
            <div class="problem-box">
              <h4 style="text-align: center; color: #0e0f10; margin-bottom: 20px;"><strong>Unit Vectors</strong></h4>
              
              <div class="guide-box">
                <h5>What are Unit Vectors?</h5>
                <p><strong>Unit vectors</strong> are special column vectors with:</p>
                <ul>
                  <li>Exactly one element equal to 1</li>
                  <li>All other elements equal to 0</li>
                  <li>Denoted as e<sub>1</sub>, e<sub>2</sub>, e<sub>3</sub>, etc.</li>
                </ul>
              </div>
              
              <div class="matrix-example">
                <h4> Example:   Unit Vectors e<sub>1</sub>, e<sub>2</sub>, e<sub>3</sub></h4>
                <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; margin: 20px 0;">
                  <!-- e1 -->
                  <div style="text-align: center;">
                    <div class="matrix-display" style="background: #fff3e0; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                      <div style="display: grid; grid-template-rows: repeat(3, 50px); gap: 8px;">
                        <div v-for="(val, idx) in [1, 0, 0]" :key="idx"
                             :style="{
                               width: '60px',
                               height: '50px',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               background: idx === 0 ? '#ffcc80' : 'white',
                               border: '2px solid #ff9800',
                               borderRadius: '5px',
                               fontSize: '18px',
                               fontWeight: 'bold'
                             }">
                          {{ val }}
                        </div>
                      </div>
                    </div>
                    <p><strong>e<sub>1</sub></strong><br><small>1 in first position</small></p>
                  </div>
                  
                  <!-- e2 -->
                  <div style="text-align: center;">
                    <div class="matrix-display" style="background: #e8f5e9; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                      <div style="display: grid; grid-template-rows: repeat(3, 50px); gap: 8px;">
                        <div v-for="(val, idx) in [0, 1, 0]" :key="idx"
                             :style="{
                               width: '60px',
                               height: '50px',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               background: idx === 1 ? '#a5d6a7' : 'white',
                               border: '2px solid #4caf50',
                               borderRadius: '5px',
                               fontSize: '18px',
                               fontWeight: 'bold'
                             }">
                          {{ val }}
                        </div>
                      </div>
                    </div>
                    <p><strong>e<sub>2</sub></strong><br><small>1 in second position</small></p>
                  </div>
                  
                  <!-- e3 -->
                  <div style="text-align: center;">
                    <div class="matrix-display" style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                      <div style="display: grid; grid-template-rows: repeat(3, 50px); gap: 8px;">
                        <div v-for="(val, idx) in [0, 0, 1]" :key="idx"
                             :style="{
                               width: '60px',
                               height: '50px',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               background: idx === 2 ? '#90caf9' : 'white',
                               border: '2px solid #2196f3',
                               borderRadius: '5px',
                               fontSize: '18px',
                               fontWeight: 'bold'
                             }">
                          {{ val }}
                        </div>
                      </div>
                    </div>
                    <p><strong>e<sub>3</sub></strong><br><small>1 in third position</small></p>
                  </div>
                </div>
                
                <div class="step-by-step">
                  <!-- Step 1 Button -->
                  <button @click="stepUnitVectors = 1" class="step-button" 
                          :style="{
                            background: stepUnitVectors >= 1 ? '#055933' : '#055933',
                            display: 'block',
                            margin: '10px auto',
                            width: '300px'
                          }">
                    CLICK Step 1: Understand Unit Vector Pattern
                  </button>
                  
                  <!-- Step 1 Content -->
                  <div v-if="stepUnitVectors >= 1" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #f4e7e9b7; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 1: Unit Vector Pattern</h5>
                    <p>Each unit vector e<sub>k</sub> has:</p>
                    <div style="text-align: center; padding: 15px; background: white; border-radius: 8px; margin: 10px 0;">
                      <div style="font-size: 24px; font-weight: bold; color: #e74c3c;">
                        Only one 1, all others 0
                      </div>
                      <p style="margin-top: 10px;">The position of the 1 tells us which unit vector it is.</p>
                    </div>
                    
                    <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin: 15px 0;">
                      <div style="text-align: center; padding: 10px; background: #fff3e0; border-radius: 8px;">
                        <p><strong>e<sub>1</sub></strong></p>
                        <p>1 in position 1<br>0 in positions 2, 3</p>
                      </div>
                      <div style="text-align: center; padding: 10px; background: #e8f5e9; border-radius: 8px;">
                        <p><strong>e<sub>2</sub></strong></p>
                        <p>1 in position 2<br>0 in positions 1, 3</p>
                      </div>
                      <div style="text-align: center; padding: 10px; background: #e3f2fd; border-radius: 8px;">
                        <p><strong>e<sub>3</sub></strong></p>
                        <p>1 in position 3<br>0 in positions 1, 2</p>
                      </div>
                    </div>
                    
                    <p><strong>✅ Pattern:</strong> e<sub>k</sub> has 1 at position k, 0 elsewhere</p>
                  </div>
                  
                  <!-- Step 2 Button -->
                  <button @click="stepUnitVectors = 2" class="step-button" 
                          :disabled="stepUnitVectors < 1"
                          :style="{
                            background: stepUnitVectors >= 2 ? '#055933' : (stepUnitVectors >= 1 ? '#055933' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '300px'
                          }">
                    CLICK Step 2: Extracting Columns with Unit Vectors
                  </button>
                  
                  <!-- Step 2 Content -->
                  <div v-if="stepUnitVectors >= 2" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #e8f4fc; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5><strong>Step 2: How Unit Vectors Extract Columns</strong></h5>
                    <p>When we multiply a matrix by e<sub>k</sub>, we get the k-th column:</p>
                    <div style="text-align: center; padding: 15px; background: white; border-radius: 8px; margin: 10px 0;">
                      <div style="font-size: 24px; font-weight: bold; color: #2c3e50;">
                        C × e<sub>k</sub> = k-th column of C
                      </div>
                    </div>
                    
                    <div style="background: #f0f4ff; padding: 20px; border-radius: 10px; margin: 15px 0;">
                      <p><strong>Example: Extract 2nd column from Matrix C</strong></p>
                      
                      <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 15px 0;">
                        <!-- Matrix C -->
                        <div style="text-align: center;">
                          <p><strong>Matrix C</strong></p>
                          <div style="display: grid; grid-template-columns: repeat(3, 45px); gap: 5px;">
                            <div v-for="(num, idx) in [2, 5, 9]" :key="idx" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; background: '#e3f2fd'; border: 2px solid #1976d2;">{{ num }}</div>
                            <div v-for="(num, idx) in [4, 7, 1]" :key="idx+3" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; background: '#e3f2fd'; border: 2px solid #1976d2;">{{ num }}</div>
                            <div v-for="(num, idx) in [6, 3, 8]" :key="idx+6" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; background: '#e3f2fd'; border: 2px solid #1976d2;">{{ num }}</div>
                          </div>
                        </div>
                        
                        <!-- Times Sign -->
                        <div style="font-size: 20px;">×</div>
                        
                        <!-- e2 -->
                        <div style="text-align: center;">
                          <p><strong>e<sub>2</sub></strong></p>
                          <div style="display: grid; grid-template-rows: repeat(3, 45px); gap: 5px;">
                            <div v-for="(val, idx) in [0, 1, 0]" :key="idx"
                                 :style="{
                                   width: '45px',
                                   height: '45px',
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   background: idx === 1 ? '#c8e6c9' : 'white',
                                   border: '2px solid #2ecc71'
                                 }">
                              {{ val }}
                            </div>
                          </div>
                        </div>
                        
                        <!-- Equals Sign -->
                        <div style="font-size: 20px;">=</div>
                        
                        <!-- Result -->
                        <div style="text-align: center;">
                          <p><strong>2nd Column</strong></p>
                          <div style="display: grid; grid-template-rows: repeat(3, 45px); gap: 5px;">
                            <div v-for="(num, idx) in [5, 7, 3]" :key="idx"
                                 :style="{
                                   width: '45px',
                                   height: '45px',
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifycontent: 'center',
                                   background: '#fff9c4',
                                   border: '2px solid #ff9800'
                                 }">
                              {{ num }}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p style="text-align: center;"><strong>Why this works:</strong> Multiplying by e<sub>2</sub> selects only the 2nd column!</p>
                    </div>
                    
                    <p><strong>✅ Key Insight:</strong> Unit vectors act like "column selectors"</p>
                  </div>
                  
                  <!-- Step 3 Button -->
                  <button @click="stepUnitVectors = 3" class="step-button" 
                          :disabled="stepUnitVectors < 2"
                          :style="{
                            background: stepUnitVectors >= 3 ? '#055933' : (stepUnitVectors >= 2 ? '#055933' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '300px'
                          }">
                    CLICK Step 3: Summary
                  </button>
                  
                  <!-- Step 3 Content -->
                  <div v-if="stepUnitVectors >= 3" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #d5f4e6; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 3: Matrix Fundamentals Summary</h5>
                    
                    <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
                      <h5> Quick Summary</h5>
                      <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                        <div style="flex: 1; min-width: 200px; padding: 10px; background: white; border-radius: 5px;">
                          <p><strong> Matrix Definition:</strong> Rectangular array of numbers</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; padding: 10px; background: white; border-radius: 5px;">
                          <p><strong> Matrix Dimensions:</strong> m×n = rows × columns</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; padding: 10px; background: white; border-radius: 5px;">
                          <p><strong> Matrix Coefficients:</strong> a<sub>ij</sub> = row i, column j</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; padding: 10px; background: white; border-radius: 5px;">
                          <p><strong> Zero Matrix:</strong> All 0's, A + O = A</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; padding: 10px; background: white; border-radius: 5px;">
                          <p><strong>Identity Matrix:</strong> Diagonal 1's, A × I = A</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; padding: 10px; background: white; border-radius: 5px;">
                          <p><strong> Unit Vectors:</strong> Single 1, extract columns</p>
                        </div>
                      </div>
                    </div>
                    
                    <p style="margin-top: 15px; text-align: center;"><strong>🎉 You've completed the Matrix Fundamentals section!</strong></p>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <button @click="resetUnitVectorsSteps" class="solve-button" style="margin-right: 10px; padding: 15px 30px; font-size: 15px;">
                  🔄 Reset Steps
                </button>
                <button @click="nextFundamentalsSection('quiz')" class="next-button" style="padding: 15px 30px; font-size: 15px;">
                   Next ➡️
                </button>
              </div>
            </div>
          </div>

          <!-- ✅ Matrix Fundamentals Mastery Quiz -->
          <div v-else-if="currentFundamentalsSection === 'quiz'" class="content-box" ref="fundamentalsQuizSection">
            <h4 style="text-align: center; color: #121314; margin-bottom: 20px;"><strong> Matrix Fundamentals Mastery Quiz </strong></h4>
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
              <h4>Quiz {{ currentLawQuizIndex + 1 }}</h4>
              
              <!-- Quiz 1: Matrix Dimensions -->
              <div v-if="currentLawQuizIndex === 0">
                <p><strong>Look at the matrix below and type its dimensions:</strong></p>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 20px 0;">
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #3498db;">
                    <div style="display: inline-grid; grid-template-columns: repeat(3, 70px); gap: 15px;">
                      <div v-for="(num, idx) in [3, 8, 1]" :key="idx" style="width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 24px; font-weight: bold;">
                        {{ num }}
                      </div>
                      <div v-for="(num, idx) in [5, 2, 9]" :key="idx+3" style="width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 24px; font-weight: bold;">
                        {{ num }}
                      </div>
                      <div v-for="(num, idx) in [7, 4, 6]" :key="idx+6" style="width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 24px; font-weight: bold;">
                        {{ num }}
                      </div>
                    </div>
                  </div>
                  
                  <div style="text-align: center; width: 100%; max-width: 400px;">
                    <p><strong>What are the dimensions of this matrix?</strong></p>
                    <p><em>Format your answer as: rows × columns (example: 2×3)</em></p>
                    <input
                      v-model="lawAnswers[currentLawQuizIndex]"
                      placeholder="Type dimensions here (e.g., 2×3)"
                      class="answer-input"
                      style="width: 100%; max-width: 300px;"
                      @input="lawChecked[currentLawQuizIndex] = 0"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Quiz 2: Matrix Element Identification -->
              <div v-if="currentLawQuizIndex === 1">
                <p><strong>Given the matrix below, what is the value of a<sub>32</sub>?</strong></p>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 20px 0;">
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #e74c3c;">
                    <p style="text-align: center; margin-bottom: 15px;"><strong>Matrix D:</strong></p>
                    <div style="display: inline-grid; grid-template-columns: repeat(4, 60px); gap: 12px;">
                      <div v-for="(num, idx) in [9, 4, 7, 2]" :key="idx" 
                           :style="{
                             width: '60px',
                             height: '60px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             background: idx === 1 ? '#fff3cd' : 'white',
                             border: idx === 1 ? '3px solid #ff9800' : '2px solid #e74c3c',
                             borderRadius: '5px',
                             fontSize: '22px',
                             fontWeight: 'bold'
                           }">
                        {{ num }}
                      </div>
                      <div v-for="(num, idx) in [3, 8, 1, 5]" :key="idx+4"
                           :style="{
                             width: '60px',
                             height: '60px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             background: idx === 0 ? '#fff3cd' : 'white',
                             border: idx === 0 ? '3px solid #ff9800' : '2px solid #e74c3c',
                             borderRadius: '5px',
                             fontSize: '22px',
                             fontWeight: 'bold'
                           }">
                        {{ num }}
                      </div>
                      <div v-for="(num, idx) in [6, 2, 9, 4]" :key="idx+8"
                           :style="{
                             width: '60px',
                             height: '60px',
                             display: 'flex',
                             alignItems: 'center',
                             justifycontent: 'center',
                             background: idx === 1 ? '#ffeb3b' : 'white',
                             border: idx === 1 ? '3px solid #ff9800' : '2px solid #e74c3c',
                             borderRadius: '5px',
                             fontSize: '22px',
                             fontWeight: 'bold'
                           }">
                        {{ num }}
                      </div>
                    </div>
                    <p style="text-align: center; margin-top: 15px; color: #ff9800;"><strong>Hint: a<sub>32</sub> means Row 3, Column 2</strong></p>
                  </div>
                  
                  <div style="text-align: center; width: 100%; max-width: 400px;">
                    <p><strong>What is the value of a<sub>32</sub>?</strong></p>
                    <input
                      v-model="lawAnswers[currentLawQuizIndex]"
                      placeholder="Type the numerical value"
                      class="answer-input"
                      style="width: 100%; max-width: 300px;"
                      @input="lawChecked[currentLawQuizIndex] = 0"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Quiz 3: Identify Matrix Type -->
              <div v-if="currentLawQuizIndex === 2">
                <p><strong>What type of matrix is shown below?</strong></p>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 20px 0;">
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #2ecc71;">
                    <p style="text-align: center; margin-bottom: 15px;"><strong>Matrix E:</strong></p>
                    <div style="display: inline-grid; grid-template-columns: repeat(4, 55px); gap: 10px;">
                      <div v-for="n in 16" :key="n"
                           :style="{
                             width: '55px',
                             height: '55px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             background: (n-1) % 5 === 0 ? '#c8e6c9' : 'white',
                             border: '2px solid #2ecc71',
                             borderRadius: '5px',
                             fontSize: '20px',
                             fontWeight: 'bold',
                             color: (n-1) % 5 === 0 ? '#2ecc71' : '#666'
                           }">
                        {{ (n-1) % 5 === 0 ? '1' : '0' }}
                      </div>
                    </div>
                  </div>
                  
                  <div style="text-align: center; width: 100%; max-width: 400px;">
                    <p><strong>Choose from these matrix types:</strong></p>
                    <p style="color: #666; font-size: 14px;">Zero Matrix, Identity Matrix, Symmetric Matrix, Diagonal Matrix</p>
                    <input
                      v-model="lawAnswers[currentLawQuizIndex]"
                      placeholder="Type the matrix type"
                      class="answer-input"
                      style="width: 100%; max-width: 300px;"
                      @input="lawChecked[currentLawQuizIndex] = 0"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Quiz 4: Matrix Transpose -->
              <div v-if="currentLawQuizIndex === 3">
                <p><strong>What is the transpose of the following 2×3 matrix?</strong></p>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 20px 0;">
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #9b59b6;">
                    <p style="text-align: center; margin-bottom: 15px;"><strong>Original Matrix F:</strong></p>
                    <div style="display: inline-grid; grid-template-columns: repeat(3, 70px); gap: 15px;">
                      <div v-for="(num, idx) in [5, 8, 3]" :key="idx" style="width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #9b59b6; border-radius: 5px; font-size: 24px; font-weight: bold;">
                        {{ num }}
                      </div>
                      <div v-for="(num, idx) in [2, 7, 1]" :key="idx+3" style="width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #9b59b6; border-radius: 5px; font-size: 24px; font-weight: bold;">
                        {{ num }}
                      </div>
                    </div>
                  </div>
                  
                  <div style="background: #f3e5f5; padding: 20px; border-radius: 10px; border: 2px dashed #9b59b6; width: 100%; max-width: 400px;">
                    <p style="text-align: center; margin-bottom: 15px;"><strong>Transpose F<sup>T</sup> will be:</strong></p>
                    <p><strong>What will be the dimensions of the transposed matrix?</strong></p>
                    <input
                      v-model="lawAnswers[currentLawQuizIndex]"
                      placeholder="Type dimensions (e.g., 3×2)"
                      class="answer-input"
                      style="width: 100%; max-width: 300px; margin: 10px auto;"
                      @input="lawChecked[currentLawQuizIndex] = 0"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Quiz 5: Scalar Multiplication -->
              <div v-if="currentLawQuizIndex === 4">
                <p><strong>If we multiply the following matrix by scalar 3, what will be the value in position a<sub>22</sub> of the result?</strong></p>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 20px 0;">
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #e67e22;">
                    <p style="text-align: center; margin-bottom: 15px;"><strong>Matrix G (to be multiplied by 3):</strong></p>
                    <div style="display: inline-grid; grid-template-columns: repeat(3, 65px); gap: 12px;">
                      <div v-for="(num, idx) in [2, 5, 1]" :key="idx" style="width: 65px; height: 65px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e67e22; border-radius: 5px; font-size: 22px;">
                        {{ num }}
                      </div>
                      <div v-for="(num, idx) in [4, 6, 3]" :key="idx+3"
                           :style="{
                             width: '65px',
                             height: '65px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             background: idx === 1 ? '#ffeb3b' : 'white',
                             border: idx === 1 ? '3px solid #ff9800' : '2px solid #e67e22',
                             borderRadius: '5px',
                             fontSize: '22px'
                           }">
                        {{ num }}
                      </div>
                      <div v-for="(num, idx) in [7, 2, 9]" :key="idx+6" style="width: 65px; height: 65px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e67e22; border-radius: 5px; font-size: 22px;">
                        {{ num }}
                      </div>
                    </div>
                  </div>
                  
                  <div style="text-align: center; width: 100%; max-width: 400px;">
                    <p><strong>Calculation: 3 × Matrix G</strong></p>
                    <p><strong>What is 3 × a<sub>22</sub>?</strong></p>
                    <input
                      v-model="lawAnswers[currentLawQuizIndex]"
                      placeholder="Type the numerical result"
                      class="answer-input"
                      style="width: 100%; max-width: 300px;"
                      @input="lawChecked[currentLawQuizIndex] = 0"
                    />
                  </div>
                </div>
              </div>
              
              <button @click="checkLaw(currentLawQuizIndex)" :disabled="lawChecked[currentLawQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
              <div v-if="lawFeedbacks[currentLawQuizIndex]" class="result-box">
                <p>{{ lawFeedbacks[currentLawQuizIndex] }}</p>
              </div>
              <div v-if="currentLawMessage && currentLawQuizIndex === lastLawQuizWithMessage" class="fade-message">{{ currentLawMessage }}</div>
              
              <!-- Previous/Next Buttons - CHANGED: Removed Previous button and only show Next button for questions 1-4 -->
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
                  @click="completeMatrixFundamentals" 
                  :disabled="lawScore < lawQuizzes.length"
                  class="next-button" 
                  :style="lawScore < lawQuizzes.length ? 'background: #cccccc; cursor: not-allowed;' : ''"
                  style="margin-top: 10px;"
                >
                  ✅ Complete Matrix Fundamentals
                </button>
                <p v-if="lawScore < lawQuizzes.length" style="color: #666; font-size: 14px; margin-top: 10px;">
                  Please achieve a perfect score ({{ lawQuizzes.length }}/{{ lawQuizzes.length }}) to continue.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- ✅ BASIC MATRIX OPERATIONS TOPIC -->
        <div v-else-if="selectedTopic === 'matrixOperations'">
          <h5 class="title">📚 Basic Matrix Operations</h5>
          
          
          <!-- Matrix Addition Section -->
          <div v-if="currentOperationsSection === 'addition'" class="content-box" ref="additionSection">
            <div class="problem-box">
              <h4 style="text-align: center; color: #2c3e50; margin-bottom: 20px;">1. Matrix Addition</h4>
              
              <div class="guide-box">
                <h5><strong>Rules for Matrix Addition:</strong></h5>
                <ul>
                  <li>✅ You can only add matrices of the <strong>same dimensions</strong></li>
                  <li>✅ Add <strong>corresponding elements</strong></li>
                  <li>❌ Different dimensions cannot be added</li>
                </ul>
                
                <div style="background: #e8f4fc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <h5><strong>Formula:</strong></h5>
                  <div style="text-align: center; font-size: 20px; margin: 10px 0;">
                    <strong>If A = [a<sub>ij</sub>] and B = [b<sub>ij</sub>], then C = A + B = [a<sub>ij</sub> + b<sub>ij</sub>]</strong>
                  </div>
                  <p>Each element c<sub>ij</sub> = a<sub>ij</sub> + b<sub>ij</sub></p>
                </div>
              </div>
              
              <div class="matrix-example">
                <h5><strong> Example: Add Matrix A and Matrix B</strong></h5>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px auto; max-width: 500px;">
                  <div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <!-- Matrix A -->
                    <div style="text-align: center;">
                      <p><strong>Matrix A:</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [2, 4]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [3, 1]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Plus Sign -->
                    <div style="font-size: 24px; font-weight: bold;">+</div>
                    
                    <!-- Matrix B -->
                    <div style="text-align: center;">
                      <p><strong>Matrix B:</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [5, 2]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [1, 3]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Equals Sign -->
                    <div style="font-size: 24px; font-weight: bold;">=</div>
                    
                    <!-- Result -->
                    <div style="text-align: center;">
                      <p><strong>Result:</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [7, 6]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [4, 4]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="step-by-step">
                  <!-- Step 1 Button -->
                  <button @click="stepOperations = 1" class="step-button" 
                          :style="{
                            background: stepOperations >= 1 ? '#098062' : '#078633',
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 1: Check Dimensions
                  </button>
                  
                  <!-- Step 1 Content -->
                  <div v-if="stepOperations >= 1" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #ffebee; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 1: Check Dimensions</h5>
                    <p>Both matrices are 2×2:</p>
                    <div style="display: flex; justify-content: center; gap: 30px; margin: 10px 0;">
                      <div style="text-align: center;">
                        <div style="background: #3498db; color: white; padding: 5px 15px; border-radius: 5px;">
                          Matrix A: 2×2
                        </div>
                      </div>
                      <div style="text-align: center;">
                        <div style="background: #e74c3c; color: white; padding: 5px 15px; border-radius: 5px;">
                          Matrix B: 2×2
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ Same dimensions! We can add them.</strong></p>
                  </div>
                  
                  <!-- Step 2 Button -->
                  <button @click="stepOperations = 2" class="step-button" 
                          :disabled="stepOperations < 1"
                          :style="{
                            background: stepOperations >= 2 ? '#078633' : (stepOperations >= 1 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 2: Add First Row
                  </button>
                  
                  <!-- Step 2 Content -->
                  <div v-if="stepOperations >= 2" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #e8f4fc; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 2: Add Elements in First Row</h5>
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>Position (1,1):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">2</div>
                          <span>+</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">5</div>
                          <span>=</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">7</div>
                        </div>
                      </div>
                      <div style="text-align: center;">
                        <p><strong>Position (1,2):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">4</div>
                          <span>+</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">2</div>
                          <span>=</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">6</div>
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ First row complete: [7, 6]</strong></p>
                  </div>
                  
                  <!-- Step 3 Button -->
                  <button @click="stepOperations = 3" class="step-button" 
                          :disabled="stepOperations < 2"
                          :style="{
                            background: stepOperations >= 3 ? '#055d31' : (stepOperations >= 2 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 3: Add Second Row
                  </button>
                  
                  <!-- Step 3 Content -->
                  <div v-if="stepOperations >= 3" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #d5f4e6; border-radius: 8px; animation: pulse 2s infinite;">
                    <h5>Step 3: Add Elements in Second Row</h5>
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>Position (2,1):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">3</div>
                          <span>+</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">1</div>
                          <span>=</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">4</div>
                        </div>
                      </div>
                      <div style="text-align: center;">
                        <p><strong>Position (2,2):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">1</div>
                          <span>+</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">3</div>
                          <span>=</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">4</div>
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ Second row complete: [4, 4]</strong></p>
                    <div style="text-align: center; margin-top: 15px;">
                      <div style="font-size: 20px; font-weight: bold; color: #2c3e50;">
                        Final Result: [[7, 6], [4, 4]]
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Image Example -->
              <div style="text-align: center; margin: 20px 0;">
                <h5><strong>Visual Representation:</strong></h5>
                <div style="background: white; padding: 15px; border-radius: 10px; display: inline-block;">
                  <img src="/images/ma.png" alt="Matrix Addition Example" style="display: block; margin: 0 auto; max-width: 100%; border-radius: 8px;">
                  <p><small>Matrix Addition: Add corresponding elements</small></p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <button @click="resetOperationsSteps" class="solve-button" style="margin-right: 10px;">
                  🔄 Reset Steps
                </button>
                <button @click="nextOperationsSection('subtraction')" class="next-button">
                  ➡️ NextTopic
                </button>
              </div>
            </div>
          </div>

          <!-- Matrix Subtraction Section -->
          <div v-else-if="currentOperationsSection === 'subtraction'" class="content-box" ref="subtractionSection">
            <div class="problem-box">
              <h4 style="text-align: center; color: #2c3e50; margin-bottom: 20px;">2. Matrix Subtraction</h4>
              
              <div class="guide-box">
                <h5><strong>Rules for Matrix Subtraction:</strong></h5>
                <ul>
                  <li>✅ You can only subtract matrices of the <strong>same dimensions</strong></li>
                  <li>✅ Subtract <strong>corresponding elements</strong></li>
                  <li>❌ Different dimensions cannot be subtracted</li>
                </ul>
                
                <div style="background: #e8f4fc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <h5><strong>Formula:</strong></h5>
                  <div style="text-align: center; font-size: 20px; margin: 10px 0;">
                    <strong>If A = [a<sub>ij</sub>] and B = [b<sub>ij</sub>], then C = A - B = [a<sub>ij</sub> - b<sub>ij</sub>]</strong>
                  </div>
                  <p>Each element c<sub>ij</sub> = a<sub>ij</sub> - b<sub>ij</sub></p>
                </div>
              </div>
              
              <div class="matrix-example">
                <h5><strong> Example: Subtract Matrix B from Matrix A</strong></h5>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px auto; max-width: 500px;">
                  <div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <!-- Matrix A -->
                    <div style="text-align: center;">
                      <p><strong>Matrix A:</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [8, 5]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [6, 9]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Minus Sign -->
                    <div style="font-size: 24px; font-weight: bold;">-</div>
                    
                    <!-- Matrix B -->
                    <div style="text-align: center;">
                      <p><strong>Matrix B:</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [3, 2]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [1, 4]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Equals Sign -->
                    <div style="font-size: 24px; font-weight: bold;">=</div>
                    
                    <!-- Result -->
                    <div style="text-align: center;">
                      <p><strong>Result:</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [5, 3]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [5, 5]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 22px; font-weight: bold;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="step-by-step">
                  <!-- Step 1 Button -->
                  <button @click="stepOperations = 1" class="step-button" 
                          :style="{
                            background: stepOperations >= 1 ? '#098062' : '#078633',
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 1: Check Dimensions
                  </button>
                  
                  <!-- Step 1 Content -->
                  <div v-if="stepOperations >= 1" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #ffebee; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 1: Check Dimensions</h5>
                    <p>Both matrices are 2×2:</p>
                    <div style="display: flex; justify-content: center; gap: 30px; margin: 10px 0;">
                      <div style="text-align: center;">
                        <div style="background: #3498db; color: white; padding: 5px 15px; border-radius: 5px;">
                          Matrix A: 2×2
                        </div>
                      </div>
                      <div style="text-align: center;">
                        <div style="background: #e74c3c; color: white; padding: 5px 15px; border-radius: 5px;">
                          Matrix B: 2×2
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ Same dimensions! We can subtract them.</strong></p>
                  </div>
                  
                  <!-- Step 2 Button -->
                  <button @click="stepOperations = 2" class="step-button" 
                          :disabled="stepOperations < 1"
                          :style="{
                            background: stepOperations >= 2 ? '#078633' : (stepOperations >= 1 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 2: Subtract First Row
                  </button>
                  
                  <!-- Step 2 Content -->
                  <div v-if="stepOperations >= 2" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #e8f4fc; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 2: Subtract Elements in First Row</h5>
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>Position (1,1):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">8</div>
                          <span>-</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">3</div>
                          <span>=</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">5</div>
                        </div>
                      </div>
                      <div style="text-align: center;">
                        <p><strong>Position (1,2):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">5</div>
                          <span>-</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">2</div>
                          <span>=</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">3</div>
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ First row complete: [5, 3]</strong></p>
                  </div>
                  
                  <!-- Step 3 Button -->
                  <button @click="stepOperations = 3" class="step-button" 
                          :disabled="stepOperations < 2"
                          :style="{
                            background: stepOperations >= 3 ? '#055d31' : (stepOperations >= 2 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 3: Subtract Second Row
                  </button>
                  
                  <!-- Step 3 Content -->
                  <div v-if="stepOperations >= 3" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #d5f4e6; border-radius: 8px; animation: pulse 2s infinite;">
                    <h5>Step 3: Subtract Elements in Second Row</h5>
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>Position (2,1):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">6</div>
                          <span>-</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">1</div>
                          <span>=</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">5</div>
                        </div>
                      </div>
                      <div style="text-align: center;">
                        <p><strong>Position (2,2):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">9</div>
                          <span>-</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">4</div>
                          <span>=</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">5</div>
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ Second row complete: [5, 5]</strong></p>
                    <div style="text-align: center; margin-top: 15px;">
                      <div style="font-size: 20px; font-weight: bold; color: #2c3e50;">
                        Final Result: [[5, 3], [5, 5]]
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Image Example -->
              <div style="text-align: center; margin: 20px 0;">
                <h5><strong>Visual Representation:</strong></h5>
                <div style="background: white; padding: 15px; border-radius: 10px; display: inline-block;">
                  <img src="/images/ms.png" alt="Matrix Subtraction Example" style="display: block; margin: 0 auto; max-width: 100%; border-radius: 8px;">
                  <p><small>Matrix Subtraction: Subtract corresponding elements</small></p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <button @click="resetOperationsSteps" class="solve-button" style="margin-right: 10px;">
                  🔄 Reset Steps
                </button>
                <button @click="nextOperationsSection('scalar')" class="next-button">
                  ➡️ Next Topic
                </button>
              </div>
            </div>
          </div>

          <!-- Scalar Multiplication Section -->
          <div v-else-if="currentOperationsSection === 'scalar'" class="content-box" ref="scalarSection">
            <div class="problem-box">
              <h4 style="text-align: center; color: #2c3e50; margin-bottom: 20px;">3. Scalar Multiplication</h4>
              
              <div class="guide-box">
                <h5><strong>Rules for Scalar Multiplication:</strong></h5>
                <ul>
                  <li>✅ Multiply <strong>every element</strong> of the matrix by the scalar</li>
                  <li>✅ The scalar can be any real number (positive, negative, fraction)</li>
                  <li>✅ The resulting matrix has the same dimensions</li>
                </ul>
                
                <div style="background: #e8f4fc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <h5><strong>Formula:</strong></h5>
                  <div style="text-align: center; font-size: 20px; margin: 10px 0;">
                    <strong>If A = [a<sub>ij</sub>] and k is a scalar, then kA = [k × a<sub>ij</sub>]</strong>
                  </div>
                  <p>Each element of kA = k × corresponding element of A</p>
                </div>
              </div>
              
              <div class="matrix-example">
                <h5><strong> Example: Multiply Matrix C by scalar 4</strong></h5>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px auto; max-width: 400px;">
                  <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
                    <!-- Scalar -->
                    <div style="font-size: 15px; font-weight: bold; color: #9b59b6;">4 ×</div>
                    
                    <!-- Matrix -->
                    <div style="text-align: center;">
                      <p><strong>Matrix C:</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [2, 3]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #9b59b6; border-radius: 5px; font-size: 20px;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [5, 1]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #9b59b6; border-radius: 5px; font-size: 22px;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Equals Sign -->
                    <div style="font-size: 24px; font-weight: bold;">=</div>
                    
                    <!-- Result -->
                    <div style="text-align: center;">
                      <p><strong>Result:</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [8, 12]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 20px; font-weight: bold;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [20, 4]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 20px; font-weight: bold;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="step-by-step">
                  <!-- Step 1 Button -->
                  <button @click="stepOperations = 1" class="step-button" 
                          :style="{
                            background: stepOperations >= 1 ? '#098062' : '#078633',
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 1: Multiply First Row
                  </button>
                  
                  <!-- Step 1 Content -->
                  <div v-if="stepOperations >= 1" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #ffebee; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 1: Multiply Elements in First Row by 4</h5>
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>Position (1,1):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #9b59b6; border-radius: 5px;">2</div>
                          <span>× 4 =</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">8</div>
                        </div>
                      </div>
                      <div style="text-align: center;">
                        <p><strong>Position (1,2):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #9b59b6; border-radius: 5px;">3</div>
                          <span>× 4 =</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">12</div>
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ First row complete: [8, 12]</strong></p>
                  </div>
                  
                  <!-- Step 2 Button -->
                  <button @click="stepOperations = 2" class="step-button" 
                          :disabled="stepOperations < 1"
                          :style="{
                            background: stepOperations >= 2 ? '#078633' : (stepOperations >= 1 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '250px'
                          }">
                    CLICK Step 2: Multiply Second Row
                  </button>
                  
                  <!-- Step 2 Content -->
                  <div v-if="stepOperations >= 2" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #d5f4e6; border-radius: 8px; animation: pulse 2s infinite;">
                    <h5>Step 2: Multiply Elements in Second Row by 4</h5>
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>Position (2,1):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #9b59b6; border-radius: 5px;">5</div>
                          <span>× 4 =</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">20</div>
                        </div>
                      </div>
                      <div style="text-align: center;">
                        <p><strong>Position (2,2):</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #9b59b6; border-radius: 5px;">1</div>
                          <span>× 4 =</span>
                          <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">4</div>
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ Second row complete: [20, 4]</strong></p>
                    <div style="text-align: center; margin-top: 15px;">
                      <div style="font-size: 20px; font-weight: bold; color: #2c3e50;">
                        Final Result: [[8, 12], [20, 4]]
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Image Example -->
              <div style="text-align: center; margin: 20px 0;">
                <h5><strong>Visual Representation:</strong></h5>
                <div style="background: white; padding: 15px; border-radius: 10px; display: inline-block;">
                  <img src="/images/sm.png" alt="Scalar Multiplication Example" style="display: block; margin: 0 auto; max-width: 100%; border-radius: 8px;">
                  <p><small>Scalar Multiplication: Multiply each element by the scalar</small></p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <button @click="resetOperationsSteps" class="solve-button" style="margin-right: 10px;">
                  🔄 Reset Steps
                </button>
                <button @click="nextOperationsSection('multiplication')" class="next-button">
                  ➡️ Next Topic
                </button>
              </div>
            </div>
          </div>

          <!-- Matrix Multiplication Section -->
          <div v-else-if="currentOperationsSection === 'multiplication'" class="content-box" ref="multiplicationSection">
            <div class="problem-box">
              <h4 style="text-align: center; color: #2c3e50; margin-bottom: 20px;">4. Matrix Multiplication</h4>
              
              <div class="guide-box">
                <h5><strong>Rules for Matrix Multiplication:</strong></h5>
                <ul>
                  <li>✅ Number of <strong>columns</strong> in first matrix must equal number of <strong>rows</strong> in second matrix</li>
                  <li>✅ Multiply <strong>rows</strong> of first matrix by <strong>columns</strong> of second matrix</li>
                  <li>❌ Matrix multiplication is <strong>not commutative</strong> (A×B ≠ B×A in general)</li>
                </ul>
                
                <div style="background: #e8f4fc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <h5><strong>Formula:</strong></h5>
                  <div style="text-align: center; font-size: 20px; margin: 10px 0;">
                    <strong>If A is m×p and B is p×n, then C = A×B is m×n</strong>
                  </div>
                  <p>Each element c<sub>ij</sub> = a<sub>i1</sub>b<sub>1j</sub> + a<sub>i2</sub>b<sub>2j</sub> + ... + a<sub>ip</sub>b<sub>pj</sub></p>
                </div>
              </div>
              
              <div class="matrix-example">
                <h5><strong> Example: Multiply Matrix A (2×3) by Matrix B (3×2)</strong></h5>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px auto; max-width: 600px;">
                  <div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <!-- Matrix A -->
                    <div style="text-align: center;">
                      <p><strong>Matrix A (2×3):</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(3, 50px); gap: 8px;">
                        <div v-for="(num, idx) in [1, 2, 3]" :key="idx" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px; font-size: 18px;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [4, 5, 6]" :key="idx+3" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px; font-size: 18px;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Times Sign -->
                    <div style="font-size: 24px; font-weight: bold;">×</div>
                    
                    <!-- Matrix B -->
                    <div style="text-align: center;">
                      <p><strong>Matrix B (3×2):</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(2, 50px); gap: 8px;">
                        <div v-for="(num, idx) in [7, 8]" :key="idx" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 18px;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [9, 10]" :key="idx+2" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 18px;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [11, 12]" :key="idx+4" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 18px;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Equals Sign -->
                    <div style="font-size: 24px; font-weight: bold;">=</div>
                    
                    <!-- Result -->
                    <div style="text-align: center;">
                      <p><strong>Result (2×2):</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [58, 64]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 18px; font-weight: bold;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [139, 154]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 18px; font-weight: bold;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p style="text-align: center; margin-top: 10px; color: #666; font-size: 14px;">
                    <em>A has 3 columns, B has 3 rows → Valid multiplication</em>
                  </p>
                </div>
                
                <div class="step-by-step">
                  <!-- Step 1 Button -->
                  <button @click="stepOperations = 1" class="step-button" 
                          :style="{
                            background: stepOperations >= 1 ? '#098062' : '#078633',
                            display: 'block',
                            margin: '10px auto',
                            width: '300px'
                          }">
                    CLICK Step 1: Check Dimensions Compatibility
                  </button>
                  
                  <!-- Step 1 Content -->
                  <div v-if="stepOperations >= 1" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #ffebee; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 1: Check if Multiplication is Possible</h5>
                    <div style="display: flex; justify-content: center; gap: 20px; margin: 10px 0;">
                      <div style="text-align: center;">
                        <div style="background: #e74c3c; color: white; padding: 5px 15px; border-radius: 5px;">
                          Matrix A: 2×3
                        </div>
                        <p><small>Columns = 3</small></p>
                      </div>
                      <div style="text-align: center;">
                        <div style="background: #3498db; color: white; padding: 5px 15px; border-radius: 5px;">
                          Matrix B: 3×2
                        </div>
                        <p><small>Rows = 3</small></p>
                      </div>
                    </div>
                    <p><strong>✅ Columns of A (3) = Rows of B (3) → Multiplication possible!</strong></p>
                    <p><strong>Result will be: 2×2 matrix</strong></p>
                  </div>
                  
                  <!-- Step 2 Button -->
                  <button @click="stepOperations = 2" class="step-button" 
                          :disabled="stepOperations < 1"
                          :style="{
                            background: stepOperations >= 2 ? '#078633' : (stepOperations >= 1 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '300px'
                          }">
                    CLICK Step 2: Calculate First Row of Result
                  </button>
                  
                  <!-- Step 2 Content -->
                  <div v-if="stepOperations >= 2" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #e8f4fc; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 2: Calculate Row 1 × Column 1 and Column 2</h5>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>c<sub>11</sub> = Row 1 × Column 1</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px; justify-content: center;">
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">1</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">7</div>
                          <span>+</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">2</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">9</div>
                          <span>+</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">3</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">11</div>
                        </div>
                        <p>= 1×7 + 2×9 + 3×11</p>
                        <p>= 7 + 18 + 33 = <strong>58</strong></p>
                      </div>
                      
                      <div style="text-align: center;">
                        <p><strong>c<sub>12</sub> = Row 1 × Column 2</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px; justify-content: center;">
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">1</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">8</div>
                          <span>+</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">2</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">10</div>
                          <span>+</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">3</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">12</div>
                        </div>
                        <p>= 1×8 + 2×10 + 3×12</p>
                        <p>= 8 + 20 + 36 = <strong>64</strong></p>
                      </div>
                    </div>
                    <p><strong>✅ First row complete: [58, 64]</strong></p>
                  </div>
                  
                  <!-- Step 3 Button -->
                  <button @click="stepOperations = 3" class="step-button" 
                          :disabled="stepOperations < 2"
                          :style="{
                            background: stepOperations >= 3 ? '#055d31' : (stepOperations >= 2 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '300px'
                          }">
                    CLICK Step 3: Calculate Second Row of Result
                  </button>
                  
                  <!-- Step 3 Content -->
                  <div v-if="stepOperations >= 3" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #d5f4e6; border-radius: 8px; animation: pulse 2s infinite;">
                    <h5>Step 3: Calculate Row 2 × Column 1 and Column 2</h5>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>c<sub>21</sub> = Row 2 × Column 1</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px; justify-content: center;">
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">4</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">7</div>
                          <span>+</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">5</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">9</div>
                          <span>+</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">6</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">11</div>
                        </div>
                        <p>= 4×7 + 5×9 + 6×11</p>
                        <p>= 28 + 45 + 66 = <strong>139</strong></p>
                      </div>
                      
                      <div style="text-align: center;">
                        <p><strong>c<sub>22</sub> = Row 2 × Column 2</strong></p>
                        <div style="display: flex; align-items: center; gap: 5px; justify-content: center;">
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">4</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">8</div>
                          <span>+</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">5</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">10</div>
                          <span>+</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px;">6</div>
                          <span>×</span>
                          <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px;">12</div>
                        </div>
                        <p>= 4×8 + 5×10 + 6×12</p>
                        <p>= 32 + 50 + 72 = <strong>154</strong></p>
                      </div>
                    </div>
                    <p><strong>✅ Second row complete: [139, 154]</strong></p>
                    <div style="text-align: center; margin-top: 15px;">
                      <div style="font-size: 20px; font-weight: bold; color: #2c3e50;">
                        Final Result: [[58, 64], [139, 154]]
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Image Example -->
              <div style="text-align: center; margin: 20px 0;">
                <h5><strong>Visual Representation:</strong></h5>
                <div style="background: white; padding: 15px; border-radius: 10px; display: inline-block;">
                  <img src="/images/mm.png" alt="Matrix Multiplication Example" style="display: block; margin: 0 auto; max-width: 100%; border-radius: 8px;">
                  <p><small>Matrix Multiplication: Multiply rows by columns</small></p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <button @click="resetOperationsSteps" class="solve-button" style="margin-right: 10px;">
                  🔄 Reset Steps
                </button>
                <button @click="nextOperationsSection('transpose')" class="next-button">
                  ➡️ Next Topic
                </button>
              </div>
            </div>
          </div>

          <!-- Matrix Transpose Section -->
          <div v-else-if="currentOperationsSection === 'transpose'" class="content-box" ref="transposeSection">
            <div class="problem-box">
              <h4 style="text-align: center; color: #2c3e50; margin-bottom: 20px;">5. Matrix Transpose</h4>
              
              <div class="guide-box">
                <h5><strong>Rules for Matrix Transpose:</strong></h5>
                <ul>
                  <li>✅ <strong>Rows become columns</strong> and <strong>columns become rows</strong></li>
                  <li>✅ Denoted as A<sup>T</sup> or A'</li>
                  <li>✅ If A is m×n, then A<sup>T</sup> is n×m</li>
                  <li>✅ The element a<sub>ij</sub> becomes a<sub>ji</sub> in the transpose</li>
                </ul>
                
                <div style="background: #e8f4fc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <h5><strong>Formula:</strong></h5>
                  <div style="text-align: center; font-size: 20px; margin: 10px 0;">
                    <strong>If A = [a<sub>ij</sub>], then A<sup>T</sup> = [a<sub>ji</sub>]</strong>
                  </div>
                  <p>Element at position (i,j) in A becomes element at position (j,i) in A<sup>T</sup></p>
                </div>
              </div>
              
              <div class="matrix-example">
                <h5><strong> Example: Find the transpose of Matrix D</strong></h5>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px auto; max-width: 400px;">
                  <div style="text-align: center;">
                    <p><strong>Original Matrix D (2×3):</strong></p>
                    <div style="display: inline-grid; grid-template-columns: repeat(3, 60px); gap: 10px;">
                      <div v-for="(num, idx) in [3, 7, 2]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #f39c12; border-radius: 5px; font-size: 20px; font-weight: bold;">
                        {{ num }}
                      </div>
                      <div v-for="(num, idx) in [5, 1, 8]" :key="idx+3" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #f39c12; border-radius: 5px; font-size: 20px; font-weight: bold;">
                        {{ num }}
                      </div>
                    </div>
                  </div>
                  
                  <div style="text-align: center; margin-top: 20px;">
                    <p><strong>Transpose D<sup>T</sup> (3×2):</strong></p>
                    <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                      <div v-for="(num, idx) in [3, 5]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 20px; font-weight: bold;">
                        {{ num }}
                      </div>
                      <div v-for="(num, idx) in [7, 1]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 20px; font-weight: bold;">
                        {{ num }}
                      </div>
                      <div v-for="(num, idx) in [2, 8]" :key="idx+4" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-size: 20px; font-weight: bold;">
                        {{ num }}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="step-by-step">
                  <!-- Step 1 Button -->
                  <button @click="stepOperations = 1" class="step-button" 
                          :style="{
                            background: stepOperations >= 1 ? '#098062' : '#078633',
                            display: 'block',
                            margin: '10px auto',
                            width: '300px'
                          }">
                    CLICK Step 1: Understand the Operation
                  </button>
                  
                  <!-- Step 1 Content -->
                  <div v-if="stepOperations >= 1" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #ffebee; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 1: What is Transpose?</h5>
                    <div style="text-align: center; margin: 10px 0;">
                      <div style="font-size: 24px; font-weight: bold; color: #f39c12;">
                        Flip the matrix over its main diagonal
                      </div>
                    </div>
                    <p><strong>Original: 2×3 (2 rows, 3 columns)</strong></p>
                    <p><strong>Transpose: 3×2 (3 rows, 2 columns)</strong></p>
                    <div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
                      <div style="text-align: center;">
                        <div style="background: #f39c12; color: white; padding: 5px 15px; border-radius: 5px;">
                          Original: 2×3
                        </div>
                      </div>
                      <div style="font-size: 20px;">→</div>
                      <div style="text-align: center;">
                        <div style="background: #2ecc71; color: white; padding: 5px 15px; border-radius: 5px;">
                          Transpose: 3×2
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Step 2 Button -->
                  <button @click="stepOperations = 2" class="step-button" 
                          :disabled="stepOperations < 1"
                          :style="{
                            background: stepOperations >= 2 ? '#078633' : (stepOperations >= 1 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '300px'
                          }">
                    CLICK Step 2: Convert First Row to First Column
                  </button>
                  
                  <!-- Step 2 Content -->
                  <div v-if="stepOperations >= 2" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #e8f4fc; border-radius: 8px; animation: fadeIn 0.5s;">
                    <h5>Step 2: Row 1 becomes Column 1</h5>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>Original Row 1:</strong></p>
                        <div style="display: flex; gap: 10px;">
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #f39c12; border-radius: 5px; font-weight: bold;">3</div>
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #f39c12; border-radius: 5px; font-weight: bold;">7</div>
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #f39c12; border-radius: 5px; font-weight: bold;">2</div>
                        </div>
                      </div>
                      <div style="font-size: 24px;">→</div>
                      <div style="text-align: center;">
                        <p><strong>Transpose Column 1:</strong></p>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">3</div>
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">7</div>
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">2</div>
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ First row [3, 7, 2] becomes first column [3, 7, 2]<sup>T</sup></strong></p>
                  </div>
                  
                  <!-- Step 3 Button -->
                  <button @click="stepOperations = 3" class="step-button" 
                          :disabled="stepOperations < 2"
                          :style="{
                            background: stepOperations >= 3 ? '#055d31' : (stepOperations >= 2 ? '#078633' : '#cccccc'),
                            display: 'block',
                            margin: '10px auto',
                            width: '300px'
                          }">
                    CLICK Step 3: Convert Second Row to Second Column
                  </button>
                  
                  <!-- Step 3 Content -->
                  <div v-if="stepOperations >= 3" class="step-content" 
                       style="margin: 15px 0; padding: 15px; background: #d5f4e6; border-radius: 8px; animation: pulse 2s infinite;">
                    <h5>Step 3: Row 2 becomes Column 2</h5>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 15px 0;">
                      <div style="text-align: center;">
                        <p><strong>Original Row 2:</strong></p>
                        <div style="display: flex; gap: 10px;">
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #f39c12; border-radius: 5px; font-weight: bold;">5</div>
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #f39c12; border-radius: 5px; font-weight: bold;">1</div>
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #f39c12; border-radius: 5px; font-weight: bold;">8</div>
                        </div>
                      </div>
                      <div style="font-size: 24px;">→</div>
                      <div style="text-align: center;">
                        <p><strong>Transpose Column 2:</strong></p>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">5</div>
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">1</div>
                          <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #d5f4e6; border: 2px solid #2ecc71; border-radius: 5px; font-weight: bold;">8</div>
                        </div>
                      </div>
                    </div>
                    <p><strong>✅ Second row [5, 1, 8] becomes second column [5, 1, 8]<sup>T</sup></strong></p>
                    
                    <div style="text-align: center; margin-top: 15px;">
                      <div style="font-size: 20px; font-weight: bold; color: #2c3e50;">
                        Final Transpose: [[3, 5], [7, 1], [2, 8]]
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Image Example -->
              <div style="text-align: center; margin: 20px 0;">
                <h5><strong>Visual Representation:</strong></h5>
                <div style="background: white; padding: 15px; border-radius: 10px; display: inline-block;">
                  <img src="/images/tm.png" alt="Matrix Transpose Example" style="display: block; margin: 0 auto; max-width: 100%; border-radius: 8px;">
                  <p><small>Matrix Transpose: Flip rows and columns</small></p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <button @click="resetOperationsSteps" class="solve-button" style="margin-right: 10px;">
                  🔄 Reset Steps
                </button>
                <button @click="nextOperationsSection('quiz')" class="next-button">
                  Take Mastery Quiz ➡️
                </button>
              </div>
            </div>
          </div>

          <!-- ✅ Matrix Operations Mastery Quiz -->
          <div v-else-if="currentOperationsSection === 'quiz'" class="content-box" ref="operationsQuizSection">
            <h4 style="text-align: center; color: #121314; margin-bottom: 20px;"><strong>Matrix Operations Mastery Quiz</strong></h4>
            <div class="score-container">
              <p style="text-align: center; font-weight: bold; font-size: 24px;">YOUR SCORE: {{ derivedScore }}/{{ derivedQuizzes.length * 2 }}</p>
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
              
              <!-- Quiz 1: Matrix Addition -->
              <div v-if="currentDerivedQuizIndex === 0">
                <p><strong>What is the result of adding these two matrices?</strong></p>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 20px 0;">
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #3498db; width: 100%; max-width: 500px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">
                      <!-- Matrix A -->
                      <div style="text-align: center;">
                        <p><strong>Matrix A:</strong></p>
                        <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                          <div v-for="(num, idx) in [2, 4]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 22px; font-weight: bold;">
                            {{ num }}
                          </div>
                          <div v-for="(num, idx) in [3, 1]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 22px; font-weight: bold;">
                            {{ num }}
                          </div>
                        </div>
                      </div>
                      
                      <!-- Plus Sign -->
                      <div style="font-size: 24px; font-weight: bold;">+</div>
                      
                      <!-- Matrix B -->
                      <div style="text-align: center;">
                        <p><strong>Matrix B:</strong></p>
                        <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                          <div v-for="(num, idx) in [5, 2]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px; font-size: 22px; font-weight: bold;">
                            {{ num }}
                          </div>
                          <div v-for="(num, idx) in [1, 3]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px; font-size: 22px; font-weight: bold;">
                            {{ num }}
                          </div>
                        </div>
                      </div>
                      
                      <!-- Equals Sign -->
                      <div style="font-size: 24px; font-weight: bold;">=</div>
                    </div>
                  </div>
                  
                  <div style="text-align: center; width: 100%; max-width: 400px;">
                    <p><strong>Type the resulting matrix in format: [[a,b],[c,d]]</strong></p>
                    <p><em>Example: [[7,6],[4,4]]</em></p>
                    <input
                      v-model="derivedAnswers[currentDerivedQuizIndex]"
                      placeholder="Type matrix format [[a,b],[c,d]]"
                      class="answer-input"
                      style="width: 100%; max-width: 300px;"
                      @input="derivedChecked[currentDerivedQuizIndex] = 0"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Quiz 2: Matrix Subtraction -->
              <div v-if="currentDerivedQuizIndex === 1">
                <p><strong>What is the result of subtracting Matrix B from Matrix A?</strong></p>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 20px 0;">
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #2ecc71; width: 100%; max-width: 500px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">
                      <!-- Matrix A -->
                      <div style="text-align: center;">
                        <p><strong>Matrix A:</strong></p>
                        <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                          <div v-for="(num, idx) in [8, 5]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #2ecc71; border-radius: 5px; font-size: 22px; font-weight: bold;">
                            {{ num }}
                          </div>
                          <div v-for="(num, idx) in [6, 9]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #2ecc71; border-radius: 5px; font-size: 22px; font-weight: bold;">
                            {{ num }}
                          </div>
                        </div>
                      </div>
                      
                      <!-- Minus Sign -->
                      <div style="font-size: 24px; font-weight: bold;">-</div>
                      
                      <!-- Matrix B -->
                      <div style="text-align: center;">
                        <p><strong>Matrix B:</strong></p>
                        <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                          <div v-for="(num, idx) in [3, 2]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e67e22; border-radius: 5px; font-size: 22px; font-weight: bold;">
                            {{ num }}
                          </div>
                          <div v-for="(num, idx) in [1, 4]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e67e22; border-radius: 5px; font-size: 22px; font-weight: bold;">
                            {{ num }}
                          </div>
                        </div>
                      </div>
                      
                      <!-- Equals Sign -->
                      <div style="font-size: 24px; font-weight: bold;">=</div>
                    </div>
                  </div>
                  
                  <div style="text-align: center; width: 100%; max-width: 400px;">
                    <p><strong>Type the resulting matrix in format: [[a,b],[c,d]]</strong></p>
                    <p><em>Example: [[5,3],[5,5]]</em></p>
                    <input
                      v-model="derivedAnswers[currentDerivedQuizIndex]"
                      placeholder="Type matrix format [[a,b],[c,d]]"
                      class="answer-input"
                      style="width: 100%; max-width: 300px;"
                      @input="derivedChecked[currentDerivedQuizIndex] = 0"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Quiz 3: Scalar Multiplication -->
              <div v-if="currentDerivedQuizIndex === 2">
                <p><strong>What is the result of multiplying this matrix by scalar 4?</strong></p>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 20px 0;">
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #9b59b6; width: 100%; max-width: 400px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
                      <!-- Scalar -->
                      <div style="font-size: 28px; font-weight: bold; color: #9b59b6;">4 ×</div>
                      
                      <!-- Matrix -->
                      <div style="text-align: center;">
                        <p><strong>Matrix C:</strong></p>
                        <div style="display: inline-grid; grid-template-columns: repeat(2, 60px); gap: 10px;">
                          <div v-for="(num, idx) in [2, 3]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #9b59b6; border-radius: 5px; font-size: 22px;">
                            {{ num }}
                          </div>
                          <div v-for="(num, idx) in [5, 1]" :key="idx+2" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #9b59b6; border-radius: 5px; font-size: 22px;">
                            {{ num }}
                          </div>
                        </div>
                      </div>
                      
                      <!-- Equals Sign -->
                      <div style="font-size: 24px; font-weight: bold;">=</div>
                    </div>
                  </div>
                  
                  <div style="text-align: center; width: 100%; max-width: 400px;">
                    <p><strong>Type the resulting matrix in format: [[a,b],[c,d]]</strong></p>
                    <p><em>Example: [[8,12],[20,4]]</em></p>
                    <input
                      v-model="derivedAnswers[currentDerivedQuizIndex]"
                      placeholder="Type matrix format [[a,b],[c,d]]"
                      class="answer-input"
                      style="width: 100%; max-width: 300px;"
                      @input="derivedChecked[currentDerivedQuizIndex] = 0"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Quiz 4: Matrix Multiplication -->
              <div v-if="currentDerivedQuizIndex === 3">
                <p><strong>What is the result of multiplying Matrix A by Matrix B?</strong></p>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 20px 0;">
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #e74c3c; width: 100%; max-width: 600px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">
                      <!-- Matrix A -->
                      <div style="text-align: center;">
                        <p><strong>Matrix A (2×3):</strong></p>
                        <div style="display: inline-grid; grid-template-columns: repeat(3, 50px); gap: 8px;">
                          <div v-for="(num, idx) in [1, 2, 3]" :key="idx" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px; font-size: 18px;">
                            {{ num }}
                          </div>
                          <div v-for="(num, idx) in [4, 5, 6]" :key="idx+3" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #e74c3c; border-radius: 5px; font-size: 18px;">
                            {{ num }}
                          </div>
                        </div>
                      </div>
                      
                      <!-- Times Sign -->
                      <div style="font-size: 24px; font-weight: bold;">×</div>
                      
                      <!-- Matrix B -->
                      <div style="text-align: center;">
                        <p><strong>Matrix B (3×2):</strong></p>
                        <div style="display: inline-grid; grid-template-columns: repeat(2, 50px); gap: 8px;">
                          <div v-for="(num, idx) in [7, 8]" :key="idx" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 18px;">
                            {{ num }}
                          </div>
                          <div v-for="(num, idx) in [9, 10]" :key="idx+2" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 18px;">
                            {{ num }}
                          </div>
                          <div v-for="(num, idx) in [11, 12]" :key="idx+4" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #3498db; border-radius: 5px; font-size: 18px;">
                            {{ num }}
                          </div>
                        </div>
                      </div>
                      
                      <!-- Equals Sign -->
                      <div style="font-size: 24px; font-weight: bold;">=</div>
                    </div>
                    <p style="text-align: center; margin-top: 10px; color: #666; font-size: 14px;">
                      <em>Result will be a 2×2 matrix</em>
                    </p>
                  </div>
                  
                  <div style="text-align: center; width: 100%; max-width: 400px;">
                    <p><strong>Type the resulting 2×2 matrix in format: [[a,b],[c,d]]</strong></p>
                    <input
                      v-model="derivedAnswers[currentDerivedQuizIndex]"
                      placeholder="Type matrix format [[a,b],[c,d]]"
                      class="answer-input"
                      style="width: 100%; max-width: 300px;"
                      @input="derivedChecked[currentDerivedQuizIndex] = 0"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Quiz 5: Matrix Transpose -->
              <div v-if="currentDerivedQuizIndex === 4">
                <p><strong>What is the transpose of this matrix?</strong></p>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 20px 0;">
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #f39c12; width: 100%; max-width: 400px;">
                    <div style="text-align: center;">
                      <p><strong>Matrix D (2×3):</strong></p>
                      <div style="display: inline-grid; grid-template-columns: repeat(3, 60px); gap: 10px;">
                        <div v-for="(num, idx) in [3, 7, 2]" :key="idx" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #f39c12; border-radius: 5px; font-size: 20px; font-weight: bold;">
                          {{ num }}
                        </div>
                        <div v-for="(num, idx) in [5, 1, 8]" :key="idx+3" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid #f39c12; border-radius: 5px; font-size: 20px; font-weight: bold;">
                          {{ num }}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style="text-align: center; width: 100%; max-width: 400px;">
                    <p><strong>Type the transposed matrix in format: [[a,b,c],[d,e,f]]</strong></p>
                    <p><em>Remember: Rows become columns!</em></p>
                    <input
                      v-model="derivedAnswers[currentDerivedQuizIndex]"
                      placeholder="Type matrix format [[a,b,c],[d,e,f]]"
                      class="answer-input"
                      style="width: 100%; max-width: 300px;"
                      @input="derivedChecked[currentDerivedQuizIndex] = 0"
                    />
                  </div>
                </div>
              </div>
              
              <button @click="checkDerived(currentDerivedQuizIndex)" :disabled="derivedChecked[currentDerivedQuizIndex] >= 2" class="submit-button">LET'S CHECK</button>
              
              <div v-if="derivedFeedbacks[currentDerivedQuizIndex]" class="result-box">
                <p>{{ derivedFeedbacks[currentDerivedQuizIndex] }}</p>
              </div>
              
              <div v-if="currentDerivedMessage && currentDerivedQuizIndex === lastDerivedQuizWithMessage" class="fade-message">{{ currentDerivedMessage }}</div>
              
              <!-- Previous/Next Buttons - CHANGED: Removed Previous button and only show Next button for questions 1-4 -->
              <div class="carousel-controls" style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 20px;">
                <!-- Only show Next button if not on question 5 (index 4) -->
                <button v-if="currentDerivedQuizIndex !== 4" @click="nextDerivedQuiz" :disabled="!canProceedToNextDerivedQuiz" class="carousel-nav-btn">
                  Next ➡️
                </button>
              </div>
              
              <!-- Completion Message -->
              <div v-if="isDerivedQuizComplete" class="completion-box" style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 10px; text-align: center;">
                <h4>🎉 Quiz Completed!</h4>
                <p>You scored {{ derivedScore }} out of {{ derivedQuizzes.length * 2 }}.</p>
                <p v-if="derivedScore < derivedQuizzes.length * 2" style="color: #dc3545; font-weight: bold;">
                  ⚠️ You need a perfect score ({{ derivedQuizzes.length * 2 }}/{{ derivedQuizzes.length * 2 }}) to proceed!
                </p>
                <button 
                  @click="completeMatrixOperations" 
                  :disabled="derivedScore < derivedQuizzes.length * 2"
                  class="next-button" 
                  :style="derivedScore < derivedQuizzes.length * 2 ? 'background: #cccccc; cursor: not-allowed;' : ''"
                  style="margin-top: 10px;"
                >
                  ✅ Complete Matrix Operations
                </button>
                <p v-if="derivedScore < derivedQuizzes.length * 2" style="color: #666; font-size: 14px; margin-top: 10px;">
                  Please achieve a perfect score ({{ derivedQuizzes.length * 2 }}/{{ derivedQuizzes.length * 2 }}) to continue.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Topic Selection Button -->
        <div v-if="selectedTopic && !currentFundamentalsSection && !currentOperationsSection" style="text-align: center; margin-top: 30px;">
          <button @click="backToTopicSelection" class="next-button">
            ⬅️ Back to Topic Selection
          </button>
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
      hasTakenPreTestInSession: false, // NEW: Track pre-test completion in session
      
      preTestQuestions: [
        { 
          question: "What is a matrix?", 
          options: [
            "A single number", 
            "A list of equations", 
            "A rectangular array of numbers arranged in rows and columns", 
            "A graphical representation of functions"
          ], 
          answer: "A rectangular array of numbers arranged in rows and columns", 
          explanation: "A matrix is defined as a rectangular array of numbers, symbols, or expressions arranged in rows and columns." 
        },
        { 
          question: "What is the transpose of a matrix?", 
          options: [
            "A matrix with all negative elements", 
            "A matrix with rows and columns interchanged", 
            "A matrix with rows doubled", 
            "A matrix with elements squared"
          ], 
          answer: "A matrix with rows and columns interchanged", 
          explanation: "The transpose of a matrix is obtained by interchanging its rows and columns." 
        },
        { 
          question: "Which matrix has all diagonal elements equal to 1 and others equal to 0?", 
          options: [
            "Diagonal matrix", 
            "Identity matrix", 
            "Null matrix", 
            "Symmetric matrix"
          ], 
          answer: "Identity matrix", 
          explanation: "An identity matrix is a square matrix with 1s on the main diagonal and 0s elsewhere." 
        },
        { 
          question: "A matrix is symmetric if:", 
          options: [
            "All elements are equal", 
            "The transpose is equal to the matrix", 
            "It has no zero elements", 
            "All diagonal elements are the same"
          ], 
          answer: "The transpose is equal to the matrix", 
          explanation: "A symmetric matrix is equal to its transpose, meaning a_ij = a_ji for all elements." 
        },
        { 
          question: "Which of the following best describes a scalar?", 
          options: [
            "A matrix with only one row", 
            "A vector with only one element", 
            "A single number", 
            "A 1 × n matrix"
          ], 
          answer: "A single number", 
          explanation: "A scalar is a single numerical value, as opposed to a matrix or vector which are arrays of numbers." 
        }
      ],
      selectedTopic: null,
      
      // Matrix Fundamentals Data
      currentFundamentalsSection: null,
      fundamentalsProgress: {
        definition: false,
        dimensions: false,
        coefficients: false,
        specialMatrices: false,
        unitVectors: false,
        quiz: false
      },
      
      // Matrix Operations Data
      currentOperationsSection: null,
      operationsProgress: {
        addition: false,
        subtraction: false,
        scalar: false,
        multiplication: false,
        transpose: false,
        quiz: false
      },
      
      // Step tracking for each section
      stepDimensions: 0,
      stepCoefficients: 0,
      stepZeroIdentity: 0,
      stepUnitVectors: 0,
      stepOperations: 0,
      
      // ✅ Matrix Fundamentals Mastery Quiz Data
      lawQuizzes: [
        {
          question: "What are the dimensions of the 3×3 matrix shown?",
          answer: "3×3",
          explanation: "The matrix has 3 rows and 3 columns, so its dimensions are 3×3."
        },
        {
          question: "What is the value of a₃₂ in Matrix D?",
          answer: "2",
          explanation: "a₃₂ means the element in row 3, column 2. In the matrix, row 3 is [6, 2, 9, 4] and column 2 is the second element, which is 2."
        },
        {
          question: "What type of matrix is shown in Quiz 3?",
          answer: "Identity Matrix",
          explanation: "The matrix has 1's on the main diagonal and 0's everywhere else, which is the definition of an Identity Matrix."
        },
        {
          question: "What are the dimensions of the transposed matrix?",
          answer: "3×2",
          explanation: "When transposing a 2×3 matrix, rows become columns and columns become rows, resulting in a 3×2 matrix."
        },
        {
          question: "What is 3 × a₂₂?",
          answer: "18",
          explanation: "a₂₂ is the element in row 2, column 2, which is 6. Multiplying by scalar 3 gives 3 × 6 = 18."
        }
      ],
      lawAnswers: [],
      lawFeedbacks: [],
      lawScore: 0,
      lawChecked: [],
      currentLawMessage: '',
      currentLawQuizIndex: 0,
      lastLawQuizWithMessage: -1,
      
      // ✅ Matrix Operations Mastery Quiz Data
      derivedQuizzes: [
        {
          question: "What is the result of adding Matrix A [[2,4],[3,1]] and Matrix B [[5,2],[1,3]]?",
          answer: "[[7,6],[4,4]]",
          explanation: "Matrix Addition: Add corresponding elements: (2+5)=7, (4+2)=6, (3+1)=4, (1+3)=4."
        },
        {
          question: "What is the result of subtracting Matrix B [[3,2],[1,4]] from Matrix A [[8,5],[6,9]]?",
          answer: "[[5,3],[5,5]]",
          explanation: "Matrix Subtraction: Subtract corresponding elements: (8-3)=5, (5-2)=3, (6-1)=5, (9-4)=5."
        },
        {
          question: "What is the result of multiplying Matrix C [[2,3],[5,1]] by scalar 4?",
          answer: "[[8,12],[20,4]]",
          explanation: "Scalar Multiplication: Multiply each element by 4: 4×2=8, 4×3=12, 4×5=20, 4×1=4."
        },
        {
          question: "What is the result of multiplying Matrix A [[1,2,3],[4,5,6]] by Matrix B [[7,8],[9,10],[11,12]]?",
          answer: "[[58,64],[139,154]]",
          explanation: "Matrix Multiplication: Row1×Col1:1×7+2×9+3×11=58, Row1×Col2:1×8+2×10+3×12=64, Row2×Col1:4×7+5×9+6×11=139, Row2×Col2:4×8+5×10+6×12=154."
        },
        {
          question: "What is the transpose of Matrix D [[3,7,2],[5,1,8]]?",
          answer: "[[3,5],[7,1],[2,8]]",
          explanation: "Matrix Transpose: Rows become columns, columns become rows. Row 1 [3,7,2] becomes column 1, Row 2 [5,1,8] becomes column 2."
        }
      ],
      derivedAnswers: [],
      derivedFeedbacks: [],
      derivedChecked: [],
      derivedScore: 0,
      derivedQuestionScores: [],
      currentDerivedMessage: '',
      currentDerivedQuizIndex: 0,
      lastDerivedQuizWithMessage: -1
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
    isLawQuizComplete() {
      return this.currentLawQuizIndex === this.lawQuizzes.length - 1 && this.lawChecked[this.currentLawQuizIndex] >= 2;
    },
    isDerivedQuizComplete() {
      return this.currentDerivedQuizIndex === this.derivedQuizzes.length - 1 && this.derivedChecked[this.currentDerivedQuizIndex] >= 2;
    }
  },
  created() {
    // Shuffle questions on load
    this.preTestQuestions = this.shuffleArray(this.preTestQuestions);
    // Check sessionStorage for pre-test completion
    this.checkPreTestSessionStatus();
    // Load existing progress if available
    this.loadProgress();
  },
  methods: {
    // ✅ NEW: Check sessionStorage for pre-test completion
    checkPreTestSessionStatus() {
      const hasTakenPreTest = sessionStorage.getItem('matrices_preTest_completed');
      if (hasTakenPreTest === 'true') {
        this.hasTakenPreTestInSession = true;
      }
    },
    
    // ✅ NEW: Complete pre-test and mark as taken in session
    completePreTest() {
      // Mark pre-test as completed in sessionStorage
      sessionStorage.setItem('matrices_preTest_completed', 'true');
      this.hasTakenPreTestInSession = true;
      this.preTestCompleted = true;
      this.showPreTestResult = false;
    },
    
    // ✅ NEW: Proceed directly to lesson if pre-test already taken
    proceedToLesson() {
      this.preTestCompleted = true;
    },
    
    // Topic Selection Methods
    selectTopic(topic) {
      this.selectedTopic = topic;
      if (topic === 'matrixFundamentals') {
        this.currentFundamentalsSection = 'definition';
      } else if (topic === 'matrixOperations') {
        this.currentOperationsSection = 'addition';
      }
      this.scrollToTop();
    },
    
    backToTopicSelection() {
      this.selectedTopic = null;
      this.currentFundamentalsSection = null;
      this.currentOperationsSection = null;
      this.scrollToTop();
    },
    
    // Matrix Fundamentals Navigation Methods
    nextFundamentalsSection(section) {
      // Mark current section as completed
      if (this.currentFundamentalsSection) {
        this.fundamentalsProgress[this.currentFundamentalsSection] = true;
      }
      
      this.currentFundamentalsSection = section;
      
      // Reset step tracking for new section
      this.resetStepTracking(section);
      
      // Wait for Vue to update the DOM, then scroll to top
      this.$nextTick(() => {
        this.scrollToTop();
      });
    },
    
    // Matrix Operations Navigation Methods
    nextOperationsSection(section) {
      // Mark current section as completed
      if (this.currentOperationsSection) {
        this.operationsProgress[this.currentOperationsSection] = true;
      }
      
      this.currentOperationsSection = section;
      
      // Reset step tracking for new section
      this.resetStepTracking(section);
      
      // Wait for Vue to update the DOM, then scroll to top
      this.$nextTick(() => {
        this.scrollToTop();
      });
    },
    
    // Step Reset Methods
    resetStepTracking(section) {
      switch(section) {
        case 'dimensions':
          this.stepDimensions = 0;
          break;
        case 'coefficients':
          this.stepCoefficients = 0;
          break;
        case 'specialMatrices':
        case 'zero_identity':
          this.stepZeroIdentity = 0;
          break;
        case 'unitVectors':
          this.stepUnitVectors = 0;
          break;
        case 'addition':
        case 'subtraction':
        case 'scalar':
        case 'multiplication':
        case 'transpose':
          this.stepOperations = 0;
          break;
      }
    },
    
    resetDimensionsSteps() {
      this.stepDimensions = 0;
    },
    
    resetCoefficientsSteps() {
      this.stepCoefficients = 0;
    },
    
    resetZeroIdentitySteps() {
      this.stepZeroIdentity = 0;
    },
    
    resetUnitVectorsSteps() {
      this.stepUnitVectors = 0;
    },
    
    resetOperationsSteps() {
      this.stepOperations = 0;
    },
    
    // Enhanced Scroll to Top Method
    scrollToTop() {
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Double check - scroll to very top
        setTimeout(() => {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          window.scrollTo(0, 0);
        }, 100);
      });
    },
    
    // Progress Recording Methods
    saveProgress() {
      // Load existing assessment scores from localStorage
      let existingAssessments = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
      // Save/update pre-test score
      existingAssessments['matricesPreTest'] = this.score.toString();
      // Save/update fundamentals mastery score
      existingAssessments['matricesFundamentalsMastery'] = this.lawScore.toString();
      // Save/update operations mastery score
      existingAssessments['matricesOperationsMastery'] = this.derivedScore.toString();
      localStorage.setItem('assessmentScores', JSON.stringify(existingAssessments));
    },
    
    loadProgress() {
      const saved = localStorage.getItem('assessmentScores');
      if (saved) {
        try {
          const progress = JSON.parse(saved);
          // Restore scores if not already set
          if (this.score === 0 && progress['matricesPreTest'] !== undefined) this.score = parseInt(progress['matricesPreTest']) || 0;
          if (this.lawScore === 0 && progress['matricesFundamentalsMastery'] !== undefined) this.lawScore = parseInt(progress['matricesFundamentalsMastery']) || 0;
          if (this.derivedScore === 0 && progress['matricesOperationsMastery'] !== undefined) this.derivedScore = parseInt(progress['matricesOperationsMastery']) || 0;
        } catch (e) {
          console.error('Error parsing assessmentScores:', e);
        }
      }
    },
    
    // Pre-test Submission
    submitPreTest() {
      this.score = this.preTestQuestions.reduce((acc, q, i) => acc + (this.userAnswers[i] === q.answer ? 1 : 0), 0);
      this.showPreTestResult = true;
      
      // Load existing assessment scores from localStorage
      let existingAssessments = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
      // Save/update pre-test score
      existingAssessments['matricesPreTest'] = this.score.toString();
      localStorage.setItem('assessmentScores', JSON.stringify(existingAssessments));
    },
    
    // Completion Methods
    completeMatrixFundamentals() {
      if (this.lawScore >= this.lawQuizzes.length) {
        this.fundamentalsProgress.quiz = true;
        this.backToTopicSelection();
        this.$nextTick(() => {
          this.saveProgress();
        });
      }
    },
    
    completeMatrixOperations() {
      if (this.derivedScore >= this.derivedQuizzes.length * 2) {
        this.operationsProgress.quiz = true;
        this.backToTopicSelection();
        this.$nextTick(() => {
          this.saveProgress();
        });
      }
    },
    
    // ✅ LAW MASTERY QUIZ - CAROUSEL METHODS
    checkLaw(index) {
      const userAnswer = this.lawAnswers[index].trim().toLowerCase();
      if (!userAnswer) {
        this.lawFeedbacks[index] = "Please type your answer";
        return;
      }
      
      const correctAnswer = this.lawQuizzes[index].answer.toLowerCase();
      const normalize = (str) => str.replace(/[×x*]/g, '×').replace(/\s+/g, '').replace(/[^\d×]/g, '');
      const userNormalized = normalize(userAnswer);
      const correctNormalized = normalize(correctAnswer);
      
      let isCorrect = false;
      const currentChecked = this.lawChecked[index];
      
      // Special handling for different quiz types
      if (index === 0) {
        // Dimensions quiz: accept formats like "3x3", "3×3", "3 by 3"
        const formats = [
          correctNormalized,
          correctNormalized.replace('×', 'x'),
          correctNormalized.replace('×', ' by '),
          correctAnswer
        ];
        isCorrect = formats.some(format => 
          userAnswer.includes(format.toLowerCase()) || 
          userNormalized === normalize(format)
        );
      } else if (index === 1 || index === 4) {
        // Numerical answers
        isCorrect = userNormalized === correctNormalized || userAnswer === correctAnswer;
      } else if (index === 2) {
        // Matrix type quiz: accept variations
        const matrixTypes = ["identity", "identity matrix", "i", "eye"];
        isCorrect = matrixTypes.some(type => userAnswer.includes(type));
      } else if (index === 3) {
        // Transpose dimensions
        const formats = ["3×2", "3x2", "3 by 2", "3 2"];
        isCorrect = formats.some(format => 
          userAnswer.includes(format) || 
          userNormalized === normalize(format)
        );
      }
      
      if (isCorrect) {
        this.lawScore++;
        this.lawFeedbacks[index] = `✅ Correct! ${this.lawQuizzes[index].explanation}`;
        this.currentLawMessage = `You have ${this.lawScore} point${this.lawScore > 1 ? 's' : ''}!`;
        this.lastLawQuizWithMessage = index;
        setTimeout(() => { this.currentLawMessage = ''; }, 3000);
        this.lawChecked[index] = 2;
      } else {
        if (currentChecked === 0) {
          this.lawFeedbacks[index] = "❌ Incorrect. Try again.";
          this.lawChecked[index] = 1;
        } else if (currentChecked === 1) {
          this.lawFeedbacks[index] = `❌ Incorrect. The correct answer is: ${this.lawQuizzes[index].answer}. ${this.lawQuizzes[index].explanation}`;
          this.lawChecked[index] = 2;
        }
      }
      this.$nextTick(() => {
        this.saveProgress();
      });
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
    
    // ✅ MATRIX OPERATIONS MASTERY QUIZ - CAROUSEL METHODS
    checkDerived(index) {
      const userAnswer = this.derivedAnswers[index].trim();
      if (!userAnswer) {
        this.derivedFeedbacks[index] = "Please type your answer";
        return;
      }
      const currentChecked = this.derivedChecked[index] || 0;
      const explanation = this.derivedQuizzes[index].explanation;
      let isCorrect = false;
      const oldPoints = this.derivedQuestionScores[index] || 0;
      
      // Normalize matrix answers for comparison
      const normalizeMatrix = (str) => {
        return str.replace(/\s+/g, '')
                  .replace(/\]\s*\[/g, '],[')
                  .toLowerCase();
      };
      
      const userNormalized = normalizeMatrix(userAnswer);
      const correctNormalized = normalizeMatrix(this.derivedQuizzes[index].answer);
      
      // Check if answers match (allowing for slight formatting variations)
      isCorrect = userNormalized === correctNormalized || 
                  userNormalized.replace(/\[\[/g, '[').replace(/\]\]/g, ']') === 
                  correctNormalized.replace(/\[\[/g, '[').replace(/\]\]/g, ']');
      
      if (isCorrect) {
        const points = 2; // Each matrix operation question is worth 2 points
        if (points > oldPoints) {
          this.derivedScore += (points - oldPoints);
          this.derivedQuestionScores[index] = points;
        }
        this.derivedFeedbacks[index] = `✅ Correct! ${explanation}`;
        this.currentDerivedMessage = `Great! You earned 2 points for this question.`;
        setTimeout(() => { this.currentDerivedMessage = ''; }, 3000);
        this.derivedChecked[index] = 2;
      } else {
        if (currentChecked === 0) {
          this.derivedFeedbacks[index] = "❌ Incorrect. Try again.";
          this.derivedChecked[index] = 1;
        } else if (currentChecked === 1) {
          this.derivedFeedbacks[index] = `❌ Incorrect. The correct answer is: ${this.derivedQuizzes[index].answer}. ${explanation}`;
          this.derivedChecked[index] = 2;
        }
      }
      this.$nextTick(() => {
        this.saveProgress();
      });
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
    
    // Utility Methods
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    
    formatContent(content) {
      return content.replace(/\n/g, "<br>");
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
  scroll-behavior: smooth;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

/* Topic Selection Styles */
.topic-selection {
  padding: 20px;
}

.topic-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.topic-card {
  background: rgba(217, 230, 239, 0.85);
  border-radius: 10px;
  padding: 1px;
  width: 5000px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.topic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  border-color: #4CAF50;
}

.topic-card h5 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.topic-card p {
  color: #34495e;
  font-size: 14px;
}

/* Progress Tracker Styles */
.progress-tracker {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  max-width: 800px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ddd;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 5px;
}

.step-label {
  font-size: 12px;
  color: #666;
  text-align: center;
  max-width: 80px;
}

.progress-step.active .step-number {
  background: #4CAF50;
  color: white;
}

.progress-step.completed .step-number {
  background: #2ecc71;
  color: white;
}

.progress-step.completed .step-label {
  color: #2ecc71;
  font-weight: bold;
}

.progress-line {
  height: 3px;
  width: 50px;
  background: #ddd;
  margin: 0 5px;
}

.progress-line.completed {
  background: #2ecc71;
}

/* Content Box Styles */
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
  transition: all 0.3s ease;
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
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.carousel-nav-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
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

/* Pre-Test Styles */
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

/* Guide Box Styles */
.guide-box {
  background: #eeede9;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  font-size: 15px;
  margin-bottom: 12px;
  border: 1px solid #ecd36f;
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

/* New animations for matrix sections */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Enhanced step button styles */
.step-button {
  font-size: 16px !important;
  font-weight: bold !important;
  padding: 12px 20px !important;
  margin: 10px auto !important;
  display: block !important;
  width: 250px !important;
  transition: all 0.3s ease !important;
}

.step-button:disabled {
  background: #cccccc !important;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: none !important;
}

.step-button:not(:disabled):hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 6px 12px rgba(0,0,0,0.15) !important;
}

.step-content {
  animation: fadeIn 0.5s ease-out !important;
}

/* Matrix cell styling */
.matrix-cell {
  transition: all 0.3s ease;
}

.matrix-cell:hover {
  transform: scale(1.05);
  z-index: 10;
}

/* Carousel controls */
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

.completion-box {
  animation: fadeIn 0.5s ease-in;
}
</style>