"use client"

import { useState } from "react"

const loveMessages = [
  { message: "Eres mi persona favorita en todo el mundo", emoji: "🌍" },
  { message: "Contigo aprendí lo que es el amor de verdad", emoji: "💕" },
  { message: "Tu sonrisa ilumina mis días más oscuros", emoji: "☀️" },
  { message: "Gracias por ser mi paz en medio del caos", emoji: "🕊️" },
  { message: "Cada momento a tu lado es un regalo", emoji: "🎁" },
  { message: "Me haces querer ser mejor persona", emoji: "⭐" },
]

export function ScratchCards() {
  const [revealedCards, setRevealedCards] = useState<number[]>([])

  const revealCard = (index: number) => {
    if (!revealedCards.includes(index)) {
      setRevealedCards(prev => [...prev, index])
    }
  }

  const resetCards = () => {
    setRevealedCards([])
  }

  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-serif text-center text-primary mb-4">
        Tarjetas Secretas
      </h3>
      <p className="text-center text-muted-foreground text-sm mb-6">
        Toca cada tarjeta para descubrir un mensaje de amor
      </p>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {loveMessages.map((item, index) => (
          <button
            key={index}
            onClick={() => revealCard(index)}
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500 transform touch-manipulation ${
              revealedCards.includes(index) 
                ? "scale-100" 
                : "hover:scale-[1.02] active:scale-95"
            }`}
          >
            {/* Hidden message */}
            <div className={`absolute inset-0 bg-card/80 backdrop-blur-sm flex flex-col items-center justify-center p-3 text-center transition-opacity duration-500 ${
              revealedCards.includes(index) ? "opacity-100" : "opacity-0"
            }`}>
              <span className="text-3xl mb-2">{item.emoji}</span>
              <p className="text-xs md:text-sm text-foreground leading-tight">{item.message}</p>
            </div>
            
            {/* Scratch cover */}
            <div className={`absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center transition-all duration-500 ${
              revealedCards.includes(index) 
                ? "opacity-0 scale-110" 
                : "opacity-100 scale-100"
            }`}>
              <div className="text-center">
                <span className="text-4xl">💖</span>
                <p className="text-primary-foreground text-xs mt-2 font-medium">Toca aquí</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {revealedCards.length === loveMessages.length && (
        <div className="text-center animate-in fade-in duration-500">
          <p className="text-muted-foreground text-sm mb-3">¡Descubriste todos los mensajes!</p>
          <button
            onClick={resetCards}
            className="text-primary underline text-sm hover:text-primary/80"
          >
            Volver a ocultar
          </button>
        </div>
      )}
    </div>
  )
}
