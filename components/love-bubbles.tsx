"use client"

import { useState } from "react"

const loveWords = [
  "Te amo",
  "Mi vida",
  "Mi cielo",
  "Hermoso/a",
  "Mi todo",
  "Mi sol",
  "Preciosa",
  "Mi amor",
  "Bebé",
  "Cariño",
  "Mi corazón",
  "Mi estrella",
]

interface Bubble {
  id: number
  word: string
  x: number
  size: number
}

export function LoveBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [poppedCount, setPoppedCount] = useState(0)

  const createBubble = () => {
    const newBubble: Bubble = {
      id: Date.now(),
      word: loveWords[Math.floor(Math.random() * loveWords.length)],
      x: Math.random() * 70 + 15,
      size: Math.random() * 20 + 50,
    }
    setBubbles(prev => [...prev, newBubble])
    
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id))
    }, 5000)
  }

  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id))
    setPoppedCount(prev => prev + 1)
  }

  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-serif text-center text-primary mb-4">
        Burbujas de Amor
      </h3>
      <p className="text-center text-muted-foreground text-sm mb-4">
        Toca para crear burbujas con palabras de amor
      </p>
      
      <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-4 shadow-lg border border-primary/20">
        <div 
          className="relative h-72 bg-gradient-to-b from-secondary/50 to-transparent rounded-2xl overflow-hidden cursor-pointer touch-manipulation"
          onClick={createBubble}
        >
          {bubbles.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Toca aquí para crear burbujas</p>
            </div>
          )}
          
          {bubbles.map(bubble => (
            <button
              key={bubble.id}
              onClick={(e) => {
                e.stopPropagation()
                popBubble(bubble.id)
              }}
              className="absolute rounded-full bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center text-primary-foreground font-medium shadow-lg backdrop-blur-sm border border-white/30 transition-transform hover:scale-110 active:scale-90 touch-manipulation"
              style={{
                left: `${bubble.x}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                fontSize: `${bubble.size / 5}px`,
                animation: "floatUp 5s ease-out forwards"
              }}
            >
              <span className="text-center px-1 leading-tight">{bubble.word}</span>
            </button>
          ))}
        </div>
        
        {poppedCount > 0 && (
          <p className="text-center text-xs text-muted-foreground mt-3">
            Has reventado {poppedCount} burbujas de amor
          </p>
        )}
      </div>
      
      <style jsx>{`
        @keyframes floatUp {
          0% {
            bottom: 0;
            opacity: 0;
            transform: scale(0.5);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            bottom: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
