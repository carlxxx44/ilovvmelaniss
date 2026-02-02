"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
// @ts-ignore - no type declarations for canvas-confetti
import confetti from "canvas-confetti"

export function ValentineProposal() {
  const [answered, setAnswered] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })



  const handleYes = () => {
    setAnswered(true)
    
    // Confetti explosion
    const count = 200
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#f9a8d4", "#ec4899", "#be185d", "#fce7f3", "#ff6b9d"],
    }

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, { spread: 26, startVelocity: 55 })
    fire(0.2, { spread: 60 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })
  }

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100
    const y = Math.random() * 100 - 50
    setNoButtonPosition({ x, y })
  }

  if (answered) {
    return (
      <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="text-6xl md:text-8xl animate-bounce">💖</div>
        <h2 className="text-3xl md:text-5xl font-serif text-primary">
          ¡Sabía que dirías que sí!
        </h2>
        <p className="text-lg md:text-xl text-foreground/80">
          Te amo con todo mi corazón, mi amor
        </p>
        <div className="flex justify-center gap-2 text-4xl">
          <span className="animate-pulse">💕</span>
          <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>💗</span>
          <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>💖</span>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight">
          ¿Quieres ser mi San Valentín?
        </h2>
        <p className="text-foreground/70 text-lg">
          Una pregunta muy importante...
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[120px]">
        <Button
          onClick={handleYes}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 min-w-[140px]"
        >
          ¡Sí! 💖
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          className="border-primary/50 text-primary hover:bg-primary/10 text-xl px-10 py-7 rounded-full transition-all min-w-[140px] bg-transparent"
          style={{
            transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          No 😢
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground italic">
        (Pista: solo hay una respuesta correcta 😉)
      </p>
    </div>
  )
}
