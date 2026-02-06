<template>
  <div class="lesson-container">
    <!-- Pre-Test Section - Only show if not completed in this session -->
    <div v-if="!preTestCompleted && !hasTakenPreTestInSession" class="pretest-container">
      <h3 class="title">📝 Pre-Test: SET THEORY</h3>
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
      <button @click="submitPreTest" class="submit-button" :disabled="!preTestAllAnswered">✅ Submit Pre-Test</button>
      <div v-if="showPreTestResult" class="modal-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; display: flex; justify-content: center; align-items: center;">
        <div class="result-box" style="background: white; padding: 20px; border-radius: 8px; max-width: 400px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h4>Your Score: {{ score }}/{{ preTestQuestions.length }}</h4>
          <p v-if="score === preTestQuestions.length">🎉 Excellent! You mastered this topic.</p>
          <p v-else-if="score >= Math.ceil(preTestQuestions.length/2)">👍 Good job! Let's review some concepts.</p>
          <p v-else>💡 Don't worry! The lesson will help you understand better.</p>
          <button @click="completePreTest" class="next-button">➡️ Continue to Lesson</button>
        </div>
      </div>
    </div>
    
    <!-- Lesson Content - Show if pre-test completed OR already taken in this session -->
    <div v-else>
      <div v-if="!hasTakenPreTestInSession && !preTestCompleted" style="text-align: center; padding: 20px;">
        <h4>Welcome Back!</h4>
        <p>You've already completed the pre-test in this session. Proceeding to lesson content...</p>
        <button @click="proceedToLesson" class="next-button" style="margin-top: 20px;">
          ➡️ Continue to Lesson
        </button>
      </div>
      <div v-else>
        <h5 class="title">📚 TYPES OF SETS </h5>
        <!-- Normal Lesson View - All Topics Visible Only If None Selected -->
        <div v-if="selectedTopic === null && !subsetPageActive && !unionPageActive && !singletonPageActive && !singletonRepresentationPageActive && !infinitePageActive && !infiniteRepresentationPageActive && !universalPageActive && !powerSetPageActive">
          <div v-for="(topic, index) in topics" :key="index" class="content-box">
            <h5 @click="toggleTopic(index)" class="clickable-title">
              {{ topic.title }} {{ selectedTopic === index ? "" : "" }}
            </h5>
            <div v-if="selectedTopic === index">
              <p v-html="formatContent(topic.content)"></p>
              <!-- INTRO SPECIAL CONTENT -->
              <div v-if="topic.type === 'intro'">
                <div style="background-color: #ecdfaa; padding: 10px; border-radius: 5px; margin-bottom: 10px;border: 1px solid #efd56d;">
                  <!-- NEW: Quiz Card for Set Symbols - FORMATTED LIKE THE IMAGE -->
                  <div class="problem-box" style="margin-bottom: 15px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #ddd;">
                    <h5 style="text-align: center; color: #333; margin-bottom: 15px;"><strong>Set Symbols Quiz</strong> </h5>
                    <div style="margin-bottom: 15px; padding: 10px; background-color: #e9f7fe; border-radius: 5px; border-left: 4px solid #2196F3;">
                      <p style="font-weight: bold; color: ##4CAF50;margin: 0;">
                        Complete all 5 questions to unlock the Set Symbols table:
                      </p>
                    </div>
                    
                    <!-- Quiz Question 1 - EXACTLY LIKE THE IMAGE -->
                    <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e0e0e0;">
                      <p style="font-weight: bold; margin-bottom: 8px; color: #333;">
                        1. which of these is the symbol of set ?
                      </p>
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz1" 
                            value="U" 
                            v-model="setSymbolsAnswers[0]"
                            :disabled="setSymbolsQuiz[0].answered"
                            style="margin-right: 8px;"
                          />
                          <span>A. U</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz1" 
                            value="A ∪ B" 
                            v-model="setSymbolsAnswers[0]"
                            :disabled="setSymbolsQuiz[0].answered"
                            style="margin-right: 8px;"
                          />
                          <span>B. A ∪ B</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz1" 
                            value="{ }" 
                            v-model="setSymbolsAnswers[0]"
                            :disabled="setSymbolsQuiz[0].answered"
                            style="margin-right: 8px;"
                          />
                          <span>C. { }</span>
                        </label>
                      </div>
                      
                      <!-- Submit Button and Feedback for Question 1 -->
                      <div v-if="setSymbolsAnswers[0] && !setSymbolsQuiz[0].answered" style="margin-top: 10px;">
                        <button @click="checkSetSymbolsAnswer(0)" class="submit-button" style="padding: 6px 12px; font-size: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                          Submit Answer
                        </button>
                      </div>
                      <div v-if="setSymbolsQuiz[0].answered" style="margin-top: 10px; font-weight: bold;">
                        <span v-if="setSymbolsQuiz[0].correct" style="color: green;">✅ Correct!</span>
                        <span v-else style="color: red;">❌ Incorrect. Correct answer: { }</span>
                      </div>
                    </div>

                    <!-- Quiz Question 2 -->
                    <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e0e0e0;">
                      <p style="font-weight: bold; margin-bottom: 8px; color: #333;">
                        2. Which symbol represents the universal set?
                      </p>
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz2" 
                            value="∅" 
                            v-model="setSymbolsAnswers[1]"
                            :disabled="setSymbolsQuiz[1].answered"
                            style="margin-right: 8px;"
                          />
                          <span>A. ∅</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz2" 
                            value="U" 
                            v-model="setSymbolsAnswers[1]"
                            :disabled="setSymbolsQuiz[1].answered"
                            style="margin-right: 8px;"
                          />
                          <span>B. U</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz2" 
                            value="∈" 
                            v-model="setSymbolsAnswers[1]"
                            :disabled="setSymbolsQuiz[1].answered"
                            style="margin-right: 8px;"
                          />
                          <span>C. ∈</span>
                        </label>
                      </div>
                      
                      <div v-if="setSymbolsAnswers[1] && !setSymbolsQuiz[1].answered" style="margin-top: 10px;">
                        <button @click="checkSetSymbolsAnswer(1)" class="submit-button" style="padding: 6px 12px; font-size: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                          Submit Answer
                        </button>
                      </div>
                      <div v-if="setSymbolsQuiz[1].answered" style="margin-top: 10px; font-weight: bold;">
                        <span v-if="setSymbolsQuiz[1].correct" style="color: green;">✅ Correct!</span>
                        <span v-else style="color: red;">❌ Incorrect. Correct answer: U</span>
                      </div>
                    </div>

                    <!-- Quiz Question 3 - UPDATED -->
                    <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e0e0e0;">
                      <p style="font-weight: bold; margin-bottom: 8px; color: #333;">
                        3. What is the symbol of Null or empty set?
                      </p>
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz3" 
                            value="U" 
                            v-model="setSymbolsAnswers[2]"
                            :disabled="setSymbolsQuiz[2].answered"
                            style="margin-right: 8px;"
                          />
                          <span>A. U</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz3" 
                            value="∅" 
                            v-model="setSymbolsAnswers[2]"
                            :disabled="setSymbolsQuiz[2].answered"
                            style="margin-right: 8px;"
                          />
                          <span>B. ∅</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz3" 
                            value="∈" 
                            v-model="setSymbolsAnswers[2]"
                            :disabled="setSymbolsQuiz[2].answered"
                            style="margin-right: 8px;"
                          />
                          <span>C. ∈</span>
                        </label>
                      </div>
                      
                      <div v-if="setSymbolsAnswers[2] && !setSymbolsQuiz[2].answered" style="margin-top: 10px;">
                        <button @click="checkSetSymbolsAnswer(2)" class="submit-button" style="padding: 6px 12px; font-size: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                          Submit Answer
                        </button>
                      </div>
                      <div v-if="setSymbolsQuiz[2].answered" style="margin-top: 10px; font-weight: bold;">
                        <span v-if="setSymbolsQuiz[2].correct" style="color: green;">✅ Correct!</span>
                        <span v-else style="color: red;">❌ Incorrect. Correct answer: ∅</span>
                      </div>
                    </div>

                    <!-- Quiz Question 4 - UPDATED -->
                    <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e0e0e0;">
                      <p style="font-weight: bold; margin-bottom: 8px; color: #333;">
                        4. What is the symbol of Set A intersection set B?
                      </p>
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz4" 
                            value="A ∪ B" 
                            v-model="setSymbolsAnswers[3]"
                            :disabled="setSymbolsQuiz[3].answered"
                            style="margin-right: 8px;"
                          />
                          <span>A. A ∪ B</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz4" 
                            value="A ∩ B" 
                            v-model="setSymbolsAnswers[3]"
                            :disabled="setSymbolsQuiz[3].answered"
                            style="margin-right: 8px;"
                          />
                          <span>B. A ∩ B</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz4" 
                            value="A ⊆ B" 
                            v-model="setSymbolsAnswers[3]"
                            :disabled="setSymbolsQuiz[3].answered"
                            style="margin-right: 8px;"
                          />
                          <span>C. A ⊆ B</span>
                        </label>
                      </div>
                      
                      <div v-if="setSymbolsAnswers[3] && !setSymbolsQuiz[3].answered" style="margin-top: 10px;">
                        <button @click="checkSetSymbolsAnswer(3)" class="submit-button" style="padding: 6px 12px; font-size: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                          Submit Answer
                        </button>
                      </div>
                      <div v-if="setSymbolsQuiz[3].answered" style="margin-top: 10px; font-weight: bold;">
                        <span v-if="setSymbolsQuiz[3].correct" style="color: green;">✅ Correct!</span>
                        <span v-else style="color: red;">❌ Incorrect. Correct answer: A ∩ B</span>
                      </div>
                    </div>

                    <!-- Quiz Question 5 - UPDATED -->
                    <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 15px; border: 1px solid #e0e0e0;">
                      <p style="font-weight: bold; margin-bottom: 8px; color: #333;">
                        5. What is the symbol of Set A is a subset of set B?
                      </p>
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz5" 
                            value="A ∪ B" 
                            v-model="setSymbolsAnswers[4]"
                            :disabled="setSymbolsQuiz[4].answered"
                            style="margin-right: 8px;"
                          />
                          <span>A. A ∪ B</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz5" 
                            value="A ∩ B" 
                            v-model="setSymbolsAnswers[4]"
                            :disabled="setSymbolsQuiz[4].answered"
                            style="margin-right: 8px;"
                          />
                          <span>B. A ∩ B</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                          <input 
                            type="radio" 
                            name="setQuiz5" 
                            value="A ⊆ B" 
                            v-model="setSymbolsAnswers[4]"
                            :disabled="setSymbolsQuiz[4].answered"
                            style="margin-right: 8px;"
                          />
                          <span>C. A ⊆ B</span>
                        </label>
                      </div>
                      
                      <div v-if="setSymbolsAnswers[4] && !setSymbolsQuiz[4].answered" style="margin-top: 10px;">
                        <button @click="checkSetSymbolsAnswer(4)" class="submit-button" style="padding: 6px 12px; font-size: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                          Submit Answer
                        </button>
                      </div>
                      <div v-if="setSymbolsQuiz[4].answered" style="margin-top: 10px; font-weight: bold;">
                        <span v-if="setSymbolsQuiz[4].correct" style="color: green;">✅ Correct!</span>
                        <span v-else style="color: red;">❌ Incorrect. Correct answer: A ⊆ B</span>
                      </div>
                    </div>
                    
                    <!-- Quiz Progress with SCORE - UPDATED -->
                    <div style="margin-top: 15px; padding: 10px; background-color: #e8f4fd; border-radius: 5px; border: 1px solid #bbdefb;">
                      <p style="font-weight: bold; color: #4CAF50; margin-bottom: 5px;">
                        Progress: {{ completedSetSymbolsQuizCount }}/5 questions completed
                      </p>
                      <p style="font-weight: bold; color: #4CAF50; margin-bottom: 5px;">
                        Your Score: {{ setSymbolsScore }}/5
                      </p>
                      <div v-if="completedSetSymbolsQuizCount === 5" style="color: #2e7d32; font-weight: bold; padding: 8px; background-color: #e8f5e9; border-radius: 4px; border: 1px solid #c8e6c9;">
                        🎉 Quiz completed! You can now view the Set Symbols table.
                      </div>
                    </div>
                  </div>

                  <!-- Toggle button for Set Symbols -->
                  <div style="text-align: center; margin-bottom: 15px;">
                    <button 
                      @click="toggleSetSymbols" 
                      class="solve-button" 
                      style="margin-bottom: 10px; padding: 10px 20px; font-size: 14px; font-weight: bold; background-color: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer;"
                      :disabled="completedSetSymbolsQuizCount < 5"
                      :style="{ 
                        backgroundColor: completedSetSymbolsQuizCount < 5 ? '#ccc' : '#4CAF50;',
                        cursor: completedSetSymbolsQuizCount < 5 ? 'not-allowed' : 'pointer'
                      }"
                    >
                      {{ showSetSymbols ? "🔽 HIDE SET SYMBOLS" : "📘 SHOW SET SYMBOLS" }}
                    </button>
                  </div>
                  
                  <!-- Error message if quiz not completed -->
                  <div v-if="showSetSymbolsError" style="color: #d32f2f; background-color: #ffebee; padding: 12px; border-radius: 5px; margin-bottom: 10px; border: 1px solid #ef9a9a; text-align: center; font-weight: bold;">
                    ⚠️ Complete all 5 quiz questions to unlock the Set Symbols table!
                  </div>

                  <!-- Set Symbols Table (Toggleable) -->
                  <div v-if="showSetSymbols && completedSetSymbolsQuizCount === 5" style="margin-top: 15px;">
                    <h4 style="text-align: center; color: #333; margin-bottom: 15px;">Set Symbols</h4>
                    <table style="width: 100%; border-collapse: collapse; border: 2px solid #efd56d; border-radius: 8px; overflow: hidden;">
                      <thead>
                        <tr style="background-color: #eeede9;">
                          <th style="border: 1px solid #efd56d; padding: 12px; text-align: center; font-weight: bold; color: #333;">Symbols</th>
                          <th style="border: 1px solid #efd56d; padding: 12px; text-align: center; font-weight: bold; color: #333;">Meaning</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style="background-color: white;">
                          <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">{ }</td>
                          <td style="border: 1px solid #efd56d; padding: 10px;">Symbol of set</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                          <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">U</td>
                          <td style="border: 1px solid #efd56d; padding: 10px;">Universal set</td>
                        </tr>
                        <tr style="background-color: white;">
                          <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">n(X)</td>
                          <td style="border: 1px solid #efd56d; padding: 10px;">Cardinal number of set X</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                          <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">b ∈ A</td>
                          <td style="border: 1px solid #efd56d; padding: 10px;">'b' is an element of set A</td>
                        </tr>
                        <tr style="background-color: white;">
                          <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">a ∉ B</td>
                          <td style="border: 1px solid #efd56d; padding: 10px;">'a' is not an element of set B</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                          <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">∅</td>
                          <td style="border: 1px solid #efd56d; padding: 10px;">Null or empty set</td>
                        </tr>
                        <tr style="background-color: white;">
                          <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">A ∪ B</td>
                          <td style="border: 1px solid #efd56d; padding: 10px;">Set A union set B</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                          <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">A ∩ B</td>
                          <td style="border: 1px solid #efd56d; padding: 10px;">Set A intersection set B</td>
                        </tr>
                        <tr style="background-color: white;">
                          <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">A ⊆ B</td>
                          <td style="border: 1px solid #efd56d; padding: 10px;">Set A is a subset of set B</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                          <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">B ⊇ A</td>
                          <td style="border: 1px solid #efd56d; padding: 10px;">Set B is the superset of set A</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <!-- Next Lesson Button -->
                  <div style="text-align: center; margin-top: 20px;">
                    <button @click="goToNextLesson" class="next-button" style="padding: 12px 24px; font-size: 16px; font-weight: bold; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                      ➡️ Next Lesson
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- SETS, CARDINALITY, REPRESENTATION OF SETS SPECIAL CONTENT -->
              <div v-if="topic.type === 'sets'">
                <!-- LET'S TRY Card (Sets) -->
                <div class="problem-box">
                  <h4> Mastery Quiz 1</h4>
                  <p><strong>Provide a set of vowels in the English alphabet?</strong></p>
                  <input
                    v-model="subsetAnswer"
                    placeholder="Type your answer here"
                    class="answer-input"
                  />
                  <button @click="checkSubsetAnswer" class="submit-button" :disabled="!subsetAnswer.trim()"> LET'S CHECK </button>
                  <div v-if="subsetFeedback" class="result-box">
                    <p>{{ subsetFeedback }}</p>
                  </div>
                  <div v-if="subsetGoodJob" class="good-job-message">Good job, you have {{ totalScore }} points</div>
                </div>
                <!-- TRY THIS Card (Representation of Sets) -->
                <div class="problem-box">
                  <h4> Mastery Quiz 2</h4>
                  <p><strong>Which of the following represent the set of even numbers?</strong></p>
                  <div v-for="(option, idx) in subsetQuiz.options" :key="idx" class="option-box">
                    <label class="option-label">
                      <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                      <input type="radio" name="subsetQuiz" :value="option" v-model="subsetQuizAnswer" />
                      <span class="option-text">{{ option }}</span>
                    </label>
                  </div>
                  <!-- CHANGED: Larger buttons for Sets Mastery Quiz 2 -->
                  <div style="display: flex; justify-content: flex-start; gap: 10px; align-items: center; margin-top: 10px;">
                    <button @click="checkSubsetQuiz" class="submit-button larger-button" :disabled="!subsetQuizAnswer">LET'S CHECK</button>
                    <button @click="subsetPageActive = true" class="next-button larger-button">➡️ Next</button>
                  </div>
                  <div v-if="subsetQuizFeedback" class="result-box">
                    <p>{{ subsetQuizFeedback }}</p>
                  </div>
                  <div v-if="subsetQuizGoodJob" class="good-job-message">Good job, you have {{ totalScore }} points</div>
                </div>
              </div>
              <!-- SINGLETON SET, EMPTY SET, FINITE SET SPECIAL CONTENT -->
              <div v-else-if="topic.type === 'singleton'">
                <!-- Step-by-step card ABOVE Try This -->
                <div v-if="showSingletonGuide" class="guide-box">
                  <h4>📘 YOUR GUIDE</h4>
                  <p v-for="(step, sIdx) in singletonSteps" :key="sIdx">
                    <button @click="toggleSingletonStep(sIdx)" class="step-button">
                      Step {{ sIdx + 1 }}
                    </button>
                    <span v-if="singletonRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                  </p>
                </div>
                <!-- LET'S TRY Card (Singleton Set) - UPDATED FORMAT -->
                <div class="problem-box">
                  <h4>Mastery quiz 1</h4>
                  <p><strong>Give a singleton set containing the number 3.</strong></p>
                  <!-- UPDATED: Format similar to the image - LEFT ALIGNED -->
                  <div style="margin: 10px 0;">
                    <button 
                      @click="showSingletonGuide = !showSingletonGuide" 
                      class="solve-button" 
                      style="font-size: 14px; padding: 8px 16px; margin-bottom: 10px;">
                      {{ showSingletonGuide ? "🔽 CLICK TO HIDE" : "📘 CLICK TO SHOW" }}
                    </button>
                  </div>
                  <div style="margin: 15px 0;">
                    <input
                      v-model="singletonAnswer"
                      placeholder="Type your answer here"
                      class="answer-input"
                      style="width: 100%; max-width: 400px; font-size: 16px;"
                    />
                  </div>
                  <div style="margin-top: 15px;">
                    <button @click="checkSingletonAnswer" class="submit-button" :disabled="!singletonAnswer.trim()" style="padding: 10px 30px; font-size: 16px;">LET'S CHECK</button>
                  </div>
                  <div v-if="singletonFeedback" class="result-box" style="margin-top: 15px;">
                    <p>{{ singletonFeedback }}</p>
                  </div>
                  <div v-if="singletonInputGoodJob" class="good-job-message">Good job, you have {{ singletonSectionScore }} points</div>
                </div>
                <!-- TRY THIS Card (Empty Set) -->
                <div class="problem-box">
                  <h4>Mastery Quiz 2</h4>
                  <p><strong>Which of the following is a singleton set?</strong></p>
                  <div v-for="(option, idx) in singletonQuiz.options" :key="idx" class="option-box">
                    <label class="option-label">
                      <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                      <input type="radio" name="singletonQuiz" :value="option" v-model="singletonQuizAnswer" />
                      <span class="option-text">{{ option }}</span>
                    </label>
                  </div>
                  <!-- CHANGED: Larger buttons for Singleton Mastery Quiz 2 -->
                  <div style="display: flex; justify-content: flex-start; gap: 10px; align-items: center; margin-top: 10px;">
                    <button @click="checkSingletonQuiz" class="submit-button larger-button" :disabled="!singletonQuizAnswer">LET'S CHECK</button>
                    <button @click="singletonPageActive = true" class="next-button larger-button">➡️ Next</button>
                  </div>
                  <div v-if="singletonQuizFeedback" class="result-box">
                    <p>{{ singletonQuizFeedback }}</p>
                  </div>
                  <div v-if="singletonQuizGoodJob" class="good-job-message">Good job, you have {{ singletonSectionScore }} points</div>
                </div>
              </div>
              <!-- INFINITE SET, EQUAL SET, UNEQUAL SET SPECIAL CONTENT -->
              <div v-else-if="topic.type === 'infinite'">
                <!-- Step-by-step card ABOVE Try This -->
                <div v-if="showInfiniteGuide" class="guide-box">
                  <h4>📘 YOUR GUIDE</h4>
                  <p v-for="(step, sIdx) in infiniteSteps" :key="sIdx">
                    <button @click="toggleInfiniteStep(sIdx)" class="step-button">
                      Step {{ sIdx + 1 }}
                    </button>
                    <span v-if="infiniteRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                  </p>
                </div>
                <!-- LET'S TRY Card (Infinite Set) - UPDATED FORMAT -->
                <div class="problem-box">
                  <h4>Mastery quiz 1</h4>
                  <p><strong>Give an example of an infinite set.</strong></p>
                  <!-- UPDATED: Format similar to the image - LEFT ALIGNED -->
                  <div style="margin: 10px 0;">
                    <button 
                      @click="showInfiniteGuide = !showInfiniteGuide" 
                      class="solve-button" 
                      style="font-size: 14px; padding: 8px 16px; margin-bottom: 10px;">
                      {{ showInfiniteGuide ? "🔽 CLICK TO HIDE" : "📘 CLICK TO SHOW" }}
                    </button>
                  </div>
                  <div style="margin: 15px 0;">
                    <input
                      v-model="infiniteAnswer"
                      placeholder="Type your answer here"
                      class="answer-input"
                      style="width: 100%; max-width: 400px; font-size: 16px;"
                    />
                  </div>
                  <div style="margin-top: 15px;">
                    <button @click="checkInfiniteAnswer" class="submit-button" :disabled="!infiniteAnswer.trim()" style="padding: 10px 30px; font-size: 16px;">LET'S CHECK</button>
                  </div>
                  <div v-if="infiniteFeedback" class="result-box" style="margin-top: 15px;">
                    <p>{{ infiniteFeedback }}</p>
                  </div>
                  <div v-if="infiniteGoodJob" class="good-job-message">Good job, you got {{ infiniteSectionScore }} points</div>
                </div>
                <!-- TRY THIS Card (Infinite Set Quiz) -->
                <div class="problem-box">
                  <h4> Mastery Quiz 2</h4>
                  <p><strong>Which of the following is an infinite set?</strong></p>
                  <div v-for="(option, idx) in infiniteQuiz.options" :key="idx" class="option-box">
                    <label class="option-label">
                      <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                      <input type="radio" name="infiniteQuiz" :value="option" v-model="infiniteQuizAnswer" />
                      <span class="option-text">{{ option }}</span>
                    </label>
                  </div>
                  <!-- CHANGED: Larger buttons for Infinite Set Mastery Quiz 2 -->
                  <div style="display: flex; justify-content: flex-start; gap: 10px; align-items: center; margin-top: 10px;">
                    <button @click="checkInfiniteQuiz" class="submit-button larger-button" :disabled="!infiniteQuizAnswer">LET'S CHECK</button>
                    <button @click="infinitePageActive = true" class="next-button larger-button">➡️ Next</button>
                  </div>
                  <div v-if="infiniteQuizFeedback" class="result-box">
                    <p>{{ infiniteQuizFeedback }}</p>
                  </div>
                  <div v-if="infiniteQuizGoodJob" class="good-job-message">Good job, you got {{ infiniteSectionScore }} points</div>
                </div>
              </div>
              <!-- SUBSET SUPERSET, UNIVERSAL SET, POWER SET SPECIAL CONTENT -->
              <div v-else-if="topic.type === 'subsuper'">
                <!-- Step-by-step card ABOVE Try This -->
                <div v-if="showSubSupGuide" class="guide-box">
                  <h4>📘 YOUR GUIDE</h4>
                  <p v-for="(step, sIdx) in subSupSteps" :key="sIdx">
                    <button @click="toggleSubSupStep(sIdx)" class="step-button">
                      Step {{ sIdx + 1 }}
                    </button>
                    <span v-if="subSupRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                  </p>
                </div>
                <!-- LET'S TRY Card (Subset Superset) - UPDATED FORMAT -->
                <div class="problem-box">
                  <h4>Mastery quiz 1</h4>
                  <p><strong>Provide a subset of {1, 2, 3, 4}.</strong></p>
                  <!-- UPDATED: Format similar to the image - LEFT ALIGNED -->
                  <div style="margin: 10px 0;">
                    <button 
                      @click="showSubSupGuide = !showSubSupGuide" 
                      class="solve-button" 
                      style="font-size: 14px; padding: 8px 16px; margin-bottom: 10px;">
                      {{ showSubSupGuide ? "🔽 CLICK TO HIDE" : "📘 CLICK TO SHOW" }}
                    </button>
                  </div>
                  <div style="margin: 15px 0;">
                    <input
                      v-model="subSupAnswer"
                      placeholder="Type your answer here"
                      class="answer-input"
                      style="width: 100%; max-width: 400px; font-size: 16px;"
                    />
                  </div>
                  <div style="margin-top: 15px;">
                    <button @click="checkSubSupAnswer" class="submit-button" :disabled="!subSupAnswer.trim()" style="padding: 10px 30px; font-size: 16px;">LET'S CHECK</button>
                  </div>
                  <div v-if="subSupFeedback" class="result-box" style="margin-top: 15px;">
                    <p>{{ subSupFeedback }}</p>
                  </div>
                  <div v-if="subSupInputGoodJob" class="good-job-message">Good job, you got {{ subSupSectionScore }} points</div>
                </div>
                <!-- TRY THIS Card (Superset Quiz) -->
                <div class="problem-box">
                  <h4> Mastery Quiz 2</h4>
                  <p><strong>Which of the following is a superset of {1,2}?</strong></p>
                  <div v-for="(option, idx) in subSupQuiz.options" :key="idx" class="option-box">
                    <label class="option-label">
                      <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                      <input type="radio" name="subSupQuiz" :value="option" v-model="subSupQuizAnswer" />
                      <span class="option-text">{{ option }}</span>
                    </label>
                  </div>
                  <!-- CHANGED: Larger buttons for Subset Mastery Quiz 2 -->
                  <div style="display: flex; justify-content: flex-start; gap: 10px; align-items: center; margin-top: 10px;">
                    <button @click="checkSubSupQuiz" class="submit-button larger-button" :disabled="!subSupQuizAnswer">LET'S CHECK</button>
                    <button @click="universalPageActive = true" class="next-button larger-button">➡️ Next</button>
                  </div>
                  <div v-if="subSupQuizFeedback" class="result-box">
                    <p>{{ subSupQuizFeedback }}</p>
                  </div>
                  <div v-if="subSupQuizGoodJob" class="good-job-message">Good job, you got {{ subSupSectionScore }} points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Selected Topic View - Only Selected Topic Visible -->
        <div v-if="selectedTopic !== null && !subsetPageActive && !unionPageActive && !singletonPageActive && !singletonRepresentationPageActive && !infinitePageActive && !infiniteRepresentationPageActive && !universalPageActive && !powerSetPageActive" class="content-box">
          <h4 class="clickable-title" @click="toggleTopic(selectedTopic)" style="cursor: pointer;">
            {{ topics[selectedTopic].title }}
          </h4>
          <div>
            <p v-html="formatContent(topics[selectedTopic].content)"></p>
            <!-- INTRO SPECIAL CONTENT -->
            <div v-if="topics[selectedTopic].type === 'intro'">
              <div style="background-color: #eeede9; padding: 10px; border-radius: 5px; margin-bottom: 10px; border: 1px solid #efd56d;">
                <!-- NEW: Quiz Card for Set Symbols - FORMATTED LIKE THE IMAGE -->
                <div class="problem-box" style="margin-bottom: 15px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #ddd;">
                  <h4 style="text-align: center; color: #333; margin-bottom: 15px;">📝 Set Symbols Quiz</h4>
                  <div style="margin-bottom: 15px; padding: 10px; background-color: #e9f7fe; border-radius: 5px; border-left: 4px solid #2196F3;">
                    <p style="font-weight: bold; color: #0d47a1; margin: 0;">
                      Complete all 5 questions to unlock the Set Symbols table:
                    </p>
                  </div>
                  
                  <!-- Quiz Question 1 - EXACTLY LIKE THE IMAGE -->
                  <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e0e0e0;">
                    <p style="font-weight: bold; margin-bottom: 8px; color: #333;">
                      1. which of these is the symbol of set ?
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz1" 
                          value="U" 
                          v-model="setSymbolsAnswers[0]"
                          :disabled="setSymbolsQuiz[0].answered"
                          style="margin-right: 8px;"
                        />
                        <span>A. U</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz1" 
                          value="A ∪ B" 
                          v-model="setSymbolsAnswers[0]"
                          :disabled="setSymbolsQuiz[0].answered"
                          style="margin-right: 8px;"
                        />
                        <span>B. A ∪ B</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz1" 
                          value="{ }" 
                          v-model="setSymbolsAnswers[0]"
                          :disabled="setSymbolsQuiz[0].answered"
                          style="margin-right: 8px;"
                        />
                        <span>C. { }</span>
                      </label>
                    </div>
                    
                    <!-- Submit Button and Feedback for Question 1 -->
                    <div v-if="setSymbolsAnswers[0] && !setSymbolsQuiz[0].answered" style="margin-top: 10px;">
                      <button @click="checkSetSymbolsAnswer(0)" class="submit-button" style="padding: 6px 12px; font-size: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Submit Answer
                      </button>
                    </div>
                    <div v-if="setSymbolsQuiz[0].answered" style="margin-top: 10px; font-weight: bold;">
                      <span v-if="setSymbolsQuiz[0].correct" style="color: green;">✅ Correct!</span>
                      <span v-else style="color: red;">❌ Incorrect. Correct answer: { }</span>
                    </div>
                  </div>

                  <!-- Quiz Question 2 -->
                  <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e0e0e0;">
                    <p style="font-weight: bold; margin-bottom: 8px; color: #333;">
                      2. Which symbol represents the universal set?
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz2" 
                          value="∅" 
                          v-model="setSymbolsAnswers[1]"
                          :disabled="setSymbolsQuiz[1].answered"
                          style="margin-right: 8px;"
                        />
                        <span>A. ∅</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz2" 
                          value="U" 
                          v-model="setSymbolsAnswers[1]"
                          :disabled="setSymbolsQuiz[1].answered"
                          style="margin-right: 8px;"
                        />
                        <span>B. U</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz2" 
                          value="∈" 
                          v-model="setSymbolsAnswers[1]"
                          :disabled="setSymbolsQuiz[1].answered"
                          style="margin-right: 8px;"
                        />
                        <span>C. ∈</span>
                      </label>
                    </div>
                    
                    <div v-if="setSymbolsAnswers[1] && !setSymbolsQuiz[1].answered" style="margin-top: 10px;">
                      <button @click="checkSetSymbolsAnswer(1)" class="submit-button" style="padding: 6px 12px; font-size: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Submit Answer
                      </button>
                    </div>
                    <div v-if="setSymbolsQuiz[1].answered" style="margin-top: 10px; font-weight: bold;">
                      <span v-if="setSymbolsQuiz[1].correct" style="color: green;">✅ Correct!</span>
                      <span v-else style="color: red;">❌ Incorrect. Correct answer: U</span>
                    </div>
                  </div>

                  <!-- Quiz Question 3 - UPDATED -->
                  <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e0e0e0;">
                    <p style="font-weight: bold; margin-bottom: 8px; color: #333;">
                      3. What is the symbol of Null or empty set?
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz3" 
                          value="U" 
                          v-model="setSymbolsAnswers[2]"
                          :disabled="setSymbolsQuiz[2].answered"
                          style="margin-right: 8px;"
                        />
                        <span>A. U</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz3" 
                          value="∅" 
                          v-model="setSymbolsAnswers[2]"
                          :disabled="setSymbolsQuiz[2].answered"
                          style="margin-right: 8px;"
                        />
                        <span>B. ∅</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz3" 
                          value="∈" 
                          v-model="setSymbolsAnswers[2]"
                          :disabled="setSymbolsQuiz[2].answered"
                          style="margin-right: 8px;"
                        />
                        <span>C. ∈</span>
                      </label>
                    </div>
                    
                    <div v-if="setSymbolsAnswers[2] && !setSymbolsQuiz[2].answered" style="margin-top: 10px;">
                      <button @click="checkSetSymbolsAnswer(2)" class="submit-button" style="padding: 6px 12px; font-size: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Submit Answer
                      </button>
                    </div>
                    <div v-if="setSymbolsQuiz[2].answered" style="margin-top: 10px; font-weight: bold;">
                      <span v-if="setSymbolsQuiz[2].correct" style="color: green;">✅ Correct!</span>
                      <span v-else style="color: red;">❌ Incorrect. Correct answer: ∅</span>
                    </div>
                  </div>

                  <!-- Quiz Question 4 - UPDATED -->
                  <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e0e0e0;">
                    <p style="font-weight: bold; margin-bottom: 8px; color: #333;">
                      4. What is the symbol of Set A intersection set B?
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz4" 
                          value="A ∪ B" 
                          v-model="setSymbolsAnswers[3]"
                          :disabled="setSymbolsQuiz[3].answered"
                          style="margin-right: 8px;"
                        />
                        <span>A. A ∪ B</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz4" 
                          value="A ∩ B" 
                          v-model="setSymbolsAnswers[3]"
                          :disabled="setSymbolsQuiz[3].answered"
                          style="margin-right: 8px;"
                        />
                        <span>B. A ∩ B</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz4" 
                          value="A ⊆ B" 
                          v-model="setSymbolsAnswers[3]"
                          :disabled="setSymbolsQuiz[3].answered"
                          style="margin-right: 8px;"
                        />
                        <span>C. A ⊆ B</span>
                      </label>
                    </div>
                    
                    <div v-if="setSymbolsAnswers[3] && !setSymbolsQuiz[3].answered" style="margin-top: 10px;">
                      <button @click="checkSetSymbolsAnswer(3)" class="submit-button" style="padding: 6px 12px; font-size: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Submit Answer
                      </button>
                    </div>
                    <div v-if="setSymbolsQuiz[3].answered" style="margin-top: 10px; font-weight: bold;">
                      <span v-if="setSymbolsQuiz[3].correct" style="color: green;">✅ Correct!</span>
                      <span v-else style="color: red;">❌ Incorrect. Correct answer: A ∩ B</span>
                    </div>
                  </div>

                  <!-- Quiz Question 5 - UPDATED -->
                  <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 15px; border: 1px solid #e0e0e0;">
                    <p style="font-weight: bold; margin-bottom: 8px; color: #333;">
                      5. What is the symbol of Set A is a subset of set B?
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz5" 
                          value="A ∪ B" 
                          v-model="setSymbolsAnswers[4]"
                          :disabled="setSymbolsQuiz[4].answered"
                          style="margin-right: 8px;"
                        />
                        <span>A. A ∪ B</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz5" 
                          value="A ∩ B" 
                          v-model="setSymbolsAnswers[4]"
                          :disabled="setSymbolsQuiz[4].answered"
                          style="margin-right: 8px;"
                        />
                        <span>B. A ∩ B</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer;">
                        <input 
                          type="radio" 
                          name="setQuiz5" 
                          value="A ⊆ B" 
                          v-model="setSymbolsAnswers[4]"
                          :disabled="setSymbolsQuiz[4].answered"
                          style="margin-right: 8px;"
                        />
                        <span>C. A ⊆ B</span>
                      </label>
                    </div>
                    
                    <div v-if="setSymbolsAnswers[4] && !setSymbolsQuiz[4].answered" style="margin-top: 10px;">
                      <button @click="checkSetSymbolsAnswer(4)" class="submit-button" style="padding: 6px 12px; font-size: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Submit Answer
                      </button>
                    </div>
                    <div v-if="setSymbolsQuiz[4].answered" style="margin-top: 10px; font-weight: bold;">
                      <span v-if="setSymbolsQuiz[4].correct" style="color: green;">✅ Correct!</span>
                      <span v-else style="color: red;">❌ Incorrect. Correct answer: A ⊆ B</span>
                    </div>
                  </div>
                  
                  <!-- Quiz Progress with SCORE - UPDATED -->
                  <div style="margin-top: 15px; padding: 10px; background-color: #e8f4fd; border-radius: 5px; border: 1px solid #bbdefb;">
                    <p style="font-weight: bold; color: #1565c0; margin-bottom: 5px;">
                      Progress: {{ completedSetSymbolsQuizCount }}/5 questions completed
                    </p>
                    <p style="font-weight: bold; color: #1565c0; margin-bottom: 5px;">
                      Your Score: {{ setSymbolsScore }}/5
                    </p>
                    <div v-if="completedSetSymbolsQuizCount === 5" style="color: #2e7d32; font-weight: bold; padding: 8px; background-color: #e8f5e9; border-radius: 4px; border: 1px solid #c8e6c9;">
                      🎉 Quiz completed! You can now view the Set Symbols table.
                    </div>
                  </div>
                </div>

                <!-- Toggle button for Set Symbols -->
                <div style="text-align: center; margin-bottom: 15px;">
                  <button 
                    @click="toggleSetSymbols" 
                    class="solve-button" 
                    style="margin-bottom: 10px; padding: 10px 20px; font-size: 14px; font-weight: bold; background-color: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer;"
                    :disabled="completedSetSymbolsQuizCount < 5"
                    :style="{ 
                      backgroundColor: completedSetSymbolsQuizCount < 5 ? '#ccc' : '#2196F3',
                      cursor: completedSetSymbolsQuizCount < 5 ? 'not-allowed' : 'pointer'
                    }"
                  >
                    {{ showSetSymbols ? "🔽 HIDE SET SYMBOLS" : "📘 SHOW SET SYMBOLS" }}
                  </button>
                </div>
                
                <!-- Error message if quiz not completed -->
                <div v-if="showSetSymbolsError" style="color: #d32f2f; background-color: #ffebee; padding: 12px; border-radius: 5px; margin-bottom: 10px; border: 1px solid #ef9a9a; text-align: center; font-weight: bold;">
                  ⚠️ Complete all 5 quiz questions to unlock the Set Symbols table!
                </div>

                <!-- Set Symbols Table (Toggleable) -->
                <div v-if="showSetSymbols && completedSetSymbolsQuizCount === 5" style="margin-top: 15px;">
                  <h4 style="text-align: center; color: #333; margin-bottom: 15px;">Set Symbols</h4>
                  <table style="width: 100%; border-collapse: collapse; border: 2px solid #efd56d; border-radius: 8px; overflow: hidden;">
                    <thead>
                      <tr style="background-color: #eeede9;">
                        <th style="border: 1px solid #efd56d; padding: 12px; text-align: center; font-weight: bold; color: #333;">Symbols</th>
                        <th style="border: 1px solid #efd56d; padding: 12px; text-align: center; font-weight: bold; color: #333;">Meaning</th>
                      </tr>
                      </thead>
                    <tbody>
                      <tr style="background-color: white;">
                        <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">{ }</td>
                        <td style="border: 1px solid #efd56d; padding: 10px;">Symbol of set</td>
                      </tr>
                      <tr style="background-color: #f9f9f9;">
                        <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">U</td>
                        <td style="border: 1px solid #efd56d; padding: 10px;">Universal set</td>
                      </tr>
                      <tr style="background-color: white;">
                        <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">n(X)</td>
                        <td style="border: 1px solid #efd56d; padding: 10px;">Cardinal number of set X</td>
                      </tr>
                      <tr style="background-color: #f9f9f9;">
                        <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">b ∈ A</td>
                        <td style="border: 1px solid #efd56d; padding: 10px;">'b' is an element of set A</td>
                      </tr>
                      <tr style="background-color: white;">
                        <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">a ∉ B</td>
                        <td style="border: 1px solid #efd56d; padding: 10px;">'a' is not an element of set B</td>
                      </tr>
                      <tr style="background-color: #f9f9f9;">
                        <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">∅</td>
                        <td style="border: 1px solid #efd56d; padding: 10px;">Null or empty set</td>
                      </tr>
                      <tr style="background-color: white;">
                        <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">A ∪ B</td>
                        <td style="border: 1px solid #efd56d; padding: 10px;">Set A union set B</td>
                      </tr>
                      <tr style="background-color: #f9f9f9;">
                        <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">A ∩ B</td>
                        <td style="border: 1px solid #efd56d; padding: 10px;">Set A intersection set B</td>
                      </tr>
                      <tr style="background-color: white;">
                        <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">A ⊆ B</td>
                        <td style="border: 1px solid #efd56d; padding: 10px;">Set A is a subset of set B</td>
                      </tr>
                      <tr style="background-color: #f9f9f9;">
                        <td style="border: 1px solid #efd56d; padding: 10px; text-align: center; font-weight: bold;">B ⊇ A</td>
                        <td style="border: 1px solid #efd56d; padding: 10px;">Set B is the superset of set A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <!-- Next Lesson Button -->
                <div style="text-align: center; margin-top: 20px;">
                  <button @click="goToNextLesson" class="next-button" style="padding: 12px 24px; font-size: 16px; font-weight: bold; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    ➡️ Next Lesson
                  </button>
                </div>
              </div>
            </div>
            <!-- SETS, CARDINALITY, REPRESENTATION OF SETS SPECIAL CONTENT -->
            <div v-if="topics[selectedTopic].type === 'sets'">
              <!-- LET'S TRY Card (Sets) -->
              <div class="problem-box">
                <h4> Mastery Quiz 1</h4>
                <p><strong>Provide a set of vowels in the English alphabet?</strong></p>
                <input
                  v-model="subsetAnswer"
                  placeholder="Type your answer here"
                  class="answer-input"
                />
                <button @click="checkSubsetAnswer" class="submit-button" :disabled="!subsetAnswer.trim()"> LET'S CHECK </button>
                <div v-if="subsetFeedback" class="result-box">
                  <p>{{ subsetFeedback }}</p>
                </div>
                <div v-if="subsetGoodJob" class="good-job-message">Good job, you have {{ totalScore }} points</div>
              </div>
              <!-- TRY THIS Card (Representation of Sets) -->
              <div class="problem-box">
                <h4> Mastery Quiz 2</h4>
                <p><strong>Which of the following represent the set of even numbers?</strong></p>
                <div v-for="(option, idx) in subsetQuiz.options" :key="idx" class="option-box">
                  <label class="option-label">
                    <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                    <input type="radio" name="subsetQuiz" :value="option" v-model="subsetQuizAnswer" />
                    <span class="option-text">{{ option }}</span>
                  </label>
                </div>
                <!-- CHANGED: Larger buttons for Sets Mastery Quiz 2 -->
                <div style="display: flex; justify-content: flex-start; gap: 10px; align-items: center; margin-top: 10px;">
                  <button @click="checkSubsetQuiz" class="submit-button larger-button" :disabled="!subsetQuizAnswer">LET'S CHECK</button>
                  <button @click="subsetPageActive = true" class="next-button larger-button">➡️ Next</button>
                </div>
                <div v-if="subsetQuizFeedback" class="result-box">
                  <p>{{ subsetQuizFeedback }}</p>
                </div>
                <div v-if="subsetQuizGoodJob" class="good-job-message">Good job, you have {{ totalScore }} points</div>
              </div>
            </div>
            <!-- SINGLETON SET, EMPTY SET, FINITE SET SPECIAL CONTENT -->
            <div v-else-if="topics[selectedTopic].type === 'singleton'">
              <!-- Step-by-step card ABOVE Try This -->
              <div v-if="showSingletonGuide" class="guide-box">
                <h4>📘 YOUR GUIDE</h4>
                <p v-for="(step, sIdx) in singletonSteps" :key="sIdx">
                  <button @click="toggleSingletonStep(sIdx)" class="step-button">
                    Step {{ sIdx + 1 }}
                  </button>
                  <span v-if="singletonRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                </p>
              </div>
              <!-- LET'S TRY Card (Singleton Set) - UPDATED FORMAT -->
              <div class="problem-box">
                <h4>Mastery quiz 1</h4>
                <p><strong>Give a singleton set containing the number 3.</strong></p>
                <!-- UPDATED: Format similar to the image - LEFT ALIGNED -->
                <div style="margin: 10px 0;">
                  <button 
                    @click="showSingletonGuide = !showSingletonGuide" 
                    class="solve-button" 
                    style="font-size: 14px; padding: 8px 16px; margin-bottom: 10px;">
                    {{ showSingletonGuide ? "🔽 CLICK TO HIDE" : "📘 CLICK TO SHOW" }}
                  </button>
                </div>
                <div style="margin: 15px 0;">
                  <input
                    v-model="singletonAnswer"
                    placeholder="Type your answer here"
                    class="answer-input"
                    style="width: 100%; max-width: 400px; font-size: 16px;"
                  />
                </div>
                <div style="margin-top: 15px;">
                  <button @click="checkSingletonAnswer" class="submit-button" :disabled="!singletonAnswer.trim()" style="padding: 10px 30px; font-size: 16px;">LET'S CHECK</button>
                </div>
                <div v-if="singletonFeedback" class="result-box" style="margin-top: 15px;">
                  <p>{{ singletonFeedback }}</p>
                </div>
                <div v-if="singletonInputGoodJob" class="good-job-message">Good job, you have {{ singletonSectionScore }} points</div>
              </div>
              <!-- TRY THIS Card (Empty Set) -->
              <div class="problem-box">
                <h4>Mastery Quiz 2</h4>
                <p><strong>Which of the following is a singleton set?</strong></p>
                <div v-for="(option, idx) in singletonQuiz.options" :key="idx" class="option-box">
                  <label class="option-label">
                    <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                    <input type="radio" name="singletonQuiz" :value="option" v-model="singletonQuizAnswer" />
                    <span class="option-text">{{ option }}</span>
                  </label>
                </div>
                <!-- CHANGED: Larger buttons for Singleton Mastery Quiz 2 -->
                <div style="display: flex; justify-content: flex-start; gap: 10px; align-items: center; margin-top: 10px;">
                  <button @click="checkSingletonQuiz" class="submit-button larger-button" :disabled="!singletonQuizAnswer">LET'S CHECK</button>
                  <button @click="singletonPageActive = true" class="next-button larger-button">➡️ Next</button>
                </div>
                <div v-if="singletonQuizFeedback" class="result-box">
                  <p>{{ singletonQuizFeedback }}</p>
                </div>
                <div v-if="singletonQuizGoodJob" class="good-job-message">Good job, you have {{ singletonSectionScore }} points</div>
              </div>
            </div>
            <!-- INFINITE SET, EQUAL SET, UNEQUAL SET SPECIAL CONTENT -->
            <div v-else-if="topics[selectedTopic].type === 'infinite'">
              <!-- Step-by-step card ABOVE Try This -->
              <div v-if="showInfiniteGuide" class="guide-box">
                <h4>📘 YOUR GUIDE</h4>
                <p v-for="(step, sIdx) in infiniteSteps" :key="sIdx">
                  <button @click="toggleInfiniteStep(sIdx)" class="step-button">
                    Step {{ sIdx + 1 }}
                  </button>
                  <span v-if="infiniteRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                </p>
              </div>
              <!-- LET'S TRY Card (Infinite Set) - UPDATED FORMAT -->
              <div class="problem-box">
                <h4>Mastery quiz 1</h4>
                <p><strong>Give an example of an infinite set.</strong></p>
                <!-- UPDATED: Format similar to the image - LEFT ALIGNED -->
                <div style="margin: 10px 0;">
                  <button 
                    @click="showInfiniteGuide = !showInfiniteGuide" 
                    class="solve-button" 
                    style="font-size: 14px; padding: 8px 16px; margin-bottom: 10px;">
                    {{ showInfiniteGuide ? "🔽 CLICK TO HIDE" : "📘 CLICK TO SHOW" }}
                  </button>
                </div>
                <div style="margin: 15px 0;">
                  <input
                    v-model="infiniteAnswer"
                    placeholder="Type your answer here"
                    class="answer-input"
                    style="width: 100%; max-width: 400px; font-size: 16px;"
                  />
                </div>
                <div style="margin-top: 15px;">
                  <button @click="checkInfiniteAnswer" class="submit-button" :disabled="!infiniteAnswer.trim()" style="padding: 10px 30px; font-size: 16px;">LET'S CHECK</button>
                </div>
                <div v-if="infiniteFeedback" class="result-box" style="margin-top: 15px;">
                  <p>{{ infiniteFeedback }}</p>
                </div>
                <div v-if="infiniteGoodJob" class="good-job-message">Good job, you got {{ infiniteSectionScore }} points</div>
              </div>
              <!-- TRY THIS Card (Infinite Set Quiz) -->
              <div class="problem-box">
                <h4> Mastery Quiz 2</h4>
                <p><strong>Which of the following is an infinite set?</strong></p>
                <div v-for="(option, idx) in infiniteQuiz.options" :key="idx" class="option-box">
                  <label class="option-label">
                    <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                    <input type="radio" name="infiniteQuiz" :value="option" v-model="infiniteQuizAnswer" />
                    <span class="option-text">{{ option }}</span>
                  </label>
                </div>
                <!-- CHANGED: Larger buttons for Infinite Set Mastery Quiz 2 -->
                <div style="display: flex; justify-content: flex-start; gap: 10px; align-items: center; margin-top: 10px;">
                  <button @click="checkInfiniteQuiz" class="submit-button larger-button" :disabled="!infiniteQuizAnswer">LET'S CHECK</button>
                  <button @click="infinitePageActive = true" class="next-button larger-button">➡️ Next</button>
                </div>
                <div v-if="infiniteQuizFeedback" class="result-box">
                  <p>{{ infiniteQuizFeedback }}</p>
                </div>
                <div v-if="infiniteQuizGoodJob" class="good-job-message">Good job, you got {{ infiniteSectionScore }} points</div>
              </div>
            </div>
            <!-- SUBSET SUPERSET, UNIVERSAL SET, POWER SET SPECIAL CONTENT -->
            <div v-else-if="topics[selectedTopic].type === 'subsuper'">
              <!-- Step-by-step card ABOVE Try This -->
              <div v-if="showSubSupGuide" class="guide-box">
                <h4>📘 YOUR GUIDE</h4>
                <p v-for="(step, sIdx) in subSupSteps" :key="sIdx">
                  <button @click="toggleSubSupStep(sIdx)" class="step-button">
                    Step {{ sIdx + 1 }}
                  </button>
                  <span v-if="subSupRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
                </p>
              </div>
              <!-- LET'S TRY Card (Subset Superset) - UPDATED FORMAT -->
              <div class="problem-box">
                <h4>Mastery quiz 1</h4>
                <p><strong>Provide a subset of {1, 2, 3, 4}.</strong></p>
                <!-- UPDATED: Format similar to the image - LEFT ALIGNED -->
                <div style="margin: 10px 0;">
                  <button 
                    @click="showSubSupGuide = !showSubSupGuide" 
                    class="solve-button" 
                    style="font-size: 14px; padding: 8px 16px; margin-bottom: 10px;">
                    {{ showSubSupGuide ? "🔽 CLICK TO HIDE" : "📘 CLICK TO SHOW" }}
                  </button>
                </div>
                <div style="margin: 15px 0;">
                  <input
                    v-model="subSupAnswer"
                    placeholder="Type your answer here"
                    class="answer-input"
                    style="width: 100%; max-width: 400px; font-size: 16px;"
                  />
                </div>
                <div style="margin-top: 15px;">
                  <button @click="checkSubSupAnswer" class="submit-button" :disabled="!subSupAnswer.trim()" style="padding: 10px 30px; font-size: 16px;">LET'S CHECK</button>
                </div>
                <div v-if="subSupFeedback" class="result-box" style="margin-top: 15px;">
                  <p>{{ subSupFeedback }}</p>
                </div>
                <div v-if="subSupInputGoodJob" class="good-job-message">Good job, you got {{ subSupSectionScore }} points</div>
              </div>
              <!-- TRY THIS Card (Superset Quiz) -->
              <div class="problem-box">
                <h4> Mastery Quiz 2</h4>
                <p><strong>Which of the following is a superset of {1,2}?</strong></p>
                <div v-for="(option, idx) in subSupQuiz.options" :key="idx" class="option-box">
                  <label class="option-label">
                    <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
                    <input type="radio" name="subSupQuiz" :value="option" v-model="subSupQuizAnswer" />
                    <span class="option-text">{{ option }}</span>
                  </label>
                </div>
                <!-- CHANGED: Larger buttons for Subset Mastery Quiz 2 -->
                <div style="display: flex; justify-content: flex-start; gap: 10px; align-items: center; margin-top: 10px;">
                  <button @click="checkSubSupQuiz" class="submit-button larger-button" :disabled="!subSupQuizAnswer">LET'S CHECK</button>
                  <button @click="universalPageActive = true" class="next-button larger-button">➡️ Next</button>
                </div>
                <div v-if="subSupQuizFeedback" class="result-box">
                  <p>{{ subSupQuizFeedback }}</p>
                </div>
                <div v-if="subSupQuizGoodJob" class="good-job-message">Good job, you got {{ subSupSectionScore }} points</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Cardinality - Additional Practice -->
        <div v-else-if="subsetPageActive" class="content-box">
          <h4>📘 Cardinality </h4>
          <div style="background-color:  #eeede9;border: 1px solid #efd56d; padding: 10px; border-radius: 5px;">
            <p>
              <strong>The Cardinality of a set is a measure of a set's size, meaning the number of elements in the set.</strong><br><br>
              <strong>Example:</strong> S = { x | x is an even number between 20 and 35 }<br>
              ➡️ S = { 20, 22, 24, 26, 28, 30, 32, 34 }<br>
              <strong>➡️ Cardinality: |S| = 8<br><br></strong>
            </p>
          </div>
          <!-- Second Cardinality - LET'S TRY-->
          <div class="content-box">
            <h4>Mastery Quiz 1</h4>
            <p>
              <strong>QUESTION 1: What is the cardinality of the set T = { x | x is an odd number between 10 and 20 }?</strong>
            </p>
            <!-- Toggle button for Step-by-step guide -->
            <button @click="showSecondCardGuide = !showSecondCardGuide" class="solve-button">
              {{ showSecondCardGuide ? "🔽 CLICK TO HIDE " : "📘 CLICK TO SHOW" }}
            </button>
            <!-- Step-by-step card -->
            <div v-if="showSecondCardGuide" class="guide-box">
              <h4>📘 YOUR GUIDE</h4>
              <p v-for="(step, sIdx) in secondCardSteps" :key="sIdx">
                <button @click="toggleSecondCardStep(sIdx)" class="step-button">
                  Step {{ sIdx + 1 }}
                </button>
                <span v-if="secondCardRevealedSteps.includes(sIdx)">➡️ {{ step }}</span>
              </p>
            </div>
            <input
              v-model="secondCardAnswer"
              placeholder="Enter the cardinality of set T"
              class="answer-input"
            />
            <button @click="checkSecondCardAnswer" class="submit-button" :disabled="!secondCardAnswer.trim()"> LET'S CHECK</button>
            <div v-if="secondCardFeedback" class="result-box">
              <p>{{ secondCardFeedback }}</p>
            </div>
            <div v-if="secondCardGoodJob" class="good-job-message">Good job, you have {{ totalScore }} points</div>
            <!-- Third Cardinality - TRY THIS-->
            <div class="content-box">
              <h4>Mastery Quiz 2 </h4>
              <p>
                <strong>QUESTION 2: Given the set M = {5, 10, 15, 20, 25}, what is the cardinality of M?</strong>
              </p>
              <input
                v-model="thirdCardAnswer"
                placeholder="Enter the cardinality of set M"
                class="answer-input"
              />
              <button @click="checkThirdCardAnswer" class="submit-button" :disabled="!thirdCardAnswer.trim()"> LET'S CHECK </button>
              <div v-if="thirdCardFeedback" class="result-box">
              <p>{{ thirdCardFeedback }}</p>
              </div>
              <div v-if="thirdCardGoodJob" class="good-job-message">Good job, you have {{ totalScore }} points</div>
            </div>
            <!-- Back button -->
            <button @click="subsetPageActive = false" class="next-button">⬅️ Back</button>
            <!-- Next button -->
            <button @click="goToUnionPage" class="next-button">➡️ Next</button>
          </div>
        </div>
        <!-- Representation of Sets - Additional Practice -->
        <div v-else-if="unionPageActive" class="content-box">
          <h4>📘 Representation of Sets</h4>
          <p style="font-size: 24px; background-color: #4281bc;border: 1px solid #efd56d; padding: 10px; border-radius: 5px; font-weight: bold;">Your Score Total: {{ totalScore }}/7</p>
          <div style="background-color: #eeede9;border: 1px solid #efd56d; padding: 10px; border-radius: 5px;">
            <p>
              <strong>Sets can be represented in different forms, such as roster form (listing all elements) or set-builder notation (describing elements with a rule).</strong><br><br>
              <strong>Roster Form:</strong> A way to list all the elements of a set inside curly braces { }.<br>
              <strong>Set-Builder Form:</strong> A way to describe the elements of a set using a rule or condition.<br><br>
              <strong>Example:</strong> The set of even numbers between 1 and 5 can be written as:<br>
              ➡️ Roster form: {2, 4}<br>
              ➡️ Set-builder notation: {x | x is an even number, 1 ≤ x ≤ 5}<br><br>
            </p>
          </div>
          <!-- Representation - LET'S TRY -->
          <div class="content-box">
            <h4>Mastery Quiz 1</h4>
            <p>
              <strong>QUESTION 1: Represent the set of odd numbers between 1 and 7 in roster form.</strong>
            </p>
            <div v-for="(option, optIndex) in representationQuiz.options" :key="optIndex" class="option-box">
              <label class="option-label">
                <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
                <input type="radio" name="representationQuiz" :value="option" v-model="unionAnswer" />
                <span class="option-text">{{ option }}</span>
              </label>
            </div>
            <button @click="checkUnionAnswer" class="submit-button" :disabled="!unionAnswer"> LET'S CHECK </button>
            <div v-if="unionFeedback" class="result-box">
              <p>{{ unionFeedback }}</p>
            </div>
            <div v-if="unionGoodJob" class="good-job-message">Good job, you have {{ totalScore }} points</div>
            <!-- Representation - TRY THIS (Question 2) -->
            <div class="content-box">
              <h4>Mastery Quiz 2</h4>
              <p>
                <strong>QUESTION 2: Represent the set of vowels in the English alphabet in set-builder notation.</strong>
              </p>
              <div v-for="(option, optIndex) in secondRepresentationQuiz.options" :key="optIndex" class="option-box">
                <label class="option-label">
                  <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
                  <input type="radio" name="secondRepresentationQuiz" :value="option" v-model="secondUnionAnswer" />
                  <span class="option-text">{{ option }}</span>
                </label>
              </div>
              <button @click="checkSecondUnionAnswer" class="submit-button" :disabled="!secondUnionAnswer"> LET'S CHECK</button>
              <div v-if="secondUnionFeedback" class="result-box">
                <p>{{ secondUnionFeedback }}</p>
              </div>
              <div v-if="secondUnionGoodJob" class="good-job-message">Good job, you have {{ totalScore }} points</div>
            </div>
            <!-- Representation - TRY THIS (Question 3) -->
            <div class="content-box">
              <h4>Mastery Quiz 3</h4>
              <p>
                <strong>QUESTION 3: Represent the set of prime numbers less than 10 in roster form.</strong>
              </p>
              <div v-for="(option, optIndex) in thirdRepresentationQuiz.options" :key="optIndex" class="option-box">
                <label class="option-label">
                  <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
                  <input type="radio" name="thirdRepresentationQuiz" :value="option" v-model="thirdUnionAnswer" />
                  <span class="option-text">{{ option }}</span>
                </label>
              </div>
              <button @click="checkThirdUnionAnswer" class="submit-button" :disabled="!thirdUnionAnswer"> LET'S CHECK </button>
              <div v-if="thirdUnionFeedback" class="result-box">
                <p>{{ thirdUnionFeedback }}</p>
              </div>
              <div v-if="thirdUnionGoodJob" class="good-job-message">Good job, you have {{ totalScore }} points</div>
            </div>
            <!-- Back button -->
            <button @click="unionPageActive = false; selectedTopic = null" class="next-button">⬅️ Back to Lesson</button>
          </div>
        </div>
        <!-- Empty or Null Set - Additional Practice -->
        <div v-else-if="singletonPageActive" class="content-box">
          <h4>📘 Empty or Null Set</h4>
          <div style="background-color: #eeede9;border: 1px solid #efd56d; padding: 10px; border-radius: 5px;">
            <p>
              <strong>An empty set, also called a null set, is a set that contains no elements. It is denoted by {} or ∅.</strong><br><br>
              <strong>Example:</strong> The set of odd numbers divisible by 2 is an empty set because no odd number is divisible by 2.<br>
              ➡️ Set: {} or ∅<br>
              <strong>➡️ Cardinality: |∅| = 0<br><br></strong>
            </p>
          </div>
          <!-- Empty Set - GUESS WHICH -->
          <div class="content-box">
            <h4>Mastery Quiz 1</h4>
            <p>
              <strong>Which of the following is an empty set?</strong>
            </p>
            <div v-for="(option, optIndex) in emptySetQuiz.options" :key="optIndex" class="option-box">
              <label class="option-label">
                <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
                <input type="radio" name="emptySetQuiz" :value="option" v-model="emptySetAnswer" />
                <span class="option-text">{{ option }}</span>
              </label>
            </div>
            <button @click="checkEmptySetAnswer" class="submit-button" :disabled="!emptySetAnswer"> LET'S CHECK</button>
            <div v-if="emptySetFeedback" class="result-box">
              <p>{{ emptySetFeedback }}</p>
            </div>
            <div v-if="emptySetGoodJob" class="good-job-message">Good job, you have {{ singletonSectionScore }} points</div>
          </div>
          <!-- Back button -->
          <button @click="singletonPageActive = false" class="next-button">⬅️ Back</button>
          <!-- Next button -->
          <button @click="goToSingletonRepresentationPage" class="next-button">➡️ Next</button>
        </div>
        <!-- Finite Set - Additional Practice -->
        <div v-else-if="singletonRepresentationPageActive" class="content-box">
          <h4>📘 FINITE SETS</h4>
          <p style="font-size: 24px; background-color: #4281bc;border: 1px solid #efd56d; padding: 10px; border-radius: 5px; font-weight: bold;">Your Score Total: {{ singletonSectionScore }}/5</p>
          <div style="background-color: #eeede9;border: 1px solid #efd56d; padding: 10px; border-radius: 5px;">
            <p>
              <strong>FINITE SET is a set which contains a definite number of elements.</strong><br><br>
              <strong>Example: Let D = "set of days of the week.":</strong><br>
              <strong>➡️ D = {Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday}</strong><br><br>
            </p>
          </div>
          <!-- Finite Set - LET'S TRY -->
          <div class="content-box">
            <h4>Mastery Quiz 1</h4>
            <p>
              <strong>QUESTION 1: Write the set of the 4 seasons in a year.</strong>
            </p>
            <input
              v-model="singletonRepresentationAnswer"
              placeholder="Type your answer here"
              class="answer-input"
            />
            <button @click="checkSingletonRepresentationAnswer" class="submit-button" :disabled="!singletonRepresentationAnswer.trim()">LET'S CHECK </button>
            <div v-if="singletonRepresentationFeedback" class="result-box">
              <p>{{ singletonRepresentationFeedback }}</p>
            </div>
            <div v-if="finiteInputGoodJob" class="good-job-message">Good job, you have {{ singletonSectionScore }} points</div>
            <!-- Finite Set - TRY THIS -->
            <div class="content-box">
              <h4>Mastery Quiz 2</h4>
              <p>
                <strong>QUESTION 2: Which of the following is a finite set?</strong>
              </p>
              <div v-for="(option, optIndex) in singletonSecondRepresentationQuiz.options" :key="optIndex" class="option-box">
                <label class="option-label">
                  <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
                  <input type="radio" name="singletonSecondRepresentationQuiz" :value="option" v-model="singletonSecondRepresentationAnswer" />
                  <span class="option-text">{{ option }}</span>
                </label>
              </div>
              <button @click="checkSingletonSecondRepresentationAnswer" class="submit-button" :disabled="!singletonSecondRepresentationAnswer"> LET'S CHECK </button>
              <div v-if="singletonSecondRepresentationFeedback" class="result-box">
                <p>{{ singletonSecondRepresentationFeedback }}</p>
              </div>
              <div v-if="finiteQuizGoodJob" class="good-job-message">Good job, you have {{ singletonSectionScore }} points</div>
            </div>
            <!-- Back button -->
            <button @click="singletonPageActive = true; singletonRepresentationPageActive = false" class="next-button">⬅️ Back</button>
            <!-- Next button -->
            <button @click="singletonRepresentationPageActive = false; selectedTopic = null" class="next-button">⬅️ Back to Lesson</button>
          </div>
        </div>
        <!-- Equal Sets - Additional Practice -->
        <div v-else-if="infinitePageActive" class="content-box">
          <h4>📘 Equal Sets</h4>
          <div style="background-color: #eeede9;border: 1px solid #efd56d;padding: 10px; border-radius: 5px;">
            <p>
              <strong>Two sets are equal if they contain exactly the same elements, regardless of the order.</strong><br><br>
              <strong>Example:</strong> A = {1, 2, 3} and B = {3, 1, 2} are equal sets since they have the same elements.<br><br>
            </p>
          </div>
          <!-- Equal Sets - LET'S TRY -->
          <div class="content-box">
            <h4>Mastery Quiz 1</h4>
            <p>
              <strong>Are the sets {1, 2, 3} and {3, 2, 1} equal or unequal?</strong>
            </p>
            <input
              v-model="equalInputAnswer"
              placeholder="Type 'equal' or 'unequal'"
              class="answer-input"
            />
            <button @click="checkEqualInputAnswer" class="submit-button" :disabled="!equalInputAnswer.trim()"> LET'S CHECK </button>
            <div v-if="equalInputFeedback" class="result-box">
              <p>{{ equalInputFeedback }}</p>
            </div>
            <div v-if="equalInputGoodJob" class="good-job-message">Good job, you got {{ infiniteSectionScore }} points</div>
          </div>
          <!-- Equal Sets - TRY THIS -->
          <div class="content-box">
            <h4>Mastery Quiz 2</h4>
            <p>
              <strong>Which of the following pairs of sets are equal?</strong>
            </p>
            <div v-for="(option, optIndex) in equalQuiz.options" :key="optIndex" class="option-box">
              <label class="option-label">
                <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
                <input type="radio" name="equalQuiz" :value="option" v-model="equalAnswer" />
                <span class="option-text">{{ option }}</span>
              </label>
            </div>
            <button @click="checkEqualAnswer" class="submit-button" :disabled="!equalAnswer"> LET'S CHECK</button>
            <div v-if="equalFeedback" class="result-box">
              <p>{{ equalFeedback }}</p>
            </div>
            <div v-if="equalQuizGoodJob" class="good-job-message">Good job, you got {{ infiniteSectionScore }} points</div>
          </div>
          <!-- Back button -->
          <button @click="infinitePageActive = false" class="next-button">⬅️ Back</button>
          <!-- Next button -->
          <button @click="goToInfiniteRepresentationPage" class="next-button">➡️ Next</button>
        </div>
        <!-- Unequal Sets - Additional Practice -->
        <div v-else-if="infiniteRepresentationPageActive" class="content-box">
          <h4>📘 Unequal Sets</h4>
          <p style="font-size: 24px; background-color: #4281bc;border: 1px solid #efd56d; padding: 10px; border-radius: 5px; font-weight: bold;">Your Score Total: {{ infiniteSectionScore }}/6</p>
          <div style="background-color: #eeede9;border: 1px solid #efd56d; padding: 10px; border-radius: 5px;">
            <p>
              <strong>Two sets are unequal if they do not contain exactly the same elements.</strong><br><br>
              <strong>Example:</strong> A = {1, 2} and B = {1, 2, 3} are unequal sets since B has an extra element.<br><br>
            </p>
          </div>
          <!-- Unequal Sets - LET'S TRY -->
          <div class="content-box">
            <h4>Mastery Quiz 1</h4>
            <p>
              <strong>Are the sets {a, b} and {b, a, c} equal or unequal?</strong>
            </p>
            <input
              v-model="unequalAnswer"
              placeholder="Type 'equal' or 'unequal'"
              class="answer-input"
            />
            <button @click="checkUnequalAnswer" class="submit-button" :disabled="!unequalAnswer.trim()"> LET'S CHECK </button>
            <div v-if="unequalFeedback" class="result-box">
              <p>{{ unequalFeedback }}</p>
            </div>
            <div v-if="unequalInputGoodJob" class="good-job-message">Good job, you got {{ infiniteSectionScore }} points</div>
            <!-- Unequal Sets - TRY THIS -->
            <div class="content-box">
              <h4>Mastery Quiz 2</h4>
              <p>
                <strong>Which of the following pairs represents unequal sets?</strong>
              </p>
              <div v-for="(option, optIndex) in unequalQuiz.options" :key="optIndex" class="option-box">
                <label class="option-label">
                  <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
                  <input type="radio" name="unequalQuiz" :value="option" v-model="unequalQuizAnswer" />
                  <span class="option-text">{{ option }}</span>
                </label>
              </div>
              <button @click="checkUnequalQuiz" class="submit-button" :disabled="!unequalQuizAnswer"> LET'S CHECK </button>
              <div v-if="unequalQuizFeedback" class="result-box">
                <p>{{ unequalQuizFeedback }}</p>
              </div>
              <div v-if="unequalQuizGoodJob" class="good-job-message">Good job, you got {{ infiniteSectionScore }} points</div>
            </div>
            <!-- Back button -->
            <button @click="infiniteRepresentationPageActive = false" class="next-button">⬅️ Back</button>
            <!-- Next button -->
            <button @click="infiniteRepresentationPageActive = false; selectedTopic = null" class="next-button">⬅️ Back to Lesson</button>
          </div>
        </div>
        <!-- Universal Set - Additional Practice -->
        <div v-else-if="universalPageActive" class="content-box">
          <h4>📘 Universal Set</h4>
          <div style="background-color: #eeede9;border: 1px solid #efd56d;  padding: 10px; border-radius: 5px;">
            <p>
              <strong>The Universal Set is the largest set containing all elements relevant to a problem.</strong><br><br>
              <strong>Example:</strong> For numbers 1 to 5, U = {1, 2, 3, 4, 5}<br><br>
            </p>
          </div>
          <!-- Universal - LET'S TRY-->
          <div class="content-box">
            <h4>Mastery Quiz 1</h4>
            <p>
              <strong>QUESTION 1: What is the universal set for the days of the week?</strong>
            </p>
            <input
              v-model="universalAnswer"
              placeholder="Type your answer here"
              class="answer-input"
            />
            <button @click="checkUniversalAnswer" class="submit-button" :disabled="!universalAnswer.trim()"> LET'S CHECK </button>
            <div v-if="universalFeedback" class="result-box">
              <p>{{ universalFeedback }}</p>
            </div>
            <div v-if="universalInputGoodJob" class="good-job-message">Good job, you got {{ subSupSectionScore }} points</div>
            <!-- Universal - TRY THIS-->
            <div class="content-box">
              <h4>Mastery Quiz 2 </h4>
              <p>
                <strong>QUESTION 2: In the context of whole numbers from 0 to 9, what is the universal set?</strong>
              </p>
              <div v-for="(option, optIndex) in universalQuiz.options" :key="optIndex" class="option-box">
                <label class="option-label">
                  <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
                  <input type="radio" name="universalQuiz" :value="option" v-model="universalQuizAnswer" />
                  <span class="option-text">{{ option }}</span>
                </label>
              </div>
              <button @click="checkUniversalQuiz" class="submit-button" :disabled="!universalQuizAnswer"> LET'S CHECK </button>
              <div v-if="universalQuizFeedback" class="result-box">
              <p>{{ universalQuizFeedback }}</p>
              </div>
              <div v-if="universalQuizGoodJob" class="good-job-message">Good job, you got {{ subSupSectionScore }} points</div>
            </div>
            <!-- Back button -->
            <button @click="universalPageActive = false" class="next-button">⬅️ Back</button>
            <!-- Next button -->
            <button @click="goToPowerSetPage" class="next-button">➡️ Next</button>
          </div>
        </div>
        <!-- Power Set - Additional Practice -->
        <div v-else-if="powerSetPageActive" class="content-box">
          <h4>📘 Power Set</h4>
          <p style="font-size: 24px; background-color: #4281bc;border: 1px solid #efd56d;padding: 10px; border-radius: 5px; font-weight: bold;">Your Score Total: {{ subSupSectionScore }}/6</p>
          <div style="background-color: #eeede9;border: 1px solid #efd56d;  padding: 10px; border-radius: 5px;">
            <p>
              <strong>The Power Set of S is the collection of all subsets of S. |P(S)| = 2^|S|.</strong><br><br>
              <strong>Example:</strong> For S = {a, b}, P(S) = { ∅, {a}, {b}, {a,b} }<br><br>
            </p>
          </div>
          <!-- Power Set - LET'S TRY -->
          <div class="content-box">
            <h4>Mastery Quiz 1</h4>
            <p>
              <strong>QUESTION 1: What is the power set of ∅ (empty set)?</strong>
            </p>
            <input
              v-model="powerSetAnswer"
              placeholder="Type your answer here"
              class="answer-input"
            />
            <button @click="checkPowerSetAnswer" class="submit-button" :disabled="!powerSetAnswer.trim()"> LET'S CHECK </button>
            <div v-if="powerSetFeedback" class="result-box">
              <p>{{ powerSetFeedback }}</p>
            </div>
            <div v-if="powerSetInputGoodJob" class="good-job-message">Good job, you got {{ subSupSectionScore }} points</div>
          </div>
          <!-- Power Set - TRY THIS -->
          <div class="content-box">
            <h4>Mastery Quiz 2</h4>
            <p>
              <strong>QUESTION 2: What is the cardinality of the power set of a set with 4 elements?</strong>
            </p>
            <div v-for="(option, optIndex) in powerSetQuiz.options" :key="optIndex" class="option-box">
              <label class="option-label">
                <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}.</span>
                <input type="radio" name="powerSetQuiz" :value="option" v-model="powerSetQuizAnswer" />
                <span class="option-text">{{ option }}</span>
              </label>
            </div>
            <button @click="checkPowerSetQuiz" class="submit-button" :disabled="!powerSetQuizAnswer"> LET'S CHECK </button>
            <div v-if="powerSetQuizFeedback" class="result-box">
              <p>{{ powerSetQuizFeedback }}</p>
            </div>
            <div v-if="powerSetQuizGoodJob" class="good-job-message">Good job, you got {{ subSupSectionScore }} points</div>
          </div>
          <!-- Back button -->
          <button @click="powerSetPageActive = false" class="next-button">⬅️ Back</button>
          <!-- Next button -->
          <button @click="powerSetPageActive = false; selectedTopic = null" class="next-button">⬅️ Back to Lesson</button>
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
        { question: "What is a set?", options: ["A collection of numbers only", "A collection of objects, named using capital letters", "A single object", "A mathematical operation"], answer: "A collection of objects, named using capital letters" },
        { question: "What is a singleton set?", options: ["A set with one element", "A set with two elements", "An empty set", "An infinite set"], answer: "A set with one element" },
        { question: "Which symbol is used to represent a set?", options: ["( )", "[ ]", "{ }", "< >"], answer: "{ }" },
        { question: "Which of the following is an empty set?", options: ["{}", "{1}", "{a,b}", "{1,2,3}"], answer: "{}" },
        { question: "What is the cardinality of the set {p, q, r}?", options: ["1", "2", "3", "4"], answer: "3" }
      ],
      selectedTopic: null,
      showSolution: Array(5).fill({ main: false, alt: false }),
      revealedSteps: Array(5).fill({ main: [], alt: [] }),
      viewedTopics: new Set(),
      subsetAnswer: "",
      subsetFeedback: "",
      subsetSteps: [
        "Example: A set of Even numbers E = {0, 2, 4, 6, 8, 10}",
        "Check if every element of A is in B: 1 ∈ B and 2 ∈ B.",
        "Therefore, A is a subset of B (A ⊆ B).",
        "A valid subset you can type is {1,2}."
      ],
      subsetRevealedSteps: [],
      showSubsetGuide: false,
      subsetQuiz: { options: ["{1, 3, 5, 7, 9}", "{0, 2, 4, 6, 8, 10}", "{2, 3, 5, 7}", "{4, 6, 8, 10, 12}"], answer: "{0, 2, 4, 6, 8, 10}" },
      subsetQuizAnswer: "",
      subsetQuizFeedback: "",
      subsetPageActive: false,
      subsetScore: 0,
      subsetQuizScore: 0,
      secondCardScore: 0,
      thirdCardScore: 0,
      unionScore: 0,
      secondUnionScore: 0,
      thirdUnionScore: 0,
      subsetGoodJob: false,
      subsetQuizGoodJob: false,
      secondCardGoodJob: false,
      thirdCardGoodJob: false,
      unionGoodJob: false,
      secondUnionGoodJob: false,
      thirdUnionGoodJob: false,
      // Singleton Set Data
      singletonAnswer: "",
      singletonFeedback: "",
      singletonSteps: [
        "A singleton set contains exactly one element.",
        "From B = {1, 2, 3, 4}, select one element, e.g., 3.",
        "Write it in set notation: {3}.",
        "This is a valid singleton set."
      ],
      singletonRevealedSteps: [],
      showSingletonGuide: false,
      singletonQuiz: {
        options: ["{1, 2}", "{3}", "{a, b, c}", "{}"],
        answer: "{3}"
      },
      singletonQuizAnswer: "",
      singletonQuizFeedback: "",
      singletonPageActive: false,
      singletonInputScore: 0,
      singletonQuizScore: 0,
      singletonInputGoodJob: false,
      singletonQuizGoodJob: false,
      // Empty Set Data
      emptySetAnswer: "",
      emptySetFeedback: "",
      emptySetScore: 0,
      emptySetGoodJob: false,
      emptySetQuiz: {
        options: ["{1, 2}", "{a}", "{}", "{3, 4, 5}"],
        answer: "{}"
      },
      singletonRepresentationPageActive: false,
      singletonRepresentationAnswer: "",
      singletonRepresentationFeedback: "",
      singletonRepresentationAttempts: 0,
      singletonRepresentationQuiz: {
        answer: "{Spring, Summer, Autumn, Winter}"
      },
      singletonSecondRepresentationAnswer: "",
      singletonSecondRepresentationFeedback: "",
      finiteInputScore: 0,
      finiteQuizScore: 0,
      finiteInputGoodJob: false,
      finiteQuizGoodJob: false,
      singletonSecondRepresentationQuiz: {
        options: [
          "{1, 2, 3}",
          "{x | x is a positive integer}",
          "{Monday, Tuesday, Wednesday}",
          "{x | x is a real number}"
        ],
        answer: "{Monday, Tuesday, Wednesday}"
      },
      unionPageActive: false,
      unionAnswer: "",
      unionFeedback: "",
      unionSteps: [
        "Identify the odd numbers between 1 and 7: 1, 3, 5, 7.",
        "Write them in roster form by listing all elements inside curly braces.",
        "Ensure the elements are separated by commas.",
        "Result: {1, 3, 5, 7}."
      ],
      unionRevealedSteps: [],
      showUnionGuide: false,
      representationQuiz: {
        options: ["{1, 3, 5, 7}", "{2, 4, 6}", "{1, 2, 3}", "{3, 5}"],
        answer: "{3, 5}"
      },
      secondUnionAnswer: "",
      secondUnionFeedback: "",
      secondRepresentationQuiz: {
        options: [
          "{x | x is a vowel in the English alphabet}",
          "{x | x is a consonant in the English alphabet}",
          "{x | x is a letter in the English alphabet}",
          "{x | x is a vowel, x ∈ {a, b, c}}"
        ],
        answer: "{x | x is a vowel in the English alphabet}"
      },
      thirdUnionAnswer: "",
      thirdUnionFeedback: "",
      thirdRepresentationQuiz: {
        options: [
          "{2, 3, 5, 7}",
          "{1, 3, 5}",
          "{2, 4, 6, 8}",
          "{1, 2, 3, 4}"
        ],
        answer: "{2, 3, 5, 7}"
      },
      secondCardAnswer: "",
      secondCardFeedback: "",
      secondCardSteps: [
        "List the odd numbers between 10 and 20: 11, 13, 15, 17, 19.",
        "Pick only the odd numbers So we get: 11, 13, 15, 17, 19",
        "Form the set 👉 T={11,13,15,17,19}.",
        "Count the number of elements"
      ],
      secondCardRevealedSteps: [],
      showSecondCardGuide: false,
      thirdCardAnswer: "",
      thirdCardFeedback: "",
      thirdCardRevealedSteps: [],
      showThirdCardGuide: false,
      // Infinite Set Data
      infiniteAnswer: "",
      infiniteFeedback: "",
      infiniteSteps: [
        "An infinite set has an unlimited number of elements.",
        "Common example: the set of all natural numbers.",
        "Write it in set-builder notation: {x | x is a natural number}.",
        "Or in roster form: {1, 2, 3, ...}."
      ],
      infiniteRevealedSteps: [],
      showInfiniteGuide: false,
      infiniteQuiz: {
        options: [
          "{1, 2, 3}",
          "{x | x is a natural number}",
          "{a, b}",
          "{Monday, Tuesday}"
        ],
        answer: "{x | x is a natural number}"
      },
      infiniteQuizAnswer: "",
      infiniteQuizFeedback: "",
      infinitePageActive: false,
      infiniteInputScore: 0,
      infiniteQuizScore: 0,
      infiniteGoodJob: false,
      infiniteQuizGoodJob: false,
      // Equal Set Data
      equalAnswer: "",
      equalFeedback: "",
      equalInputAnswer: "",
      equalInputFeedback: "",
      equalInputScore: 0,
      equalQuizScore: 0,
      equalInputGoodJob: false,
      equalQuizGoodJob: false,
      equalQuiz: {
        options: [
          "A = {1, 2}, B = {1, 2}",
          "A = {1}, B = {1, 2}",
          "A = {a, b}, B = {c, d}",
          "A = {3, 4}, B = {4, 3, 5}"
        ],
        answer: "A = {1, 2}, B = {1, 2}"
      },
      // Unequal Set Data
      unequalAnswer: "",
      unequalFeedback: "",
      unequalQuiz: {
        options: [
          "A = {1, 2, 3}, B = {3, 2, 1}",
          "A = {x | x even, 1-4}, B = {2, 4}",
          "C = {p, q}, D = {q, p, r}",
          "E = {5}, F = ∅"
        ],
        answer: "C = {p, q}, D = {q, p, r}"
      },
      unequalQuizAnswer: "",
      unequalQuizFeedback: "",
      unequalInputScore: 0,
      unequalQuizScore: 0,
      unequalInputGoodJob: false,
      unequalQuizGoodJob: false,
      infiniteRepresentationPageActive: false,
      // Subset Superset Data
      subSupAnswer: "",
      subSupFeedback: "",
      subSupSteps: [
        "A subset contains elements all present in the original set.",
        "For {1,2,3,4}, possible subsets include {1}, {1,2}, etc.",
        "Example: {1,3} is a subset.",
        "Write it in set notation."
      ],
      subSupRevealedSteps: [],
      showSubSupGuide: false,
      subSupQuiz: {
        options: [
          "{1}",
          "{1,2,3}",
          "{3,4}",
          "{1,3}"
        ],
        answer: "{1,2,3}"
      },
      subSupQuizAnswer: "",
      subSupQuizFeedback: "",
      subSupInputScore: 0,
      subSupQuizScore: 0,
      subSupInputGoodJob: false,
      subSupQuizGoodJob: false,
      // Universal Set Data
      universalPageActive: false,
      universalAnswer: "",
      universalFeedback: "",
      universalInputScore: 0,
      universalQuizScore: 0,
      universalInputGoodJob: false,
      universalQuizGoodJob: false,
      universalQuiz: {
        options: [
          "{0,1,2,3,4,5,6,7,8,9}",
          "{even numbers 0-8}",
          "{1,2,3,4,5,6,7,8,9}",
          "{0-10}"
        ],
        answer: "{0,1,2,3,4,5,6,7,8,9}"
      },
      universalQuizAnswer: "",
      universalQuizFeedback: "",
      // Power Set Data
      powerSetPageActive: false,
      powerSetAnswer: "",
      powerSetFeedback: "",
      powerSetInputScore: 0,
      powerSetQuizScore: 0,
      powerSetInputGoodJob: false,
      powerSetQuizGoodJob: false,
      powerSetQuiz: {
        options: ["4", "8", "16", "32"],
        answer: "16"
      },
      powerSetQuizAnswer: "",
      powerSetQuizFeedback: "",
      // NEW: Set Symbols Quiz Data - UPDATED QUESTIONS
      showSetSymbols: false,
      showSetSymbolsError: false,
      setSymbolsAnswers: [],
      setSymbolsQuiz: [
        {
          question: "which of these is the symbol of set?",
          options: ["U", "A ∪ B", "{ }"],
          answer: "{ }",
          answered: false,
          correct: false
        },
        {
          question: "Which symbol represents the universal set?",
          options: ["∅", "U", "∈"],
          answer: "U",
          answered: false,
          correct: false
        },
        {
          question: "What is the symbol of Null or empty set?",
          options: ["U", "∅", "∈"],
          answer: "∅",
          answered: false,
          correct: false
        },
        {
          question: "What is the symbol of Set A intersection set B?",
          options: ["A ∪ B", "A ∩ B", "A ⊆ B"],
          answer: "A ∩ B",
          answered: false,
          correct: false
        },
        {
          question: "What is the symbol of Set A is a subset of set B?",
          options: ["A ∪ B", "A ∩ B", "A ⊆ B"],
          answer: "A ⊆ B",
          answered: false,
          correct: false
        }
      ],
      // NEW: Set Symbols Score
      setSymbolsScore: 0,
      topics: [
        {
          title: "Set Theory",
          type: "intro",
          content: "<div style=\"background-color: #eeede9; padding: 10px; border-radius: 5px;border: 1px solid #efd56d;\"><strong>Set theory</strong> is the branch of mathematical logic that studies sets, which are collections of objects. It is a foundational system for modern mathematics, and it forms the basis of other fields such as algebra, topology, and analysis. Sets can be finite or infinite and are denoted by capital letters like A, B, or U.</div>"
        },
        {
          title: "Sets, Cardinality, and Representation",
          type: "sets",
          content: "<div style=\"background-color: #eeede9; padding: 10px; border-radius: 5px;border: 1px solid #efd56d;\">A <strong>set</strong> is a well-defined collection of objects, named using capital letters. The items in a set are called elements or members.<br><br><strong> ➡️ Example:</strong> A set of even numbers E = {0, 2, 4, 6, 8, 10}.</div>"
        },
        {
          title: "Singleton Set, Empty Set, and Finite Set",
          type: "singleton",
          content: "<div style=\"background-color: #eeede9; padding: 10px; border-radius: 5px;border: 1px solid #efd56d;\">A <strong>Singleton Set</strong> is a set with exactly one element, e.g., {3}.<br><br> ➡️ Example: The set of odd numbers divisible by 2 is {} .</div>"
        },
        {
          title: "Infinite Set, Equal Set, and Unequal Set",
          type: "infinite",
          content: "<div style=\"background-color: #eeede9; padding: 10px; border-radius: 5px;border: 1px solid #efd56d;\">An <strong>Infinite Set</strong> is a set that contains an unlimited number of elements,<br><br> ➡️ Example: the set of all natural numbers N = {1, 2, 3, ...}.</div>"
        },
        {
          title: "Subset & Superset, Universal Set, & Power Set",
          type: "subsuper",
          content: "<div style=\"background-color: #eeede9; padding: 10px; border-radius: 5px;border: 1px solid #efd56d;\">A <strong>Subset (⊆)</strong> is a set A where every element of A is also in B. A <strong>Superset (⊇)</strong> is the reverse.<br><br> ➡️ Example: {1,2} ⊆ {1,2,3}, {1,2,3} ⊇ {1,2}.</div>"
        }
      ],
      // Added missing initializations for scores
      subSupInputScore: 0,
      subSupQuizScore: 0,
      universalInputScore: 0,
      universalQuizScore: 0,
      powerSetInputScore: 0,
      powerSetQuizScore: 0
    };
  },
  computed: {
    preTestAllAnswered() {
      return this.userAnswers.length === this.preTestQuestions.length &&
             this.userAnswers.every(answer => answer !== undefined && answer !== '');
    },
    totalScore() {
      return this.subsetScore + this.subsetQuizScore + this.secondCardScore + this.thirdCardScore + this.unionScore + this.secondUnionScore + this.thirdUnionScore + this.singletonInputScore + this.singletonQuizScore + this.emptySetScore + this.finiteInputScore + this.finiteQuizScore + this.infiniteSectionScore + this.subSupSectionScore + this.setSymbolsScore;
    },
    singletonSectionScore() {
      return this.singletonInputScore + this.singletonQuizScore + this.emptySetScore + this.finiteInputScore + this.finiteQuizScore;
    },
    infiniteSectionScore() {
      return this.infiniteInputScore + this.infiniteQuizScore + this.equalInputScore + this.equalQuizScore + this.unequalInputScore + this.unequalQuizScore;
    },
    subSupSectionScore() {
      return this.subSupInputScore + this.subSupQuizScore + this.universalInputScore + this.universalQuizScore + this.powerSetInputScore + this.powerSetQuizScore;
    },
    unequalScore() {
      return this.unequalInputScore + this.unequalQuizScore;
    },
    // NEW: Computed property for completed quiz count
    completedSetSymbolsQuizCount() {
      return this.setSymbolsQuiz.filter(q => q.answered).length;
    }
  },
  created() {
    // Shuffle questions on load
    this.preTestQuestions = this.shuffleArray(this.preTestQuestions);
    // Initialize set symbols answers array
    this.setSymbolsAnswers = new Array(this.setSymbolsQuiz.length).fill('');
    
    // ✅ NEW: Check if user has already taken pre-test in this session
    this.checkPreTestSessionStatus();
  },
  methods: {
    // ✅ NEW: Check sessionStorage for pre-test completion
    checkPreTestSessionStatus() {
      const hasTakenPreTest = sessionStorage.getItem('setTheory_preTest_completed');
      if (hasTakenPreTest === 'true') {
        this.hasTakenPreTestInSession = true;
      }
    },
    
    // ✅ UPDATED: Save Pre-Test Score to localStorage AND sessionStorage
    submitPreTest() {
      this.score = this.preTestQuestions.reduce((acc, q, i) => acc + (this.userAnswers[i] === q.answer ? 1 : 0), 0);
      this.showPreTestResult = true;
      
      // Load existing assessment scores from localStorage
      let existingAssessments = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
      // Save/update pre-test score
      existingAssessments['preTest-setTheory'] = this.score.toString();
      localStorage.setItem('assessmentScores', JSON.stringify(existingAssessments));
    },
    
    // ✅ NEW: Complete pre-test and mark as taken in session
    completePreTest() {
      // Mark pre-test as completed in sessionStorage
      sessionStorage.setItem('setTheory_preTest_completed', 'true');
      this.hasTakenPreTestInSession = true;
      this.preTestCompleted = true;
      this.showPreTestResult = false;
    },
    
    // ✅ NEW: Proceed directly to lesson if pre-test already taken
    proceedToLesson() {
      this.preTestCompleted = true;
    },
    
    goToNextLesson() {
      // Navigate to the "Sets, Cardinality, and Representation" topic (index 1)
      this.selectedTopic = 1;
      // Reset any active page states
      this.subsetPageActive = false;
      this.unionPageActive = false;
      this.singletonPageActive = false;
      this.singletonRepresentationPageActive = false;
      this.infinitePageActive = false;
      this.infiniteRepresentationPageActive = false;
      this.universalPageActive = false;
      this.powerSetPageActive = false;
      // Reset the Sets section scores and good job messages
      this.resetSetsScores();
      this.resetSetsGoodJobs();
      // Reset set symbols visibility when navigating
      this.showSetSymbols = false;
      this.showSetSymbolsError = false;
    },
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    toggleTopic(index) {
      this.selectedTopic = this.selectedTopic === index ? null : index;
      this.showSolution = Array(this.topics.length).fill({ main: false, alt: false });
      this.revealedSteps = Array(this.topics.length).fill({ main: [], alt: [] });
      this.viewedTopics.add(index);
      this.subsetRevealedSteps = [];
      this.showSubsetGuide = false;
      this.singletonRevealedSteps = [];
      this.showSingletonGuide = false;
      this.subsetPageActive = false;
      this.singletonPageActive = false;
      this.singletonRepresentationPageActive = false;
      this.infiniteRevealedSteps = [];
      this.showInfiniteGuide = false;
      this.infinitePageActive = false;
      this.infiniteRepresentationPageActive = false;
      this.subSupRevealedSteps = [];
      this.showSubSupGuide = false;
      this.universalPageActive = false;
      this.powerSetPageActive = false;
      // Reset set symbols visibility when switching topics
      this.showSetSymbols = false;
      this.showSetSymbolsError = false;
      
      if (index === 1) {
        this.resetSetsScores();
        this.resetSetsGoodJobs();
      }
      if (index === 2) {
        this.resetSingletonScores();
        this.resetSingletonGoodJobs();
      }
      if (index === 3) {
        this.resetInfiniteScores();
        this.resetInfiniteGoodJobs();
      }
      if (index === 4) {
        this.resetSubSupScores();
        this.resetSubSupGoodJobs();
      }
    },
    // NEW: Toggle set symbols with validation
    toggleSetSymbols() {
      if (this.completedSetSymbolsQuizCount < 5) {
        this.showSetSymbolsError = true;
        // Hide error after 3 seconds
        setTimeout(() => {
          this.showSetSymbolsError = false;
        }, 3000);
        return;
      }
      this.showSetSymbols = !this.showSetSymbols;
      this.showSetSymbolsError = false;
    },
    // NEW: Check set symbols quiz answer
    checkSetSymbolsAnswer(index) {
      if (!this.setSymbolsAnswers[index]) {
        return;
      }
      
      const quizQuestion = this.setSymbolsQuiz[index];
      const isCorrect = this.setSymbolsAnswers[index] === quizQuestion.answer;
      
      // Update quiz question state
      this.setSymbolsQuiz[index].answered = true;
      this.setSymbolsQuiz[index].correct = isCorrect;
      
      // Update score
      if (isCorrect) {
        this.setSymbolsScore = this.setSymbolsQuiz.filter(q => q.correct).length;
      }
      
      // Save progress
      this.saveToProgress('setSymbolsQuiz', this.completedSetSymbolsQuizCount);
    },
    resetSetsScores() {
      this.subsetScore = 0;
      this.subsetQuizScore = 0;
      this.secondCardScore = 0;
      this.thirdCardScore = 0;
      this.unionScore = 0;
      this.secondUnionScore = 0;
      this.thirdUnionScore = 0;
    },
    resetSetsGoodJobs() {
      this.subsetGoodJob = false;
      this.subsetQuizGoodJob = false;
      this.secondCardGoodJob = false;
      this.thirdCardGoodJob = false;
      this.unionGoodJob = false;
      this.secondUnionGoodJob = false;
      this.thirdUnionGoodJob = false;
    },
    resetSingletonScores() {
      this.singletonInputScore = 0;
      this.singletonQuizScore = 0;
      this.emptySetScore = 0;
      this.finiteInputScore = 0;
      this.finiteQuizScore = 0;
    },
    resetSingletonGoodJobs() {
      this.singletonInputGoodJob = false;
      this.singletonQuizGoodJob = false;
      this.emptySetGoodJob = false;
      this.finiteInputGoodJob = false;
      this.finiteQuizGoodJob = false;
    },
    resetInfiniteScores() {
      this.infiniteInputScore = 0;
      this.infiniteQuizScore = 0;
      this.equalInputScore = 0;
      this.equalQuizScore = 0;
      this.unequalInputScore = 0;
      this.unequalQuizScore = 0;
    },
    resetInfiniteGoodJobs() {
      this.infiniteGoodJob = false;
      this.infiniteQuizGoodJob = false;
      this.equalInputGoodJob = false;
      this.equalQuizGoodJob = false;
      this.unequalInputGoodJob = false;
      this.unequalQuizGoodJob = false;
    },
    resetSubSupScores() {
      this.subSupInputScore = 0;
      this.subSupQuizScore = 0;
      this.universalInputScore = 0;
      this.universalQuizScore = 0;
      this.powerSetInputScore = 0;
      this.powerSetQuizScore = 0;
    },
    resetSubSupGoodJobs() {
      this.subSupInputGoodJob = false;
      this.subSupQuizGoodJob = false;
      this.universalInputGoodJob = false;
      this.universalQuizGoodJob = false;
      this.powerSetInputGoodJob = false;
      this.powerSetQuizGoodJob = false;
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
      this.subsetGoodJob = false;
      const userInput = this.subsetAnswer.trim();
      if (!userInput.startsWith('{') || !userInput.endsWith('}')) {
        this.subsetFeedback = "❌ Invalid format. Use set notation like {a, e, i, o, u}.";
        this.subsetAnswer = "";
        return;
      }
      const elementsStr = userInput.slice(1, -1);
      const elements = elementsStr.split(',').map(e => e.trim().toLowerCase()).filter(e => e);
      const sortedElements = elements.sort().join(',');
      const correctElements = ['a','e','i','o','u'].sort().join(',');
      const isCorrect = sortedElements === correctElements && elements.length === 5;
      this.subsetScore = isCorrect ? 1 : 0;
      this.subsetFeedback = isCorrect ? "✅ Correct! {a, e, i, o, u} is the set of vowels in the English alphabet." : "❌ Try Again. Hint: Include all vowels (a, e, i, o, u) in set notation.";
      if (isCorrect) {
        this.subsetGoodJob = true;
        setTimeout(() => {
          this.subsetGoodJob = false;
        }, 7000);
      }
      this.subsetAnswer = "";
    },
    toggleSubsetStep(stepIndex) {
      if (stepIndex === 0 || this.subsetRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.subsetRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.subsetRevealedSteps.push(stepIndex) : this.subsetRevealedSteps.splice(pos, 1);
      }
    },
    checkSubsetQuiz() {
      this.subsetQuizGoodJob = false;
      if (!this.subsetQuizAnswer) {
        this.subsetQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.subsetQuizAnswer === this.subsetQuiz.answer;
      this.subsetQuizScore = isCorrect ? 1 : 0;
      this.subsetQuizFeedback = isCorrect ? "✅ Correct! That is the set of even numbers." : "❌ Incorrect. Review the definition of even numbers.";
      if (isCorrect) {
        this.subsetQuizGoodJob = true;
        setTimeout(() => {
          this.subsetQuizGoodJob = false;
        }, 7000);
      }
    },
    // Singleton Set Methods
    checkSingletonAnswer() {
      const correctAnswers = ["{3}", "{ 3 }"];
      const isCorrect = correctAnswers.includes(this.singletonAnswer.trim());
      this.singletonInputScore = isCorrect ? 1 : 0;
      this.singletonFeedback = isCorrect ? "✅ Correct! {3} is a singleton set containing the number 3." : "❌ Try Again. Hint: A singleton set contains exactly one element, e.g., {3}.";
      if (isCorrect) {
        this.singletonInputGoodJob = true;
        setTimeout(() => {
          this.singletonInputGoodJob = false;
        }, 7000);
      }
      this.singletonAnswer = "";
    },
    toggleSingletonStep(stepIndex) {
      if (stepIndex === 0 || this.singletonRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.singletonRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.singletonRevealedSteps.push(stepIndex) : this.singletonRevealedSteps.splice(pos, 1);
      }
    },
    checkSingletonQuiz() {
      if (!this.singletonQuizAnswer) {
        this.singletonQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.singletonQuizAnswer === this.singletonQuiz.answer;
      this.singletonQuizScore = isCorrect ? 1 : 0;
      this.singletonQuizFeedback = isCorrect ? "✅ Correct! {3} is a singleton set with exactly one element." : "❌ Incorrect. Review the definition of a singleton set (it has exactly one element).";
      if (isCorrect) {
        this.singletonQuizGoodJob = true;
        setTimeout(() => {
          this.singletonQuizGoodJob = false;
        }, 7000);
      }
    },
    checkEmptySetAnswer() {
      if (!this.emptySetAnswer) {
        this.emptySetFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.emptySetAnswer === this.emptySetQuiz.answer;
      this.emptySetScore = isCorrect ? 1 : 0;
      this.emptySetFeedback = isCorrect ? "✅ Correct! {} is the empty set with no elements." : "❌ Incorrect. The empty set contains no elements and is denoted by {} or ∅.";
      if (isCorrect) {
        this.emptySetGoodJob = true;
        setTimeout(() => {
          this.emptySetGoodJob = false;
        }, 7000);
      }
      this.emptySetAnswer = "";
      // Save singleton section after empty set quiz
      this.saveToProgress('singletonFiniteEmpty', this.singletonSectionScore);
    },
    goToSingletonRepresentationPage() {
      this.singletonRepresentationPageActive = true;
      this.singletonPageActive = false;
      this.singletonRepresentationAttempts = 0;
    },
    checkSingletonRepresentationAnswer() {
      this.singletonRepresentationAttempts += 1;
      const userInput = this.singletonRepresentationAnswer.trim();
      const cleanedInput = userInput
        .replace(/{|}/g, '')
        .replace(/\s*,\s*/g, ',')
        .toLowerCase()
        .split(',')
        .map(item => item.trim())
        .filter(item => item)
        .sort()
        .join(',');
      const correctSeasons = ['spring', 'summer', 'autumn', 'winter'].sort().join(',');
      const isCorrect = cleanedInput === correctSeasons;
      if (isCorrect) {
        this.finiteInputScore = 1;
        this.finiteInputGoodJob = true;
        setTimeout(() => {
          this.finiteInputGoodJob = false;
        }, 7000);
        this.singletonRepresentationFeedback = "✅ Correct! The set of the 4 seasons in roster form is {Spring, Summer, Autumn, Winter}.";
        this.singletonRepresentationAttempts = 0;
        // Save singleton section after finite input
        this.saveToProgress('singletonFiniteEmpty', this.singletonSectionScore);
      } else if (this.singletonRepresentationAttempts === 1) {
        this.singletonRepresentationFeedback = "❌ Incorrect, please try again.";
      } else {
        this.singletonRepresentationFeedback = "❌ You've used both attempts. The correct answer is {Spring, Summer, Autumn, Winter}.";
        this.singletonRepresentationAttempts = 0;
      }
      this.singletonRepresentationAnswer = "";
    },
    checkSingletonSecondRepresentationAnswer() {
      if (!this.singletonSecondRepresentationAnswer) {
        this.singletonSecondRepresentationFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.singletonSecondRepresentationAnswer === this.singletonSecondRepresentationQuiz.answer;
      this.finiteQuizScore = isCorrect ? 1 : 0;
      this.singletonSecondRepresentationFeedback = isCorrect ? "✅ Correct! The set {Monday, Tuesday, Wednesday} is a finite set with a definite number of elements." : "❌ Incorrect. A finite set has a definite number of elements, unlike infinite sets like positive integers or real numbers.";
      if (isCorrect) {
        this.finiteQuizGoodJob = true;
        setTimeout(() => {
          this.finiteQuizGoodJob = false;
        }, 7000);
        // Save singleton section after finite quiz
        this.saveToProgress('singletonFiniteEmpty', this.singletonSectionScore);
      }
    },
    checkSecondCardAnswer() {
      this.secondCardGoodJob = false;
      const correctAnswer = "5";
      const isCorrect = this.secondCardAnswer.trim() === correctAnswer;
      this.secondCardScore = isCorrect ? 1 : 0;
      this.secondCardFeedback = isCorrect ? "✅ Correct! The cardinality of T = {11, 13, 15, 17, 19} is 5." : "❌ Try Again. Hint: List the odd numbers between 10 and 20 and count them.";
      if (isCorrect) {
        this.secondCardGoodJob = true;
        setTimeout(() => {
          this.secondCardGoodJob = false;
        }, 7000);
      }
      this.secondCardAnswer = "";
    },
    toggleSecondCardStep(stepIndex) {
      if (stepIndex === 0 || this.secondCardRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.secondCardRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.secondCardRevealedSteps.push(stepIndex) : this.secondCardRevealedSteps.splice(pos, 1);
      }
    },
    checkThirdCardAnswer() {
      this.thirdCardGoodJob = false;
      const correctAnswer = "5";
      const isCorrect = this.thirdCardAnswer.trim() === correctAnswer;
      this.thirdCardScore = isCorrect ? 1 : 0;
      this.thirdCardFeedback = isCorrect ? "✅ Correct! The cardinality of M = {5, 10, 15, 20, 25} is 5." : "❌ Try Again. Hint: Count all elements in set M.";
      if (isCorrect) {
        this.thirdCardGoodJob = true;
        setTimeout(() => {
          this.thirdCardGoodJob = false;
        }, 7000);
      }
      this.thirdCardAnswer = "";
    },
    toggleThirdCardStep(stepIndex) {
      if (stepIndex === 0 || this.thirdCardRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.thirdCardRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.thirdCardRevealedSteps.push(stepIndex) : this.thirdCardRevealedSteps.splice(pos, 1);
      }
    },
    goToUnionPage() {
      this.unionPageActive = true;
      this.subsetPageActive = false;
      // Save cardinality section after completing cardinality page
      const cardinalityScore = this.subsetScore + this.subsetQuizScore + this.secondCardScore + this.thirdCardScore;
      this.saveToProgress('setCardinality', cardinalityScore);
    },
    checkUnionAnswer() {
      this.unionGoodJob = false;
      if (!this.unionAnswer) {
        this.unionFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.unionAnswer === this.representationQuiz.answer;
      this.unionScore = isCorrect ? 1 : 0;
      this.unionFeedback = isCorrect ? "✅ Correct! The set of odd numbers between 1 and 7 in roster form is {3, 5}." : "❌ Incorrect. Review the definition of roster form and list the odd numbers between 1 and 7.";
      if (isCorrect) {
        this.unionGoodJob = true;
        setTimeout(() => {
          this.unionGoodJob = false;
        }, 7000);
      }
    },
    toggleUnionStep(stepIndex) {
      if (stepIndex === 0 || this.unionRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.unionRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.unionRevealedSteps.push(stepIndex) : this.unionRevealedSteps.splice(pos, 1);
      }
    },
    checkSecondUnionAnswer() {
      this.secondUnionGoodJob = false;
      if (!this.secondUnionAnswer) {
        this.secondUnionFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.secondUnionAnswer === this.secondRepresentationQuiz.answer;
      this.secondUnionScore = isCorrect ? 1 : 0;
      this.secondUnionFeedback = isCorrect ? "✅ Correct! The set of vowels in set-builder notation is {x | x is a vowel in the English alphabet}." : "❌ Incorrect. Review the definition of set-builder notation for the vowels (a, e, i, o, u).";
      if (isCorrect) {
        this.secondUnionGoodJob = true;
        setTimeout(() => {
          this.secondUnionGoodJob = false;
        }, 7000);
      }
    },
    checkThirdUnionAnswer() {
      this.thirdUnionGoodJob = false;
      if (!this.thirdUnionAnswer) {
        this.thirdUnionFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.thirdUnionAnswer === this.thirdRepresentationQuiz.answer;
      this.thirdUnionScore = isCorrect ? 1 : 0;
      this.thirdUnionFeedback = isCorrect ? "✅ Correct! The set of prime numbers less than 10 in roster form is {2, 3, 5, 7}." : "❌ Incorrect. Review the definition of prime numbers and list them in roster form.";
      if (isCorrect) {
        this.thirdUnionGoodJob = true;
        setTimeout(() => {
          this.thirdUnionGoodJob = false;
        }, 7000);
      }
      // Save representation section after completing representation page
      const representationScore = this.unionScore + this.secondUnionScore + this.thirdUnionScore;
      this.saveToProgress('setCardinality', this.subsetScore + this.subsetQuizScore + this.secondCardScore + this.thirdCardScore + representationScore);
    },
    // Infinite Set Methods
    checkInfiniteAnswer() {
      const userInput = this.infiniteAnswer.trim();
      const normalizedInput = userInput.toLowerCase().replace(/\s+/g, '').replace(/…/g, '...');
      const isCorrect = (
        normalizedInput.startsWith('{') &&
        normalizedInput.endsWith('}') &&
        (
          normalizedInput.includes('...') ||
          (normalizedInput.includes('|') &&
            (
              normalizedInput.includes('natural') ||
              normalizedInput.includes('integer') ||
              normalizedInput.includes('even') ||
              normalizedInput.includes('real') ||
              normalizedInput.includes('positive')
            ))
        )
      );
      this.infiniteInputScore = isCorrect ? 1 : 0;
      this.infiniteFeedback = isCorrect ? "✅ Correct! Examples: set of natural numbers {1, 2, 3, …}, set of integers {…, -2, -1, 0, 1, 2, …}, set of even numbers {2, 4, 6, …}" : "❌ Try Again. Hint: Examples: set of natural numbers {1, 2, 3, …}, set of integers {…, -2, -1, 0, 1, 2, …}, set of even numbers {2, 4, 6, …}";
      if (isCorrect) {
        this.infiniteGoodJob = true;
        setTimeout(() => {
          this.infiniteGoodJob = false;
        }, 7000);
      }
      this.infiniteAnswer = "";
    },
    toggleInfiniteStep(stepIndex) {
      if (stepIndex === 0 || this.infiniteRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.infiniteRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.infiniteRevealedSteps.push(stepIndex) : this.infiniteRevealedSteps.splice(pos, 1);
      }
    },
    checkInfiniteQuiz() {
      if (!this.infiniteQuizAnswer) {
        this.infiniteQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.infiniteQuizAnswer === this.infiniteQuiz.answer;
      this.infiniteQuizScore = isCorrect ? 1 : 0;
      this.infiniteQuizFeedback = isCorrect ? "✅ Correct! {x | x is a natural number} is infinite as it goes on forever." : "❌ Incorrect. Review what makes a set infinite (unlimited elements).";
      if (isCorrect) {
        this.infiniteQuizGoodJob = true;
        setTimeout(() => {
          this.infiniteQuizGoodJob = false;
        }, 7000);
      }
    },
    checkEqualInputAnswer() {
      const correctAnswer = "equal";
      const isCorrect = this.equalInputAnswer.trim().toLowerCase() === correctAnswer;
      this.equalInputScore = isCorrect ? 1 : 0;
      this.equalInputFeedback = isCorrect ? "✅ Correct! {1, 2, 3} and {3, 2, 1} are equal because they contain the same elements." : "❌ Try Again. Hint: Compare the elements; order doesn't matter.";
      if (isCorrect) {
        this.equalInputGoodJob = true;
        setTimeout(() => {
          this.equalInputGoodJob = false;
        }, 7000);
      }
      this.equalInputAnswer = "";
    },
    checkEqualAnswer() {
      if (!this.equalAnswer) {
        this.equalFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.equalAnswer === this.equalQuiz.answer;
      this.equalQuizScore = isCorrect ? 1 : 0;
      this.equalFeedback = isCorrect ? "✅ Correct! A and B have the same elements, so they are equal." : "❌ Incorrect. Equal sets must have exactly the same elements.";
      if (isCorrect) {
        this.equalQuizGoodJob = true;
        setTimeout(() => {
          this.equalQuizGoodJob = false;
        }, 7000);
      }
      // Save infinite section after equal quiz
      this.saveToProgress('infiniteEqualUnequal', this.infiniteSectionScore);
    },
    goToInfiniteRepresentationPage() {
      this.infiniteRepresentationPageActive = true;
      this.infinitePageActive = false;
    },
    checkUnequalAnswer() {
      const correctAnswer = "unequal";
      const isCorrect = this.unequalAnswer.trim().toLowerCase() === correctAnswer;
      this.unequalInputScore = isCorrect ? 1 : 0;
      this.unequalFeedback = isCorrect ? "✅ Correct! {a, b} and {b, a, c} are unequal because of the extra element 'c'." : "❌ Try Again. Hint: Compare the elements; one has an extra.";
      if (isCorrect) {
        this.unequalInputGoodJob = true;
        setTimeout(() => {
          this.unequalInputGoodJob = false;
        }, 7000);
      }
      this.unequalAnswer = "";
    },
    checkUnequalQuiz() {
      if (!this.unequalQuizAnswer) {
        this.unequalQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.unequalQuizAnswer === this.unequalQuiz.answer;
      this.unequalQuizScore = isCorrect ? 1 : 0;
      this.unequalQuizFeedback = isCorrect ? "✅ Correct! C and D are unequal due to the extra 'r' in D." : "❌ Incorrect. Unequal sets differ in at least one element.";
      if (isCorrect) {
        this.unequalQuizGoodJob = true;
        setTimeout(() => {
          this.unequalQuizGoodJob = false;
        }, 7000);
        // Save infinite section after unequal quiz
        this.saveToProgress('infiniteEqualUnequal', this.infiniteSectionScore);
      }
    },
    // Subset Superset Methods
    checkSubSupAnswer() {
      const input = this.subSupAnswer.trim();
      if (!input.startsWith('{') || !input.endsWith('}')) {
        this.subSupFeedback = "❌ Invalid format. Use set notation like {1,2}.";
        this.subSupAnswer = "";
        return;
      }
      const elementsStr = input.slice(1, -1);
      const elements = elementsStr.split(',').map(e => e.trim()).filter(e => e);
      const validElements = ["1","2","3","4"];
      const isValid = elements.every(el => validElements.includes(el)) && elements.length > 0 && elements.length <= 4;
      this.subSupInputScore = isValid ? 1 : 0;
      if (isValid) {
        this.subSupFeedback = `✅ Correct! {${elements.join(',')}} is a subset of {1,2,3,4}.`;
        this.subSupInputGoodJob = true;
        setTimeout(() => {
          this.subSupInputGoodJob = false;
        }, 7000);
      } else {
        this.subSupFeedback = "❌ Not a subset. Make sure all elements are from {1,2,3,4} and use proper format.";
      }
      this.subSupAnswer = "";
    },
    toggleSubSupStep(stepIndex) {
      if (stepIndex === 0 || this.subSupRevealedSteps.includes(stepIndex - 1)) {
        const pos = this.subSupRevealedSteps.indexOf(stepIndex);
        pos === -1 ? this.subSupRevealedSteps.push(stepIndex) : this.subSupRevealedSteps.splice(pos, 1);
      }
    },
    checkSubSupQuiz() {
      if (!this.subSupQuizAnswer) {
        this.subSupQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.subSupQuizAnswer === this.subSupQuiz.answer;
      this.subSupQuizScore = isCorrect ? 1 : 0;
      this.subSupQuizFeedback = isCorrect ? "✅ Correct! {1,2,3} is a superset of {1,2}." : "❌ Incorrect. A superset contains all elements of the subset plus possibly more.";
      if (isCorrect) {
        this.subSupQuizGoodJob = true;
        setTimeout(() => {
          this.subSupQuizGoodJob = false;
        }, 7000);
      }
    },
    // Universal Set Methods
    checkUniversalAnswer() {
      const userInput = this.universalAnswer.trim();
      const cleanedInput = userInput
        .replace(/{|}/g, '')
        .replace(/\s*,\s*/g, ',')
        .toLowerCase()
        .split(',')
        .map(item => item.trim())
        .filter(item => item)
        .sort()
        .join(',');
      const correctDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].sort().join(',');
      const isCorrect = cleanedInput === correctDays;
      this.universalInputScore = isCorrect ? 1 : 0;
      this.universalFeedback = isCorrect ? "✅ Correct! The universal set for days is {Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday}." : "❌ Try Again. List all 7 days of the week.";
      if (isCorrect) {
        this.universalInputGoodJob = true;
        setTimeout(() => {
          this.universalInputGoodJob = false;
        }, 7000);
      }
      this.universalAnswer = "";
    },
    checkUniversalQuiz() {
      if (!this.universalQuizAnswer) {
        this.universalQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.universalQuizAnswer === this.universalQuiz.answer;
      this.universalQuizScore = isCorrect ? 1 : 0;
      this.universalQuizFeedback = isCorrect ? "✅ Correct! The universal set includes all elements in the context." : "❌ Incorrect. Universal set contains everything in the context.";
      if (isCorrect) {
        this.universalQuizGoodJob = true;
        setTimeout(() => {
          this.universalQuizGoodJob = false;
        }, 7000);
      }
      // Save subsup section after universal quiz
      this.saveToProgress('subsetPowersetUniversal', this.subSupSectionScore);
    },
    goToPowerSetPage() {
      this.powerSetPageActive = true;
      this.universalPageActive = false;
    },
    // Power Set Methods
    checkPowerSetAnswer() {
      const correctAnswers = ["{{}}", "{ {} }", "{∅}"];
      const trimmed = this.powerSetAnswer.trim().replace(/\s/g, '');
      const isCorrect = correctAnswers.includes(trimmed);
      this.powerSetInputScore = isCorrect ? 1 : 0;
      this.powerSetFeedback = isCorrect ? "✅ Correct! P(∅) = { ∅ }." : "❌ Try Again. The power set of empty set has one element: the empty set itself.";
      if (isCorrect) {
        this.powerSetInputGoodJob = true;
        setTimeout(() => {
          this.powerSetInputGoodJob = false;
        }, 7000);
      }
      this.powerSetAnswer = "";
    },
    checkPowerSetQuiz() {
      if (!this.powerSetQuizAnswer) {
        this.powerSetQuizFeedback = "⚠️ Please select an answer.";
        return;
      }
      const isCorrect = this.powerSetQuizAnswer === this.powerSetQuiz.answer;
      this.powerSetQuizScore = isCorrect ? 1 : 0;
      this.powerSetQuizFeedback = isCorrect ? "✅ Correct! |P(S)| = 2^4 = 16." : "❌ Incorrect. Remember, power set size is 2 to the power of set size.";
      if (isCorrect) {
        this.powerSetQuizGoodJob = true;
        setTimeout(() => {
          this.powerSetQuizGoodJob = false;
        }, 7000);
        // Save subsup section after power set quiz
        this.saveToProgress('subsetPowersetUniversal', this.subSupSectionScore);
      }
    },
    // Progress saving method (added for integration)
    saveToProgress(key, score) {
      try {
        const existing = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
        existing[key] = { score, completedAt: Date.now() };
        localStorage.setItem('assessmentScores', JSON.stringify(existing));
      } catch (e) {
        console.error('Error saving to progress:', e);
      }
    }
  }
};
</script>

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
.submit-button:hover, .solve-button:hover, .next-button:hover, .step-button:hover {
  background: #388E3C;
}
/* NEW: Disabled button style */
.submit-button:disabled, .solve-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
/* NEW: Larger button style for specific quizzes */
.larger-button {
  padding: 10px 40px !important;
  font-size: 14px !important;
  font-weight: bold;
}
.result-box {
  margin-top: 5px;
  padding: 8px;
  background: #e3f2fd;
  border-radius: 8px;
}
.good-job-message {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  text-align: center;
  font-weight: bold;
  animation: fadeInOut 7s ease-in-out forwards;
}
@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
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
  padding: 10px;
  border-radius: 8px;
  text-align: left;
  font-size: 14px;
  margin-bottom: 8px;
  border: 1px solid #f1e2a3;
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
.clickable-title {
  cursor: pointer;
  font-size: 16px;
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
  .pretest-container .submit-button {
    width: 100%;
    padding: 15px;
    font-size: 16px;
  }
  .next-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 15px 15px; /* smaller than before */
  font-size: 15px;   /* smaller font */
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
  min-width: auto;   /* optional: shrink width */
}
}
</style>