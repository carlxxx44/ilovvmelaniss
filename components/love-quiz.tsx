"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star, Trophy, Sparkles } from "lucide-react"

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    question: "Desde que fecha estamos juntos?",
    options: ["15 de julio 2025", "15 de agosto 2025", "15 de septiembre 2025", "15 de octubre 2025"],
    correct: 1,
    explanation: "Comenzamos nuestra historia de amor el 15 de agosto de 2025!"
  },
  {
    question: "Que dia del mes cumplimos meses?",
    options: ["El dia 1", "El dia 10", "El dia 15", "El dia 20"],
    correct: 2,
    explanation: "Cada 15 celebramos un mes mas de amor!"
  },
  {
    question: "Cuantos meses cumpliremos en febrero?",
    options: ["4 meses", "5 meses", "6 meses", "7 meses"],
    correct: 2,
    explanation: "El 15 de febrero cumpliremos 6 hermosos meses juntos!"
  },
  {
    question: "Quien creo esta pagina web?",
    options: ["Un robot", "Un amigo", "Carlos con amor", "Una empresa"],
    correct: 2,
    explanation: "Carlos la creo con todo su amor solo para ti!"
  },
  {
    question: "Que quiere Carlos que seas?",
    options: ["Su amiga", "Su San Valentin", "Su vecina", "Su companera"],
    correct: 1,
    explanation: "Carlos quiere que seas su San Valentin para siempre!"
  }
]

export function LoveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([])

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(index)
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
      // Crear explosion de corazones
      const newHearts = [...Array(8)].map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }))
      setHearts(newHearts)
      setTimeout(() => setHearts([]), 1500)
    }
    
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizComplete(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setQuizComplete(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return "PERFECTO! Me conoces mejor que nadie!"
    if (percentage >= 80) return "Increible! Sabes casi todo sobre nosotros!"
    if (percentage >= 60) return "Muy bien! Nos conoces bastante!"
    if (percentage >= 40) return "Nada mal! Sigamos conociéndonos mas!"
    return "Tenemos mucho por descubrir juntos!"
  }

  return (
    <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 relative overflow-hidden">
      {/* Corazones de celebracion */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-2xl animate-ping pointer-events-none"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDuration: "1s"
          }}
        >
          {"💖"}
        </div>
      ))}

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Trophy className="w-5 h-5" />
          <span className="font-medium">Quiz del Amor</span>
        </div>
        <h3 className="text-xl md:text-2xl font-serif text-primary">
          Cuanto Me Conoces?
        </h3>
      </div>

      {!quizComplete ? (
        <div className="space-y-6">
          {/* Progreso */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>

          {/* Pregunta */}
          <div className="bg-secondary/50 rounded-2xl p-4">
            <p className="text-lg font-medium text-foreground text-center">
              {questions[currentQuestion].question}
            </p>
          </div>

          {/* Opciones */}
          <div className="grid gap-3">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === questions[currentQuestion].correct
              const showCorrectness = showResult

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`
                    p-4 rounded-xl text-left transition-all duration-300
                    ${!showCorrectness 
                      ? "bg-card border-2 border-primary/20 hover:border-primary hover:bg-primary/5 active:scale-98" 
                      : isCorrect
                        ? "bg-green-100 border-2 border-green-500 text-green-800"
                        : isSelected
                          ? "bg-red-100 border-2 border-red-500 text-red-800"
                          : "bg-card border-2 border-primary/10 opacity-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${!showCorrectness 
                        ? "bg-primary/10 text-primary" 
                        : isCorrect 
                          ? "bg-green-500 text-white" 
                          : isSelected 
                            ? "bg-red-500 text-white"
                            : "bg-muted text-muted-foreground"
                      }
                    `}>
                      {showCorrectness && isCorrect ? <Star className="w-4 h-4 fill-current" /> : String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Resultado de la pregunta */}
          {showResult && (
            <div className={`p-4 rounded-xl text-center animate-in fade-in slide-in-from-bottom-2 ${
              selectedAnswer === questions[currentQuestion].correct
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-primary/10 text-foreground border border-primary/20"
            }`}>
              <p className="font-medium mb-1">
                {selectedAnswer === questions[currentQuestion].correct ? "Correcto!" : "La respuesta correcta era otra!"}
              </p>
              <p className="text-sm opacity-80">
                {questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          {/* Boton siguiente */}
          {showResult && (
            <Button
              onClick={nextQuestion}
              className="w-full rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 h-12 text-lg"
            >
              {currentQuestion < questions.length - 1 ? "Siguiente Pregunta" : "Ver Resultado"}
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      ) : (
        /* Resultado final */
        <div className="text-center space-y-6 py-4">
          <div className="relative inline-block">
            <div className="text-7xl mb-2">
              {score === questions.length ? "👑" : score >= questions.length / 2 ? "🌟" : "💕"}
            </div>
            {score === questions.length && (
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500 animate-spin" style={{ animationDuration: "3s" }} />
            )}
          </div>

          <div>
            <p className="text-4xl font-bold text-primary mb-2">
              {score}/{questions.length}
            </p>
            <p className="text-lg text-foreground/80">
              {getScoreMessage()}
            </p>
          </div>

          <div className="flex justify-center gap-1">
            {[...Array(questions.length)].map((_, i) => (
              <Heart 
                key={i} 
                className={`w-8 h-8 transition-all ${
                  i < score 
                    ? "text-primary fill-primary scale-110" 
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={resetQuiz}
            variant="outline"
            className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 bg-transparent"
          >
            Intentar de nuevo
          </Button>
        </div>
      )}
    </Card>
  )
}
