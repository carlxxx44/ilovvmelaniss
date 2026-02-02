"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface Kiss {
  id: number
  x: number
  y: number
  caught: boolean
}

export function KissCatcher() {
  const [kisses, setKisses] = useState<Kiss[]>([])
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [bestScore, setBestScore] = useState(0)

  const catchKiss = useCallback((id: number) => {
    setKisses(prev => prev.map(k => 
      k.id === id ? { ...k, caught: true } : k
    ))
    setScore(prev => prev + 1)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const spawnInterval = setInterval(() => {
      const newKiss: Kiss = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        caught: false,
      }
      setKisses(prev => [...prev, newKiss])
      
      setTimeout(() => {
        setKisses(prev => prev.filter(k => k.id !== newKiss.id))
      }, 2000)
    }, 600)

    return () => clearInterval(spawnInterval)
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) {
      if (timeLeft <= 0 && isPlaying) {
        setIsPlaying(false)
        if (score > bestScore) {
          setBestScore(score)
        }
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, timeLeft, score, bestScore])

  const startGame = () => {
    setKisses([])
    setScore(0)
    setTimeLeft(15)
    setIsPlaying(true)
  }

  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-serif text-center text-primary mb-4">
        Atrapa Mis Besos
      </h3>
      <p className="text-center text-muted-foreground text-sm mb-4">
        Toca todos los besos que puedas en 15 segundos
      </p>
      
      <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-4 shadow-lg border border-primary/20 relative overflow-hidden">
        {!isPlaying && timeLeft === 15 && (
          <div className="flex flex-col items-center py-12 gap-4">
            <div className="text-5xl">💋</div>
            {bestScore > 0 && (
              <p className="text-sm text-muted-foreground">
                Mejor puntuación: {bestScore} besos
              </p>
            )}
            <Button 
              onClick={startGame}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg"
            >
              ¡Jugar!
            </Button>
          </div>
        )}

        {!isPlaying && timeLeft <= 0 && (
          <div className="flex flex-col items-center py-12 gap-4">
            <div className="text-5xl">🎉</div>
            <p className="text-2xl font-serif text-primary">¡Atrapaste {score} besos!</p>
            {score >= bestScore && score > 0 && (
              <p className="text-accent text-sm">¡Nuevo récord!</p>
            )}
            <Button 
              onClick={startGame}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg"
            >
              Jugar de nuevo
            </Button>
          </div>
        )}

        {isPlaying && (
          <>
            <div className="flex justify-between items-center mb-4">
              <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Besos: {score}
              </span>
              <span className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium">
                {timeLeft}s
              </span>
            </div>
            
            <div className="relative h-64 bg-secondary/30 rounded-2xl overflow-hidden">
              {kisses.filter(k => !k.caught).map(kiss => (
                <button
                  key={kiss.id}
                  onClick={() => catchKiss(kiss.id)}
                  className="absolute text-3xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 hover:scale-125 active:scale-90 cursor-pointer touch-manipulation"
                  style={{
                    left: `${kiss.x}%`,
                    top: `${kiss.y}%`,
                    animation: "pulse 0.5s ease-in-out infinite"
                  }}
                >
                  💋
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
