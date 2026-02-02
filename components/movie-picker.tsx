"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const movies = [
  { id: 1, title: "A Través de Mi Ventana", genre: "Romance", emoji: "💕" },
  { id: 2, title: "Titanic", genre: "Romance", emoji: "🚢" },
  { id: 3, title: "Diario de una Pasión", genre: "Romance", emoji: "📓" },
  { id: 4, title: "Bajo la Misma Estrella", genre: "Drama", emoji: "⭐" },
  { id: 5, title: "Yo Antes de Ti", genre: "Romance", emoji: "💑" },
  { id: 6, title: "A Todos los Chicos...", genre: "Comedia", emoji: "💌" },
  { id: 7, title: "El Stand de los Besos", genre: "Comedia", emoji: "💋" },
  { id: 8, title: "365 Días", genre: "Romance", emoji: "🔥" },
]

export function MoviePicker() {
  const [selected, setSelected] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSelect = (id: number) => {
    setSelected(id)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  const selectedMovie = movies.find((m) => m.id === selected)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-serif text-primary mb-2">
          Escoge Una Película
        </h3>
        <p className="text-foreground/70">
          Para nuestra noche de pelis
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            onClick={() => handleSelect(movie.id)}
            className={`
              p-4 cursor-pointer transition-all duration-300 
              bg-card/80 backdrop-blur-sm hover:bg-card
              border-2 active:scale-95
              ${selected === movie.id 
                ? "border-primary ring-2 ring-primary/30" 
                : "border-primary/20 hover:border-primary/40"
              }
            `}
          >
            <div className="text-center space-y-2">
              <span className="text-3xl">{movie.emoji}</span>
              <p className="font-medium text-sm text-foreground leading-tight">
                {movie.title}
              </p>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                {movie.genre}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {selected && (
        <div className="relative">
          {showConfetti && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-2xl animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1s",
                  }}
                >
                  {["💖", "✨", "💕", "🎬"][i % 4]}
                </span>
              ))}
            </div>
          )}
          <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 text-center">
            <p className="text-lg text-foreground mb-2">
              Vamos a ver
            </p>
            <p className="text-2xl font-serif text-primary mb-1">
              {selectedMovie?.emoji} {selectedMovie?.title}
            </p>
            <p className="text-sm text-muted-foreground">
              ¡Prepara las palomitas!
            </p>
          </Card>
        </div>
      )}
    </div>
  )
}
