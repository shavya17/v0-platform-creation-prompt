"use client"

import { useState } from "react"
import type { QuizStage } from "@/lib/types"
import QuestionCard from "./question-card"
import ResultsScreen from "./results-screen"
import QuizHeader from "./quiz-header"
import { Button } from "@/components/ui/button"

interface QuizProps {
  stage: QuizStage
  onComplete: (score: number) => void
  onBack: () => void
}

export default function Quiz({ stage, onComplete, onBack }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = stage.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === stage.questions.length - 1
  const questionsAnswered = answers.filter((a) => a !== undefined).length

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    stage.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / stage.questions.length) * 100)
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <ResultsScreen
        stage={stage}
        score={score}
        answers={answers}
        questions={stage.questions}
        onComplete={() => onComplete(score)}
        onBack={onBack}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <QuizHeader
        stageName={stage.title}
        stageId={stage.id}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={stage.questions.length}
        questionsAnswered={questionsAnswered}
        onBack={onBack}
      />

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <div className="space-y-6">
          {/* Stage Info */}
          <div>
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide">Stage {stage.id}</h2>
            <h1 className="text-3xl font-bold text-foreground mt-2">{stage.title}</h1>
            <p className="text-muted-foreground mt-2">{stage.description}</p>
          </div>

          {/* Question Card */}
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={answers[currentQuestionIndex]}
            onSelectAnswer={handleAnswerSelect}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={stage.questions.length}
          />

          {/* Navigation */}
          <div className="flex gap-4 justify-between pt-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              ← Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestionIndex] === undefined}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {isLastQuestion ? "Finish Quiz" : "Next →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
