import type { QuizStage, UserProgress } from "./types"

/**
 * Calculate the score from answers for a quiz stage
 * @param answers Array of selected answer indices
 * @param questions Array of quiz questions
 * @returns Percentage score (0-100)
 */
export function calculateScore(answers: number[], questions: any[]): number {
  if (questions.length === 0) return 0

  let correctCount = 0
  questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      correctCount++
    }
  })

  return Math.round((correctCount / questions.length) * 100)
}

/**
 * Determine if a user passed the quiz stage
 * @param score User's score
 * @param requiredScore Passing score for the stage
 * @returns true if user passed, false otherwise
 */
export function didUserPass(score: number, requiredScore: number): boolean {
  return score >= requiredScore
}

/**
 * Calculate the number of correct answers
 * @param answers Array of selected answer indices
 * @param questions Array of quiz questions
 * @returns Number of correct answers
 */
export function calculateCorrectAnswers(answers: number[], questions: any[]): number {
  let correctCount = 0
  questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      correctCount++
    }
  })
  return correctCount
}

/**
 * Determine which stages are unlocked for a user
 * @param stages All available stages
 * @param completedStages IDs of completed stages
 * @returns Array of stage unlock status for each stage
 */
export function getUnlockedStages(stages: QuizStage[], completedStages: number[]): boolean[] {
  return stages.map((stage, index) => {
    // First stage is always unlocked
    if (index === 0) return true
    // Stage is unlocked if previous stage is completed
    return completedStages.includes(stages[index - 1].id)
  })
}

/**
 * Get the next stage to tackle
 * @param stages All available stages
 * @param completedStages IDs of completed stages
 * @returns The next stage to unlock or null if all stages are completed
 */
export function getNextStage(stages: QuizStage[], completedStages: number[]) {
  const nextIndex = completedStages.length
  return nextIndex < stages.length ? stages[nextIndex] : null
}

/**
 * Calculate progress statistics
 * @param completedStages IDs of completed stages
 * @param totalStages Total number of stages
 * @returns Progress percentage (0-100)
 */
export function calculateProgressPercentage(completedStages: number[], totalStages: number): number {
  if (totalStages === 0) return 0
  return Math.round((completedStages.length / totalStages) * 100)
}

/**
 * Calculate achievement badges for user
 * @param userProgress User's progress
 * @param totalStages Total stages in the course
 * @returns Array of achievement descriptions
 */
export function calculateAchievements(userProgress: UserProgress, totalStages: number): string[] {
  const achievements: string[] = []

  if (userProgress.completedStages.length > 0) {
    achievements.push("Started Learning")
  }

  if (userProgress.completedStages.length >= Math.ceil(totalStages / 4)) {
    achievements.push("Quarter Way There")
  }

  if (userProgress.completedStages.length >= Math.ceil(totalStages / 2)) {
    achievements.push("Halfway Master")
  }

  if (userProgress.completedStages.length === totalStages) {
    achievements.push("Cybersecurity Expert")
  }

  if (userProgress.totalScore >= 1000) {
    achievements.push("Point Collector")
  }

  if (userProgress.totalScore >= 2000) {
    achievements.push("High Performer")
  }

  return achievements
}
