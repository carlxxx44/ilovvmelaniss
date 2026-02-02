"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, RotateCcw, Trophy, Heart } from "lucide-react"

interface MemoryCard {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const emojis = ["💕", "💖", "💗", "💘", "💝", "💞"]

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function createCards(): MemoryCard[] {
  const cards: MemoryCard[] = []
  emojis.forEach((emoji, index) => {
    cards.push({ id: index * 2, emoji, isFlipped: false, isMatched: false })
    cards.push({ id: index * 2 + 1, emoji, isFlipped: false, isMatched: false })
  })
  return shuffleArray(cards)
}

export function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setCards(createCards())
  }, [])

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsProcessing(true)
      const [first, second] = flippedCards
      const firstCard = cards.find(c => c.id === first)
      const secondCard = cards.find(c => c.id === second)

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ))
          setFlippedCards([])
          setIsProcessing(false)
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          ))
          setFlippedCards([])
          setIsProcessing(false)
        }, 1000)
      }
      setMoves(m => m + 1)
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsComplete(true)
    }
  }, [cards])

  const handleCardClick = (cardId: number) => {
    if (isProcessing) return
    
    const card = cards.find(c => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return
    if (flippedCards.length >= 2) return

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ))
    setFlippedCards(prev => [...prev, cardId])
  }

  const resetGame = () => {
    setCards(createCards())
    setFlippedCards([])
    setMoves(0)
    setIsComplete(false)
  }

  const getScoreMessage = () => {
    if (moves <= 8) return "Increible! Tienes memoria perfecta!"
    if (moves <= 12) return "Muy bien! Excelente memoria!"
    if (moves <= 16) return "Bien hecho! Buena memoria!"
    return "Lo lograste! Sigue practicando!"
  }

  return (
    <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Brain className="w-5 h-5" />
          <span className="font-medium">Juego de Memoria</span>
        </div>
        <h3 className="text-xl md:text-2xl font-serif text-primary">
          Encuentra las Parejas
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Movimientos: {moves}
        </p>
      </div>

      {!isComplete ? (
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched || isProcessing}
              className={`
                aspect-square rounded-xl text-2xl md:text-3xl
                transition-all duration-300 transform-gpu
                ${card.isFlipped || card.isMatched
                  ? "bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/40 scale-100"
                  : "bg-gradient-to-br from-primary to-accent border-2 border-primary hover:scale-105 active:scale-95"
                }
                ${card.isMatched ? "opacity-70" : ""}
              `}
              style={{
                perspective: "1000px",
              }}
            >
              <span 
                className={`
                  block transition-all duration-300
                  ${card.isFlipped || card.isMatched ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                `}
              >
                {card.emoji}
              </span>
              {!card.isFlipped && !card.isMatched && (
                <Heart className="w-5 h-5 mx-auto text-white/80" />
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center space-y-6 py-4">
          <div className="text-6xl animate-bounce">🎉</div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <p className="text-2xl font-bold text-primary">Completado!</p>
            </div>
            <p className="text-lg text-foreground/80">
              {getScoreMessage()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Lo lograste en {moves} movimientos
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Button
          onClick={resetGame}
          variant="outline"
          className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {isComplete ? "Jugar de Nuevo" : "Reiniciar"}
        </Button>
      </div>
    </Card>
  )
}
