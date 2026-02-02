"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Clock, Heart, Sparkles } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function ValentineCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isValentines, setIsValentines] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const valentinesDay = new Date("2026-02-14T00:00:00")
      const now = new Date()
      const difference = valentinesDay.getTime() - now.getTime()

      if (difference <= 0) {
        setIsValentines(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
          <span className="text-2xl md:text-3xl font-bold text-white">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        <Heart 
          className="absolute -top-2 -right-2 w-5 h-5 text-primary fill-primary animate-pulse" 
        />
      </div>
      <span className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">{label}</span>
    </div>
  )

  return (
    <Card className="p-6 md:p-8 bg-card/60 backdrop-blur-sm border-primary/20 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
        <Clock className="w-5 h-5" />
        <span className="font-medium">Cuenta Regresiva</span>
      </div>

      <h3 className="text-xl md:text-2xl font-serif text-primary mb-2">
        {isValentines ? "Feliz San Valentin!" : "Para San Valentin"}
      </h3>
      
      {!isValentines ? (
        <>
          <p className="text-sm text-muted-foreground mb-6">
            14 de febrero 2026
          </p>
          
          <div className="flex justify-center gap-3 md:gap-4">
            <TimeUnit value={timeLeft.days} label="Dias" />
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <TimeUnit value={timeLeft.seconds} label="Seg" />
          </div>

          <p className="text-sm text-foreground/70 mt-6">
            Cada segundo que pasa es un segundo mas cerca de celebrar nuestro amor
          </p>
        </>
      ) : (
        <div className="py-8 space-y-4">
          <div className="text-6xl animate-bounce">{"💝"}</div>
          <p className="text-lg text-foreground/80">
            Hoy es el dia! Te amo con todo mi corazon!
          </p>
          <div className="flex justify-center gap-2">
            {["💕", "💖", "💗", "💕"].map((heart, i) => (
              <span 
                key={i} 
                className="text-2xl animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {heart}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
