"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface QuizHeaderProps {
  stageName: string
  stageId: number
  currentQuestion: number
  totalQuestions: number
  questionsAnswered: number
  onBack: () => void
}

export default function QuizHeader({
  stageName,
  stageId,
  currentQuestion,
  totalQuestions,
  questionsAnswered,
  onBack,
}: QuizHeaderProps) {
  const progressPercentage = ((currentQuestion - 1) / totalQuestions) * 100

  return (
    <div className="sticky top-0 bg-card/50 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground gap-2">
              ← Back to Dashboard
            </Button>
          </div>
          <div className="text-right text-sm">
            <div className="font-semibold text-foreground">
              Question {currentQuestion} of {totalQuestions}
            </div>
            <div className="text-xs text-muted-foreground">{questionsAnswered} answered</div>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </div>
  )
}
