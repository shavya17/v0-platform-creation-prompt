"use client"

import type { QuizStage, Question } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ResultsSummary from "./results-summary"

interface ResultsScreenProps {
  stage: QuizStage
  score: number
  answers: number[]
  questions: Question[]
  onComplete: () => void
  onBack: () => void
}

export default function ResultsScreen({ stage, score, answers, questions, onComplete, onBack }: ResultsScreenProps) {
  const passed = score >= stage.requiredScore
  const correctAnswers = questions.filter((q, idx) => answers[idx] === q.correctAnswer).length

  const handleBackToDashboard = () => {
    onComplete()
    onBack()
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Results Summary Card */}
        <ResultsSummary
          stage={stage}
          score={score}
          passed={passed}
          correctAnswers={correctAnswers}
          totalQuestions={questions.length}
          requiredScore={stage.requiredScore}
          onContinue={handleBackToDashboard}
        />

        {/* Detailed Review */}
        <div className="mt-12 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Review Your Answers</h2>
            <p className="text-muted-foreground mt-1">Learn from your performance</p>
          </div>

          {questions.map((question, idx) => {
            const isCorrect = answers[idx] === question.correctAnswer
            return (
              <Card
                key={idx}
                className={`border-l-4 transition-all ${
                  isCorrect ? "border-l-secondary hover:bg-card/50" : "border-l-destructive hover:bg-destructive/5"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${isCorrect ? "bg-secondary/20 text-secondary" : "bg-destructive/20 text-destructive"}`}
                    >
                      {isCorrect ? "✓" : "✗"}
                    </span>
                    Question {idx + 1}: {question.text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground mb-2">Your Answer:</div>
                    <div
                      className={`p-3 rounded-lg ${isCorrect ? "bg-secondary/10 border border-secondary/20" : "bg-destructive/10 border border-destructive/20"}`}
                    >
                      <span className="font-medium">{question.options[answers[idx]]}</span>
                    </div>
                  </div>
                  {!isCorrect && (
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-2">Correct Answer:</div>
                      <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                        <span className="font-medium">{question.options[question.correctAnswer]}</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground mb-2">Explanation:</div>
                    <p className="text-foreground text-sm leading-relaxed">{question.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
