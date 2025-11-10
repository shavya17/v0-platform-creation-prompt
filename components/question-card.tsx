"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Question } from "@/lib/types"

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | undefined
  onSelectAnswer: (answerIndex: number) => void
  questionNumber?: number
  totalQuestions?: number
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const getOptionLabel = (index: number) => {
    const labels = ["A", "B", "C", "D"]
    return labels[index] || String.fromCharCode(65 + index)
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        {questionNumber && totalQuestions && (
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              Question {questionNumber} of {totalQuestions}
            </span>
            <div className="text-xs text-muted-foreground">{Math.round((questionNumber / totalQuestions) * 100)}%</div>
          </div>
        )}
        <CardTitle className="text-xl text-foreground">{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 group ${
                selectedAnswer === index
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card hover:border-primary/50 text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-semibold text-sm transition-all ${
                    selectedAnswer === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-muted text-muted-foreground group-hover:border-primary/50"
                  }`}
                >
                  {getOptionLabel(index)}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
