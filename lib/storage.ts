import type { UserProgress, QuizStage } from "./types"

const STORAGE_KEYS = {
  USER_PROGRESS: "userProgress",
  QUIZ_STAGES: "quizStages",
  LAST_STAGE: "lastStage",
  SESSION_ID: "sessionId",
} as const

/**
 * Save user progress to localStorage
 */
export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress))
  } catch (error) {
    console.error("Failed to save user progress:", error)
  }
}

/**
 * Load user progress from localStorage
 */
export function loadUserProgress(): UserProgress | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Failed to load user progress:", error)
    return null
  }
}

/**
 * Save quiz stages to localStorage
 */
export function saveQuizStages(stages: QuizStage[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUIZ_STAGES, JSON.stringify(stages))
  } catch (error) {
    console.error("Failed to save quiz stages:", error)
  }
}

/**
 * Load quiz stages from localStorage
 */
export function loadQuizStages(): QuizStage[] | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_STAGES)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Failed to load quiz stages:", error)
    return null
  }
}

/**
 * Save the last accessed stage
 */
export function saveLastStage(stageId: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_STAGE, JSON.stringify(stageId))
  } catch (error) {
    console.error("Failed to save last stage:", error)
  }
}

/**
 * Load the last accessed stage
 */
export function loadLastStage(): number | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LAST_STAGE)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Failed to load last stage:", error)
    return null
  }
}

/**
 * Clear all user data from localStorage
 */
export function clearAllData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
  } catch (error) {
    console.error("Failed to clear data:", error)
  }
}

/**
 * Export user progress as JSON
 */
export function exportProgress(progress: UserProgress): string {
  return JSON.stringify(progress, null, 2)
}

/**
 * Import user progress from JSON
 */
export function importProgress(jsonString: string): UserProgress | null {
  try {
    const data = JSON.parse(jsonString)
    // Validate the structure
    if (data.completedStages && Array.isArray(data.completedStages)) {
      return data as UserProgress
    }
    return null
  } catch (error) {
    console.error("Failed to import progress:", error)
    return null
  }
}
