// storageHelper.js - Utility functions for localStorage

const STORAGE_KEYS = {
  QUIZ_SCORES: 'quizScores',
  ASSESSMENTS: 'assessments',
  USER_PROGRESS: 'userProgress'
};

// Save quiz score
export const saveQuizScore = (quizData) => {
  try {
    const existingScores = getQuizScores();
    const newScore = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...quizData
    };
    existingScores.push(newScore);
    localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(existingScores));
    return true;
  } catch (error) {
    console.error('Error saving quiz score:', error);
    return false;
  }
};

// Get all quiz scores
export const getQuizScores = () => {
  try {
    const scores = localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES);
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error('Error getting quiz scores:', error);
    return [];
  }
};

// Save assessment result
export const saveAssessment = (assessmentData) => {
  try {
    const existingAssessments = getAssessments();
    const newAssessment = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...assessmentData
    };
    existingAssessments.push(newAssessment);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(existingAssessments));
    return true;
  } catch (error) {
    console.error('Error saving assessment:', error);
    return false;
  }
};

// Get all assessments
export const getAssessments = () => {
  try {
    const assessments = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    return assessments ? JSON.parse(assessments) : [];
  } catch (error) {
    console.error('Error getting assessments:', error);
    return [];
  }
};

// Get assessment by ID
export const getAssessmentById = (id) => {
  const assessments = getAssessments();
  return assessments.find(assessment => assessment.id === id);
};

// Update user progress
export const saveProgress = (lessonId, progress) => {
  try {
    const allProgress = getUserProgress();
    allProgress[lessonId] = {
      ...progress,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(allProgress));
    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
};

// Get user progress
export const getUserProgress = () => {
  try {
    const progress = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return progress ? JSON.parse(progress) : {};
  } catch (error) {
    console.error('Error getting progress:', error);
    return {};
  }
};

// Get progress for specific lesson
export const getLessonProgress = (lessonId) => {
  const allProgress = getUserProgress();
  return allProgress[lessonId] || null;
};

// Clear all data
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.QUIZ_SCORES);
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
    localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

// Get statistics
export const getStatistics = () => {
  const quizScores = getQuizScores();
  const assessments = getAssessments();
  
  return {
    totalQuizzes: quizScores.length,
    totalAssessments: assessments.length,
    averageQuizScore: quizScores.length > 0 
      ? quizScores.reduce((sum, quiz) => sum + (quiz.score || 0), 0) / quizScores.length 
      : 0,
    averageAssessmentScore: assessments.length > 0
      ? assessments.reduce((sum, assess) => sum + (assess.score || 0), 0) / assessments.length
      : 0
  };
};