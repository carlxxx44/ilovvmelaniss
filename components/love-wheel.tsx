"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const prizes = [
  { text: "Besos infinitos", emoji: "💋" },
  { text: "Noche de pelis", emoji: "🎬" },
  { text: "Masaje relajante", emoji: "💆" },
  { text: "Día de aventura", emoji: "🌟" },
  { text: "Carta de amor", emoji: "💌" }, 
]

export function LoveWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<typeof prizes[0] | null>(null)
  const [rotation, setRotation] = useState(0)

  const spinWheel = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setResult(null)
    
    const randomIndex = Math.floor(Math.random() * prizes.length)
    const spins = 5 + Math.random() * 3
    const baseAngle = 360 / prizes.length
    const targetAngle = spins * 360 + (randomIndex * baseAngle) + (baseAngle / 2)
    
    setRotation(prev => prev + targetAngle)
    
    setTimeout(() => {
      setResult(prizes[randomIndex])
      setIsSpinning(false)
    }, 4000)
  }

  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-serif text-center text-primary mb-4">
        Ruleta del Amor
      </h3>
      <p className="text-center text-muted-foreground text-sm mb-6">
        Gira la ruleta y descubre tu premio
      </p>
      
      <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-primary/20">
        <div className="relative w-64 h-64 mx-auto mb-6">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20 text-3xl">
            🔻
          </div>
          
          {/* Wheel */}
          <div 
            className="w-full h-full rounded-full border-4 border-primary/30 shadow-xl relative overflow-hidden transition-transform ease-out"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? "4s" : "0s"
            }}
          >
            {prizes.map((prize, index) => {
              const angle = (360 / prizes.length) * index
              const isEven = index % 2 === 0
              return (
                <div
                  key={index}
                  className={`absolute w-full h-full flex items-center justify-center ${isEven ? 'bg-primary/20' : 'bg-secondary'}`}
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.tan(Math.PI / prizes.length)}% 0%, 50% 50%)`,
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "center center"
                  }}
                >
                  <span 
                    className="absolute text-2xl"
                    style={{
                      top: "25%",
                      left: "50%",
                      transform: "translateX(-50%)"
                    }}
                  >
                    {prize.emoji}
                  </span>
                </div>
              )
            })}
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
              <span className="text-primary-foreground text-xl">💝</span>
            </div>
          </div>
        </div>

        {result && (
          <div className="text-center mb-4 animate-in fade-in zoom-in duration-300">
            <p className="text-lg text-muted-foreground">¡Te ganaste:</p>
            <p className="text-2xl font-serif text-primary mt-2">
              {result.emoji} {result.text}
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg disabled:opacity-50"
          >
            {isSpinning ? "Girando..." : "¡Girar!"}
          </Button>
        </div>
      </div>
    </div>
  )
}
