"use client"

import { useState, useEffect, useCallback } from "react"
import type { UserProgress, QuizStage } from "@/lib/types"
import {
  saveUserProgress,
  loadUserProgress,
  saveQuizStages,
  loadQuizStages,
  saveLastStage,
  loadLastStage,
} from "@/lib/storage"

interface UseProgressReturn {
  progress: UserProgress | null
  stages: QuizStage[] | null
  lastStageId: number | null
  isLoading: boolean
  updateProgress: (newProgress: UserProgress) => void
  addCompletedStage: (stageId: number, score: number) => void
  updateStages: (newStages: QuizStage[]) => void
  setLastStage: (stageId: number) => void
}

/**
 * Custom hook for managing user progress and persistence
 */
export function useProgress(defaultStages: QuizStage[]): UseProgressReturn {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [stages, setStages] = useState<QuizStage[] | null>(null)
  const [lastStageId, setLastStageId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedProgress = loadUserProgress()
    const savedStages = loadQuizStages()
    const savedLastStage = loadLastStage()

    setProgress(
      savedProgress || {
        completedStages: [],
        currentScore: 0,
        totalScore: 0,
        stageScores: {},
      },
    )

    setStages(savedStages || defaultStages)
    setLastStageId(savedLastStage)
    setIsLoading(false)
  }, [defaultStages])

  // Persist progress whenever it changes
  const updateProgress = useCallback((newProgress: UserProgress) => {
    setProgress(newProgress)
    saveUserProgress(newProgress)
  }, [])

  // Add a completed stage
  const addCompletedStage = useCallback((stageId: number, score: number) => {
    setProgress((prev) => {
      if (!prev) return prev
      const updated: UserProgress = {
        ...prev,
        completedStages: prev.completedStages.includes(stageId)
          ? prev.completedStages
          : [...prev.completedStages, stageId],
        currentScore: score,
        totalScore: prev.totalScore + score,
        stageScores: {
          ...(prev.stageScores || {}),
          [stageId]: score,
        },
      }
      saveUserProgress(updated)
      return updated
    })
  }, [])

  // Update stages
  const updateStagesHandler = useCallback((newStages: QuizStage[]) => {
    setStages(newStages)
    saveQuizStages(newStages)
  }, [])

  // Set last accessed stage
  const setLastStageHandler = useCallback((stageId: number) => {
    setLastStageId(stageId)
    saveLastStage(stageId)
  }, [])

  return {
    progress,
    stages,
    lastStageId,
    isLoading,
    updateProgress,
    addCompletedStage,
    updateStages: updateStagesHandler,
    setLastStage: setLastStageHandler,
  }
}
