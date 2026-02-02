"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

const activities = [
  {
    id: "videocall",
    title: "Videollamada",
    emoji: "📱",
    description: "Vernos y hablar un rato",
    color: "from-pink-400/30 to-rose-400/30",
  },
  {
    id: "movies",
    title: "Ver Películas",
    emoji: "🎬",
    description: "Noche de pelis juntos",
    color: "from-purple-400/30 to-pink-400/30",
  },
  {
    id: "games",
    title: "Jugar Juntos",
    emoji: "🎮",
    description: "Videojuegos en Videollamada",
    color: "from-blue-400/30 to-purple-400/30",
  },
  {
    id: "talk",
    title: "Solo Hablar",
    emoji: "💬",
    description: "Contarnos el día",
    color: "from-green-400/30 to-teal-400/30",
  },
  {
    id: "music",
    title: "Escuchar Música",
    emoji: "🎵",
    description: "Compartir canciones",
    color: "from-yellow-400/30 to-orange-400/30",
  },
  {
    id: "surprise",
    title: "¡Sorpréndeme!",
    emoji: "🎁",
    description: "Tú decides, mi amor",
    color: "from-rose-400/30 to-red-400/30",
  },
]

export function ActivityPicker() {
  const [selected, setSelected] = useState<string | null>(null)
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([])

  const handleSelect = (id: string) => {
    setSelected(id)
    // Create floating hearts
    const newHearts = [...Array(8)].map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setHearts(newHearts)
    setTimeout(() => setHearts([]), 2000)
  }

  const selectedActivity = activities.find((a) => a.id === selected)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-serif text-primary mb-2">
          ¿Qué Hacemos Hoy?
        </h3>
        <p className="text-foreground/70">
          Escoge lo que quieras hacer, bebé
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 relative">
        {/* Floating hearts */}
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute text-2xl pointer-events-none animate-ping z-10"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
            }}
          >
            💕
          </span>
        ))}

        {activities.map((activity) => (
          <Card
            key={activity.id}
            onClick={() => handleSelect(activity.id)}
            className={`
              p-4 cursor-pointer transition-all duration-300 
              bg-gradient-to-br ${activity.color}
              backdrop-blur-sm hover:scale-[1.02] active:scale-95
              border-2
              ${selected === activity.id 
                ? "border-primary ring-2 ring-primary/40" 
                : "border-primary/20 hover:border-primary/40"
              }
            `}
          >
            <div className="text-center space-y-1">
              <span className="text-4xl block">{activity.emoji}</span>
              <p className="font-semibold text-foreground">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {selected && (
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/30 text-center animate-in fade-in zoom-in duration-300">
          <span className="text-5xl block mb-3">{selectedActivity?.emoji}</span>
          <p className="text-lg text-foreground mb-1">
            ¡Perfecto mi amor!
          </p>
          <p className="text-xl font-serif text-primary">
            Vamos a {selectedActivity?.title.toLowerCase()}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {selectedActivity?.description}
          </p>
        </Card>
      )}
    </div>
  )
}
