"use client"

import { useEffect, useState } from "react"

export function LoveCounter() {
  const [time, setTime] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const startDate = new Date("2025-08-15T00:00:00")
    
    const calculateTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()
      
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
      const months = Math.floor(totalDays / 30.44)
      const days = Math.floor(totalDays % 30.44)
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setTime({ months, days, hours, minutes, seconds })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const timeBlocks = [
    { value: time.months, label: "Meses" },
    { value: time.days, label: "Días" },
    { value: time.hours, label: "Horas" },
    { value: time.minutes, label: "Minutos" },
    { value: time.seconds, label: "Segundos" },
  ]

  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-serif text-center text-primary mb-6">
        Tiempo que llevamos juntos
      </h3>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 min-w-[70px] md:min-w-[90px] shadow-lg border border-primary/20 transition-transform hover:scale-105"
          >
            <div className="text-2xl md:text-4xl font-bold text-primary text-center">
              {block.value.toString().padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground text-center mt-1">
              {block.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
