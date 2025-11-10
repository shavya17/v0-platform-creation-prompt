"use client"

import type { QuizStage } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ResultsSummaryProps {
  stage: QuizStage
  score: number
  passed: boolean
  correctAnswers: number
  totalQuestions: number
  requiredScore: number
  onContinue: () => void
}

export default function ResultsSummary({
  stage,
  score,
  passed,
  correctAnswers,
  totalQuestions,
  requiredScore,
  onContinue,
}: ResultsSummaryProps) {
  return (
    <Card className={`border-2 ${passed ? "border-secondary" : "border-destructive"}`}>
      <CardHeader className={`${passed ? "bg-secondary/10" : "bg-destructive/10"}`}>
        <CardTitle className={`text-3xl text-center ${passed ? "text-secondary" : "text-destructive"}`}>
          {passed ? "Stage Complete!" : "Try Again"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8 pb-8">
        {/* Score Stats */}
        <div className="grid grid-cols-3 gap-6 text-center mb-8">
          <div className="space-y-2">
            <div className="text-5xl font-bold text-primary">{score}%</div>
            <div className="text-sm text-muted-foreground">Your Score</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-secondary">
              {correctAnswers}/{totalQuestions}
            </div>
            <div className="text-sm text-muted-foreground">Correct Answers</div>
          </div>
          <div className="space-y-2">
            <div className={`text-5xl font-bold ${passed ? "text-secondary" : "text-destructive"}`}>
              {requiredScore}%
            </div>
            <div className="text-sm text-muted-foreground">{passed ? "Passed" : "Required"}</div>
          </div>
        </div>

        {/* Feedback */}
        {!passed && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-destructive text-sm font-medium">
              You need at least {requiredScore}% to pass this stage. Review the explanations below and try again!
            </p>
          </div>
        )}

        {passed && (
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-6">
            <p className="text-secondary text-sm font-medium">
              Great job! You've mastered the {stage.title} stage. Proceed to the next challenge.
            </p>
          </div>
        )}

        {/* Actions */}
        <Button
          onClick={onContinue}
          className={`w-full ${passed ? "bg-secondary hover:bg-secondary/90" : "bg-primary hover:bg-primary/90"}`}
        >
          {passed ? "Continue to Dashboard" : "Back to Dashboard"}
        </Button>
      </CardContent>
    </Card>
  )
}
