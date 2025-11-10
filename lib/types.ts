export interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface QuizStage {
  id: number
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  requiredScore: number
  questions: Question[]
}

export interface UserProgress {
  completedStages: number[]
  currentScore: number
  totalScore: number
  stageScores?: Record<number, number> // Map stage ID to score achieved
}

export interface StageUnlockStatus {
  stageId: number
  isUnlocked: boolean
  isCompleted: boolean
  score?: number
}
