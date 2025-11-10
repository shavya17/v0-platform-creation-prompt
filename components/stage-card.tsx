"use client"

import type { QuizStage } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StageCardProps {
  stage: QuizStage
  isCompleted: boolean
  isUnlocked: boolean
  score?: number
  onStart: () => void
}

export default function StageCard({ stage, isCompleted, isUnlocked, score, onStart }: StageCardProps) {
  const getDifficultyColor = () => {
    switch (stage.difficulty) {
      case "Beginner":
        return "text-secondary"
      case "Intermediate":
        return "text-primary"
      case "Advanced":
        return "text-destructive"
      case "Expert":
        return "text-accent"
      default:
        return "text-foreground"
    }
  }

  const getScoreStatus = (score: number, required: number) => {
    if (score >= required) {
      return { color: "text-secondary", label: "Passed" }
    }
    return { color: "text-destructive", label: "Failed" }
  }

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 group ${
        isUnlocked
          ? "hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 hover:scale-105 cursor-pointer bg-gradient-to-br from-card to-card/50"
          : "opacity-60 cursor-not-allowed bg-card/30"
      } ${isCompleted ? "border-secondary/30 ring-1 ring-secondary/20" : "border-border/50"}`}
    >
      {isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={`text-xl font-bold ${isCompleted ? "text-secondary" : "text-foreground"}`}>
              Stage {stage.id}: {stage.title}
            </CardTitle>
            <CardDescription className="mt-2 text-muted-foreground">{stage.description}</CardDescription>
          </div>
          {isCompleted && (
            <div className="ml-2 flex-shrink-0 flex flex-col items-end gap-2">
              <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-full w-10 h-10 flex items-center justify-center ring-2 ring-secondary/30">
                <span className="text-foreground font-bold text-lg">✓</span>
              </div>
              {score !== undefined && (
                <span
                  className={`text-sm font-bold px-2 py-1 rounded-full ${getScoreStatus(score, stage.requiredScore).color}`}
                >
                  {score}%
                </span>
              )}
            </div>
          )}
          {!isUnlocked && (
            <div className="ml-2 flex-shrink-0 bg-muted/30 rounded-full w-10 h-10 flex items-center justify-center ring-2 ring-muted/20">
              <span className="text-muted-foreground text-lg">🔒</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-card/50 rounded-lg p-3 space-y-1">
            <p className="text-muted-foreground font-medium text-xs">Difficulty</p>
            <p className={`font-bold ${getDifficultyColor()}`}>{stage.difficulty}</p>
          </div>
          <div className="bg-card/50 rounded-lg p-3 space-y-1">
            <p className="text-muted-foreground font-medium text-xs">Pass Score</p>
            <p className="font-bold text-foreground">{stage.requiredScore}%</p>
          </div>
          <div className="bg-card/50 rounded-lg p-3 space-y-1">
            <p className="text-muted-foreground font-medium text-xs">Questions</p>
            <p className="font-bold text-foreground">{stage.questions.length}</p>
          </div>
        </div>

        {!isUnlocked ? (
          <Button
            disabled
            className="w-full mt-4 bg-muted/20 text-muted-foreground hover:bg-muted/20"
            variant="outline"
          >
            🔒 Unlock to Begin
          </Button>
        ) : (
          <Button
            onClick={onStart}
            className={`w-full mt-4 font-semibold transition-all duration-200 ${
              isCompleted
                ? "bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-lg hover:shadow-secondary/30"
                : "bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/30"
            }`}
          >
            {isCompleted ? "Review Stage" : "Start Quiz"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
