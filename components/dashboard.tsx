"use client"

import { useState } from "react"
import type { QuizStage, UserProgress } from "@/lib/types"
import StageCard from "./stage-card"
import ProgressBar from "./progress-bar"
import StatsCard from "./stats-card"
import { Button } from "@/components/ui/button"

interface DashboardProps {
  stages: QuizStage[]
  userProgress: UserProgress
  onStartStage: (stage: QuizStage) => void
}

type DifficultyFilter = "All" | "Beginner" | "Intermediate" | "Advanced" | "Expert"

export default function Dashboard({ stages, userProgress, onStartStage }: DashboardProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>("All")

  const completedCount = userProgress.completedStages.length
  const totalStages = stages.length
  const progressPercentage = (completedCount / totalStages) * 100

  const filteredStages =
    selectedDifficulty === "All" ? stages : stages.filter((s) => s.difficulty === selectedDifficulty)

  const totalPoints = userProgress.totalScore
  const averageScore = userProgress.completedStages.length > 0 ? Math.round(userProgress.currentScore) : 0
  const nextUnlockedStageIndex = completedCount < totalStages ? completedCount : -1

  const difficultyFilters: DifficultyFilter[] = ["All", "Beginner", "Intermediate", "Advanced", "Expert"]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-card via-card to-background backdrop-blur-sm sticky top-0 z-40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                CyberShield Academy
              </h1>
              <p className="text-muted-foreground text-lg">Master cybersecurity through progressive challenges</p>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-4xl font-bold text-accent">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Section */}
      <section className="relative border-b border-border/50 bg-gradient-to-br from-card/30 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Overall Progress</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {completedCount} of {totalStages} stages completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {Math.round(progressPercentage)}%
                </div>
              </div>
            </div>
            <ProgressBar percentage={progressPercentage} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatsCard
              title="Stages Completed"
              value={`${completedCount}/${totalStages}`}
              description="Your journey"
              variant="secondary"
            />
            <StatsCard title="Last Score" value={`${averageScore}%`} description="Latest attempt" variant="accent" />
            <StatsCard title="Total Points" value={totalPoints} description="All-time total" />
            <StatsCard
              title="Progress"
              value={`${Math.round(progressPercentage)}%`}
              description="Track record"
              variant="secondary"
            />
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section className="max-w-7xl mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-5">Filter by Difficulty</h2>
          <div className="flex flex-wrap gap-3">
            {difficultyFilters.map((difficulty) => (
              <Button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                className={`transition-all duration-200 ${
                  selectedDifficulty === difficulty
                    ? "bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30"
                    : "bg-card/50 border-border/50 hover:bg-card hover:border-border"
                }`}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Stages Grid */}
        <div className="space-y-6">
          {nextUnlockedStageIndex >= 0 && (
            <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl text-sm backdrop-blur-sm">
              <p className="text-foreground font-semibold">
                Next stage to unlock:{" "}
                <span className="text-accent font-bold">{stages[nextUnlockedStageIndex]?.title}</span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStages.map((stage, index) => {
              const stageIndex = stages.findIndex((s) => s.id === stage.id)
              const isCompleted = userProgress.completedStages.includes(stage.id)
              const isUnlocked = stageIndex === 0 || userProgress.completedStages.includes(stages[stageIndex - 1].id)
              const score = userProgress.stageScores?.[stage.id]
              return (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  isCompleted={isCompleted}
                  isUnlocked={isUnlocked}
                  score={score}
                  onStart={() => onStartStage(stage)}
                />
              )
            })}
          </div>

          {filteredStages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No stages found for this difficulty level.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
