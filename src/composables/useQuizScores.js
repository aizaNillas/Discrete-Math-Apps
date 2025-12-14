// composables/useQuizScores.js
// Gamiton ni sa tanan imong lesson ug assessment files

export function useQuizScores() {
  
  // Save score after quiz/assessment
  function saveScore(data) {
    const { 
      type,           // 'quiz' or 'assessment'
      lessonName,     // 'LessonTopic1', 'Assessment1', etc.
      score,          // user's score
      totalQuestions, // total number of questions
      percentage      // optional: score percentage
    } = data;

    // Get existing scores
    const allScores = JSON.parse(localStorage.getItem('allScores') || '[]');
    
    // Create new score entry
    const newScore = {
      id: Date.now(), // unique ID
      type: type,
      lessonName: lessonName,
      score: score,
      totalQuestions: totalQuestions,
      percentage: percentage || Math.round((score / totalQuestions) * 100),
      dateTaken: new Date().toISOString(),
      timestamp: Date.now()
    };
    
    // Add to array
    allScores.push(newScore);
    
    // Save back to localStorage
    localStorage.setItem('allScores', JSON.stringify(allScores));
    
    console.log('Score saved successfully!', newScore);
    return newScore;
  }

  // Get all scores
  function getAllScores() {
    const scores = localStorage.getItem('allScores');
    return scores ? JSON.parse(scores) : [];
  }

  // Get scores by type (quiz or assessment)
  function getScoresByType(type) {
    const allScores = getAllScores();
    return allScores.filter(score => score.type === type);
  }

  // Get scores for specific lesson
  function getScoresByLesson(lessonName) {
    const allScores = getAllScores();
    return allScores.filter(score => score.lessonName === lessonName);
  }

  // Get latest score for a lesson
  function getLatestScore(lessonName) {
    const lessonScores = getScoresByLesson(lessonName);
    if (lessonScores.length === 0) return null;
    
    // Return most recent
    return lessonScores.sort((a, b) => b.timestamp - a.timestamp)[0];
  }

  // Calculate overall progress
  function calculateProgress() {
    const allScores = getAllScores();
    
    if (allScores.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        totalQuizzes: 0,
        totalAssessments: 0
      };
    }

    const quizzes = allScores.filter(s => s.type === 'quiz');
    const assessments = allScores.filter(s => s.type === 'assessment');
    
    const avgScore = allScores.reduce((sum, s) => sum + s.percentage, 0) / allScores.length;
    
    return {
      totalAttempts: allScores.length,
      averageScore: Math.round(avgScore),
      totalQuizzes: quizzes.length,
      totalAssessments: assessments.length,
      quizzes: quizzes,
      assessments: assessments
    };
  }

  // Delete a specific score
  function deleteScore(scoreId) {
    const allScores = getAllScores();
    const filtered = allScores.filter(score => score.id !== scoreId);
    localStorage.setItem('allScores', JSON.stringify(filtered));
  }

  // Clear all scores
  function clearAllScores() {
    localStorage.removeItem('allScores');
  }

  return {
    saveScore,
    getAllScores,
    getScoresByType,
    getScoresByLesson,
    getLatestScore,
    calculateProgress,
    deleteScore,
    clearAllScores
  };
}